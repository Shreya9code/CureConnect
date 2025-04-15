import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});
//const storage = multer.memoryStorage(); // Use memory storage to directly upload to Cloudinary

const upload = multer({storage });
export  {upload};