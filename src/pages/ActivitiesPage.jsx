import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";

const ActivitiesPage = () => {
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

  useEffect(() => {
    axios.get(`${API_BASE_URL}activity`)
      .then((response) => {
        setActivities(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching activities!", error);
      });
  }, []);

  const handleReadMore = (id) => {
    navigate(`/activities/${id}`);
  };

  return (
    <>
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
            onClick={() => window.location.href = '/'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width={18} height={18} className="inline-block">
              <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
            </svg>
            {isEnglish ? 'Back' : 'ಹಿಂದೆ'}
          </button>
          <h2 className="text-3xl font-bold text-gray-800 ml-6">{isEnglish ? 'Activities' : 'ಚಟುವಟಿಕೆಗಳು'}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div key={activity._id} className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden h-[400px] pb-6">
              {Array.isArray(activity.media_file) && activity.media_file.length > 0 && activity.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res) ? (
                (() => {
                  const firstImage = activity.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res);
                  const fullUrl = firstImage.image_url.full.high_res;
                  const mainImgSrc = fullUrl.startsWith('http') ? fullUrl : `${API_BASE_URL}${fullUrl}`;
                  return (
                    <a href={mainImgSrc} target="_blank" rel="noopener noreferrer">
                      <img src={mainImgSrc} alt={firstImage.name?.original || 'media'} className="w-full h-48 object-cover object-center rounded-t-2xl" />
                    </a>
                  );
                })()
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-2xl text-gray-400 text-lg font-semibold">No Image</div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{isEnglish ? activity.title : activity.k_title}</h3>
                <>
                  <p className="text-gray-600 flex-1 overflow-hidden text-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                    {isEnglish ? activity.about : activity.k_about}
                  </p>
                  {(isEnglish ? activity.about : activity.k_about) && (isEnglish ? activity.about : activity.k_about).length > 120 && (
                    <button
                      className="text-blue-600 underline text-sm mt-2 self-start"
                      style={{textDecoration: 'underline'}}
                      onClick={() => handleReadMore(activity.id)}
                    >
                      {isEnglish ? 'Read more' : 'ಮತ್ತಷ್ಟು ಓದಿ'}
                    </button>
                  )}
                </>
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
      </div>
    </section>
    <Footer />
    </>
  );
};

export default ActivitiesPage;
