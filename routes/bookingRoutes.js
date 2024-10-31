const express = require('express');
const router = express.Router();
const { createBooking, getBookingData } = require('../controllers/bookingController');

router.get('/', getBookingData);  // GET สำหรับข้อมูล booking
router.post('/book', createBooking);  // POST สำหรับการจองที่นั่ง

module.exports = router;
