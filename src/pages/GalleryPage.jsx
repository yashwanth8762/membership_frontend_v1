// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { API_BASE_URL } from '../../config';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLanguage } from '../reducers/user';

// const GalleryPage = () => {
//   const [images, setImages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value);
//   useEffect(() => {
//     if (user.language === undefined) {
//       dispatch(setLanguage(false));
//     }
//   }, [dispatch, user.language]);
//   const isEnglish = !!user.language;

//   // Fetch images from API
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}gallery`);
//         const formattedImages = (response.data || []).flatMap(item => 
//           (item.media || [])
//             .filter(mf => mf.image_url && mf.image_url.full && mf.image_url.full.high_res)
//             .map(mf => ({
//               src: `${API_BASE_URL}${mf.image_url.full.high_res}`,
//               alt: mf.name?.original || (isEnglish ? 'Gallery Image' : 'ಗ್ಯಾಲರಿ ಚಿತ್ರ')
//             }))
//         );
//         setImages(formattedImages);
//       } catch (error) {
//         console.error("Failed to fetch gallery images:", error);
//       }
//     };
//     fetchImages();
//   }, [isEnglish]);

//   const openModal = (index) => {
//     setCurrentImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const showNextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const showPrevImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   return (
//     <>
//       <Header theme='solid' />
//       <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="mt-30 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
//             {isEnglish ? 'Our Gallery' : 'ನಮ್ಮ ಗ್ಯಾಲರಿ'}
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
//             {isEnglish ? "Explore moments from our community events, activities, and celebrations. Our gallery captures the spirit and togetherness of our members." : "ನಮ್ಮ ಸಮುದಾಯದ ಕಾರ್ಯಕ್ರಮಗಳು, ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಹಬ್ಬಗಳ ಕ್ಷಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ನಮ್ಮ ಗ್ಯಾಲರಿ ಸದಸ್ಯರ ಒಗ್ಗಟ್ಟನ್ನು ಮತ್ತು ಆತ್ಮೀಯತೆಯನ್ನು ಹಿಡಿದಿಟ್ಟಿದೆ."}
//           </p>
//         </div>

//         {/* Image Grid */}
//         <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="group relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden cursor-pointer"
//               onClick={() => openModal(index)}
//             >
//               <img
//                 src={image.src}
//                 alt={image.alt}
//                 className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
//               />
//               <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
//                 <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{isEnglish ? 'View' : 'ನೋಡಿ'}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal / Lightbox */}
//       {isModalOpen && (
//         <div 
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
//           onClick={closeModal}
//         >
//           {/* Close Button */}
//           <button
//             className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
//             onClick={closeModal}
//           >
//             <X size={32} />
//           </button>
          
//           {/* Carousel Container */}
//           <div 
//             className="relative w-full max-w-4xl h-full max-h-[85vh] flex items-center justify-center"
//             onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image/buttons
//           >
//             {/* Prev Button */}
//             <button
//               className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
//               onClick={showPrevImage}
//             >
//               <ChevronLeft size={28} />
//             </button>
            
//             {/* Image Display */}
//             <img
//               src={images[currentImageIndex].src}
//               alt={images[currentImageIndex].alt}
//               className="max-w-full max-h-full object-contain rounded-lg"
//             />
            
//             {/* Next Button */}
//             <button
//               className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
//               onClick={showNextImage}
//             >
//               <ChevronRight size={28} />
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default GalleryPage;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { API_BASE_URL } from '../../config';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../reducers/user';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('photos');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);

  const isEnglish = !!user.language;

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}gallery`);
        const formattedImages = (response.data || []).flatMap((item) =>
          (item.media || [])
            .filter(
              (mf) =>
                mf.image_url &&
                mf.image_url.full &&
                mf.image_url.full.high_res
            )
            .map((mf) => ({
              src: `${API_BASE_URL}${mf.image_url.full.high_res}`,
              alt:
                mf.name?.original || (isEnglish ? 'Gallery Image' : 'ಗ್ಯಾಲರಿ ಚಿತ್ರ'),
            }))
        );
        setImages(formattedImages);
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
      }
    };
    fetchImages();
  }, [isEnglish]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <Header theme="solid" />
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="mt-30 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {isEnglish ? 'Our Gallery' : 'ನಮ್ಮ ಗ್ಯಾಲರಿ'}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            {isEnglish
              ? "Explore moments from our community events, activities, and celebrations. Our gallery captures the spirit and togetherness of our members."
              : 'ನಮ್ಮ ಸಮುದಾಯದ ಕಾರ್ಯಕ್ರಮಗಳು, ಚಟುವಟಿಕೆಗಳು ಮತ್ತು ಹಬ್ಬಗಳ ಕ್ಷಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ನಮ್ಮ ಗ್ಯಾಲರಿ ಸದಸ್ಯರ ಒಗ್ಗಟ್ಟನ್ನು ಮತ್ತು ಆತ್ಮೀಯತೆಯನ್ನು ಹಿಡಿದಿಟ್ಟಿದೆ.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4 border-b border-gray-300">
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === 'photos'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
              onClick={() => setActiveTab('photos')}
            >
              {isEnglish ? 'Photos' : 'ಚಿತ್ರಗಳು'}
            </button>
            <button
              className={`px-4 py-2 font-semibold ${
                activeTab === 'videos'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              {isEnglish ? 'Videos' : 'ವೀಡಿಯೊಗಳು'}
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'photos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        {isEnglish ? 'View' : 'ನೋಡಿ'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'videos' && (
              <div
                className="max-w-4xl mx-auto cursor-pointer"
                onClick={goFullscreen}
                title={isEnglish ? "Click to fullscreen" : "ಪೂರ್ಣ ಪರದೆಯಲ್ಲಿ ತೋರಿ"}
                style={{ display: 'inline-block' }}
              >
                <iframe
                  ref={iframeRef}
                  src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch/?v=735925022409049&show_text=0"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title="Facebook Video"
                  style={{ border: 'none', overflow: 'hidden', width: '100%', height: '315px', maxWidth: '560px' }}
                />
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
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
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

