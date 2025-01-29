import { 
  storeConversation, 
  findSimilarConversations, 
  learnFromWeb 
} from './chatLearning';

interface BotPattern {
  pattern: RegExp;
  responses: string[];
  followUp?: string;
  context?: string;
}

// Car brands and models database
const carBrands = {
  toyota: {
    models: ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Hilux', 'Prado'],
    specialties: ['Hybrid systems', 'Electronic control units', 'Transmission systems']
  },
  honda: {
    models: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
    specialties: ['VTEC engines', 'CVT transmissions', 'Honda Sensing systems']
  },
  mercedes: {
    models: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLC'],
    specialties: ['MBUX systems', 'Air suspension', 'Advanced driver assistance']
  },
  bmw: {
    models: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
    specialties: ['iDrive systems', 'Valvetronic engines', 'xDrive systems']
  },
  audi: {
    models: ['A4', 'A6', 'Q5', 'Q7', 'A3'],
    specialties: ['quattro systems', 'MMI navigation', 'S-tronic transmission']
  }
};

// Common repair procedures and estimated durations
const repairServices = {
  oilChange: {
    duration: '30-45 minutes',
    includes: ['Oil filter replacement', 'Synthetic oil', 'Multi-point inspection'],
    maintenance_interval: '5,000-7,500 km'
  },
  brakeService: {
    duration: '1-2 hours',
    includes: ['Pad replacement', 'Rotor inspection', 'Brake fluid check'],
    maintenance_interval: '20,000-25,000 km'
  },
  wheelAlignment: {
    duration: '45-60 minutes',
    includes: ['Four-wheel alignment', 'Tire pressure check', 'Suspension inspection'],
    maintenance_interval: '15,000-20,000 km'
  },
  transmission: {
    duration: '2-4 hours',
    includes: ['Fluid change', 'Filter replacement', 'Pan cleaning'],
    maintenance_interval: '40,000-60,000 km'
  }
};

const carProblems = {
  engine: {
    symptoms: ['not starting', 'stalling', 'rough idle', 'check engine light', 'knocking', 'ticking', 'misfire', 'power loss', 'overheating'],
    solutions: [
      'This could be related to the fuel system, battery, or engine components.',
      'We recommend bringing your car in for a diagnostic check.',
      'Our technicians can perform a comprehensive engine inspection.',
      'This might require electronic diagnostic testing to identify the exact issue.'
    ],
    urgency: 'high',
    diagnostic_steps: ['Computer diagnostic scan', 'Compression test', 'Fuel pressure test']
  },
  brakes: {
    symptoms: ['squeaking', 'grinding', 'soft pedal', 'vibration', 'pulling', 'pulsating', 'longer stopping distance', 'brake warning light'],
    solutions: [
      'This might indicate worn brake pads or rotor issues.',
      'Brake system maintenance is crucial for safety.',
      'We can perform a complete brake inspection.',
      'This requires immediate attention for your safety.'
    ],
    urgency: 'high',
    diagnostic_steps: ['Brake pad measurement', 'Rotor inspection', 'Hydraulic system test']
  },
  transmission: {
    symptoms: ['slipping', 'jerking', 'delayed engagement', 'grinding', 'whining', 'burning smell', 'gear hunting', 'no reverse'],
    solutions: [
      'Transmission issues require professional diagnosis.',
      'We specialize in transmission repair and maintenance.',
      'Regular transmission service can prevent major issues.',
      'Our diagnostic equipment can pinpoint transmission problems.'
    ],
    urgency: 'medium',
    diagnostic_steps: ['Transmission fluid check', 'Computer diagnostic scan', 'Road test']
  },
  electrical: {
    symptoms: ['battery dead', 'lights flickering', 'not charging', 'electrical failure', 'warning lights', 'starter problems', 'alternator noise'],
    solutions: [
      'Electrical issues can be complex and require diagnostic testing.',
      'We have advanced equipment to test electrical systems.',
      'Our technicians are experienced with automotive electrical systems.',
      'We can perform a complete electrical system diagnosis.'
    ],
    urgency: 'medium',
    diagnostic_steps: ['Battery load test', 'Alternator output test', 'Circuit testing']
  },
  suspension: {
    symptoms: ['bouncing', 'uneven tire wear', 'nose diving', 'swaying', 'rough ride', 'clunking noise', 'steering wheel vibration'],
    solutions: [
      'This could indicate worn suspension components.',
      'We can perform a thorough suspension inspection.',
      'Our alignment equipment can identify suspension issues.',
      'Regular suspension maintenance ensures safe handling.'
    ],
    urgency: 'medium',
    diagnostic_steps: ['Suspension component inspection', 'Alignment check', 'Shock/strut test']
  }
};

