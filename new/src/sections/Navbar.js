import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ConfigProvider, Drawer } from "antd";
import logo from "../assets/logo.svg";
import { labelConfig } from "../assets/static.config";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const goHome = () => {
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const goToBlog = () => {
    setOpen(false);
    if (pathname === "/blog" || pathname === "/postman-made-simple-5-todays-analogy-sending-a-letter") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/blog");
  };

  const goToServices = () => {
    setOpen(false);
    if (pathname === "/services") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/services");
  };

  const goToCareers = () => {
    setOpen(false);
    if (pathname === "/careers") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/careers");
  };

  const navLinkClass = (active) =>
    `text-[13px] lg:text-[16px] font-normal leading-none transition-colors duration-200 ${active ? "text-accent-brown" : "text-dark-brown"}`;

  const goToContact = () => {
    setOpen(false);
    if (pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/contact");
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 grid h-[64px] grid-cols-[auto_1fr_auto] items-center px-4 transition-colors duration-300 ease-in-out sm:h-[74px] sm:px-5 lg:h-[86px] lg:pl-[4vw] lg:pr-[14.9vw] ${
        open
          ? "border-b border-dark-brown/10 bg-light-brown/60 backdrop-blur-md"
          : "border-b border-[rgba(21,18,64,0.14)] bg-light-brown/90 backdrop-blur-md"
      }`}>
        <button className={`${open ? "hidden" : "flex"} items-center justify-self-start border-0 bg-transparent text-dark-brown`} onClick={goHome} aria-label="Test-Jedi home">
          <img src={logo} alt="Test-Jedi" className="h-auto w-[92px] sm:w-[110px] lg:w-[129px]" />
        </button>
        <nav className="hidden lg:flex gap-[31px] justify-self-center relative -top-[3px]" aria-label="Main navigation">
          <button className={navLinkClass(pathname === "/home")} onClick={goHome} aria-current={pathname === "/home" ? "page" : undefined}>{labelConfig.navbarHome}</button>
          <button className={navLinkClass(pathname === "/services")} onClick={goToServices} aria-current={pathname === "/services" ? "page" : undefined}>{labelConfig.navbarServices}</button>
          <button className={navLinkClass(pathname === "/careers")} onClick={goToCareers} aria-current={pathname === "/careers" ? "page" : undefined}>{labelConfig.navbarCohorts}</button>
          <button className={navLinkClass(pathname.startsWith("/blog"))} onClick={goToBlog} aria-current={pathname.startsWith("/blog") ? "page" : undefined}>{labelConfig.navbarBlog}</button>
        </nav>
        <div className="justify-self-end flex items-center gap-2 sm:gap-3">
          <button
            className={`hidden lg:inline-flex items-center justify-center h-[38px] w-auto whitespace-nowrap px-5 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition duration-300 lg:w-[175px] ${
              pathname === "/contact" ? "bg-dark-brown" : "bg-accent-brown"
            }`}
            onClick={goToContact}
          >
            {pathname === "/contact" ? "You're here" : labelConfig.proposeProject}
          </button>
          <button
            className={`${open ? "hidden" : "inline-flex"} lg:hidden h-9 w-9 items-center justify-center sm:h-10 sm:w-10`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Icon icon="fluent:navigation-20-regular" width="26" height="26" style={{ color: "#964A21" }} />
          </button>
        </div>
      </header>
      <div aria-hidden="true" className="h-[64px] sm:h-[74px] lg:h-[86px]" />

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#151240",
            fontFamily: "'DM Sans', sans-serif",
          },
        }}
      >
        <Drawer
          destroyOnHidden
          title={
            <button
              className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center border-0 bg-transparent p-0 sm:left-5"
              onClick={goHome}
              aria-label="Test-Jedi home"
            >
              <img src={logo} alt="Test-Jedi" className="h-auto w-[92px] sm:w-[110px]" />
            </button>
          }
          placement="top"
          open={open}
          onClose={() => setOpen(false)}
          closeIcon={<Icon icon="fluent-mdl2:cancel" width="24" style={{ color: "#964A21" }} className="mobile-drawer-close-icon" />}
          height="auto"
          classNames={{ header: "mobile-drawer-header" }}
          styles={{
            mask: { background: "rgba(21, 18, 64, 0.12)" },
            content: {
              background: "rgba(253, 249, 210, 0.62)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "none",
            },
            header: { background: "transparent", borderBottom: "none", padding: 0 },
            body: { paddingTop: 8, paddingBottom: 18 },
          }}
        >
          <nav className="flex flex-col items-end gap-4 text-right">
            <button className={`text-right text-[15px] ${pathname === "/services" ? "text-accent-brown" : "text-dark-brown"}`} onClick={goToServices}>{labelConfig.navbarServices}</button>
            <button className={`text-right text-[15px] ${pathname === "/careers" ? "text-accent-brown" : "text-dark-brown"}`} onClick={goToCareers}>{labelConfig.navbarCohorts}</button>
            <button className={`text-right text-[15px] ${pathname.startsWith("/blog") ? "text-accent-brown" : "text-dark-brown"}`} onClick={goToBlog}>{labelConfig.navbarBlog}</button>
            <button
              className={`mt-2 inline-flex h-[38px] items-center justify-center self-end px-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white ${pathname === "/contact" ? "bg-dark-brown" : "bg-accent-brown"}`}
              onClick={goToContact}
            >
              {pathname === "/contact" ? "You're here" : labelConfig.proposeProject}
            </button>
          </nav>
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default Navbar;
