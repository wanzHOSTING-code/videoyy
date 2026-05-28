const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req, res) => {
  const file = req.file.filename;

  const videoLink = `${req.protocol}://${req.get("host")}/watch/${file}`;

  res.json({
    success: true,
    link: videoLink,
  });
});

app.get("/watch/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "watch.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Videoyy berjalan di port ${PORT}`);
});
