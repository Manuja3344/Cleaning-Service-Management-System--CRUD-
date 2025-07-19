const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookController.js');

router.use(auth); // protect all

router.get('/', getBookings);
router.post('/', createBooking);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
