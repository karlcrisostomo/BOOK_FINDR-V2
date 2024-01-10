"use client";

import React, { useEffect, useState } from "react";
import { carouselItems } from "../constants";
import Image from "next/image";

import { CarouselWrapper, useCarousel } from "../context/CarouselContext";
import Loader from "./Loader";
import { useScroll } from "framer-motion";
import { resolve } from "styled-jsx/css";

const CarouselItem = ({ item }) => {
  return (
    // <div className="carousel__item " style={{ width: width }}>
    //   <div></div>
    //   <div className=" text-red-700">{item.title}</div>
    //   <Image className="carousel__img " src={item.icon} alt={item.title} />
    // </div>

    <CarouselWrapper width={"100%"}>
      <div className=" max-xl:flex-col flex items-center">
        <div className=" p-3">
          <div className=" text-2xl md:text-4xl font-medium  ">
            {item.header}{" "}
          </div>
          <p className="whitespace-normal  py-5 text-justify tracking-tight  md:max-w-sm lg:max-w-md xl:max-w-lg xl:text-[1.2rem]">
            {item.text}{" "}
          </p>
        </div>
        <Image
          priority={true}
          loading="eager"
          key={item.id}
          width={500}
          height={300}
          sizes="(max-width: 400px)"
          className="carousel__img"
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
