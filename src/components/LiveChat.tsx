import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MessageCircle, X, Send, BarChart, Brain, MessageSquare } from 'lucide-react';
import { processMessage, getInitialGreeting } from '../utils/chatbot';
import { analyzeSentiment, learnFromConversation, getImprovedResponse, getConversationInsights } from '../utils/chatML';
import { storeConversation } from '../utils/chatLearning';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  sentiment?: string;
  context?: string;
}

// Add this function before the LiveChat component
async function verifyAIConnection(): Promise<boolean> {
  try {
    const testResults = await processMessage('test query');
    return testResults.length > 0;
  } catch (error) {
    console.error('Error verifying AI connection:', error);
    return false;
  }
}

// Lazy load the actual chat component
const ChatWidget = lazy(() => import('./ChatWidget'));

const LiveChat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState<ReturnType<typeof getConversationInsights>>();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [useAI, setUseAI] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(false);

  // Add a notification state
  const [showNotification, setShowNotification] = useState(false);

  // Verify OpenAI connection on mount
  useEffect(() => {
    async function checkAI() {
      const isAvailable = await verifyAIConnection();
      setAiAvailable(isAvailable);
      if (!isAvailable) {
        setUseAI(false);
        setShowNotification(true);
        console.warn('AI integration is not available. Using basic bot.');
        setTimeout(() => setShowNotification(false), 5000);
      }
    }
    checkAI();
  }, []);

  // Add initial greeting when chat is first opened
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const initialMessages: Message[] = [
        {
          id: Date.now().toString(),
          text: getInitialGreeting(),
          isBot: true,
          timestamp: new Date()
        },
        {
          id: (Date.now() + 1).toString(),
          text: "💬 Need immediate assistance? Click the WhatsApp button above to chat with our service team directly!",
          isBot: true,
          timestamp: new Date()
        }
      ];
      setMessages(initialMessages);
    }
  }, [isVisible]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Remove clearConversation call
  useEffect(() => {
    if (!isVisible) {
      // Reset chat state when closed
      setMessages([]);
    }
  }, [isVisible]);

  useEffect(() => {
    // Delay loading the chat widget until after the main content
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // Load after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsVisible(!isVisible);
    setShowInsights(false);
  };

  const toggleInsights = () => {
    setInsights(getConversationInsights());
    setShowInsights(!showInsights);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Analyze sentiment of user message
    const analysis = analyzeSentiment(inputMessage);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
      sentiment: analysis.sentiment,
      context: analysis.context
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Show bot typing indicator
    setIsTyping(true);

    try {
      // Use our basic chatbot
      const baseResponse = await processMessage(inputMessage);
      const response = getImprovedResponse(inputMessage, baseResponse);

      // Add bot response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        context: analysis.context
      };

      // Learn from this conversation
      learnFromConversation(inputMessage, response);

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      // Add error message
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error. Please try again.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const whatsappNumber = "+23278590287";
  const openWhatsApp = () => {
    const message = "Hello! I'd like to schedule a car service/repair at Cool Car Auto Garage.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showNotification && (
        <div className="absolute bottom-24 right-0 mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-lg max-w-xs animate-fade-in">
          <p className="text-sm">
            AI chat is currently unavailable. Using basic chat mode.
          </p>
        </div>
      )}
      
      {!isVisible ? (
        <button
          onClick={toggleChat}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-300"
          aria-label="Open chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      ) : (
        <Suspense
          fallback={
            <div className="bg-white p-4 rounded-lg shadow-lg">
              Loading chat...
            </div>
          }
        >
          {isLoaded && (
            <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="text-white font-semibold">Cool Car Auto Assistant</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={openWhatsApp}
                      className="flex items-center space-x-1 text-white hover:text-green-300 transition-colors bg-green-600 px-2 py-1 rounded"
                      title="Chat with us on WhatsApp for immediate assistance"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">WhatsApp Support</span>
                    </button>
                    <button
                      onClick={() => aiAvailable && setUseAI(!useAI)}
                      className={`text-white hover:text-gray-200 transition-colors ${!aiAvailable && 'opacity-50 cursor-not-allowed'}`}
                      title={!aiAvailable ? "AI unavailable" : useAI ? "Using AI (Click to switch)" : "Using Basic Bot (Click to switch)"}
                      disabled={!aiAvailable}
                    >
                      <Brain className={`w-5 h-5 ${useAI && aiAvailable ? 'text-green-300' : 'text-gray-300'}`} />
                    </button>
                    <button
                      onClick={toggleInsights}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <BarChart className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={toggleChat}
                      className="text-white hover:text-gray-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {showInsights ? (
                <div className="h-96 overflow-y-auto p-4">
                  <h4 className="font-semibold text-lg mb-4">Conversation Insights</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="font-medium">Total Conversations:</p>
                      <p className="text-gray-600">{insights?.totalConversations || 0}</p>
                    </div>

                    <div>
                      <p className="font-medium">Sentiment Distribution:</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-green-600">Positive</span>
                          <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ 
                                width: `${insights?.sentimentDistribution.positive 
                                  ? (insights.sentimentDistribution.positive / insights.totalConversations) * 100 
                                  : 0}%` 
                              }}
                            />
                          </div>
                          <span className="text-green-600 w-8 text-right">
                            {insights?.sentimentDistribution.positive || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Neutral</span>
                          <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gray-500 h-2 rounded-full"
                              style={{ 
                                width: `${insights?.sentimentDistribution.neutral 
                                  ? (insights.sentimentDistribution.neutral / insights.totalConversations) * 100 
                                  : 0}%` 
                              }}
                            />
                          </div>
                          <span className="text-gray-600 w-8 text-right">
                            {insights?.sentimentDistribution.neutral || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-red-600">Negative</span>
                          <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full"
                              style={{ 
                                width: `${insights?.sentimentDistribution.negative 
                                  ? (insights.sentimentDistribution.negative / insights.totalConversations) * 100 
                                  : 0}%` 
                              }}
                            />
                          </div>
                          <span className="text-red-600 w-8 text-right">
                            {insights?.sentimentDistribution.negative || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Conversation Topics:</p>
                      <div className="mt-2 space-y-2">
                        {insights?.contextDistribution && Object.entries(insights.contextDistribution)
                          .sort(([, a], [, b]) => b - a)
                          .map(([context, count]) => (
                            <div key={context} className="flex justify-between items-center">
                              <span className="text-blue-600 capitalize">{context}</span>
                              <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ 
                                    width: `${(count / insights.totalConversations) * 100}%` 
                                  }}
                                />
                              </div>
                              <span className="text-blue-600 w-8 text-right">{count}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Common Topics:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {insights?.commonPatterns.map((pattern, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {pattern}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Chat Effectiveness:</p>
                      <div className="mt-2 flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ 
                              width: `${(insights?.averageEffectiveness || 0) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-green-600">
                          {Math.round((insights?.averageEffectiveness || 0) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Chat Messages Area */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-2 ${
                          message.isBot ? '' : 'flex-row-reverse space-x-reverse'
                        }`}
                      >
                        {message.isBot && (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <MessageCircle className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            message.isBot
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                            {message.sentiment && (
                              <span className={`text-xs ml-2 ${
                                message.sentiment === 'positive' ? 'text-green-500' :
                                message.sentiment === 'negative' ? 'text-red-500' :
                                'text-gray-500'
                              }`}>
                                {message.sentiment}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default LiveChat; 