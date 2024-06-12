// Spinners: Animated icons or indicators used to indicate that content is loading or processing.
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Spinner;

// import React, { useState, useEffect } from 'react';
// import Spinner from './Spinner';

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       // Simulate data loading
//       setIsLoading(false);
//     }, 2000);
//   }, []);

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Spinner Example</h1>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <div>
//           {/* Your content when loading is finished */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
