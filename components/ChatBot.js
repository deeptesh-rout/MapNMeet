import { MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotContainerRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! 👋 How can I help you with EventMappr today?",
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close chatbot when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (
        chatbotContainerRef.current &&
        !chatbotContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getEventMapprContext = () => {
    return `You are EventMappr's AI assistant. Answer questions about this event discovery platform briefly and helpfully.

PLATFORM: EventMappr - discover and add local events on interactive maps
FEATURES: Google Maps with event pins, click-to-add events, Clerk auth, mobile-friendly
KEY FLOWS: Browse map (no login) → Click pins for details | Add events: Click map → form → save (login required)
LOGIN: "Sign In" button (top-right) → Email/Google via Clerk
SUPPORT: support@eventmappr.com

Keep responses under 2-3 sentences, friendly tone, use emojis appropriately.

Question: `;
  };

  const generateGeminiResponse = async (userMessage) => {
    if (!GEMINI_API_KEY) {
      console.error(
        "Gemini API key not found. Set REACT_APP_GEMINI_API_KEY in your .env file"
      );
      return "⚠️ AI is offline. Please set up Gemini API key.";
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: getEventMapprContext() + userMessage,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            topP: 0.9,
            topK: 20,
            maxOutputTokens: 100,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Gemini API error:", response.status, errorData);
        return `🤖 AI error (${response.status}). Check your API key and quota.`;
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        console.error("No AI response received:", data);
        return "🤖 AI didn't respond. Try rephrasing your question.";
      }

      return aiResponse.trim();
    } catch (error) {
      console.error("Gemini API error:", error);
      return `🔌 Connection error: ${error.message}`;
    }
  };

  const getFallbackResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey")
    ) {
      return "Hello! How can I help you with EventMappr today? 😊";
    } else if (
      input.includes("event") &&
      (input.includes("add") || input.includes("create"))
    ) {
      return "To add an event: Click anywhere on the map where your event will be → fill out the form → save! 📍 You'll need to be logged in first.";
    } else if (input.includes("map") || input.includes("explore")) {
      return "Find our interactive map on the Explore page! 🗺️ It shows all events as markers - click any pin to see details.";
    } else if (
      input.includes("sign") ||
      input.includes("login") ||
      input.includes("account")
    ) {
      return "Click 'Sign In' in the top-right corner! 👤 You can use Email, Google, or other options through our secure Clerk authentication.";
    } else if (input.includes("delete") || input.includes("remove")) {
      return "Yes! If you're logged in, you can manage your events from the event cards. Look for the options menu! ✏️";
    } else if (
      input.includes("contact") ||
      input.includes("support") ||
      input.includes("help")
    ) {
      return "Need more help? Contact us at support@eventmappr.com or visit our Contact page! 💌";
    } else if (input.includes("about") || input.includes("what")) {
      return "EventMappr helps you discover local events on an interactive map! 🎉 Browse without an account, or login to add your own events.";
    } else if (input.includes("mobile") || input.includes("phone")) {
      return "EventMappr is fully mobile-friendly! 📱 The map, chat, and all features work great on your phone or tablet.";
    } else if (input.includes("near") || input.includes("location")) {
      return "The map automatically centers on your area and shows nearby events! 📍 Allow location access for the best experience.";
    } else {
      return "I can help with adding events, using the map, logging in, or general EventMappr questions! What would you like to know? 🤖";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const botResponse = await generateGeminiResponse(inputValue);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 300);
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : ""}`}>
      <button
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "✕" : <MessageSquare size={20} />}
      </button>

      {isOpen && (
        <div className="chatbot-container" ref={chatbotContainerRef}>
          <div className="chatbot-header">
            <h3>EventMappr Assistant</h3>
            <span className="chatbot-status">Online</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isBot ? "bot" : "user"}`}
              >
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type a message..."
              aria-label="Type a message"
            />
            <button type="submit" aria-label="Send message">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                fill="none"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <style jsx>{`
        .chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }

        .chatbot-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .chatbot-toggle:hover {
          transform: scale(1.05);
          background-color: var(--primary-dark);
        }

        .chatbot-container {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 350px;
          height: 500px;
          background-color: var(--background);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          padding: 1rem;
          background: linear-gradient(135deg, #4c5cff, #4c5cff);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chatbot-header h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .chatbot-status {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }

        .chatbot-status::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #4caf50;
          border-radius: 50%;
          margin-right: 5px;
        }

        .chatbot-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .message {
          padding: 0.8rem 1rem;
          border-radius: 18px;
          max-width: 80%;
          word-break: break-word;
        }

        .message.bot {
          background-color: var(--background-alt);
          color: var(--text);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }

        .message.user {
          background-color: var(--primary);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .message.typing {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.8rem;
          width: 60px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: var(--text-light);
          border-radius: 50%;
          margin: 0 3px;
          animation: bounce 1.5s infinite ease-in-out;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }

        .chatbot-input {
          display: flex;
          padding: 0.8rem;
          border-top: 1px solid var(--border);
        }

        .chatbot-input input {
          flex: 1;
          padding: 0.8rem;
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.9rem;
          background-color: var(--background);
          color: var(--text);
        }

        .chatbot-input input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .chatbot-input button {
          background-color: var(--primary);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-left: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .chatbot-input button:hover {
          background-color: var(--primary-dark);
        }

        @media (max-width: 576px) {
          .chatbot-container {
            width: calc(100vw - 40px);
            height: 450px;
            bottom: 70px;
          }

          .chatbot-toggle {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
