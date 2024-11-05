const express = require('express');
const router = express.Router();
const { createBooking, getBookingData } = require('../controllers/bookingController');

router.get('/', getBookingData);  // ใช้ callback function ที่ถูกต้อง
router.post('/book', createBooking);

module.exports = router;
