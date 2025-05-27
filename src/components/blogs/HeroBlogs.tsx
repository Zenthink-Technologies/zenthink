import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import Blog1 from "../../assets/blogs/blog1.png";
import Blog2 from "../../assets/blogs/blog2.png";
import Blog3 from "../../assets/blogs/blog3.png";
import Blog4 from "../../assets/blogs/blog4.png";
import Blog5 from "../../assets/blogs/blog5.png";
import Blog6 from "../../assets/blogs/blog6.webp";

const HeroBlogs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const blogs = [
    {
      id: 1,
      image: Blog1,
      category: "resources",
      title: "Top Resources for Business Management",
      description:
        "Sit egestas vitae dignissim adipiscing. Eget volutpat pharetra sollio velit egestas nulla.",
    },
    {
      id: 2,
      image: Blog2,
      category: "guides",
      title: "Your Roadmap to Success",
      description:
        "Cras turpis diam at suscipit nunc sit tempus in. Libero facilisis in volutpat euismod tincidunt orci.",
    },
    {
      id: 3,
      image: Blog3,
      category: "updates",
      title: "Latest Updates in ERP Technology",
      description:
        "Rhoncus tincidunt augue tincidunt nulla faucibus morbi faucibus libero. Massa sit commodo.",
    },
    {
      id: 4,
      image: Blog4,
      category: "resources",
      title: "Essential Business Tools 2023",
      description:
        "Sit egestas vitae dignissim adipiscing. Eget volutpat pharetra sollio velit egestas nulla.",
    },
    {
      id: 5,
      image: Blog5,
      category: "guides",
      title: "Step-by-Step Business Planning",
      description:
        "Cras turpis diam at suscipit nunc sit tempus in. Libero facilisis in volutpat euismod tincidunt orci.",
    },
    {
      id: 6,
      image: Blog6,
      category: "updates",
      title: "Industry Trends and Innovations",
      description:
        "Rhoncus tincidunt augue tincidunt nulla faucibus morbi faucibus libero. Massa sit commodo.",
    },
  ];

  const filteredBlogs =
    activeTab === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === activeTab);

  return (
    <div
      id="blogs"
      className="w-full max-w-[1440px] mx-auto h-auto pt-24 py-14"
    >
      <h1 className="text-center text-[50px] font-black leading-tight mb-12">
        Insights and tips for businesses.
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div
          className={`relative transition-all ease-in-out overflow-hidden
             "h-[52px] rounded-[24px] duration-700 bg-gradient-to-tr from-white/10 to-white/0 backdrop-blur-md bg-opacity-5 shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]`}
        >
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as string)}
            radius="full"
            aria-label="Blog Categories"
            classNames={{
              tabList: "gap-1 bg-transparent p-1.5",
              tab: `w-[90px] flex justify-center items-center py-2.5 h-auto
    group transition-all duration-300
    after:absolute after:bottom-1 after:left-1/2 
    after:rounded-full after:w-full after:h-[100px] after:top-5 after:bg-lime-600
    overflow-hidden
    after:opacity-0 after:transition-opacity
    hover:after:opacity-100
    before:absolute before:bottom-0 before:left-0 before:right-0
    before:h-0 before:bg-gradient-to-t
    before:from-lime-800 before:via-transparent before:to-transparent
    before:transition-all after:transition-all before:duration-700 after:duration-700 after:ease-in-out before:ease-in-out
    after:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.4)]
    before:shadow-[inset_0_-5px_5px_rgba(255,255,255,0.025),_inset_0_1px_2px_rgba(255,255,255,0.25)]
    hover:before:h-full`,
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

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="group">
            <div className="relative min-w-[390px] max-w-full h-[500px] rounded-lg bg-white/5 overflow-hidden transition-all duration-300 ease-in-out">
              <img
                src={blog.image}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
                alt={blog.title}
              />
              <span className="absolute top-5 left-5 bg-black rounded-lg px-4 py-1 capitalize">
                {blog.category}
              </span>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-bold">{blog.title}</h2>
              <p className="mt-3 text-white/70">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroBlogs;
