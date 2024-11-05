const express = require('express');
const { getTrips, deleteTrip } = require('../controllers/tripController');
const router = express.Router();

// เส้นทางสำหรับดึงข้อมูลเที่ยวรถทั้งหมด
router.get('/', getTrips);
router.delete('/:id', deleteTrip);

module.exports = router;
