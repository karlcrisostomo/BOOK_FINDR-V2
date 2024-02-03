"use client";
import React, { useContext, useState, createContext } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@/public/assets";
const CarouselContext = createContext();

export const useCarousel = () => {
  return useContext(CarouselContext);
};

const RadioButton = ({
  updateIndex,
  activeIndex,
  partitions,
  customRadioBtn,
}) => {
  return (
    <div className={`radio__btn__container ${customRadioBtn}`}>
      {Array.from({ length: partitions }).map((_, index) => (
        <button
          key={index}
          onClick={() => updateIndex(index)}
          title={`Radio button ${index + 1}`}
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

const Navigation = ({ updateIndex, activeIndex, customBtn }) => {
  const navStyles = {
    active: `
    bg-black/25 rounded-full
    `,
    default: `
    hover:shadow-md 
    transition-all 
    duration-30 
    hover:shadow-gray-300 
    rounded-md  
    
    `,
  };

  return (
    <div className={`carousel__btn ${customBtn}`}>
      <button
        className={`${
          activeIndex === 4 ? navStyles.active : navStyles.default
        }`}
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      >
        <span>
          <Image src={ArrowLeft} alt="arrow left" width={35} />
        </span>
      </button>
      <button
        className={`${activeIndex ? navStyles.default : navStyles.active}`}
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      >
        <span>
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
        <div className="carousel__container">
          <div className="carousel__content">{children}</div>
        </div>
      </div>
    </>
  );
};

export const CarouselProvider = ({
  children,
  hideComponent,
  className,
  customBtn,
  customRadioBtn,
  itemsPerSlide = 1, // Default to 1 item per slide
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);

  const updateIndex = (newIndex) => {
    const totalPartitions = Math.ceil(data.length / itemsPerSlide);

    if (newIndex < 0) {
      newIndex = totalPartitions - 1;
    } else if (newIndex >= totalPartitions) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const partitionData = (items, partitionSize) => {
    const partitionedData = [];
    for (let i = 0; i < items.length; i += partitionSize) {
      partitionedData.push(items.slice(i, i + partitionSize));
    }
    return partitionedData;
  };

  const groupedData = partitionData(data, itemsPerSlide);

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
                partitions={groupedData.length}
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
