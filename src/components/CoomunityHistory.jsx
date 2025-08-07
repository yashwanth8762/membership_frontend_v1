import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../reducers/user';
import { HistoryCultureContent } from '../utils/constents';

const CoomunityHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  React.useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);
  const isEnglish = !!user.language;

  const mainTitle = isEnglish
    ? HistoryCultureContent.title_en
    : HistoryCultureContent.title_kn;
  const mainDescription = isEnglish
    ? HistoryCultureContent.short_description_en
    : HistoryCultureContent.short_description_kn;

  return (
    <div>
      {/* Features */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Grid */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Text Section - now on the left */}
          <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800">
                  {mainTitle}
                </h2>
                <p className="text-gray-600 dark:text-neutral-500 text-lg">
                  {mainDescription}
                </p>
              </div>
              <div className='cursor-pointer'>
                <a
                  onClick={() => window.location.href = '/culture-history'}
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  {isEnglish ? 'Read More' : 'ಮತ್ತಷ್ಟು ಓದಿ'}
                </a>
              </div>
            </div>
          </div>
          {/* End Col */}

          {/* Single Image Section */}
          <div className="lg:col-span-7 flex justify-center items-center">
          <img
  className="rounded-xl shadow-lg object-cover w-full max-h-[600px]"
  src="assets/org.jpeg" // Change this path to your image
  alt={isEnglish ? "Community History" : "ಸಮುದಾಯದ ಇತಿಹಾಸ"}
  style={{ height: '70%', maxHeight: '600px' , width: '70%' }}
/>

          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
    </div>
  )
}

export default CoomunityHistory
