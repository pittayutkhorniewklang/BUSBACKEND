const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// ดึงข้อมูลการจองทั้งหมด
router.get('/reservations', reservationController.getReservations);

// อัพเดทการจอง
router.put('/reservations/:id', reservationController.updateReservation);

// ลบการจอง
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;
