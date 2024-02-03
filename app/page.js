"use client";

import { Hero, StyledLayout, Overview, Recommendation } from "@/app/component";
import { useNavContext } from "./context/NavigationContext";
import { useEffect, useState } from "react";
import { CarouselProvider } from "./context/CarouselContext";
import Loader from "./component/Loader";
import FeaturedBooks from "./component/featured/FeaturedBooks";

const Home = () => {
  const [hidden, setHidden] = useState("");
  const { menuRef, handleClickOutside } = useNavContext();
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

    // clean-up function
    return () => {
      window.removeEventListener("resize", updateBreakPoint);
    };
  }, []);

  const styles = {
    styledOverview: `
    ${hidden ? "shadow-md" : ""}
    backdrop-blur-sm 
    ${hidden ? "bg-blue-50" : ""}
    shadow-black/30 
    sm:max-w-sm
    max-sm:max-w-sm  
    max:md:h-[500px]
    md:max-w-md
    lg:max-w-lg 
    lg:h-[700px]
    xl:h-[600px] 
    xl:max-w-3xl 
    2xl:max-w-5xl 
    rounded-xl
    `,
    styledRecSection: `
    ${hidden ? "shadow-md" : ""}
    ${hidden ? "bg-gray-100" : ""}
    shadow-black/30 
    max-sm:max-w-sm 
    sm:max-w-sm  
    md:max-w-md
    max-md:h-[600px]
    md:h-fit 
    lg:max-w-md 
    lg:h-[700px]
    xl:h-[600px] 
    rounded-xl
    `,
    styledRadioBtn: `
    -translate-y-5
    shadow-md w-fit mx-auto px-4 rounded-xl shadow-gray-300
    `,
    styledNavBtn: `
    relative 
    justify-between 
    -top-[20em]`,
  };

  return (
    <>
      <section className=" overview__section  ">
        <CarouselProvider
          hideComponent="hideNavigation"
          customRadioBtn={styles.styledRadioBtn}
          className={styles.styledOverview}
        >
          <Overview onHidden={handleOnHidden} />
        </CarouselProvider>
        <div className={styles.styledRecSection}>
          <h1 className=" font-bold text-4xl  p-4 text-center lg:text-[2.6em]">Recommendation</h1>
          <CarouselProvider
            hideComponent={hidden ? "hideRadioButton" : "hidden"}
            customBtn={styles.styledNavBtn}
            
          >
            <Recommendation onHidden={handleOnHidden} />
          </CarouselProvider>
        </div>
      </section>
      <Hero />
      <section className=" bg-blue-50 max-md:max-w-xl mx-auto p-4 rounded-xl my-32 xl:my-20   ">
        <h1 className="  font-bold max-md:text-5xl max-md:text-center  text-6xl container mx-auto py-12">
          Featured Books{" "}
        </h1>
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
