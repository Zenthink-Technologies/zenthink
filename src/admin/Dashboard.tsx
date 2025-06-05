import React, { useState, useEffect } from "react";
import { Tabs, Tab, Spinner } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../utils/slugify";
import { getBlogs } from "../services/blogService";
import { Blog } from "../types/blogType";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching blogs for category: ${activeTab}`);

        const fetchedBlogs = await getBlogs(
          activeTab === "all" ? undefined : activeTab
        );

        if (!fetchedBlogs || fetchedBlogs.length === 0) {
          console.warn("No blogs fetched from the database.");
        } else {
          console.log(`Fetched ${fetchedBlogs.length} blog(s) successfully.`);
        }

        // Sort by date (newest first)
        const sortedBlogs = fetchedBlogs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setBlogs(sortedBlogs);
      } catch (err) {
        console.error("Error while fetching blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTab]);

  return (
    <div className="w-full max-w-[1440px] mx-auto h-auto pt-16 md:pt-24 py-14 px-4">
      <h1 className="text-center text-[30px] lg:text-[40px] xl:text-[50px] font-black leading-tight mb-6 md:mb-12">
        Insights and tips for businesses.
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="relative transition-all ease-in-out overflow-hidden h-[52px] rounded-[24px] duration-700 bg-gradient-to-tr from-white/10 to-white/0 backdrop-blur-md bg-opacity-5 shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            radius="full"
            aria-label="Blog Categories"
            classNames={{
              tabList: "gap-1 bg-transparent p-1.5",
              tab: `w-[70px] md:w-[90px] flex justify-center items-center py-2 md:py-2.5 h-auto group transition-all duration-300 after:absolute after:bottom-1 after:left-1/2 after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-600 overflow-hidden after:opacity-0 after:transition-opacity hover:after:opacity-100 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0 before:bg-gradient-to-t before:from-lime-800 before:via-transparent before:to-transparent before:transition-all after:transition-all before:duration-700 after:duration-700 after:ease-in-out before:ease-in-out after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] before:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.25)] hover:before:h-full`,
              cursor:
                "bg-gradient-to-br from-lime-600 to-lime-700 after:absolute after:bottom-1 after:left-1/2 after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-500 after:opacity-100 after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)] shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-500 ease-in-out",
            }}
          >
            <Tab
              key="all"
              title={<p className="text-white font-semibold">All</p>}
            />
            <Tab
              key="resources"
              title={<p className="text-white font-semibold">Resources</p>}
            />
            <Tab
              key="guides"
              title={<p className="text-white font-semibold">Guides</p>}
            />
            <Tab
              key="updates"
              title={<p className="text-white font-semibold">Updates</p>}
            />
          </Tabs>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      )}

      {error && <div className="text-center text-red-500 py-10">{error}</div>}

      {/* Blog Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="group">
              <div
                onClick={() => navigate(`/blog/${slugify(blog.title)}`)}
                className="cursor-pointer relative w-full h-[300px] md:h-[350px] rounded-lg bg-white/5 overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                <img
                  src={blog.image}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-700 ease-in-out"
                  alt={blog.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/500x300?text=Blog+Image";
                  }}
                />
                <span className="absolute top-4 left-4 bg-black/80 text-white rounded-lg px-3 py-1 capitalize text-sm">
                  {blog.category}
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold line-clamp-2">{blog.title}</h2>
                <p className="mt-2 text-gray-500 text-sm">
                  {new Date(blog.date).toLocaleDateString()} • {blog.readTime}
                </p>
                <p className="mt-2 text-gray-700 line-clamp-2">
                  {blog.description}
                </p>
                <button
                  onClick={() => navigate(`/blog/${slugify(blog.title)}`)}
                  className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Read more →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
