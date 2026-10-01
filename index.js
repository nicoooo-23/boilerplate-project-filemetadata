"use strict";

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Upload setup
const upload = multer({
  dest: "public/data/uploads/"
});

// Home page
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// File upload
app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (req, res) {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }
);

// Start server
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});