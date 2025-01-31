import React, { useState, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Clock, Car, User, Mail, Phone, MessageSquare, Wrench, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_BOOKING_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface FormData {
  name: string;
  email: string;
  phone: string;
  carMake: string;
  carModel: string;
  carYear: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

// Initialize EmailJS with useEffect to ensure it runs on the client side
export default function BookingForm() {
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized with public key:', EMAILJS_PUBLIC_KEY);
      console.log('Service ID:', EMAILJS_SERVICE_ID);
      console.log('Template ID:', EMAILJS_BOOKING_TEMPLATE_ID);
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.carMake || 
          !formData.carModel || !formData.carYear || !formData.serviceType || 
          !formData.preferredDate || !formData.preferredTime) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('Sending email with config:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_BOOKING_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY
      });

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_BOOKING_TEMPLATE_ID,
        {
          to_email: 'coolcarauto.info@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          car_make: formData.carMake,
          car_model: formData.carModel,
          car_year: formData.carYear,
          service_type: formData.serviceType,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          message: formData.message || 'No additional message',
          reply_to: formData.email
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS response:', response);

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        carMake: '',
        carModel: '',
        carYear: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);

    } catch (error) {
      console.error('Booking form error details:', error);
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: error instanceof Error ? error.message : 'Failed to send booking request. Please try again later.'
      });
    }
  };

  // Get today's date for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <User className="w-4 h-4 mr-1" />
              Full Name *
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Mail className="w-4 h-4 mr-1" />
              Email *
            </span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
            placeholder="john@example.com"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 mr-1" />
              Phone Number *
            </span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
            placeholder="+232 78 123456"
          />
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Car className="w-4 h-4 mr-1" />
              Car Make *
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.carMake}
            onChange={(e) => setFormData({ ...formData, carMake: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
            placeholder="Toyota"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Car className="w-4 h-4 mr-1" />
              Car Model *
            </span>
          </label>
          <input
            type="text"
            required
            value={formData.carModel}
            onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
            placeholder="Land Cruiser"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Car className="w-4 h-4 mr-1" />
              Year *
            </span>
          </label>
          <input
            type="number"
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.carYear}
            onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
            placeholder="2020"
          />
        </div>
      </div>

      {/* Service Type */}
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="flex items-center group-hover:text-blue-600 transition-colors">
            <Wrench className="w-4 h-4 mr-1" />
            Service Type *
          </span>
        </label>
        <select
          required
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
        >
          <option value="">Select a service</option>
          <option value="Oil Change">Oil Change</option>
          <option value="Brake Service">Brake Service</option>
          <option value="Tire Service">Tire Service</option>
          <option value="Engine Repair">Engine Repair</option>
          <option value="Transmission Service">Transmission Service</option>
          <option value="Diagnostic">Diagnostic</option>
          <option value="General Maintenance">General Maintenance</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Preferred Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Calendar className="w-4 h-4 mr-1" />
              Preferred Date *
            </span>
          </label>
          <input
            type="date"
            required
            min={today}
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Clock className="w-4 h-4 mr-1" />
              Preferred Time *
            </span>
          </label>
          <select
            required
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
          >
            <option value="">Select a time</option>
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>
        </div>
      </div>

      {/* Additional Message */}
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="flex items-center group-hover:text-blue-600 transition-colors">
            <MessageSquare className="w-4 h-4 mr-1" />
            Additional Message
          </span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
          placeholder="Any additional details about your service request..."
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={status.submitting}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.submitting ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Sending...
            </>
          ) : (
            'Book Appointment'
          )}
        </button>

        {status.submitted && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            Booking request sent successfully!
          </div>
        )}

        {status.error && (
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            {status.error}
          </div>
        )}
      </div>
    </form>
  );
}
