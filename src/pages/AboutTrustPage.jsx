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
            {isEnglish ? "Back" : "ಹಿಂದೆ"}
          </button>
          {/* Language Toggle Button */}
          <div className="flex items-center space-x-2 mb-8 self-end">
            <span
              className={`text-sm font-medium ${
                !isEnglish ? "text-gray-900" : "text-gray-500"
              }`}
            >
              ಕನ್ನಡ
            </span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: isEnglish ? "#3b82f6" : "#6b7280" }}
            >
              <span className="sr-only">Toggle language</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnglish ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                isEnglish ? "text-gray-900" : "text-gray-500"
              }`}
            >
              English
            </span>
          </div>
          <h1 className="text-4xl font-bold text-center mb-8">
            {isEnglish
              ? AboutTrustContent.title_en
              : AboutTrustContent.title_kn}
          </h1>
          {/* New Content Section */}
          <div className="w-full max-w-4xl mx-auto mb-10 space-y-6">
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish
                ? AboutTrustPageContent.paragraph.en
                : AboutTrustPageContent.paragraph.kn}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish
                ? AboutTrustPageContent.secondParagraph.en
                : AboutTrustPageContent.secondParagraph.kn}
            </p>
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish
                ? AboutTrustPageContent.thirdParagraph.en
                : AboutTrustPageContent.thirdParagraph.kn}
            </p>
          </div>
          {/* Committee Section */}
          <div className="w-full max-w-3xl mx-auto mb-10">
            {/* <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {isEnglish
                ? AboutTrustContent.commitee_title_en
                : AboutTrustContent.commitee_title_kn}
            </h2>
            <p className="text-lg mb-2">
              {isEnglish
                ? AboutTrustContent.commitee_description_en
                : AboutTrustContent.commitee_description_kn}
            </p> */}

            {/* Committee List Table */}
            {AboutTrustContent.commitee_list &&
              AboutTrustContent.commitee_list.length > 0 && (
                <div className="overflow-x-auto mt-6 mb-4">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="px-4 py-2 text-left text-blue-800 font-semibold">
                          {isEnglish
                            ? AboutTrustContent.commitee_list[0].designation
                                .title_en
                            : AboutTrustContent.commitee_list[0].designation
                                .title_kn}
                        </th>
                        <th className="px-4 py-2 text-left text-blue-800 font-semibold">
                          {isEnglish
                            ? AboutTrustContent.commitee_list[0].members
                                .title_en
                            : AboutTrustContent.commitee_list[0].members
                                .title_kn}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {AboutTrustContent.commitee_list[0].designation &&
                        AboutTrustContent.commitee_list[0].designation
                          .commitee_members_designation &&
                        Object.keys(
                          AboutTrustContent.commitee_list[0].designation
                            .commitee_members_designation
                        )
                          .filter((designationKey) =>
                            designationKey.endsWith("_en")
                          )
                          .map((designationKey) => {
                            const baseKey = designationKey.replace("_en", "");
                            const designation = isEnglish
                              ? AboutTrustContent.commitee_list[0].designation
                                  .commitee_members_designation[`${baseKey}_en`]
                              : AboutTrustContent.commitee_list[0].designation
                                  .commitee_members_designation[
                                  `${baseKey}_kn`
                                ];
                            let member = isEnglish
                              ? AboutTrustContent.commitee_list[0].members
                                  .commitee_members_name[`${baseKey}_en`]
                              : AboutTrustContent.commitee_list[0].members
                                  .commitee_members_name[`${baseKey}_kn`];
                            if (!designation || !member) return null;
                            return (
                              <tr
                                key={designationKey}
                                className="border-t border-gray-200"
                              >
                                <td className="px-4 py-2 font-medium text-gray-700">
                                  {designation}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                  {Array.isArray(member) ? (
                                    <ul className="list-disc list-inside">
                                      {member.map((m, idx) => (
                                        <li key={idx}>{m}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    member
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
          <div className="w-full max-w-4xl mx-auto mb-10 space-y-6">
            <p className="text-lg leading-relaxed text-gray-700 text-justify">
              {isEnglish
                ? AboutTrustPageContent.fourthParagraph.en
                : AboutTrustPageContent.fourthParagraph.kn}
            </p>
          </div>
          {/* Executive Committee Members Cards */}
          {/* <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish
                ? "Founders and First executive Committee members"
                : "ಸ್ಥಾಪಕರು ಮತ್ತು ಮೊದಲ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
              {[
                {
                  img: "/assets/DrKHMuniyappa.jpg",
                  name_en: "Dr|| K.H. Muniyappa",
                  name_kn: "ಡಾ. ಕೆ.ಹೆಚ್.‌ ಮುನಿಯಪ್ಪ",
                  designation_en: "President",
                  designation_kn: "ಅಧ್ಯಕ್ಷ",
                },
                {
                  img: "/assets/ShriANarayanaswamy.jpg",
                  name_en: "Sri. A. Narayanaswamy",
                  name_kn: "ಶ್ರೀ. ಎ.ನಾರಾಯಣಸ್ವಾಮಿ",
                  designation_en: "Vice President",
                  designation_kn: "ಉಪಾಧ್ಯಕ್ಷ",
                },
                {
                  img: "/assets/KMThimmarayappa.jpeg",
                  name_en: "Sri. K.M. Thimmarayappa",
                  name_kn: "ಶ್ರೀ.ಕೆ.ಎಂ.ತಿಮ್ಮರಾಯಪ್ಪ",
                  designation_en: "Vice President",
                  designation_kn: "ಉಪಾಧ್ಯಕ್ಷ",
                },
                {
                  img: "/assets/DrLHanumantayya.jpg",
                  name_en: "Dr. L. Hanumantayya",
                  name_kn: "ಡಾ|| ಎಲ್. ಹನುಮಂತಯ್ಯ",
                  designation_en: "General Secretary",
                  designation_kn: "ರ್ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
                },
                {
                  img: "/assets/AMuniyappageneralSecretary.jpeg",
                  name_en: "Sri A. Muniyappa",
                  name_kn: "ಶ್ರೀ. ಎ. ಮುನಿಯಪ್ಪ",
                  designation_en: "General Secretary",
                  designation_kn: "ರ್ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
                },
                {
                  img: "/assets/Pillamunishamappa.webp",
                  name_en: "Sri. Pillamuniswamyappa",
                  name_kn: "ಶ್ರೀ. ಪಿಳ್ಳ ಮುನಿಶ್ಯಾಮಪ್ಪ ",
                  designation_en: "Organizational Executive",
                  designation_kn: "ರಾಜ್ಯ ಸಂಘಟನಾ ಕಾರ್ಯದರ್ಶಿ",
                },
                {
                  img: "/assets/DrllSujata.jpeg",
                  name_en: "Dr|| Sujatha",
                  name_kn: "ಡಾ|| ಸುಜಾತ",
                  designation_en: "Treasurer",
                  designation_kn: "ಖಜಾಂಚಿ",
                },
                {
                  img: "/assets/HAnjaneya.jpeg",
                  name_en: "Sri. H. Anjaneya",
                  name_kn: "ಶ್ರೀ. ಎಚ್‌. ಆಂಜನೇಯ",
                  designation_en: "Executive Committee Member",
                  designation_kn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
                },
                {
                  img: "/assets/GovindKarajol.jpeg",
                  name_en: "Sri.Govinda Karajol",
                  name_kn: "ಶ್ರೀ. ಗೋವಿಂದ ಎಂ.ಕಾರಜೋಳ
",
                  designation_en: "Executive Committee Member",
                  designation_kn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
                },
                {
                  img: "/assets/venkateshdodderi.jpg",
                  name_en: "Sri H. Venkatesh Dodderi",
                  name_kn: "ಶ್ರೀ.ಹೆಚ್.ವೆಂಕಟೇಶ್ ದೊಡ್ಡೇರಿ",
                  designation_en: "Legal Advisor",
                  designation_kn: "ಕಾನೂನು ಸಲಹೆಗಾರರು",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6 w-full max-w-xs"
                >
                  <div className="w-28 h-28 mb-4 flex items-center justify-center bg-blue-50 rounded-full overflow-hidden border-4 border-blue-200">
                    <img
                      src={member.img}
                      alt={member.name_en}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-lg font-semibold mb-1 text-center">
                    {isEnglish ? member.name_en : member.name_kn}
                  </div>
                  <div className="text-sm text-blue-700 font-medium text-center">
                    {isEnglish ? member.designation_en : member.designation_kn}
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="w-full max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-8">
              {isEnglish
                ? "Founders and First executive Committee members"
                : "ಸ್ಥಾಪಕರು ಮತ್ತು ಮೊದಲ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">

              {[
                {
                  img: "/assets/DrKHMuniyappa.jpg",
                  name_en: "Dr|| K.H. Muniyappa",
                  name_kn: "ಡಾ. ಕೆ.ಹೆಚ್.‌ ಮುನಿಯಪ್ಪ",
                  designation_en: "President",
                  designation_kn: "ಅಧ್ಯಕ್ಷರು",
                },
                {
                  img: "/assets/ShriANarayanaswamy.jpg",
                  name_en: "Sri. A. Narayanaswamy",
                  name_kn: "ಶ್ರೀ. ಎ.ನಾರಾಯಣಸ್ವಾಮಿ",
                  designation_en: "Vice President",
                  designation_kn: "ಉಪಾಧ್ಯಕ್ಷರು",
                },
                {
                  img: "/assets/KMThimmarayappa.jpeg",
                  name_en: "Sri. K.M. Thimmarayappa",
                  name_kn: "ಶ್ರೀ.ಕೆ.ಎಂ.ತಿಮ್ಮರಾಯಪ್ಪ",
                  designation_en: "Vice President",
                  designation_kn: "ಉಪಾಧ್ಯಕ್ಷರು",
                },
                {
                  img: "/assets/DrLHanumantayya.jpg",
                  name_en: "Dr. L. Hanumantayya",
                  name_kn: "ಡಾ|| ಎಲ್. ಹನುಮಂತಯ್ಯ",
                  designation_en: "General Secretary",
                  designation_kn: "ರ್ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
                },
                {
                  img: "/assets/AMuniyappageneralSecretary.jpeg",
                  name_en: "Sri A. Muniyappa",
                  name_kn: "ಶ್ರೀ. ಎ. ಮುನಿಯಪ್ಪ",
                  designation_en: "General Secretary",
                  designation_kn: "ರ್ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ",
                },
                {
                  img: "/assets/Pillamunishamappa.webp",
                  name_en: "Sri. Pillamuniswamyappa",
                  name_kn: "ಶ್ರೀ. ಪಿಳ್ಳ ಮುನಿಶ್ಯಾಮಪ್ಪ ",
                  designation_en: "Organizational Executive",
                  designation_kn: "ರಾಜ್ಯ ಸಂಘಟನಾ ಕಾರ್ಯದರ್ಶಿ",
                },
                {
                  img: "/assets/DrllSujata.jpeg",
                  name_en: "Dr|| Sujatha",
                  name_kn: "ಡಾ|| ಸುಜಾತ",
                  designation_en: "Treasurer",
                  designation_kn: "ಖಜಾಂಚಿ",
                },
                {
                  img: "/assets/HAnjaneya.jpeg",
                  name_en: "Sri. H. Anjaneya",
                  name_kn: "ಶ್ರೀ. ಎಚ್‌. ಆಂಜನೇಯ",
                  designation_en: "Executive Committee Member",
                  designation_kn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
                },
                {
                  img: "/assets/GovindKarajol.jpeg",
                  name_en: "Sri.Govinda Karajol",
                  name_kn: "ಶ್ರೀ. ಗೋವಿಂದ ಎಂ.ಕಾರಜೋಳ",
                  designation_en: "Executive Committee Member",
                  designation_kn: "ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ಸದಸ್ಯರು",
                },
                {
                  img: "/assets/venkateshdodderi.jpg",
                  name_en: "Sri H. Venkatesh Dodderi",
                  name_kn: "ಶ್ರೀ.ಹೆಚ್.ವೆಂಕಟೇಶ್ ದೊಡ್ಡೇರಿ",
                  designation_en: "Legal Advisor",
                  designation_kn: "ಕಾನೂನು ಸಲಹೆಗಾರರು",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-lg flex flex-col items-center p-6 w-full max-w-xs rounded-xl"
                >
                  <div className="w-32 h-32 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name_en}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-lg font-semibold mb-1 text-center whitespace-nowrap">
  {isEnglish ? member.name_en : member.name_kn}
</div>

                  <div className="text-sm text-blue-700 font-medium text-center">
                    {isEnglish ? member.designation_en : member.designation_kn}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg leading-relaxed text-gray-700 text-justify mt-6">
              {isEnglish
                ? AboutTrustPageContent.fifthParagraph.en
                : AboutTrustPageContent.fifthParagraph.kn}
            </p>
          </div>
          {/* Objectives Section */}
          <div className="w-full max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {isEnglish
                ? AboutTrustContent.objectives_title_en
                : AboutTrustContent.objectives_title_kn}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-lg">
              {(isEnglish
                ? AboutTrustContent.objectives_en
                : AboutTrustContent.objectives_kn
              ).map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutTrustPage;
