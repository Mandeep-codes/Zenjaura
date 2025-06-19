import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, User, Calendar } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'book' | 'author' | 'event';
  title: string;
  subtitle?: string;
  image?: string;
  url: string;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      type: 'book',
      title: 'The Digital Frontier',
      subtitle: 'by Sarah Johnson',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
      url: '/books'
    },
    {
      id: '2',
      type: 'author',
      title: 'Michael Chen',
      subtitle: 'Business Author',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      url: '/authors/michael-chen'
    },
    {
      id: '3',
      type: 'event',
      title: 'Character Development Workshop',
      subtitle: 'January 15, 2025',
      url: '/events'
    },
    {
      id: '4',
      type: 'book',
      title: 'Ocean\'s Echo',
      subtitle: 'by Emily Rodriguez',
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      url: '/books'
    }
  ];

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = searchData.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'book':
        return BookOpen;
      case 'author':
        return User;
      case 'event':
        return Calendar;
      default:
        return Search;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto mt-20 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-sage-200 dark:border-gray-600">
            <Search className="w-5 h-5 text-sage-400 mr-3" />
            <input
              type="text"
              placeholder="Search books, authors, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sage-900 dark:text-sage-100 placeholder-sage-500 focus:outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 text-sage-400 hover:text-sage-600 dark:hover:text-sage-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sage-600 dark:text-sage-400 mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => {
                  const Icon = getIcon(result.type);
                  return (
                    <a
                      key={result.id}
                      href={result.url}
                      className="flex items-center p-4 hover:bg-sage-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={onClose}
                    >
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-sage-100 dark:bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-sage-600 dark:text-sage-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-sage-900 dark:text-sage-100">
                          {result.title}
                        </h3>
                        {result.subtitle && (
                          <p className="text-sm text-sage-600 dark:text-sage-400">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-sage-500 dark:text-sage-400 capitalize">
                        {result.type}
                      </div>
                    </a>
                  );
                })}
              </div>
            ) : query.length > 2 ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                <p className="text-sage-600 dark:text-sage-400">No results found for "{query}"</p>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                <p className="text-sage-600 dark:text-sage-400">Start typing to search...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;