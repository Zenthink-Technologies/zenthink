import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
} from "../services/blogService";
import { Blog, BlogContentSection } from "../types/blogType";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [contentSections, setContentSections] = useState<BlogContentSection[]>(
    []
  );
  const [currentSection, setCurrentSection] = useState<
    Partial<BlogContentSection>
  >({
    type: "paragraph",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog) return;

    try {
      setLoading(true);
      setError(null);

      let imageUrl = currentBlog.image;
      if (imageFile) {
        imageUrl = await uploadBlogImage(imageFile);
      }

      const blogData = {
        ...currentBlog,
        image: imageUrl,
        content: contentSections,
        updatedAt: new Date().toISOString(),
        ...(!currentBlog.id && { createdAt: new Date().toISOString() }),
      };

      if (currentBlog.id) {
        await updateBlog(currentBlog.id, blogData);
      } else {
        await addBlog(blogData as Omit<Blog, "id">);
      }

      // Refresh the list
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
      resetForm();
    } catch (err) {
      console.error("Failed to save blog:", err);
      setError("Failed to save blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        setLoading(true);
        setError(null);
        await deleteBlog(id);
        const fetchedBlogs = await getBlogs();
        setBlogs(fetchedBlogs);
      } catch (err) {
        console.error("Failed to delete blog:", err);
        setError("Failed to delete blog. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setCurrentBlog(null);
    setContentSections([]);
    setImageFile(null);
    setError(null);
  };

  const addContentSection = () => {
    if (!currentSection.type) return;

    const newSection: BlogContentSection = {
      type: currentSection.type,
      text: currentSection.text || "",
      author: currentSection.author,
      imageUrl: currentSection.imageUrl,
      imageAlt:
        currentSection.imageAlt || `Image for ${currentBlog?.title || "blog"}`,
    };

    setContentSections([...contentSections, newSection]);
    setCurrentSection({ type: "paragraph" });
  };

  const removeContentSection = (index: number) => {
    const newSections = [...contentSections];
    newSections.splice(index, 1);
    setContentSections(newSections);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Management</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blog List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
          <Button
            color="primary"
            className="mb-4 w-full"
            onClick={() => resetForm()}
          >
            Create New Blog
          </Button>

          {loading ? (
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    currentBlog?.id === blog.id
                      ? "bg-blue-50 border-blue-200"
                      : ""
                  }`}
                  onClick={() => {
                    setCurrentBlog(blog);
                    setContentSections(blog.content || []);
                  }}
                >
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-sm text-gray-500">{blog.category}</p>
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      color="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (blog.id) {
                          handleDelete(blog.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Blog Form */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            {currentBlog?.id ? "Edit Blog" : "Create New Blog"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                value={currentBlog?.title || ""}
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    title: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Subtitle"
                value={currentBlog?.subtitle || ""}
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    subtitle: e.target.value,
                  })
                }
              />
            </div>

            <Textarea
              label="Description"
              value={currentBlog?.description || ""}
              onChange={(e) =>
                setCurrentBlog({
                  ...currentBlog,
                  description: e.target.value,
                })
              }
              required
            />

            <Textarea
              label="Introduction"
              value={currentBlog?.introduction || ""}
              onChange={(e) =>
                setCurrentBlog({
                  ...currentBlog,
                  introduction: e.target.value,
                })
              }
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                selectedKeys={
                  currentBlog?.category ? [currentBlog.category] : []
                }
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    category: e.target.value as
                      | "resources"
                      | "guides"
                      | "updates",
                  })
                }
                required
              >
                <SelectItem key="resources">Resources</SelectItem>
                <SelectItem key="guides">Guides</SelectItem>
                <SelectItem key="updates">Updates</SelectItem>
              </Select>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <input
                  title="/"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {currentBlog?.image && !imageFile && (
                  <img
                    src={currentBlog.image}
                    alt="Current blog"
                    className="mt-2 h-32 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Author"
                value={currentBlog?.author || ""}
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    author: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Date"
                type="date"
                value={currentBlog?.date || ""}
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    date: e.target.value,
                  })
                }
                required
              />

              <Input
                label="Read Time"
                value={currentBlog?.readTime || ""}
                onChange={(e) =>
                  setCurrentBlog({
                    ...currentBlog,
                    readTime: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Content Sections</h3>

              <div className="space-y-4 mb-4">
                {contentSections.map((section, index) => (
                  <div key={index} className="border p-3 rounded relative">
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      onClick={() => removeContentSection(index)}
                    >
                      ×
                    </button>
                    <h4 className="font-medium capitalize">{section.type}</h4>
                    {section.text && <p className="mt-1">{section.text}</p>}
                    {section.imageUrl && (
                      <img
                        src={section.imageUrl}
                        alt={section.imageAlt}
                        className="mt-2 max-h-40"
                      />
                    )}
                    {section.author && (
                      <p className="text-sm text-gray-500 mt-1">
                        - {section.author}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3 border p-4 rounded-lg">
                <Select
                  label="Section Type"
                  selectedKeys={
                    currentSection.type ? [currentSection.type] : []
                  }
                  onChange={(e) =>
                    setCurrentSection({
                      ...currentSection,
                      type: e.target.value as BlogContentSection["type"],
                    })
                  }
                >
                  <SelectItem key="paragraph">Paragraph</SelectItem>
                  <SelectItem key="subtitle">Subtitle</SelectItem>
                  <SelectItem key="quote">Quote</SelectItem>
                  <SelectItem key="image">Image</SelectItem>
                </Select>

                {currentSection.type !== "image" && (
                  <Textarea
                    label="Content"
                    value={currentSection.text || ""}
                    onChange={(e) =>
                      setCurrentSection({
                        ...currentSection,
                        text: e.target.value,
                      })
                    }
                  />
                )}

                {currentSection.type === "quote" && (
                  <Input
                    label="Author"
                    value={currentSection.author || ""}
                    onChange={(e) =>
                      setCurrentSection({
                        ...currentSection,
                        author: e.target.value,
                      })
                    }
                  />
                )}

                {currentSection.type === "image" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <input
                      title="/"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = await uploadBlogImage(file);
                          setCurrentSection({
                            ...currentSection,
                            imageUrl: url,
                            imageAlt: `Image for ${
                              currentBlog?.title || "blog"
                            }`,
                          });
                        }
                      }}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                )}

                <Button
                  type="button"
                  onClick={addContentSection}
                  disabled={
                    !currentSection.type ||
                    (currentSection.type !== "image" && !currentSection.text) ||
                    (currentSection.type === "image" &&
                      !currentSection.imageUrl)
                  }
                >
                  Add Section
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                color="default"
                onClick={resetForm}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={loading}
                disabled={
                  !currentBlog?.title ||
                  !currentBlog.description ||
                  !currentBlog.introduction ||
                  !currentBlog.category ||
                  !currentBlog.author ||
                  !currentBlog.date ||
                  !currentBlog.readTime
                }
              >
                {currentBlog?.id ? "Update Blog" : "Create Blog"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
