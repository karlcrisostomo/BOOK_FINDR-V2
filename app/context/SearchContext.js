"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavigationProvider, useNavContext } from "./NavigationContext";
const SearchContext = createContext();

export function useSearchContext() {
  return useContext(SearchContext);
}
export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { setMobile } = useNavContext();
  const router = useRouter();
  // const saveToLocalStorage = (key, data) => {
  //   localStorage.setItem(key, JSON.stringify(data));
  // };

  // const getFromLocalStorage = (key) => {
  //   const data = localStorage.getItem(key);
  //   return data ? JSON.parse(data) : null;
  // };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      router.push(`/book/${searchText}`);
      setMobile(false);
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
        setMobile(false);
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
    <SearchContext.Provider value={{ values }}>
      {children}
    </SearchContext.Provider>
  );
};
