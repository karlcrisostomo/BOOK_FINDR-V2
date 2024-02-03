"use client";

import { useEffect, useState } from "react";
import { carouselItems } from "../constants";
import Image from "next/image";
import { CarouselWrapper, useCarousel } from "../context/CarouselContext";
import Loader from "./Loader";

const styledComponent = {
  container: `
  max-xl:flex-col 
  gap-2
  flex 
  items-center`,
  contentItems: `
  p-4 
  text-2xl 
  md:text-4xl 
  font-bold `,
  styledParagraph: `
  whitespace-normal 
  px-4 
  py-5 
  text-justify 
  tracking-tight
  max-md:max-w-[400px]
  max-md:text-lg
  text-xl 
  xl:text-base
  2xl:text-lg
  md:max-w-sm 
  lg:max-w-md 
  xl:max-w-lg 
  xl:text-[1.2rem]`,
  styledImage: `
  xl: w-[400px]
  -translate-y-[2em]
  `,
};

const CarouselItem = ({ item }) => {
  return (
    // <div className="carousel__item " style={{ width: width }}>
    //   <div></div>
    //   <div className=" text-red-700">{item.title}</div>
    //   <Image className="carousel__img " src={item.icon} alt={item.title} />
    // </div>

    <CarouselWrapper width={"100%"}>
      <div className={styledComponent.container}>
        <div className=" xl:max-w-xs 2xl:max-w-md  ">
          <h1 className={styledComponent.contentItems}>{item.header} </h1>
          <p className={styledComponent.styledParagraph}>{item.text} </p>
        </div>
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
      </div>
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
        <Loader size="50em" hideExtension="hidden" />
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
