import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Packages from './pages/Packages';
import Calculator from './pages/Calculator';
import Events from './pages/Events';
import Review from './pages/Review';
import AuthorDashboard from './pages/AuthorDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Publish from './pages/Publish';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/events" element={<Events />} />
          <Route path="/review" element={<Review />} />
          <Route path="/author-dashboard" element={<AuthorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;