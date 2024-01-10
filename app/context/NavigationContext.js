"use client";

import { useState, useContext, createContext } from "react";

const NavigationContext = createContext();

export const useNavContext = () => {
  return useContext(NavigationContext);
};
export const NavigationProvider = ({ children }) => {
  const [isMobile, setMobile] = useState(false);

  const toggleMenu = () => [setMobile((e) => !e)];

  return (
    <NavigationContext.Provider
      value={{ isMobile, setMobile, toggleMenu,  }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
