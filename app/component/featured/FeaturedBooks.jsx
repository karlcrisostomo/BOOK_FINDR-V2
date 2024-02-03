"use client";

import { featured } from "@/app/constants";
import { CarouselWrapper, useCarousel } from "@/app/context/CarouselContext";
import { BookData } from "..";
import Loader from "../Loader";
import { useEffect, useState } from "react";

import { filteredDataHandler } from "@/app/utils/filteredDataHandler";

const FeaturedItems = ({ item }) => {
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    const updatedFlag = () => {
      setFlag(window.innerWidth <= 768);
    };

    updatedFlag();
    window.addEventListener("resize", updatedFlag);

    return () => {
      window.removeEventListener("resize", updatedFlag);
    };
  }, [setFlag]);

  return (
    <CarouselWrapper width={flag ? "100%" : "33.33%"}>
      <div className="  whitespace-normal">
        <BookData
          item={item}
          index={item.id}
          customStyle={{
            container:
              " p-6 leading-tight hover:scale-105 transition-all duration-300 cursor-pointer",
            styledTitle: "font-bold  whitespace-normal ",
            detailsContainer: "p-4 h-[250px] ",
            styledImage: " shadow-xl",
          }}
        />
      </div>
    </CarouselWrapper>
  );
};

const FeaturedBooks = () => {
  const { data, setData } = useCarousel();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const retrieveFromLocalStorage = async () => {
      try {
        await filteredDataHandler({
          setData,
          queries: featured,
          setLoading,
        });
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    retrieveFromLocalStorage();
  }, [setData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="">
      {data.map((item, index) => (
        <FeaturedItems item={item} key={index} />
      ))}
    </section>
  );
};

export default FeaturedBooks;
