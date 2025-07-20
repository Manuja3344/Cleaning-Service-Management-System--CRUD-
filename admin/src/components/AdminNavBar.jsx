// src/components/AdminNavBar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function AdminNavBar({ handleLogout }) {
  const location = useLocation();

  return (
    <nav className="bg-blue-900 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to=""
                  className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-700'}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/add-service"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/admin/add-service' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-700'}`}
                >
                  Add Service
                </Link>
                <Link
                  to="/admin/manage-services"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/admin/manage-services' ? 'bg-blue-800 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-700'}`}
                >
                  Manage Services
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-blue-200 hover:text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
