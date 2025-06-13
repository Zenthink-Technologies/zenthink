import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";
import { fetchBlogs } from "../../../services/blogService";
import { Blog } from "../../../types/blogType";

interface RelatedBlogsProps {
  currentBlogId?: string;
  category: string;
}

const RelatedBlogs = ({ currentBlogId, category }: RelatedBlogsProps) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading related blogs...</div>;
  }

  const relatedBlogs = category
    ? blogs.filter(
        (blog) => blog.id !== currentBlogId && blog.category === category
      )
    : [];

  if (relatedBlogs.length === 0) return null;

  const sameCategoryBlogs = blogs.filter(
    (blog) => blog.category === category && blog.id !== currentBlogId
  );

  const otherCategoryBlogs = blogs.filter(
    (blog) => blog.category !== category && blog.id !== currentBlogId
  );

  const displayedRelatedBlogs = [
    ...sameCategoryBlogs,
    ...otherCategoryBlogs,
  ].slice(0, 3);

  if (displayedRelatedBlogs.length === 0) return null;

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto h-auto">
        <h1 className="text-center text-[40px] lg:text-[50px] px-10 font-black leading-tight mb-6 md:mb-8 lg:mb-10 xl:mb-12">
          Related blogs
        </h1>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-40 md:gap-y-32 px-0 pb-28 lg:pb-36">
          {displayedRelatedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="relative w-full flex items-center justify-center transition-all duration-500 ease-in-out"
            >
              <div
                onClick={() => navigate(`/blog/${slugify(blog.title)}`)}
                className="cursor-pointer relative min-w-full xl:min-w-[340px] max-w-full h-[300px] md:h-[400px] xl:h-[500px] rounded-lg bg-white/5 overflow-hidden group transition-all duration-300 ease-in-out"
                style={{
                  boxShadow: `
                  inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                  inset 0 2px 1.5px rgba(255, 255, 255, 0.05)
                `,
                }}
              >
                <img
                  src={blog.image}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
                  alt={blog.title}
                />

                <span
                  className="absolute top-5 left-5 bg-black rounded-lg px-4 py-1 capitalize"
                  style={{
                    boxShadow: `
                    inset 0 -5px 5px rgba(255, 255, 255, 0.01),
                    inset 0 1.5px 1.5px rgba(255, 255, 255, 0.15)
                  `,
                  }}
                >
                  {blog.category}
                </span>
              </div>
              <span className="absolute top-[104%] left-0">
                <h1 className="text-[23px] font-black leading-7">
                  {blog.title}
                </h1>
                <p className="mt-2 text-[17px] leading-6 opacity-70">
                  {blog.description}
                </p>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedBlogs;
