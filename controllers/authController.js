const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('../config/dbConfig');

exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
  
    try {
        const pool = await poolPromise;
  
        // ตรวจสอบว่าอีเมลมีอยู่แล้วหรือไม่
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');
  
        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
  
        // ถ้าอีเมลไม่ซ้ำ ให้บันทึกข้อมูลลงฐานข้อมูล
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .input('role', sql.VarChar, role || 'user')  // เพิ่ม role ถ้าไม่ได้ส่งมา ให้ค่า default เป็น 'user'
            .query('INSERT INTO Users (username, email, password, role) VALUES (@username, @email, @password, @role)');
  
        res.status(200).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');
  
        const user = result.recordset[0];
  
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
  
            if (isMatch) {
                // สร้าง JWT token
                const token = jwt.sign(
                    { id: user.id, username: user.username, role: user.role },
                    'your-secret-key', // เปลี่ยนเป็น secret key ของคุณ
                    { expiresIn: '1h' } // Token หมดอายุใน 1 ชั่วโมง
                );

                // ส่ง token และข้อมูลผู้ใช้กลับไป
                return res.json({
                    message: 'Login successful',
                    token: token,        // ส่ง token กลับไป
                    username: user.username,
                    role: user.role
                });
            } else {
                return res.status(400).json({ message: 'Invalid password' });
            }
        } else {
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
