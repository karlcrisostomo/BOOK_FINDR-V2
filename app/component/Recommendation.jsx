"use client";
import { useEffect, useState } from "react";
import { CarouselWrapper, useCarousel } from "../context/CarouselContext";
import { filteredDataHandler } from "../utils/filteredDataHandler";
import Loader from "./Loader";
import { BookData } from ".";
import { useFilteredData } from "../utils/useFilteredData";
import { Recommendations } from "../constants";

const RecItem = ({ item }) => {
  return (
    <CarouselWrapper width={`100%`}>
      <div className="">
        <div className=" p-3 lg:p-2">
        
        </div>
        <BookData
          item={item}
          index={item.id}
          customStyle={{

            styledTitle: "font-bold",
            styledImage: " xl:w-[200px] xl:h-[250px]",
          }}
        />
      </div>
    </CarouselWrapper>
  );
};

const Recommendation = () => {
  const { data, setData } = useCarousel();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const retrieveFromLocalStorage = async () => {
      try {
        await filteredDataHandler({
          setData,
          queries: Recommendations,
          setLoading,
        });
      } catch (error) {
        console.error(error);
      }
    };
    retrieveFromLocalStorage();
  }, [setData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {data.map((item, index) => (
        <RecItem item={item} key={index} />
      ))}
    </>
  );
};

export default Recommendation;
