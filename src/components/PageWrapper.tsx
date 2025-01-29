import React, { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen pt-16 md:pt-20 ${className}`}>
      {children}
    </div>
  );
} 