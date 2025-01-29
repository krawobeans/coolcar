interface SentimentScore {
  score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  context?: string;
}

interface ConversationPattern {
  userMessage: string;
  botResponse: string;
  sentiment: string;
  context: string;
  timestamp: Date;
  effectiveness?: number;
}

// Enhanced sentiment analysis with automotive context
const sentimentKeywords = {
  positive: [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'helpful',
    'thanks', 'thank', 'appreciate', 'happy', 'pleased', 'perfect', 'best',
    'smooth', 'quiet', 'fixed', 'resolved', 'reliable', 'efficient', 'fast'
  ],
  negative: [
    'bad', 'poor', 'terrible', 'horrible', 'awful', 'disappointed', 'unhappy',
    'slow', 'expensive', 'rude', 'waste', 'wrong', 'not', "don't", 'cant',
    'broken', 'noisy', 'leak', 'problem', 'issue', 'fault', 'failed', 'stuck'
  ]
};

// Automotive-specific context patterns
const contextPatterns = {
  repair: /\b(repair|fix|broken|issue|problem|fault|service)\b/i,
  maintenance: /\b(maintenance|oil|check|inspect|tune|filter)\b/i,
  booking: /\b(book|schedule|appointment|available|when|time)\b/i,
  pricing: /\b(cost|price|expensive|cheap|quote|estimate|fee)\b/i,
  parts: /\b(part|tire|brake|engine|transmission|battery|oil|filter)\b/i,
  emergency: /\b(emergency|urgent|asap|quickly|stuck|broke|down)\b/i,
  warranty: /\b(warranty|guarantee|covered|protection|policy)\b/i,
  technical: /\b(specs|specifications|manual|guide|how\s+to|steps)\b/i,
  feedback: /\b(review|rating|experience|recommend|satisfied)\b/i
};

// Context-specific response enhancements
const contextEnhancements = {
  repair: {
    prefix: "I understand you're having an issue that needs repair. ",
    suffix: " Would you like to schedule a diagnostic appointment?"
  },
  maintenance: {
    prefix: "Regular maintenance is key to vehicle longevity. ",
    suffix: " Would you like to know our maintenance packages?"
  },
  booking: {
    prefix: "I'll help you schedule a convenient appointment. ",
    suffix: " We have several time slots available this week."
  },
  pricing: {
    prefix: "I'll provide you with transparent pricing information. ",
    suffix: " Would you like a detailed quote?"
  },
  parts: {
    prefix: "We use high-quality OEM and aftermarket parts. ",
    suffix: " Would you like to know more about our parts warranty?"
  },
  emergency: {
    prefix: "I understand this is urgent. ",
    suffix: " We can prioritize your service needs."
  },
  warranty: {
    prefix: "Let me explain our warranty coverage. ",
    suffix: " Would you like to see our warranty terms?"
  },
  technical: {
    prefix: "I'll provide you with technical details. ",
    suffix: " Would you like more specific information?"
  },
  feedback: {
    prefix: "We value your feedback. ",
    suffix: " Your input helps us improve our service."
  }
};

// Store conversation patterns for learning
let conversationHistory: ConversationPattern[] = [];

// Analyze text sentiment with context
export function analyzeSentiment(text: string): SentimentScore {
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  let totalKeywords = 0;

  // Calculate sentiment score
  words.forEach(word => {
    if (sentimentKeywords.positive.includes(word)) {
      score += 1;
      totalKeywords++;
    }
    if (sentimentKeywords.negative.includes(word)) {
      score -= 1;
      totalKeywords++;
    }
  });

  // Determine context
  const context = Object.entries(contextPatterns)
    .filter(([, pattern]) => pattern.test(text))
    .map(([context]) => context)[0] || 'general';

  // Calculate confidence based on keyword density
  const confidence = totalKeywords > 0 ? Math.min(totalKeywords / words.length, 1) : 0.5;

  return {
    score,
    sentiment: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral',
    confidence,
    context
  };
}

