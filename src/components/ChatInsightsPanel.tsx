import React from 'react';
import { X } from 'lucide-react';
import { ConversationInsights } from '../utils/chatAnalytics';

interface ChatInsightsPanelProps {
  insights: ConversationInsights;
  onClose: () => void;
}

const ChatInsightsPanel: React.FC<ChatInsightsPanelProps> = ({ insights, onClose }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-white p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chat Insights</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Message Count</h4>
          <p>Total: {insights.messageCount.total}</p>
          <p>User: {insights.messageCount.user}</p>
          <p>Bot: {insights.messageCount.bot}</p>
        </div>
        <div>
          <h4 className="font-medium">Average Response Time</h4>
          <p>{Math.round(insights.averageResponseTime / 1000)}s</p>
        </div>
        <div>
          <h4 className="font-medium">Top Topics</h4>
          <ul>
            {insights.topTopics.map((topic: string) => (
              <li key={topic} className="capitalize">{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatInsightsPanel; 