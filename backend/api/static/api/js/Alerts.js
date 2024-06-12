// Alerts: Notification messages that provide feedback to the user about actions or status updates.
import React from 'react';

const Alert = ({ type, message }) => {
  let alertClass = '';

  switch (type) {
    case 'success':
      alertClass = 'bg-green-100 border-green-400 text-green-700';
      break;
    case 'info':
      alertClass = 'bg-blue-100 border-blue-400 text-blue-700';
      break;
    case 'warning':
      alertClass = 'bg-yellow-100 border-yellow-400 text-yellow-700';
      break;
    case 'error':
      alertClass = 'bg-red-100 border-red-400 text-red-700';
      break;
    default:
      alertClass = 'bg-gray-100 border-gray-400 text-gray-700';
  }

  return (
    <div className={`border rounded-md p-4 mb-4 ${alertClass}`} role="alert">
      <div className="flex">
        <div className="py-1">
          {type === 'success' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {type === 'info' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
            </svg>
          )}
          {type === 'warning' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v7m0 0v4m0-4h.01m-6 0h12a2 2 0 110 4H6a2 2 0 110-4zm10 8V16a4 4 0 01-4 4H10a4 4 0 01-4-4v-4"
              />
            </svg>
          )}
          {type === 'error' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600 mr-2"
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
          )}
        </div>
        <div>
          <p className="font-bold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
