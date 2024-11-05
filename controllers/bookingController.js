const sql = require('mssql');
const { poolPromise } = require('../config/dbConfig'); // ตรวจสอบให้แน่ใจว่า path และการตั้งค่าถูกต้อง

exports.getBookingData = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Bookings');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching booking data:', error);
        res.status(500).json({ message: 'Error fetching booking data' });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { trip_id, selectedSeats, date } = req.body;
        const user_id = req.user.id; // สมมติว่าคุณเก็บ user ใน req.user จากการยืนยันตัวตน (authentication)

        console.log('Received booking data:', { user_id, trip_id, selectedSeats, date }); // ตรวจสอบข้อมูลที่ได้รับ

        const pool = await poolPromise;
        for (let seat of selectedSeats) {
            console.log('Inserting seat:', seat); // ตรวจสอบข้อมูลที่นั่ง
            await pool.request()
                .input('user_id', sql.Int, user_id)
                .input('trip_id', sql.Int, trip_id)
                .input('number_of_seats', sql.Int, seat)
                .input('booking_date', sql.Date, date)
                .query(`
                    INSERT INTO Bookings (user_id, trip_id, number_of_seats, booking_date)
                    VALUES (@user_id, @trip_id, @number_of_seats, @booking_date)
                `);
        }

        res.status(200).json({ message: 'การจองของคุณถูกบันทึกแล้ว!' });
    } catch (error) {
        console.error("Error in createBooking:", error); // แสดงข้อผิดพลาดใน Console
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการจอง' });
    }
};
