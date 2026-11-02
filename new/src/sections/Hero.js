import { useNavigate } from "react-router-dom";
import heroImage from "../assets/Background.png";
import nutPattern from "../assets/nut (1).png";
import CustomButton from "../components/CustomButton";
import { labelConfig } from "../assets/static.config";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
  const navigate = useNavigate();

  return (
  <section className="home-hero relative overflow-hidden flex flex-col lg:flex-row justify-center items-center my-6 sm:my-10 h-auto lg:h-screen" id="home">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 bg-no-repeat opacity-[0.38]"
      style={{
        backgroundImage: `url(${nutPattern})`,
        backgroundPosition: "right top",
        backgroundSize: "48% auto",
      }}
    />
    <div className="relative z-10 w-full lg:w-2/3 flex flex-col justify-center gap-4 sm:gap-5 px-5 sm:px-6 md:px-10 lg:pl-20 pt-6 sm:pt-10 lg:pt-0">
      <div
        className="text-3xl sm:text-4xl md:text-5xl xl:text-8xl font-bold tracking-wide"
        data-aos="fade-left"
      >
         <h1 className="hero-heading uppercase text-dark-brown text-5xl xl:text-9xl leading-[0.88]">
          {labelConfig.heroHeadlineLead}
        </h1>
        <h1 className="hero-heading text-accent-brown font-bold text-5xl xl:text-9xl leading-[0.88] max-w-[300px] sm:max-w-none">
          {labelConfig.heroHeadlineAccent}
        </h1>
            <p className="mt-4 sm:mt-6 text-dark-brown text-[13px] sm:text-xs md:text-xl max-w-[520px] leading-[1.6] sm:leading-normal">
        {labelConfig.redesignedHeroText}
      </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-3 mt-2 sm:mt-[18px] w-full sm:max-w-[460px] lg:max-w-none">
        <CustomButton
          className="w-full sm:w-auto h-[46px] sm:h-[44px] lg:h-[52px] whitespace-nowrap font-semibold text-light-brown bg-accent-brown px-6 sm:px-8 md:px-10 xl:px-20 py-3 transition duration-300 text-[12px] sm:text-xs md:text-lg tracking-[0.01em]"
          onClick={() => navigate("/contact")}
        >
          {labelConfig.proposeProjectLower}
        </CustomButton>
        <CustomButton
          className="w-full sm:w-auto h-[46px] sm:h-[44px] lg:h-[52px] whitespace-nowrap font-semibold text-dark-brown border border-dark-brown px-6 sm:px-8 md:px-10 xl:px-20 py-3 transition duration-300 text-[12px] sm:text-xs md:text-lg tracking-[0.01em]"
          onClick={() => scrollTo("services")}
        >
          {labelConfig.seeServices}
        </CustomButton>
      </div>
      <div className="flex gap-10 sm:gap-[50px] md:gap-[70px] mt-6 sm:mt-[38px] text-dark-brown">
        <div className="flex flex-col">
          <strong className="text-[28px] sm:text-2xl md:text-5xl font-['Barlow_Condensed'] font-bold leading-none">
            <span>{labelConfig.yearsExperience}</span>
            <small className="text-accent-brown">{labelConfig.yearsExperienceUnit}</small>
          </strong>
          <span className="text-[8px] sm:text-[9px] md:text-lg mt-2 tracking-[0.14em] uppercase">
            {labelConfig.yearsExperienceLabel}
          </span>
        </div>
        <div className="flex flex-col">
          <strong className="text-[28px] sm:text-2xl md:text-5xl font-['Barlow_Condensed'] font-bold leading-none">
            <span >
              {labelConfig.testersAvailable}
            </span>
            <small className="text-accent-brown">{labelConfig.testersAvailableUnit}</small>
          </strong>
          <span className="text-[8px] sm:text-[9px] md:text-lg mt-2 tracking-[0.14em] uppercase">
            {labelConfig.testersAvailableLabel}
          </span>
        </div>
      </div>
    </div>

    <div
      className="relative z-10 hidden lg:flex justify-center items-center"
      aria-label="Test-Jedi software quality background"
  >
    <img
          src={heroImage}
          alt=""
          className="md:rounded-3xl"
          data-aos="fade-right"
        />
  </div>
  </section>
  );
};

export default Hero;
