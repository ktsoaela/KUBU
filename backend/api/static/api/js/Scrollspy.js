// Scrollspy: A JavaScript plugin that highlights navigation links based on the user's scroll position, indicating which section of the page is currently visible.
import React, { useState, useEffect } from 'react';

const Scrollspy = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <ul className="fixed top-0 right-0 flex flex-col space-y-2">
      {sections.map(section => (
        <li key={section.id} className={`cursor-pointer ${section.id === activeSection ? 'font-bold' : ''}`} onClick={() => document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' })}>
          {section.label}
        </li>
      ))}
    </ul>
  );
};

export default Scrollspy;

// import React from 'react';
// import Scrollspy from './Scrollspy';

// const App = () => {
//   const sections = [
//     { id: 'section1', label: 'Section 1' },
//     { id: 'section2', label: 'Section 2' },
//     { id: 'section3', label: 'Section 3' },
//     // Add more sections as needed
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Scrollspy Example</h1>
//       <div id="section1" className="h-screen bg-gray-100 mb-4">
//         Section 1 Content
//       </div>
//       <div id="section2" className="h-screen bg-gray-200 mb-4">
//         Section 2 Content
//       </div>
//       <div id="section3" className="h-screen bg-gray-300">
//         Section 3 Content
//       </div>
//       <Scrollspy sections={sections} />
//     </div>
//   );
// };

// export default App;

