// Modal: A dialog window that appears on top of the main content to provide additional information or options, typically requiring user interaction to dismiss.
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FormModal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SideModal = ({
  isOpen,
  onClose,
  children,
  title,
  edit,
  deleteItem,
  selectedItem,
}) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          {/* Modal */}
          <div className="fixed inset-y-0 right-0 flex max-w-screen-md w-full bg-white shadow-xl">
            <div className="relative flex flex-col w-full">
              {/* Modal Header */}
              <div className="modal-header flex justify-between items-center p-6 bg-gray-100">
                <h className="text-2xl font-semibold">{title}</h>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal Body */}
              <div className="modal-body p-6">{children}</div>
              {/* Modal Footer */}
              <div className="modal-footer p-6 bg-gray-100 mt-auto">
                <button
                  className="m-2 bg-orange-600 hover:bg-orange-900 text-white font-bold py-1 px-2 rounded"
                  onClick={edit}
                >
                  Edit
                </button>
                <button
                  className="m-2 bg-red-600 hover:bg-red-900 text-white font-bold py-1 px-2 rounded"
                  onClick={deleteItem}
                >
                  Delete
                </button>
                <button
                  className="m-2 bg-slate-600 hover:bg-slate-900 text-white font-bold py-1 px-2 rounded"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FormSideModal = ({
  isOpen,
  onClose,
  children,
  title,
  button,
  onSubmit,
}) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          {/* Modal */}
          <div className="fixed inset-y-0 right-0 flex max-w-screen-md w-full bg-white shadow-xl">
            <div className="relative flex flex-col w-full">
              {/* Modal Header */}
              <div className="modal-header flex justify-between items-center p-6 bg-gray-100">
                <h className="text-2xl font-semibold">{title}</h>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal Body */}
              <div className="modal-body p-6">{children}</div>
              {/* Modal Footer */}
              <div className="modal-footer p-6 bg-gray-100 mt-auto">
                <button
                  className="m-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                  onClick={onSubmit}
                >
                  {button}
                </button>
                <button
                  className="m-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal, FormModal, SideModal, FormSideModal };

// import React, { useState } from 'react';
// import Modal from './Modal';

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpenModal = () => {
//     setIsOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Modal Example</h1>
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={handleOpenModal}
//       >
//         Open Modal
//       </button>
//       <Modal isOpen={isOpen} onClose={handleCloseModal}>
//         <div className="p-6">
//           <h2 className="text-lg font-bold mb-4">Modal Title</h2>
//           <p>This is the content of the modal.</p>
//           <button
//             className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             onClick={handleCloseModal}
//           >
//             Close
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default App;

// const App = () => {
//   const [isSideModalOpen, setIsSideModalOpen] = useState(false);

//   const handleOpenSideModal = () => {
//     setIsSideModalOpen(true);
//   };

//   const handleCloseSideModal = () => {
//     setIsSideModalOpen(false);
//   };

//   return (
//     <div>
//       {/* Your main content */}

//       {/* Button to open the side modal */}
//       <button onClick={handleOpenSideModal}>Open Side Modal</button>

//       {/* Side modal component */}
//       <SideModal isOpen={isSideModalOpen} onClose={handleCloseSideModal}>
//         {/* Content inside the side modal */}
//         <h2>Side Modal Content</h2>
//         <p>This is the content inside the side modal.</p>
//       </SideModal>
//     </div>
//   );
// };

// export default App;
