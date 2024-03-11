const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const middleware = require('./middlewares/authMiddleware')
const router = require('./routes/adminRoutes');
// const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for handling CORS
app.use(cors());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});