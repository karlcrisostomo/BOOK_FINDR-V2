import { StyledLayout } from "../component";
import { CategoryProvider } from "../context/CategoryContext";
import BookList from "./BookList";
import GenreComponent from "./GenreComponent";

const Books = () => {
  return (
    <section className="container mx-auto">
      <StyledLayout>
        <CategoryProvider>
        <GenreComponent />
        <BookList />
        </CategoryProvider>
      </StyledLayout>
    </section>
  );
};

export default Books;
