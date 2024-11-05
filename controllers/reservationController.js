// reservationController.js
const { sql, poolPromise } = require('../config/dbConfig');

// ดึงข้อมูลการจองทั้งหมด
exports.getReservations = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                b.id,
                b.user_id,
                b.trip_id,
                b.number_of_seats,
                b.booking_date,
                u.username,
                r.start AS start_location,
                r.end_point AS end_location
            FROM 
                Bookings b
            LEFT JOIN 
                Users u ON b.user_id = u.id
            LEFT JOIN 
                Trips t ON b.trip_id = t.id
            LEFT JOIN 
                Routes r ON t.route_id = r.id
        `);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Error fetching reservations' });
    }
};


// เพิ่มการจอง (ถ้าจำเป็น)
exports.createReservation = async (req, res) => {
    const { user_id, trip_id, number_of_seats, booking_date } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('user_id', sql.Int, user_id)
            .input('trip_id', sql.Int, trip_id)
            .input('number_of_seats', sql.Int, number_of_seats)
            .input('booking_date', sql.DateTime, booking_date)
            .query('INSERT INTO Bookings (user_id, trip_id, number_of_seats, booking_date) VALUES (@user_id, @trip_id, @number_of_seats, @booking_date)');
        res.status(201).json({ message: 'Reservation added successfully' });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Error creating reservation' });
    }
};

// อัพเดทการจอง
exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    const { user_id, trip_id, number_of_seats, booking_date } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .input('user_id', sql.Int, user_id)
            .input('trip_id', sql.Int, trip_id)
            .input('number_of_seats', sql.Int, number_of_seats)
            .input('booking_date', sql.DateTime, booking_date)
            .query('UPDATE Bookings SET user_id = @user_id, trip_id = @trip_id, number_of_seats = @number_of_seats, booking_date = @booking_date WHERE id = @id');
        res.status(200).json({ message: 'Reservation updated successfully' });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ message: 'Error updating reservation' });
    }
};

// ลบการจอง
exports.deleteReservation = async (req, res) => {
    const { id } = req.params; // รับ id จาก request params
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Bookings WHERE id = @id'); // ตรวจสอบว่า id ตรงกับ column ที่ใช้ใน database
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({ message: 'Error deleting reservation' });
    }


};
