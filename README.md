# RAG Chatbot - Interactive AI Document Assistant

A modern, interactive RAG (Retrieval-Augmented Generation) chatbot built with Next.js that allows users to upload documents and ask questions based on their content. Features a stunning 3D UI with animations, lighting effects, and glass morphism design.

## 🎯 Project Overview

This is a full-stack web application that combines **OpenAI's GPT-3.5-turbo** with **RAG (Retrieval-Augmented Generation)** technology to create an intelligent document analysis chatbot. Users can upload `.txt` files, and the AI will answer questions based exclusively on the content of those documents.

### What This Project Does

- **Document Upload**: Users can upload multiple `.txt` files through an intuitive interface
- **AI-Powered Analysis**: The chatbot uses OpenAI's API to analyze and answer questions about uploaded documents
- **Context-Aware Responses**: All answers are generated based on the actual content of uploaded documents
- **Interactive UI**: Beautiful 3D effects, animations, and modern design patterns
- **Persistent Storage**: Documents and chat history are saved in browser localStorage

## ✨ Key Features

### Core Functionality
- 📄 **Document Management**: Upload and manage multiple text documents
- 🤖 **AI Chat Interface**: Interactive chat with OpenAI GPT-3.5-turbo
- 🔍 **RAG Implementation**: Retrieval-Augmented Generation for document-based Q&A
- 💾 **Local Storage**: Automatic saving of documents and chat history
- 🔄 **Real-time Updates**: Instant UI updates and smooth animations

### UI/UX Features
- 🎨 **3D Visual Effects**: CSS 3D transforms, perspective, and depth
- ✨ **Animations**: Floating, pulse, shimmer, and pop-in animations
- 💡 **Lighting Effects**: Rotating gradients and dynamic lighting
- 🪟 **Glass Morphism**: Modern frosted glass design elements
- 🌈 **Gradient Backgrounds**: Animated gradient shifts
- ⚡ **Micro-interactions**: Hover effects, transitions, and feedback
- 📱 **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 15.3.4** - React framework with App Router
  - Server-side API routes
  - Client-side components
  - File-based routing
  - Automatic code splitting

### Core Libraries
- **React 19.0.0** - UI library
  - Hooks (useState, useEffect, useRef)
  - Component composition
  - Event handling

- **OpenAI SDK 6.8.1** - AI integration
  - GPT-3.5-turbo model
  - Chat completions API
  - Error handling

### Styling & Design
- **Tailwind CSS 4** - Utility-first CSS framework
  - Responsive design utilities
  - Custom theme configuration
  - PostCSS integration

- **DaisyUI 5.0.43** - Component library
  - Pre-built UI components
  - Theme system (Emerald theme)
  - Accessibility features

- **Framer Motion 12.23.16** - Animation library (installed, available for advanced animations)

### Icons & Assets
- **Lucide React 0.525.0** - Icon library
  - Dynamic icon loading
  - Component-based icons

## 🏗️ Architecture & Design Patterns

### Application Architecture
```
┌─────────────────┐
│   Client Side   │
│  (React/Next.js) │
├─────────────────┤
│  - Components   │
│  - State Mgmt   │
│  - UI/UX        │
└────────┬────────┘
         │
         │ HTTP POST
         ▼
┌─────────────────┐
│   API Route     │
│  (/api/chat)    │
├─────────────────┤
│  - OpenAI SDK   │
│  - RAG Logic    │
│  - Error Handle │
└────────┬────────┘
         │
         │ API Call
         ▼
┌─────────────────┐
│   OpenAI API    │
│  GPT-3.5-turbo  │
└─────────────────┘
```

### Design Patterns Used

1. **Component-Based Architecture**
   - Modular, reusable components
   - Separation of concerns
   - Props-based communication

2. **RAG (Retrieval-Augmented Generation)**
   - Document context injection
   - Prompt engineering
   - Context-aware responses

3. **State Management**
   - React Hooks (useState, useEffect)
   - Local state management
   - localStorage persistence

4. **Error Handling**
   - Try-catch blocks
   - User-friendly error messages
   - Graceful degradation

5. **API Design**
   - RESTful endpoints
   - JSON request/response
   - Proper HTTP status codes

## 📁 Project Structure

```
RAG_CHATBOT/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js          # OpenAI API integration
│   ├── globals.css               # Global styles & animations
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Main page component
├── components/
│   ├── ChatMessage.jsx           # Individual message component
│   ├── ChatWindow.jsx            # Chat container
│   ├── Icon.jsx                  # Icon wrapper component
│   ├── MessageInput.jsx          # Input form component
│   └── Sidebar.jsx               # Document sidebar
├── lib/
│   └── storage.js                # localStorage utilities
├── public/
│   └── data.json                 # Initial data
├── package.json                  # Dependencies
├── next.config.mjs              # Next.js configuration
└── README.md                     # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key

### Step 1: Clone or Download
```bash
cd RAG_CHATBOT
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure OpenAI API Key

