import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, ArrowRight } from 'lucide-react';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const eventTypes = [
    { key: 'all', label: 'All Events' },
    { key: 'workshop', label: 'Workshops' },
    { key: 'webinar', label: 'Webinars' },
    { key: 'signing', label: 'Book Signings' },
    { key: 'conference', label: 'Conferences' },
    { key: 'networking', label: 'Networking' }
  ];

  const events = [
    {
      id: 1,
      title: 'The Art of Character Development',
      type: 'workshop',
      date: '2025-01-15',
      time: '2:00 PM - 5:00 PM EST',
      location: 'Online',
      instructor: 'Sarah Johnson',
      price: 89,
      capacity: 50,
      registered: 32,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      description: 'Learn to create compelling, three-dimensional characters that readers will remember long after they finish your book.',
      tags: ['Fiction', 'Character Development', 'Writing Craft']
    },
    {
      id: 2,
      title: 'Self-Publishing Success Stories',
      type: 'webinar',
      date: '2025-01-18',
      time: '7:00 PM - 8:30 PM EST',
      location: 'Online',
      instructor: 'Michael Chen',
      price: 0,
      capacity: 200,
      registered: 156,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      description: 'Join successful self-published authors as they share their journey from manuscript to bestseller.',
      tags: ['Self-Publishing', 'Marketing', 'Success Stories']
    },
    {
      id: 3,
      title: 'Poetry Reading & Open Mic Night',
      type: 'signing',
      date: '2025-01-22',
      time: '6:00 PM - 9:00 PM EST',
      location: 'Brooklyn Literary Center, NY',
      instructor: 'Emily Rodriguez',
      price: 15,
      capacity: 80,
      registered: 23,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
      description: 'An evening of poetry readings featuring published poets, plus open mic opportunities for emerging voices.',
      tags: ['Poetry', 'Reading', 'Community']
    },
    {
      id: 4,
      title: 'Digital Marketing for Authors',
      type: 'workshop',
      date: '2025-01-25',
      time: '10:00 AM - 4:00 PM EST',
      location: 'Online',
      instructor: 'David Park',
      price: 149,
      capacity: 30,
      registered: 18,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
      description: 'Master social media, email marketing, and online advertising to build your author platform and sell more books.',
      tags: ['Marketing', 'Social Media', 'Platform Building']
    },
    {
      id: 5,
      title: 'Authors Network Mixer',
      type: 'networking',
      date: '2025-01-28',
      time: '5:00 PM - 8:00 PM EST',
      location: 'Chicago Authors Hub, IL',
      instructor: 'Lisa Thompson',
      price: 25,
      capacity: 60,
      registered: 41,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg',
      description: 'Connect with fellow authors, agents, and industry professionals in a relaxed networking environment.',
      tags: ['Networking', 'Community', 'Industry']
    },
    {
      id: 6,
      title: 'Publishing Industry Conference 2025',
      type: 'conference',
      date: '2025-02-05',
      time: '9:00 AM - 6:00 PM EST',
      location: 'New York Convention Center, NY',
      instructor: 'Various Speakers',
      price: 299,
      capacity: 500,
      registered: 234,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      description: 'The premier annual conference featuring industry leaders, agents, publishers, and successful authors.',
      tags: ['Conference', 'Industry', 'Professional Development']
    }
  ];

  const filteredEvents = events
    .filter(event => activeFilter === 'all' || event.type === activeFilter)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (registered: number, capacity: number) => {
    const percentage = (registered / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-gold-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900">
              Author Events
            </h1>
          </div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Join workshops, webinars, and networking events designed to help authors at every stage of their publishing journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-sage-400" />
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setActiveFilter(type.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === type.key
                        ? 'bg-gold-500 text-sage-900'
                        : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold-500 text-sage-900 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {event.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`bg-white px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(event.registered, event.capacity)}`}>
                    {event.registered}/{event.capacity}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(event.rating)
                            ? 'text-gold-500 fill-current'
                            : 'text-sage-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-sage-600 ml-1">({event.rating})</span>
                  </div>
                  <div className="text-right">
                    {event.price === 0 ? (
                      <span className="text-lg font-bold text-green-600">FREE</span>
                    ) : (
                      <span className="text-lg font-bold text-sage-900">${event.price}</span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-sage-900 mb-2 group-hover:text-sage-700 transition-colors">
                  {event.title}
                </h3>

                <p className="text-sage-600 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sage-600">
                    <Calendar className="w-4 h-4 mr-3" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sage-600">
                    <Clock className="w-4 h-4 mr-3" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-sage-600">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sage-600">
                    <Users className="w-4 h-4 mr-3" />
                    <span className="text-sm">Instructor: {event.instructor}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-sage-100 text-sage-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gold-500 text-sage-900 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors flex items-center justify-center space-x-2">
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">No events found</h3>
            <p className="text-sage-600">
              Try adjusting your search terms or filters to find more events.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-gold-500 to-gold-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-sage-900 mb-4">
            Want to Host Your Own Event?
          </h2>
          <p className="text-sage-800 mb-6 max-w-2xl mx-auto">
            Share your expertise with the author community. We help published authors organize and promote their workshops and seminars.
          </p>
          <button className="bg-sage-900 text-gold-100 px-8 py-4 rounded-lg font-semibold hover:bg-sage-800 transition-colors">
            Submit Event Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;