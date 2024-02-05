"use client";

import { useEffect, useState } from "react";
import { carouselItems, learnMore } from "../constants";
import Image from "next/image";
import { CarouselWrapper, useCarousel } from "../context/CarouselContext";
import Loader from "./Loader";

const styledComponent = {
  container: `
    grid
    xl:grid-cols-2
    lg:h-[600px]
    xl:h-[550px]
    content-center
    gap-10
    max-xl:gap-2
   `,
  inner: `
    flex-col 
    flex xl:h-[300px] 
    my-auto
   `,
  contentItems: `
    py-6
    text-center
    text-[1.8em]
    xl:text-[2.5rem]
    2xl:text-[2.8rem]
    font-bold `,
  detailsContainer: `
    max-w-xs 
    px-4 
    xl:max-w-md 
    xl:h-[300px] 
    mx-auto`,
  paragraphContainer: `
    max-md:max-w-xs 
    xl:max-w-sm
    `,
  styledParagraph: `
    whitespace-normal 
    p-2
    text-justify 
    tracking-tight
    text-sm
    xl:text-base
    2xl:text-lg
    xl:max-w-lg 
    xl:text-[1.2rem]
    max-xl:h-[80px]
    h-[120px]
  `,
  styledImage: `
    w-[350px]
    xl:w-[400px]
    max-xl-translate-y-[2em]
  `,
};

const LearnMoreComponent = () => {
  const styledBtnComponent = {
    styledBtn: `
      py-1 
      mt-4  
      flex
      justify-center
      xl:justify-start
      xl:px-6
   `,
    wrapper: ` 
      flex
      bg-blue-600 rounded-lg 
      w-[200px]
      p-2
      text-center
      font-bold 
      text-white 
      max-xl:text-base
      text-lg 
      items-center
      gap-2
      justify-center
      cursor-pointer
      transition-all 
      duration-300
      group
      hover:shadow-lg 
      hover:-translate-y-2
      hover:shadow-black/25
  `,
    arrowContainer: `
      flex 
      items-center 
      group-hover:translate-x-3 
      transition-all 
      duration-300`,

    styledArrow: `
      before:w-8  
      flex 
      items-center
      before:translate-x-[0.1em]  
      before:h-0.5  
      before:block 
      before:bg-white  
      after:-translate-x-2   
      after:border-t-2  
      after:border-r-2  
      after:border-solid 
      after:border-white  
      after:rotate-45 
      after:w-[10px] 
      after:h-[10px] 
      after:block
      `,
  };

  return (
    <a
      href={learnMore}
      target="_blank"
      rel="noopener noreferrer"
      className={styledBtnComponent.styledBtn}
    >
      <div className={styledBtnComponent.wrapper}>
        Learn More{" "}
        <div className={styledBtnComponent.arrowContainer}>
          <span className={styledBtnComponent.styledArrow} />
        </div>
      </div>
    </a>
  );
};

const CarouselItem = ({ item }) => {
  return (
    // <div className="carousel__item " style={{ width: width }}>
    //   <div></div>
    //   <div className=" text-red-700">{item.title}</div>
    //   <Image className="carousel__img " src={item.icon} alt={item.title} />
    // </div>

    <CarouselWrapper width={"100%"}>
      <section className={styledComponent.container}>
        <section className={styledComponent.inner}>
          <div className={styledComponent.detailsContainer}>
            <h1 className={styledComponent.contentItems}>{item.header} </h1>
            <div className={styledComponent.paragraphContainer}>
              <p className={styledComponent.styledParagraph}>{item.text} </p>
            </div>
          </div>
          <LearnMoreComponent />
        </section>
        <Image
          priority={true}
          loading="eager"
          key={item.id}
          width={500}
          height={300}
          sizes="(max-width: 400px)"
          className={styledComponent.styledImage}
          src={item.imagePath}
          alt={item.text}
        />
      </section>
    </CarouselWrapper>
  );
};

const Overview = ({ onHidden }) => {
  const { setData, data } = useCarousel();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const flag = loading ? "hidden " : null;
    onHidden(flag);

    const fetchData = async () => {
      try {
        setData(carouselItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData]);

  return (
    <>
      {loading ? (
        <Loader width="1024px" height="600px" hideExtension="hidden" />
      ) : (
        <div className=" ">
          {data.map((item, index) => (
            <CarouselItem item={item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default Overview;
