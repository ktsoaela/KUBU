// Tooltips: Small, floating boxes that appear when users hover over an element, providing additional information or context about that element.
import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div className="absolute z-10 px-2 py-1 text-sm bg-gray-800 text-white rounded shadow-md">
          {text}
          <div className="absolute left-0 w-2 h-2 bg-gray-800 transform rotate-45 -top-1"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

// import React from 'react';
// import Tooltip from './Tooltip';

// const App = () => {
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Tooltip Example</h1>
//       <Tooltip text="This is a tooltip">
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Hover Me
//         </button>
//       </Tooltip>
//     </div>
//   );
// };

// export default App;
