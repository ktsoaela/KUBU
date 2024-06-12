// Offcanvas: A navigation or content panel that slides in from the side of the screen, typically used for additional options or navigation on smaller devices.
import React, { useState } from 'react';

const Offcanvas = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Offcanvas Panel</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          onClick={handleClose}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </>
  );
};

export default Offcanvas;


// import React, { useState } from 'react';
// import Offcanvas from './Offcanvas';

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpenOffcanvas = () => {
//     setIsOpen(true);
//   };

//   const handleCloseOffcanvas = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Offcanvas Example</h1>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleOpenOffcanvas}
//       >
//         Open Offcanvas
//       </button>
//       <Offcanvas isOpen={isOpen} onClose={handleCloseOffcanvas}>
//         <div className="p-6">
//           <h2 className="text-lg font-bold mb-4">Offcanvas Content</h2>
//           <p>This is the content of the offcanvas panel.</p>
//         </div>
//       </Offcanvas>
//     </div>
//   );
// };

// export default App;
