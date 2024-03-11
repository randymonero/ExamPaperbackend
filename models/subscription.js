const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: String, enum: ['3months', '6months', '1year'], required: true },
  maxDownloadsPerMonth: { type: Number, default: 50 },
  currentDownloads: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;