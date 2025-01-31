declare module '@utils/chatAnalytics' {
  export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }

  export interface ConversationInsights {
    messageCount: {
      total: number;
      user: number;
      bot: number;
    };
    averageResponseTime: number;
    topTopics: string[];
    conversationDuration: number;
  }

  export function getConversationInsights(messages: Message[]): ConversationInsights;
} 