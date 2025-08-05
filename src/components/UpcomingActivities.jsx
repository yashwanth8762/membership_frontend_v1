import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../reducers/user';

const ActivityCard = ({ title, k_title, program_date, location, k_location, program_time, about, k_about, media_file, id, isEnglish }) => {
  const navigate = useNavigate();
  // Find the first valid image in media_file
  let imageSrc = null;
  let imageAlt = isEnglish ? title : k_title;
  if (Array.isArray(media_file) && media_file.length > 0) {
    const firstImage = media_file.find(media => media.image_url && media.image_url.full && media.image_url.full.high_res);
    if (firstImage) {
      const fullUrl = firstImage.image_url.full.high_res;
      imageSrc = fullUrl.startsWith('http') ? fullUrl : `${API_BASE_URL}${fullUrl}`;
      imageAlt = firstImage.name?.original || (isEnglish ? title : k_title);
    }
  }
  const displayTitle = isEnglish ? title : k_title;
  const displayLocation = isEnglish ? location : k_location;
  const displayAbout = isEnglish ? about : k_about;
  const isLong = displayAbout && displayAbout.length > 120;
  return (
    <div className="w-[350px] mb-2 p-4 pb-8 mx-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-[500px] flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{displayTitle}</h3>
        <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
          {imageSrc ? (
            <img 
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-semibold text-lg">{isEnglish ? 'No Image' : 'ಯಾವುದೇ ಚಿತ್ರವಿಲ್ಲ'}</div>
          )}
        </div>
        <div className="space-y-2 text-gray-600">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {program_date? new Date(program_date).toLocaleDateString() : 'N/A'}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {displayLocation}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {program_time? new Date(`1970-01-01T${program_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
          </p>
          <div className="text-gray-500">
            {isLong ? (
              <>
                <span className="overflow-hidden text-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                  {displayAbout}
                </span>
                <span>... </span>
                <button
                  className="text-blue-600 underline text-sm ml-1 cursor-pointer"
                  style={{textDecoration: 'underline'}}
                  onClick={() => navigate(`/upcoming-programs/${id}`)}
                >
                  {isEnglish ? 'Read more' : 'ಮತ್ತಷ್ಟು ಓದಿ'}
                </button>
              </>
            ) : (
              <span>{displayAbout}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingActivities = () => {
  const [activities, setActivities] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);
  const isEnglish = !!user.language;

  const getUpcomgPrograms = () => {
    axios.get(`${API_BASE_URL}upcommingprograms`)
      .then(response => {
        setActivities(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });
  }

  useEffect(()=>{
    getUpcomgPrograms();
  },[]);

  return (
    <section className="w-full py-12 overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">{isEnglish ? "Notifications/Programs" : "ಅಧಿಸೂಚನೆಗಳು/ಕಾರ್ಯಕ್ರಮಗಳು"}</h2>
      <div className="max-w-7xl mx-auto flex justify-end mb-8 px-4">
        <button
          className="cursor-pointer inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm"
          onClick={() => window.location.href = '/upcoming-programs'}
        >
          {isEnglish ? "View More >" : "ಮತ್ತಷ್ಟು ನೋಡಿ >"}
        </button>
      </div>
      <Marquee
        gradient={true}
        speed={40}
        pauseOnHover={true}
      >
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} isEnglish={isEnglish} />
        ))}
      </Marquee>
    </section>
  )
}

export default UpcomingActivities;
