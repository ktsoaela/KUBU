// Dropdowns: Menus that appear when users click on a button or link, providing a list of selectable options
import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : 'Select'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md">
          <ul
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <li key={index}>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;


// import React from 'react';
// import Dropdown from './Dropdown';

// const App = () => {
//   const options = [
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' },
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Dropdown Example</h1>
//       <Dropdown options={options} />
//     </div>
//   );
// };

// export default App;
