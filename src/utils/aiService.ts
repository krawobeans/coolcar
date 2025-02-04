// CHATBOT TEMPORARILY DISABLED DUE TO API MAINTENANCE

/*
import axios from 'axios';

const DEEPSEEK_API_KEY = process.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Types for DeepSeek AI responses
interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  id: string;
  choices: {
    message: DeepSeekMessage;
    finish_reason: string;
  }[];
}

// System prompt for automotive context
const SYSTEM_PROMPT = `You are an expert automotive service assistant at Cool Car Auto Garage.
Your knowledge covers:
- Car maintenance and repairs
- Diagnostics and troubleshooting
- Service scheduling and recommendations
- Vehicle specifications and features
- Brand-specific expertise

Provide helpful, professional responses while maintaining a friendly tone.
Focus on automotive-related queries and guide users toward proper vehicle care.`;

// Keep track of conversation history
let conversationHistory: DeepSeekMessage[] = [
  { role: 'system', content: SYSTEM_PROMPT }
];

// Clear conversation history
export const clearConversation = () => {
  conversationHistory = [{ role: 'system', content: SYSTEM_PROMPT }];
};

// Get AI response using DeepSeek API
export async function getAIResponse(message: string): Promise<string | null> {
  try {
    if (!DEEPSEEK_API_KEY) {
      console.error('DeepSeek API key not found');
      return null;
    }

    // Add user message to history
    conversationHistory.push({ role: 'user', content: message });

    // Prepare API request
    const response = await axios.post<DeepSeekResponse>(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiMessage = response.data.choices[0]?.message?.content;
    
    if (aiMessage) {
      // Add AI response to history
      conversationHistory.push({ role: 'assistant', content: aiMessage });
      
      // Limit conversation history to last 10 messages to prevent token limit issues
      if (conversationHistory.length > 11) { // 11 includes system prompt
        conversationHistory = [
          conversationHistory[0],
          ...conversationHistory.slice(-10)
        ];
      }
      
      return aiMessage;
    }

    return null;
  } catch (error) {
    console.error('Error calling DeepSeek AI:', error);
    return null;
  }
}

// Enhance response with automotive context if needed
export function enhanceResponse(response: string, context: string = 'general'): string {
  // Already using automotive-focused system prompt, so minimal enhancement needed
  return response.trim();
}

// Export conversation history for external use if needed
export const getConversationHistory = () => [...conversationHistory];
*/

// Temporary exports during maintenance
export const clearConversation = () => {};
export const getAIResponse = async () => "Our chat service is currently undergoing maintenance. Please call us at +232 78590287 for assistance.";
export const enhanceResponse = (response: string) => response;
export const getConversationHistory = () => []; 