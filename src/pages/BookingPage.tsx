import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';

export default function BookingPage() {
  return (
    <>
      <SEO 
        title="Book a Service - Cool Car Auto Garage"
        description="Schedule your car service appointment with Cool Car Auto Garage in Freetown. Expert mechanics and professional service."
        keywords="car service booking Freetown, auto repair appointment, mechanic booking Sierra Leone"
      />
      
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
                <BookingForm />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 