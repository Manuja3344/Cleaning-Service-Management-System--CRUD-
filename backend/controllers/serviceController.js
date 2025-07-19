const Service = require('../models/Service');

// Get all service
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services' });
  }
};

// Get a specific service by ID
exports.createService = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    const service = await Service.create({ name: req.body.name });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: 'Error creating service' });
  }
};

// Update an existing service
exports.deleteService = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service' });
  }
};
