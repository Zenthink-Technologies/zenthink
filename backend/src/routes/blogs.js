const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const db = admin.firestore();

const validateBlog = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !Array.isArray(content)) {
    return res
      .status(400)
      .json({ error: "Title and valid content are required." });
  }
  next();
};

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const snapshot = await db
      .collection("Blogs")
      .orderBy("createdAt", "desc")
      .get();
    const blogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch blogs", message: err.message });
  }
});

// POST new blog
router.post("/", validateBlog, async (req, res) => {
  try {
    const blogData = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const doc = await db.collection("Blogs").add(blogData);
    res.status(201).json({ message: "Blog created", id: doc.id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create blog", message: err.message });
  }
});

// PUT update blog
router.put("/:id", validateBlog, async (req, res) => {
  try {
    const blogRef = db.collection("Blogs").doc(req.params.id);
    await blogRef.update({
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ message: "Blog updated", id: req.params.id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update blog", message: err.message });
  }
});

// DELETE blog
router.delete("/:id", async (req, res) => {
  try {
    await db.collection("Blogs").doc(req.params.id).delete();
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete blog", message: err.message });
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload to Firebase Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(
      `blog-images/${Date.now()}-${req.file.originalname}`
    );

    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491", // Far future date
    });

    res.json({ imageUrl: url });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

module.exports = router;
