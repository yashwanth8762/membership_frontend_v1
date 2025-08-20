import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";
import { HistoryCultureContent } from "../utils/constents";

const CommunityPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  React.useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);
  const isEnglish = !!user.language;
  const toggleLanguage = () => {
    dispatch(setLanguage(!user.language));
  };

  return (
    <>
      {/* <Header theme="solid" /> */}
      <section>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[80vh]">

          {/* Back Button */}
          <button
            className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 self-start flex items-center gap-3 cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
            {isEnglish ? 'Back' : 'ಹಿಂದೆ'}
          </button>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2 mb-8 self-end">
            <span className={`text-sm font-medium ${!isEnglish ? 'text-gray-900' : 'text-gray-500'}`}>ಕನ್ನಡ</span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: isEnglish ? '#3b82f6' : '#6b7280' }}
            >
              <span className="sr-only">Toggle language</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnglish ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm font-medium ${isEnglish ? 'text-gray-900' : 'text-gray-500'}`}>English</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-bold text-center mb-8">
            {isEnglish ? HistoryCultureContent.title_en : HistoryCultureContent.title_kn}
          </h1>

          {/* Content Titles and Descriptions */}
          <div className="w-full max-w-3xl mx-auto mb-10">
            {HistoryCultureContent.content.title.map((item, idx) => (
              <div key={idx} className="mb-8">
                {/* First header split into two lines if contains /n */}
                {(() => {
                  const titleText = isEnglish ? item.en : item.kn;
                  if (idx === 0 && titleText.includes('/n')) {
                    const lines = titleText.split('/n');
                    return (
                      <>
                        <h2 className="text-2xl font-semibold mb-2 text-blue-700">
                          {lines[0]}
                        </h2>
                        <h2 className="text-2xl font-semibold mb-2 text-blue-700">
                          {lines[1]}
                        </h2>
                      </>
                    );
                  }
                  return (
                    <h2 className="text-2xl font-semibold mb-2 text-blue-700">
                      {titleText}
                    </h2>
                  );
                })()}
                {/* Description: first item as two paragraphs, others as one */}
                {/* {(() => {
                  const desc = isEnglish
                    ? HistoryCultureContent.content.description[idx].en
                    : HistoryCultureContent.content.description[idx].kn;
                  if (idx === 0 && Array.isArray(desc)) {
                    return desc.map((para, i) => (
                      <p key={i} className="text-lg leading-relaxed text-gray-700 text-justify mb-4">
                        {para}
                      </p>
                    ));
                  }
                  return (
                    <p className="text-lg leading-relaxed text-gray-700 text-justify">
                      {desc}
                    </p>
                  );
                })()} */}
                {(() => {
  const desc = isEnglish
    ? HistoryCultureContent.content.description[idx].en
    : HistoryCultureContent.content.description[idx].kn;

  if (Array.isArray(desc)) {
    return desc.map((para, i) => (
      <p key={i} className="text-lg leading-relaxed text-gray-700 text-justify mb-4">
        {para}
      </p>
    ));
  }
  return (
    <p className="text-lg leading-relaxed text-gray-700 text-justify">
      {desc}
    </p>
  );
})()}

              </div>
            ))}
          </div>

          {/* Photographs of prominent community leaders / personalities / saints */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish
                ? 'Philosophers who fought for the welfare of the community'
                : 'ಸಮುದಾಯದ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಹೋರಾಡಿದ ದಾರ್ಶನಿಕರು'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/Gautamabuddha.webp" alt="Leader 6" className="w-30 h-30 object-contain mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Gouthama Buddha" : " ಗೌತಮ ಬುದ್ದ"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/Basavanna.jpg" alt="Leader 9" className="w-30 h-30 object-contain mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Vishwaguru Basavanna" : "ವಿಶ್ವಗುರು ಬಸವಣ್ಣ"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/gandhiji.jpeg" alt="Leader 6" className="w-30 h-30 object-contain mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Mahatma Gandhi" : "ಮಹಾತ್ಮ ಗಾಂಧಿ"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/amdedkar.jpg" alt="Leader 7" className="w-30 h-30 object-contain mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Dr. B.R. Ambedkar" : "ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/babujagajeevanram.jpg" alt="Leader 8" className="w-30 h-30 object-contain mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Dr. Babu Jagjivan Ram" : "ಡಾ.  ಬಾಬು ಜಗಜೀವನ ರಾಂ"}</div>
              </div>
              
            </div>
          </div>

          {/* Additional Photographs Section */}
          {/* <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish
                ? 'Elders of the community'
                : 'ಸಮುದಾಯದ ಹಿರಿಯ ಚೇತನಗಳು '}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/rchanni.jpeg" alt="Leader" className="w-30 h-30 object-contains mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Sri R. Channigaramaiah Former Minister, Mysore State" : " ಶ್ರೀ ಆರ್ ಚನ್ನಿಗರಾಮಯ್ಯ ಮಾಜಿ ಸಚಿವರು, ಮೈಸೂರು ರಾಜ್ಯ"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/nrachayya.jpeg" alt="Leader" className="w-30 h-30 object-contains mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Sri. N. Rachaiah Former Minister, Mysore State" : " ಶ್ರೀ ಎನ್.ರಾಚಯ್ಯ ಮಾಜಿ ಸಚಿವರು, ಮೈಸೂರು ರಾಜ್ಯ	"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/prabakar.jpeg" alt="Leader" className="w-30 h-30 object-contains mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Sri. K. Prabhakar Senior Gandhian and Former Minister, Government of Karnataka" : "ಶ್ರೀ ಕೆ ಪ್ರಭಾಕರ್ ಹಿರಿಯ ಗಾಂಧಿವಾದಿ ಮತ್ತು ಮಾಜಿ ಸಚಿವರು, ಕರ್ನಾಟಕ ಸರ್ಕಾರ"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/b-krishnappa.jpg" alt="Leader" className="w-30 h-30 object-contains mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Sri. Prof. B. Krishnappa Founder, Dalita Sangharsha Samiti" : "ಪ್ರೊ. ಬಿ. ಕೃಷ್ಣಪ್ಪ ಸ್ಥಾಪಕರು ,ದಲಿತ ಸಂಘರ್ಷ ಸಮಿತಿ"}</div>
              </div>
              <div className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/dmanjunath.jpeg" alt="Leader" className="w-30 h-30 object-contains mb-4 " />
                <div className="text-lg font-semibold mb-1">{isEnglish ? "Sri. D. Manjunath Former Minister, Government of Karnataka" : "ಶ್ರೀ ಡಿ ಮಂಜುನಾಥ್ ಮಾಜಿ ಸಚಿವರು, ಕರ್ನಾಟಕ ಸರ್ಕಾರ"}</div>
              </div>
            </div>
          </div> */}
          <div className="w-full max-w-5xl mx-auto mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
    {isEnglish
      ? 'Elders of the community'
      : 'ಸಮುದಾಯದ ಹಿರಿಯ ಚೇತನಗಳು '}
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    {[{
      src: '/assets/rchanni.jpeg',
      alt: 'Leader',
      textEn: 'Sri R. Channigaramaiah Former Minister, Mysore State',
      textKn: ' ಶ್ರೀ ಆರ್ ಚನ್ನಿಗ ರಾಮಯ್ಯ ಮಾಜಿ ಸಚಿವರು, ಮೈಸೂರು ರಾಜ್ಯ'
    },
    {
      src: '/assets/nrachayya.jpeg',
      alt: 'Leader',
      textEn: 'Sri. N. Rachaiah Former Minister, Mysore State',
      textKn: ' ಶ್ರೀ ಎನ್.ರಾಚಯ್ಯ ಮಾಜಿ ಸಚಿವರು, ಮೈಸೂರು ರಾಜ್ಯ '
    },
    {
      src: '/assets/prabakar.jpeg',
      alt: 'Leader',
      textEn: 'Sri. K. Prabhakar Senior Gandhian and Former Minister, Government of Karnataka',
      textKn: 'ಶ್ರೀ ಕೆ ಪ್ರಭಾಕರ್ ಹಿರಿಯ ಗಾಂಧಿವಾದಿ ಮತ್ತು ಮಾಜಿ ಸಚಿವರು, ಕರ್ನಾಟಕ ಸರ್ಕಾರ'
    },
    {
      src: '/assets/b-krishnappa.jpg',
      alt: 'Leader',
      textEn: 'Sri. Prof. B. Krishnappa Founder, Dalita Sangharsha Samiti',
      textKn: 'ಪ್ರೊ. ಬಿ. ಕೃಷ್ಣಪ್ಪ ಸ್ಥಾಪಕರು ,ದಲಿತ ಸಂಘರ್ಷ ಸಮಿತಿ'
    },
    {
      src: '/assets/dmanjunath.jpeg',
      alt: 'Leader',
      textEn: 'Sri. D. Manjunath Former Minister, Government of Karnataka',
      textKn: 'ಶ್ರೀ ಡಿ ಮಂಜುನಾಥ್ ಮಾಜಿ ಸಚಿವರು, ಕರ್ನಾಟಕ ಸರ್ಕಾರ'
    }].map(({ src, alt, textEn, textKn }, idx) => (
      <div key={idx} className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
        <img src={src} alt={alt} className="w-28 h-28 object-contain mb-4" />
        <div className="text-lg font-semibold mb-1 text-center">
          {isEnglish ? textEn : textKn}
        </div>
      </div>
    ))}
  </div>
</div>


        </div>
      </section>
      <Footer />
    </>
  );
};

export default CommunityPage;
