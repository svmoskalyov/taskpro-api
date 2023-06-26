const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowedFormats: ["jpeg", "jpg", "png"],
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "fill" },
    ],
  },
});

const fileFilter = (req, file, cb) => {
  console.log("req.file", file.mimetype);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    const { avatarName } = req.user;
    cloudinary.api.delete_resources([avatarName], {
      type: "upload",
      resource_type: "image",
    });
    cb(null, file.originalname);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

const uploadCloud = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 },
});

module.exports = uploadCloud;
