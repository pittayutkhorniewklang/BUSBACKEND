// models/Bookings.js
module.exports = (sequelize, DataTypes) => {
    const Bookings = sequelize.define("bookings", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        seat_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        booking_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return Bookings;
};
