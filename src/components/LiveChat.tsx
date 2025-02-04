import React from 'react';
import { MessageSquare } from 'lucide-react';

const LiveChat: React.FC = () => {
  const whatsappNumber = "+23278590287";
  const openWhatsApp = () => {
    const message = "Hello! I'd like to schedule a car service/repair at Cool Car Auto Garage.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulsing background effect */}
      <div className="absolute inset-0 bg-green-500 rounded-[30px] animate-pulse opacity-30"></div>
      
      <button
        onClick={openWhatsApp}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-[30px] py-4 px-8 shadow-lg 
                 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl
                 flex items-center space-x-4 min-w-[180px]
                 border border-white/20 backdrop-blur-sm"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-medium text-base md:text-lg whitespace-nowrap">
          WhatsApp Chat
        </span>
        
        {/* Status indicator */}
        <div className="absolute top-1 right-1">
          <div className="w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute top-0 w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm py-2 px-4 rounded-[20px] shadow-lg opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300">
          Click to chat with us
        </div>
      </div>
    </div>
  );
};

export default LiveChat; 