const mongoose = require('mongoose');

// const documentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   fileUrl: { type: String, required: true },
//   type: { type: String, enum: ['question', 'answer'], required: true },
//   date: { type: Number, required: true }, // Assuming year is represented as a number
//   setting: { type: String, enum: ['paper1', 'paper2', 'paper3'], required: true },
//   examType: { type: String, enum: ['HND', 'BTS', 'DUT', 'Other'], required: true }, // Add more exam types as needed
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   verified: { type: Boolean, default: false },
// });


const documentSchema = new mongoose.Schema({
  fileName: String,
  yearWritten: Number,
  paperNumber: String,
  pdfUrl: String, // Path to the PDF file
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;