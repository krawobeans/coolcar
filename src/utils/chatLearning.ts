interface ConversationMemory {
  question: string;
  answer: string;
  context: string;
  timestamp: Date;
  sentiment?: string;
  source?: string;
}

interface WebLearningResult {
  content: string;
  source: string;
  relevance: number;
}

// In-memory storage for learned conversations
let conversationMemory: ConversationMemory[] = [];

// Cache for web-learned information
const webKnowledgeCache = new Map<string, WebLearningResult[]>();

// Keywords to identify automotive-related content
const automotiveKeywords = [
  'car', 'vehicle', 'auto', 'repair', 'maintenance', 'engine',
  'transmission', 'brake', 'tire', 'diagnostic', 'mechanic'
];

// Trusted automotive information sources
const trustedSources = [
  'autozone.com',
  'carcomplaints.com',
  'repairpal.com',
  'autoblog.com',
  'cartalk.com',
  'edmunds.com',
  'kbb.com',
  'caranddriver.com',
  'motortrend.com'
];

// Automotive forums to search
const autoForums = [
  'mechanicadvice.reddit.com',
  'cartalk.com/forum',
  'automotiveforums.com',
  'bimmerforums.com',
  'toyotanation.com',
  'honda-tech.com'
];

// Rate limiting configuration
const rateLimiting = {
  maxRequestsPerMinute: 50,
  requestCount: 0,
  lastResetTime: Date.now()
};

interface GoogleSearchResult {
  title: string;
  snippet: string;
  link: string;
  source: string;
}

// Constants for local storage
const STORAGE_KEYS = {
  CONVERSATIONS: 'coolcar_conversations',
  WEB_CACHE: 'coolcar_web_cache',
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
function extractAutomotiveContent(text: string): string {
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
    
    const storedCache = localStorage.getItem(STORAGE_KEYS.WEB_CACHE);
    if (storedCache) {
      const parsed = JSON.parse(storedCache);
      webKnowledgeCache.clear();
      Object.entries(parsed).forEach(([key, value]) => {
        webKnowledgeCache.set(key, value as WebLearningResult[]);
      });
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
  }
}

// Save conversations to local storage
function saveToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversationMemory));
    
    const cacheObj = Object.fromEntries(webKnowledgeCache.entries());
    localStorage.setItem(STORAGE_KEYS.WEB_CACHE, JSON.stringify(cacheObj));
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
      
      // Clear old cache entries
      const cacheEntries = Array.from(webKnowledgeCache.entries());
      cacheEntries.forEach(([key, value]) => {
        if (value.some(result => !result.content.trim())) {
          webKnowledgeCache.delete(key);
        }
      });
      
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
 * Check and update rate limiting
 */
function checkRateLimit(): boolean {
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // Reset counter if a minute has passed
  if (now - rateLimiting.lastResetTime > oneMinute) {
    rateLimiting.requestCount = 0;
    rateLimiting.lastResetTime = now;
  }

  // Check if we're under the limit
  if (rateLimiting.requestCount < rateLimiting.maxRequestsPerMinute) {
    rateLimiting.requestCount++;
    return true;
  }

  return false;
}

/**
 * Learn from web sources using Google Custom Search and forum scraping
 */
