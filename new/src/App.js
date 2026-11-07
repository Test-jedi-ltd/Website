import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";
import BlogPage from "./pages/Blog";
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
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/postman-made-simple-5-todays-analogy-sending-a-letter" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
