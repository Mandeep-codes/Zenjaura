import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Filter, Search, User, Calendar } from 'lucide-react';

const Review = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { key: 'all', label: 'All Reviews' },
    { key: '5', label: '5 Stars' },
    { key: '4', label: '4 Stars' },
    { key: '3', label: '3 Stars' },
    { key: 'verified', label: 'Verified Purchases' }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah Mitchell',
      rating: 5,
      date: '2024-12-10',
      title: 'Exceptional Publishing Experience',
      content: 'Zenjaura exceeded all my expectations. From the initial consultation to the final product, their team was professional, responsive, and incredibly knowledgeable. My book turned out better than I ever imagined, and the marketing support helped me reach readers I never thought possible.',
      service: 'Premium Package',
      verified: true,
      helpful: 23,
      bookTitle: 'The Digital Frontier',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      rating: 5,
      date: '2024-11-28',
      title: 'Professional Team, Outstanding Results',
      content: 'As a first-time author, I was nervous about the publishing process. The team at Zenjaura guided me through every step with patience and expertise. The editing was thorough, the cover design was stunning, and the distribution exceeded my expectations. Highly recommended!',
      service: 'Professional Package',
      verified: true,
      helpful: 18,
      bookTitle: 'Whispers of the Past',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'
    },
    {
      id: 3,
      author: 'Emily Chen',
      rating: 4,
      date: '2024-11-15',
      title: 'Great Value for Money',
      content: 'The Professional package offered excellent value. The editing was comprehensive, and I loved having multiple cover design options. The only minor issue was a slight delay in the timeline, but the quality of work more than made up for it. My book is now selling well on multiple platforms.',
      service: 'Professional Package',
      verified: true,
      helpful: 12,
      bookTitle: 'Building Tomorrow',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      id: 4,
      author: 'David Thompson',
      rating: 5,
      date: '2024-10-22',
      title: 'Transformed My Manuscript',
      content: 'I came to Zenjaura with a rough manuscript and big dreams. Their developmental editing service completely transformed my work. The editor understood my vision and helped me realize it in ways I couldn\'t have done alone. The final product is something I\'m truly proud of.',
      service: 'Premium Package',
      verified: true,
      helpful: 31,
      bookTitle: 'Mindful Living',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    },
    {
      id: 5,
      author: 'Lisa Park',
      rating: 4,
      date: '2024-10-08',
      title: 'Solid Experience with Room for Improvement',
      content: 'Overall, I had a positive experience with Zenjaura. The editing was thorough and the cover design process was collaborative. Communication could have been more frequent during the middle stages, but the end result was professional and polished. Would use their services again.',
      service: 'Starter Package',
      verified: false,
      helpful: 8,
      bookTitle: 'Ocean\'s Echo',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
    },
    {
      id: 6,
      author: 'James Wilson',
      rating: 5,
      date: '2024-09-30',
      title: 'Beyond My Expectations',
      content: 'The premium package was worth every penny. From the comprehensive editing to the marketing campaign, everything was handled with incredible attention to detail. My book became a bestseller in its category, and I attribute much of that success to Zenjaura\'s expertise and dedication.',
      service: 'Premium Package',
      verified: true,
      helpful: 45,
      bookTitle: 'The Innovator\'s Journey',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg'
    },
    {
      id: 7,
      author: 'Amanda Foster',
      rating: 3,
      date: '2024-09-18',
      title: 'Mixed Experience',
      content: 'The editing quality was good, and the cover design was professional. However, I experienced some delays and communication issues that made the process more stressful than it needed to be. The final product was satisfactory, but the journey could have been smoother.',
      service: 'Starter Package',
      verified: true,
      helpful: 5,
      bookTitle: 'Tales of Wonder',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      id: 8,
      author: 'Robert Kim',
      rating: 5,
      date: '2024-08-25',
      title: 'Professional Partnership',
      content: 'Working with Zenjaura felt like having a true publishing partner. They were invested in my success and provided insights that went beyond just the technical aspects of publishing. The marketing guidance was particularly valuable for a self-published author like myself.',
      service: 'Professional Package',
      verified: true,
      helpful: 22,
      bookTitle: 'Strategic Thinking',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
    }
  ];

  const filteredReviews = reviews
    .filter(review => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'verified') return review.verified;
      return review.rating.toString() === activeFilter;
    })
    .filter(review => 
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-12 h-12 text-gold-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900">
              Author Reviews
            </h1>
          </div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Real feedback from authors who have published with Zenjaura. See what our community has to say about their publishing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Stats & Filters */}
          <div className="lg:col-span-1">
            {/* Overall Rating */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-sage-900 mb-4">Overall Rating</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gold-600 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(averageRating)
                          ? 'text-gold-500 fill-current'
                          : 'text-sage-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-sage-600">
                  Based on {reviews.length} reviews
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map((dist) => (
                  <div key={dist.rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-12">
                      <span className="text-sm text-sage-600">{dist.rating}</span>
                      <Star className="w-3 h-3 text-gold-500 fill-current" />
                    </div>
                    <div className="flex-1 bg-sage-200 rounded-full h-2">
                      <div
                        className="bg-gold-500 h-2 rounded-full"
                        style={{ width: `${dist.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-sage-600 w-8">{dist.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-sage-900 mb-4">Filter Reviews</h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Filter Buttons */}
              <div className="space-y-2 mb-4">
                {filterOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setActiveFilter(option.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === option.key
                        ? 'bg-gold-500 text-sage-900'
                        : 'text-sage-600 hover:bg-sage-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-sage-900 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating-high">Highest Rated</option>
                  <option value="rating-low">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-sage-900 text-lg mb-1">
                            {review.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-sage-600">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{review.author}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(review.date)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-gold-500 fill-current'
                                    : 'text-sage-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-sage-600">
                            {review.service}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-sage-700 leading-relaxed mb-4">
                        {review.content}
                      </p>

                      {/* Book Title */}
                      <div className="mb-4">
                        <span className="text-sm text-sage-600">
                          Book: <span className="font-semibold text-sage-900">{review.bookTitle}</span>
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                        <button className="flex items-center space-x-2 text-sage-600 hover:text-sage-900 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-sage-600 hover:text-sage-900 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-16">
                <Star className="w-16 h-16 text-sage-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-700 mb-2">No reviews found</h3>
                <p className="text-sage-600">
                  Try adjusting your search terms or filters to find more reviews.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {filteredReviews.length > 0 && (
              <div className="text-center mt-8">
                <button className="bg-sage-700 text-gold-100 px-8 py-3 rounded-lg font-semibold hover:bg-sage-800 transition-colors">
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Write Review CTA */}
        <div className="mt-16 bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">
            Published with Zenjaura?
          </h2>
          <p className="text-sage-800 mb-6 max-w-2xl mx-auto">
            Share your experience and help other authors make informed decisions about their publishing journey.
          </p>
          <button className="bg-sage-900 text-gold-100 px-8 py-4 rounded-lg font-semibold hover:bg-sage-800 transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;