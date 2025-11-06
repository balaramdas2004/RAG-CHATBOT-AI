"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon.jsx";

/**
 * Renders a single chat message bubble with 3D effects and animations.
 * @param {{ message: { role: 'user' | 'ai', content: string } }} props
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const messageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      ref={messageRef}
      className={`chat ${isUser ? "chat-end" : "chat-start"} ${isVisible ? "message-pop" : "opacity-0"} perspective-3d`}
      style={{ animationDelay: "0.1s" }}
    >
      <div className="chat-image avatar">
        <div className={`w-10 rounded-full flex items-center justify-center ring-2 transition-all duration-300 ${
          isUser 
            ? "bg-gradient-to-br from-primary to-primary-focus ring-primary/30 float-animation" 
            : "bg-gradient-to-br from-base-300 to-base-200 ring-emerald-500/30 float-animation"
        }`} style={{ animationDelay: isUser ? "0s" : "0.3s" }}>
          <Icon 
            name={isUser ? "User" : "Bot"} 
            size={24} 
            className={`${isUser ? "text-primary-content" : "text-emerald-600"} transition-transform duration-300 hover:scale-110`} 
          />
        </div>
      </div>
      <div className={`chat-bubble shadow-lg card-3d relative overflow-hidden ${
        isUser 
          ? "chat-bubble-primary lighting-effect" 
          : "chat-bubble-neutral lighting-effect"
      }`}>
        <div className="relative z-10">
          <p className="break-words whitespace-pre-wrap leading-relaxed">{message.content}</p>
        </div>
        {!isUser && (
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}