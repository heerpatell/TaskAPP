import React from "react";
import { useSelector } from "react-redux";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const totalPosts = useSelector((state) => state.posts.totalPosts);
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="d-flex justify-content-between mt-2">
      <button
        className="btn btn-outline-primary"
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="align-self-center">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;