// Progress: Visual indicators that show the completion status of a task or process.
import React from 'react';

const Progress = ({ value, max }) => {
  const percentage = Math.floor((value / max) * 100);

  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className="bg-blue-500 rounded-full text-xs leading-none py-1 text-center text-white"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default Progress;

// import React from 'react';
// import Progress from './Progress';

// const App = () => {
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Progress Example</h1>
//       <div className="w-64 mb-4">
//         <Progress value={50} max={100} />
//       </div>
//       <div className="w-64">
//         <Progress value={75} max={100} />
//       </div>
//     </div>
//   );
// };

// export default App;
