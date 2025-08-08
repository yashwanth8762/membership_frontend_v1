// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setLanguage } from "../reducers/user";
// import { NavLinks } from "../utils/constents";

// export default function Header({ theme = "transparent" }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(theme === "solid");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user.value);

//   // Default language is Kannada (false)
//   useEffect(() => {
//     if (user.language === undefined) {
//       dispatch(setLanguage(false));
//     }
//   }, [dispatch, user.language]);

//   const toggleLanguage = () => {
//     dispatch(setLanguage(!user.language));
//   };

//   useEffect(() => {
//     if (theme === 'solid') {
//       setScrolled(true);
//       return; // No scroll listener needed for solid theme
//     }

//     // For transparent theme, check initial scroll position and add listener
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Check on mount

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [theme]);

//   // Helper function to get the correct text based on language and link type
//   const getLinkText = (link) => {
//     if (user.language) {
//       return link.about_en || link.community_en || link.organization_en || link.activities_en || link.upcoming_en || link.gallery_en || link.contact_en;
//     } else {
//       return link.about_kn || link.community_kn || link.organization_kn || link.activities_kn || link.upcoming_kn || link.gallery_kn || link.contact_kn;
//     }
//   };

//   return (
//     <header
//       className={`fixed w-full z-50 transition-all duration-500 ${
//         scrolled
//           ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
//           : "bg-transparent"
//       }`}
//     >
//       {/* First Row - Logo1, Logo2, Language Toggle */}
//       <div className="w-full px-6 lg:px-8 py-2 lg:py-3">
//         {/* Mobile: 3 images spaced, Desktop: original layout */}
//         <div className="flex items-center justify-between w-full">
//           {/* Mobile: 3 images in a row with space-between, Desktop: original */}
//           <div className="flex w-full items-center justify-between lg:hidden gap-2">
//             {/* Logo 1 */}
//             <a href="/" className="flex items-center group">
//               <img
//                 src="/assets/logo1.png"
//                 alt="Logo 1"
//                 className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
//                 draggable="false"
//               />
//             </a>
//             {/* Banner */}
//             <a href="/" className="flex items-center group">
//               <img
//                 src="/assets/logo-banner.png"
//                 alt="Logo 2"
//                 className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
//                 draggable="false"
//               />
//             </a>
//             {/* Avatar: Matangi */}
//             <a href="/" className="flex items-center group">
//               <img
//                 src="/assets/matangi.jpeg"
//                 alt="Matanga Muni"
//                 className="h-12 w-12 rounded-full border-4 border-red-500 transition-transform duration-300 group-hover:scale-105 object-cover"
//                 draggable="false"
//               />
//             </a>
//             {/* Avatar: Jambava */}
//             <a href="/" className="flex items-center group">
//               <img
//                 src="/assets/jambava.jpeg"
//                 alt="Jambava"
//                 className="h-12 w-12 rounded-full border-4 border-red-500 transition-transform duration-300 group-hover:scale-105 object-cover"
//                 draggable="false"
//               />
//             </a>
//           </div>
//           {/* Desktop: original layout */}
//           <>
//             <div className="hidden lg:flex flex-shrink-0">
//               <a href="/" className="flex items-center group">
//                 <img
//                   src="/assets/logo1.png"
//                   alt="Logo 1"
//                   className="ml-32 h-20 w-auto transition-transform duration-300 group-hover:scale-105"
//                   draggable="false"
//                 />
//               </a>
//             </div>
//             <div className="hidden lg:flex flex-shrink-0">
//               <a href="/" className="flex items-center group">
//                 <img
//                   src="/assets/logo-banner.png"
//                   alt="Logo 2"
//                   className="w-auto h-24 transition-transform duration-300 group-hover:scale-105"
//                   draggable="false"
//                 />
//               </a>
//             </div>
//             <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
//               <div className="flex-shrink-0 flex items-center gap-4 mt-6">
//                 <a href="/" className="flex items-center group">
//                   <img
//                     src="/assets/matangi.jpeg"
//                     alt="Matanga Muni"
//                     className="w-20 h-20 rounded-full border-4 border-red-500 transition-transform duration-300 group-hover:scale-105 object-contain"
//                     draggable="false"
//                   />
//                 </a>
//                 <a href="/" className="flex items-center group">
//                   <img
//                     src="/assets/jambava.jpeg"
//                     alt="Jambava"
//                     className="w-20 h-20 rounded-full border-4 border-red-500 transition-transform duration-300 group-hover:scale-105 object-contain"
//                     draggable="false"
//                   />
//                 </a>
//               </div>
//               {/* Language Toggle */}
//               <div className="flex items-center space-x-3">
//                 <span className={`text-sm font-medium transition-colors duration-200 ${
//                   scrolled 
//                     ? (!user.language ? 'text-gray-900' : 'text-gray-500') 
//                     : 'text-white'
//                 }`}>
//                   ಕನ್ನಡ
//                 </span>
//                 <button
//                   onClick={toggleLanguage}
//                   className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md"
//                   style={{ backgroundColor: user.language ? '#3b82f6' : '#6b7280' }}
//                 >
//                   <span className="sr-only">Toggle language</span>
//                   <span
//                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
//                       user.language ? 'translate-x-6' : 'translate-x-1'
//                     }`}
//                   />
//                 </button>
//                 <span className={`text-sm font-medium transition-colors duration-200 ${
//                   scrolled 
//                     ? (user.language ? 'text-gray-900' : 'text-gray-500') 
//                     : 'text-white'
//                 }`}>
//                   English
//                 </span>
//               </div>
//             </div>
//           </>
//         </div>
//       </div>

