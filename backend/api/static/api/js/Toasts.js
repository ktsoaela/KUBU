// Toasts: Non-intrusive notification messages that appear temporarily at the bottom or top of the screen, typically used to display updates or alerts.
import React, { useState } from 'react';

const Toast = ({ message, type }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={`fixed bottom-4 right-4 bg-${type}-500 text-white px-4 py-2 rounded shadow-md transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div>{message}</div>
      <button onClick={handleClose} className="ml-2 focus:outline-none">
        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M3.707 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 1 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 1 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;

// import React, { useState } from 'react';
// import Toast from './Toast';

// const App = () => {
//   const [showToast, setShowToast] = useState(false);

//   const handleShowToast = () => {
//     setShowToast(true);
//     // Hide toast after 3 seconds
//     setTimeout(() => {
//       setShowToast(false);
//     }, 3000);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Toast Example</h1>
//       <button onClick={handleShowToast} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//         Show Toast
//       </button>
//       {showToast && <Toast message="This is a toast message" type="success" />}
//     </div>
//   );
// };

// export default App;
