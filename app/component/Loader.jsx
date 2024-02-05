import React from "react";

const Loader = ({  width , height, hideExtension }) => {
  const loaderSize = {
    width: width || "15em",
    height: height || "15em",
  };

  return (
    <section>
      <div className={`loader`} style={loaderSize} />
      <div className={` text__container ${hideExtension}`}>
        <span className="text__top " />
        <span className="text__bot " />
      </div>
    </section>
  );
};

export default Loader;
