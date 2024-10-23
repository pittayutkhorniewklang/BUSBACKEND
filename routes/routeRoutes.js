const express = require('express');
const router = express.Router();
const { getRoutes, addRoute } = require('../controllers/routesController');

// เส้นทางสำหรับดึงข้อมูลเส้นทางทั้งหมด
router.get('/', getRoutes);

// เส้นทางสำหรับเพิ่มข้อมูลเส้นทางใหม่
router.post('/', addRoute);

module.exports = router;