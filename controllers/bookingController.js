
exports.createBooking = async (req, res) => {
    console.log("Request Body:", req.body);
    const { user_id, trip_id, selectedSeats, date } = req.body;
    
    try {
        for (let seat of selectedSeats) {
            console.log("Processing seat:", seat);
            await db.Bookings.create({
                user_id,
                trip_id,
                seat_number: seat,
                booking_date: date
            });
        }
        res.status(200).json({ message: 'การจองของคุณถูกบันทึกแล้ว!' });
    } catch (error) {
        console.error("Error in createBooking:", error);  // แสดงข้อผิดพลาดใน console
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการจอง' });
    }
};

exports.getBookingData = (req, res) => {
    res.send("This is the booking data");  // ตัวอย่างการส่งข้อมูลเพื่อตรวจสอบการทำงาน
};