const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const mongoose = require('mongoose');


async function readFilesAndSaveInfo(req, res) {
  try {
    // Directory where files are stored
    const filesDir = './uploads/answers';

    // Read the list of files in the directory
    const files = fs.readdirSync(filesDir);

    // Loop through each file, extract info, and save to MongoDB
    for (const filename of files) {
      // Example logic to determine accessibility (you may need to modify this based on your requirements)
      const accessibleToSubscribers = filename.endsWith('.pdf'); // Example: Assume PDF files are accessible to subscribers only

      const fileInfo = {
        filename,
        filepath: `${filesDir}/${filename}`,
        accessibleToSubscribers,
      };

      // Save file info to MongoDB
      await File.create(fileInfo);
    }

    res.status(200).send('File information saved to MongoDB successfully!');
  } catch (error) {
    console.error('Error reading files and saving info:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function downloadFile(req, res) {
    try {
        // Remove double quotes from fileId
        const fileId = req.params.fileId.replace(/"/g, '');

        // Check if the fileId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            
            console.log('File ID:', fileId);

            return res.status(400).send('Invalid file ID');

        }

        // Find the file in the database
        const file = await File.findById(fileId);
  
        if (!file) {
            return res.status(404).send('File not found');
        }
  
        // Construct the file path dynamically
        const filePath = path.join(__dirname, '..', file.filepath); // Assuming file.filepath is the relative path of the file
  
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }
  
        // Set headers to force download
        res.setHeader('Content-disposition', `attachment; filename=${file.filename}`);
        res.setHeader('Content-type', 'application/pdf'); // Set the appropriate content type based on your file type
  
        // Stream the file to the client
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Internal Server Error');
    }
}

// async function downloadFile(req, res) {
//     try {
//         const fileId = req.params.fileId.replace(/"/g, ''); // Remove any double quotes from the fileId

  
//       // Find the file in the database
//       const file = await File.findById(fileId);
  
//       if (!file) {
//         return res.status(404).send('File not found');
//       }
  
//       // Construct the file path dynamically
//       const filePath = path.join(__dirname, '..', file.filepath);
  
//       // Check if the file exists
//       if (!fs.existsSync(filePath)) {
//         return res.status(404).send('File not found');
//       }
  
//       // Set headers to force download
//       res.setHeader('Content-disposition', `attachment; filename=${file.filename}`);
//       res.setHeader('Content-type', 'application/pdf'); // Set the appropriate content type based on your file type
  
//       // Stream the file to the client
//       const fileStream = fs.createReadStream(filePath);
//       fileStream.pipe(res);
//     } catch (error) {
//       console.error('Error downloading file:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   }

module.exports = { readFilesAndSaveInfo, downloadFile};