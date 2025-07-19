const Booking = require('../models/Booking');

// Get all bookings or bookings for a specific user
exports.getBookings = async (req, res) => {
  try {
    const filter = req.user.isAdmin ? {} : { user_id: req.user.id };
    const bookings = await Booking.find(filter).populate('service_id');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;
  try {
    const booking = await Booking.create({
      customer_name,
      address,
      date_time,
      service_id,
      user_id: req.user.id
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Update an existing booking
exports.updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking' });
  }
};
