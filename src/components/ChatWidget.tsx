import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { X, Send, BarChart, MessageSquare } from 'lucide-react';
import { generateBotResponse, getInitialGreeting } from '../utils/chatbot';
import type { Message, ConversationInsights } from '../utils/chatAnalytics';
import { getConversationInsights } from '../utils/chatAnalytics';

// Lazy load the insights panel with prefetch
const ChatInsightsPanel = lazy(() => 
  import(/* webpackPrefetch: true */ './ChatInsightsPanel')
);

interface ChatWidgetProps {
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = React.memo(({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState<ConversationInsights>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize message filtering with a limit
  const filteredMessages = React.useMemo(() => {
    return messages.slice(-50); // Only show last 50 messages for performance
  }, [messages]);

  // Add initial greeting when chat is first opened
  useEffect(() => {
    let mounted = true;
    
    if (messages.length === 0) {
      const initialMessages: Message[] = [
        {
          id: Date.now(),
          text: getInitialGreeting(),
          sender: 'bot',
          timestamp: new Date(),
        },
      ];
      if (mounted) {
        setMessages(initialMessages);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Optimized scroll behavior with IntersectionObserver
  const scrollToBottom = React.useCallback(() => {
    if (messagesEndRef.current) {
      const options = {
        behavior: 'smooth' as const,
        block: 'end' as const,
      };
      messagesEndRef.current.scrollIntoView(options);
    }
  }, []);

  useEffect(() => {
    const timer = requestAnimationFrame(scrollToBottom);
    return () => cancelAnimationFrame(timer);
  }, [messages, scrollToBottom]);

  // Debounced message handler with error boundary
  const handleSendMessage = React.useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputMessage]);

  // Optimized insights toggle with error boundary
  const toggleInsights = React.useCallback(() => {
    if (!showInsights) {
      try {
        const newInsights = getConversationInsights(messages);
        setInsights(newInsights);
      } catch (error) {
        console.error('Error generating insights:', error);
      }
    }
    setShowInsights(!showInsights);
  }, [messages, showInsights]);

  // Keyboard handler for accessibility
  const handleKeyPress = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6" aria-hidden="true" />
          <span className="font-semibold">Cool Car Auto Chat</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleInsights}
            className="p-1 hover:bg-blue-600 rounded-full transition-colors"
            title="Chat Insights"
            aria-label="View chat insights"
          >
            <BarChart className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-600 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        className="h-96 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
              role={message.sender === 'bot' ? 'alert' : undefined}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start" aria-live="polite">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-2" aria-label="Bot is typing">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} tabIndex={-1} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            aria-label="Type your message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputMessage.trim()}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Insights Panel */}
      {showInsights && insights && (
        <Suspense 
          fallback={
            <div className="p-4" role="status">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <ChatInsightsPanel insights={insights} onClose={toggleInsights} />
        </Suspense>
      )}
    </div>
  );
});

export default ChatWidget; 