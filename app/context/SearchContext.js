"use client";

import { fetchBooks } from "@/app/api/googleBooksFetcher";
import { useContext, createContext, useCallback, useState, useEffect } from "react";

const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}
export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };


  const handleChange = (e) => {
    setSearchText(e.target.value);
   
  };

  const handleSearch = async () => {
    if (searchText.trim() !== "") {
      try {
     
        // setSearching(true); // Start searching
        let response = await getFromLocalStorage(searchText); // Await the result
        if (!response) {
          response = await  fetchBooks(searchText);

          if (response) {
            saveToLocalStorage(searchText, response);
          }
        }
        setSearchResult(response || []);
        // setLoading(false);
      } catch (err) {
        console.error(err);
        // setLoading(false);
      } 
      
      // finally {
      //   // setLoading(false);
      //   setSearching(false); // Done searching, reset the flag
      // }
    }
  };


  const handleRemove = () => {
    setSearchText("");
  };

  useEffect(() => {
    // Check if "Enter" key was pressed
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    // Attach the key press event listener
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchText]);


  const values = {
    searchText,
    searchResult,
    handleChange,
    handleSearch,
    handleRemove,
  };
  return (
    <SearchContext.Provider value={{values}}>{children}</SearchContext.Provider>
  );
};
