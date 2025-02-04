import React from 'react';
import { Award, Clock, Target, Eye, Heart, BookOpen, Star, Wrench, Users, Settings, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialSection from '../components/TestimonialSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20">
      {/* Content - Adjusted padding */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
            About Us
          </h1>

          {/* Hero Section */}
          <div className="relative mb-16">
            {/* Decorative shapes - reduced opacity */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center relative">
              <div className="order-2 md:order-1 transform hover:scale-105 transition-transform duration-300">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <img
                    src="/Best-Mechanic-in-freetown.webp"
                    alt="Mamoud Bah - Chief Engineer"
                    className="relative rounded-2xl shadow-2xl w-full h-[280px] md:h-[380px] object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 md:space-y-8 order-1 md:order-2">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 leading-tight">
                    Meet Our Chief Engineer
                  </h1>
                  <h2 className="text-xl md:text-2xl text-blue-600 font-semibold">Mamoud Bah</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    With over 20 years of experience in automotive engineering, Mamoud Bah is the dedicated mechanic at Cool Car Auto Garage. His passion for cars and commitment to excellence have made his garage the most trusted auto repair service in Freetown, He's speacialises in all European and Asian car brands.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    Under Mamoud Bah's leadership, Cool Car Auto Garage has serviced hundreds of vehicles, earning a reputation for reliable, honest, and professional auto repair services.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative flex items-center space-x-3 bg-white p-4 rounded-xl">
                      <Award className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                      <span className="text-gray-700 text-base md:text-lg font-medium">Certified Engineer</span>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative flex items-center space-x-3 bg-white p-4 rounded-xl">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                      <span className="text-gray-700 text-base md:text-lg font-medium">20+ Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Section */}
          <div className="mt-24 space-y-12 relative">
            {/* Decorative shapes - adjusted for mobile */}
            <div className="absolute top-1/2 -left-4 sm:-left-10 w-36 sm:w-72 h-36 sm:h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/2 -right-4 sm:-right-10 w-36 sm:w-72 h-36 sm:h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 text-center mb-12">Our Journey</h2>
            
            {/* Timeline Section */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

              {/* Timeline Items */}
              <div className="space-y-12 sm:space-y-16 md:space-y-24">
                {/* Establishment */}
                <div className="relative group">
                  <div className="flex items-center justify-end md:justify-start md:ml-[50%] md:pl-12">
                    <div className="w-[45%] sm:w-[42%] md:w-1/2">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                        <div className="relative bg-white p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                          <div className="absolute left-[-2rem] sm:left-[-2.5rem] md:left-[-3.5rem] top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-pulse" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Establishment</h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600">Founded in 2000 with a vision to provide exceptional auto repair services in Freetown.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth */}
                <div className="relative group">
                  <div className="flex items-center justify-start md:justify-end md:mr-[50%] md:pr-12">
                    <div className="w-[45%] sm:w-[42%] md:w-1/2">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                        <div className="relative bg-white p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                          <div className="absolute right-[-2rem] sm:right-[-2.5rem] md:right-[-3.5rem] top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-pulse" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Expansion</h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600">Expanded our facility and services to accommodate growing customer demand.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Innovation */}
                <div className="relative group">
                  <div className="flex items-center justify-end md:justify-start md:ml-[50%] md:pl-12">
                    <div className="w-[45%] sm:w-[42%] md:w-1/2">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                        <div className="relative bg-white p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                          <div className="absolute left-[-2rem] sm:left-[-2.5rem] md:left-[-3.5rem] top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Settings className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-pulse" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Innovation</h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600">Introduced state-of-the-art diagnostic equipment and modern repair techniques.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Present */}
                <div className="relative group">
                  <div className="flex items-center justify-start md:justify-end md:mr-[50%] md:pr-12">
                    <div className="w-[45%] sm:w-[42%] md:w-1/2">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl md:rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                        <div className="relative bg-white p-3 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                          <div className="absolute right-[-2rem] sm:right-[-2.5rem] md:right-[-3.5rem] top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-pulse" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Today</h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-600">Leading auto repair service in Freetown with a reputation for excellence and reliability.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mt-32 mb-24 relative">
            {/* Decorative shapes - reduced opacity */}
            <div className="absolute bottom-1/2 -left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-1/2 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                Our Core Principles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mission Card */}
                <div className="relative group transform transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white p-8 rounded-2xl h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Target className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-blue-800">Our Mission</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      To provide reliable, honest, and professional auto repair services to every customer, ensuring their vehicles run safely and efficiently.
                    </p>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="relative group transform transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white p-8 rounded-2xl h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Eye className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-blue-800">Our Vision</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      To be the most trusted and respected auto repair service in Freetown, known for our expertise, integrity, and customer satisfaction.
                    </p>
                  </div>
                </div>

                {/* Values Card */}
                <div className="relative group transform transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                  <div className="relative bg-white p-8 rounded-2xl h-full">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Heart className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-blue-800">Our Values</h3>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-600 text-lg">Integrity in all our dealings</span>
                      </li>
                      <li className="flex items-center space-x-3 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-600 text-lg">Excellence in service delivery</span>
                      </li>
                      <li className="flex items-center space-x-3 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-600 text-lg">Customer satisfaction first</span>
                      </li>
                      <li className="flex items-center space-x-3 group">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-gray-600 text-lg">Continuous learning and improvement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Stats */}
          <div className="my-32 relative">
            {/* Reduced background gradient opacity */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5 transform -skew-y-6"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">20+</div>
                    <div className="text-gray-600 font-medium">Years Experience</div>
                  </div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">1000+</div>
                    <div className="text-gray-600 font-medium">Cars Repaired</div>
                  </div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">500+</div>
                    <div className="text-gray-600 font-medium">Happy Clients</div>
                  </div>
                </div>
                <div className="text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
                    <div className="text-gray-600 font-medium">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Car Brands Section */}
          <div className="my-16 lg:my-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                Car Brands We Service
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                <div className="transform hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/mercedes logo.png" 
                    alt="Mercedes-Benz" 
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="transform hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/toyota logo.png" 
                    alt="Toyota" 
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="transform hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/porsche logo.png" 
                    alt="Porsche" 
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="transform hover:scale-110 transition-transform duration-300">
                  <img 
                    src="/nissan logo.png" 
                    alt="Nissan" 
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Testimonial */}
          <TestimonialSection 
            variant="compact" 
            count={3} 
            title="Our Happy Clients"
            showViewAll={true}
          />

          {/* CTA Section */}
          <div className="my-32 relative">
            {/* Reduced background gradient opacity */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-5 transform skew-y-6"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                  Experience Excellence in Auto Care
                </h2>
                <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                  Join our family of satisfied customers and discover why we're Freetown's most trusted auto repair service.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/booking" 
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    Book a Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center"
                  >
                    Contact Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}