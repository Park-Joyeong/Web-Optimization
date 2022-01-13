const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');
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
        if (!(mimeType === "video/mp4" || mimeType === "video/avi")) {
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }
}).single("file");

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/thumbnail", (req, res) => {
    let thumbsFilePath = "";
    let fileDuration = "";
    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        fileDuration = metadata.format.duration;
    });
    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.webp'
        });
});

router.get("/getVideos", (req, res) => {
    Video.find()
        .sort({ createdAt: -1 })
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos });
        })
});

router.post("/uploadVideo", (req, res) => {
    const video = new Video(req.body);
    video.save((err, video) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    });
});

router.post("/getVideo", (req, res) => {
    const filter = { "_id": req.body.videoId };
    const update = { $inc: { views: 1 } };
    Video.findOneAndUpdate(filter, update).exec();
    Video.findOne({ "_id": req.body.videoId })
        .populate('writer')
        .exec((err, video) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, video: video });
        });
});

router.post("/getSubscriptionVideos", (req, res) => {
    Subscriber.find({ 'userFrom': req.body.userFrom })
        .exec((err, subscribers) => {
            if (err) return res.status(400).send(err);

            let subscribedUser = [];

            subscribers.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo);
            });

            Video.find({ writer: { $in: subscribedUser } })
                .populate('writer')
                .exec((err, videos) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, videos });
                })
        });
});

module.exports = router;
