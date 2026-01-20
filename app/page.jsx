"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar.jsx";
import ChatWindow from "@/components/ChatWindow.jsx";
import MessageInput from "@/components/MessageInput.jsx";
import { loadData, saveData } from "@/lib/storage.js";
import Icon from "@/components/Icon.jsx";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const data = loadData();
        if (data && data.documents && data.chatHistory) {
          setDocuments(data.documents);
          setChatHistory(data.chatHistory);
        } else {
          const response = await fetch('/data.json');
          const initialData = await response.json();
          setDocuments(initialData.documents);
          setChatHistory(initialData.chatHistory);
          saveData(initialData);
        }
      } catch (error) {
        console.error("Failed to initialize data:", error);
        // Set a fallback state in case of error
        setChatHistory([{ role: 'ai', content: 'Error loading initial data. Please refresh the page.' }]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleFileUpload = (newDocument) => {
    const updatedDocs = [...documents, newDocument];
    setDocuments(updatedDocs);
    saveData({ documents: updatedDocs, chatHistory });
  };

  const handleSendMessage = async (userMessage) => {
    const newUserMessage = { role: 'user', content: userMessage };
    const updatedHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedHistory);
    setIsLoading(true);

    // Build context from all documents
    const context = documents.map(d => d.content).join('\n\n');
    
    // Debug logging
    console.log('Number of documents:', documents.length);
    console.log('Context length:', context.length);
    console.log('Context preview:', context.substring(0, 300));
    
    // Ensure context is not empty if documents exist
    if (documents.length > 0 && context.trim().length === 0) {
      console.warn('Warning: Documents exist but context is empty!');
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage, context: context || '' }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && result.data.answer) {
        const aiMessage = { role: 'ai', content: result.data.answer };
        const finalHistory = [...updatedHistory, aiMessage];
        setChatHistory(finalHistory);
        saveData({ documents, chatHistory: finalHistory });
      } else {
        throw new Error(result.error || "Invalid response from API");
      }

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = { role: 'ai', content: 'Sorry, something went wrong. Please try again.' };
      const errorHistory = [...updatedHistory, errorMessage];
      setChatHistory(errorHistory);
      saveData({ documents, chatHistory: errorHistory });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial loading screen for a better first-time user experience
  if (isLoading && chatHistory.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center animated-gradient particle-bg">
        <div className="text-center p-8 rounded-2xl glass-morphism shadow-2xl backdrop-blur-lg card-3d lighting-effect perspective-3d">
          <div className="flex justify-center items-center gap-4">
            <div className="float-animation pulse-glow">
              <Icon name="Bot" size={48} className="text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-base-content text-glow">RAG Chatbot</h1>
          </div>
          <p className="mt-4 text-lg text-base-content/70">Loading your workspace...</p>
          <div className="flex justify-center mt-6">
            <span className="loading loading-dots loading-lg text-emerald-500"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen bg-base-100 text-base-content overflow-hidden relative perspective-3d min-h-0">
      {/* Animated background gradient */}
      <div className="fixed inset-0 animated-gradient opacity-30 pointer-events-none -z-10"></div>
      
      {/* Lighting effects overlay */}
      <div className="fixed inset-0 particle-bg pointer-events-none -z-10"></div>
      
      <Sidebar documents={documents} onFileUpload={handleFileUpload} />
      <main className="flex-1 flex flex-col overflow-hidden relative min-h-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-600/5 pointer-events-none"></div>
        <ChatWindow chatHistory={chatHistory} isLoading={isLoading} />
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}