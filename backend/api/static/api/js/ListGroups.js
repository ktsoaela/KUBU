// List group: A flexible component for displaying a list of items, often used to present content in a structured format.
import React from 'react';

const ListGroup = ({ items }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <li key={index} className="py-4">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;


// import React from 'react';
// import ListGroup from './ListGroup';

// const App = () => {
//   const items = [
//     'Item 1',
//     'Item 2',
//     'Item 3',
//     'Item 4',
//     'Item 5',
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">List Group Example</h1>
//       <ListGroup items={items} />
//     </div>
//   );
// };

// export default App;
