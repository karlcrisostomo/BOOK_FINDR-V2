import React from "react";

const BookWrapper = ({ children }) => {
  const styledWrapper = {
    wrapper: `sm:grid-cols-2 grid xl:grid-cols-3  py-32`,
  };

  return <section className={styledWrapper.wrapper}>{children}</section>;
};

export default BookWrapper;
