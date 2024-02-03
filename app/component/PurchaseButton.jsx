import classNames from "classnames";
import { dataLink } from "../constants";

const PurchaseButton = ({ id, customStyle }) => {
  const styledBtnComponent = {
    styledBtn: classNames(
      `bg-blue-600 rounded-lg 
      py-1 
      mt-4 
      w-[200px] 
      mx-auto
      transition-all 
      duration-300
      hover:shadow-lg 
      hover:-translate-y-2
      hover:shadow-black/25`,
      customStyle && customStyle.styledBtn
    ),

    styledH1: ` 
       text-center
       font-bold 
       text-white 
       text-lg 
    `,
  };

  return (
    <a
      href={dataLink(id)}
      target="_blank"
      rel="noopener noreferrer"
      key={id}
      className={styledBtnComponent.styledBtn}
    >
      <h1 className={styledBtnComponent.styledH1}>Buy Now</h1>
    </a>
  );
};

export default PurchaseButton;
