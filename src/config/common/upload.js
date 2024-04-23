import multer from 'multer'
import path from "path";
const storage = multer.diskStorage({
   destination:  path.join(__dirname, '../../public/images'),
   filename: function (req, file, cb) {
       cb(null, file.originalname);
   }
});
const upload = multer({ storage: storage }).single('Image');

module.exports = upload;
