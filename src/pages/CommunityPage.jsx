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
      {/* <Header theme="solid"/> */}
      <section>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[80vh]">
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
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
            {isEnglish ? 'Back' : 'ಹಿಂದೆ'}
          </button>

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

          <h1 className="text-4xl font-bold text-center mb-8">
            {isEnglish ? HistoryCultureContent.title_en : HistoryCultureContent.title_kn}
          </h1>
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 justify-items-center w-full">
            <img
              src="/assets/herobg1.jpeg"
              alt="Community Image 1"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/assets/herobg2.jpeg"
              alt="Community Image 2"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/assets/herobg3.jpeg"
              alt="Community Image 3"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div> */}

          {/* Content Titles and Descriptions */}
          <div className="w-full max-w-3xl mx-auto mb-10">
            {HistoryCultureContent.content.title.map((item, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-semibold mb-2 text-blue-700">
                  {isEnglish ? item.en : item.kn}
                </h2>
                <p className="text-lg text-gray-700">
                  {isEnglish
                    ? HistoryCultureContent.content.description[idx].en
                    : HistoryCultureContent.content.description[idx].kn}
                </p>
              </div>
            ))}
          </div>

          {/* Photographs of prominent community leaders / personalities / saints */}
          <div className="w-full max-w-5xl mx-auto mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
    {isEnglish
      ? 'Leaders and visionaries who fought for the welfare of the community'
      : 'ಸಮುದಾಯದ ಕಲ್ಯಾಣಕ್ಕಾಗಿ ಹೋರಾಡಿದ ಪ್ರಮುಖರು ಮತ್ತು ದಾರ್ಶನಿಕರು'}
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
    {/* Card 1 */}
    
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
      <img src="/assets/gandhiji.jpeg" alt="Leader 6" className="w-30 h-30 object-cover rounded-full mb-4 border-4 border-blue-200" />
      <div className="text-lg font-semibold mb-1">{isEnglish ? "Mahatma Gandhi" : "ಮಹಾತ್ಮ ಗಾಂಧಿ"}</div>
    </div>
    {/* Card 7 */}
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
      <img src="/assets/amdedkar.jpg" alt="Leader 7" className="w-30 h-30 object-cover rounded-full mb-4 border-4 border-blue-200" />
      <div className="text-lg font-semibold mb-1">{isEnglish ? "Dr. B.R. Ambedkar" : "ಡಾ|| ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್"}</div>
    </div>
    {/* Card 8 */}
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
      <img src="/assets/babujagajeevanram.jpg" alt="Leader 8" className="w-30 h-30 object-cover rounded-full mb-4 border-4 border-blue-200" />
      <div className="text-lg font-semibold mb-1">{isEnglish ? "Dr. Babu Jagjivan Ram" : "ಡಾ|| ಬಾಬು ಜಗಜೀವನ್ ರಾಮ್"}</div>
    </div>
    {/* Card 9 */}
    <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
      <img src="/assets/b-krishnappa.jpg" alt="Leader 9" className="w-30 h-30 object-cover rounded-full mb-4 border-4 border-blue-200" />
      <div className="text-lg font-semibold mb-1">{isEnglish ? "Prof. B. Krishnappa" : "ಪ್ರೊ. ಬಿ. ಕೃಷ್ಣಪ್ಪ"}</div>
    </div>
    {/* <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
      <img src="/assets/Basavaiah.jpeg" alt="Leader 10" className="w-30 h-30 object-cover rounded-full mb-4 border-4 border-blue-200" />
      <div className="text-lg font-semibold mb-1">{isEnglish ? "Basavaiah Rachaiah" : "ಬಸವಯ್ಯ ರಾಚಯ್ಯ"}</div>
    </div> */}
  </div>
</div>


        </div>
      </section>
      <Footer />
    </>
  );
};

export default CommunityPage;
