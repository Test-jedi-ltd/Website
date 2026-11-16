import { useNavigate } from "react-router-dom";
import heroImage from "../assets/Background.png";
import nutPattern from "../assets/hero-nut.png";
import CustomButton from "../components/CustomButton";
import { labelConfig } from "../assets/static.config";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
  const navigate = useNavigate();

  return (
  <section className="home-hero relative flex flex-col xl:flex-row justify-center items-center my-6 sm:my-10 h-auto xl:my-0 xl:min-h-[calc(100svh-86px)] xl:py-12" id="home">
    <img
      aria-hidden="true"
      src={nutPattern}
      alt=""
      className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[min(55vw,720px)] max-w-full opacity-[0.32] md:block"
    />
    <div className="relative z-10 flex w-full min-w-0 flex-col justify-center gap-4 px-5 pt-6 sm:gap-5 sm:px-6 sm:pt-10 md:px-10 xl:w-3/5 xl:pl-20 xl:pt-0">
      <div
        className="font-bold tracking-wide"
        data-aos="fade-left"
      >
         <h1 className="hero-heading uppercase text-dark-brown text-[clamp(2.5rem,6.6vw,8rem)] leading-[0.88]">
          {labelConfig.heroHeadlineLead}
        </h1>
        <h1 className="hero-heading text-accent-brown font-bold text-[clamp(2.5rem,6.6vw,8rem)] leading-[0.88] max-w-[300px] sm:max-w-none">
          {labelConfig.heroHeadlineAccent}
        </h1>
            <p className="mt-4 sm:mt-6 text-dark-brown text-[13px] sm:text-xs md:text-xl max-w-[520px] leading-[1.6] sm:leading-normal">
        {labelConfig.redesignedHeroText}
      </p>
      </div>

      <div className="flex w-full flex-col flex-wrap gap-2 sm:mt-[18px] sm:max-w-[460px] sm:flex-row sm:items-stretch sm:gap-3 lg:max-w-none">
        <CustomButton
          className="h-[46px] w-full whitespace-nowrap bg-accent-brown px-6 py-3 text-[12px] font-semibold tracking-[0.01em] text-light-brown transition duration-300 sm:h-[44px] sm:w-auto sm:px-6 sm:text-xs md:px-8 md:text-base lg:h-[52px] xl:px-10 xl:text-lg"
          onClick={() => navigate("/contact")}
        >
          {labelConfig.proposeProjectLower}
        </CustomButton>
        <CustomButton
          className="h-[46px] w-full whitespace-nowrap border border-dark-brown px-6 py-3 text-[12px] font-semibold tracking-[0.01em] text-dark-brown transition duration-300 sm:h-[44px] sm:w-auto sm:px-6 sm:text-xs md:px-8 md:text-base lg:h-[52px] xl:px-10 xl:text-lg"
          onClick={() => scrollTo("services")}
        >
          {labelConfig.seeServices}
        </CustomButton>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-dark-brown sm:mt-[38px] sm:gap-x-[50px] md:gap-x-[70px]">
        <div className="flex flex-col">
          <strong className="text-5xl md:text-7xl font-['Barlow_Condensed'] font-bold leading-none">
            <span>{labelConfig.yearsExperience}</span>
            <small className="text-accent-brown">{labelConfig.yearsExperienceUnit}</small>
          </strong>
          <span className="text-[8px] sm:text-[9px] md:text-lg mt-2 tracking-[0.14em] uppercase">
            {labelConfig.yearsExperienceLabel}
          </span>
        </div>
        <div className="flex flex-col">
          <strong className="text-5xl md:text-7xl font-['Barlow_Condensed'] font-bold leading-none">
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
      className="relative z-10 flex w-full justify-center px-5 sm:px-6 md:px-10 xl:w-2/5 xl:px-0"
      aria-label="Test-Jedi software quality background"
  >
    <img
          src={heroImage}
          alt=""
          className="h-auto w-full max-w-[560px] object-contain md:rounded-3xl hidden lg:block"
          data-aos="fade-right"
        />
  </div>
  </section>
  );
};

export default Hero;
