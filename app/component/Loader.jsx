import React from "react";

const Loader = ({ size, hideExtension }) => {
  const loaderSize = {
    width: size || "15em",
    height: size || "15em",
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
