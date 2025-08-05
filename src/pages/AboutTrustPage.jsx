import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../reducers/user";
import { AboutTrustContent, AboutTrustPageContent } from "../utils/constents";

import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutTrustPage = () => {
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
    <div>
      {/* <Header theme="solid" /> */}
      <section>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[80vh]">
          <button
            className="self-start mb-8 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 flex items-center gap-3"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              width={18}
              height={18}
              className="inline-block"
            >
              <path
                fillRule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clipRule="evenodd"
              />
            </svg>
            {isEnglish ? 'Back' : 'ಹಿಂದೆ'}
          </button>

          {/* Language Toggle Button */}
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
            {isEnglish ? AboutTrustContent.title_en : AboutTrustContent.title_kn}
          </h1>

          {/* New Content Section */}
          <div className="w-full max-w-4xl mx-auto mb-10 space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 text-center">
              {isEnglish ? AboutTrustPageContent.firstHeading.en : AboutTrustPageContent.firstHeading.kn}
            </h2>
            <h2 className="text-2xl font-bold text-blue-800 text-center">
              {isEnglish ? AboutTrustPageContent.secondHeading.en : AboutTrustPageContent.secondHeading.kn}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish ? AboutTrustPageContent.paragraph.en : AboutTrustPageContent.paragraph.kn}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish ? AboutTrustPageContent.secondParagraph.en : AboutTrustPageContent.secondParagraph.kn}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish ? AboutTrustPageContent.thirdParagraph.en : AboutTrustPageContent.thirdParagraph.kn}
            </p>
          </div>

          {/* Committee Section */}
          <div className="w-full max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {isEnglish ? AboutTrustContent.commitee_title_en : AboutTrustContent.commitee_title_kn}
            </h2>
            <p className="text-lg mb-2">
              {isEnglish ? AboutTrustContent.commitee_description_en : AboutTrustContent.commitee_description_kn}
            </p>

            {/* Committee List Table */}
            {AboutTrustContent.commitee_list && AboutTrustContent.commitee_list.length > 0 && (
              <div className="overflow-x-auto mt-6 mb-4">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-2 text-left text-blue-800 font-semibold">
                        {isEnglish
                          ? AboutTrustContent.commitee_list[0].designation.title_en
                          : AboutTrustContent.commitee_list[0].designation.title_kn}
                      </th>
                      <th className="px-4 py-2 text-left text-blue-800 font-semibold">
                        {isEnglish
                          ? AboutTrustContent.commitee_list[0].members.title_en
                          : AboutTrustContent.commitee_list[0].members.title_kn}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {AboutTrustContent.commitee_list[0].designation &&
                      AboutTrustContent.commitee_list[0].designation.commitee_members_designation &&
                      Object.keys(AboutTrustContent.commitee_list[0].designation.commitee_members_designation)
                        .filter((designationKey) => designationKey.endsWith('_en'))
                        .map((designationKey) => {
                          const baseKey = designationKey.replace('_en', '');
                          const designation = isEnglish
                            ? AboutTrustContent.commitee_list[0].designation.commitee_members_designation[`${baseKey}_en`]
                            : AboutTrustContent.commitee_list[0].designation.commitee_members_designation[`${baseKey}_kn`];
                          let member = isEnglish
                            ? AboutTrustContent.commitee_list[0].members.commitee_members_name[`${baseKey}_en`]
                            : AboutTrustContent.commitee_list[0].members.commitee_members_name[`${baseKey}_kn`];
                          if (!designation || !member) return null;
                          return (
                            <tr key={designationKey} className="border-t border-gray-200">
                              <td className="px-4 py-2 font-medium text-gray-700">{designation}</td>
                              <td className="px-4 py-2 text-gray-700">
                                {Array.isArray(member)
                                  ? (
                                    <ul className="list-disc list-inside">
                                      {member.map((m, idx) => (
                                        <li key={idx}>{m}</li>
                                      ))}
                                    </ul>
                                  )
                                  : member}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Objectives Section */}
          <div className="w-full max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {isEnglish ? AboutTrustContent.objectives_title_en : AboutTrustContent.objectives_title_kn}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-lg">
              {(isEnglish ? AboutTrustContent.objectives_en : AboutTrustContent.objectives_kn).map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ol>
          </div>

          {/* LEADERS & VISIONARIES Section */}
          {/* <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish ? 'LEADERS & VISIONARIES' : 'ನಾಯಕರು ಮತ್ತು ದಾರ್ಶನಿಕರು'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
             
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/DrKHMuniyappa.jpg" alt="Leader 1" className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Dr. K.H. Maniyarappa</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'President' : 'ಅಧ್ಯಕ್ಷ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/ShriANarayanaswamy.jpg" alt="Leader 2" className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Shri A. Narayanaswamy</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Vice President' : 'ಉಪಾಧ್ಯಕ್ಷ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/DrLHanumantayya.jpg" alt="Leader 3" className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Dr. L. Hanumantayya</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Chief Executive Member' : 'ರ್ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ'}</div>
              </div>
            </div>
          </div> */}

          {/* Officers Section */}
          {/* <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish ? "Officer's" : 'ಪದಾಧಿಕಾರಿಗಳ'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
             
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/com1.jpeg" alt="Officer 1" className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Shri Anand K.M.</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Chief Executive Member' : 'ರ್ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/com2.jpeg" alt="Officer 2" className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Shri Puli Manishamappa</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Organizational Executive' : 'ಸಂಘಟನಾ ಕಾರ್ಯದರ್ಶಿ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/com3.jpeg" alt="Officer 3" className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Dr. Sujatha</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Treasurer' : 'ಖಜಾಂಚಿ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/herobg4.jpeg" alt="Officer 4" className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Shri H. Anjaneya</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Executive Committee Member' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/herobg1.jpeg" alt="Officer 5" className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Shri Govinda Karajola</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Executive Committee Member' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯ'}</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs">
                <img src="/assets/logo1.png" alt="Officer 6" className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-blue-200" />
                <div className="text-lg font-semibold mb-1">Shri K.M. Thimmarayappa</div>
                <div className="text-blue-700 font-medium text-sm text-center">{isEnglish ? 'Vice President' : 'ಉಪಾಧ್ಯಕ್ಷ'}</div>
              </div>
            </div>
          </div> */}

          {/* Committee Members Description */}
          {/* <div className="w-full max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {isEnglish ? 'Committee Members Description' : 'ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರ ವಿವರಣೆ'}
            </h2>
            <p className="text-lg mb-2">
              {isEnglish ? AboutTrustContent.commitee_members_description_en : AboutTrustContent.commitee_members_description_kn}
            </p>
          </div> */}

          {/* Members General Assembly */}
          {/* <div className="w-full max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {isEnglish ? AboutTrustContent.Members_General_Assembly[0].tite.en : AboutTrustContent.Members_General_Assembly[0].tite.kn}
            </h2>
            <p className="text-lg mb-2">
              {isEnglish ? AboutTrustContent.Members_General_Assembly[0].description.en : AboutTrustContent.Members_General_Assembly[0].description.kn}
            </p>
          </div> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutTrustPage;
