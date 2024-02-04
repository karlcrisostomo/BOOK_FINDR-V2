"use client";
import classNames from "classnames";
import { categories } from "../constants";
import { useCategoryContext } from "../context/CategoryContext";
import { useNavContext } from "../context/NavigationContext";

const GenreComponent = () => {
  const { temp, setTemp } = useCategoryContext();
  const { isMobile } = useNavContext();
  
  const handleGenreClick = (genre) => {
    setTemp((prevTemp) => (prevTemp === genre ? null : genre));
  };
  const styles = {
    styledContainer: `grid 
    grid-cols-3 
    gap-2
    max-md:grid-cols-1 
    max-md:text-xl 
    max-md:text-center 
    bg-gray-200 
    max-sm:max-w-lg 
    max-sm:mt-4 
    mx-auto 
    p-4 
    rounded-lg`,
    styledLi: `cursor-pointer hover:font-bold transition-all `,
  };
  return (
    <ul className={styles.styledContainer}>
      {categories.map((category, idx) => (
        <li
          key={idx}
          className={classNames(styles.styledLi, {
            "font-bold": temp === category,
            "pointer-events-auto": isMobile,
          })}
          onClick={() => handleGenreClick(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default GenreComponent;
