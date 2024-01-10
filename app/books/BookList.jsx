
// "use client";

// import { useEffect, useState } from "react";
// import { fetchBooks } from "../api/googleBooksFetcher";

// import { categories } from "../constants";

// const BookList = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedBooks = await Promise.all(
//           categories.map(async (category) => {
//             const booksForCategory = await fetchBooks(category);
//             return booksForCategory;
//           })
//         );

       
//         const allBooks = [].concat(...fetchedBooks);

//         setItems(allBooks);
   
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [setItems]);

//   return (
//     <div>
    
//       {items.map((book, idx) => (
//         <div key={idx}>
//           <h1>{book.volumeInfo.title}</h1>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookList;
