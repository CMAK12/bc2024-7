require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const deviceRoutes = require('./routes/device');
const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/devices', deviceRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
