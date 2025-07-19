const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const {
  getServices,
  createService,
  deleteService
} = require('../controllers/serviceController');

router.get('/', getServices);
router.post('/', auth, createService);
router.delete('/:id', auth, deleteService);

module.exports = router;
