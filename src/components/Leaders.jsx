import React, { useState } from 'react'

const Leaders = ({ isEnglish = false }) => {
  const leaders = [
    {
      id: 1,
      name: isEnglish ? "Dr|| K.H. Muniyappa" : "ಡಾ|| ಕೆ.ಹೆಚ್‌.ಮುನಿಯಪ್ಪ",
      position: isEnglish ? 'President' : 'ಅಧ್ಯಕ್ಷರು',
      image: "/assets/DrKHMuniyappa.jpg"
    },
    {
      id: 2,
      name: isEnglish ? "Sri. A. Narayanaswamy" : "ಶ್ರೀ. ಎ.ನಾರಾಯಣಸ್ವಾಮಿ",
      position: isEnglish ? 'Vice President' : 'ಉಪಾಧ್ಯಕ್ಷರು',
      image: "/assets/ShriANarayanaswamy.jpg"
    },
    {
      id: 3,
      name: isEnglish ? "Sri. K.M. Thimmarayappa" : "ಶ್ರೀ.ಕೆ.ಎಂ.ತಿಮ್ಮರಾಯಪ್ಪ",
      position: isEnglish ? 'Vice President' : 'ಉಪಾಧ್ಯಕ್ಷರು',
      image: "/assets/KMThimmarayappa.jpeg"
    },
    {
      id: 4,
      name: isEnglish ? "Dr. L. Hanumanthaiah" : "ಡಾ|| ಎಲ್. ಹನುಮಂತಯ್ಯ",
      position: isEnglish ? 'Principal Secretary' : 'ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ ',
      image: "/assets/DrLHanumantayya.jpg"
    },
    {
      id: 5,
      name: isEnglish ? "Sri. A. Muniyappa" : "ಎ.ಮುನಿಯಪ್ಪ",
      position: isEnglish ? 'Principal Secretary' : 'ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ',
      image: "/assets/AMuniyappageneralSecretary.jpeg"
    },
    {
      id: 6,
      name: isEnglish ? "Sri. Pillamuniswamyappa" : "ಶ್ರೀ ಪಿಳ್ಳಮುನಿಸ್ವಾಮಪ್ಪ",
      position: isEnglish ? 'Organizing Secretaries' : 'ರಾಜ್ಯ ಸಂಘಟನಾ ಕಾರ್ಯದರ್ಶಿಗಳು ',
      image: "/assets/Pillamunishamappa.webp"
    },
    {
      id: 7,
      name: isEnglish ? "Dr|| Sujatha" : "ಡಾ|| ಸುಜಾತ",
      position: isEnglish ? 'Treasurer' : 'ಖಜಾಂಚಿ',
      image: "/assets/DrllSujata.jpeg"
    },
    {
      id: 8,
      name: isEnglish ? "Sri. H. Anjaneya" : "ಶ್ರೀ. ಎಚ್‌. ಆಂಜನೇಯ",
      position: isEnglish ? 'Executive Committee Members' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು',
      image: "/assets/HAnjaneya.jpeg"
    },
    {
      id: 9,
      name: isEnglish ? "Sri.Govinda Karajol" : "ಗೋವಿಂದ ಕಾರಜೋಳ",
      position: isEnglish ? 'Executive Committee Members' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು',
      image: "/assets/GovindKarajol.jpeg"
    },
    
    // {
    //   id: 7,
    //   name: isEnglish ? "Shri Babu Jagajeevanram" : "ಶ್ರೀ ಬಾಬು ಜಗಜೀವನರಾಮ್",
    //   position: isEnglish ? 'Executive Member' : 'ಕಾರ್ಯಕಾರಿ ಸದಸ್ಯ',
    //   image: "/assets/babujagajeevanram.jpg"
    // },
    
    
    
  ];
  const [startIdx, setStartIdx] = useState(0);
  const cardsPerView = 3;
  const canGoLeft = startIdx > 0;
  const canGoRight = startIdx + cardsPerView < leaders.length;

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - cardsPerView, 0));
  };
  const handleNext = () => {
    setStartIdx((prev) => Math.min(prev + cardsPerView, leaders.length - cardsPerView));
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-12 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
        {isEnglish ? 'Founders and First Executive Committee Members' : 'ಸ್ಥಾಪಕರು ಮತ್ತು ಮೊದಲ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು'}
      </h2>
      {/* Custom Carousel Container */}
      <div className="py-6 flex items-center justify-center relative">
        <button
          onClick={handlePrev}
          disabled={!canGoLeft}
          className={`absolute left-0 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed`}
          aria-label="Previous"
        >
          {'<'}
        </button>
        <div className="flex justify-center gap-6 w-full">
          {leaders.slice(startIdx, startIdx + cardsPerView).map((leader) => (
            <div key={leader.id} className="mb-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl flex flex-col items-center p-8 w-80 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100">
              {/* Profile Image with enhanced styling */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-lg">
                  <img 
                    src={leader.image} 
                    alt={`Leader ${leader.id}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-sm"></div>
              </div>
              {/* Leader Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-800 leading-tight">{leader.name}</h3>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                  <span className="text-blue-700 font-semibold text-sm">{leader.position}</span>
                </div>
              </div>
              {/* Decorative element */}
              <div className="mt-4 w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className={`absolute right-0 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed`}
          aria-label="Next"
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Leaders
