// src/pages/AdminServiceList.jsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function AdminServiceList() {
  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      const res = await axios.get('/services');
      setServices(res.data);
    } catch (err) {
      setError('Failed to load services');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch {
      alert('Failed to delete service');
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/services/${editId}`, { name: editName });
      setServices(services.map(s => s._id === editId ? { ...s, name: editName } : s));
      setEditId(null);
      setEditName('');
    } catch {
      alert('Failed to update service');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Services</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {services.length === 0 ? (
        <p className="text-center text-gray-600">No services available.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li key={service._id} className="border p-4 rounded shadow flex justify-between items-center">
              {editId === service._id ? (
                <input
                  className="p-2 border rounded w-full mr-4"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                <span>{service.name}</span>
              )}
              <div className="space-x-2">
                {editId === service._id ? (
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(service._id, service.name)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
