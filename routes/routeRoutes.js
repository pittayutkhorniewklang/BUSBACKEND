const express = require('express');
const router = express.Router();
const { getRoutes, addRoute, deleteRoute } = require('../controllers/routesController');

// เส้นทางสำหรับดึงข้อมูลเส้นทางทั้งหมด
router.get('/', getRoutes);

// เส้นทางสำหรับเพิ่มข้อมูลเส้นทางใหม่
router.post('/', addRoute);
router.post('/', addRoute);
router.delete('/:id', deleteRoute);

module.exports = router;