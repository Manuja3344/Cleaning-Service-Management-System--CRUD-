import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [form, setForm] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service_id: '',
    special_requests: '',
    phone_number: ''
  });

  const [services, setServices] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/services');
        setServices(response.data);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchServices();

    try {
      const decoded = jwtDecode(token);
      setForm(prev => ({
        ...prev,
        customer_name: decoded.username || ''
      }));
    } catch (err) {
      console.error('Invalid token:', err);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'service_id') {
      const service = services.find(s => s._id === value);
      setSelectedService(service);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      await axios.post('/bookings', form);
      setMessage('Booking created successfully!');
      // Reset form but keep customer info
      setForm(prev => ({
        customer_name: prev.customer_name,
        address: '',
        date_time: '',
        service_id: '',
        
      }));
      setSelectedService(null);
      
      // Redirect to bookings page after 2 seconds
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Book a Cleaning Service</h2>
          <p className="mt-2 text-lg text-gray-600">
            Fill out the form below to schedule your cleaning service
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Customer Info */}
                <div className="sm:col-span-2">
                  <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>


                <div>
                  <label htmlFor="date_time" className="block text-sm font-medium text-gray-700">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="date_time"
                    name="date_time"
                    value={form.date_time}
                    onChange={handleChange}
                    min={new Date().toISOString().slice(0, 16)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="service_id" className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select
                    id="service_id"
                    name="service_id"
                    value={form.service_id}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name} - ${service.price}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedService && (
                  <div className="sm:col-span-2 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800">{selectedService.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedService.description}</p>
                    <p className="text-blue-600 font-bold mt-2">${selectedService.price}</p>
                    {selectedService.estimated_duration && (
                      <p className="text-sm text-gray-500 mt-1">
                        Estimated duration: {selectedService.estimated_duration} hours
                      </p>
                    )}
                  </div>
                )}

                
              </div>

              {/* Status messages */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}