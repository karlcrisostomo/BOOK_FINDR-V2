"use client";
import React, { useEffect, useRef, useState } from "react";

import SearchBar from "./searchbar/SearchBar";

import { navLinks } from "@/app/constants";
import { LayoutGroup, motion, useAnimation } from "framer-motion";
import { useNavContext } from "../context/NavigationContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logo } from "@/public/assets";
import classNames from "classnames";

const navStyles = {
  navContainer: ` 
    flex 
    items-center 
    max-sm:justify-between 
    sm:justify-between 
    max-md:p-2
    container 
    mx-auto 
    py-6`,
  styledLogo: `
    max-md:w-[10em] 
    w-[15em]  
    hover:-translate-y-1 
    transition-all 
    duration-300 
    rounded-xl `,
  styledUnderline: ` 
    w-full  
    h-[0.2em] 
    rounded-xl  
    bg-black `,
  styledList: `
    font-medium
    cursor-pointer 
    hover:font-bold  
    transition-all 
    duration-200  
    `,
  mobile: `
    flex 
    flex-col 
    mt-20 
    font-bold 
    p-4 
    text-4xl 
    gap-8 
    mb-6 `,
  default: `flex gap-5`,
  defaultNav: `
    flex 
    justify-center 
    items-center 
    gap-14 
    max-md:hidden 
    max-sm:max-w-md 
    sm:max-w-sm 
    md:max-w-md 
    mx-auto`,
  mobileNav: `
    w-2/4  
    bg-blue-600 
    h-full
    fixed  
    p-6 
    m-0 
    right-0 
    top-0 
    bottom-0
    z-50`,
  navlinksContainer: `
    flex 
    gap-4 
    cursor-pointer`,
};

const LogoComponent = () => {
  const { isMobile } = useNavContext();

  const handleReload = () => window.location.reload(true);
  return (
    <button title="Book Finder Logo" onClick={() => handleReload()}>
      <Image
        src={logo}
        className={classNames(navStyles.styledLogo, {
          "blur-sm": isMobile,
        })}
        alt="BOOKFINDR Logo"
      />
    </button>
  );
};

const HamburgerMenu = ({ flag, onClick }) => {
  //mobile-nav icon
  const menu = [1, 2];

  const Animation = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    start: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
  };

  return (
    <div
      className={` z-50 cursor-pointer ${
        flag ? "mt-2 right-2  absolute" : " md:hidden "
      }`}
      onClick={onClick}
    >
      {menu.map((idx) => (
        <motion.span
          key={idx}
          variants={{
            ...Animation,
            start: {
              ...Animation.start,
              rotate: flag ? (idx === 1 ? 45 : -45) : 0,
              y: flag ? (idx === 2 && 1 ? -10 : 0) : 0,
            },
          }}
          className={`menu__bar__${idx}`}
          initial="initial"
          animate="start"
        />
      ))}
    </div>
  );
};

const Navbar = () => {
  const { isMobile, setMobile, toggleMenu } = useNavContext();
  const controls = useAnimation();
  const [selected, setSelected] = useState(0);

  const router = useRouter();

  const handleNavigation = (link, index) => {
    router.push(link);
    setMobile(false);

    setSelected(index);
  };

  useEffect(() => {
    const animateMenu = async () => {
      if (isMobile) {
        await controls.start({
          width: "80%",
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        });
      } else {
        await controls.start({
          width: "0%",
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        });
      }
    };

    animateMenu();
  }, [isMobile, controls]);

  useEffect(() => {
    const handleResize = async () => {
      if (window.innerWidth >= 768) {
        await setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // const variants = {
  //   initial: {
  //     width: "15%",
  //   },
  //   start: {
  //     x: 0, // Slide in from right edge
  //     width: "50%",
  //     opacity: 1,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <LayoutGroup>
      <nav className={navStyles.navContainer}>
        <LogoComponent />
        <motion.div
          initial={isMobile ? { width: "50%" } : { width: "100%" }}
          animate={controls}
          className={isMobile ? navStyles.mobileNav : navStyles.defaultNav}
        >
          <ul className={isMobile ? navStyles.mobile : navStyles.default}>
            {navLinks.map((link, idx) => (
              <motion.li
                className={navStyles.styledList}
                style={{ color: !isMobile && idx === selected ? link.color : "#000F19" }}
                key={idx}
                onClick={() => handleNavigation(link.href, idx)}
              >
                {link.text}

                {!isMobile && idx === selected && (
                  <motion.div
                    transition={{ duration: 0.5 }}
                    layoutId="id1"
                    style={{ backgroundColor: link.color }}
                    className={navStyles.styledUnderline}
                  />
                )}
              </motion.li>
            ))}
          </ul>
          <SearchBar />
        </motion.div>
        <HamburgerMenu flag={isMobile} onClick={toggleMenu} />
      </nav>
    </LayoutGroup>
  );
};

export default Navbar;
