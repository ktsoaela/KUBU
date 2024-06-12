// Badge: A small indicator typically used to display a numeric value or status information.
import React from 'react';

const Badge = ({ value, color }) => {
  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold leading-none rounded-full ${
        color === 'blue'
          ? 'bg-blue-500 text-white'
          : color === 'green'
          ? 'bg-green-500 text-white'
          : color === 'yellow'
          ? 'bg-yellow-500 text-white'
          : color === 'red'
          ? 'bg-red-500 text-white'
          : 'bg-gray-500 text-white'
      }`}
    >
      {value}
    </span>
  );
};

export default Badge;


// import React from 'react';
// import Badge from './Badge';

// const App = () => {
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Badge Example</h1>
//       <div className="flex space-x-4">
//         <Badge value={5} color="blue" />
//         <Badge value={10} color="green" />
//         <Badge value={3} color="yellow" />
//         <Badge value={8} color="red" />
//         <Badge value={15} />
//       </div>
//     </div>
//   );
// };

// export default App;
