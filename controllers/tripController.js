const { sql,poolPromise } = require('../config/dbConfig');

exports.getTrips = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Trips');
    res.status(200).json(result.recordset); // ส่งผลลัพธ์กลับไปในรูป JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ลบ route
exports.deleteTrip = async (req, res) => {
  const { id } = req.params; // id ที่จะลบจากตาราง Trips
  console.log('Received Trip ID for deletion:', id);

  try {
    const pool = await poolPromise;

    // ลบ Trip ที่เกี่ยวข้อง
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Trips WHERE id = @id');

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Error deleting trip:', err);
    res.status(500).json({ message: err.message });
  }
};