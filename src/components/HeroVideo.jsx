import React from "react";
import { useSelector } from "react-redux";

const HeroVideo = () => {
    const user = useSelector((state) => state.user.value);
    const isEnglish = !!user.language;
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
      {isEnglish ? `President's Message`  :'ಅಧ್ಯಕ್ಷರ ಸಂದೇಶ'}
      </h1>

      <div className="w-full max-w-3xl aspect-video">
        <video
          className="w-full h-full rounded-lg shadow-lg"
          controls
        >
          <source src="assets/hero2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroVideo;
