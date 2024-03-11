const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  period: { type: String, required: true }, // Period of download (e.g., month and year)
  userType: { type: String, enum: ['subscriber', 'normal'], required: true }, // User type (subscriber or normal)
  documentType: { type: String, enum: ['question', 'answer'], required: true }, // Type of document (question or answer)
  downloadCount: { type: Number, default: 0 }, // Number of downloads
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;