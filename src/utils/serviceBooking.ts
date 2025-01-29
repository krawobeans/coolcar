export interface ServiceBooking {
  id: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface BookingSlot {
  date: Date;
  time: string;
  isAvailable: boolean;
}

// Store bookings in localStorage
const STORAGE_KEY = 'coolcar_service_bookings';

// In-memory booking state for the current session
let currentBooking: Partial<ServiceBooking> = {};
let bookingStep: number = 0;

// Required fields for booking completion
export const requiredFields: (keyof ServiceBooking)[] = [
  'customerName',
  'phoneNumber',
  'vehicleMake',
  'vehicleModel',
  'vehicleYear',
  'serviceType',
  'preferredDate',
  'preferredTime'
];

// Load existing bookings from storage
function loadBookings(): ServiceBooking[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading bookings:', error);
    return [];
  }
}

// Save bookings to storage
function saveBookings(bookings: ServiceBooking[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings:', error);
  }
}

// Get available time slots for a given date
export function getAvailableSlots(date: Date): BookingSlot[] {
  const bookings = loadBookings();
  const slots: BookingSlot[] = [];
  
  // Business hours: 8 AM to 6 PM
  for (let hour = 8; hour < 18; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    const isBooked = bookings.some(
      booking => 
        booking.preferredDate.toDateString() === date.toDateString() &&
        booking.preferredTime === time &&
        booking.status !== 'cancelled'
    );
    
    slots.push({
      date,
      time,
      isAvailable: !isBooked
    });
  }
  
  return slots;
}

// Update the current booking information
export function updateBookingInfo(field: keyof ServiceBooking, value: any): void {
  currentBooking[field] = value;
}

// Get the next required field that needs to be filled
export function getNextRequiredField(): keyof ServiceBooking | null {
  return requiredFields.find(field => !currentBooking[field]) || null;
}

// Validate a booking field
export function validateField(field: keyof ServiceBooking, value: any): boolean {
  switch (field) {
    case 'phoneNumber':
      return /^\+?[\d\s-]{10,}$/.test(value);
    case 'email':
      return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'vehicleYear':
      const year = parseInt(value);
      return !isNaN(year) && year >= 1900 && year <= new Date().getFullYear();
    default:
      return value !== undefined && value !== '';
  }
}

// Create a new booking
export function createBooking(): ServiceBooking | null {
  if (requiredFields.every(field => currentBooking[field])) {
    const booking: ServiceBooking = {
      id: Date.now().toString(),
      ...currentBooking as Required<Omit<ServiceBooking, 'id' | 'status' | 'createdAt'>>,
      status: 'pending',
      createdAt: new Date()
    };
    
    const bookings = loadBookings();
    bookings.push(booking);
    saveBookings(bookings);
    
    // Reset current booking
    currentBooking = {};
    bookingStep = 0;
    
    return booking;
  }
  return null;
}

// Get the current booking progress
export function getBookingProgress(): {
  currentStep: number;
  totalSteps: number;
  nextField: keyof ServiceBooking | null;
  completed: boolean;
} {
  const nextField = getNextRequiredField();
  const completed = !nextField;
  
  return {
    currentStep: bookingStep,
    totalSteps: requiredFields.length,
    nextField,
    completed
  };
}

// Format booking details for display
export function formatBookingDetails(booking: ServiceBooking): string {
  return `
Booking Details:
- Name: ${booking.customerName}
- Phone: ${booking.phoneNumber}
${booking.email ? `- Email: ${booking.email}\n` : ''}
- Vehicle: ${booking.vehicleYear} ${booking.vehicleMake} ${booking.vehicleModel}
- Service: ${booking.serviceType}
- Date: ${booking.preferredDate.toLocaleDateString()}
- Time: ${booking.preferredTime}
${booking.description ? `- Description: ${booking.description}\n` : ''}
- Status: ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
  `.trim();
}

// Get a user-friendly prompt for the next required field
export function getFieldPrompt(field: keyof ServiceBooking): string {
  const prompts: Record<keyof ServiceBooking, string> = {
    customerName: "Please enter your full name:",
    phoneNumber: "Please enter your phone number:",
    email: "Please enter your email address (optional):",
    vehicleMake: "What is the make of your vehicle (e.g., Toyota, Honda)?",
    vehicleModel: "What is the model of your vehicle?",
    vehicleYear: "What year is your vehicle?",
    serviceType: "What type of service do you need?",
    preferredDate: "What date would you prefer for the service?",
    preferredTime: "What time would you prefer?",
    description: "Please describe any specific issues or requirements (optional):",
    id: "",
    status: "",
    createdAt: ""
  };
  
  return prompts[field];
}

// Export current booking state
export const getCurrentBooking = () => currentBooking;
export const getCurrentStep = () => bookingStep;
export const incrementStep = () => bookingStep++; 