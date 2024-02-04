"use client";

import { useState } from "react";
import BookData from "../component/BookData";
import { BookWrapper, Pagination, ScrollBtnComponent } from "../component";
import Loader from "../component/Loader";

const BookContainer = ({ items, setItems, loading }) => {
  const PageSize = 15; // Set the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentTableData = items.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      <BookWrapper>
        {currentTableData.map((item, idx) => (
          <div className="py-12" key={idx}>
            {loading ? (
              <Loader />
            ) : (
              <BookData
                item={item}
                index={idx}
                customStyle={{ content: " h-[9em]", styledTitle: "font-bold" }}
              />
            )}
          </div>
        ))}
      </BookWrapper>

      <Pagination
        className=" justify-end -mt-20 "
        key={currentPage}
        currentPage={currentPage}
        totalCount={items.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <ScrollBtnComponent />
    </>
  );
};

export default BookContainer;
