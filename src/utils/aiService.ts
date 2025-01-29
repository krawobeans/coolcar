const COHERE_API_URL = 'https://api.cohere.ai/v1/chat';
const API_KEY = import.meta.env.VITE_COHERE_API_KEY;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const SYSTEM_PROMPT = `You are an automotive expert assistant at Cool Car Auto Garage. 
Your responses should be:
- Professional and knowledgeable about cars and automotive maintenance
- Focused on helping customers understand their vehicle needs
- Include specific, accurate technical information when relevant
- Encourage proper vehicle maintenance and safety
- Aim to guide customers towards booking services when appropriate

Always maintain a helpful, friendly tone while providing accurate automotive advice.`;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAIResponse(message: string): Promise<string | null> {
  if (!API_KEY) {
    console.error('Cohere API key not found in environment variables');
    return null;
  }

  console.log('Attempting AI response for message:', message);

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const requestBody = {
        message,
        model: 'command',
        preamble: SYSTEM_PROMPT,
        conversation_id: 'automotive-chat',
        temperature: 0.7,
        max_tokens: 200,
        return_chatlog: false,
        stream: false
      };

      console.log(`Sending request to Cohere API (attempt ${retries + 1}/${MAX_RETRIES})`);

      const response = await fetch(COHERE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Cohere-Version': '2022-12-06'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.status === 429) {
        console.log(`Rate limit reached. Waiting ${RETRY_DELAY/1000} seconds before retry...`);
        await sleep(RETRY_DELAY);
        retries++;
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        return null;
      }

      const data = await response.json();
      console.log('Received AI response:', data);

      if (!data.text) {
        console.error('Invalid response format from AI API:', data);
        return null;
      }

      const generatedText = data.text.trim();
      console.log('Successfully generated AI response:', generatedText);
      return generatedText;
    } catch (error) {
      console.error('AI service error:', error);
      if (retries < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
        await sleep(RETRY_DELAY);
        retries++;
      } else {
        return null;
      }
    }
  }

  console.log('Max retries reached. Falling back to default response.');
  return null;
}

// Function to enhance response with automotive context
export function enhanceResponse(aiResponse: string, context: string): string {
  // The response from Cohere is already automotive-focused, just clean it up
  return aiResponse
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Function to check if response is automotive related
export function isAutomotiveRelated(text: string): boolean {
  // Cohere responses will always be automotive related due to the preamble
  return true;
} 