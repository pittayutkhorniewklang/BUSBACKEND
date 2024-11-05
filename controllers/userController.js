// userController.js
const { sql, poolPromise } = require('../config/dbConfig');

exports.getUsersWithBookings = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
SELECT * FROM Users

        `);
        
        const usersMap = {};
        result.recordset.forEach(row => {
            if (!usersMap[row.id]) {
                usersMap[row.id] = {
                    id: row.id,
                    username: row.username,
                    email: row.email,
                    role: row.role,
                    bookings: []
                };
            }
            if (row.booking_id) {
                usersMap[row.id].bookings.push({
                    booking_id: row.booking_id,
                    trip_id: row.trip_id,
                    number_of_seats: row.number_of_seats,
                    booking_date: row.booking_date
                });
            }
        });
        
        res.json(Object.values(usersMap));
    } catch (error) {
        console.error('Error fetching users with bookings:', error);
        res.status(500).send('Server Error');
    }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// userController.js
exports.getUserCount = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`SELECT COUNT(*) AS count FROM Users`);
        res.status(200).json(result.recordset[0].count);
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error fetching user count' });
    }
};

