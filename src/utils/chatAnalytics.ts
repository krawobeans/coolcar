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

export const getConversationInsights = (messages: Message[]): ConversationInsights => {
  const userMessages = messages.filter((m) => m.sender === 'user');
  const botMessages = messages.filter((m) => m.sender === 'bot');
  
  // Calculate message counts
  const messageCount = {
    total: messages.length,
    user: userMessages.length,
    bot: botMessages.length,
  };

  // Calculate average response time
  let totalResponseTime = 0;
  let responseCount = 0;
  
  for (let i = 1; i < messages.length; i++) {
    if (messages[i].sender === 'bot' && messages[i - 1].sender === 'user') {
      totalResponseTime += messages[i].timestamp.getTime() - messages[i - 1].timestamp.getTime();
      responseCount++;
    }
  }

  const averageResponseTime = responseCount > 0 ? totalResponseTime / responseCount : 0;

  // Simple topic detection based on keywords
  const topics = new Map<string, number>();
  const keywordTopics = {
    booking: ['book', 'appointment', 'schedule'],
    services: ['repair', 'service', 'maintenance', 'fix'],
    pricing: ['price', 'cost', 'quote', 'expensive'],
    location: ['where', 'location', 'address', 'directions'],
    hours: ['hours', 'open', 'close', 'time'],
  };

  userMessages.forEach((message) => {
    const text = message.text.toLowerCase();
    Object.entries(keywordTopics).forEach(([topic, keywords]) => {
      if (keywords.some((keyword) => text.includes(keyword))) {
        topics.set(topic, (topics.get(topic) || 0) + 1);
      }
    });
  });

  const topTopics = Array.from(topics.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([topic]) => topic);

  // Calculate conversation duration
  const conversationDuration = messages.length > 1
    ? messages[messages.length - 1].timestamp.getTime() - messages[0].timestamp.getTime()
    : 0;

  return {
    messageCount,
    averageResponseTime,
    topTopics,
    conversationDuration,
  };
}; 