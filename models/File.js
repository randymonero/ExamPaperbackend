const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  accessibleToSubscribers: Boolean, // Indicates whether the file is accessible to subscribers only
});

const File = mongoose.model('File', fileSchema);

module.exports = File;