// Breadcrumb: A navigation aid that shows the user's current location within a hierarchical structure of content.
import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="bg-gray-100 rounded-md flex divide-x divide-gray-200">
        {items.map((item, index) => (
          <li key={index} className="px-4 py-2">
            <a
              href={item.url}
              className={`text-gray-500 hover:text-gray-700 ${
                index === items.length - 1 ? 'font-semibold' : ''
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

// import React from 'react';
// import Breadcrumb from './Breadcrumb';

// const App = () => {
//   const items = [
//     { label: 'Home', url: '/' },
//     { label: 'Products', url: '/products' },
//     { label: 'Shoes', url: '/products/shoes' },
//     { label: 'Running Shoes' }
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Breadcrumb Example</h1>
//       <Breadcrumb items={items} />
//     </div>
//   );
// };

// export default App;