//       {/* Second Row - Navigation Menu */}
//       <div className="w-full px-6 lg:px-8 py-2 lg:py-3 border-t border-gray-200/20">
//         <div className="flex items-center justify-between">
//           {/* Desktop Navigation - Center */}
//           <div className="hidden lg:flex flex-1 justify-center">
//             <ul className="flex items-center space-x-8 lg:space-x-10">
//               {NavLinks.map((link, index) => (
//                 <li key={link.href}>
//                   <a
//                     href={link.href}
//                     className={`font-medium text-sm lg:text-base transition-all duration-300 relative group ${
//                       scrolled
//                         ? "text-gray-700 hover:text-blue-600"
//                         : "text-white hover:text-blue-200"
//                     }`}
//                   >
//                     {getLinkText(link)}
//                     <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
//                       scrolled ? "bg-blue-600" : "bg-white"
//                     }`}></span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Desktop Action Buttons - Right */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {/* Membership Button */}
//             <button
//               onClick={() => navigate("/userMembership")}
//               className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
//                 scrolled
//                   ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
//                   : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50"
//               }`}
//             >
//               {user.language ? 'Get Membership' : 'ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ'}
//             </button>

//             {/* Donation Button */}
//             <button
//               onClick={() => navigate("/donate")}
//               className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
//                 scrolled
//                   ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
//                   : "bg-green-500/80 text-white hover:bg-green-500 backdrop-blur-sm border border-green-400/30 hover:border-green-400/50"
//               }`}
//             >
//               {user.language ? 'Donate' : 'ದಾನ'}
//             </button>
//           </div>

//           {/* Hamburger Button (Mobile) */}
//           <button
//             className={`lg:hidden inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
//               scrolled
//                 ? "hover:bg-gray-100 text-gray-800"
//                 : "hover:bg-white/20 text-white"
//             }`}
//             aria-label="Open Menu"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <svg
//               width={24}
//               height={24}
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth={2.2}
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="transition-transform duration-200"
//             >
//               {menuOpen ? (
//                 <path d="M18 6 6 18M6 6l12 12" />
//               ) : (
//                 <>
//                   <line x1="3" y1="7" x2="21" y2="7" />
//                   <line x1="3" y1="12" x2="21" y2="12" />
//                   <line x1="3" y1="17" x2="21" y2="17" />
//                 </>
//               )}
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Slide-out Menu */}
//       <div
//         className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-40 transform transition-all duration-300 ease-in-out ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         } lg:hidden`}
//         style={{
//           boxShadow: menuOpen
//             ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
//             : undefined,
//         }}
//       >
//         {/* Mobile Menu Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//           {/* <div className="flex items-center space-x-3">
//             <img
//               src="/assets/logo1.png"
//               alt="Logo 1"
//               className="h-12 w-auto"
//               draggable="false"
//             />
//             <img
//               src="/assets/logo2.png"
//               alt="Logo 2"
//               className="h-12 w-auto"
//               draggable="false"
//             />
//           </div> */}
//           <button 
//             onClick={() => setMenuOpen(false)} 
//             aria-label="Close Menu"
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//           >
//             <svg
//               width={24}
//               height={24}
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               fill="none"
//             >
//               <path
//                 d="M18 6 6 18M6 6l12 12"
//                 strokeWidth={2.2}
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation Links */}
//         <div className="flex-1 overflow-y-auto">
//           <ul className="flex flex-col py-6 space-y-2 px-6">
//             {NavLinks.map((link, index) => (
//               <li key={link.href}>
//                 <a
//                   href={link.href}
//                   className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {getLinkText(link)}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Action Buttons */}
//           <div className="px-6 py-4 space-y-3">
//             <button
//               onClick={() => {
//                 navigate("/userMembership");
//                 setMenuOpen(false);
//               }}
//               className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
//             >
//               {user.language ? 'Get Membership' : 'ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ'}
//             </button>
            
