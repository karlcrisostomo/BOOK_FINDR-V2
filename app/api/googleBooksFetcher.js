import axios from "axios";

export const fetchBooks = async (query, startIndex = 0, maxResults = 40) => {
  try {
    // const res = await axios.get(
    //   `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    //     query
    //   )}&key=${API_KEY}&startIndex=${startIndex}&maxResults=${maxResults}`
    // );
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&startIndex=${startIndex}&maxResults=${maxResults}`;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.API_KEY,
      },
    });

    // Check if the response is successful and contains data
    if (res.status === 200 && res.data.items) {
      return res.data.items || [];
    } else {
      console.error(
        "Error fetching data from  Google Books API:",
        res.statusText
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching data from Google Books API:", error);
    return [];
  }
};
