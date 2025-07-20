const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const {
  getServices,
  createService,
  deleteService,
  updateService
} = require('../controllers/serviceController');

router.get('/', getServices);
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

module.exports = router;
