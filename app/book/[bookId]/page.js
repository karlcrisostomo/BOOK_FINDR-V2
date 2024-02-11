import { BookContainer } from "@/app/component";
import { fetchBooks } from "@/app/api/googleBooksFetcher";

const Page = async ({ params }) => {
  const data = await requestHandler(params.bookId);

  return (
    <section className="container mx-auto">
      <BookContainer items={data} />
    </section>
  );
};

export const requestHandler = async (query) => {
  const dataResponse = await fetchBooks(query);

  return dataResponse;
};

export default Page;
