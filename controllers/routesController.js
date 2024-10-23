const { sql, poolPromise } = require('../config/dbConfig');

// ดึงข้อมูลเส้นทางทั้งหมด
exports.getRoutes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Routes');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// เพิ่มเส้นทางใหม่ลงในฐานข้อมูล
exports.addRoute = async (req, res) => {
    const { start, end_point } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('start', sql.NVarChar, start)
            .input('end_point', sql.NVarChar, end_point)  // ใช้ end_point ตามชื่อที่ส่งมาจาก body
            .query('INSERT INTO Routes (start, end_point) VALUES (@start, @end_point)');
        res.status(201).json({ message: 'Route added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
