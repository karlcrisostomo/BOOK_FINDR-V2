"use client";

import { useState, useContext, createContext, useRef } from "react";

const NavigationContext = createContext();

export const useNavContext = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const [isMobile, setMobile] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (e.target !== menuRef.current) {
      setMobile(false);
    }
  };
  const toggleMenu = () => [setMobile((e) => !e)];

  return (
    <NavigationContext.Provider
      value={{ isMobile, setMobile, toggleMenu, handleClickOutside, menuRef }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
