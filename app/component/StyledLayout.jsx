"use client";

import { useEffect, useState } from "react";
import { useNavContext } from "../context/NavigationContext";

const styles = {
  styledWall: `
    backdrop-blur-sm 
    bg-black/10 
    z-[40] 
    absolute 
    w-full 
    top-0 
    left-0 
    right-0 
    bottom-0`,
  styledBody: `overflow-hidden`,
};

const BackgroundWall = () => {
  return (
    <section>
      <div className={styles.styledWall} />
    </section>
  );
};

const StyledLayout = ({ children }) => {
  const { menuRef, handleClickOutside, isMobile } = useNavContext();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isMobile);

    if (isMobile) {
      document.body.classList.add(styles.styledBody);
    } else {
      document.body.classList.remove(styles.styledBody);
    }

    return () => {
      document.body.classList.remove(styles.styledBody);
    };
  }, [isMobile]);

  return (
    <div ref={menuRef} onClick={handleClickOutside}>
      {active && <BackgroundWall />}
      {children}
    </div>
  );
};

export default StyledLayout;
