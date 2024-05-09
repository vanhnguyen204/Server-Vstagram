import multer from 'multer'
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public/images'),
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage }).array('file');
export default upload