//             <button
//               onClick={() => {
//                 navigate("/donation");
//                 setMenuOpen(false);
//               }}
//               className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
//             >
//               {user.language ? 'Donate' : 'ದಾನ'}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Language Toggle */}
//         <div className="border-t border-gray-100 px-6 py-4">
//           <div className="flex items-center justify-center space-x-3">
//             <span className="text-sm font-medium text-gray-600">ಕನ್ನಡ</span>
//             <button
//               onClick={toggleLanguage}
//               className="relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               style={{ backgroundColor: user.language ? '#3b82f6' : '#6b7280' }}
//             >
//               <span className="sr-only">Toggle language</span>
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
//                   user.language ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//             <span className="text-sm font-medium text-gray-600">English</span>
//           </div>
//         </div>
//       </div>

//       {/* Overlay to close menu */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}
//     </header>
//   );
// }
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLanguage } from "../reducers/user";
import { NavLinks } from "../utils/constents";

export default function Header({ theme = "transparent" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(theme === "solid");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  // Default language is Kannada (false)
  useEffect(() => {
    if (user.language === undefined) {
      dispatch(setLanguage(false));
    }
  }, [dispatch, user.language]);

  const toggleLanguage = () => {
    dispatch(setLanguage(!user.language));
  };

  useEffect(() => {
    if (theme === "solid") {
      setScrolled(true);
      return; // No scroll listener needed for solid theme
    }

    // For transparent theme, check initial scroll position and add listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  // Helper function to get the correct text based on language and link type
  const getLinkText = (link) => {
    if (user.language) {
      return (
        link.about_en ||
        link.community_en ||
        link.organization_en ||
        link.opportunities_en ||
        link.activities_en ||
        link.upcoming_en ||
        link.gallery_en ||
        link.contact_en
      );
    } else {
      return (
        link.about_kn ||
        link.community_kn ||
        link.organization_kn ||
        link.opportunities_kn ||
        link.activities_kn ||
        link.upcoming_kn ||
        link.gallery_kn ||
        link.contact_kn
      );
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      {/* First Row - Logo1, Logo2, Language Toggle */}
      <div className="w-full px-6 lg:px-8 py-2 lg:py-3">
        {/* Mobile: 3 images spaced, Desktop: original layout */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile: 3 images in a row with space-between, Desktop: original */}
          <div className="flex w-full items-center justify-between lg:hidden gap-2">
            {/* Logo 1 */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/logo1.png"
                alt="Logo 1"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable="false"
              />
            </a>
            {/* Banner */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/logo-banner.png"
                alt="Logo 2"
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable="false"
              />
            </a>

          </div>
          {/* Desktop: original layout */}
          <>
            <div className="hidden lg:flex flex-shrink-0">
              <a href="/" className="flex items-center group">
                <img
                  src="/assets/logo1.png"
                  alt="Logo 1"
                  className="ml-32 h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                  draggable="false"
                />
              </a>
            </div>
            <div className="hidden lg:flex flex-shrink-0">
              <a href="/" className="flex items-center group">
                <img
                  src="/assets/logo-banner.png"
                  alt="Logo 2"
                  className="w-auto h-24 transition-transform duration-300 group-hover:scale-105"
                  draggable="false"
                />
              </a>
            </div>
            <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
              <div className="flex-shrink-0 flex items-center gap-4 mt-6">
                
              </div>
              {/* Language Toggle */}
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    scrolled
                      ? !user.language
                        ? "text-gray-900"
                        : "text-gray-500"
                      : "text-white"
                  }`}
                >
                  ಕನ್ನಡ
                </span>
                <button
                  onClick={toggleLanguage}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md"
                  style={{
                    backgroundColor: user.language ? "#3b82f6" : "#6b7280",
                  }}
                >
                  <span className="sr-only">Toggle language</span>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                      user.language ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    scrolled
                      ? user.language
                        ? "text-gray-900"
                        : "text-gray-500"
                      : "text-white"
                  }`} 
                >
                  English
                </span>
              </div>
            </div>
          </>
        </div>
      </div>

      {/* Second Row - Navigation Menu */}
      <div className="w-full px-6 lg:px-8 py-2 lg:py-3 border-t border-gray-200/20">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8 lg:space-x-10">
              {NavLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`font-medium text-sm lg:text-base transition-all duration-300 relative group ${
                      scrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white hover:text-blue-200"
                    }`}
                  >
                    {getLinkText(link)}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
                        scrolled ? "bg-blue-600" : "bg-white"
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Action Buttons - Right */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Membership Button */}
            
            <button
              onClick={() => navigate("/userMembership")}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-110 active:scale-95 relative overflow-hidden animate-bounce ${
                scrolled
                  ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-2xl"
                  : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-2xl"
              }`}
              style={{
                // boxShadow: scrolled
                //   ? "0 0 30px rgba(236, 72, 153, 1), 0 0 60px rgba(239, 68, 68, 0.8), 0 0 90px rgba(245, 158, 11, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)"
                //   : "0 0 30px rgba(34, 211, 238, 1), 0 0 60px rgba(59, 130, 246, 0.8), 0 0 90px rgba(147, 51, 234, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)",
                animation:
                  "flash 0.5s infinite alternate, rainbow 2s linear infinite",
              }}
            >
              <span className="relative z-10 drop-shadow-lg animate-pulse">
                {user.language ? "GET MEMBERSHIP" : "ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ"}
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 opacity-50 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-blue-400 to-green-400 opacity-30 animate-spin"></div>
            </button>
            {/* Donation Button */}
            
            <button
              onClick={() => navigate("/donate")}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-110 active:scale-95 relative overflow-hidden animate-pulse ${
                scrolled
                  ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white shadow-2xl"
                  : "bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 text-white shadow-2xl"
              }`}
              style={{
                // boxShadow: scrolled
                //   ? "0 0 25px rgba(34, 197, 94, 1), 0 0 50px rgba(16, 185, 129, 0.9), 0 0 75px rgba(20, 184, 166, 0.7), 0 0 100px rgba(34, 197, 94, 0.5)"
                //   : "0 0 25px rgba(132, 204, 22, 1), 0 0 50px rgba(34, 197, 94, 0.9), 0 0 75px rgba(16, 185, 129, 0.7), 0 0 100px rgba(132, 204, 22, 0.5)",
                animation:
                  "neonGlow 1s ease-in-out infinite alternate, shake 0.3s ease-in-out infinite",
              }}
            >
              <span className="relative z-10 drop-shadow-xl animate-bounce text-shadow">
                {user.language ? "DONATE NOW" : "ದಾನ ಮಾಡಿ"}
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-300 via-lime-400 to-emerald-300 opacity-60 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-green-400 to-teal-400 opacity-20 animate-ping"></div>
              <div
                className="absolute inset-0 rounded-full border-2 border-green-300 animate-spin"
                style={{
                  borderImage:
                    "linear-gradient(45deg, #10b981, #84cc16, #22c55e, #059669) 1",
                  animation: "borderSpin 2s linear infinite",
                }}
              ></div>
            </button>
          </div>

          {/* Hamburger Button (Mobile) */}
          <button
            className={`lg:hidden inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? "hover:bg-gray-100 text-gray-800"
                : "hover:bg-white/20 text-white"
            }`}
            aria-label="Open Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200"
            >
              {menuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-[60] transform transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
        style={{
          backgroundColor: "#ffffff", // Force white background
          boxShadow: menuOpen
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : undefined,
        }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path
                d="M18 6 6 18M6 6l12 12"
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-y-auto bg-white">
          <ul className="flex flex-col py-6 space-y-2 px-6">
            {NavLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-gray-700 text-lg font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {getLinkText(link)}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Action Buttons */}
          <div className="px-6 py-4 space-y-3 bg-white">
            
            <button
              onClick={() => {
                navigate("/userMembership");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg font-bold hover:from-yellow-400 hover:via-pink-500 hover:to-red-500 transition-all duration-200 shadow-2xl relative overflow-hidden animate-bounce"
              style={{
                boxShadow:
                  "0 0 40px rgba(236, 72, 153, 1), 0 0 80px rgba(239, 68, 68, 0.8), 0 0 120px rgba(245, 158, 11, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)",
                animation:
                  "flash 0.5s infinite alternate, rainbow 2s linear infinite",
              }}
            >
              <span className="relative z-10 drop-shadow-lg animate-pulse text-lg">
                {user.language ? "GET MEMBERSHIP" : "ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ"}
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 opacity-50 animate-ping"></div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400 via-blue-400 to-green-400 opacity-30 animate-spin"></div>
            </button>
            
            <button
              onClick={() => {
                navigate("/donation");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white rounded-lg font-bold hover:from-lime-400 hover:via-green-500 hover:to-emerald-500 transition-all duration-300 shadow-2xl relative overflow-hidden animate-pulse"
              style={{
                // boxShadow:
                //   "0 0 30px rgba(34, 197, 94, 1), 0 0 60px rgba(16, 185, 129, 0.9), 0 0 90px rgba(20, 184, 166, 0.7), 0 0 120px rgba(34, 197, 94, 0.5)",
                animation:
                  "neonGlow 1s ease-in-out infinite alternate, shake 0.3s ease-in-out infinite",
              }}
            >
              <span className="relative z-10 drop-shadow-xl animate-bounce text-lg">
                💰 {user.language ? "🔥 DONATE NOW 🔥" : "🔥 ದಾನ ಮಾಡಿ 🔥"} 💸
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-300 via-lime-400 to-emerald-300 opacity-60 animate-pulse"></div>
              <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 opacity-20 animate-ping"></div>
              <div
                className="absolute inset-0 rounded-lg border-2 border-green-300"
                style={{
                  animation: "borderSpin 2s linear infinite",
                }}
              ></div>
            </button>
          </div>
        </div>

        {/* Mobile Language Toggle */}
        <div className="border-t border-gray-100 px-6 py-4 bg-white">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-sm font-medium text-gray-600">ಕನ್ನಡ</span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: user.language ? "#3b82f6" : "#6b7280" }}
            >
              <span className="sr-only">Toggle language</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                  user.language ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-600">English</span>
          </div>
        </div>
      </div>

      {/* Overlay to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <style jsx>{`
        @keyframes flash {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(2) saturate(2);
          }
        }

        @keyframes rainbow {
          0% {
            filter: hue-rotate(0deg);
          }
          25% {
            filter: hue-rotate(90deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
          75% {
            filter: hue-rotate(270deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
      <style jsx>{`
        @keyframes flash {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(2) saturate(2);
          }
        }

        @keyframes rainbow {
          0% {
            filter: hue-rotate(0deg);
          }
          25% {
            filter: hue-rotate(90deg);
          }
          50% {
            filter: hue-rotate(180deg);
          }
          75% {
            filter: hue-rotate(270deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
      <style>
        {`
  @keyframes neonGlow {
    0% { 
      filter: brightness(1) saturate(1.5) drop-shadow(0 0 10px rgba(34, 197, 94, 0.8)); 
    }
    100% { 
      filter: brightness(1.8) saturate(2.5) drop-shadow(0 0 20px rgba(34, 197, 94, 1)); 
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-1px) rotate(-0.5deg); }
    75% { transform: translateX(1px) rotate(0.5deg); }
  }
  
  @keyframes borderSpin {
    0% { 
      border-color: #10b981; 
      transform: rotate(0deg); 
    }
    25% { 
      border-color: #84cc16; 
      transform: rotate(90deg); 
    }
    50% { 
      border-color: #22c55e; 
      transform: rotate(180deg); 
    }
    75% { 
      border-color: #059669; 
      transform: rotate(270deg); 
    }
    100% { 
      border-color: #10b981; 
      transform: rotate(360deg); 
    }
  }
`}
      </style>
    </header>
  );
}