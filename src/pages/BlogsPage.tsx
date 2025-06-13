import HeroBlogs from "../components/blogs/HeroBlogs";
import Feedback from "../components/blogs/Feedback";

const BlogsPage = () => {
  return (
    <>
      <div className="min-w-screen h-auto scroll-smooth">
        <HeroBlogs />
        <Feedback />
      </div>
    </>
  );
};

export default BlogsPage;
