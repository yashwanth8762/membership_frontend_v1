import React from 'react';
import Marquee from 'react-fast-marquee';
import { useSelector } from "react-redux";

const NewsScroller = () => {
  // Create an array of image sources for news1.jpeg to news9.jpeg in assets folder
  const newsImages = Array.from({ length: 9 }, (_, i) => `/assets/news${i + 1}.jpeg`);
  const user = useSelector((state) => state.user.value);
  const isEnglish = !!user.language;

  return (
    <section className="w-full py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        {isEnglish ? "Latest News" : "ನವೀನ ಸುದ್ದಿ"}
      </h2>
      <Marquee gradient={true} speed={40} pauseOnHover={true}>
        {newsImages.map((src, index) => (
          <div 
            key={index} 
            className="mx-4 w-[300px] h-[200px] rounded-lg shadow-lg overflow-hidden border border-gray-100 flex-shrink-0"
          >
            <img 
              src={src} 
              alt={isEnglish ? `News image ${index + 1}` : `ಸುದ್ದಿ ಚಿತ್ರ ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
              onClick={() => window.open(src, '_blank')}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default NewsScroller;
