"use client";

import { Hero, Overview, Recommendation } from "@/app/component";
import { useEffect, useState } from "react";
import { CarouselProvider } from "./context/CarouselContext";
import FeaturedBooks from "./component/featured/FeaturedBooks";

const Home = () => {
  const [hidden, setHidden] = useState("");

  const [breakPoint, setBreakPoint] = useState(null);

  const handleOnHidden = (flag) => {
    setHidden(flag);
  };

  useEffect(() => {
    const updateBreakPoint = () => {
      setBreakPoint(window.innerWidth <= 768);
    };

    updateBreakPoint();

    window.addEventListener("resize", updateBreakPoint);

    return () => {
      window.removeEventListener("resize", updateBreakPoint);
    };
  }, []);

  const styles = {
    overviewContainer: `  
      flex 
      max-lg:flex-col 
      max-md:mt-4 
      py-14 
      container 
      max-lg:gap-20 
      lg:gap-10   
      max-sm:max-w-md   
      mx-auto 
      items-center`,

    styledOverview: `
      ${hidden ? "shadow-md" : ""}
      ${hidden ? "bg-blue-50" : ""}
      shadow-black/30 
      max-w-sm
      md:max-w-md
      lg:max-w-lg 
      lg:h-[650px]
      xl:h-[600px] 
      xl:max-w-3xl 
      2xl:max-w-5xl 
      rounded-xl
    `,
    styledRecSection: `
      ${hidden ? "shadow-md" : ""}
      ${hidden ? "bg-gray-100" : ""}
      shadow-black/30 
      max-w-sm
      md:max-w-md
      lg:h-[650px]
      xl:h-[600px]
      md:h-fit 
      lg:max-w-md 
      lg:h-[600px]
      rounded-xl
    `,
    recommendationTitle: `
      font-bold 
      text-3xl  
      p-4 
      text-center 
      lg:text-[2.6em]`,
    styledRadioBtn: `
      -translate-y-5
      shadow-md w-fit
       mx-auto 
       px-4 
       rounded-xl 
       shadow-gray-300
    `,
    styledNavBtn: `
      relative 
      justify-between 
      -top-[20em]`,
    featuredSection: `
      bg-blue-50 
      max-md:max-w-xl 
      mx-auto 
      p-4 
      max-md:rounded-xl  
      xl:my-20 
      my-12`,
    featuredTitle: `
      font-bold 
      max-md:text-4xl 
      max-md:text-center  
      text-6xl 
      py-12 
      container 
      mx-auto`,
  };

  return (
    <>
      <section className={styles.overviewContainer}>
        <div className={styles.styledOverview}>
          <CarouselProvider
            hideComponent="hideNavigation"
            customRadioBtn={styles.styledRadioBtn}
          >
            <Overview onHidden={handleOnHidden} />
          </CarouselProvider>
        </div>
        <div className={styles.styledRecSection}>
          <h1 className={styles.recommendationTitle}>Recommendation</h1>
          <CarouselProvider
            hideComponent={hidden ? "hideRadioButton" : "hidden"}
            customBtn={styles.styledNavBtn}
          >
            <Recommendation onHidden={handleOnHidden} />
          </CarouselProvider>
        </div>
      </section>
      <section>
        <Hero />
      </section>
      <section className={styles.featuredSection}>
        <h1 className={styles.featuredTitle}>Featured Books </h1>
        <CarouselProvider
          itemsPerSlide={breakPoint ? 1 : 3}
          customRadioBtn={styles.styledRadioBtn}
        >
          <FeaturedBooks />
        </CarouselProvider>
      </section>
    </>
  );
};

export default Home;
