import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import NotFound from "../screens/NotFound";
import MainLayout from "../screens/MainLayout";
import BlogsPage from "../pages/BlogsPage";
import ContactPage from "../pages/ContactPage";
import ServicesPage from "../pages/ServicesPage";
import BlogDetails from "../components/blogs/blog/BlogDetails";
import Dashboard from "../admin/Dashboard";
import ProtectedRoute from "../admin/ProtectedRoute";
import AuthForm from "../admin/components/AuthForm";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Blog's In Page Navigation */}
        <Route path="/blogs/:category" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* Dashboard with Protected admin routes */}
        <Route path="/admin-zenboard/login" element={<AuthForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin-zenboard" element={<Dashboard />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