// Learn from conversation with effectiveness tracking
export function learnFromConversation(userMessage: string, botResponse: string): void {
  const analysis = analyzeSentiment(userMessage);
  
  conversationHistory.push({
    userMessage: userMessage.toLowerCase(),
    botResponse,
    sentiment: analysis.sentiment,
    context: analysis.context || 'general',
    timestamp: new Date(),
    effectiveness: analysis.confidence
  });

  // Keep only last 100 conversations to prevent memory bloat
  if (conversationHistory.length > 100) {
    conversationHistory = conversationHistory.slice(-100);
  }
}

// Enhanced similarity calculation with context weighting
function calculateSimilarity(userWords: Set<string>, patternWords: Set<string>, context: string, patternContext: string): number {
  const commonWords = [...userWords].filter(word => patternWords.has(word));
  const baseScore = commonWords.length / Math.max(userWords.size, patternWords.size);
  
  // Context matching bonus
  const contextBonus = context === patternContext ? 0.2 : 0;
  
  return Math.min(baseScore + contextBonus, 1);
}

// Find similar conversations with enhanced pattern matching
function findSimilarConversations(userMessage: string): ConversationPattern[] {
  const userWords = new Set(userMessage.toLowerCase().split(/\W+/));
  const analysis = analyzeSentiment(userMessage);
  
  return conversationHistory
    .map(pattern => {
      const patternWords = new Set(pattern.userMessage.split(/\W+/));
      const similarity = calculateSimilarity(userWords, patternWords, analysis.context || 'general', pattern.context);
      
      return { ...pattern, similarity };
    })
    .filter(pattern => (pattern as any).similarity > 0.3)
    .sort((a, b) => {
      // Sort by similarity and effectiveness
      const aScore = ((a as any).similarity * 0.7) + ((a.effectiveness || 0) * 0.3);
      const bScore = ((b as any).similarity * 0.7) + ((b.effectiveness || 0) * 0.3);
      return bScore - aScore;
    })
    .slice(0, 3);
}

// Get improved response with context awareness
export function getImprovedResponse(userMessage: string, defaultResponse: string): string {
  const similarPatterns = findSimilarConversations(userMessage);
  const analysis = analyzeSentiment(userMessage);
  
  // Get context-specific enhancements
  const enhancement = contextEnhancements[analysis.context as keyof typeof contextEnhancements];
  
  // If we have similar patterns with positive sentiment and matching context
  const relevantPatterns = similarPatterns.filter(p => 
    p.sentiment === 'positive' && p.context === analysis.context
  );

  if (relevantPatterns.length > 0) {
    const response = relevantPatterns[Math.floor(Math.random() * relevantPatterns.length)].botResponse;
    return enhancement 
      ? `${enhancement.prefix}${response}${enhancement.suffix}`
      : response;
  }

  // Add sentiment and context-based response enhancement
  let response = defaultResponse;
  
  if (enhancement) {
    response = `${enhancement.prefix}${response}${enhancement.suffix}`;
  }

  if (analysis.sentiment === 'negative') {
    response = `I understand your concern${analysis.context ? ` regarding ${analysis.context}` : ''}. ${response} Is there anything specific I can clarify?`;
  } else if (analysis.sentiment === 'positive') {
    response = `I'm glad I can help${analysis.context ? ` with your ${analysis.context} inquiry` : ''}! ${response}`;
  }

  return response;
}

// Enhanced conversation insights with context analysis
export function getConversationInsights(): {
  totalConversations: number;
  sentimentDistribution: { positive: number; neutral: number; negative: number };
  contextDistribution: { [key: string]: number };
  commonPatterns: string[];
  averageEffectiveness: number;
} {
  const sentimentDistribution = conversationHistory.reduce(
    (acc, curr) => {
      acc[curr.sentiment as keyof typeof acc]++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const contextDistribution = conversationHistory.reduce(
    (acc, curr) => {
      acc[curr.context] = (acc[curr.context] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number }
  );

  // Find common word patterns with context weighting
  const wordFrequency: { [key: string]: number } = {};
  conversationHistory.forEach(pattern => {
    pattern.userMessage.split(/\W+/).forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
  });

  const commonPatterns = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);

  const averageEffectiveness = conversationHistory.reduce(
    (acc, curr) => acc + (curr.effectiveness || 0), 
    0
  ) / conversationHistory.length;

  return {
    totalConversations: conversationHistory.length,
    sentimentDistribution,
    contextDistribution,
    commonPatterns,
    averageEffectiveness
  };
}