const multer = require('multer');
const path = require('path');

const { cars } = require('../configs/staticConfig');

const storageCarLogo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, cars);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const filterImage = (req, file, cb) => {
    const mimeTypeRegExp = /^image\/(png|jpeg|gif)$/;
    if(mimeTypeRegExp.test(file.mimetype)){
        cb(null, true);
    } else {
        cb(
            new Error('Invalid file type. Only PNG, JPEG, and GIF are allowed.'), 
            false
        );
    };
};

module.exports.uploadCarLogo = multer({
    storage: storageCarLogo,
    fileFilter: filterImage,
});