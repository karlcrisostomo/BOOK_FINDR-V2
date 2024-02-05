"use client";

import { logo } from "@/public/assets";
import classNames from "classnames";
import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { categories } from "../constants";
import { useState, useMemo } from "react";
const styledComponent = {
  Container: `
    max-w-sm 
    sm:max-w-md
    md:max-w-full
    md:text-xl
    lg:text-sm
    lg:max-w-4xl
    xl:max-w-7xl
    2xl:max-w-full
    mx-auto
    py-4
  `,
  inner: `
    lg:flex 
    gap-4 
    xl:gap-10`,
  followUsWrapper: `
    flex 
    gap-6  
    mx-auto 
    py-6`,
  iconsWrapper: `
    border-[1px]   
    border-gray-200 
    p-2 
    rounded-xl 
    cursor-pointer 
    hover:bg-gray-300 
    transition-all 
    duration-300 `,
  styledTitle: `
    font-bold  
    text-xl
    md:text-2xl`,
  styledParagraph: `
    mt-5 
    text-justify 
    py-6
    lg:max-w-sm 
    lg:mx-0  
    lg:mb-5 `,
};

const FollowUsComponent = () => {
  const socialMediaIcons = [
    {
      icon: FaFacebook,
      alt: "Facebook Logo",
    },
    {
      icon: FaXTwitter,
      alt: "X Logo",
    },
    {
      icon: FaLinkedinIn,
      alt: "linked Logo",
    },
    {
      icon: FaGithub,
      alt: "Github Logo",
    },
  ];

  return (
    <section className={styledComponent.Container}>
      <h1 className={styledComponent.styledTitle}>Follow Us</h1>
      <div className={styledComponent.followUsWrapper}>
        {socialMediaIcons.map((item, idx) => (
          <div className={styledComponent.iconsWrapper} key={idx}>
            {<item.icon size={32} />}
          </div>
        ))}
      </div>
    </section>
  );
};

const BooksCategoryComponent = () => {
  const [current, setCurrent] = useState(false);
  const router = useRouter();

  const handleSelect = useMemo(
    () => (category) => {
      router.push(`/book/${category}`);
      setCurrent(category);
    },
    [router, setCurrent]
  );

  return (
    <section>
      <h1 className={styledComponent.styledTitle}>Book Categories</h1>
      <ul className=" mt-4 grid max-md:grid-cols-2 md:grid-cols-3 md:text-base tracking-tight">
        {categories.map((category, idx) => (
          <div className=" py-[.4em]" key={idx}>
            <li
              onClick={() => handleSelect(category)}
              className={classNames(
                "hover:font-bold  cursor-pointer  transition-all   ",
                {
                  "font-bold": current === category,
                }
              )}
            >
              {category}
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
};

const AboutComponent = () => {
  return (
    <section className={styledComponent.Container}>
      <div className={styledComponent.inner}>
        <div className={` lg:flex-1 ${styledComponent.Container}`}>
          <Image src={logo} className="w-[15em]" alt="BOOKFINDR Logo" />
          <p className={styledComponent.styledParagraph}>
            <span className="font-bold">BOOKFINDR</span> utilizes the Google
            Books API for seamless book discovery, offering users an easy way to
            explore and find diverse titles effortlessly.
          </p>
          <FollowUsComponent />
        </div>

        <div className="flex-none  md:w-[700px] xl:w-[1024px]">
          <BooksCategoryComponent />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const styles = {
    container: `py-8 
      px-5 
      lg:pt-28 
      container 
      mx-auto`,
    inner: `
      border-t-[1px] 
      border-gray-300  
      mt-4 
      max-md:flex-col 
      min-[430px]:max-w-sm 
      sm:max-w-md 
      md:max-w-none  
      mx-auto   
      flex 
      md:items-center  
      justify-between`,
    styledParagraph: `
      py-4 
      flex 
      items-center 
      max-lg:gap-0
      lg:gap-4`,
    styledSpan: `
    max-lg:hidden
      w-2 
      h-2 
      block 
      animate-ping 
      bg-black 
      rounded-full
      `,
  };

  const currentYear = new Date().getFullYear();

  return (
    <section className={styles.container}>
      <AboutComponent />

      <div className={styles.inner}>
        <p className={styles.styledParagraph}>
          BOOKFINDR - &copy; {currentYear} All Rights Reserved
          <span className={styles.styledSpan}></span>
        </p>
        <span>
          made with<span className=" text-red-500"> &#10084;</span> by Karl
          Crisostomo
        </span>
      </div>
    </section>
  );
};

export default Footer;
