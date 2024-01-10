"use client";

import { Hero, StyledLayout, Overview, Recommendation } from "@/app/component";
import { useNavContext } from "./context/NavigationContext";
import { useEffect, useState } from "react";
import { CarouselProvider } from "./context/CarouselContext";
import Loader from "./component/Loader";


const Home = () => {
  const [hidden, setHidden] = useState("");

  const handleOnHidden = (flag) => {
    setHidden(flag);
  };
  const styles = {
    styledOverview: `
    ${hidden ? "shadow-md" : ""}
    backdrop-blur-sm 
    ${hidden ? "bg-purple-50" : ""}
    shadow-black/30 
    max-sm:max-w-xs  
    sm:max-w-md 
    lg:max-w-lg 
    lg:h-[740px]
    xl:h-[600px] 
    xl:max-w-2xl 
    2xl:max-w-5xl 
    rounded-xl
    `,
    styledRecSection: `
    ${hidden ? "shadow-md" : ""}
    ${hidden ? "bg-gray-100" : ""}
    shadow-black/30 
    max-sm:max-w-xs  
    sm:max-w-sm  
    md:max-w-md
    md:h-fit 
    lg:max-w-md 
    lg:h-[740px]
    xl:h-[600px] 
    rounded-xl
    `,
    styledRadioBtn: `
    lg:-translate-y-5
    
    `,
    styledNavBtn: `
    relative 
    justify-between 
    -top-[15em]`,
  };

  return (
    <StyledLayout>
      <section className=" overview__section  ">
        <CarouselProvider
          hideComponent="hideNavigation"
          customRadioBtn={styles.styledRadioBtn}
          className={styles.styledOverview}
        >
          <Overview onHidden={handleOnHidden} />
        </CarouselProvider>
        <CarouselProvider
          hideComponent={hidden ? "hideRadioButton" : "hidden"}
          customBtn={styles.styledNavBtn}
          className={styles.styledRecSection}
        >
          <Recommendation onHidden={handleOnHidden} />
        </CarouselProvider>
      </section>

      <Hero />

    </StyledLayout>
  );
};

export default Home;
