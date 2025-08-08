// import React from "react";
// import { Carousel } from "flowbite-react";
// import { useSelector } from "react-redux";

// const HeroSection = () => {
//   const images = [
//     "/assets/slider4.jpeg",
//     "/assets/slider2.jpeg",
//     "/assets/slider1.jpeg",
//     "/assets/mainslider.jpeg",
//     "/assets/hill.jpeg"
//   ];
//   const user = useSelector((state) => state.user.value);
//   const isEnglish = !!user.language;

//   return (
//     <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[700px] flex items-center justify-center overflow-hidden">
//       <Carousel
//         slideInterval={2500}
//         className="w-full h-full shadow-lg"
//         indicators={true}
//         leftControl=""
//         rightControl=""
//       >
//         {images.map((src, idx) => (
//           <div key={idx} className="relative w-full h-full">
//             <img
//               src={src}
//               alt={`Hero background ${idx + 1}`}
//               className="w-full h-full object-cover object-center"
//               draggable="false"
//             />
//             {/* Optional overlay for better text contrast */}
//             <div className="absolute inset-0 bg-black/30" />
//             {/* Overlayed Text */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
//               {isEnglish ? (
//                 <>
//                   <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 drop-shadow-2xl mb-6 tracking-tight leading-tight" style={{textShadow: '0 4px 24px rgba(0,0,0,0.7)'}}>
//                     Karnataka Madara Mahasabha
//                   </h1>
//                   <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-xl mb-2" style={{textShadow: '0 2px 12px rgba(0,0,0,0.6)'}}>
//                     "Empowerment of Madara community"*
//                   </p>
//                 </>
//               ) : (
//                 <>
//                   <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 drop-shadow-2xl mb-6 tracking-tight leading-tight" style={{textShadow: '0 4px 24px rgba(0,0,0,0.7)'}}>
//                     ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾ
//                   </h1>
//                   <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-xl mb-2" style={{textShadow: '0 2px 12px rgba(0,0,0,0.6)'}}>
//                     "ಮಾದರ ಜನಾಂಗದ ಸಬಲೀಕರಣ "*
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </section>
//   );
// };

// export default HeroSection;

import React from "react";
import { Carousel } from "flowbite-react";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const images = [
    "/assets/slider4.jpeg",
    "/assets/slider2.jpeg",
    "/assets/slider1.jpeg",
    "/assets/mainslider.jpeg",
    "/assets/hill.jpeg",
    "/assets/avanibetta1.jpg",
    "/assets/avanibetta2.jpg",
  ];
  const user = useSelector((state) => state.user.value);
  const isEnglish = !!user.language;

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
            {/* Overlayed Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
              {isEnglish ? (
                <>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 drop-shadow-2xl mb-6 tracking-tight leading-tight" style={{textShadow: '0 4px 24px rgba(0,0,0,0.7)'}}>
                    Karnataka Madara Mahasabha
                  </h1>
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-xl mb-2" style={{textShadow: '0 2px 12px rgba(0,0,0,0.6)'}}>
                    "Empowerment of Madara community"*
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 drop-shadow-2xl mb-6 tracking-tight leading-tight" style={{textShadow: '0 4px 24px rgba(0,0,0,0.7)'}}>
                    ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾ
                  </h1>
                  <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-xl mb-2" style={{textShadow: '0 2px 12px rgba(0,0,0,0.6)'}}>
                    "ಮಾದರ ಜನಾಂಗದ ಸಬಲೀಕರಣ "*
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSection;

