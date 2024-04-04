const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const middleware = require('./middlewares/authMiddleware')
const authRoutes = require('./routes/authRoutes');
const subscription = require('./routes/subscriptionRoutes');
const fileRoutes = require('./routes/fileRoutes')


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for handling CORS
app.use(cors());

// Mount the auth routes
app.use('/auth', authRoutes);
app.use('/subscription', subscription);

//path to read the doc
app.use('/filelocation',fileRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

