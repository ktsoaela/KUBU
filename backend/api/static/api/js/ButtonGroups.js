// Button group: A collection of buttons grouped together for better organization and visual presentation.
import React from 'react';

const ButtonGroup = ({ buttons }) => {
  return (
    <div className="flex space-x-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;


// import React from 'react';
// import ButtonGroup from './ButtonGroup';

// const App = () => {
//   const buttons = [
//     { label: 'Button 1', onClick: () => console.log('Button 1 clicked') },
//     { label: 'Button 2', onClick: () => console.log('Button 2 clicked') },
//     { label: 'Button 3', onClick: () => console.log('Button 3 clicked') }
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Button Group Example</h1>
//       <ButtonGroup buttons={buttons} />
//     </div>
//   );
// };

// export default App;
