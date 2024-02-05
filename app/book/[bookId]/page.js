"use client";

import { BookContainer } from "@/app/component";
import requestHandler from "../requestHandler";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const redirectTo404 = () =>
    useCallback(() => {
      router.push("/404");
    }, []);

  useEffect(() => {
    const responseFromServer = async () => {
      try {
        const fetchedData = await requestHandler({
          setResponse,
          query: params.bookId,
          setLoading,
        });
      } catch (error) {
        console.error(error);
        redirectTo404();
      } finally {
        setLoading(false);
      }
    };

    responseFromServer();
  }, [setResponse, setLoading]);

  return (
    <section className="container mx-auto">
      <BookContainer
        items={response}
        setItems={setResponse}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
};

export default Page;
