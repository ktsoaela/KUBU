// Carousel: A slideshow component that cycles through a series of content items, such as images or text, in a sequential or carousel-like manner.
import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

// export default Carousel;

// import React from 'react';
// import Carousel from './Carousel';

// const App = () => {
//   const images = [
//     'https://via.placeholder.com/800x400?text=Slide+1',
//     'https://via.placeholder.com/800x400?text=Slide+2',
//     'https://via.placeholder.com/800x400?text=Slide+3',
//   ];

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-semibold mb-4">Carousel Example</h1>
//       <Carousel images={images} />
//     </div>
//   );
// };

// export default App;

