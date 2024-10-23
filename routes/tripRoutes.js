const express = require('express');
const { getTrips } = require('../controllers/tripController');
const router = express.Router();

// เส้นทางสำหรับดึงข้อมูลเที่ยวรถทั้งหมด
router.get('/', getTrips);


module.exports = router;
