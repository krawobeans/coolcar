import { Link } from 'react-router-dom';
import { ChevronDown, Star, Wrench, Clock, Shield, Award, MapPin, Phone, Mail, ArrowRight, Eye, Target, Heart, Settings, CheckCircle } from 'lucide-react';
import TestimonialSection from '../components/TestimonialSection';
import SEO from '../components/SEO';

const whyChooseUs = [
  {
    title: "20+ Years Experience",
    description: "Decades of expertise in handling all types of vehicles and repairs",
    icon: Award
  },
  {
    title: "Certified Mechanics",
    description: "Highly trained and certified team of professional mechanics",
    icon: Shield
  },
  {
    title: "Modern Equipment",
    description: "Latest diagnostic tools and repair equipment for precise service",
    icon: Wrench
  },
  {
    title: "Competitive Pricing",
    description: "Fair and transparent pricing with no hidden charges",
    icon: Clock
  }
];

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Best Car Repair Service in Freetown"
        description="Professional auto repair services in Freetown. Expert mechanics for all car brands, including Toyota, Mercedes, and BMW. Visit our modern facility for top-quality car maintenance."
        keywords="car repair Freetown, best mechanic Sierra Leone, auto service Freetown, car maintenance Sierra Leone"
        url="https://coolcarautogarage.com"
        image="/hero-garage-image.webp"
      />
      <div className="min-h-screen flex flex-col">
        <div className="relative z-10">
          {/* Hero Section - Adjusted for mobile */}
          <div className="min-h-[85vh] md:min-h-[calc(100vh-4rem)] relative overflow-hidden bg-transparent flex items-center pt-4 md:pt-8 pb-8 md:pb-12">
            {/* Decorative shapes with mobile optimization */}
            <div className="absolute -top-10 -left-10 w-32 md:w-48 lg:w-[500px] h-32 md:h-48 lg:h-[500px] bg-gradient-to-br from-blue-200 to-purple-100 rounded-full mix-blend-multiply filter blur-[24px] md:blur-[32px] lg:blur-[96px] opacity-80 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-32 md:w-48 lg:w-[400px] h-32 md:h-48 lg:h-[400px] bg-gradient-to-bl from-purple-200 to-blue-100 rounded-full mix-blend-multiply filter blur-[24px] md:blur-[32px] lg:blur-[96px] opacity-80 animate-blob animation-delay-2000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8">
                {/* Left Content Column */}
                <div className="flex flex-col items-center lg:items-start lg:w-1/2 text-center lg:text-left">
                  {/* Main Heading */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 leading-tight lg:leading-snug mb-3">
                    Expert Auto Repairs <br className="hidden sm:block" />
                    You Can Trust
                  </h1>
                  <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                    Professional car maintenance and repair services in Freetown
                  </p>

                  {/* Buttons */}
                  <div className="text-center lg:text-left w-full mt-2 lg:mt-6">
                    <div className="flex flex-col gap-3 lg:hidden px-4">
                      <Link to="/booking" className="w-full group relative inline-flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 rounded-lg"></div>
                        <span className="relative flex items-center text-white font-semibold">
                          <span className="mr-2">Book A Service</span>
                          <ArrowRight className="transform transition-transform duration-300" />
                        </span>
                      </Link>
                      <Link to="/contact" className="w-full group relative inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 rounded-lg transition-all duration-300">
                        <span className="relative flex items-center text-blue-600 font-semibold">
                          <span className="mr-2">Contact Us</span>
                          <Phone className="transform transition-transform duration-300" />
                        </span>
                      </Link>
                    </div>

                    <div className="hidden lg:flex gap-6">
                      <Link to="/booking" className="group relative inline-flex items-center justify-center px-10 py-4 rounded-lg transition-all duration-500 min-w-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 rounded-lg"></div>
                        <span className="relative flex items-center text-white font-semibold text-lg">
                          <span className="mr-2">Book A Service</span>
                          <ArrowRight className="w-6 h-6 transform transition-transform duration-300" />
                        </span>
                      </Link>
                      <Link to="/contact" className="group relative inline-flex items-center justify-center px-10 py-4 border-2 border-blue-600 rounded-lg transition-all duration-300 min-w-[200px]">
                        <span className="relative flex items-center text-blue-600 font-semibold text-lg">
                          <span className="mr-2">Contact Us</span>
                          <Phone className="w-6 h-6 transform transition-transform duration-300" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Column - Car Image */}
                <div className="w-full lg:w-1/2 lg:pl-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl opacity-70 blur-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                    <img src="/porsche cayenne.png" alt="Porsche Cayenne" className="relative w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>  

          {/* Why Choose Us Section */}
          <section className="py-16 lg:py-32 relative">
            {/* Decorative shapes with desktop optimization */}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <h2 className="text-2xl lg:text-5xl font-bold text-center mb-8 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                Why Choose Cool Car Auto Garage
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
                {whyChooseUs.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-xl"></div>
                    <div className="p-6 lg:p-8 relative flex flex-col items-center lg:items-start">
                      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-[20px] lg:rounded-[28px] rotate-[10deg] flex items-center justify-center mb-6 lg:mb-8 shadow-lg group-hover:rotate-0 transition-all duration-300">
                        <div className="rotate-[-10deg] group-hover:rotate-0 transition-all duration-300">
                          <item.icon className="text-white w-8 h-8 lg:w-10 lg:h-10" />
                        </div>
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-3 lg:mb-4 text-center lg:text-left">{item.title}</h3>
                      <p className="text-gray-600 text-base lg:text-lg text-center lg:text-left">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <TestimonialSection 
            variant="compact" 
            count={3} 
            title="What Our Clients Say"
            showViewAll={true}
          />

          {/* Call to Action Section */}
          <div className="py-12 md:py-20 relative overflow-hidden">
            {/* Decorative shapes with mobile optimization */}
            
            <div className="text-center relative px-4">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 leading-tight">
                Ready to Experience Our Service?
              </h2>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                Join our satisfied customers and experience automotive excellence
              </p>
              <Link 
                to="/booking" 
                className="group relative inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-4 overflow-hidden rounded-lg transition-all duration-500 ease-out w-full sm:w-auto text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-90 rounded-lg transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative flex items-center text-white font-semibold group-hover:scale-105 transition-transform duration-300">
                  <span className="mr-2">Book Your Service Now</span>
                  <ArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>

          {/* Contact & Location Section */}
          <section className="py-16 lg:py-24 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-48 lg:w-[400px] h-48 lg:h-[400px] bg-gradient-to-bl from-blue-200 to-purple-100 rounded-full mix-blend-multiply filter blur-[32px] lg:blur-[96px] opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-48 lg:w-[400px] h-48 lg:h-[400px] bg-gradient-to-tr from-purple-200 to-blue-100 rounded-full mix-blend-multiply filter blur-[32px] lg:blur-[96px] opacity-70 animate-blob animation-delay-2000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                      Visit Our Garage
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Experience top-tier auto service at our state-of-the-art facility in the heart of Freetown.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                        <MapPin className="w-8 h-8 text-white transform group-hover:-rotate-6 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-1">
                          Location
                        </h3>
                        <p className="text-gray-600 text-lg">No. 156 Bai Bureh Road, Freetown</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                        <Phone className="w-8 h-8 text-white transform group-hover:-rotate-6 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-1">
                          Phone
                        </h3>
                        <p className="text-gray-600 text-lg">+232 99 123456</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 group">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                        <Mail className="w-8 h-8 text-white transform group-hover:-rotate-6 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-1">
                          Email
                        </h3>
                        <p className="text-gray-600 text-lg">info@coolcarautogarage.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-2xl"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                    <div className="aspect-[4/3] w-full rounded-xl overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.0459716318584!2d-13.2341667!3d8.4838889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMjknMDIuMCJOIDEzwrAxNCcwMy4wIlc!5e0!3m2!1sen!2ssl!4v1625764428486!5m2!1sen!2ssl"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 