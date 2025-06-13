import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
  CardFooter,
  Image,
  DateInput,
} from "@heroui/react";
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  uploadBlogImage,
} from "../services/blogService";
import { Blog, BlogContentSection } from "../types/blogType";
import { parseDate } from "@internationalized/date";
import { Popconfirm } from "antd";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [contentSections, setContentSections] = useState<BlogContentSection[]>(
    []
  );
  const [editingSectionIndex, setEditingSectionIndex] = useState<number | null>(
    null
  );
  const [currentSection, setCurrentSection] = useState<
    Partial<BlogContentSection>
  >({
    type: "paragraph",
  });
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
    e.preventDefault?.();
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
      };

      if (currentBlog.id) {
        await updateBlog(currentBlog.id, blogData);
      } else {
        await addBlog(blogData as Omit<Blog, "id">);
      }

      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Failed to save blog:", err);
      setError(err instanceof Error ? err.message : "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteBlog(id);
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
    } catch (err) {
      console.error("Failed to delete blog:", err);
      setError(err instanceof Error ? err.message : "Failed to delete blog");
    } finally {
      setLoading(false);
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

  const openEditModal = (blog: Blog) => {
    const date = blog.date
      ? new Date(blog.date).toISOString().split("T")[0]
      : "";

    setCurrentBlog({
      ...blog,
      date: date,
    });
    setContentSections(blog.content || []);
    onOpen();
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-28 pt-12 md:pt-16 lg:pt-24 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black">
          Blog Management
        </h2>

        <button
          onClick={() => {
            resetForm();
            onOpen();
          }}
          className="
              shadow-[0_0_20px_0px_#000000] w-[170px]
              relative px-6 h-[48px] bg-lime-500 text-white font-extrabold 
              rounded-full border-2 border-lime-400
              transition-all duration-300 ease-linear
              [box-shadow:inset_2px_2px_4px_0_rgba(0,0,0,0.1),inset_-2px_-2px_4px_0_rgba(255,255,255,0.2)]
              hover:[box-shadow:inset_3px_3px_6px_0_rgba(0,0,0,0.2),inset_-3px_-3px_6px_0_rgba(255,255,255,0.3)]
              hover:bg-lime-500/90 active:scale-95
              after:absolute after:bottom-1 after:left-1/2 
              after:-translate-x-1/2 after:w-3 after:h-3
              after:rounded-full
              overflow-hidden
            "
        >
          <span className="z-10"> Create New Blog</span>

          {/* Spark elements */}
          <span
            className="
                absolute inset-0 w-full mx-auto
                before:absolute before:left-8 before:top-2 before:w-1 before:h-1 
                before:bg-lime-200 before:rounded-full before:opacity-0
                before:hover:opacity-100 before:hover:animate-spark-x
                after:absolute after:right-8 after:bottom-2 after:w-1 after:h-1 
                after:bg-lime-200 after:rounded-full after:opacity-0
                after:hover:opacity-100 after:hover:animate-spark-x-reverse
              "
          ></span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger-100 text-danger-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <Spinner color="white" variant="gradient" />
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card
              key={`${blog.id}-${blog.updatedAt}`}
              className="hover:shadow-lg transition-all bg-neutral-900 text-white"
            >
              <CardBody className="p-0">
                <div className="h-48 overflow-hidden rounded-t-lg bg-white/5">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    fallbackSrc="https://via.placeholder.com/500x300?text=Blog+Image"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-white border-1.5 border-lime-500 rounded-full px-2.5 py-[1px] flex justify-center items-center gap-x-2">
                      <span className="min-w-2 h-2 rounded-full bg-lime-400"></span>
                      {blog.category}
                    </div>
                    <span className="text-default-500 text-sm dosis">
                      {blog.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-default-500 text-sm mb-4 line-clamp-2">
                    {blog.description}
                  </p>
                </div>
              </CardBody>
              <CardFooter className="flex justify-between items-center">
                <span className="text-default-400 text-sm dosis">
                  {new Date(blog.date).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    onPress={() => openEditModal(blog)}
                    className="bg-white/5 rounded-full h-[32px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.28em"
                      height="1.28em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.1 2.1 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621" />
                        <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
                      </g>
                    </svg>
                  </Button>
                  <Popconfirm
                    title="Delete this blog?"
                    description="Are you sure you want to delete this blog? This action cannot be undone."
                    onConfirm={() => blog.id && handleDelete(blog.id)}
                    okText="Yes, delete it"
                    cancelText="Cancel"
                    okButtonProps={{
                      danger: true,
                      loading: loading,
                    }}
                  >
                    <Button className="bg-white/5 rounded-full h-[32px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.28em"
                        height="1.28em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="#a3e635"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                        />
                      </svg>
                    </Button>
                  </Popconfirm>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-2xl font-medium text-gray-400 mb-4">
              No blogs available
            </div>
            <Button
              onPress={() => {
                resetForm();
                onOpen();
              }}
              className="bg-lime-500 text-white"
            >
              Create Your First Blog
            </Button>
          </div>
        )}
      </div>

      {/* Full-screen Edit/Create Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        classNames={{
          base: "fixed inset-0",
          wrapper: "fixed inset-0 overflow-y-auto",
          body: "h-full",
        }}
      >
        <ModalContent className="h-full max-h-[100vh] bg-black">
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold sticky top-0 z-10 bg-black border-b-1.5 border-lime-500 shadow-md flex justify-between items-center">
                {currentBlog?.id ? "Edit Blog" : "Create New Blog"}
                <Button isIconOnly onPress={onClose} className="bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.28em"
                    height="1.28em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#a3e635"
                      fillRule="evenodd"
                      d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </ModalHeader>
              <ModalBody className="overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6 dosis">
                  <div className="bg-white/10 space-y-6 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Title"
                        value={currentBlog?.title || ""}
                        onChange={(e) =>
                          setCurrentBlog({
                            ...currentBlog,
                            title: e.target.value,
                          })
                        }
                        isRequired
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
                      isRequired
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
                      isRequired
                    />

                    <div className="flex justify-between items-center gap-6">
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
                        isRequired
                      >
                        <SelectItem className="text-black" key="resources">
                          Resources
                        </SelectItem>
                        <SelectItem className="text-black" key="guides">
                          Guides
                        </SelectItem>
                        <SelectItem className="text-black" key="updates">
                          Updates
                        </SelectItem>
                      </Select>

                      <div className="w-[500px]">
                        <label className="block text-sm font-medium text-default-700 mb-1">
                          Featured Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImageFile(e.target.files?.[0] || null)
                          }
                          className="block w-full text-sm text-default-500 file:cursor-pointer
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-lime-50 file:text-lime-700
                          hover:file:bg-lime-100"
                        />
                        {currentBlog?.image && !imageFile && (
                          <Image
                            src={currentBlog.image}
                            alt="Current blog"
                            className="mt-2 h-32 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        label="Author"
                        value={currentBlog?.author || ""}
                        onChange={(e) =>
                          setCurrentBlog({
                            ...currentBlog,
                            author: e.target.value,
                          })
                        }
                        isRequired
                      />

                      <DateInput
                        label="Date"
                        value={
                          currentBlog?.date ? parseDate(currentBlog.date) : null
                        }
                        onChange={(value) =>
                          setCurrentBlog({
                            ...currentBlog,
                            date: value ? value.toString() : "",
                          })
                        }
                        isRequired
                        className="dosis font-medium"
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
                        className="dosis font-medium"
                        isRequired
                      />
                    </div>
                  </div>

                  <div className="border-t border-divider pt-6">
                    <h3 className="text-2xl font-black mb-3">
                      Content Sections
                    </h3>

                    {contentSections.map((section, index) => (
                      <div
                        key={index}
                        className="mb-6 bg-white/10 space-y-6 p-4 rounded-lg"
                      >
                        {editingSectionIndex === index ? (
                          <div className="space-y-4">
                            <Select
                              label="Section Type"
                              selectedKeys={[section.type]}
                              onChange={(e) => {
                                const updatedSections = [...contentSections];
                                updatedSections[index].type = e.target
                                  .value as BlogContentSection["type"];
                                setContentSections(updatedSections);
                              }}
                              className="bg-black text-white"
                            >
                              <SelectItem
                                className="text-black"
                                key="paragraph"
                              >
                                Paragraph
                              </SelectItem>
                              <SelectItem className="text-black" key="subtitle">
                                Subtitle
                              </SelectItem>
                              <SelectItem className="text-black" key="quote">
                                Quote
                              </SelectItem>
                              <SelectItem className="text-black" key="image">
                                Image
                              </SelectItem>
                            </Select>

                            {section.type !== "image" && (
                              <Textarea
                                label="Content"
                                value={section.text || ""}
                                onChange={(e) => {
                                  const updatedSections = [...contentSections];
                                  updatedSections[index].text = e.target.value;
                                  setContentSections(updatedSections);
                                }}
                                className="bg-black text-white"
                              />
                            )}

                            {section.type === "quote" && (
                              <Input
                                label="Author"
                                value={section.author || ""}
                                onChange={(e) => {
                                  const updatedSections = [...contentSections];
                                  updatedSections[index].author =
                                    e.target.value;
                                  setContentSections(updatedSections);
                                }}
                                className="bg-black text-white"
                              />
                            )}

                            {section.type === "image" && (
                              <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                  Image
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const url = await uploadBlogImage(file);
                                      const updatedSections = [
                                        ...contentSections,
                                      ];
                                      updatedSections[index].imageUrl = url;
                                      setContentSections(updatedSections);
                                    }
                                  }}
                                  className="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-lime-50 file:text-lime-500
                hover:file:bg-lime-100"
                                />
                                {section.imageUrl && (
                                  <Image
                                    src={section.imageUrl}
                                    alt={section.imageAlt || ""}
                                    className="mt-2 max-h-40 rounded-lg"
                                  />
                                )}
                              </div>
                            )}

                            <div className="flex justify-end gap-2">
                              <Button
                                onPress={() => setEditingSectionIndex(null)}
                                className="bg-white/10 text-white"
                              >
                                Cancel
                              </Button>
                              <Button
                                onPress={() => setEditingSectionIndex(null)}
                                className="bg-lime-400/15 text-lime-500 border border-lime-400/20"
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="absolute top-2 right-2 flex gap-2">
                              <Button
                                isIconOnly
                                onPress={() => setEditingSectionIndex(index)}
                                className="bg-white/10 h-[22px]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 24 24"
                                >
                                  <g
                                    fill="none"
                                    stroke="#a3e635"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                  >
                                    <path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.1 2.1 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621" />
                                    <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
                                  </g>
                                </svg>
                              </Button>
                              <Button
                                isIconOnly
                                onPress={() => removeContentSection(index)}
                                className="bg-white/10 h-[22px]"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill="#a3e635"
                                    fillRule="evenodd"
                                    d="M4.28 3.22a.75.75 0 0 0-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06L8 9.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L9.06 8l3.72-3.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            </div>

                            <h4 className="font-bold capitalize text-lime-400">
                              {section.type}
                            </h4>
                            {section.text && (
                              <p className="mt-1 text-white">{section.text}</p>
                            )}
                            {section.imageUrl && (
                              <Image
                                src={section.imageUrl}
                                alt={section.imageAlt || ""}
                                className="mt-2 max-h-40 rounded-lg"
                              />
                            )}
                            {section.author && (
                              <p className="text-sm text-gray-400 mt-1">
                                - {section.author}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="bg-default-100 p-4 rounded-lg space-y-4 bg-white/10">
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
                        <SelectItem className="text-black" key="paragraph">
                          Paragraph
                        </SelectItem>
                        <SelectItem className="text-black" key="subtitle">
                          Subtitle
                        </SelectItem>
                        <SelectItem className="text-black" key="quote">
                          Quote
                        </SelectItem>
                        <SelectItem className="text-black" key="image">
                          Image
                        </SelectItem>
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
                          <label className="block text-sm font-medium text-white mb-1">
                            Image
                          </label>
                          <input
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
                            className="block w-full text-sm text-white
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-lg file:border-0
                              file:text-sm file:font-semibold
                              file:bg-lime-50 file:text-lime-500
                              hover:file:bg-lime-100"
                          />
                        </div>
                      )}

                      <Button
                        type="button"
                        onPress={addContentSection}
                        disabled={
                          !currentSection.type ||
                          (currentSection.type !== "image" &&
                            !currentSection.text) ||
                          (currentSection.type === "image" &&
                            !currentSection.imageUrl)
                        }
                        variant="flat"
                        className="bg-lime-400/15 text-lime-500 border border-lime-400/20 cursor-pointer"
                      >
                        Add Section
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="sticky bottom-0 bg-black border-t-1.5 border-lime-500">
                <Button
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}
                  disabled={loading}
                  className="bg-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onPress={(e) => {
                    const formEvent = e as unknown as React.FormEvent;
                    handleSubmit(formEvent);
                  }}
                  isLoading={loading}
                  className="bg-lime-400 border border-lime-700 cursor-pointer"
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BlogManagement;
