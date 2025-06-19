import React, { useState } from 'react';
import { Search, Filter, Star, Calendar, User, ExternalLink } from 'lucide-react';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const genres = [
    'all', 'fiction', 'non-fiction', 'poetry', 'business', 'self-help', 'biography', 'science'
  ];

  const books = [
    {
      id: 1,
      title: 'The Digital Frontier',
      author: 'Sarah Johnson',
      genre: 'science',
      publishDate: '2024-12-15',
      rating: 4.8,
      reviews: 124,
      cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
      description: 'An exploration of how technology is reshaping our world and what lies ahead.',
      price: '$24.99'
    },
    {
      id: 2,
      title: 'Whispers of the Past',
      author: 'Michael Chen',
      genre: 'fiction',
      publishDate: '2024-11-28',
      rating: 4.6,
      reviews: 89,
      cover: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
      description: 'A haunting tale of family secrets and the power of redemption.',
      price: '$19.99'
    },
    {
      id: 3,
      title: 'Building Tomorrow',
      author: 'Emily Rodriguez',
      genre: 'business',
      publishDate: '2024-10-12',
      rating: 4.9,
      reviews: 156,
      cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      description: 'Essential strategies for entrepreneurs in the modern economy.',
      price: '$29.99'
    },
    {
      id: 4,
      title: 'Mindful Living',
      author: 'David Park',
      genre: 'self-help',
      publishDate: '2024-09-20',
      rating: 4.7,
      reviews: 203,
      cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      description: 'A guide to finding peace and purpose in everyday life.',
      price: '$22.99'
    },
    {
      id: 5,
      title: 'Ocean\'s Echo',
      author: 'Lisa Thompson',
      genre: 'poetry',
      publishDate: '2024-08-14',
      rating: 4.5,
      reviews: 67,
      cover: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg',
      description: 'A collection of poems inspired by nature and human connection.',
      price: '$16.99'
    },
    {
      id: 6,
      title: 'The Innovator\'s Journey',
      author: 'James Wilson',
      genre: 'biography',
      publishDate: '2024-07-30',
      rating: 4.8,
      reviews: 145,
      cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
      description: 'The inspiring story of a tech pioneer who changed the world.',
      price: '$26.99'
    }
  ];

  const filteredBooks = books
    .filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(book => selectedGenre === 'all' || book.genre === selectedGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'oldest':
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-sage-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-4">
            Our Published Books
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Discover exceptional works from talented authors across diverse genres and subjects.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none bg-white"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-gold-500 text-sage-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {book.genre.charAt(0).toUpperCase() + book.genre.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-sage-900 mb-2 group-hover:text-sage-700 transition-colors">
                  {book.title}
                </h3>
                
                <div className="flex items-center text-sage-600 mb-3">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">{book.author}</span>
                </div>

                <div className="flex items-center text-sage-600 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(book.publishDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? 'text-gold-500 fill-current'
                            : 'text-sage-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-sage-600 ml-2">
                    {book.rating} ({book.reviews} reviews)
                  </span>
                </div>

                <p className="text-sage-600 text-sm mb-4 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-sage-900">
                    {book.price}
                  </span>
                  <button className="flex items-center space-x-2 bg-gold-500 text-sage-900 px-4 py-2 rounded-lg font-semibold hover:bg-gold-400 transition-colors">
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-sage-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-sage-700 mb-2">No books found</h3>
            <p className="text-sage-600">
              Try adjusting your search terms or filters to find more books.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;