"use client";

import { useEffect, useState } from "react";
import { useSearchContext } from "@/app/context/SearchContext";
import { motion } from "framer-motion";
import { useNavContext } from "../../context/NavigationContext";
import "./searchbar.css"
import classNames from "classnames";

const styledSearchBarComponent = {
  searchContainer: `
    bg-gray-200  
    h-12 
    p-2   
    rounded-md 
    flex 
    items-center 
    gap-2`,
};

const SearchComponent = () => {
  const { values } = useSearchContext();

  return (
    <button
      title="search Icon"
      className=" cursor-pointer "
      onClick={values.handleSearch}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C3 7.68333 3.62933 6.146 4.888 4.888C6.14667 3.63 7.684 3.00067 9.5 3C11.3167 3 12.8543 3.62933 14.113 4.888C15.3717 6.14667 16.0007 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C14 8.25 13.5627 7.18767 12.688 6.313C11.8133 5.43833 10.7507 5.00067 9.5 5C8.25 5 7.18767 5.43767 6.313 6.313C5.43833 7.18833 5.00067 8.25067 5 9.5C5 10.75 5.43767 11.8127 6.313 12.688C7.18833 13.5633 8.25067 14.0007 9.5 14Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

const RemoveComponent = () => {
  const { values } = useSearchContext();

  return (
    <>
      {values.searchText && (
        <motion.button
          className="styled_remove"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, delay: 0.2, transition: 0.5 }}
          onClick={values.handleRemove}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 23L23 9M23 23L9 9"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </>
  );
};

const SearchBar = () => {
  const { values } = useSearchContext();
  const [size, setSize] = useState(true);
  const { isMobile } = useNavContext();
  const variants = {
    initial: {
      width: "15%",
    },
    start: {
      opacity: 1,
      width: "100%",
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 600) {
        setSize(false);
      } else {
        setSize(true);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [size]);

  return (
    <section>
      <motion.div
        variants={variants}
        initial="initial"
        animate="start"
        className={classNames( styledSearchBarComponent.searchContainer, { active: isMobile })}
      >
        {/* <FilterComponent /> */}
        <SearchComponent />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <input
            id="searchInput"
            className={classNames("search__box", { active: isMobile })}
            type="text"
            placeholder="Search books here..."
            value={values.searchText}
            onChange={values.handleChange}
          />
        </motion.div>
        <RemoveComponent />
      </motion.div>
    </section>
  );
};

export default SearchBar;
