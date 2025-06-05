/* eslint-disable object-curly-spacing */
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import * as logger from "firebase-functions/logger";

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Helper function with better typing
const handleError = (
  res: express.Response,
  error: unknown,
  context: string,
  statusCode = 500
) => {
  logger.error(`Error in ${context}:`, error);
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  res.status(statusCode).json({
    error: `Error ${context}`,
    message: errorMessage,
  });
};

// Middleware to validate blog data
const validateBlogData: express.RequestHandler = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ error: "Missing request body" });
    return;
  }
  if (!req.body.title || typeof req.body.title !== "string") {
    res.status(400).json({
      error: "Validation failed",
      message: "Title is required and must be a string",
    });
    return;
  }

  if (!req.body.content || !Array.isArray(req.body.content)) {
    res.status(400).json({
      error: "Validation failed",
      message: "Content is required and must be an array",
    });
    return;
  }

  for (const item of req.body.content) {
    if (
      typeof item !== "object" ||
      !("type" in item) ||
      (item.type === "paragraph" && typeof item.text !== "string") ||
      (item.type === "subtitle" && typeof item.text !== "string") ||
      (item.type === "quote" && typeof item.text !== "string") ||
      (item.type === "image" &&
        (typeof item.imageUrl !== "string" ||
          typeof item.imageAlt !== "string"))
    ) {
      res.status(400).json({
        error: "Validation failed",
        message: "Invalid content format",
      });
      return;
    }
  }

  console.log("Incoming blog data:", JSON.stringify(req.body, null, 2));

  next();
};

// API Endpoints
app.get("/blogs", async (req: express.Request, res: express.Response) => {
  try {
    const category = req.query.category as string | undefined;
    let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      db.collection("Blogs");

    if (category && category !== "all") {
      query = query.where("category", "==", category);
    }

    const snapshot = await query.orderBy("createdAt", "desc").get();
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(blogs);
  } catch (error) {
    handleError(res, error, "fetching blogs");
  }
});

app.post(
  "/blogs",
  validateBlogData,
  async (req: express.Request, res: express.Response) => {
    try {
      const blogData = {
        id: req.body.id || "",
        image: req.body.image || "",
        category: req.body.category || "uncategorized",
        title: req.body.title,
        subtitle: req.body.subtitle || "",
        description: req.body.description || "",
        introduction: req.body.introduction || "",
        content: req.body.content,
        author: req.body.author || "Anonymous",
        date: req.body.date || new Date().toISOString(),
        readTime: req.body.readTime || "0 min read",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await db.collection("Blogs").add(blogData);

      res.status(201).json({
        id: docRef.id,
        message: "Blog created successfully",
      });
    } catch (error) {
      handleError(res, error, "creating blog");
    }
  }
);

app.put(
  "/blogs/:id",
  validateBlogData,
  async (req: express.Request, res: express.Response) => {
    try {
      const updateData = {
        ...req.body,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      // Remove fields that shouldn't be updated
      delete updateData.id;
      delete updateData.createdAt;

      await db.collection("Blogs").doc(req.params.id).update(updateData);

      res.status(200).json({
        message: "Blog updated successfully",
        id: req.params.id,
      });
    } catch (error) {
      handleError(res, error, "updating blog");
    }
  }
);

app.delete(
  "/blogs/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      await db.collection("Blogs").doc(req.params.id).delete();
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      handleError(res, error, "deleting blog");
    }
  }
);

exports.api = functions.https.onRequest(app);

// Firestore Triggers
exports.onBlogCreated = functions.firestore.onDocumentCreated(
  "Blogs/{blogId}",
  (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      logger.error("No data associated with the event");
      return;
    }
    const blogData = snapshot.data();
    logger.log(`New blog created: ${snapshot.id}`, blogData);
  }
);
