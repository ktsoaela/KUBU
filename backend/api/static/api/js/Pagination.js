// Pagination: A user interface element used to navigate between multiple pages or sections of content, typically displayed as a series of numbered links or buttons.
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to handle clicking on previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Function to handle clicking on next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center justify-between">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`rounded-full border border-gray-300 bg-white px-3 py-1 ${
          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:border-gray-500'
        }`}
      >
        Previous
      </button>
      <div className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</div>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`rounded-full border border-gray-300 bg-white px-3 py-1 ${
          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:border-gray-500'
        }`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;

// import React, { useState } from 'react';
// import Pagination from './Pagination';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 10; // Example: Total number of pages

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Pagination Example</h1>
//       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//       {/* Your content for the current page */}
//     </div>
//   );
// };

// export default App;

