import { Blog } from "../types/blogType";
import { slugify } from "../utils/slugify";

const API_BASE_URL = "https://zenthink-backend.onrender.com/api/blogs";

// Get all blogs
export const getBlogs = async (category?: string): Promise<Blog[]> => {
  try {
    let url = API_BASE_URL;
    if (category && category !== "all") {
      url += `?category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Add a new blog
export const addBlog = async (blog: Omit<Blog, "id">): Promise<Blog> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (!response.ok) {
      throw new Error("Failed to add blog");
    }

    const data = await response.json();
    return { ...blog, id: data.id };
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};

// services/blogService.ts
export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(
      "https://zenthink-backend.onrender.com/api/blogs"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const response = await fetch(
      "https://zenthink-backend.onrender.com/api/blogs"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const blogs = await response.json();
    return blogs.find((blog: Blog) => slugify(blog.title) === slug) || null;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw error;
  }
};

// Update an existing blog
export const updateBlog = async (
  id: string,
  blog: Partial<Blog>
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (!response.ok) {
      throw new Error("Failed to update blog");
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// Upload blog image
export const uploadBlogImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
