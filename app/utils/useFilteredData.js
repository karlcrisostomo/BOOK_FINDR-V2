// "use client";
// import { useState, useEffect } from "react";
// import { useCarousel } from "../context/CarouselContext";
// import { filteredDataHandler } from "./filteredDataHandler";

// export const useFilteredData = ({ categories, onHidden }) => {
//   const [loading, setLoading] = useState(true);
//   const { data, setData } = useCarousel();

//   // const SessionStorageName = "cachedBooks";

//   const handleHidden = (flag) => {
//     if (onHidden) {
//       onHidden(flag);
//     }
//   };

//   useEffect(() => {
//     const flag = loading ? "hidden " : null;
//     handleHidden(flag);

//     const fetchedData = async () => {
//       try {
//         await filteredDataHandler({ categories, setLoading, data, setData });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchedData();
//   }, [setData, categories, loading]);

//   return {
//     loading,
//   };
// };
