"use client";
import React, { useEffect, useRef, useState } from "react";

import SearchBar from "./SearchBar";

import { navLinks } from "@/app/constants";
import { animate, delay, motion, stagger, useAnimation } from "framer-motion";
import { useNavContext } from "../context/NavigationContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logo } from "@/public/assets";
import classNames from "classnames";
const LogoComponent = () => {
  const { isMobile } = useNavContext();

  const handleReload = () => window.location.reload(true);
  return (
    <button title="Book Finder Logo" >
      <Image
        src={logo}
        className={classNames("max-md:w-[10em] w-[15em]  hover:-translate-y-1 transition-all duration-300  hover:shadow-md  p-4 rounded-xl ", {
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

  const staggerAnimation = stagger(0.1, { startDelay: 0.15 });
  const router = useRouter();

  const handleNavigation = (link) => {
    router.push(link);
    setMobile(false);
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
    <div>
      <nav className="nav__container">
        <LogoComponent />
        <motion.div
          initial={isMobile ? { width: "50%" } : { width: "100%" }}
          animate={controls}
          className={isMobile ? "  mobile__nav  " : "nav__default"}
        >
          <ul
            className={
              isMobile
                ? " flex flex-col mt-20 font-bold text-white p-4 text-4xl gap-8 mb-6 "
                : "flex gap-5"
            }
          >
            {navLinks.map((link) => (
              <li
                className=" cursor-pointer hover:font-bold  transition-all duration-200  font-medium"
                key={link.id}
                onClick={() => handleNavigation(link.href)}
              >
                {link.text}
              </li>
            ))}
          </ul>
          <SearchBar />
        </motion.div>
        <HamburgerMenu flag={isMobile} onClick={toggleMenu} />
      </nav>
    </div>
  );
};

export default Navbar;
