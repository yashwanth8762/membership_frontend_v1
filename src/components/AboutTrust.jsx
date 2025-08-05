/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../reducers/user';
import { AboutTrustContent } from '../utils/constents';
import Leaders from './Leaders';

const AboutTrust = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // Default language is Kannada (false)
  React.useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);
  const toggleLanguage = () => {
    dispatch(setLanguage(!user.language));
  };

  const isEnglish = !!user.language;

  return (
    <div>
      {/* Features */}
      <div className="max-w-[85rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20 mx-auto">
        {/* Grid */}
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img className="rounded-xl shadow-lg border-4 border-blue-100" src="/assets/Aboutus.jpeg" alt="About the Trust" />
          </div>
          {/* End Col */}

          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              {/* Title */}
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-extrabold text-3xl lg:text-4xl text-blue-800">
                  {isEnglish ? AboutTrustContent.title_en : AboutTrustContent.title_kn}
                </h2>
                <p className="text-gray-600 dark:text-neutral-400 text-lg">
                  {isEnglish ? AboutTrustContent.short_description_en : AboutTrustContent.short_description_kn}
                </p>
              </div>
              {/* End Title */}


              {/* Read More Button */}
              <div>
                <a
                  onClick={() => window.location.href = '/about-trust'}
                  className="cursor-pointer inline-block px-7 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  {isEnglish ? 'Read More' : 'ಮತ್ತಷ್ಟು ಓದಿ'}
                </a>
              </div>
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
      <Leaders isEnglish={isEnglish} />
    </div>
  )
}

export default AboutTrust
