const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileContoller');

// Route to read files and save their info in MongoDB
router.get('/read-and-save-files', fileController.readFilesAndSaveInfo);


// Route to download a file
router.get('/files/download/:fileId', fileController.downloadFile);

module.exports = router;