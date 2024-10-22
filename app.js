const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');  // นำเข้า cors

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ใช้เส้นทางการตรวจสอบสิทธิ์
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
