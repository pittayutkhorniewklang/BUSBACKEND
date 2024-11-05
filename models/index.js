const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // ชี้ไปยังไฟล์ config ที่ตั้งค่าการเชื่อมต่อฐานข้อมูล

const Bookings = sequelize.define('Bookings', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seat_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    booking_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'Bookings'
});

module.exports = {
    Bookings
};
