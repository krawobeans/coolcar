import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ReviewProvider } from './context/ReviewContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <HelmetProvider>
      <ReviewProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm" />
          <main className="flex-grow pt-16 md:pt-20">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ReviewProvider>
    </HelmetProvider>
  );
}

export default App;