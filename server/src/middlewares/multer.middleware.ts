import multer from "multer";
import path from "path";
import fs from "fs";

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const dir = path.resolve(__dirname, "../public/temp/");

    // Ensure the directory exists
    if (!fs.existsSync(dir)) {
      // Create the directory if it doesn't exist
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (_req, file, cb) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${timestamp}${ext}`;

    cb(null, fileName);
  },
});

// File Filter
const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (JPEG, JPG, PNG) are allowed!"));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});
