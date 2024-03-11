const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Upload document route
router.post('/upload', documentController.uploadDocument);

// View all documents route
router.get('/documents', documentController.getAllDocuments);

// Download document route
router.get('/download/:id', documentController.downloadDocument);

// Update document route (restricted to admin)
router.patch('/update/:id', authMiddleware.isAdmin, documentController.updateDocument);

// Delete document route (restricted to admin)
router.delete('/delete/:id', authMiddleware.isAdmin, documentController.deleteDocument);

module.exports = router;