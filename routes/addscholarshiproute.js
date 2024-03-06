const express = require('express');
const {addScholarship,updateScholarshipById,deleteScholarshipById} = require('../controllers/add_scholarship');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Endpoint to add a new scholarship
router.post('/addscholarship', authenticateToken, addScholarship);
router.put('/updateScholarshipById', authenticateToken, updateScholarshipById);
router.delete('/deleteScholarshipById', authenticateToken, deleteScholarshipById);
module.exports = router;