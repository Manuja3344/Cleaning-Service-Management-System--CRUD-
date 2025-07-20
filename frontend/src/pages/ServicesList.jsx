// src/pages/ServiceList.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/services');
        setServices(res.data);
      } catch (err) {
        setError('Failed to load services');
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Services</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {services.length === 0 ? (
        <p className="text-center text-gray-300">No services found.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service._id} className="bg-white text-gray-900 rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold">{service.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
