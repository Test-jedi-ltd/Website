import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./admin/AuthContext";
import "./admin/admin.css";
import ScrollToTop from "./components/ScrollToTop";
import ScrollReveal from "./components/ScrollReveal";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";
import BlogPage from "./pages/Blog";
import BlogPostDetail from "./components/BlogPostDetail";
import ContactPage from "./pages/Contact";
import CareersPage from "./pages/Careers";
import { PrivacyPage, TermsPage } from "./pages/LegalPages";

const AdminShell = lazy(() => import("./admin/AdminShell"));
const Login = lazy(() => import("./admin/pages/Login"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Projects = lazy(() => import("./admin/pages/Projects"));
const Analytics = lazy(() => import("./admin/pages/Analytics"));
const Settings = lazy(() => import("./admin/pages/Settings"));
const BlogManagement = lazy(() => import("./admin/pages/BlogManagement"));
const NewPost = lazy(() => import("./admin/pages/NewPost"));
const EditPost = lazy(() => import("./admin/pages/EditPost"));
const PreviewPost = lazy(() => import("./admin/pages/PreviewPost"));

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-[#FDF9D2] text-[#151240]">
      <p className="text-[13px] uppercase tracking-[0.12em] text-[#645F70]">
        Loading...
      </p>
    </div>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <div
        key={isAdminRoute ? "admin" : pathname}
        className={isAdminRoute ? undefined : "route-transition"}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route
              path="/postman-made-simple-5-todays-analogy-sending-a-letter"
              element={
                <Navigate
                  to="/blog/postman-made-simple-5-todays-analogy-sending-a-letter"
                  replace
                />
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminShell />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="blog/new-post" element={<NewPost />} />
              <Route path="blog/edit/:slug" element={<EditPost />} />
              <Route path="blog/preview/:slug" element={<PreviewPost />} />
              <Route path="blog-management" element={<BlogManagement />} />
              <Route path="projects" element={<Projects />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
