// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation,useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AdminLogin from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddService from './pages/AdminAddService';
import AdminServiceList from './pages/AdminServiceList';
import AdminNavBar from './components/AdminNavBar';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        setIsAdmin(payload.isAdmin);
        setToken(storedToken);
      } catch (err) {
        console.error('Invalid token');
        setToken(null);
        setIsAdmin(false);
      }
    } else {
      setToken(null);
      setIsAdmin(false);
    }
  }, [location]); // Run on every route change

  const ProtectedRoute = ({ element }) => {
    if (token === null) return null; // Don't flash login while checking
    return token ? element : <Navigate to="/admin/login" />;
  };

const handleLogout = () => {
  localStorage.removeItem('admin_token');
  setToken(null);
  setIsAdmin(false);
  navigate('/admin/login');
};


  return (
    <div className="min-h-screen bg-blue-950 text-white">
      {token && isAdmin && <AdminNavBar handleLogout={handleLogout} />}
      <div className="p-4">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin/add-service" element={<ProtectedRoute element={<AdminAddService />} />} />
          <Route path="/admin/manage-services" element={<ProtectedRoute element={<AdminServiceList />} />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppWrapper;
