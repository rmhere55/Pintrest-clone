const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
   file.originalname
    const uniquename = uuidv4(); // Generate a unique filename
    cb(null, uniquename+path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

