// Navbar: A navigation bar typically placed at the top of a webpage or application, containing links or controls for navigating the site.
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* Your logo or site title */}
            <Link to="/" className="text-white font-bold text-xl">My Website</Link>
          </div>
          <div className="hidden md:block">
            {/* Navbar links */}
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/services" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</Link>
              <Link to="/contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import React from 'react';
// import Navbar from './Navbar';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       {/* Your main content */}
//     </div>
//   );
// };

// export default App;
