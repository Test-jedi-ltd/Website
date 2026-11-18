import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollReveal = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const sections = document.querySelectorAll("main section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default ScrollReveal;
