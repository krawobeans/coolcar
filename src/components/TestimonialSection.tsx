import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';
import { Link } from 'react-router-dom';
import type { Review } from '../lib/supabase';

interface TestimonialSectionProps {
  variant?: 'compact' | 'full';
  count?: number;
  showViewAll?: boolean;
  title?: string;
}

export default function TestimonialSection({ 
  variant = 'compact', 
  count = 3,
  showViewAll = true,
  title = "What Our Clients Say"
}: TestimonialSectionProps) {
  const { getTopRatedReviews } = useReviews();
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setLoading(true);
        const reviews = await getTopRatedReviews(count);
        setTestimonials(reviews);
        setError(null);
      } catch (err) {
        console.error('Error loading testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    }
    loadTestimonials();
  }, [count, getTopRatedReviews]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill={index < rating ? '#f59e0b' : 'none'}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-5xl font-bold text-center mb-8 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
            {title}
          </h2>
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-5xl font-bold text-center mb-8 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
            {title}
          </h2>
          <div className="text-center text-gray-600">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'compact' && testimonials.length > 0) {
    return (
      <section className="py-16 lg:py-32 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-blue-200 to-purple-100 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-purple-200 to-blue-100 rounded-full mix-blend-multiply filter blur-[96px] opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-5xl font-bold text-center mb-8 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
            {testimonials.map((review, index) => (
              <div 
                key={review.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-xl"></div>
                <div className="p-6 lg:p-8 relative">
                  <div className="absolute top-4 right-4">
                    <Quote className="w-8 h-8 text-blue-100 transform group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                        {review.name}
                      </h3>
                      {review.position && (
                        <p className="text-sm text-gray-600">{review.position}</p>
                      )}
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base lg:text-lg italic line-clamp-3">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>

          {showViewAll && (
            <div className="text-center mt-10">
              <Link
                to="/reviews"
                className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-lg transition-all duration-500 ease-out"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-90 rounded-lg transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="relative text-white font-semibold group-hover:scale-105 transition-transform duration-300">
                  View All Reviews
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === 'full') {
    return (
      <section className="py-16 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-5xl font-bold text-center mb-8 lg:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
            {testimonials.map((review) => (
              <div 
                key={review.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10 rounded-xl"></div>
                <div className="p-6 lg:p-8 relative">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
                        {review.name}
                      </h3>
                      {review.position && (
                        <p className="text-sm text-gray-600">{review.position}</p>
                      )}
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-base lg:text-lg mb-2">{review.comment}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
} 