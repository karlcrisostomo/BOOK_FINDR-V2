import { fetchBooks } from "../api/googleBooksFetcher";
import { defQuery } from "../constants";
export const requestHandler = async ({
  setItems,
  setLoading,
  temp,
  LocalStorageName,
}) => {
  let fetchedBooks;
  try {
    // const fetchedBooks = await Promise.all(
    //   categories.map(async (category) => {
    //     const booksForCategory = await fetchBooks(category);
    //     return booksForCategory;
    //   })
    // );
    setLoading(true);
    const query = temp ? temp : defQuery;
    fetchedBooks = await fetchBooks(query);

    // const allBooks = [].concat(...fetchedBooks);

    // localStorage.setItem(LocalStorageName, JSON.stringify(fetchedBooks));

    setItems(fetchedBooks);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
  return fetchedBooks;
};
