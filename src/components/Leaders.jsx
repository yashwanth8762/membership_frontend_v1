import React, { useState } from 'react'

const Leaders = ({ isEnglish = false }) => {
  const leaders = [
    {
      id: 1,
      name: isEnglish ? "Dr. K.H. Muniyappa" : "ಡಾ. ಕೆ.ಹೆಚ್.‌ ಮುನಿಯಪ್ಪ",
      position: isEnglish ? 'President' : 'ಅಧ್ಯಕ್ಷರು',
      image: "/assets/DrKHMuniyappa.jpg"
    },
    {
      id: 2,
      name: isEnglish ? "Sri. A. Narayanaswamy" : "ಶ್ರೀ.ಎ.ನಾರಾಯಣಸ್ವಾಮಿ",
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
      name: isEnglish ? "Dr. L. Hanumantayya" : "ಡಾ.ಎಲ್. ಹನುಮಂತಯ್ಯ",
      position: isEnglish ? 'General Secretary' : 'ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ',
      image: "/assets/DrLHanumantayya.jpg"
    },
    {
      id: 5,
      name: isEnglish ? "Sri.A. Muniyappa" : "ಶ್ರೀ.ಎ.ಮುನಿಯಪ್ಪ",
      position: isEnglish ? 'General Secretary' : 'ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ',
      image: "/assets/AMuniyappageneralSecretary.jpeg"
    },
    {
      id: 6,
      name: isEnglish ? "Sri. Pilla Munishyamappa" : "ಶ್ರೀ. ಪಿಳ್ಳ ಮುನಿಶ್ಯಾಮಪ್ಪ ",
      position: isEnglish ? 'Organizing Secretary' : 'ರಾಜ್ಯ ಸಂಘಟನಾ ಕಾರ್ಯದರ್ಶಿ',
      image: "/assets/Pillamunishamappa.webp"
    },
    {
      id: 7,
      name: isEnglish ? "Dr. Sujatha" : "ಡಾ. ಸುಜಾತ",
      position: isEnglish ? 'Treasurer' : 'ಖಜಾಂಚಿ',
      image: "/assets/DrllSujata.jpeg"
    },
    {
      id: 8,
      name: isEnglish ? "Sri. H. Anjaneya" : "ಶ್ರೀ. ಹೆಚ್. ಆಂಜನೇಯ",
      position: isEnglish ? 'Executive Committee Member' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯ',
      image: "/assets/HAnjaneya.jpeg"
    },
    {
      id: 9,
      name: isEnglish ? "Sri. Govinda M. Karajola" : "ಶ್ರೀ. ಗೋವಿಂದ ಎಂ.ಕಾರಜೋಳ",
      position: isEnglish ? 'Executive Committee Member' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯ',
      image: "/assets/GovindKarajol.jpeg"
    },
  ];

  const [startIdx, setStartIdx] = useState(0);
  
  // Responsive cards per view
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 1 : 3;
    }
    return 3;
  };
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  React.useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
      setStartIdx(0); // Reset to first card on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="py-6 flex items-center justify-center relative">
        <button
          onClick={handlePrev}
          disabled={!canGoLeft}
          className="absolute left-0 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          {'<'}
        </button>
        <div className="flex justify-center gap-6 w-full">
          {leaders.slice(startIdx, startIdx + cardsPerView).map((leader) => (
            <div
              key={leader.id}
              className="
                mb-6 bg-white rounded-xl shadow-lg hover:shadow-2xl
                flex flex-col md:flex-row items-center
                p-4 sm:p-6 w-full max-w-md md:max-w-[28rem]
                transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100"
            >
              {/* Responsive and borderless image on left */}
              <div className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36">
                <img
                  src={leader.image}
                  alt={`Leader ${leader.id}`}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Leader Info on right */}
              <div className="mt-4 md:mt-0 md:ml-8 flex flex-col justify-center items-center md:items-start text-center md:text-left w-full">
                <h3 className="text-lg font-bold text-gray-800 mb-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {leader.name}
                </h3>
                <div className="inline-flex items-center px-3 py-1 rounded bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-2">
                  <span className="text-blue-700 font-semibold text-sm">{leader.position}</span>
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60 mt-1"></div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className="absolute right-0 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition hover:bg-blue-100 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Leaders;