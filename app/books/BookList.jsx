"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCategoryContext } from "../context/CategoryContext";
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
  }, [setResponse, temp, setLoading]);

  return (
    <>
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
