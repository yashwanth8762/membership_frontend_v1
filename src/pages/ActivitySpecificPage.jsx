/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";

const ActivitySpecificPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);
  const isEnglish = !!user.language;

  useEffect(() => {
    axios.get(`${API_BASE_URL}activity/${id}`)
      .then((response) => {
        setActivity(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(isEnglish ? "Error fetching activity details!" : "ಚಟುವಟಿಕೆ ವಿವರಗಳನ್ನು ತರಲು ದೋಷವಾಗಿದೆ!");
        setLoading(false);
      });
  }, [id, isEnglish]);

  if (loading) return <div className="text-center py-12">{isEnglish ? "Loading..." : "ಲೋಡ್ ಆಗುತ್ತಿದೆ..."}</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!activity) return <div className="text-center py-12">{isEnglish ? "No activity found." : "ಯಾವುದೇ ಚಟುವಟಿಕೆ ಕಂಡುಬಂದಿಲ್ಲ."}</div>;

  return (
    <>
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <article className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width={18} height={18} className="inline-block">
              <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
            </svg>
            {isEnglish ? 'Back' : 'ಹಿಂದೆ'}
          </button>
        </div>
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{isEnglish ? activity.title : activity.k_title}</h1>
          {activity.program_date && (
            <p className="text-gray-500 text-lg mb-2"><span className="font-semibold">{isEnglish ? 'Date:' : 'ದಿನಾಂಕ:'}</span> {new Date(activity.program_date).toLocaleDateString()}</p>
          )}
          {activity.location && (
            <p className="text-gray-500 text-lg mb-2"><span className="font-semibold">{isEnglish ? 'Location:' : 'ಸ್ಥಳ:'}</span> {activity.location}</p>
          )}
          {activity.program_time && (
            <p className="text-gray-500 text-lg mb-2"><span className="font-semibold">{isEnglish ? 'Time:' : 'ಸಮಯ:'}</span> {new Date(`1970-01-01T${activity.program_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          )}
        </header>
        {Array.isArray(activity.media_file) && activity.media_file.length > 0 && activity.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res) ? (
          (() => {
            const firstImage = activity.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res);
            const fullUrl = firstImage.image_url.full.high_res;
            const mainImgSrc = fullUrl.startsWith('http') ? fullUrl : `${API_BASE_URL}${fullUrl}`;
            return (
              <img src={mainImgSrc} alt={firstImage.name?.original || 'media'} className="w-full h-80 object-cover object-center rounded-2xl mb-8 shadow-lg" />
            );
          })()
        ) : (
          <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-2xl text-gray-400 text-lg font-semibold mb-8">{isEnglish ? 'No Image' : 'ಯಾವುದೇ ಚಿತ್ರವಿಲ್ಲ'}</div>
        )}
        <section className="prose prose-lg max-w-none text-gray-800 mb-8">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'About this Activity' : 'ಈ ಚಟುವಟಿಕೆ ಬಗ್ಗೆ'}</h2>
          <p>{isEnglish ? activity.about : activity.k_about}</p>
        </section>
        {/* Other media (PDF, video, etc) */}
        {/* {Array.isArray(activity.media_file) && activity.media_file.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Related Media</h3>
            <div className="flex flex-wrap gap-3">
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
                      <img src={`${API_BASE_URL}${media.image_url.thumbnail.high_res}`} alt={media.name?.original || 'media'} className="w-16 h-16 object-cover rounded border border-gray-200 shadow" />
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
                    <span key={i} className="text-cyan-500 font-medium border border-cyan-100 rounded px-2 py-1 text-xs bg-cyan-50">Video</span>
                  );
                }
                return <span key={i} className="text-gray-400 border border-gray-100 rounded px-2 py-1 text-xs bg-gray-50">Media</span>;
              })}
            </div>
          </section>
        )} */}
      </article>
    </section>
    <Footer />
    </>
  );
};

export default ActivitySpecificPage;
