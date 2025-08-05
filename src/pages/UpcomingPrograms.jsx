import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../reducers/user";
import Footer from "../components/Footer";

const UpcomingPrograms = () => {
  const [programs, setPrograms] = useState([]);
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
    axios.get(`${API_BASE_URL}upcommingprograms`)
      .then(response => {
        setPrograms(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching upcoming programs!", error);
      });
  }, []);

  return (
    <>
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
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
          <h2 className="text-3xl font-bold text-gray-800 ml-6">{isEnglish ? 'Notifications/Programs' : 'ಅಧಿಸೂಚನೆಗಳು/ಕಾರ್ಯಕ್ರಮಗಳು'}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => {
            let imageSrc = null;
            let imageAlt = isEnglish ? program.title : program.k_title;
            if (Array.isArray(program.media_file) && program.media_file.length > 0) {
              const firstImage = program.media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res);
              if (firstImage) {
                const fullUrl = firstImage.image_url.full.high_res;
                imageSrc = fullUrl.startsWith('http') ? fullUrl : `${API_BASE_URL}${fullUrl}`;
                imageAlt = firstImage.name?.original || (isEnglish ? program.title : program.k_title);
              }
            }
            const displayTitle = isEnglish ? program.title : program.k_title;
            const displayLocation = isEnglish ? program.location : program.k_location;
            const displayAbout = isEnglish ? program.about : program.k_about;
            const isLong = displayAbout && displayAbout.length > 120;
            return (
              <div key={idx} className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col overflow-hidden h-[430px] p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{displayTitle}</h3>
                {imageSrc ? (
                  <img src={imageSrc} alt={imageAlt} className="w-full h-48 object-cover object-center rounded-xl mb-4" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-xl text-gray-400 text-lg font-semibold mb-4">{isEnglish ? 'No Image' : 'ಯಾವುದೇ ಚಿತ್ರವಿಲ್ಲ'}</div>
                )}
                <div className="flex flex-col items-center mb-4 text-gray-600 text-sm">
                  {program.program_date && <div className="mb-1"><span className="font-semibold">{isEnglish ? 'Date:' : 'ದಿನಾಂಕ:'}</span> {new Date(program.program_date).toLocaleDateString()}</div>}
                  {displayLocation && <div className="mb-1"><span className="font-semibold">{isEnglish ? 'Location:' : 'ಸ್ಥಳ:'}</span> {displayLocation}</div>}
                  {program.program_time && <div><span className="font-semibold">{isEnglish ? 'Time:' : 'ಸಮಯ:'}</span> {new Date(`1970-01-01T${program.program_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                </div>
                <div className="text-gray-700 flex-1 overflow-hidden text-ellipsis text-center" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                  {displayAbout}
                </div>
                {isLong && (
                  <button
                    className="text-blue-600 underline text-sm mt-2 inline-block text-center"
                    style={{textDecoration: 'underline'}}
                    onClick={() => navigate(`/upcoming-programs/${program.id}`)}
                  >
                    {isEnglish ? 'Read more' : 'ಮತ್ತಷ್ಟು ಓದಿ'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default UpcomingPrograms;
