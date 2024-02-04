"use client";

import { useCallback, useEffect, useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import { redirect, useRouter } from "next/navigation";
import { requestHandler } from "./requestHandler";
import { BookContainer } from "../component";

const BookList = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { temp } = useCategoryContext();

  const router = useRouter();

   const redirectTo404 = () =>
    useCallback(() => {
      router.push("/404");
    }, []);

  // const LocalStorageName = "BookListData";
  const pageSize = 15; // Set the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const retrieveFromLocalStorage = async () => {
  //     try {
  //       const localData =
  //         JSON.parse(localStorage.getItem(LocalStorageName)) || [];

  //       Fetch data from the API
  //       const apiData = await requestHandler({
  //         setItems: setResponse,
  //         setLoading,
  //         temp,
  //         LocalStorageName,
  //       });

  //       const newItems = apiData.filter((apiItem) => {
  //         return !localData.some((localItem) => localItem.id === apiItem.id);
  //       });

  //       const updatedData = [...localData, ...newItems];

  //       setResponse(updatedData);
  //       localStorage.setItem(LocalStorageName, JSON.stringify(updatedData));
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   retrieveFromLocalStorage();
  // }, [setResponse, temp, PageSize, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        await requestHandler({ setItems: setResponse, setLoading, temp });
      } catch (error) {
        console.error(error);
        redirectTo404();
      }
    };

    fetchData();
  }, [setResponse, temp, pageSize, currentPage, setLoading]);

  return (
    <>
      {}
    
      <BookContainer
        items={response}
        setItems={setResponse}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default BookList;
