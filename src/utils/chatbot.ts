import { 
  storeConversation, 
  findSimilarConversations
} from './chatLearning';
import {
  getCurrentBooking,
  getCurrentStep,
  incrementStep,
  updateBookingInfo,
  getNextRequiredField,
  validateField,
  createBooking,
  getFieldPrompt,
  formatBookingDetails,
  getAvailableSlots,
  requiredFields,
  ServiceBooking
} from './serviceBooking';
import { BotPattern } from './types';
import { bookingPatterns, parseDate, parseTime } from './bookingPatterns';
import { getAIResponse, enhanceResponse, isAutomotiveRelated } from './aiService';

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

// Add personality to responses
function addPersonality(response: string): string {
  const emojis = ['🚗', '🔧', '👨‍🔧', '👍', '😊'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return Math.random() > 0.7 ? `${response} ${emoji}` : response;
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

const carProblems = {
  engine: {
    symptoms: [
      'not starting', 'stalling', 'rough idle', 'check engine light', 'knocking',
      'ticking', 'misfire', 'power loss', 'overheating', 'hard to start',
      'smoking exhaust', 'burning smell', 'poor acceleration', 'vibration',
      'loud noise', 'backfiring', 'high fuel consumption'
    ],
    solutions: [
      "This could be related to the fuel system, battery, or engine components.",
      "We recommend bringing your car in for a diagnostic check.",
      "Our technicians can perform a comprehensive engine inspection.",
      "This might require electronic diagnostic testing to identify the exact issue.",
      "We'll perform a complete engine health check to pinpoint the problem.",
      "Our advanced diagnostic tools can help identify the root cause quickly."
    ],
    urgency: 'high',
    diagnostic_steps: [
      'Computer diagnostic scan',
      'Compression test',
      'Fuel pressure test',
      'Spark plug inspection',
      'Vacuum leak test',
      'Emissions analysis',
      'Battery load test'
    ],
    maintenance_tips: [
      'Regular oil changes',
      'Clean air filter',
      'Use recommended fuel grade',
      'Check coolant levels',
      'Monitor warning lights'
    ]
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
    symptoms: [
      'battery dead', 'lights flickering', 'not charging', 'electrical failure',
      'warning lights', 'starter problems', 'alternator noise', 'dim lights',
      'slow crank', 'radio issues', 'power windows slow', 'fuses blowing',
      'battery light on', 'no power accessories'
    ],
    solutions: [
      "Electrical issues can be complex and require diagnostic testing.",
      "We have advanced equipment to test electrical systems.",
      "Our technicians are experienced with automotive electrical systems.",
      "We can perform a complete electrical system diagnosis.",
      "We'll check all electrical components including alternator and starter.",
      "Our diagnostic tools can identify intermittent electrical issues."
    ],
    urgency: 'medium',
    diagnostic_steps: [
      'Battery load test',
      'Alternator output test',
      'Circuit testing',
      'Starter system check',
      'Computer system scan',
      'Voltage drop test',
      'Ground connection check'
    ],
    maintenance_tips: [
      'Regular battery checks',
      'Clean battery terminals',
      'Check charging system',
      'Inspect wiring condition',
      'Monitor battery age'
    ]
  },
  cooling: {
    symptoms: [
      'overheating', 'coolant leak', 'sweet smell', 'steam from hood',
      'temperature gauge high', 'coolant low', 'radiator noise', 'heater not working',
      'coolant mixing with oil', 'radiator fan not working'
    ],
    solutions: [
      "Cooling system issues can lead to serious engine damage if not addressed.",
      "We can perform pressure testing to locate any leaks.",
      "Our technicians will inspect all cooling system components.",
      "We'll check the radiator, water pump, and thermostat."
    ],
    urgency: 'high',
    diagnostic_steps: [
      'Cooling system pressure test',
      'Thermostat check',
      'Fan operation test',
      'Coolant level and condition check',
      'Head gasket inspection',
      'Water pump inspection'
    ],
    maintenance_tips: [
      'Regular coolant flushes',
      'Check coolant levels',
      'Inspect hoses and clamps',
      'Monitor temperature gauge',
      'Keep radiator clean'
    ]
  },
  suspension: {
    symptoms: [
      'bouncing', 'uneven tire wear', 'nose diving', 'swaying', 'rough ride',
      'clunking noise', 'steering wheel vibration', 'pulling to one side',
      'squeaking over bumps', 'knocking sounds', 'poor handling'
    ],
    solutions: [
      "This could indicate worn suspension components.",
      "We can perform a thorough suspension inspection.",
      "Our alignment equipment can identify suspension issues.",
      "Regular suspension maintenance ensures safe handling.",
      "We'll check all suspension components for wear and damage."
    ],
    urgency: 'medium',
    diagnostic_steps: [
      'Suspension component inspection',
      'Alignment check',
      'Shock/strut test',
      'Ball joint inspection',
      'Bushing inspection',
      'Tire wear analysis'
    ],
    maintenance_tips: [
      'Regular alignment checks',
      'Rotate tires regularly',
      'Check tire pressure',
      'Inspect shocks/struts',
      'Listen for unusual noises'
    ]
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
  },
  {
    pattern: /\b(book|schedule|appointment|booking)\s+(service|maintenance|repair)\b/i,
    responses: [
      "I'll help you book a service appointment. Let's get started with your details.",
      "I can assist you with scheduling a service. I'll need some information from you.",
      "Let's get your service appointment scheduled. I'll guide you through the process."
    ],
    context: 'booking_start'
  },
  {
    pattern: /\b(cancel|stop|abort)\s+(booking|appointment|scheduling)\b/i,
    responses: [
      "I've cancelled the booking process. Let me know if you'd like to start over.",
      "Booking process cancelled. Is there anything else I can help you with?",
      "I've stopped the scheduling process. Feel free to start again when you're ready."
    ],
    context: 'booking_cancel'
  }
];

// Add booking patterns to main patterns array
botPatterns.push(...bookingPatterns);

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

export const getInitialGreeting = (): string => {
  const greetings = [
    "Welcome to Cool Car Auto Garage! How can we help you today?",
    "Hello! Looking to service your car? We're here to help!",
    "Hi there! Need help with your vehicle? Just ask!",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

// Process user message and generate response
export async function processMessage(message: string): Promise<string> {
  try {
    // Check for similar conversations in memory
    const similarConversations = findSimilarConversations(message, 'general');
    
    if (similarConversations.length > 0) {
      // Use the most relevant previous conversation
      const bestMatch = similarConversations[0];
      storeConversation(message, bestMatch.answer, 'general');
      return addPersonality(bestMatch.answer);
    }

    // If no similar conversation found, use AI service
    const aiResponse = await getAIResponse(message);
    if (aiResponse) {
      const enhancedResponse = enhanceResponse(aiResponse, 'general');
      storeConversation(message, enhancedResponse, 'general');
      return addPersonality(enhancedResponse);
    }

    // Fallback response
    return "I'm sorry, I couldn't understand that. Could you please rephrase your question?";
  } catch (error) {
    console.error('Error processing message:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
  }
} 