const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));