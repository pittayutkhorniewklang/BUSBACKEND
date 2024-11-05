const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Endpoint สำหรับลบผู้ใช้
router.delete('/users/:id', userController.deleteUser); 
router.get('/users-with-bookings', userController.getUsersWithBookings); 

module.exports = router;
