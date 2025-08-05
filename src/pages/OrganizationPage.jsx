import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";
import { OrganizationContent } from "../utils/constents";
import { CommitteeMembers } from "../utils/constents";

const OrganizationPage = () => {
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
      <section>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[80vh]">
          {/* Back Button - Top Left */}
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

          {/* Language Toggle - Top Right */}
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

          {/* Main Heading */}
          <h1 className="text-4xl font-bold text-center mb-8">
            {isEnglish ? 'Organizational Structure' : 'ಸಾಂಸ್ಥಿಕ ರಚನೆ'}
          </h1>

          {/* First Content - Ordered List */}
          <div className="w-full max-w-4xl mx-auto mb-10">
            <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700">
              {OrganizationContent.first[isEnglish ? 'en' : 'kn'].map((item, index) => (
                <li key={index} className="mb-4 leading-relaxed">
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Table Section */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish 
                ? 'District-wise Executive Committee Members' 
                : 'ಜಿಲ್ಲಾ ವಾರು ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು'}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold text-lg border-b border-blue-700">
                      {isEnglish ? 'S.No' : 'ಕ್ರ.ಸಂ'}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-lg border-b border-blue-700">
                      {isEnglish ? 'District' : 'ಜಿಲ್ಲೆ'}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-lg border-b border-blue-700">
                      {isEnglish ? 'Members' : 'ಸದಸ್ಯರು'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {OrganizationContent.table[isEnglish ? 'en' : 'kn'].map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 text-lg font-medium text-gray-900 border-b border-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-lg text-gray-700 border-b border-gray-200">
                        {item.district}
                      </td>
                      <td className="px-6 py-4 text-lg text-gray-700 border-b border-gray-200">
                        {item.members}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Second Content - Ordered List */}
          <div className="w-full max-w-4xl mx-auto mb-10">
            {Object.entries(OrganizationContent.second).map(([key, section]) => (
              <div key={key} className="mb-8">
                <h3 className="text-lg text-gray-700 font-semibold">
                  {key}. {isEnglish ? section.title_en : section.title_kn} :
                </h3>
                <div className="space-y-3 text-lg text-gray-700">
                  {section.items.map((item, index) => {
                    const itemText = isEnglish ? item.en : item.kn;
                    const hasNewlines = itemText.includes('\n');
                    
                    return (
                      <div key={index} className="mb-3 leading-relaxed">
                        {hasNewlines ? (
                          <div>
                            <div className="mb-2">
                              {itemText.split('\n')[0]}
                            </div>
                            <div className="ml-4 text-gray-600">
                              {itemText.split('\n').slice(1).map((line, lineIndex) => (
                                <div key={lineIndex} className="mb-1">
                                  {line}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="list-decimal list-inside">
                            {itemText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
{/* Committee Members Table */}
<div className="w-full max-w-6xl mx-auto mb-14">
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
    {isEnglish ? "Executive Committee Members" : "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು"}
  </h2>
  <div className="overflow-x-auto">
    <table className="w-full bg-white rounded-lg shadow-lg border-collapse">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="px-4 py-3 text-left font-semibold text-md border-b border-blue-700">
            {isEnglish ? "S.No" : "ಕ್ರ.ಸಂ"}
          </th>
          <th className="px-4 py-3 text-left font-semibold text-md border-b border-blue-700">
            {isEnglish ? "Name & Address" : "ಹೆಸರು ಮತ್ತು ವಿಳಾಸ"}
          </th>
          <th className="px-4 py-3 text-left font-semibold text-md border-b border-blue-700">
            {isEnglish ? "Position" : "ಹುದ್ದೆ"}
          </th>
          <th className="px-4 py-3 text-left font-semibold text-md border-b border-blue-700">
            {isEnglish ? "Occupation" : "ಉದ್ಯೋಗ"}
          </th>
          <th className="px-4 py-3 text-left font-semibold text-md border-b border-blue-700">
            {isEnglish ? "Mobile Number" : "ಮೊಬೈಲ್‌ ಸಂಖ್ಯೆ"}
          </th>
        </tr>
      </thead>
      <tbody>
        {CommitteeMembers.map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-4 py-3 font-medium border-b border-gray-200">{idx + 1}</td>
            <td className="px-4 py-3 border-b border-gray-200 whitespace-pre-line">{item.name[isEnglish ? "en" : "kn"]}</td>
            <td className="px-4 py-3 border-b border-gray-200">{item.position[isEnglish ? "en" : "kn"]}</td>
            <td className="px-4 py-3 border-b border-gray-200">{item.occupation[isEnglish ? "en" : "kn"]}</td>
            <td className="px-4 py-3 border-b border-gray-200">{item.mobile}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrganizationPage;
