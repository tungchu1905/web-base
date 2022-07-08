const express = require('express')
const router = express.Router();
const multer = require('multer')
const uploadController = require('./upload.controller')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// upload cloud
const memoryStorage = multer.memoryStorage()
const uploadWithMemoryStorage = multer({ storage: memoryStorage })


// disk
const upload = multer({ storage: storage })
router.post(
  '/disk',
  upload.single('file'),
  uploadController.uploadToDisk
);
// upload cloud
router.post(
  '/',
  uploadWithMemoryStorage.single('file'),
  uploadController.uploadToCloud
);
module.exports = router