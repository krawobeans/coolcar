import { useState, FormEvent } from 'react';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Car } from 'lucide-react';
import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { Wrench } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

export default function BookingForm() {
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null as string | null
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await fetch('https://formsubmit.co/ajax/ahmadbahofficial@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to send booking request');

      setStatus({ submitting: false, submitted: true, error: null });
      form.reset();

      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);

    } catch (error) {
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send booking request. Please try again.' 
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form 
      onSubmit={handleSubmit}
      action="https://formsubmit.co/coolcarauto.info@gmail.com"
      method="POST"
      className="space-y-6"
    >
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_subject" value="New Service Booking Request" />
      <input type="hidden" name="_captcha" value="false" />

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
            name="name"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            name="email"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center group-hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 mr-1" />
              Phone *
            </span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your phone number"
          />
        </div>
      </div>

      {/* Car Information */}
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
            name="car_make"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            name="car_model"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Camry"
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
            name="car_year"
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          name="service_type"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            name="preferred_date"
            required
            min={today}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            name="preferred_time"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          name="message"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Any additional details about your service request..."
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={status.submitting}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
