import { BotPattern } from './types';

export function parseDate(input: string): Date | null {
  const date = new Date(input);
  if (!isNaN(date.getTime())) return date;
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('today')) return today;
  if (lowerInput.includes('tomorrow')) return tomorrow;
  
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayIndex = days.findIndex(day => lowerInput.includes(day));
  if (dayIndex !== -1) {
    const targetDate = new Date();
    const currentDay = targetDate.getDay();
    const daysUntilTarget = (dayIndex + 7 - currentDay) % 7;
    targetDate.setDate(targetDate.getDate() + daysUntilTarget);
    return targetDate;
  }
  
  return null;
}

export function parseTime(input: string): string | null {
  const timeRegex = /^([0-1]?[0-9]|2[0-3])(:([0-5][0-9]))?$/;
  if (timeRegex.test(input)) {
    const [hours, minutes = '00'] = input.split(':');
    return `${hours.padStart(2, '0')}:${minutes}`;
  }
  
  const twelveHourRegex = /^(1[0-2]|0?[1-9])(:[0-5][0-9])?\s*(am|pm)$/i;
  if (twelveHourRegex.test(input)) {
    const [_, hours, minutes = ':00', meridiem] = input.match(twelveHourRegex)!;
    const hour24 = (parseInt(hours) + (meridiem.toLowerCase() === 'pm' ? 12 : 0)) % 24;
    return `${hour24.toString().padStart(2, '0')}:${minutes.slice(1)}`;
  }
  
  return null;
}

export const bookingPatterns: BotPattern[] = [
  {
    pattern: /\b(book|schedule|appointment|booking)\s+(service|maintenance|repair)\b/i,
    responses: [
      "I'll help you book a service appointment. Let's get started with your details.",
      "I can assist you with scheduling a service. I'll need some information from you.",
      "Let's get your service appointment scheduled. I'll guide you through the process."
    ],
    context: 'booking_start'
  }
]; 