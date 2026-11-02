import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";
import CaseStudyPage from "./pages/CaseStudy";
import BlogPostPage from "./pages/BlogPost";
import ContactPage from "./pages/Contact";
import CareersPage from "./pages/Careers";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/case-studies" element={<CaseStudyPage />} />
        <Route path="/blog/load-testing-what-actually-breaks" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
