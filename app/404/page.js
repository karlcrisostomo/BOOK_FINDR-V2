import React from "react";
import Image from "next/image";
import { errorImage } from "@/public/storyset";
const page = () => {
  return (
    <section className=" container mx-auto py-32">
      <Image
        className=" max-md:w-[400px] lg:w-[600px] mx-auto"
        src={errorImage}
        alt="404 Page"
      />
    </section>
  );
};

export default page;
