import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Calendar, Clock, MapPin, Users, Star,
  Search, ArrowRight
} from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  price: number;
  capacity: number;
  registered: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
}

const eventTypes = [
  { key: 'all', label: 'All Events' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'webinar', label: 'Webinars' },
  { key: 'signing', label: 'Book Signings' },
  { key: 'conference', label: 'Conferences' },
  { key: 'networking', label: 'Networking' }
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/events', {
          params: { type: filter, search }
        });

        // ✅ Ensure events is always an array
        const fetchedEvents = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.events)
            ? res.data.events
            : [];

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filter, search]);

  const handleRegister = async (id: string) => {
    try {
      await axios.post(`/api/events/${id}/register`);
      setEvents(prev =>
        prev.map(e => e._id === id ? { ...e, registered: e.registered + 1 } : e)
      );
      alert('Registration successful!');
    } catch (err: any) {
      alert(err?.response?.data?.message ?? 'Registration failed');
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

  const statusColor = (r: number, c: number) => {
    const pct = (r / c) * 100;
    return pct >= 90 ? 'text-red-600'
      : pct >= 70 ? 'text-yellow-600'
      : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-sage-50 py-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Calendar className="w-12 h-12 text-gold-500 mb-4" />
          <h1 className="text-4xl font-bold text-sage-900 mb-2">Author Events</h1>
          <p className="text-sage-600">Join workshops, webinars, and networking events…</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(t => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                className={`px-4 py-2 rounded text-sm ${
                  filter === t.key
                    ? 'bg-gold-500 text-sage-900'
                    : 'bg-sage-100 text-sage-600 hover:bg-sage-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        {loading ? (
          <p className="text-center text-sage-600">Loading…</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map(ev => (
              <div
                key={ev._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition hover:-translate-y-1"
              >
                <div className="relative">
                  <img className="w-full h-48 object-cover" src={ev.image} alt={ev.title} />
                  <span className="absolute top-4 left-4 bg-gold-500 text-sage-900 px-3 py-1 rounded-full">{ev.type}</span>
                  <span className={`absolute top-4 right-4 bg-white px-3 py-1 rounded-full ${statusColor(ev.registered, ev.capacity)}`}>
                    {ev.registered}/{ev.capacity}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(ev.rating) ? 'text-gold-500' : 'text-sage-300'}`} />
                      ))}
                      <span className="text-sm text-sage-600 ml-1">({ev.rating})</span>
                    </div>
                    <span className={`text-lg font-bold ${ev.price === 0 ? 'text-green-600' : 'text-sage-900'}`}>
                      {ev.price === 0 ? 'FREE' : `$${ev.price}`}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-sage-900 mb-2">{ev.title}</h3>
                  <p className="text-sage-600 text-sm mb-4">{ev.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sage-600"><Calendar className="w-4 h-4 mr-2" /><span>{formatDate(ev.date)}</span></div>
                    <div className="flex items-center text-sage-600"><Clock className="w-4 h-4 mr-2" /><span>{ev.time}</span></div>
                    <div className="flex items-center text-sage-600"><MapPin className="w-4 h-4 mr-2"/><span>{ev.location}</span></div>
                    <div className="flex items-center text-sage-600"><Users className="w-4 h-4 mr-2"/><span>Instructor: {ev.instructor}</span></div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {ev.tags.map((tag, idx) => (
                      <span key={idx} className="bg-sage-100 px-2 py-1 text-xs rounded">{tag}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRegister(ev._id)}
                    disabled={ev.registered >= ev.capacity}
                    className="w-full bg-gold-500 text-sage-900 py-3 rounded-lg font-semibold hover:bg-gold-400 transition disabled:opacity-50"
                  >
                    Register Now <ArrowRight className="inline-block ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-sage-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sage-700 mb-2">No events found</h3>
            <p className="text-sage-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

