const { sql, poolPromise } = require('../config/dbConfig');

// ดึงข้อมูลเส้นทางทั้งหมด
exports.getRoutes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Trips.id AS trip_id,
        Routes.start,
        Routes.end_point,
        Trips.departure_time,
        Trips.arrival_time,
        Trips.available_seats,
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
  const { start, end_point, ticket_price, departure_time, arrival_time, available_seats } = req.body;
  try {
    const pool = await poolPromise;

    // ตรวจสอบว่ามีเส้นทางนี้อยู่แล้วหรือไม่
    let result = await pool.request()
      .input('start', sql.NVarChar, start)
      .input('end_point', sql.NVarChar, end_point)
      .input('ticket_price', sql.Decimal(10, 2), ticket_price)
      .query(`
        SELECT id FROM Routes 
        WHERE start = @start AND end_point = @end_point AND ticket_price = @ticket_price
      `);

    console.log('Route ID:', result.recordset);

    let routeId;

    if (result.recordset.length === 0) {
      // ถ้าไม่มีเส้นทาง ให้เพิ่มใหม่ในตาราง Routes
      const insertResult = await pool.request()
        .input('start', sql.NVarChar, start)
        .input('end_point', sql.NVarChar, end_point)
        .input('ticket_price', sql.Decimal(10, 2), ticket_price)
        .query(`
          INSERT INTO Routes (start, end_point, ticket_price)
          OUTPUT inserted.id
          VALUES (@start, @end_point, @ticket_price)
        `);
      routeId = insertResult.recordset[0].id;
      console.log('New Route ID:', routeId);
    } else {
      routeId = result.recordset[0].id;
    }

    // เพิ่มข้อมูลในตาราง Trips
    await pool.request()
      .input('route_id', sql.Int, routeId)
      .input('departure_time', sql.DateTime, departure_time)
      .input('arrival_time', sql.DateTime, arrival_time)
      .input('available_seats', sql.Int, available_seats)
      .query(`
        INSERT INTO Trips (route_id, departure_time, arrival_time, available_seats)
        VALUES (@route_id, @departure_time, @arrival_time, @available_seats)
      `);

    res.status(201).json({ message: 'Route added successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: err.message });
  }
};




