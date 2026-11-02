import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Mission from '../sections/Mission'
import CaseStudy from '../sections/CaseStudy'
import Blog from '../sections/Blog'
import Footer from '../sections/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Mission />
      <CaseStudy />
      {/* <Cohorts /> */}
      {/* <CTA /> */}
      <Blog />
      <Footer />
    </>
  )
}

export default Home
