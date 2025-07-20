import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Cleanify</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:underline py-2">Home</Link>
            <Link to="/services" className="hover:underline py-2">Services</Link>
            <Link to="/bookings" className="hover:underline py-2">Bookings</Link>
            {loggedIn && <Link to="/dashboard" className="hover:underline py-2">Dashboard</Link>}
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:underline py-2"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:underline py-2">Login</Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link to="/" className="block hover:bg-blue-500 px-3 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" className="block hover:bg-blue-500 px-3 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/bookings" className="block hover:bg-blue-500 px-3 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>Bookings</Link>
            {loggedIn && <Link to="/dashboard" className="block hover:bg-blue-500 px-3 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>}
            {loggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left hover:bg-blue-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="block hover:bg-blue-500 px-3 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}