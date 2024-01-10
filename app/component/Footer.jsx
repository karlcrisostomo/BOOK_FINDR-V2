"use client"

import { useNavContext } from "../context/NavigationContext";

const Footer = () => {
  const { isMobile } = useNavContext();

  return <div className={isMobile ? "hidden" : ""}>Footer</div>;
};

export default Footer;
