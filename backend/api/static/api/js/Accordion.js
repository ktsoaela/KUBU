// Accordion: A collapsible content panel that allows users to expand or collapse sections of content.
import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="border-b">
          <div
            className="flex justify-between items-center py-2 px-4 bg-gray-200 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <div>{item.title}</div>
            <div>
              {activeIndex === index ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transform rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
            </div>
          </div>
          {activeIndex === index && (
            <div className="px-4 py-2">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
