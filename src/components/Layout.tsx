import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Package, Calculator, Calendar, Star, User, LogIn, PenTool, Moon, Sun, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();

  const navigation = [
    { name: 'Books', href: '/books', icon: BookOpen },
    { name: 'Packages', href: '/packages', icon: Package },
    { name: 'Calculator', href: '/calculator', icon: Calculator },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Review', href: '/review', icon: Star },
    { name: 'Author Dashboard', href: '/author-dashboard', icon: User },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-sage-50 to-sage-100'}`}>
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gold-200 dark:border-gray-700' 
          : 'bg-gradient-to-r from-gold-100 to-gold-200 dark:from-gray-800 dark:to-gray-900 shadow-lg border-b border-gold-300 dark:border-gray-700'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-sage-700 to-sage-800 dark:from-sage-600 dark:to-sage-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <BookOpen className="w-6 h-6 text-gold-100" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-sage-900 to-sage-700 dark:from-sage-100 dark:to-sage-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  ZENJAURA
                </h1>
                <p className="text-xs text-sage-600 dark:text-sage-400 -mt-1">PUBLISHING HOUSE</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      isActive(item.href)
                        ? 'bg-sage-700 dark:bg-sage-600 text-gold-100 shadow-md'
                        : 'text-sage-700 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-gray-700 hover:text-sage-900 dark:hover:text-sage-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2 text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-sage-100 hover:bg-sage-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-sage-100 hover:bg-sage-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-sage-100 hover:bg-sage-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login/Register</span>
              </Link>
              <Link
                to="/publish"
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-sage-700 to-sage-800 dark:from-sage-600 dark:to-sage-700 text-gold-100 rounded-lg text-sm font-medium hover:from-sage-800 hover:to-sage-900 dark:hover:from-sage-700 dark:hover:to-sage-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <PenTool className="w-4 h-4" />
                <span>Publish</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-sage-700 dark:text-sage-300 hover:text-sage-900 dark:hover:text-sage-100 hover:bg-sage-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gold-300 dark:border-gray-700 bg-gold-50 dark:bg-gray-800 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-sage-700 dark:bg-sage-600 text-gold-100'
                        : 'text-sage-700 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 space-y-2 border-t border-gold-200 dark:border-gray-600">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-sage-700 dark:text-sage-300 hover:bg-sage-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login/Register</span>
                </Link>
                <Link
                  to="/publish"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-sage-700 dark:bg-sage-600 text-gold-100 rounded-lg text-sm font-medium hover:bg-sage-800 dark:hover:bg-sage-700 transition-all duration-200"
                >
                  <PenTool className="w-5 h-5" />
                  <span>Publish</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-sage-900 to-sage-800 dark:from-gray-900 dark:to-gray-800 text-gold-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-sage-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">ZENJAURA</h3>
                  <p className="text-xs text-gold-300 -mt-1">PUBLISHING HOUSE</p>
                </div>
              </div>
              <p className="text-gold-200 text-sm leading-relaxed mb-4">
                Empowering authors to share their stories with the world through professional publishing services and innovative solutions.
              </p>
              <div className="flex space-x-4">
                <button className="w-8 h-8 bg-gold-500/20 hover:bg-gold-500/30 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-gold-300 text-sm">f</span>
                </button>
                <button className="w-8 h-8 bg-gold-500/20 hover:bg-gold-500/30 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-gold-300 text-sm">t</span>
                </button>
                <button className="w-8 h-8 bg-gold-500/20 hover:bg-gold-500/30 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-gold-300 text-sm">in</span>
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-gold-100 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/books" className="text-gold-200 hover:text-gold-100 transition-colors">Books</Link></li>
                <li><Link to="/packages" className="text-gold-200 hover:text-gold-100 transition-colors">Packages</Link></li>
                <li><Link to="/events" className="text-gold-200 hover:text-gold-100 transition-colors">Events</Link></li>
                <li><Link to="/review" className="text-gold-200 hover:text-gold-100 transition-colors">Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gold-100 font-semibold mb-4">For Authors</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/publish" className="text-gold-200 hover:text-gold-100 transition-colors">Start Publishing</Link></li>
                <li><Link to="/calculator" className="text-gold-200 hover:text-gold-100 transition-colors">Cost Calculator</Link></li>
                <li><Link to="/author-dashboard" className="text-gold-200 hover:text-gold-100 transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-sage-800 dark:border-gray-700 text-center text-gold-300 text-sm">
            <p>&copy; 2025 Zenjaura Publishing House. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;