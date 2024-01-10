"use client";

import React, { useState } from "react";
import {
  Picture1,
  Picture2,
  Picture3,
  ArrowLeft,
  ArrowRight,
} from "@/public/assets";

import Image from "next/image";
import { carouselItems } from "../constants";
const CarouselItem = ({ item, width, height }) => {
  return (
    // <div className="carousel__item " style={{ width: width }}>
    //   <div></div>
    //   <div className=" text-red-700">{item.title}</div>
    //   <Image className="carousel__img " src={item.icon} alt={item.title} />
    // </div>

    <div className="carousel__item" style={{ width: width }}>
      <div className="carousel__container">
        <div className=" text-4xl font-medium">{item.header} </div>
        <p className="whitespace-normal tracking-wider py-5">{item.text} </p>
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
    </div>
  );
};

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { id: 1, title: "picture 1", icon: Picture1 },
    { id: 2, title: "picture 2", icon: Picture2 },
    { id: 3, title: "picture 3", icon: Picture3 },
  ];

  // const updateIndex = (newIndex) => {
  //   if (newIndex < 0) {
  //     newIndex = 0;
  //   } else if (newIndex >= items.length) {
  //     newIndex = items.length - 1;
  //   }

  //   setActiveIndex(newIndex);
  // };

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      // If the index is less than 0, set it to the last index (circular navigation)
      newIndex = carouselItems.length - 1;
    } else if (newIndex >= carouselItems.length) {
      // If the index is greater than or equal to the total number of items, set it to 0 (circular navigation)
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="carousel__inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {carouselItem.map((item) => (
          <CarouselItem item={item} key={item.id} width={"100%"} />
        ))}
      </div>

      <div className="radio__btn__container">
        {carouselItem.map((_, index) => (
          <button
            key={index}
            onClick={() => updateIndex(index)}
            title="radio button"
          >
            <span
              className={`styled__radioBtn ${
                index === activeIndex
                  ? "indicator__symbol__active"
                  : "indicator__symbol"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="carousel__btn">
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <span>
            <Image src={ArrowLeft} alt="arrow left" />
          </span>
        </button>
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <span>
            <Image src={ArrowRight} alt="arrow right" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
