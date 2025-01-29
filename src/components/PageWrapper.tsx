import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="pt-[64px] sm:pt-[80px]"> {/* Fixed offset for navbar height */}
      {children}
    </div>
  );
} 