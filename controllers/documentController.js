const Document = require('../models/document');

// Upload document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, fileUrl, type, date, setting, examType } = req.body;

    if (!title || !fileUrl || !type || !date || !setting || !examType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newDocument = new Document({ title, fileUrl, type, date, setting, examType });
    await newDocument.save();

    res.status(201).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.error('Document upload failed:', error);
    res.status(500).json({ message: 'Document upload failed' });
  }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};

// Download document
exports.downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Implement logic to download the document file
    // Example: res.download(document.fileUrl);
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({ message: 'Failed to download document' });
  }
};

// Update document (admin only)
exports.updateDocument = async (req, res) => {
  try {
    const { title, fileUrl, type, date, setting, examType } = req.body;

    if (!title || !fileUrl || !type || !date || !setting || !examType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.title = title;
    document.fileUrl = fileUrl;
    document.type = type;
    document.date = date;
    document.setting = setting;
    document.examType = examType;

    await document.save();

    res.status(200).json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Document update failed:', error);
    res.status(500).json({ message: 'Document update failed' });
  }
};

// Delete document (admin only)
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    await document.remove();

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Document deletion failed:', error);
    res.status(500).json({ message: 'Document deletion failed' });
  }
};