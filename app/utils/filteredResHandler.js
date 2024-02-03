// "use client"

// import { fetchBooks } from "../api/googleBooksFetcher";
// import { useState, useEffect } from "react";
// import { useCarousel } from "../context/CarouselContext";

// export const useFilteredData = ({ categories, onHidden }) => {
//   const [featuredBooks, setFeaturedBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { data, setData } = useCarousel();

//   const SessionStorageName = "cachedBooks";

//   const handleHidden = (flag) => {
//     if (onHidden) {
//       onHidden(flag);
//     }
//   };

//   useEffect(() => {
//     const flag = loading ? "hidden " : null;
//     handleHidden(flag);

//     const getCacheData = () => {
//       const cachedData = JSON.parse(sessionStorage.getItem(SessionStorageName));

//       if (cachedData) {
//         setFeaturedBooks(cachedData);
//         setLoading(false);
//         setData(cachedData);
//       } else {
//         fetchData();
//       }
//     };

//     const fetchData = async () => {
//       try {
//         const fetchedBooks = await Promise.all(
//           categories.map((category) => fetchBooks(category))
//         );

//         const firstItems = fetchedBooks.map((booksArray) =>
//           booksArray.length > 0 ? booksArray[0] : null
//         );

//         // Filter out null values (in case a category had no books)
//         const nonNullItems = firstItems.filter((item) => item !== null);

//         const slicedItems = nonNullItems.slice(0, 10);
//         if (slicedItems.length > 0) {
//           setFeaturedBooks(slicedItems);
//           setData(slicedItems);
//           sessionStorage.setItem(
//             SessionStorageName,
//             JSON.stringify(slicedItems)
//           );
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getCacheData();
//   }, [setData]);

//   return {
//     featuredBooks,
//     data,
//     loading,
//   };
// };
