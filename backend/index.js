require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
const PORT = process.env.REACT_APP_PORT || 8080;

// Firebase Admin
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMINSDK_BASE64, "base64").toString("utf8")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
});

// Routes
const contactRoutes = require("./src/routes/contact");
const blogRoutes = require("./src/routes/blogs");

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
