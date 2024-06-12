// Card: A flexible container used to display various types of content, typically consisting of images, text, and links.
import React from 'react';

const Card = ({ title, imageUrl, url }) => {
  const generatePattern = () => {
    // Add logic to determine the pattern based on the title
    // For simplicity, we'll just use the same pattern for all cards
    return "bg-gray-800";
  };

  return (
    <div className="w-1/5 rounded overflow-hidden shadow-lg mx-2 my-2">
      <div className="relative max-w-xl mx-auto">
       <img
            className="h-64 w-full object-cover rounded-md filter grayscale"
            src="https://images.unsplash.com/photo-1680725779155-456faadefa26"
            alt="Random image"
          />
        <div className={`absolute inset-0 ${generatePattern()} opacity-60 rounded-md`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <a href={url} className="text-white text-3xl font-bold">
            {title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
