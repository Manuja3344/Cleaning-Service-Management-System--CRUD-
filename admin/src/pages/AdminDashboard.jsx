// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      setError('Failed to load bookings');
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
    } catch {
      alert('Failed to delete booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => (
            <div key={b._id} className="p-4 border rounded shadow">
              <p><strong>Customer:</strong> {b.customer_name}</p>
              <p><strong>Address:</strong> {b.address}</p>
              <p><strong>Date:</strong> {new Date(b.date_time).toLocaleString()}</p>
              <p><strong>Service:</strong> {b.service_id?.name || 'N/A'}</p>
              <p><strong>User ID:</strong> {b.user_id}</p>
              <button
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                onClick={() => deleteBooking(b._id)}
              >
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
