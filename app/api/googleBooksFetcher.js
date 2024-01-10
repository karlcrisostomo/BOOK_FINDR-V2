import axios from "axios";

export const fetchBooks = async (query) => {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}`;

    //headers
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
