export interface BotPattern {
  pattern: RegExp;
  responses: string[];
  followUp?: string;
  context?: string;
} 