// Tabs: Navigation components used to organize content into tabs, allowing users to switch between different sections or views.
import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 mr-4 rounded ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div>
        {tabs.map((tab) => (
          <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

// import React from 'react';
// import Tabs from './Tabs';

// const App = () => {
//   const tabs = [
//     { id: 'tab1', label: 'Tab 1', content: <div>Tab 1 Content</div> },
//     { id: 'tab2', label: 'Tab 2', content: <div>Tab 2 Content</div> },
//     { id: 'tab3', label: 'Tab 3', content: <div>Tab 3 Content</div> },
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Tabs Example</h1>
//       <Tabs tabs={tabs} />
//     </div>
//   );
// };

// export default App;

