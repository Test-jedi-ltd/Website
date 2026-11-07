import Navbar from "../sections/Navbar";
import ContactSection from "../sections/ContactSection";
import Footer from "../sections/Footer";

const ContactPage = () => (
  <>
    <Navbar />
    <main className="overflow-hidden bg-light-brown text-dark-brown">
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default ContactPage;
