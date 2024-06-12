// Navs & tabs: Navigation components used to organize content into tabs, allowing users to switch between different sections or views.
import React, { useState } from 'react';

const Navs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="border-b border-gray-200">
      <nav className="flex" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navs;


// import React from 'react';
// import Navs from './Navs';

// const App = () => {
//   const tabs = [
//     { id: 'tab1', label: 'Tab 1' },
//     { id: 'tab2', label: 'Tab 2' },
//     { id: 'tab3', label: 'Tab 3' },
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Navs Example</h1>
//       <Navs tabs={tabs} />
//       {/* Your tab content */}
//     </div>
//   );
// };

// export default App;

