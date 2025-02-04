interface ConversationMemory {
  question: string;
  answer: string;
  context: string;
  timestamp: Date;
  sentiment?: string;
}

// In-memory storage for learned conversations
let conversationMemory: ConversationMemory[] = [];

// Keywords to identify automotive-related content
const automotiveKeywords = [
  'car', 'vehicle', 'auto', 'repair', 'maintenance', 'engine',
  'transmission', 'brake', 'tire', 'diagnostic', 'mechanic'
];

// Constants for local storage
const STORAGE_KEYS = {
  CONVERSATIONS: 'coolcar_conversations',
  LAST_CLEANUP: 'coolcar_last_cleanup'
};

/**
 * Clean and normalize text for better matching
 */
function normalizeText(text: string): string {
  return text.toLowerCase().trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Calculate similarity between two strings
 */
function calculateSimilarity(str1: string, str2: string): number {
  const set1 = new Set(normalizeText(str1).split(' '));
  const set2 = new Set(normalizeText(str2).split(' '));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

/**
 * Extract relevant automotive content from text
 */
export function extractAutomotiveContent(text: string): string {
  const sentences = text.split(/[.!?]+/);
  return sentences
    .filter(sentence => 
      automotiveKeywords.some(keyword => 
        sentence.toLowerCase().includes(keyword)
      )
    )
    .join('. ');
}

// Load conversations from local storage
function loadFromStorage(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (stored) {
      conversationMemory = JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
  }
}

// Save conversations to local storage
function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversationMemory));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}

// Cleanup old data periodically (once per day)
function cleanupStorage(): void {
  try {
    const lastCleanup = localStorage.getItem(STORAGE_KEYS.LAST_CLEANUP);
    const now = Date.now();
    if (!lastCleanup || now - parseInt(lastCleanup) > 24 * 60 * 60 * 1000) {
      // Remove conversations older than 30 days
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
      conversationMemory = conversationMemory.filter(
        conv => new Date(conv.timestamp).getTime() > thirtyDaysAgo
      );
      
      saveToStorage();
      localStorage.setItem(STORAGE_KEYS.LAST_CLEANUP, now.toString());
    }
  } catch (error) {
    console.error('Error during storage cleanup:', error);
  }
}

// Initialize storage on module load
loadFromStorage();
cleanupStorage();

/**
 * Store a conversation for future learning
 */
export function storeConversation(
  question: string,
  answer: string,
  context: string,
  sentiment: string = 'neutral'
): void {
  conversationMemory.push({
    question,
    answer,
    context,
    timestamp: new Date(),
    sentiment
  });

  // Keep memory size manageable
  if (conversationMemory.length > 1000) {
    conversationMemory = conversationMemory.slice(-1000);
  }
  
  // Save to local storage
  saveToStorage();
}

/**
 * Find similar conversations from memory
 */
export function findSimilarConversations(
  query: string,
  context: string,
  limit: number = 3
): ConversationMemory[] {
  return conversationMemory
    .filter(memory => memory.context === context)
    .map(memory => ({
      ...memory,
      similarity: calculateSimilarity(query, memory.question)
    }))
    .sort((a, b) => (b as any).similarity - (a as any).similarity)
    .slice(0, limit);
}

/**
 * Calculate relevance of a text to a query
 */
function calculateRelevance(text: string, query: string): number {
  // Calculate base similarity
  const baseSimilarity = calculateSimilarity(text, query);
  
  // Count automotive keywords
  const keywordCount = automotiveKeywords.reduce((count, keyword) => 
    count + (text.toLowerCase().match(new RegExp(keyword, 'g')) || []).length, 0
  );
  
  // Combine metrics (70% similarity, 30% keyword density)
  return (baseSimilarity * 0.7) + (Math.min(keywordCount / 10, 1) * 0.3);
}
