const express = require('express');
const addScholarshipController = require('../controllers/add_scholarship');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Endpoint to add a new scholarship
router.post('/addscholarship', authenticateToken, addScholarshipController);

module.exports = router;
