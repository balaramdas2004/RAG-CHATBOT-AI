import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with API key (set this in your environment variables)
const openaiApiKey = process.env.OPENAI_API_KEY;

/**
 * RAG API endpoint that uses OpenAI to generate AI chat responses based on context.
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} The response from the API.
 */
export async function POST(request) {
  try {
    if (!openaiApiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Server misconfiguration: OPENAI_API_KEY is not set. Add it in Vercel project settings (Environment Variables) and redeploy.",
        },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: openaiApiKey });

    const body = await request.json();
    const { question, context } = body;

    // 1. Input Validation
    if (!question) {
      console.log("Validation failed: Missing question");
      return NextResponse.json(
        { success: false, error: "Invalid request body: 'question' is required." },
        { status: 400 }
      );
    }

    // 2. Prepare the prompt with context
    let systemPrompt;
    let userPrompt;
    
    if (context && context.trim().length > 0) {
      // Enhanced prompt for RAG with documents
      systemPrompt = `You are an AI assistant that analyzes and answers questions based on user-uploaded documents. You have been given access to document content below.

CRITICAL RULES:
1. You MUST use the document content provided below to answer questions
2. When answering, reference specific information from the documents
3. Provide detailed, accurate answers based on what's in the documents
4. If asked to analyze documents, do so thoroughly using the content provided
5. NEVER say you don't have access to documents - the content is provided below
6. If the documents don't contain relevant information for a question, say "Based on the documents provided, I don't see information about [topic]" rather than saying you can't access documents
7. If the user indicates they have uploaded documents but does not ask a clear question (for example: "I have uploaded", "please verify the docs", or similar),
   you MUST still respond helpfully by:
   - verifying and summarizing each document,
   - pointing out any issues, inconsistencies, or important details you notice,
   - and then suggesting specific follow-up questions the user might ask.
   Do NOT tell the user that they forgot to ask a question in these cases.

The user has uploaded documents with the following content:

---DOCUMENT CONTENT STARTS---
${context}
---DOCUMENT CONTENT ENDS---

Now answer questions based on this document content.`;
      
      userPrompt = question;
      
      console.log("Context length:", context.length);
      console.log("Context preview:", context.substring(0, 200));
    } else {
      systemPrompt = "You are a helpful AI assistant. Answer questions clearly and concisely.";
      userPrompt = question;
      console.log("No context provided - answering without document context");
    }

    // 3. Call OpenAI API
    console.log("Calling OpenAI API...");
    console.log("Question:", question);
    console.log("Has context:", !!context && context.trim().length > 0);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500, // Increased for longer responses with document references
    });

    const answer = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
    
    console.log("OpenAI response received.");
    return NextResponse.json({ success: true, data: { answer } });

  } catch (error) {
    // Handle JSON parsing errors specifically
    if (error instanceof SyntaxError) {
      console.error("Error parsing JSON request body:", error);
      return NextResponse.json(
        { success: false, error: "Invalid request body: Malformed JSON." },
        { status: 400 }
      );
    }

    // Handle OpenAI API errors
    if (error && typeof error === 'object' && 'status' in error) {
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        { success: false, error: `OpenAI API Error: ${error.message || 'Unknown error'}` },
        { status: error.status || 500 }
      );
    }

    // Handle other server-side errors
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}