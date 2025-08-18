import React from "react";
import { useDispatch, useSelector } from "react-redux";

const documents = [
  {
    name: "Flyer",
    nameKn: "ಫ್ಲೈಯರ್",
    file: "/assets/doc/doc1.jpeg",
  },
  {
    name: "Registration Document (PDF)",
    nameKn: "ನೋಂದಣಿ ಡಾಕ್ಯುಮೆಂಟ್ (PDF)",
    file: "/assets/doc/MAdaramahasabharigistrationDocument.pdf",
  },
  // {
  //   name: "Registration (Kannada DOCX)",
  //   nameKn: "ನೋಂದಣಿ (DOCX, ಕನ್ನಡ)",
  //   file: "/assets/doc/ಮಾದರಮಾಹಾಸಭಾದRegistrationಕನ್ನಡ.docx",
  // },
];

const Documents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // Default user.language is Kannada (false)
  React.useEffect(() => {
    if (user.language === undefined) {
      dispatch(setuser.language(false));
    }
  }, [dispatch, user.language]);

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {user.language ? "Documents" : "ಮಹಾಸಭಾದ ದಾಖಲಾತಿಗಳು"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {user.language 
              ? "Access important documents and registration files related to our organization"
              : "ನಮ್ಮ ಸಂಸ್ಥೆಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಮುಖ ದಾಖಲೆಗಳು ಮತ್ತು ನೋಂದಣಿ ಫೈಲ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಿ"
            }
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, idx) => (
            <a
              key={idx}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              {/* Document Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {doc.file.includes('.pdf') ? '📄' : doc.file.includes('.docx') ? '📝' : '🖼️'}
                </div>
              </div>

              {/* Document Name */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {user.language ? doc.name : doc.nameKn}
                </h3>
                
                {/* File Type Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                  {doc.file.split('.').pop().toUpperCase()}
                </div>

                {/* Open Link */}
                <div className="flex items-center justify-center text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                  <span className="mr-1">
                    {user.language ? "Open Document" : "ದಾಖಲೆಯನ್ನು ತೆರೆಯಿರಿ"}
                  </span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        {/* <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              {user.language ? "Need Help?" : "ಸಹಾಯ ಬೇಕೇ?"}
            </h3>
            <p className="text-blue-700">
              {user.language 
                ? "If you have trouble accessing any documents, please contact our support team."
                : "ಯಾವುದೇ ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ತೊಂದರೆ ಇದ್ದರೆ, ದಯವಿಟ್ಟು ನಮ್ಮ ಬೆಂಬಲ ತಂಡವನ್ನು ಸಂಪರ್ಕಿಸಿ."
              }
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Documents;
