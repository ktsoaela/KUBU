// Popovers: Small overlay containers that appear when users interact with specific elements, providing additional information or actions.
import React, { useState } from 'react';

const Popover = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <div onClick={handleTogglePopover}>{children}</div>
      {isOpen && (
        <div className="absolute z-10 -top-8 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md py-2 px-4">
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;


// import React from 'react';
// import Popover from './Popover';

// const App = () => {
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Popover Example</h1>
//       <Popover content={<div className="text-sm">Additional information or actions</div>}>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Hover Me
//         </button>
//       </Popover>
//     </div>
//   );
// };

// export default App;
