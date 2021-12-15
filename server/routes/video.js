const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const mimeType = file.mimetype;
        if(!(mimeType === "video/mp4" || mimeType === "video/avi")) {
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    } 
}).single("file");

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if(err) {
            console.log('fffffffffffffffffffffff')
            return res.json({ success: false, err });
        }
        console.log('ssssssssssssssssss')
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });
});

module.exports = router;
