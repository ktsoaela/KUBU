// Buttons: Interactive elements that users can click to trigger actions or navigate to different parts of a website or application.
import React from "react";

const Button = ({ onClick, children, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-2 bg-${color}-500 text-white rounded-md hover:bg-${color}-600 focus:outline-none focus:bg-${color}-600`}
    >
      {children}
    </button>
  );
};

export default Button;

// import React from 'react';
// import Button from './Button';

// const App = () => {
//   const handleClick = () => {
//     alert('Button clicked!');
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Button Example</h1>
//       <Button onClick={handleClick} color="blue">
//         Click Me
//       </Button>
//     </div>
//   );
// };

// export default App;
