import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";

// const activities = [
//   {
//     title: "Annual Community Festival",
//     description:
//       "A day of celebration with music, food, and activities for all ages.",
//     image:
//       "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Youth Leadership Workshop",
//     description:
//       "Empowering young leaders with essential skills and knowledge.",
//     image:
//       "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Health & Wellness Fair",
//     description:
//       "Free health checkups, fitness classes, and wellness seminars.",
//     image:
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Cultural Night",
//     description:
//       "Experience diverse performances, art, and traditional cuisine.",
//     image:
//       "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Environmental Workshop",
//     description:
//       "Learn about sustainability and participate in eco-friendly activities.",
//     image:
//       "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Senior Citizens' Meet",
//     description:
//       "Special gathering for our senior members with lunch and entertainment.",
//     image:
//       "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//   },
// ];

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);
  const isEnglish = !!user.language;

  const getActivities = () => {
    axios
      .get(`${API_BASE_URL}activity`)
      .then((response) => {
        setActivities(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the activities!", error);
      });
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
        {isEnglish ? "Activities" : "ಚಟುವಟಿಕೆಗಳು"}
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
        {isEnglish
          ? "Discover a variety of engaging activities designed to bring our community together, foster learning, and celebrate our shared values."
          : "ನಮ್ಮ ಸಮುದಾಯವನ್ನು ಒಟ್ಟುಗೂಡಿಸಲು, ಕಲಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಮತ್ತು ನಮ್ಮ ಹಂಚಿಕೊಂಡ ಮೌಲ್ಯಗಳನ್ನು ಆಚರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ವಿವಿಧ ಆಕರ್ಷಕ ಚಟುವಟಿಕೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ."}
      </p>
      <div className="flex justify-end mb-6 max-w-6xl mx-auto">
        <a
          onClick={() => window.location.href = '/activities'}
          className="cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm"
        >
          {isEnglish ? "View More >" : "ಮತ್ತಷ್ಟು ನೋಡಿ >"}
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {activities.slice(0, 3).map((activity, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden h-[400px] pb-6"
          >
            {/* Main image or placeholder */}
            {Array.isArray(activity.media_file) && activity.media_file.length > 0 && activity.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res) ? (
              (() => {
                const firstImage = activity.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res);
                const fullUrl = firstImage.image_url.full.high_res;
                const mainImgSrc = fullUrl.startsWith('http') ? fullUrl : `${API_BASE_URL}${fullUrl}`;
                return (
                    <img
                      src={mainImgSrc}
                      alt={firstImage.name?.original || 'media'}
                      className="w-full h-48 object-cover object-center rounded-t-2xl"
                    />
                );
              })()
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-2xl text-gray-400 text-lg font-semibold">
                No Image
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {isEnglish ? activity.title : activity.k_title}
              </h3>
              <p className="text-gray-600 flex-1 overflow-hidden text-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                {isEnglish ? activity.about : activity.k_about}
              </p>
              {(isEnglish ? activity.about : activity.k_about) && (isEnglish ? activity.about : activity.k_about).length > 120 && (
                <button
                  className="text-blue-600 underline text-sm mt-2 inline-block cursor-pointer"
                  style={{textDecoration: 'underline'}}
                  onClick={() => navigate(`/activities/${activity.id}`)}
                >
                  {isEnglish ? "Read more" : "ಮತ್ತಷ್ಟು ಓದಿ"}
                </button>
              )}
              {/* Other media (PDF, video, etc) */}
              {Array.isArray(activity.media_file) && activity.media_file.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {activity.media_file.map((media, i) => {
                    if (
                      media.image_url &&
                      media.image_url.thumbnail &&
                      media.image_url.thumbnail.high_res &&
                      activity.media_file.findIndex(m => m.image_url && m.image_url.thumbnail && m.image_url.thumbnail.high_res) === i
                    ) {
                      return null;
                    }
                    if (media.image_url && media.image_url.thumbnail && media.image_url.thumbnail.high_res) {
                      return (
                        <a key={i} href={`${API_BASE_URL}${media.image_url.full.high_res}`} target="_blank" rel="noopener noreferrer">
                          <img src={`${API_BASE_URL}${media.image_url.thumbnail.high_res}`} alt={media.name?.original || 'media'} className="w-12 h-12 object-cover rounded border border-gray-200" />
                        </a>
                      );
                    }
                    if (media.doc_url) {
                      return (
                        <a key={i} href={`${API_BASE_URL}${media.doc_url}`} target="_blank" rel="noopener noreferrer" className="text-indigo-500 font-medium border border-indigo-100 rounded px-2 py-1 text-xs bg-indigo-50">PDF</a>
                      );
                    }
                    if (media.video_url && (media.video_url.video?.high_res || media.video_url.video?.low_res)) {
                      return (
                        <span key={i} className="text-cyan-500 font-medium border border-cyan-100 rounded px-2 py-1 text-xs bg-cyan-50">{isEnglish ? 'Video' : 'ವೀಡಿಯೊ'}</span>
                      );
                    }
                    return <span key={i} className="text-gray-400 border border-gray-100 rounded px-2 py-1 text-xs bg-gray-50">{isEnglish ? 'Media' : 'ಮಾಧ್ಯಮ'}</span>;
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
