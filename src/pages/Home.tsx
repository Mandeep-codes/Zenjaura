import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp, ArrowRight, Star, Calendar, Package, ChevronDown, Play, Quote } from 'lucide-react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Books Published', value: '2,500+', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'People Connected', value: '51', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'Certifivates Won', value: '39', icon: Award, color: 'from-purple-500 to-purple-600' },
    { label: 'Reached', value: '65k+', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const features = [
    {
      title: 'Professional Publishing',
      description: 'End-to-end publishing services from manuscript to market with industry expertise.',
      icon: BookOpen,
      link: '/packages',
      gradient: 'from-sage-500 to-sage-600',
    },
    {
      title: 'Smart Calculator',
      description: 'AI-powered pricing with transparent costs and instant estimates.',
      icon: Package,
      link: '/calculator',
      gradient: 'from-gold-500 to-gold-600',
    },
    {
      title: 'Author Community',
      description: 'Join literary events, workshops, and networking with fellow authors.',
      icon: Calendar,
      link: '/events',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fiction Author',
      content: 'Zenjaura transformed my manuscript into a professional book that exceeded all my expectations. The team\'s attention to detail is remarkable.',
      rating: 5,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      book: 'The Digital Frontier'
    },
    {
      name: 'Michael Chen',
      role: 'Business Author',
      content: 'The comprehensive support and marketing guidance made my publishing journey seamless. My book became a bestseller in its category.',
      rating: 5,
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      book: 'Strategic Innovation'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Poetry Author',
      content: 'From editing to design, every aspect was handled with care and professionalism. I couldn\'t be happier with the final result.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      book: 'Ocean\'s Echo'
    },
  ];

  const recentBooks = [
    {
      title: 'The Digital Frontier',
      author: 'Sarah Johnson',
      cover: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
      rating: 4.8,
      sales: '1.2K'
    },
    {
      title: 'Strategic Innovation',
      author: 'Michael Chen',
      cover: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg',
      rating: 4.9,
      sales: '890'
    },
    {
      title: 'Ocean\'s Echo',
      author: 'Emily Rodriguez',
      cover: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
      rating: 4.7,
      sales: '756'
    }
  ];

  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-sage-700 via-sage-800 to-sage-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold-400/5 to-sage-400/5 rounded-full blur-3xl animate-spin-slow"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8 animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-gold-500/20 text-gold-300 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                ✨ Trusted by 1,200+ Authors Worldwide
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in-up delay-200">
              Your Story
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 animate-gradient">
                Deserves the World
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gold-100 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Transform your manuscript into a bestseller with our comprehensive publishing platform. 
              Join thousands of successful authors who've found their voice with Zenjaura.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
  <Link
    to="/publish"
    className="group bg-gradient-to-r from-gold-500 to-gold-600 text-sage-900 px-8 py-4 rounded-xl text-lg font-semibold hover:from-gold-400 hover:to-gold-500 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2"
  >
    <span>Start Publishing Today</span>
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </Link>

  {/* Watch Demo Button */}
  <button
    onClick={() => {
      setShowVideo(true);
      setTimeout(() => {
        videoRef.current?.play();
      }, 200); // Small delay to allow DOM render
    }}
    className="group border-2 border-gold-400 text-gold-100 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gold-400 hover:text-sage-900 transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
  >
    <Play className="w-5 h-5" />
    <span>Watch Demo</span>
  </button>
</div>

{/* Show video below the buttons */}
{showVideo && (
  <div className="mt-12 flex justify-center animate-fade-in-up delay-800">
    <video
      ref={videoRef}
      controls
      autoPlay
      className="w-[380px] h-[500px]  rounded-xl shadow-2xl"
    >
      <source src="/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}




            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-gold-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white dark:bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-50 to-gold-50 dark:from-gray-800 dark:to-gray-700"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  <div className={`bg-gradient-to-r ${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-sage-900 dark:text-sage-100 mb-2 counter" data-target={stat.value}>
                    {stat.value}
                  </div>
                  <div className="text-sage-600 dark:text-sage-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-sage-50 to-gold-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 dark:text-sage-100 mb-6">
              Why Choose Zenjaura?
            </h2>
            <p className="text-xl text-sage-600 dark:text-sage-400 max-w-3xl mx-auto">
              We provide comprehensive publishing solutions tailored to your unique needs and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-sage-100 dark:border-gray-700 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-sage-50 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-sage-900 dark:text-sage-100 mb-4 group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sage-600 dark:text-sage-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-gold-600 dark:text-gold-400 font-medium group-hover:text-gold-700 dark:group-hover:text-gold-300 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-900/5 to-gold-900/5 dark:from-sage-100/5 dark:to-gold-100/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 dark:text-sage-100 mb-6">
              What Our Authors Say
            </h2>
            <p className="text-xl text-sage-600 dark:text-sage-400">
              Real stories from real authors who achieved their publishing dreams.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-sage-50 to-gold-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-2xl">
              <Quote className="w-12 h-12 text-gold-500 mb-6" />
              
              <div className="transition-all duration-500">
                <p className="text-xl md:text-2xl text-sage-700 dark:text-sage-300 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gold-300"
                  />
                  <div>
                    <div className="font-bold text-sage-900 dark:text-sage-100 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sage-600 dark:text-sage-400">
                      {testimonials[currentTestimonial].role}
                    </div>
                    <div className="text-sm text-gold-600 dark:text-gold-400 font-medium">
                      Author of "{testimonials[currentTestimonial].book}"
                    </div>
                  </div>
                  <div className="flex ml-auto">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-gold-500 w-8' : 'bg-sage-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Books Showcase */}
      <section className="py-24 bg-gradient-to-br from-sage-50 to-gold-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-sage-900 dark:text-sage-100 mb-6">
              Recent Success Stories
            </h2>
            <p className="text-xl text-sage-600 dark:text-sage-400">
              Discover the latest bestsellers from our author community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentBooks.map((book, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-sage-900 dark:text-sage-100 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sage-600 dark:text-sage-400 mb-4">by {book.author}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-gold-500 fill-current" />
                      <span className="text-sage-700 dark:text-sage-300 font-medium">{book.rating}</span>
                    </div>
                    <div className="text-sage-600 dark:text-sage-400 text-sm">
                      {book.sales} sales
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sage-900/20 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sage-900/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
            Ready to Publish Your Book?
          </h2>
          <p className="text-xl text-sage-800 mb-8 max-w-2xl mx-auto">
            Join thousands of successful authors and start your publishing journey today with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/publish"
              className="bg-sage-900 text-gold-100 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sage-800 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Get Started Now
            </Link>
            <Link
              to="/calculator"
              className="border-2 border-sage-900 text-sage-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sage-900 hover:text-gold-100 transition-all duration-300"
            >
              Calculate Costs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;