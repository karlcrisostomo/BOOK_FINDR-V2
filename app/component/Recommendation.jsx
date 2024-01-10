"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchBooks } from "../api/googleBooksFetcher";
import { CarouselWrapper, useCarousel } from "../context/CarouselContext";
import Loader from "./Loader";

const RecItem = ({ item, hidden }) => {
  return (
    <CarouselWrapper width={`100%`}>
      <div>
        <div className=" p-3 lg:p-2">
          <h1 className=" font-bold  text-2xl">Recommended For You</h1>
          <h1 className=" text-[1.5rem] font-medium  py-8">
            {item.volumeInfo.title}
          </h1>
        </div>
        <Image
          width={300}
          height={200}
          className=" aspect-square max-md:w-[250px]  max-sm:h-[320px] sm:h-[450px] lg:w-[200px] lg:h-[250px] rounded-lg mx-auto "
          src={`https://books.google.com/books/publisher/content/images/frontcover/${item.id}?fife=w256-h256`}
          alt={item.volumeInfo.title}
        />
        <div className="px-3 mt-2 w-fit mx-auto ">
          <h1>
            {" "}
            <span className=" font-medium">Author:</span>{" "}
            {item.volumeInfo.authors}{" "}
          </h1>
          <div className="flex flex-col ">
            {" "}
            <h1>
              <span className="font-medium">Published Date:</span>{" "}
              {item.volumeInfo.publishedDate}
            </h1>
            <h1>
              {" "}
              <span className="font-medium">Category:</span>{" "}
              {item.volumeInfo.categories}
            </h1>
          </div>
        </div>
      </div>
    </CarouselWrapper>
  );
};

const Recommendation = ({ onHidden }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = process.env.RECOMMENDATION.split(",");

  const { data, setData } = useCarousel();

  useEffect(() => {
    const flag = loading ? "hidden " : null;
    onHidden(flag);
  }, []);

  useEffect(() => {
    const getCacheData = () => {
      const cachedData = JSON.parse(localStorage.getItem("cachedBooks"));

      if (cachedData) {
        setFeaturedBooks(cachedData);
        setLoading(false);
        setData(cachedData);
      } else {
        fetchData();
      }
    };

    const fetchData = async () => {
      try {
        const fetchedBooks = await Promise.all(
          categories.map((category) => fetchBooks(category))
        );

        const firstItems = fetchedBooks.map((booksArray) =>
          booksArray.length > 0 ? booksArray[0] : null
        );

        // Filter out null values (in case a category had no books)
        const nonNullItems = firstItems.filter((item) => item !== null);

        const slicedItems = nonNullItems.slice(0, 5);
        if (slicedItems.length > 0) {
          setFeaturedBooks(slicedItems);
          setData(slicedItems);
          localStorage.setItem("cachedBooks", JSON.stringify(slicedItems));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCacheData();
  }, [setData]);

  // useEffect(() => {
  //   setData(featuredBooks);

  //   console.log("data:", data);
  // }, [setData]);

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
