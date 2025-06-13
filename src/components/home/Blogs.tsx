import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { Spinner } from "@heroui/react";
import { Blog } from "../../types/blogType";
import { fetchBlogs } from "../../services/blogService";

const Blogs = () => {
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
    return (
      <div className="w-full max-w-[1440px] mx-auto py-20 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const displayedBlogs = blogs.slice(0, 3);

  return (
    <>
      <div
        id="blogs"
        className="w-full max-w-[1440px] mx-auto h-auto py-10 md:py-12 lg:py-14"
      >
        <h1 className="text-center text-[40px] lg:text-[50px] px-10 font-black leading-tight mb-12">
          Insights and tips for businesses.
        </h1>

        {displayedBlogs.length > 0 ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-40 md:gap-y-32 px-10 md:px-28 pb-36">
            {displayedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="relative w-full flex items-center justify-center transition-all duration-500 ease-in-out"
              >
                <div
                  onClick={() => navigate(`/blog/${slugify(blog.title)}`)}
                  className="cursor-pointer relative min-w-full max-w-full h-[300px] md:h-[400px] xl:h-[500px] rounded-lg bg-white/5 overflow-hidden group transition-all duration-300 ease-in-out"
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
        ) : (
          <div className="text-center py-20">
            No blogs available yet. Check back later!
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
