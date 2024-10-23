const { poolPromise } = require('../config/dbConfig');

exports.getTrips = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Trips');
    res.status(200).json(result.recordset); // ส่งผลลัพธ์กลับไปในรูป JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
