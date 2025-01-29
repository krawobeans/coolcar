import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ReviewProvider } from './context/ReviewContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import PageWrapper from './components/PageWrapper';
import LiveChat from './components/LiveChat';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ReviewProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm" />
            <main className="flex-grow">
              <AppRoutes />
            </main>
            <Footer />
            <LiveChat />
          </div>
        </ReviewProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;