// Available appointment slots (would typically come from a database)
const appointmentSlots = {
  morning: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  priority: ['11:30 AM', '4:30 PM'] // Reserved for emergencies
};

const casualConversation = {
  jokes: [
    "Why don't cars like telling jokes? Because they're afraid of crack-ing up! 🚗",
    "What kind of car does a snake drive? An Ana-Honda! 🐍",
    "Why did the cookie go to the doctor? Because it was feeling crumby! 🍪",
    "What did the tired car say? I'm exhausted! 🚙",
    "Why don't engines like gossip? They don't want to spread ru-motors! 🔧"
  ],
  weatherResponses: {
    sunny: ["Perfect day for a car wash!", "Great day to take your car for a spin!"],
    rainy: ["Drive safely in this weather!", "Remember to check your wipers and tires in wet conditions."],
    cold: ["Don't forget to warm up your engine!", "Perfect time to check your battery and antifreeze."],
    hot: ["Keep an eye on your engine temperature in this heat!", "Make sure your AC is working well!"]
  },
  sportsTeams: ["Are you a football fan?", "Did you catch the game last night?", "Sports are a great way to unwind after work!"],
  generalTopics: [
    "How's your day going so far?",
    "Have any exciting plans for the weekend?",
    "How long have you been driving your current car?",
    "What's your favorite thing about your car?"
  ]
};

