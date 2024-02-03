"use client";

import { BookContainer } from "@/app/component";
import requestHandler from "../requestHandler";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const responseFromServer = async () => {
      try {
        setLoading(true);
        const fetchedData = await requestHandler({
          setResponse,
          query: params.bookId,
          setLoading,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    responseFromServer();
  }, []);

  return (
    <section className="container mx-auto">
      <BookContainer
        items={response}
        setItems={setResponse}
        loading={loading}
      />
    </section>
  );
};

export default Page;
