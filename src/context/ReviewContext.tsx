import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Review, getReviews, addReview as addReviewToDb, getTopRatedReviews as getTopRated } from '../lib/supabase';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  getTopRatedReviews: (count: number) => Promise<Review[]>;
  loading: boolean;
  error: string | null;
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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load reviews on mount
  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
      setError(null);
    } catch (err) {
      console.error('Error loading reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }

  async function addReview(review: Omit<Review, 'id' | 'date'>) {
    try {
      setLoading(true);
      const newReview = await addReviewToDb(review);
      setReviews(prev => [newReview, ...prev]);
      setError(null);
    } catch (err) {
      console.error('Error adding review:', err);
      setError('Failed to add review');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function getTopRatedReviews(count: number) {
    try {
      return await getTopRated(count);
    } catch (err) {
      console.error('Error getting top rated reviews:', err);
      setError('Failed to get top rated reviews');
      return [];
    }
  }

  return (
    <ReviewContext.Provider value={{ reviews, addReview, getTopRatedReviews, loading, error }}>
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewContext; 