const botPatterns: BotPattern[] = [
  // Greetings
  {
    pattern: /\b(hi|hello|hey|good\s*(morning|afternoon|evening))\b/i,
    responses: [
      "Hello! Welcome to Cool Car Auto Garage. How can I assist you today?",
      "Hi there! I'm here to help with your automotive needs. What can I do for you?",
      "Welcome! How may I help you with your vehicle today?"
    ],
    context: 'greeting'
  },

  // Car Problems
  {
    pattern: new RegExp(`\\b(${Object.values(carProblems).flatMap(p => p.symptoms).join('|')})\\b`, 'i'),
    responses: [
      "I understand you're having an issue with your vehicle. Could you tell me more about when this started?",
      "That sounds like it needs attention. When did you first notice this problem?",
      "I can help diagnose that issue. Can you provide more details about the symptoms?"
    ],
    followUp: "Based on your description, I recommend bringing your car in for a professional inspection. Would you like to schedule an appointment?",
    context: 'diagnostic'
  },

  // Car Brands
  {
    pattern: new RegExp(`\\b(${Object.keys(carBrands).join('|')})\\b`, 'i'),
    responses: [
      "Yes, we specialize in servicing that brand. Which specific model do you have?",
      "We have certified technicians for that make. What model are you driving?",
      "We're very familiar with that brand. Could you tell me the model year and specific issues you're experiencing?"
    ],
    context: 'brand_specific'
  },

  // Appointment Scheduling
  {
    pattern: /\b(book|schedule|appointment|available|when|slot)\b/i,
    responses: [
      "I can help you schedule an appointment. What type of service do you need?",
      "We have several appointment slots available. What day works best for you?",
      "I'll assist you with booking. Could you specify the service you're looking for?"
    ],
    followUp: "Please provide your preferred date and time, and I'll check our availability.",
    context: 'booking'
  },

  // Service Inquiries
  {
    pattern: /\b(service|maintenance|repair|check|inspect)\b/i,
    responses: [
      "We offer comprehensive automotive services. What specific service are you interested in?",
      "Our expert technicians provide a wide range of services. What does your vehicle need?",
      "We can help with all your service needs. What type of service are you looking for?"
    ],
    context: 'service'
  },

  // Maintenance Intervals
  {
    pattern: /\b(how\s+often|when\s+should|maintenance\s+schedule|interval)\b/i,
    responses: [
      "Maintenance intervals depend on your vehicle's make, model, and usage. Could you provide those details?",
      "I can help you determine the right maintenance schedule. What's your car's make and current mileage?",
      "Let me check the recommended maintenance schedule. What vehicle do you have?"
    ],
    context: 'maintenance'
  },

  // Service Duration
  {
    pattern: /\b(how\s+long|duration|time\s+take|wait)\b/i,
    responses: [
      "Service duration varies based on the type of work needed. What service are you interested in?",
      "I can provide an estimated time frame. Which service are you asking about?",
      "Let me check the typical duration for you. What service do you need?"
    ],
    context: 'duration'
  },

  // Emergency Assistance
  {
    pattern: /\b(emergency|urgent|breakdown|stuck|stranded|tow)\b/i,
    responses: [
      "I understand this is an emergency. Are you in a safe location?",
      "Your safety is our priority. Do you need immediate roadside assistance?",
      "For urgent situations, we can prioritize your service. Are you in a secure place?"
    ],
    followUp: "You can reach our emergency service at +232 78590287. Would you like me to explain the next steps?",
    context: 'emergency'
  },

  // Location and Hours
  {
    pattern: /\b(where|location|address|direction|hour|time|open)\b/i,
    responses: [
      "We're located at 156 Bai Bureh Road, Freetown. Our hours are Monday to Saturday, 8:00 AM to 6:00 PM.",
      "You can find us at 156 Bai Bureh Road in Freetown. We're open Monday-Saturday, 8 AM-6 PM.",
      "Our garage is at 156 Bai Bureh Road, Freetown. Business hours: Mon-Sat, 8:00 AM to 6:00 PM."
    ],
    context: 'information'
  },

  // Vehicle Types
  {
    pattern: /\b(work on|handle|fix|repair|service)\s+(what|which|type|brand|make)\b/i,
    responses: [
      "We specialize in both European and Asian car brands. Which make and model do you have?",
      "Our technicians are certified to work on all major European and Asian vehicles. What's your car's make?",
      "We service all European and Asian vehicles. Could you tell me about your car?"
    ],
    context: 'information'
  },

  // Diagnostic Questions
  {
    pattern: /\b(why|what|how|when)\s+(is|does|should|could|would|will|can|might)\b/i,
    responses: [
      "That's a good question. To provide accurate information, could you give me more details?",
      "I'll help you understand the issue. Can you provide more specific information?",
      "Let me assist you with that. Could you elaborate on your concern?"
    ],
    context: 'diagnostic'
  },

  // Casual Conversation Patterns
  {
    pattern: /\b(how are you|how('s| is) it going|what('s| is) up|how('s| is) your day)\b/i,
    responses: [
      "I'm doing great, thanks for asking! How about you?",
      "I'm having a wonderful day helping our customers. How are you?",
      "All good here! Always happy to chat. How's your day going?"
    ],
    context: 'casual'
  },
  {
    pattern: /\b(joke|funny|make me laugh|tell me something funny)\b/i,
    responses: casualConversation.jokes,
    context: 'entertainment'
  },
  {
    pattern: /\b(weather|sunny|rainy|cold|hot|temperature)\b/i,
    responses: [
      ...casualConversation.weatherResponses.sunny,
      ...casualConversation.weatherResponses.rainy,
      ...casualConversation.weatherResponses.cold,
      ...casualConversation.weatherResponses.hot
    ],
    context: 'weather'
  },
  {
    pattern: /\b(weekend|plans|fun|hobby|free time)\b/i,
    responses: [
      "Got any fun weekend plans? I'd love to hear about them!",
      "Weekends are perfect for car maintenance and road trips. Any plans?",
      "Taking your car somewhere special this weekend?"
    ],
    context: 'casual'
  },
  {
    pattern: /\b(thanks|thank you|appreciate|helpful)\b/i,
    responses: [
      "You're very welcome! It's my pleasure to help. 😊",
      "Glad I could assist! Don't hesitate to ask if you need anything else.",
      "That's what I'm here for! Let me know if you need more help."
    ],
    context: 'gratitude'
  },
  {
    pattern: /\b(bye|goodbye|see you|talk to you later|have a good|good night)\b/i,
    responses: [
      "Take care! Drive safely! 🚗",
      "Goodbye! Remember, we're here whenever you need us! 👋",
      "Have a great day! Looking forward to helping you again! 😊"
    ],
    context: 'farewell'
  },
  {
    pattern: /\b(music|song|radio|playlist)\b/i,
    responses: [
      "Music makes every drive better! What's your favorite driving song?",
      "Nothing like some good tunes on the road! Got a favorite playlist?",
      "I love when customers enjoy music while we work on their cars!"
    ],
    context: 'entertainment'
  },
  {
    pattern: /\b(favorite|best|love|enjoy)\s+(car|vehicle|drive|driving)\b/i,
    responses: [
      "That's a great choice! What do you love most about your car?",
      "Cars are a passion of ours too! What made you choose your current vehicle?",
      "Everyone has their dream car! What's yours?"
    ],
    context: 'casual'
  }
];

function findMatchingPattern(message: string): BotPattern | null {
  return botPatterns.find(pattern => pattern.pattern.test(message)) || null;
}

function findCarProblem(message: string): { type: string; solutions: string[]; urgency: string; steps: string[] } | null {
  for (const [type, data] of Object.entries(carProblems)) {
    if (data.symptoms.some(symptom => message.toLowerCase().includes(symptom))) {
      return { 
        type, 
        solutions: data.solutions,
        urgency: data.urgency,
        steps: data.diagnostic_steps
      };
    }
  }
  return null;
}

function findCarBrand(message: string): { brand: string; models: string[]; specialties: string[] } | null {
  for (const [brand, data] of Object.entries(carBrands)) {
    if (message.toLowerCase().includes(brand)) {
      return { brand, models: data.models, specialties: data.specialties };
    }
  }
  return null;
}

type ServiceType = keyof typeof repairServices;

function getServiceInfo(service: string) {
  const serviceKey = Object.keys(repairServices).find(key => 
    service.toLowerCase().includes(key.toLowerCase())
  ) as ServiceType | undefined;
  return serviceKey ? repairServices[serviceKey] : null;
}

export async function generateBotResponse(message: string): Promise<string> {
  const pattern = findMatchingPattern(message);
  const carProblem = findCarProblem(message);
  const carBrand = findCarBrand(message);
  const serviceInfo = getServiceInfo(message);
  
  // Add personality to responses
  const addPersonality = (response: string) => {
    const emojis = ['🚗', '🔧', '👨‍🔧', '👍', '😊'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return Math.random() > 0.7 ? `${response} ${emoji}` : response;
  };

  // Try to find similar conversations first
  const context = pattern?.context || 'general';
  const similarConversations = findSimilarConversations(message, context);
  
  // If we have a very similar previous conversation, use that response
  const bestMatch = similarConversations[0];
  if (bestMatch && (bestMatch as any).similarity > 0.8) {
    storeConversation(message, bestMatch.answer, context);
    return addPersonality(bestMatch.answer);
  }

  // Try to learn from web
  try {
    const webResults = await learnFromWeb(message);
    if (webResults.length > 0) {
      const bestResult = webResults[0];
      const response = bestResult.content;
      storeConversation(message, response, context, 'neutral');
      return addPersonality(response);
    }
  } catch (error) {
    console.error('Error learning from web:', error);
  }
  
  // Fall back to standard responses if no learned response available
  let response: string;
  
  if (carProblem) {
    const solution = carProblem.solutions[Math.floor(Math.random() * carProblem.solutions.length)];
    const urgencyMessage = carProblem.urgency === 'high' ? 
      " This issue requires immediate attention." : 
      " We recommend addressing this soon.";
    response = `${solution}${urgencyMessage} Would you like to schedule an inspection? Our diagnostic process includes: ${carProblem.steps.join(', ')}.`;
  } else if (carBrand) {
    response = `We specialize in ${carBrand.brand.toUpperCase()} vehicles, including all ${carBrand.models.join(', ')} models. Our technicians are certified in ${carBrand.specialties.join(', ')}. How can we help with your ${carBrand.brand}?`;
  } else if (serviceInfo) {
    response = `This service typically takes ${serviceInfo.duration} and includes ${serviceInfo.includes.join(', ')}. The recommended maintenance interval is ${serviceInfo.maintenance_interval}. Would you like to schedule this service?`;
  } else if (pattern) {
    response = pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
    if (pattern.followUp) {
      response = `${response} ${pattern.followUp}`;
    }
  } else {
    const defaultResponses = [
      "I'm here to help with your automotive needs and happy to chat! Could you tell me more about what's on your mind?",
      "I'd love to help you! Could you provide more details about what you're looking for?",
      "I'm all ears! What can I help you with today?",
      "Let's figure this out together! What would you like to know more about?"
    ];
    response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Store the conversation for future learning
  storeConversation(message, response, context, 'neutral');
  
  return addPersonality(response);
}

export function getInitialGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning! Welcome to Cool Car Auto Garage. How can I assist you today?";
  } else if (hour < 17) {
    return "Good afternoon! Welcome to Cool Car Auto Garage. How can I help you?";
  } else {
    return "Good evening! Welcome to Cool Car Auto Garage. How may I assist you?";
  }
} 