export async function learnFromWeb(query: string): Promise<WebLearningResult[]> {
  // Check cache first
  const cacheKey = normalizeText(query);
  if (webKnowledgeCache.has(cacheKey)) {
    return webKnowledgeCache.get(cacheKey)!;
  }

  try {
    const results: WebLearningResult[] = [];
    
    // Search Google for automotive content
    const searchResults = await searchGoogle(
      `site:(${trustedSources.join(' OR ')}) ${query}`
    );

    // Process search results
    for (const result of searchResults) {
      const content = result.snippet;
      const relevance = calculateRelevance(content, query);
      
      if (relevance > 0.3) { // Only keep relevant results
        results.push({
          content: content,
          source: result.source,
          relevance: relevance
        });
      }
    }

    // Search automotive forums if needed
    if (results.length < 3) {
      const forumResults = await searchGoogle(
        `site:(${autoForums.join(' OR ')}) ${query}`
      );

      for (const result of forumResults) {
        const content = await scrapeForumContent(result.link);
        const relevance = calculateRelevance(content, query);
        
        if (relevance > 0.3) {
          results.push({
            content: content,
            source: `Forum: ${result.source}`,
            relevance: relevance * 0.9 // Slightly lower weight for forum content
          });
        }
      }
    }

    // Sort by relevance and limit results
    const finalResults = results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5);

    // Cache the results
    if (finalResults.length > 0) {
      webKnowledgeCache.set(cacheKey, finalResults);
      
      // Limit cache size
      if (webKnowledgeCache.size > 1000) {
        const oldestKeys = Array.from(webKnowledgeCache.keys()).slice(0, 100);
        oldestKeys.forEach(key => webKnowledgeCache.delete(key));
      }
    }
    
    return finalResults;
  } catch (error) {
    console.error('Error learning from web:', error);
    return [];
  }
}

/**
 * Get conversation statistics
 */
export function getConversationStats() {
  const totalConversations = conversationMemory.length;
  const contextDistribution = conversationMemory.reduce((acc, curr) => {
    acc[curr.context] = (acc[curr.context] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sentimentDistribution = conversationMemory.reduce((acc, curr) => {
    if (curr.sentiment) {
      acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return {
    totalConversations,
    contextDistribution,
    sentimentDistribution,
    memorySize: conversationMemory.length
  };
}

/**
 * Clear old conversations
 */
export function clearOldConversations(daysOld: number = 30): void {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysOld);
  conversationMemory = conversationMemory.filter(
    memory => memory.timestamp > cutoff
  );
}

/**
 * Export conversation data for backup
 */
export function exportConversationData(): string {
  return JSON.stringify(conversationMemory, null, 2);
}

/**
 * Import conversation data from backup
 */
export function importConversationData(data: string): void {
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      conversationMemory = parsed.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error importing conversation data:', error);
  }
}

async function searchGoogle(query: string): Promise<GoogleSearchResult[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const cx = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;
  
  if (!apiKey || !cx) {
    console.warn('Google Search API credentials not configured');
    return [];
  }

  // Check rate limiting
  if (!checkRateLimit()) {
    console.warn('Rate limit exceeded for Google Search API');
    return [];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`,
      { 
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (response.status === 429) {
      console.warn('Google Search API quota exceeded');
      return [];
    }

    if (!response.ok) {
      throw new Error(`Google Search API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      title: item.title,
      snippet: item.snippet,
      link: item.link,
      source: new URL(item.link).hostname
    }));
  } catch (error) {
    console.error('Google Search API error:', error);
    return [];
  }
}

async function scrapeForumContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Basic HTML content extraction (you might want to use a proper HTML parser)
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return extractAutomotiveContent(textContent);
  } catch (error) {
    console.error('Forum scraping error:', error);
    return '';
  }
}

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

/**
 * Test the Google Search API configuration
 */
export async function testGoogleSearchSetup(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const cx = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || apiKey === 'your_new_api_key_here') {
      return {
        success: false,
        message: 'API key not configured. Please add your Google API key to the .env file.'
      };
    }

    if (!cx || cx === 'your_search_engine_id_here') {
      return {
        success: false,
        message: 'Search Engine ID not configured. Please add your Google Search Engine ID to the .env file.'
      };
    }

    // Try a test search
    const testResults = await searchGoogle('car maintenance tips');
    
    if (testResults.length > 0) {
      return {
        success: true,
        message: 'Google Search API is properly configured and working!'
      };
    } else {
      return {
        success: false,
        message: 'API configured but no results returned. Please check your Search Engine configuration.'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error testing Google Search API: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
