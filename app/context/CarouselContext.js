"use client";
import React, { useContext, useState, createContext } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@/public/assets";
const CarouselContext = createContext();

export const useCarousel = () => {
  return useContext(CarouselContext);
};

const RadioButton = ({ updateIndex, activeIndex, data, customRadioBtn }) => {
  return (
    <div className={`radio__btn__container ${customRadioBtn}`}>
      {data.map((_, index) => (
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
  );
};

const Navigation = ({
  updateIndex,
  activeIndex,
  customBtn,
}) => {
  return (
    <div className={`carousel__btn ${customBtn}`}>
      <button
        className={`${activeIndex === 4 ? " bg-black/25 rounded-full " : "  "}`}
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
        <span>
          {/* Assuming ArrowLeft is the name of your left arrow image */}
          <Image src={ArrowLeft} alt="arrow left" width={35} />
        </span>
      </button>
      <button
        className={`${activeIndex ? " " : "bg-black/25 rounded-full"}`}
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <span>
          {/* Assuming ArrowRight is the name of your right arrow image */}
          <Image src={ArrowRight} alt="arrow right" width={35} />
        </span>
      </button>
    </div>
  );
};

export const CarouselWrapper = ({ children, width }) => {
  return (
    <>
      <div className="carousel__item" style={{ width: width }}>
        <div className="carousel__container">{children}</div>
      </div>
    </>
  );
};
export const CarouselProvider = ({
  children,
  hideComponent,
  className,
  customBtn,
  customRadioBtn
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  const updateIndex = (newIndex) => {
    // Assuming carouselItem is an array of items you want to navigate through
    if (newIndex < 0) {
      newIndex = data.length - 1;
    } else if (newIndex >= data.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <CarouselContext.Provider
      value={{
        activeIndex,
        updateIndex,
        Navigation,
        CarouselWrapper,
        RadioButton,
        setData,
        data,
      }}
    >
      <div className={`carousel  ${className}`}>
        <div
          className="carousel__inner"
          style={{ transform: `translate(-${activeIndex * 100}%)` }}
        >
          {children}
        </div>

        {hideComponent !== "hidden" && (
          <>
            {hideComponent !== "hideRadioButton" && (
              <RadioButton
                updateIndex={updateIndex}
                activeIndex={activeIndex}
                data={data}
                customRadioBtn={customRadioBtn}
              />
            )}

            {hideComponent !== "hideNavigation" && (
              <Navigation
                activeIndex={activeIndex}
                updateIndex={updateIndex}
                customBtn={customBtn}
              />
            )}
          </>
        )}
      </div>
    </CarouselContext.Provider>
  );
};
