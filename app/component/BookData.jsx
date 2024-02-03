import { PurchaseButton } from ".";
import Image from "next/image";
import classNames from "classnames";
import { CoverPage } from "../constants";

const BookData = ({ item, index, customStyle }) => {
  const authors = item.volumeInfo.authors || [" Unknown Author "];

  const maxLetter = 50;

  const displayAuthors = () => {
    if (authors.length > 2) {
      return <span>{authors.slice(0, 2).join(", ")}...</span>;
    } else {
      return <span>{authors.join(", ")}</span>;
    }
  };

  const styles = {
    container: classNames(
      "max-w-xs",
      "mx-auto",
      customStyle && customStyle.container
    ),
    styledTitle: classNames(customStyle && customStyle.styledTitle),
    styledImage: classNames(
      "aspect-square",
      "max-md:w-[250px]",
      "max-md:h-[300px]",
      "sm:w-[200px]",
      "sm:h-[250px]",
      "mb-5",
      "lg:w-[200px]",
      "lg:h-[250px]",
      "xl:w-[260px]",
      "xl:h-[320px]",
      "rounded-lg",
      "mx-auto",
      customStyle && customStyle.styledImage
    ),
    detailsContainer: classNames(
      "px-3",
      "mt-2",
      "w-fit",
      "mx-auto",
      "max-sm:text-lg",
      "flex ",
      "flex-col",
      "gap-2",

      customStyle && customStyle.detailsContainer
    ),
    styledH1: classNames(
      "max-sm:max-w-xs",
      customStyle && customStyle.styledH1
    ),
    content: classNames(
      "h-[80px]",
      "whitespace-normal ",
      "max-w-[250px]",
      customStyle && customStyle.content
    ),
  };

  return (
    <div key={index}>
      <div className={styles.container}>
        <Image
          width={300}
          height={200}
          className={styles.styledImage}
          src={CoverPage(item.id)}
          alt={item.volumeInfo.title}
        />

        <div className={styles.detailsContainer}>
          <div className={styles.content}>
            <h1 className={styles.styledTitle}>
              {item.volumeInfo.title
                ? `${item.volumeInfo.title.substring(0, maxLetter)}...`
                : "Undefined Title"}
            </h1>
            <h1 className={styles.styledH1}>
              <span className={styles.styledSpan}>Author:</span>
              {displayAuthors()}
            </h1>
            <h1>
              <span className={styles.styledSpan}>Published Date:</span>
              {`${item.volumeInfo.publishedDate}`}
            </h1>
          </div>
          <PurchaseButton id={item.id} />
        </div>
      </div>
    </div>
  );
};

export default BookData;
