import React, { useEffect, useState } from 'react';
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Menu,
  X,
  Send,
  MessageCircle,
  Award,
} from 'lucide-react';
import { FaTools, FaCarBattery, FaOilCan, FaCogs, FaBolt } from "react-icons/fa";
import { GiCarWheel } from 'react-icons/gi';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const whatsappNumber = '+23278590287';

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.section-animate').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('https://formsubmit.co/ajax/coolcarauto.info@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus(''), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const services = [
    { icon: FaTools, title: 'General Maintenance', description: 'We provide comprehensive vehicle maintenance to keep your car running smoothly.' },
    { icon: FaCarBattery, title: 'Hybrid Systems & Dashboard Lights', description: 'Ensure your cars Hybrid system is maintained and functioning optimally And your Dashboard aint a christmas tree.' },
    { icon: FaOilCan, title: 'Oil Change', description: 'Regular oil changes to enhance engine performance and longevity.' },
    { icon: GiCarWheel, title: 'Tire Services & Suspension', description: 'From tire tracking to replacements, we have you covered, We also work on suspension brakes and any sort of under carrier issues.' },
    { icon: FaCogs, title: 'Mechanical Repairs', description: 'Expert repairs for all mechanical issues in your vehicle we repair all sorts of engine and gearbox problems.' },
    { icon: FaBolt, title: 'Electrical Issues & Diagnostics', description: 'Diagnosis and repair of all electrical components in your car with industry grade machines and tools.' }
  ];

  const testimonials = [
    {
      name: "Mr kalokoh",
      comment: "Best service I've ever received. They fixed my car's AC in no time!",
      image: "Cool Car Auto Reviews Mr kalokoh.jpg"
    },
    {
      name: "Medo",
      comment: "Very professional team. I highly recommend their diagnostic services.",
      image: "Cool Car Auto Reviews Medo .jpg"
    },
    {
      name: "Mr Rahim",
      comment: "Great value for money. They really know what they're doing!",
      image: "Cool Car Auto Reviews Rahim .jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <Car className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-2" />
              <span className="text-lg md:text-xl font-bold text-blue-900">Cool Car Auto</span>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">About</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Services</a>
              <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Gallery</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</a>
            </div>
          </div>

          <div 
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="py-2 space-y-1">
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#gallery" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[75vh] sm:min-h-[80vh] md:h-screen flex items-center justify-center bg-blue-900/10 pt-20">
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80"
      alt="Garage Background"
      className="w-full h-full object-cover opacity-40"
    />
  </div>
  <div className="relative text-center px-4 sm:px-6 md:px-8 max-w-4xl mx-auto animate-slide-up">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-blue-900">
      Cool Car Auto Garage
    </h1>
    <p className="text-lg sm:text-xl lg:text-2xl text-blue-800">
      Your One-Stop Auto Solution
    </p>
    <div className="mt-8">
      <ChevronDown className="mx-auto w-6 h-6 md:w-8 md:h-8 animate-bounce text-blue-600" />
    </div>
  </div>
</header>


      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="section-animate order-2 md:order-1">
              <img
                src="Best-Mechanic-in-freetown.webp"
                alt="Mamoud Bah - Chief Engineer"
                className="rounded-lg shadow-lg w-full h-[300px] md:h-[500px] object-cover"
              />
            </div>
            <div className="section-animate space-y-4 md:space-y-6 order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-900">
                Meet Our Chief Engineer
              </h2>
              <h3 className="text-lg md:text-xl text-blue-600 font-semibold">Mamoud Bah</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                With over 20 years of experience in automotive engineering, Mamoud Bah is the dedicated mechanic at Cool Car Auto Garage. His passion for cars and commitment to excellence have made his garage the most trusted auto repair service in Freetown, He's speacialises in all European and Asian car brands.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Under Mamoud Bah's leadership, Cool Car Auto Garage has serviced hundreds of vehicles, earning a reputation for reliable, honest, and professional auto repair services...
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <span className="text-gray-700 text-sm md:text-base">Certified Engineer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  <span className="text-gray-700 text-sm md:text-base">20+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-100 py-12 md:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-700">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white shadow-md p-4 md:p-6 rounded-lg text-center">
                <service.icon className="text-blue-700 text-3xl md:text-4xl mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm md:text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 md:py-20 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-blue-900">
            Our Workshop Gallery
          </h2>
          <p className="text-center text-blue-700 mb-8 md:mb-12 text-sm md:text-base">
            Discover the dedication and precision that goes into every service at Cool Car Auto Garage.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { src: "Garage Tools.jpg", subtitle: "Get your car scanned Now and ensure you fix the right problem." },
              { src: "Fuel pressure gauge.jpg", subtitle: "Premium Diagnostic services with standard Autel Tools" },
              { src: "Engine Repair.jpg", subtitle: "Top Notch Engine reapir services " },
              { src: "compueter- Diagnose-mechanic.jpg", subtitle: "We have access to all sorts of automotive softwares and diagrams, say no to blind work!" },
              { src: "Electrical Issues.jpg", subtitle: "The Autel PowerScan PS100 for comprehensive electrical diagnostics" },
              { src: "Diagnostics in freetown.jpg", subtitle: "Contact Us for all your diagnostic needs" }
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <img
                  src={`/${item.src}`}
                  alt={item.subtitle}
                  loading="lazy"
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="p-4 text-center bg-gray-50">
                  <p className="text-blue-800 text-sm md:text-base font-medium">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16 text-blue-900 section-animate">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="section-animate bg-white p-4 md:p-6rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-4"
                  />
                  <h3 className="font-semibold text-blue-900 text-sm md:text-base">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 italic text-sm md:text-base">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16 text-blue-900 section-animate">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="section-animate space-y-6 md:space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4 md:mb-6">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-3" />
                  <p className="text-gray-700 text-sm md:text-base">No. 156 Bai Bureh Road, Allen Town, Freetown Sierra Leone</p>
                </div>
                <div className="flex items-center mb-4 md:mb-6">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-3" />
                  <p className="text-gray-700 text-sm md:text-base">+232 78 590287</p>
                </div>
                <div className="flex items-center mb-4 md:mb-6">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-3" />
                  <p className="text-gray-700 text-sm md:text-base">coolcarauto.info@gmail.com</p>
                </div>
                <div className="flex items-center mb-6">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-3" />
                  <p className="text-gray-700 text-sm md:text-base">Mon-Sat: 9:00 AM - 6:00 PM</p>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </div>
              
              <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d249.8943602330839!2d-13.142067422354774!3d8.409753031657626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d8.40983992946241!2d-13.141907830924104!5e1!3m2!1sen!2ssl!4v1736950549811!5m2!1sen!2ssl"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            <div className="section-animate">
              <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-blue-900">Send us a message</h3>
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-blue-600 text-white py-2 md:py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  {formStatus === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                {formStatus === 'success' && (
                  <p className="mt-4 text-green-600 text-center text-sm md:text-base">
                    Message sent successfully! We'll get back to you soon.
                  </p>
                )}
                
                {formStatus === 'error' && (
                  <p className="mt-4 text-red-600 text-center text-sm md:text-base">
                    There was an error sending your message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-300" />
                  +232 78 590287
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-300" />
                  coolcarauto.info@gmail.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-300" />
                  No. 156 Bai Bureh Road, Freetown
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li>
                  <a href="#services" className="hover:text-blue-300 transition">Services</a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-blue-300 transition">Gallery</a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-blue-300 transition">Testimonials</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-300 transition">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <p className="text-sm md:text-base">Stay connected on our social media platforms:</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full transition"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full transition"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 md:p-3 rounded-full transition"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 border-t border-blue-800 pt-4">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Cool Car Auto. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;