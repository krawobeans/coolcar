import React, { useState } from 'react';
import { Calendar, Clock, Car, User, Mail, Phone, MessageSquare, Wrench, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    
    try {
      const response = await fetch('https://formspree.io/f/coolcarauto.info@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
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
      } else {
        throw new Error('Failed to send booking request');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get today's date for min date in date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background blobs with enhanced animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full mix-blend-multiply"
          style={{
            background: 'linear-gradient(to bottom left, rgba(191, 219, 254, 0.5), rgba(216, 180, 254, 0.5))',
            filter: 'blur(96px)',
            animation: 'blob 7s infinite',
            transformOrigin: 'center',
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full mix-blend-multiply"
          style={{
            background: 'linear-gradient(to top right, rgba(216, 180, 254, 0.5), rgba(191, 219, 254, 0.5))',
            filter: 'blur(96px)',
            animation: 'blob 7s infinite 2s',
            transformOrigin: 'center',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full mix-blend-multiply"
          style={{
            background: 'linear-gradient(to top right, rgba(191, 219, 254, 0.5), rgba(216, 180, 254, 0.5))',
            filter: 'blur(96px)',
            animation: 'blob 7s infinite 4s',
            transformOrigin: 'center',
          }}
        />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 animate-gradient">
              Book Your Service
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Schedule your car service appointment with our expert technicians. We'll take care of your vehicle with the highest level of professionalism.
            </p>
          </div>

          <div className="relative transform transition-all duration-500 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-xl blur-sm"></div>
            <div className="relative bg-white p-8 rounded-xl shadow-xl">
              {/* Status Messages */}
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Booking request sent successfully! We will contact you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Failed to send booking request. Please try again later.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <User className="w-4 h-4 mr-1" />
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <Phone className="w-4 h-4 mr-1" />
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
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
                        Car Make
                      </span>
                    </label>
                    <input
                      type="text"
                      name="carMake"
                      value={formData.carMake}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
                      placeholder="Toyota"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <Car className="w-4 h-4 mr-1" />
                        Car Model
                      </span>
                    </label>
                    <input
                      type="text"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
                      placeholder="Land Cruiser"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <Car className="w-4 h-4 mr-1" />
                        Year
                      </span>
                    </label>
                    <input
                      type="number"
                      name="carYear"
                      value={formData.carYear}
                      onChange={handleChange}
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
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
                      Service Type
                    </span>
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500 bg-white"
                  >
                    <option value="">Select a service</option>
                    <option value="General Maintenance">General Maintenance</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Tire Services">Tire Services & Suspension</option>
                    <option value="Mechanical Repairs">Mechanical Repairs</option>
                    <option value="Electrical Issues">Electrical Issues & Diagnostics</option>
                    <option value="Hybrid Systems">Hybrid Systems & Dashboard Lights</option>
                  </select>
                </div>

                {/* Preferred Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <Calendar className="w-4 h-4 mr-1" />
                        Preferred Date
                      </span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      min={today}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="flex items-center group-hover:text-blue-600 transition-colors">
                        <Clock className="w-4 h-4 mr-1" />
                        Preferred Time
                      </span>
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500 bg-white"
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="flex items-center group-hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Additional Information
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-500 resize-none"
                    placeholder="Please provide any additional details about your service needs..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Book Appointment'
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 