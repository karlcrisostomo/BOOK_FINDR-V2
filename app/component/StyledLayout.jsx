"use client"

import { useEffect, useState } from "react";
import { useNavContext } from "../context/NavigationContext";

const StyledLayout = ({ children }) => {
  const { isMobile } = useNavContext();

  const [active, setActive] = useState("");
  useEffect(() => {
    setActive(isMobile ? " blur-sm fixed" : "");
  }, [isMobile]);

  return <div className={active}>{children}</div>;
};

export default StyledLayout;
