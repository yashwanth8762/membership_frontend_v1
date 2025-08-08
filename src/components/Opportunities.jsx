import React from 'react';
import { useSelector } from 'react-redux';

export default function Opportunities() {
  const user = useSelector((state) => state.user.value);
  const isEnglish = !!user.language;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isEnglish ? "Madigara Abhirudhi Avakashagalu" : "ಮಾದಿಗರ ಅಭಿವೃದ್ಧಿ ಅವಕಾಶಗಳು"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Educational Opportunities */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? "Educational Scholarships" : "ಶೈಕ್ಷಣಿಕ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು"}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEnglish 
                ? "Access to scholarships, educational loans, and support programs for Madiga community students pursuing higher education."
                : "ಉನ್ನತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಮಾದಿಗ ಸಮುದಾಯದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು, ಶೈಕ್ಷಣಿಕ ಸಾಲಗಳು ಮತ್ತು ಬೆಂಬಲ ಕಾರ್ಯಕ್ರಮಗಳಿಗೆ ಪ್ರವೇಶ."
              }
            </p>
          </div>

          {/* Employment Opportunities */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? "Employment & Training" : "ಉದ್ಯೋಗ ಮತ್ತು ತರಬೇತಿ"}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEnglish 
                ? "Skill development programs, job training, and employment opportunities in government and private sectors."
                : "ಸರ್ಕಾರಿ ಮತ್ತು ಖಾಸಗಿ ವಲಯಗಳಲ್ಲಿ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಕ್ರಮಗಳು, ಉದ್ಯೋಗ ತರಬೇತಿ ಮತ್ತು ಉದ್ಯೋಗಾವಕಾಶಗಳು."
              }
            </p>
          </div>

          {/* Financial Support */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? "Financial Assistance" : "ಹಣಕಾಸು ಸಹಾಯ"}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEnglish 
                ? "Micro-finance schemes, business loans, and financial support for entrepreneurship and small business development."
                : "ಉದ್ಯಮಶೀಲತೆ ಮತ್ತು ಸಣ್ಣ ವ್ಯಾಪಾರ ಅಭಿವೃದ್ಧಿಗಾಗಿ ಸೂಕ್ಷ್ಮ ಹಣಕಾಸು ಯೋಜನೆಗಳು, ವ್ಯಾಪಾರ ಸಾಲಗಳು ಮತ್ತು ಹಣಕಾಸು ಬೆಂಬಲ."
              }
            </p>
          </div>

          {/* Healthcare Support */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? "Healthcare Access" : "ಆರೋಗ್ಯ ಸೇವೆಗಳು"}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEnglish 
                ? "Medical camps, health awareness programs, and access to healthcare facilities for community members."
                : "ಸಮುದಾಯದ ಸದಸ್ಯರಿಗೆ ವೈದ್ಯಕೀಯ ಶಿಬಿರಗಳು, ಆರೋಗ್ಯ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಸೇವೆಗಳಿಗೆ ಪ್ರವೇಶ."
              }
            </p>
          </div>

          {/* Housing Support */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? "Housing Schemes" : "ವಸತಿ ಯೋಜನೆಗಳು"}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEnglish 
                ? "Affordable housing schemes, home improvement loans, and support for better living conditions."
                : "ಸುಲಭ ವಸತಿ ಯೋಜನೆಗಳು, ಮನೆ ಸುಧಾರಣೆ ಸಾಲಗಳು ಮತ್ತು ಉತ್ತಮ ಜೀವನ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಬೆಂಬಲ."
              }
            </p>
          </div>

          {/* Social Welfare */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isEnglish ? "Social Welfare" : "ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ"}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {isEnglish 
                ? "Pension schemes, disability support, women empowerment programs, and community development initiatives."
                : "ಪಿಂಚಣಿ ಯೋಜನೆಗಳು, ಅಂಗವೈಕಲ್ಯ ಬೆಂಬಲ, ಮಹಿಳಾ ಸಬಲೀಕರಣ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮುದಾಯ ಅಭಿವೃದ್ಧಿ ಉಪಕ್ರಮಗಳು."
              }
            </p>
          </div>
        </div>

       
      </div>
    </section>
  );
} 