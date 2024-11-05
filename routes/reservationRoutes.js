const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// ดึงข้อมูลการจองทั้งหมด
router.get('/', reservationController.getReservations);

// อัพเดทการจอง
router.put('/:id', reservationController.updateReservation);

// ลบการจอง
router.delete('/:id', reservationController.deleteReservation);


module.exports = router;
