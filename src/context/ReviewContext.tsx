import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
  position?: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getTopRatedReviews: (count: number) => Review[];
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
}

interface ReviewProviderProps {
  children: ReactNode;
}

export function ReviewProvider({ children }: ReviewProviderProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: "Mr kalokoh",
      comment: "Best service I've ever received. They fixed my car's AC in no time!",
      rating: 5,
      date: '2024-01-15',
      image: "Cool Car Auto Reviews Mr kalokoh.jpg",
      position: "Business Owner"
    },
    {
      id: '2',
      name: "Medo",
      comment: "Very professional team. I highly recommend their diagnostic services.",
      rating: 4,
      date: '2024-02-20',
      image: "Cool Car Auto Reviews Medo .jpg",
      position: "Regular Customer"
    },
    {
      id: '3',
      name: "Mr Rahim",
      comment: "Great value for money. They really know what they're doing!",
      rating: 5,
      date: '2024-03-10',
      image: "Cool Car Auto Reviews Rahim .jpg",
      position: "Fleet Manager"
    }
  ]);

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview = {
      ...review,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getTopRatedReviews = (count: number) => {
    return [...reviews]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getTopRatedReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewContext; 