const { sql, poolPromise } = require('../config/dbConfig');

// ดึงข้อมูลเส้นทางทั้งหมด
exports.getRoutes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Routes.start,
        Routes.end_point,
        Trips.departure_time,
        Routes.ticket_price
      FROM Trips
      INNER JOIN Routes ON Trips.route_id = Routes.id;
    `);
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// เพิ่มเส้นทางใหม่ลงในฐานข้อมูล
exports.addRoute = async (req, res) => {
  const { start, end_point, ticket_price, departure_time, arrival_time, available_seat } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('start', sql.NVarChar, start)
      .input('end_point', sql.NVarChar, end_point)
      .input('ticket_price', sql.Float, ticket_price)
      .input('departure_time', sql.DateTime, departure_time)
      .input('arrival_time', sql.DateTime, arrival_time)
      .input('available_seat', sql.Int, available_seat)
      .query('INSERT INTO Routes (start, end_point, ticket_price, departure_time, arrival_time, available_seat) VALUES (@start, @end_point, @ticket_price, @departure_time, @arrival_time, @available_seat)');
    res.status(201).json({ message: 'Route added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ลบ route
exports.deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Routes WHERE id = @id');
    res.status(200).json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};