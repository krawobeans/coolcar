import { useState } from 'react';
import { Send, Star, Quote, Loader2 } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';

const REVIEWS_PER_PAGE = 6;

export default function ReviewsPage() {
  const { reviews, addReview, loading, error } = useReviews();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'latest' | 'rating'>('latest');
  const [newReview, setNewReview] = useState({
    name: '',
    comment: '',
    rating: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sort and paginate reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.rating - a.rating;
  });

  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.name.trim() && newReview.comment.trim() && newReview.rating > 0) {
      setSubmitting(true);
      setSubmitError(null);
      
      try {
        await addReview(newReview);
      
      // Reset form
      setNewReview({
        name: '',
        comment: '',
        rating: 0
      });
      } catch (err) {
        setSubmitError('Failed to submit review. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill={index < rating ? '#f59e0b' : 'none'}
      />
    ));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error Loading Reviews</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl lg:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">
          Client Reviews
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Share Your Experience</h2>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        className={`w-6 h-6 cursor-pointer ${
                          star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        fill={star <= newReview.rating ? '#f59e0b' : 'none'}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Share your experience..."
                  ></textarea>
                </div>

                {submitError && (
                  <div className="text-red-600 text-sm">{submitError}</div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews Display */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading reviews...</span>
                  </div>
                ) : (
                  `Showing ${paginatedReviews.length} of ${reviews.length} reviews`
                )}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'rating')}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                disabled={loading}
              >
                <option value="latest">Latest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
            <div className="grid gap-6">
                {paginatedReviews.map((review) => (
                <div 
                    key={review.id}
                  className="bg-white rounded-xl shadow-lg p-6 relative"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100" />
                  <div className="flex items-center mb-4">
                      {review.image ? (
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {review.name.charAt(0)}
                    </div>
                      )}
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        {review.position && (
                          <p className="text-sm text-gray-500">{review.position}</p>
                        )}
                      <div className="flex mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{review.comment}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 