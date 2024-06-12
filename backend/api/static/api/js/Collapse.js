// Collapse: A component that allows users to hide or show content sections by collapsing or expanding them.
import React, { useState } from 'react';

const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-md mb-4">
      <div
        className="flex justify-between items-center px-4 py-2 cursor-pointer bg-gray-200"
        onClick={toggleCollapse}
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
          />
        </svg>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapse;


// import React from 'react';
// import Collapse from './Collapse';

// const App = () => {
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Collapse Example</h1>
//       <Collapse title="Section 1">
//         <p>This is the content of section 1.</p>
//       </Collapse>
//       <Collapse title="Section 2">
//         <p>This is the content of section 2.</p>
//       </Collapse>
//       <Collapse title="Section 3">
//         <p>This is the content of section 3.</p>
//       </Collapse>
//     </div>
//   );
// };

// export default App;
