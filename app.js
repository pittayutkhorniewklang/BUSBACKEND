const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // นำเข้า cors
const authRoutes = require('./routes/authRoutes');
const routeRoutes = require('./routes/routeRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ใช้เส้นทางการตรวจสอบสิทธิ์
app.use('/auth', authRoutes);
app.use('/route', routeRoutes);
app.use('/trip', tripRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
