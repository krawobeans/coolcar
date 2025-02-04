import React from 'react';
import { Link } from 'react-router-dom';
// Import only the specific icons we need instead of the whole library
import { Wrench, Battery, Droplet, Cog, Zap } from 'lucide-react';
import { GiCarWheel } from 'react-icons/gi';
import { FaQuoteLeft } from "react-icons/fa";
import { useReviews } from '../context/ReviewContext';
import type { Review } from '../lib/supabase';

const services = [
  { 
    icon: Wrench, 
    title: 'General Maintenance', 
    description: 'We provide comprehensive vehicle maintenance to keep your car running smoothly.',
    details: [
      'Regular maintenance checks',
      'Fluid level monitoring',
      'Filter replacements',
      'Belt and hose inspections'
    ]
  },
  { 
    icon: Battery, 
    title: 'Hybrid Systems & Dashboard Lights', 
    description: 'Expert diagnostics and repairs for hybrid systems and warning lights.',
    details: [
      'Hybrid battery testing',
      'System diagnostics',
      'Warning light analysis',
      'Electronic system repairs'
    ]
  },
  { 
    icon: Droplet, 
    title: 'Oil Change', 
    description: 'Professional oil change service using high-quality synthetic oils.',
    details: [
      'Synthetic oil changes',
      'Oil filter replacement',
      'Oil level checks',
      'Oil quality analysis'
    ]
  },
  { 
    icon: GiCarWheel, 
    title: 'Tire Services & Suspension', 
    description: 'Complete tire and suspension services for optimal vehicle performance.',
    details: [
      'Wheel alignment',
      'Tire rotation',
      'Suspension repairs',
      'Brake system maintenance'
    ]
  },
  { 
    icon: Cog, 
    title: 'Mechanical Repairs', 
    description: 'Comprehensive mechanical repairs for all vehicle makes and models.',
    details: [
      'Engine repairs',
      'Transmission service',
      'Clutch replacement',
      'Cooling system repairs'
    ]
  },
  { 
    icon: Zap, 
    title: 'Electrical Issues & Diagnostics', 
    description: 'Advanced diagnostic testing and electrical system repairs.',
    details: [
      'Computer diagnostics',
      'Electrical system repairs',
      'Battery testing',
      'Alternator service'
    ]
  }
];

export default function ServicesPage() {
  const { getTopRatedReviews } = useReviews();
  const [testimonials, setTestimonials] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadTestimonials() {
      try {
        const reviews = await getTopRatedReviews(2);
        setTestimonials(reviews || []);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, [getTopRatedReviews]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'linear-gradient(to bottom left, rgba(191, 219, 254, 0.5), rgba(216, 180, 254, 0.5))',
            filter: 'blur(96px)',
            animation: 'blob 7s infinite',
          }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'linear-gradient(to top right, rgba(216, 180, 254, 0.5), rgba(191, 219, 254, 0.5))',
            filter: 'blur(96px)',
            animation: 'blob 7s infinite 2s',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'linear-gradient(to top right, rgba(191, 219, 254, 0.5), rgba(216, 180, 254, 0.5))',
            filter: 'blur(96px)',
            animation: 'blob 7s infinite 4s',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section - Adjusted for mobile */}
        <div className="pt-28 md:pt-32 pb-8 md:pb-16 relative overflow-hidden bg-transparent">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                  Our Services
                </h1>
                <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
                  Professional automotive services delivered by experienced technicians using state-of-the-art equipment
                </p>
              </div>
              
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-60 blur-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <img 
                  src="public/landcruiser-logo.webp" 
                  alt="Toyota Land Cruiser" 
                  className="relative w-full h-auto max-w-sm md:max-w-md lg:max-w-lg mx-auto transform group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-20 relative">
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5 rounded-xl"></div>
                  <div className="p-8 relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-[24px] rotate-[10deg] flex items-center justify-center mb-6 shadow-lg group-hover:rotate-0 transition-all duration-300">
                      <div className="rotate-[-10deg] group-hover:rotate-0 transition-all duration-300">
                        <service.icon className="text-white text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 hover:text-gray-900 transition-colors">
                          <span className="text-blue-500 mr-2 mt-1.5">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to="/booking"
                      state={{ service: service.title }}
                      className="group relative inline-flex w-full items-center justify-center py-4 px-6 overflow-hidden rounded-lg transition-all duration-500 ease-out"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 rounded-lg"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-90 rounded-lg transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <span className="relative flex items-center justify-center text-white font-semibold group-hover:scale-105 transition-transform duration-300">
                        <span className="mr-2">Book Service</span>
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Process Section */}
            <div className="mt-32 mb-20">
              <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-16">Our Service Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {[
                  { title: 'Diagnosis', desc: 'Thorough inspection and problem identification', icon: Wrench },
                  { title: 'Consultation', desc: 'Detailed discussion of issues and solutions', icon: Cog },
                  { title: 'Repair', desc: 'Expert repair with quality parts', icon: Zap },
                  { title: 'Quality Check', desc: 'Final inspection and testing', icon: Cog }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5 rounded-xl"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
                        <item.icon className="text-3xl" />
                      </div>
                      <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 block">STEP {index + 1}</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform -translate-y-1/2 translate-x-4 opacity-50" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-20 relative">
              <div className="max-w-6xl mx-auto px-4 relative">
                <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">Why Choose Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
                      <span className="text-4xl text-white font-bold">20+</span>
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-3">Years Experience</h3>
                    <p className="text-gray-600">Two decades of automotive excellence and trusted service</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-6 group-hover:rotate-0 transition-all duration-300">
                      <span className="text-4xl text-white font-bold">5k+</span>
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-3">Happy Customers</h3>
                    <p className="text-gray-600">Thousands of satisfied customers trust our service</p>
                  </div>
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-all duration-300">
                      <span className="text-4xl text-white font-bold">100%</span>
                    </div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-3">Satisfaction Rate</h3>
                    <p className="text-gray-600">Committed to excellence in every service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Testimonials Section */}
            <div className="py-20 relative">
              <div className="max-w-6xl mx-auto px-4 relative">
                <h2 className="text-3xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                  What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  {loading ? (
                    // Loading skeleton
                    <>
                      <div className="bg-white p-8 rounded-xl shadow animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="bg-white p-8 rounded-xl shadow animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </>
                  ) : testimonials.length > 0 ? (
                    testimonials.map((review) => (
                      <div 
                        key={review.id} 
                        className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 opacity-30"></div>
                        <div className="relative">
                          <FaQuoteLeft className="text-blue-300 text-4xl mb-4" />
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.comment}"</p>
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 text-white">
                              <span className="font-semibold text-lg">
                                {review.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">{review.name}</p>
                              <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-500">
                      No testimonials available at the moment.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="py-20 relative">
              <div className="text-center relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                  Ready to Experience Our Service?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join our satisfied customers and experience automotive excellence
                </p>
                <Link 
                  to="/booking" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-lg transition-all duration-500 ease-out"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 rounded-lg"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-90 rounded-lg transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <span className="relative flex items-center text-white font-semibold group-hover:scale-105 transition-transform duration-300">
                    <span className="mr-2">Book Your Service Now</span>
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}