// Close button: A button used to close or dismiss a component, such as a modal or an alert.

import React from 'react';

const CloseButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseButton;

// import React from 'react';
// import CloseButton from './CloseButton';

// const App = () => {
//   const handleClose = () => {
//     console.log('Close button clicked!');
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Close Button Example</h1>
//       <CloseButton onClick={handleClose} />
//     </div>
//   );
// };

// export default App;
