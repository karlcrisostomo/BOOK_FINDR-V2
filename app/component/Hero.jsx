import { featureItems } from "../constants";
import Image from "next/image";
const FeatureComponent = () => {
  const styledFeatureSec = {
    featureContainer: `
      max-lg:flex-col 
      flex 
      flex-row 
      lg:gap-10  
      lg:py-20
      p-2
    `,
    inner: ` 
      max-lg:flex-col 
      flex 
      pt-4   
    `,
    iconWrapper: `
      bg-purple-100 
      w-fit 
      h-fit  
      lg:my-[1.6rem] 
      p-2 
      rounded-xl 
      flex 
      mx-auto
    `,
    imgSize: `
      max-lg:w-[3em] 
      lg:w-[8em] 
    `,
    textWrapper: `
      max-lg:max-w-xs 
      mx-auto 
      p-3 
      lg:p-3
    `,
    styledTitle: `
      mb-2  
      lg:text-base 
      font-bold 
      text-[1.5rem] 
      tracking-wider 
      text-center 
      lg:h-[2em] 
      lg:tracking-tight 
      lg:text-left  
    `,
    styledDescription: `
      text-base  
      lg:text-sm 
      lg:p-0  
      text-justify  
      p-4  
      tracking-tighter
    `,
  };

  return (
    <div className={styledFeatureSec.featureContainer}>
      {featureItems.map((item, idx) => (
        <div key={idx} className={styledFeatureSec.inner}>
          <span className={styledFeatureSec.iconWrapper}>
            <Image
              className={styledFeatureSec.imgSize}
              alt={item.alt}
              src={item.icon}
            />
          </span>
          <span className={styledFeatureSec.textWrapper}>
            <h1 className={styledFeatureSec.styledTitle}>{item.title}</h1>
            <p className={styledFeatureSec.styledDescription}>
              {item.description}
            </p>
          </span>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <div>
      <FeatureComponent />
    </div>
  );
};

export default Hero;
