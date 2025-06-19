import React, { useState } from 'react';
import { BookOpen, TrendingUp, DollarSign, Eye, Download, Calendar, Star, Users, BarChart3, Settings, PenTool, Upload } from 'lucide-react';

const AuthorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const authorStats = {
    totalBooks: 3,
    totalSales: 1247,
    totalRevenue: 15642.30,
    monthlyViews: 8920,
    averageRating: 4.7,
    totalReviews: 156
  };

  const books = [
    {
      id: 1,
      title: 'The Digital Frontier',
      status: 'Published',
      publishDate: '2024-12-15',
      sales: 456,
      revenue: 6840.00,
      rating: 4.8,
      reviews: 67,
      cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg'
    },
    {
      id: 2,
      title: 'Future Innovations',
      status: 'In Review',
      publishDate: null,
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      cover: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg'
    },
    {
      id: 3,
      title: 'Tech Revolution',
      status: 'Published',
      publishDate: '2024-08-22',
      sales: 791,
      revenue: 8802.30,
      rating: 4.6,
      reviews: 89,
      cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg'
    }
  ];

  const recentActivity = [
    { date: '2024-12-18', type: 'sale', description: 'New sale: "The Digital Frontier"' },
    { date: '2024-12-17', type: 'review', description: 'New 5-star review received' },
    { date: '2024-12-16', type: 'milestone', description: 'Reached 1,000 total sales!' },
    { date: '2024-12-15', type: 'publish', description: '"The Digital Frontier" published successfully' },
    { date: '2024-12-14', type: 'payment', description: 'Monthly royalty payment processed' }
  ];

  const salesData = [
    { month: 'Jul', sales: 45 },
    { month: 'Aug', sales: 78 },
    { month: 'Sep', sales: 92 },
    { month: 'Oct', sales: 156 },
    { month: 'Nov', sales: 203 },
    { month: 'Dec', sales: 234 }
  ];

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'books', label: 'My Books', icon: BookOpen },
    { key: 'analytics', label: 'Analytics', icon: TrendingUp },
    { key: 'earnings', label: 'Earnings', icon: DollarSign },
    { key: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-sage-100 text-sage-800';
      default:
        return 'bg-sage-100 text-sage-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm font-medium">Total Books</p>
              <p className="text-3xl font-bold text-sage-900">{authorStats.totalBooks}</p>
            </div>
            <BookOpen className="w-12 h-12 text-gold-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm font-medium">Total Sales</p>
              <p className="text-3xl font-bold text-sage-900">{authorStats.totalSales.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-gold-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-sage-900">${authorStats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-gold-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm font-medium">Monthly Views</p>
              <p className="text-3xl font-bold text-sage-900">{authorStats.monthlyViews.toLocaleString()}</p>
            </div>
            <Eye className="w-12 h-12 text-gold-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm font-medium">Average Rating</p>
              <p className="text-3xl font-bold text-sage-900">{authorStats.averageRating}</p>
            </div>
            <Star className="w-12 h-12 text-gold-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm font-medium">Total Reviews</p>
              <p className="text-3xl font-bold text-sage-900">{authorStats.totalReviews}</p>
            </div>
            <Users className="w-12 h-12 text-gold-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-sage-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-sage-50 rounded-lg">
              <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sage-900 font-medium">{activity.description}</p>
                <p className="text-sage-600 text-sm">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-sage-900">My Books</h2>
        <button className="bg-gold-500 text-sage-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors flex items-center space-x-2">
          <PenTool className="w-5 h-5" />
          <span>Add New Book</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex">
              <img
                src={book.cover}
                alt={book.title}
                className="w-24 h-32 object-cover"
              />
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-sage-900">{book.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(book.status)}`}>
                    {book.status}
                  </span>
                </div>

                {book.publishDate && (
                  <p className="text-sage-600 text-sm mb-3">
                    Published: {new Date(book.publishDate).toLocaleDateString()}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-sage-600">Sales</p>
                    <p className="font-semibold text-sage-900">{book.sales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sage-600">Revenue</p>
                    <p className="font-semibold text-sage-900">${book.revenue.toLocaleString()}</p>
                  </div>
                  {book.rating > 0 && (
                    <>
                      <div>
                        <p className="text-sage-600">Rating</p>
                        <p className="font-semibold text-sage-900">{book.rating}/5</p>
                      </div>
                      <div>
                        <p className="text-sage-600">Reviews</p>
                        <p className="font-semibold text-sage-900">{book.reviews}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-sage-700 text-gold-100 py-2 px-4 rounded-lg text-sm font-medium hover:bg-sage-800 transition-colors">
                    View Details
                  </button>
                  {book.status === 'Published' && (
                    <button className="bg-sage-100 text-sage-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sage-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-sage-900">Author Dashboard</h1>
              <p className="text-sage-600 mt-1">Welcome back, Sarah Johnson</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gold-500 text-sage-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload New Manuscript</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.key
                          ? 'bg-gold-500 text-sage-900 shadow-md'
                          : 'text-sage-600 hover:bg-sage-50 hover:text-sage-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'books' && renderBooks()}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-sage-900 mb-6">Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-sage-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-sage-900 mb-4">Sales Trend</h3>
                    <div className="space-y-3">
                      {salesData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sage-600">{data.month}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-sage-200 rounded-full h-2">
                              <div
                                className="bg-gold-500 h-2 rounded-full"
                                style={{ width: `${(data.sales / 250) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sage-900 font-medium w-8">{data.sales}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-sage-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-sage-900 mb-4">Top Performing Books</h3>
                    <div className="space-y-3">
                      {books.filter(book => book.sales > 0).map((book, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sage-700 text-sm">{book.title}</span>
                          <span className="text-sage-900 font-semibold">{book.sales}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'earnings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-sage-900 mb-6">Earnings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-sage-900 mb-2">This Month</h3>
                    <p className="text-3xl font-bold text-green-600">$2,347.50</p>
                    <p className="text-green-700 text-sm">+12% from last month</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-sage-900 mb-2">Available for Withdrawal</h3>
                    <p className="text-3xl font-bold text-blue-600">$1,892.30</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Request Payment
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-sage-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-sage-900 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Sarah Johnson"
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-sage-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="sarah.johnson@email.com"
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-sage-900 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Science fiction author passionate about exploring the intersection of technology and humanity."
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button className="bg-gold-500 text-sage-900 px-6 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;