import React from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import { 
  Wrench, 
  AlertCircle, 
  BarChart2, 
  Battery, 
  Car, 
  Settings,
  Thermometer,
  WrenchIcon,
  Droplet,
  Gauge
} from 'lucide-react';

const services = [
  {
    title: "Engine Diagnostics & Repair",
    description: "Complete engine diagnostics and repair services using state-of-the-art equipment.",
    icon: Settings,
    link: "/services/engine-repair"
  },
  {
    title: "Brake Services",
    description: "Professional brake inspection, repair, and replacement services for your safety.",
    icon: AlertCircle,
    link: "/services/brake-services"
  },
  {
    title: "Transmission Services",
    description: "Expert transmission repair and maintenance to keep your vehicle running smoothly.",
    icon: Gauge,
    link: "/services/transmission"
  },
  {
    title: "Oil Changes",
    description: "Regular oil changes to maintain engine health and optimal performance.",
    icon: Droplet,
    link: "/services/oil-change"
  },
  {
    title: "Electrical Systems",
    description: "Comprehensive electrical system diagnostics and repair services.",
    icon: Battery,
    link: "/services/electrical"
  },
  {
    title: "AC Service & Repair",
    description: "Complete air conditioning service, repair, and maintenance.",
    icon: Thermometer,
    link: "/services/ac-service"
  },
  {
    title: "Tire Services",
    description: "Tire rotation, balancing, alignment, and replacement services.",
    icon: Car,
    link: "/services/tire-services"
  },
  {
    title: "General Maintenance",
    description: "Regular maintenance services to keep your vehicle in top condition.",
    icon: WrenchIcon,
    link: "/services/maintenance"
  },
  {
    title: "Performance Upgrades",
    description: "Custom performance upgrades and modifications for your vehicle.",
    icon: BarChart2,
    link: "/services/performance"
  }
];

export default function Services() {
  return (
    <PageWrapper>
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional auto repair and maintenance services to keep your vehicle running at its best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/booking"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              <Wrench className="w-5 h-5 mr-2" />
              Book a Service
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
} 
