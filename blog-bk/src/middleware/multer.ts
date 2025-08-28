import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    folder: "blog_images",
    format: file.mimetype.split("/")[1],
    public_id: Date.now() + "-" + file.originalname,
  }),
});

export const upload = multer({ storage });
