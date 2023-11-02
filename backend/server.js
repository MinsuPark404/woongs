const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const dotenv = require('dotenv').config();

const app = express();

/* MongoDB */
// const connectDb = require('./config/dbConnMong');

/* MySQL */
const connectDb = require('./config/dbConnMysql');
app.set('db', connectDb);

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
