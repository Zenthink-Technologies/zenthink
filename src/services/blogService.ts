import { db, storage } from "../admin/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Blog } from "../types/blogType";

export const getBlogs = async (category?: string): Promise<Blog[]> => {
  try {
    const blogsRef = collection(db, "Blogs");
    let q = query(blogsRef);

    if (category && category !== "all") {
      q = query(blogsRef, where("category", "==", category));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc: any) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Blog)
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const addBlog = async (blog: Omit<Blog, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "Blogs"), {
      ...blog,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

export const updateBlog = async (
  id: string,
  blog: Partial<Blog>
): Promise<void> => {
  try {
    await updateDoc(doc(db, "Blogs", id), {
      ...blog,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

export const deleteBlog = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "Blogs", id));
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
