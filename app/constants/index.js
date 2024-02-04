import { refresh, database, clock, SearchIcon } from "@/public/assets";

export const navLinks = [
  { href: "/", id: 1, text: "Home" },
  { href: "/books", id: 2, text: "Books" },
];

// export const bookId = "pages/books/[query].js";

export const API_KEY = "AIzaSyCE3HlBtJcvPkaENuSOnRLmFJSqXk2rSpQ";

export const defQuery = "Greatest book of all time";

export const dataLink = (id) => {
  const link = `https://books.google.com.ph/books?id=${id}&source=gbs_navlinks_s`;
  return link;
};

export const CoverPage = (id) => {
  const BookCoverPage = `https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w256-h256`;
  return BookCoverPage;
};

export const carouselItems = [
  {
    id: 1,
    header: "Extensive Database",
    text: "Access a vast collection of books from Google's extensive database, including titles, authors, genres, and more.",
    imagePath: "../../svgs/storyset__reading1.svg",
  },
  {
    id: 2,
    header: "Accurate Information",
    text: "Benefit from accurate and up-to-date book information provided by Google's robust book catalog.",
    imagePath: "../../svgs/storyset__reading2.svg",
  },
  {
    id: 3,
    header: "User-Friendly Search",
    text: "Enjoy a user-friendly search experience, allowing you to find the perfect book with ease.",
    imagePath: "../../svgs/storyset__reading3.svg",
  },
];

export const featureItems = [
  {
    id: 1,
    title: "Dynamic Catalog Access",
    description:
      "Users enjoy access to a dynamic and diverse book catalog, providing a rich selection of titles to explore.",

    icon: refresh,
    alt: "Dynamic Catalog Access ",
  },
  {
    id: 2,
    title: "Up-to-the-Minute Information",
    description:
      "Ensuring users have access to the most recent data, the API offers up-to-the-minute updates on book availability, authors, and more.",

    icon: clock,
    alt: "Up-to-the-Minute Information ",
  },
  {
    id: 3,
    title: "Seamless Search Experience",
    description:
      "The API's powerful search capabilities guarantee a seamless and efficient user experience, allowing quick and accurate book searches.",

    icon: SearchIcon,
    alt: "Seamless Search Experience ",
  },
  {
    id: 4,
    title: "Reliable Metadata Integrity",
    description:
      "Users can trust the reliability and accuracy of book details, such as summaries and author information, as the API maintains consistent metadata integrity.",

    icon: database,
    alt: "Reliable Metadata Integrity ",
  },
];

export const categories = [
  "Fiction",
  "Novel",
  "Mystery",
  "Narrative",
  "Science Fiction",
  "Historical Fiction",
  "Thriller",
  "Romance Novel",
  "Horror",
  "Fantasy",
  "Contemporary Literature",
  "Fairy Tale",
  "Drama",
  "Spirituality",
  "Action Fiction",
  "Poetry",
  "Memoir",
  "Graphic Novel",
  "History",
  "Self-help Book",
  "Western Fiction",
  "Autobiography",
  "Social Science",
  "Paranormal Romance",
  "Science Fantasy",
  "Young Adult Fiction",
  "New Adult Fiction",
];

export const Recommendations = [
  "Atomic Habits",
  "Thinking Fast and Slow",
  "Rules for Life",
  "The 48 laws of Power",
  "The Art of War",
  "The Psychology of Money",
];

export const featured = [
  "The Greate Gatsby",
  "War and Peace",
  "Lolita ",
  "The Adventures of Huckleberry Finn",
  "Don Quixote",
  "Great Expectations",
];
