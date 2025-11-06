"use client";

import { useState } from "react";
import Icon from "@/components/Icon.jsx";

/**
 * Renders a form for sending a new chat message with 3D effects.
 * @param {{ onSendMessage: (message: string) => void, isLoading: boolean }} props
 */
export default function MessageInput({ onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="p-4 glass-morphism border-t border-emerald-500/20 sticky bottom-0 z-20 lighting-effect">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="form-control">
          <div className="input-group input-group-lg perspective-3d">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 card-3d bg-base-100/90 backdrop-blur-sm border-emerald-500/30 focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/20"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button
              type="submit"
              className="btn btn-primary btn-square btn-lg btn-3d pulse-glow relative overflow-hidden"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              {isLoading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <>
                  <Icon name="Send" size={24} className="relative z-10" />
                  <div className="absolute inset-0 shimmer opacity-50"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}