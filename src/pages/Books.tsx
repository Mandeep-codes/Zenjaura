import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, BookOpen, Star } from 'lucide-react';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  price: number;
  rating: number;
  cover: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get('/api/books', { params: { search } });

        // ✅ Normalize and validate response
        const data = res.data;
        const safeBooks: Book[] = Array.isArray(data)
          ? data
          : Array.isArray(data.books)
          ? data.books
          : [];

        setBooks(safeBooks);
      } catch (err: any) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books');
        setBooks([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search]);

  // ✅ Optional filteredBooks if you use search client-side
  const filteredBooks = Array.isArray(books)
    ? books.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <BookOpen className="w-12 h-12 text-gold-500 mb-4" />
          <h1 className="text-4xl font-bold text-sage-900 mb-2">Published Books</h1>
          <p className="text-sage-600">Browse all published books by your favorite authors</p>
        </div>

        <div className="mb-8 relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 py-3 border rounded-lg focus:ring focus:border-transparent"
          />
        </div>

        {loading ? (
          <p className="text-center text-sage-600">Loading books...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">No books found</h3>
            <p className="text-sage-600">Try changing your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map(book => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-sage-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-sage-600 mb-2">by {book.author}</p>
                  <p className="text-sm text-sage-600 mb-4">{book.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-sage-100 px-3 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <span className="text-sm font-semibold text-sage-900">
                      ${book.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? 'text-gold-500'
                            : 'text-sage-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-sage-600 ml-1">({book.rating})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;

