import React from "react";
import { Carousel } from "flowbite-react";

const HeroSection = () => {
  const images = [
    "/assets/herobg1.jpeg",
    "/assets/herobg2.jpeg",
    "/assets/herobg3.jpeg",
    "/assets/herobg4.jpeg"
  ];

  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[700px] flex items-center justify-center overflow-hidden">
      <Carousel
        slideInterval={2500}
        className="w-full h-full shadow-lg"
        indicators={true}
        leftControl=""
        rightControl=""
      >
        {images.map((src, idx) => (
          <div key={idx} className="relative w-full h-full">
            <img
              src={src}
              alt={`Hero background ${idx + 1}`}
              className="w-full h-full object-cover object-center"
              draggable="false"
            />
            {/* Optional overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Optional: Add a heading or call-to-action here */}
            {idx === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4">Welcome to Our Membership Portal</h1>
                <p className="text-lg sm:text-2xl text-white/90 mb-6">Join us and unlock exclusive benefits today!</p>
                <a href="#register" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Get Started</a>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;

