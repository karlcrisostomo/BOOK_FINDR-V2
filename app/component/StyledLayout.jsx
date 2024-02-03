"use client";

import { useEffect, useState } from "react";
import { useNavContext } from "../context/NavigationContext";
import { ScrollBtnComponent } from ".";

const StyledLayout = ({ children }) => {
  const { menuRef, handleClickOutside, isMobile } = useNavContext();
  const [active, setActive] = useState("");

  const styles = {
    styledWall: "top-0 h-full bottom-0 w-full bg-black/10 blur-sm",
    styledBody: "overflow-hidden",
  };

  useEffect(() => {
    setActive(isMobile ? styles.styledWall : "");

    if (isMobile) {
      document.body.classList.add(styles.styledBody);
    } else {
      document.body.classList.remove(styles.styledBody);
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMobile]);

  return (
    <div ref={menuRef} onClick={handleClickOutside} className={active}>
      {children}

      {/* <ScrollBtnComponent/> */}
    </div>
  );
};

export default StyledLayout;
