"use client"

import { useContext, createContext, useState } from "react";

const CategoryContext = createContext();

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [temp, setTemp] = useState(null);

  return (
    <CategoryContext.Provider value={{ temp, setTemp }}>
      {children}
    </CategoryContext.Provider>
  );
};
