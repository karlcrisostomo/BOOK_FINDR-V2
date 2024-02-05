import React from "react";
import Image from "next/image";
import { errorImage } from "@/public/storyset";
const page = () => {
  const styledErrorComponent = {
    container: `
      container 
      mx-auto 
      py-32`,
    styledImage: `
      max-md:w-[400px] 
      lg:w-[600px] 
      mx-auto`,
  };

  return (
    <section className={styledErrorComponent.container}>
      <Image
        className={styledErrorComponent.styledImage}
        src={errorImage}
        alt="404 Page"
      />
    </section>
  );
};

export default page;
