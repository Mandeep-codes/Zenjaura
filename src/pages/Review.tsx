import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Search, Filter } from 'lucide-react';

type FilterType = 'all' | '5' | '4' | '3' | 'verified';

interface ReviewType {
  _id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  book: {
    _id: string;
    title: string;
  };
  createdAt: string;
  verified?: boolean;
}

const Review = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('/api/reviews');

        // Safely set the data (make sure it’s an array)
        if (res.data && Array.isArray(res.data.reviews)) {
          setReviews(res.data.reviews);
        } else {
          setReviews([]);
          console.error('Unexpected response:', res.data);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getFilteredReviews = (): ReviewType[] => {
    let result = [...reviews];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.reviewerName.toLowerCase().includes(term) ||
          r.comment.toLowerCase().includes(term) ||
          r.book.title.toLowerCase().includes(term)
      );
    }

    if (filter === '5' || filter === '4' || filter === '3') {
      result = result.filter((r) => r.rating >= Number(filter));
    } else if (filter === 'verified') {
      result = result.filter((r) => r.verified === true);
    }

    return result;
  };

  const filteredReviews = getFilteredReviews();

  return (
    <div className="min-h-screen bg-sage-50 p-8">
      <h1 className="text-4xl font-bold text-sage-900 mb-6">Author Reviews</h1>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-sage-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full pl-10 pr-4 py-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <Filter className="text-sage-400" />
          {(['all', '5', '4', '3', 'verified'] as FilterType[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-2 rounded-full font-medium border ${
                filter === opt
                  ? 'bg-gold-500 text-sage-900 border-gold-500'
                  : 'bg-white text-sage-600 border-sage-300'
              } transition-all`}
            >
              {opt === 'all'
                ? 'All'
                : opt === 'verified'
                ? 'Verified'
                : `${opt}+ stars`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-sage-600">Loading reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center text-sage-600">No reviews found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-sage-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-sage-900">
                  {review.reviewerName}
                </h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-sage-700 text-sm mb-2">"{review.comment}"</p>
              <p className="text-sage-500 text-xs">
                Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sage-600 text-sm mt-2">
                <strong>Book:</strong> {review.book.title}
              </p>
              {review.verified && (
                <p className="text-green-600 text-sm mt-1 font-medium">✅ Verified Review</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
