import { fetchBooks } from "../api/googleBooksFetcher";

export const filteredDataHandler = async ({ queries, setLoading, setData }) => {
  try {
    // Generate a dynamic storage name based on the queries
    const dynamicStorageName = `cachedBooks_${queries.join("_")}`;

    // Try to retrieve data from sessionStorage
    const existingData = JSON.parse(sessionStorage.getItem(dynamicStorageName)) || [];

    if (existingData.length === 0) {
      // If data is not in sessionStorage, fetch it
      const fetchedBooks = await Promise.all(
        queries.map((query) => fetchBooks(query))
      );

      // Fetch books for each category and append to existing data
      const firstItems = fetchedBooks.map((booksArray) =>
        booksArray.length > 0 ? booksArray[0] : null
      );

      // Filter out null items from the new items
      const nonNullItems = firstItems.filter((item) => item !== null);

      const slicedItems = nonNullItems.slice(0, 10);

      if (slicedItems.length > 0) {
        // Set the sliced items in sessionStorage with the dynamic storage name
        sessionStorage.setItem(dynamicStorageName, JSON.stringify(slicedItems));
        setData(slicedItems);
      }
    } else {
      // Use data from sessionStorage
      setData(existingData);
    }
  } catch (error) {
    console.error(error);
    // Handle the error or throw it again if needed
  } finally {
    setLoading(false);
  }
};
