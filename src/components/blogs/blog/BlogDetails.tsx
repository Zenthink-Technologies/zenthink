import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogBySlug } from "../../../services/blogService";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import NotFound from "../../../screens/NotFound";
import RelatedBlogs from "./RelatedBlogs";
import { Blog } from "../../../types/blogType";
import { Spinner } from "@heroui/react";
import { Button } from "antd";

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogBySlug(slug || "");
        setBlog(data);
      } catch (err) {
        console.error("Failed to load blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  useEffect(() => {
    if (!blog && !loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [blog, loading]);

  if (loading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto py-20 flex justify-center">
        <Spinner color="white" variant="gradient" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-[1440px] mx-auto py-20 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-black backdrop-blur-md z-[99999]">
        <NotFound />
      </div>
    );
  }

  const featuredQuote = blog.content.find(
    (section) => section.type === "quote"
  );

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="py-10 md:py-12 lg:py-14 px-5 sm:px-10 md:px-20 lg:px-28 mt-5">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-[45px] text-center font-bold leading-tight mb-3">
            {blog.title}
          </h1>

          {/* Tags */}
          <div className="dosis flex flex-wrap justify-center items-center gap-2 mb-8 sm:mb-10">
            <span
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 text-white/70 rounded-lg text-sm sm:text-[14px] font-bold text-center capitalize"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                  inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {blog.category}
            </span>
            <span
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 text-white/70 rounded-lg text-sm sm:text-[14px] font-bold text-center capitalize"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                  inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {blog.date}
            </span>
            <span
              className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 text-white/70 rounded-lg text-sm sm:text-[14px] font-bold text-center capitalize"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                  inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              {blog.readTime}
            </span>
          </div>

          {/* Featured Image */}
          <div className="w-full h-auto sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8 sm:mb-10 lg:mb-12 flex justify-center items-center rounded-lg sm:rounded-xl overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-14">
            {/* Author Info */}
            <div
              className="w-full lg:min-w-[300px] xl:min-w-[400px] bg-white/5 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 flex flex-col justify-start items-start"
              style={{
                boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                  inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
                `,
              }}
            >
              <div className="flex justify-start items-center">
                <div className="min-w-12 sm:min-w-16 h-12 sm:h-16 rounded-full bg-lime-50 flex items-center justify-center mr-3 sm:mr-4 text-lime-500 font-black">
                  {blog.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-black text-xl sm:text-2xl lg:text-[30px]">
                    {blog.author}
                  </p>
                  {featuredQuote && (
                    <p className="text-sm sm:text-[15px] font-medium text-white/50 leading-5 mt-1 lg:mt-2">
                      "{featuredQuote.text}"
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 sm:space-x-2.5 mt-4 sm:mt-5">
                <a
                  title="/"
                  href="/"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.1] transition-all duration-500 ease-in-out"
                  style={{
                    boxShadow: `
                      inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                      inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                    `,
                  }}
                >
                  <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400" />
                </a>
                <a
                  title="/"
                  href="/"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.1] transition-all duration-500 ease-in-out"
                  style={{
                    boxShadow: `
                      inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                      inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                    `,
                  }}
                >
                  <Facebook className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400" />
                </a>
                <a
                  title="/"
                  href="/"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.1] transition-all duration-500 ease-in-out"
                  style={{
                    boxShadow: `
                      inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                      inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                    `,
                  }}
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400" />
                </a>
                <a
                  title="/"
                  href="/"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center hover:scale-[1.1] transition-all duration-500 ease-in-out"
                  style={{
                    boxShadow: `
                      inset 0 -5px 5px rgba(255, 255, 255, 0.025),
                      inset 0 1.5px 2px rgba(255, 255, 255, 0.4)
                    `,
                  }}
                >
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-lime-400" />
                </a>
              </div>
            </div>

            <div className="w-full">
              {blog.introduction && (
                <>
                  <p className="text-xl sm:text-2xl lg:text-[30px] xl:text-[40px] font-black mb-2">
                    Introduction
                  </p>
                  <p className="text-[13px] sm:text-[15px] text-gray-600 mb-6 sm:mb-8">
                    {blog.introduction}
                  </p>
                </>
              )}

              {/* Article Content */}
              <article className="prose prose-sm sm:prose-lg max-w-none">
                {blog.content.map((section, index) => {
                  switch (section.type) {
                    case "subtitle":
                      return (
                        <h3
                          key={index}
                          className="text-xl sm:text-2xl lg:text-[30px] xl:text-[40px] font-black mt-6 sm:mt-8 mb-2"
                        >
                          {section.text}
                        </h3>
                      );
                    case "quote":
                      return (
                        <blockquote
                          key={index}
                          className="text-base sm:text-lg lg:text-[17px] font-black border-l-4 border-lime-500 bg-white/5 rounded-[6px] py-2 px-4 sm:py-3 sm:px-6 mt-8 sm:mt-12 mb-6 sm:mb-8 italic text-white leading-6 sm:leading-6"
                        >
                          "{section.text}"
                        </blockquote>
                      );
                    case "image":
                      return (
                        <div
                          key={index}
                          className="my-4 sm:my-6 rounded-lg sm:rounded-xl overflow-hidden"
                        >
                          <div className="w-full max-h-[200px] sm:max-h-[300px] overflow-hidden rounded-lg">
                            <img
                              src={section.imageUrl}
                              alt={section.imageAlt || ""}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          {section.text && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                              {section.text}
                            </p>
                          )}
                        </div>
                      );
                    case "paragraph":
                    default:
                      return (
                        <p
                          key={index}
                          className="mb-4 sm:mb-6 text-gray-700 leading-relaxed text-[13px] sm:text-[15px]"
                        >
                          {section.text}
                        </p>
                      );
                  }
                })}
              </article>
            </div>
          </div>
        </div>
        {blog.category && (
          <RelatedBlogs currentBlogId={blog.id} category={blog.category} />
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
