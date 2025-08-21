import React, { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("photos");
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const iframeRef = useRef(null);

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
  // Hardcoded cards data with bilingual headings & banners and images
  const cards = [
    {
      heading: {
        en: "Meeting of Madiga Leaders under the Jurisdiction of Bruhat Bangalore Mahanagara Palike, Date: 27.05.2025, 9 am, Gandhi Bhavan, Bangalore",
        kn: "ಬೃಹತ್ ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ ವ್ಯಾಪ್ತಿಯ ಮಾದಿಗ ಮುಖಂಡರ ಸಭೆ, ದಿನಾಂಕ: 27.05.2025, ಬೆಳಿಗ್ಗೆ: 9 ಗಂಟೆಗೆ, ಗಾಂಧಿಭವನ, ಬೆಂಗಳೂರು",
      },
      banner: "/assets/banner5gallery.png",
      images: [
        { src: "/assets/27052025pt2/201.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/202.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/203.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/204.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/205.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/206.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/207.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/208.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/209.jpeg", alt: "Image 1" },
        { src: "/assets/27052025pt2/210.jpeg", alt: "Image 1" },


      ],
    },
    {
      heading: {
        en: "Greater Bangalore Area Survey Awareness Campaign Meeting on Reservation of Madiga Related Castes, Venue: Hotel Maurya Annex, Bangalore, Date: 14-06-2025.",
        kn: "ಗ್ರೇಟರ್‌ ಬೆಂಗಳೂರು ವ್ಯಾಪ್ತಿಯ ಮಾದಿಗ ಸಂಬಂಧಿಸಿದ ಜಾತಿಗಳ ಒಳ ಮೀಸಲಾತಿ ಸಮೀಕ್ಷೆಯ ಜಾಗೃತಿ ಅಭಿಯಾನ ಸಭೆ,  ಸ್ಥಳ: ಹೋಟೆಲ್‌ ಮೌರ್ಯ ಅನೆಕ್ಸ್, ಬೆಂಗಳೂರು, ದಿನಾಂಕ: 14-06-2025.",
      },
      banner: "/assets/banner1gallery.jpg",
      images: [
        { src: "/assets/14062025/1401.jpeg", alt: "Image 1" },
        { src: "/assets/14062025/1402.jpeg", alt: "Image 2" },
        { src: "/assets/14062025/1403.jpeg", alt: "Image 3" },
        { src: "/assets/14062025/1404.jpeg", alt: "Image 4" },
        { src: "/assets/14062025/1405.jpeg", alt: "Image 5" },
        { src: "/assets/14062025/1406.jpeg", alt: "Image 6" },
        { src: "/assets/14062025/1407.jpeg", alt: "Image 7" },
        { src: "/assets/14062025/1408.jpeg", alt: "Image 8" },
        { src: "/assets/14062025/1409.jpeg", alt: "Image 9" },
        { src: "/assets/14062025/1410.jpeg", alt: "Image 10" },
      ],
    },
    {
      heading: {
        en: "Greater Bangalore Area Caste Census Survey Awareness Meeting 2025, Gandhi Bhavan, Bangalore. Date: 25-06-2025.",
        kn: "ಗ್ರೇಟರ್‌ ಬೆಂಗಳೂರು ವ್ಯಾಪ್ತಿಯ ಜಾತಿ ಗಣತಿ ಸಮೀಕ್ಷೆ-ಜಾಗೃತಿ ಸಭೆ-2025, ಗಾಂಧಿ ಭವನ, ಬೆಂಗಳೂರು.  ದಿನಾಂಕ: 25-06-2025.",
      },
      banner: "/assets/banner2gallery.jpg",
      images: [
        { src: "/assets/25062025/2501.jpeg", alt: "Image 1" },
        { src: "/assets/25062025/2502.jpeg", alt: "Image 2" },
        { src: "/assets/25062025/2503.jpeg", alt: "Image 3" },
        { src: "/assets/25062025/2504.jpeg", alt: "Image 4" },
        { src: "/assets/25062025/2505.jpeg", alt: "Image 5" },
        { src: "/assets/25062025/2506.jpeg", alt: "Image 6" },
        { src: "/assets/25062025/2507.jpeg", alt: "Image 7" },
        { src: "/assets/25062025/2508.jpeg", alt: "Image 8" },
        { src: "/assets/25062025/2509.jpeg", alt: "Image 9" },
        { src: "/assets/25062025/2510.jpeg", alt: "Image 10" },
        { src: "/assets/25062025/2511.jpeg", alt: "Image 11" },
        { src: "/assets/25062025/2512.jpeg", alt: "Image 12" },
        { src: "/assets/25062025/2513.jpeg", alt: "Image 13" },
      ],
    },
    {
      heading: {
        en: "Greater Bangalore Area Comprehensive Survey 2025 Public Awareness Meeting, Tamar Hotel, Maurya Annex, Bangalore, Date: 26-06-2025.",
        kn: "ಗ್ರೇಟರ್‌ ಬೆಂಗಳೂರು ವ್ಯಾಪ್ತಿಯ ಪರಿಶಿಷ್ಟ ಜಾತಿಯ ಸಮಗ್ರ ಸಮೀಕ್ಷೆ 2025 ರ ಜನಜಾಗೃತಿ ಸಭೆ,ತಾಮರ  ಹೋಟೆಲ್‌, ಮೈರ್ಯ ಅನೆಕ್ಸ್‌, ಬೆಂಗಳೂರು,  ದಿನಾಂಕ: 26-06-2025.",
      },
      banner: "/assets/banner3gallery.jpg",
      images: [
        { src: "/assets/27052025/261.jpeg", alt: "Image 1" },
        { src: "/assets/27052025/262.jpeg", alt: "Image 2" },
        { src: "/assets/27052025/263.jpeg", alt: "Image 3" },
        { src: "/assets/27052025/264.jpeg", alt: "Image 4" },
        { src: "/assets/27052025/265.jpeg", alt: "Image 4" },
        { src: "/assets/27052025/266.jpeg", alt: "Image 4" },
        { src: "/assets/27052025/267.jpeg", alt: "Image 4" },
        { src: "/assets/27052025/268.jpeg", alt: "Image 4" },
        { src: "/assets/27052025/269.jpeg", alt: "Image 4" },
        { src: "/assets/27052025/270.jpeg", alt: "Image 4" },

 
      ],
    },
    {
      heading: {
        en: "Karnataka Madara Mahasabha Membership Registration Campaign - Gandhi Bhavan, Bangalore, Date - 13-07-2025.",
        kn: "ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾ ಸದಸ್ಯತ್ವ ನೊಂದಣಿ ಅಭಿಯಾನ -  ಗಾಂಧಿ ಭವನ, ಬೆಂಗಳೂರು, ದಿನಾಂಕ- 13-07-2025.",
      },
      banner: "/assets/banner4gallery.jpg",
      images: [
        { src: "/assets/13072025/1301.jpeg", alt: "Image 1" },
        { src: "/assets/13072025/1302.jpeg", alt: "Image 2" },
        { src: "/assets/13072025/1303.jpeg", alt: "Image 3" },
        { src: "/assets/13072025/1304.jpeg", alt: "Image 4" },
        { src: "/assets/13072025/1305.jpeg", alt: "Image 5" },
        { src: "/assets/13072025/1306.jpeg", alt: "Image 6" },
        { src: "/assets/13072025/1307.jpeg", alt: "Image 7" },
        { src: "/assets/13072025/1308.jpeg", alt: "Image 8" },
        { src: "/assets/13072025/1309.jpeg", alt: "Image 9" },
        { src: "/assets/13072025/1310.jpeg", alt: "Image 10" },
        { src: "/assets/13072025/1311.jpeg", alt: "Image 11" },
        { src: "/assets/13072025/1312.jpeg", alt: "Image 12" },
        { src: "/assets/13072025/1313.jpeg", alt: "Image 13" },
        { src: "/assets/13072025/1314.jpeg", alt: "Image 14" },
        { src: "/assets/13072025/1315.jpeg", alt: "Image 15" },
        { src: "/assets/13072025/1316.jpeg", alt: "Image 16" },
        { src: "/assets/13072025/1317.jpeg", alt: "Image 17" },
        { src: "/assets/13072025/1318.jpeg", alt: "Image 18" },
        { src: "/assets/13072025/1319.jpeg", alt: "Image 19" },
        { src: "/assets/13072025/1320.jpeg", alt: "Image 20" },
        { src: "/assets/13072025/1321.jpeg", alt: "Image 21" },
        { src: "/assets/13072025/1322.jpeg", alt: "Image 22" },
        { src: "/assets/13072025/1323.jpeg", alt: "Image 23" },
        { src: "/assets/13072025/1324.jpeg", alt: "Image 24" },
        { src: "/assets/13072025/1325.jpeg", alt: "Image 25" },
        { src: "/assets/13072025/1326.jpeg", alt: "Image 26" },
        { src: "/assets/13072025/1327.jpeg", alt: "Image 27" },
        { src: "/assets/13072025/1328.jpeg", alt: "Image 28" },
      ],
    },

    {
      heading: {
        en: "Internal Reservation Protest, Date: 14/08/2025 to 19/08/2025, Freedom Park Bengaluru.",
        kn: "ಒಳ ಮೀಸಲಾತಿ ಪ್ರತಿಭಟನೆ, ದಿನಾಂಕ: 14/08/2025 ರಿಂದ 19/08/2025, ಫ್ರೀಡಂ ಪಾರ್ಕ್ ಬೆಂಗಳೂರು.",
      },
      banner: "/assets/vala/vala3.jpeg",
      images: [
        { src: "/assets/vala/vala1.jpeg", alt: "Image 1" },
        { src: "/assets/vala/vala2.jpeg", alt: "Image 1" },
        { src: "/assets/vala/vala3.jpeg", alt: "Image 1" },
        { src: "/assets/vala/vala4.jpeg", alt: "Image 1" },
        { src: "/assets/vala/vala5.jpeg", alt: "Image 1" },
        { src: "/assets/vala/vala6.jpeg", alt: "Image 1" },
        // { src: "/assets/vala/vala7.jpeg", alt: "Image 1" },
        // { src: "/assets/vala/vala8.jpeg", alt: "Image 1" },
        // { src: "/assets/vala/vala9.jpeg", alt: "Image 1" },


      ],
    },
    
  ];

  const toggleExpandCard = (index) => {
    if (expandedCardIndex === index) {
      setExpandedCardIndex(null);
    } else {
      setExpandedCardIndex(index);
    }
  };

  const openModal = (index, images) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentImages.length) % currentImages.length
    );
  };

  const goFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      {/* <Header theme="solid" /> */}
      {/* <div className="flex items-center mb-8"> */}
          {/* <button
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
            onClick={() => window.location.href = '/'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width={18} height={18} className="inline-block">
              <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
            </svg>
            {isEnglish ? 'Back' : 'ಹಿಂದೆ'}
          </button> */}
          {/* <h2 className="mt-30 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isEnglish ? "Our Gallery" : "ನಮ್ಮ ಗ್ಯಾಲರಿ"}
          </h2>         */}
          {/* </div> */}
{/* Header can be added here */}
<div className="flex items-center justify-between mb-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          className="flex items-center gap-3 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 cursor-pointer"
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
          {isEnglish ? "Back" : "ಹಿಂದೆ"}
        </button>

        {/* Language Toggle */}
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${!isEnglish ? "text-gray-900" : "text-gray-500"}`}>
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
          <span className={`text-sm font-medium ${isEnglish ? "text-gray-900" : "text-gray-500"}`}>
            English
          </span>
        </div>
      </div>

      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className=" text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isEnglish ? "Our Gallery" : "ನಮ್ಮ ಗ್ಯಾಲರಿ"}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            {isEnglish
              ? "Explore moments from our community events, activities, and celebrations. Our gallery captures the spirit and togetherness of our members."
              : "ನಮ್ಮ ಸಮುದಾಯದ ಕಾರ್ಯಕ್ರಮಗಳು, ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಹಬ್ಬಗಳ ಕ್ಷಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ನಮ್ಮ ಗ್ಯಾಲರಿ ಸದಸ್ಯರ ಒಗ್ಗಟ್ಟನ್ನು ಮತ್ತು ಆತ್ಮೀಯತೆಯನ್ನು ಹಿಡಿದಿಟ್ಟಿದೆ."}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4 border-b border-gray-300">
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === "photos"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("photos")}
            >
              {isEnglish ? "Photos" : "ಚಿತ್ರಗಳು"}
            </button>
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === "videos"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              {isEnglish ? "Videos" : "ವೀಡಿಯೊಗಳು"}
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === "photos" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* {cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="border rounded-lg overflow-hidden shadow-sm flex flex-col"
                  >
                   
                    <div
                      className="cursor-pointer relative group"
                      onClick={() => toggleExpandCard(cardIndex)}
                    >
                      <img
                        src={card.banner}
                        alt={`Banner for card ${cardIndex + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4">
                        <p className="text-white text-center font-semibold text-lg">
                          {isEnglish
                            ? "Click to view details"
                            : "ಕ್ಲಿಕ್ ಮಾಡಿ ವಿವರಗಳಿಗೆ"}
                        </p>
                      </div>
                    </div>
                    <h3
                      className="p-4 font-semibold cursor-pointer text-gray-900"
                      onClick={() => toggleExpandCard(cardIndex)}
                    >
                      {isEnglish ? card.heading.en : card.heading.kn}
                    </h3>

                    
                    {expandedCardIndex === cardIndex && (
                      <div className="px-4 pb-4 col-span-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {card.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="cursor-pointer rounded overflow-hidden border hover:border-indigo-500"
                            onClick={() => openModal(imgIndex, card.images)}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-24 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))} */}
                {cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className={`flex flex-col overflow-hidden rounded-lg transition-shadow duration-300 ${
                      expandedCardIndex === cardIndex
                        ? "border rounded-lg shadow-sm"
                        : "border-transparent shadow-none"
                    }`}
                  >
                    {/* Card Header with Banner and Heading */}
                    {/* <div
                      className="cursor-pointer relative group"
                      onClick={() => toggleExpandCard(cardIndex)}
                    >
                      <img
                        src={card.banner}
                        alt={`Banner for card ${cardIndex + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4">
                        <p className="text-white text-center font-semibold text-lg">
                          {isEnglish
                            ? "Click to view details"
                            : "ಕ್ಲಿಕ್ ಮಾಡಿ ವಿವರಗಳಿಗೆ"}
                        </p>
                      </div>
                    </div>
                    <h3
                      className="p-4 font-semibold cursor-pointer text-gray-900"
                      onClick={() => toggleExpandCard(cardIndex)}
                    >
                      {isEnglish ? card.heading.en : card.heading.kn}
                    </h3> */}
                    <div className="relative group">
                      <img
                        src={card.banner}
                        alt={`Banner for card ${cardIndex + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4">
                        <p className="text-white text-center font-semibold text-lg">
                          {isEnglish
                            ? "Click here to view images"
                            : "ಇಮೇಜ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ"}
                        </p>
                      </div> */}
                    </div>
                    {/* <h3 className="p-4 font-semibold text-gray-900">
                      {isEnglish ? card.heading.en : card.heading.kn}
                    </h3>
                    <button
                      onClick={() => toggleExpandCard(cardIndex)}
                      className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {expandedCardIndex === cardIndex
                        ? isEnglish
                          ? "Hide Images"
                          : "ಇಮೇಜ್‌ಗಳನ್ನು ಹೈಡ್ ಮಾಡಿ"
                        : isEnglish
                        ? "Click here to view images"
                        : "ಇಮೇಜ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ"}
                    </button> */}
                    <h3 className="p-4 font-semibold text-gray-900">
                      {isEnglish ? card.heading.en : card.heading.kn}
                    </h3>
                    <button
                      onClick={() => toggleExpandCard(cardIndex)}
                      className="mb-4 px-3 py-2 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto block"
                      style={{ maxWidth: "150px" }}
                    >
                      {expandedCardIndex === cardIndex
                        ? isEnglish
                          ? "Hide Images"
                          : "ಇಮೇಜ್‌ಗಳನ್ನು ಹೈಡ್ ಮಾಡಿ"
                        : isEnglish
                        ? "View Images"
                        : "ಇಮೇಜ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ"}
                    </button>

                    {/* Expandable Images List */}
                    {expandedCardIndex === cardIndex && (
                      <div className="px-4 pb-4 col-span-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {card.images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="cursor-pointer rounded overflow-hidden border hover:border-indigo-500"
                            onClick={() => openModal(imgIndex, card.images)}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-24 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* {activeTab === "videos" && (
              <div
                className="max-w-4xl mx-auto cursor-pointer"
                onClick={goFullscreen}
                title={
                  isEnglish ? "Click to fullscreen" : "ಪೂರ್ಣ ಪರದೆಯಲ್ಲಿ ತೋರಿ"
                }
                style={{ display: "inline-block" }}
              >
                <iframe
                  ref={iframeRef}
                  src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=735925022409049&show_text=0"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title="Facebook Video"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    width: "100%",
                    height: "315px",
                    maxWidth: "560px",
                  }}
                />
              </div>
            )} */}
            {activeTab === "videos" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      maxWidth: "1200px",
      margin: "0 auto",
      cursor: "pointer",
    }}
    onClick={goFullscreen}
    title={isEnglish ? "Click to fullscreen" : "ಪೂರ್ಣ ಪರದೆಯಲ್ಲಿ ತೋರಿ"}
  >
    {/* Repeat this block for each video iframe */}
    <div style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        src="/assets/vala/vala9.mp4"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="Facebook Video 1"
        style={{
          border: "none",
          overflow: "hidden",
          width: "100%",
          height: "315px",
          maxWidth: "560px",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
    <div style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        src="/assets/vala/vala8.mp4"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="Facebook Video 1"
        style={{
          border: "none",
          overflow: "hidden",
          width: "100%",
          height: "315px",
          maxWidth: "560px",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
    <div style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        src="/assets/vala/vala7.mp4"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="Facebook Video 1"
        style={{
          border: "none",
          overflow: "hidden",
          width: "100%",
          height: "315px",
          maxWidth: "560px",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
    <div style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        src="/assets/vala/reel2.mp4"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="Facebook Video 1"
        style={{
          border: "none",
          overflow: "hidden",
          width: "100%",
          height: "315px",
          maxWidth: "560px",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
    <div style={{ width: "100%" }}>
      <iframe
        ref={iframeRef}
        src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=735925022409049&show_text=0"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        title="Facebook Video 1"
        style={{
          border: "none",
          overflow: "hidden",
          width: "100%",
          height: "315px",
          maxWidth: "560px",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
    {/* Add more video iframe blocks here */}
  </div>
)}

          </div>
        </div>
      </div>

      {/* Modal / Lightbox */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            onClick={closeModal}
          >
            <X size={32} />
          </button>

          {/* Carousel Container */}
          <div
            className="relative w-full max-w-4xl h-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image/buttons
          >
            {/* Prev Button */}
            <button
              className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
              onClick={showPrevImage}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image Display */}
            <img
              src={currentImages[currentImageIndex].src}
              alt={currentImages[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Next Button */}
            <button
              className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
              onClick={showNextImage}
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default GalleryPage;