The API key is currently hardcoded in `app/api/chat/route.js` as a fallback. For production, create a `.env.local` file:

```bash
# .env.local
OPENAI_API_KEY=your-api-key-here
```

### Step 4: Run Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Uploading Documents
1. Click the **"Upload .txt File"** button in the sidebar
2. Select a `.txt` file from your computer
3. The document will appear in the sidebar list
4. You can upload multiple documents

### Asking Questions
1. Type your question in the input field at the bottom
2. Click the send button or press Enter
3. The AI will analyze your uploaded documents and respond
4. Chat history is automatically saved

### Example Questions
- "What is this document about?"
- "Summarize the main points"
- "Explain [specific topic] from the documents"
- "What are the key concepts mentioned?"

## 🎨 UI/UX Techniques Implemented

### CSS 3D Effects
- **Perspective**: `perspective: 1000px` for 3D depth
- **Transform Style**: `preserve-3d` for 3D transformations
- **3D Cards**: Hover effects with `rotateX` and `translateY`
- **Lighting**: Rotating gradient overlays

### Animations
- **Floating Animation**: Smooth up/down movement
- **Pulse Glow**: Pulsing shadow effects
- **Shimmer**: Shining light sweep effect
- **Message Pop**: Bounce-in animation for messages
- **Gradient Shift**: Animated background gradients
- **Particle Effects**: Floating background particles

### Visual Effects
- **Glass Morphism**: Frosted glass with backdrop blur
- **Text Glow**: Glowing text shadows
- **Box Shadows**: Multi-layered colored shadows
- **Gradient Overlays**: Layered gradient backgrounds
- **Lighting Effects**: Rotating light sources

## 🔧 API Details

### Endpoint: `/api/chat`

**Method**: POST

**Request Body**:
```json
{
  "question": "Your question here",
  "context": "Document content..."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "answer": "AI response based on documents"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Error message"
}
```

### RAG Implementation

The system uses a sophisticated prompt engineering approach:

1. **Context Extraction**: All document content is joined into a single context string
2. **Prompt Construction**: System prompt instructs AI to use document content exclusively
3. **Response Generation**: GPT-3.5-turbo generates answers based on provided context
4. **Token Management**: Max tokens set to 1500 for detailed responses

## 🎯 Key Features Breakdown

### 1. Document Processing
- FileReader API for client-side file reading
- Text content extraction
- Multiple document support
- Document metadata (name, ID)

### 2. State Management
- React useState for component state
- useEffect for side effects
- localStorage for persistence
- Real-time UI updates

### 3. Error Handling
- Input validation
- API error handling
- User-friendly error messages
- Graceful fallbacks

### 4. Performance Optimizations
- Code splitting (Next.js)
- Client-side rendering for interactivity
- Server-side API routes
- Optimized CSS animations

## 🔐 Security Considerations

- API key is stored in environment variables (recommended for production)
- Input validation on both client and server
- Error messages don't expose sensitive information
- Client-side file processing (no server uploads)

## 🐛 Debugging

The application includes console logging for debugging:

- Document count and context length
- API request/response logging
- Error tracking
- Context preview in console

Open browser DevTools (F12) to see debug information.

## 📝 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization

### Changing Theme
Edit `app/layout.jsx`:
```jsx
<html lang="en" data-theme="your-theme">
```

### Modifying Colors
Edit `app/globals.css` - Emerald color scheme can be changed:
- Primary: `#10b981` (emerald-500)
- Secondary: `#059669` (emerald-600)

### Adding Animations
New animations can be added to `app/globals.css` using `@keyframes`.

## 🚧 Future Enhancements

Potential improvements:
- [ ] Support for more file types (PDF, DOCX)
- [ ] Vector database integration for better RAG
- [ ] Chat history export
- [ ] Document search functionality
- [ ] Multi-language support
- [ ] User authentication
- [ ] Cloud storage integration

## 📄 License

This project is private and proprietary.

## 👨‍💻 Development Notes

### Technologies & Techniques Summary

**Frontend**:
- Next.js 15 with App Router
- React 19 with Hooks
- Tailwind CSS 4 + DaisyUI
- Custom CSS animations

**Backend**:
- Next.js API Routes
- OpenAI SDK integration
- RAG implementation

**Storage**:
- Browser localStorage
- JSON serialization

**AI/ML**:
- OpenAI GPT-3.5-turbo
- RAG (Retrieval-Augmented Generation)
- Prompt engineering

**UI/UX**:
- 3D CSS transforms
- Glass morphism
- Advanced animations
- Responsive design

## 🤝 Contributing

This is a private project. For questions or issues, please contact the project maintainer.

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify OpenAI API key is valid
3. Ensure documents are properly uploaded
4. Check network tab for API responses

---

**Built with ❤️ using Next.js, React, and OpenAI**
