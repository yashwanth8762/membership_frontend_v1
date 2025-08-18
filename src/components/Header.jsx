
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
//     if (theme === "solid") {
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
//       return (
//         link.about_en ||
//         link.community_en ||
//         link.organization_en ||
//         link.opportunities_en ||
//         link.activities_en ||
//         link.upcoming_en ||
//         link.gallery_en ||
//         link.contact_en
//       );
//     } else {
//       return (
//         link.about_kn ||
//         link.community_kn ||
//         link.organization_kn ||
//         link.opportunities_kn ||
//         link.activities_kn ||
//         link.upcoming_kn ||
//         link.gallery_kn ||
//         link.contact_kn
//       );
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
//       <div className="w-full px-4 lg:px-6 xl:px-8 py-2 lg:py-3">
//         <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
//           {/* Mobile Layout */}
//           <div className="flex w-full items-center justify-between lg:hidden gap-2">
//             {/* Logo 1 */}
//             <a href="/" className="flex items-center group">
//               <img
//                 src="/assets/logo1.png"
//                 alt="Logo 1"
//                 className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
//                 draggable="false"
//               />
//             </a>
//             {/* Banner */}
//             <a href="/" className="flex items-center group">
//               <img
//                 src="/assets/logo-banner.png"
//                 alt="Logo 2"
//                 className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
//                 draggable="false"
//               />
//             </a>
//           </div>

//           {/* Desktop Layout */}
//           <>
//             <div className="hidden lg:flex flex-shrink-0">
//               <a href="/" className="flex items-center group">
//                 <img
//                   src="/assets/logo1.png"
//                   alt="Logo 1"
//                   className="h-16 xl:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
//                   draggable="false"
//                 />
//               </a>
//             </div>
//             <div className="hidden lg:flex flex-shrink-0">
//               <a href="/" className="flex items-center group">
//                 <img
//                   src="/assets/logo-banner.png"
//                   alt="Logo 2"
//                   className="w-auto h-20 xl:h-24 transition-transform duration-300 group-hover:scale-105"
//                   draggable="false"
//                 />
//               </a>
//             </div>
//             <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
//               {/* Language Toggle */}
//               <div className="flex items-center space-x-2">
//                 <span
//                   className={`text-xs xl:text-sm font-medium transition-colors duration-200 ${
//                     scrolled
//                       ? !user.language
//                         ? "text-gray-900"
//                         : "text-gray-500"
//                       : "text-white"
//                   }`}
//                 >
//                   ಕನ್ನಡ
//                 </span>
//                 <button
//                   onClick={toggleLanguage}
//                   className="relative inline-flex h-5 xl:h-6 w-9 xl:w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md"
//                   style={{
//                     backgroundColor: user.language ? "#3b82f6" : "#6b7280",
//                   }}
//                 >
//                   <span className="sr-only">Toggle language</span>
//                   <span
//                     className={`inline-block h-3 xl:h-4 w-3 xl:w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
//                       user.language ? "translate-x-5 xl:translate-x-6" : "translate-x-1"
//                     }`}
//                   />
//                 </button>
//                 <span
//                   className={`text-xs xl:text-sm font-medium transition-colors duration-200 ${
//                     scrolled
//                       ? user.language
//                         ? "text-gray-900"
//                         : "text-gray-500"
//                       : "text-white"
//                   }`} 
//                 >
//                   English
//                 </span>
//               </div>
//             </div>
//           </>
//         </div>
//       </div>

//       {/* Second Row - Navigation Menu */}
//       <div className="w-full px-4 lg:px-6 xl:px-8 py-2 lg:py-3 border-t border-gray-200/20">
//         <div className="flex items-center justify-between w-full">
//           {/* Desktop Navigation - Full width layout */}
//           <div className="hidden lg:flex items-center justify-between w-full">
//             {/* Left spacer */}
//             <div className="flex-shrink-0 w-20"></div>
            
//             {/* Navigation Links - Center */}
//             <div className="flex-1 flex justify-center">
//               <ul className="flex items-center space-x-2 lg:space-x-3 xl:space-x-4 2xl:space-x-6">
//                 {NavLinks.map((link, index) => (
//                   <li key={link.href}>
//                     <a
//                       href={link.href}
//                       className={`font-medium text-xs lg:text-sm xl:text-sm 2xl:text-base transition-all duration-300 relative group whitespace-nowrap ${
//                         scrolled
//                           ? "text-gray-700 hover:text-blue-600"
//                           : "text-white hover:text-blue-200"
//                       }`}
//                     >
//                       {getLinkText(link)}
//                       <span
//                         className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
//                           scrolled ? "bg-blue-600" : "bg-white"
//                         }`}
//                       ></span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Action Buttons - Right side */}
//             <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
//               {/* Membership Button */}
//               <button
//                 onClick={() => navigate("/userMembership")}
//                 className={`px-2 lg:px-3 xl:px-4 py-2 rounded-full font-bold text-xs lg:text-xs xl:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 relative overflow-hidden whitespace-nowrap ${
//                   scrolled
//                     ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg"
//                     : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg"
//                 }`}
//                 style={{
//                   animation: "flash 1s infinite alternate",
//                 }}
//               >
//                 <span className="relative z-10 drop-shadow-sm">
//                   {user.language ? "MEMBERSHIP" : "ಸದಸ್ಯತ್ವ ನೊಂದಣಿ"}
//                 </span>
//               </button>

//               {/* Donation Button */}
//               <button
//                 onClick={() => navigate("/donate")}
//                 className={`px-2 lg:px-3 xl:px-4 py-2 rounded-full font-bold text-xs lg:text-xs xl:text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden whitespace-nowrap ${
//                   scrolled
//                     ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white shadow-lg"
//                     : "bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 text-white shadow-lg"
//                 }`}
//                 style={{
//                   animation: "neonGlow 1.5s ease-in-out infinite alternate",
//                 }}
//               >
//                 <span className="relative z-10 drop-shadow-sm">
//                   {user.language ? "DONATE" : "ದೇಣಿಗೆ"}
//                 </span>
//               </button>
//             </div>
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
//         className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-[60] transform transition-all duration-300 ease-in-out ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         } lg:hidden`}
//         style={{
//           backgroundColor: "#ffffff",
//           boxShadow: menuOpen
//             ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
//             : undefined,
//         }}
//       >
//         {/* Mobile Menu Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
//           <div className="flex items-center space-x-2">
//             <img
//               src="/assets/logo1.png"
//               alt="Logo"
//               className="h-8 w-auto"
//               draggable="false"
//             />
//           </div>
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
//         <div className="flex-1 overflow-y-auto bg-white">
//           <ul className="flex flex-col py-4 space-y-1 px-4">
//             {NavLinks.map((link, index) => (
//               <li key={link.href}>
//                 <a
//                   href={link.href}
//                   className="block text-gray-700 text-base font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {getLinkText(link)}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile Action Buttons */}
//           <div className="px-4 py-4 space-y-3 bg-white">
//             <button
//               onClick={() => {
//                 navigate("/userMembership");
//                 setMenuOpen(false);
//               }}
//               className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg font-bold hover:from-yellow-400 hover:via-pink-500 hover:to-red-500 transition-all duration-200 shadow-lg"
//             >
//               <span className="text-sm">
//                 {user.language ? "GET MEMBERSHIP" : "ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ"}
//               </span>
//             </button>
            
//             <button
//               onClick={() => {
//                 navigate("/donate");
//                 setMenuOpen(false);
//               }}
//               className="w-full px-4 py-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white rounded-lg font-bold hover:from-lime-400 hover:via-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg"
//             >
//               <span className="text-sm">
//                 {user.language ? "DONATE NOW" : "ದೇಣಿಗೆ"}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Language Toggle */}
//         <div className="border-t border-gray-100 px-6 py-4 bg-white">
//           <div className="flex items-center justify-center space-x-3">
//             <span className="text-sm font-medium text-gray-600">ಕನ್ನಡ</span>
//             <button
//               onClick={toggleLanguage}
//               className="relative inline-flex h-6 w-10 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               style={{ backgroundColor: user.language ? "#3b82f6" : "#6b7280" }}
//             >
//               <span className="sr-only">Toggle language</span>
//               <span
//                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
//                   user.language ? "translate-x-5" : "translate-x-1"
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
//           className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes flash {
//           0% {
//             filter: brightness(1) saturate(1);
//           }
//           100% {
//             filter: brightness(1.3) saturate(1.3);
//           }
//         }

//         @keyframes neonGlow {
//           0% { 
//             filter: brightness(1) saturate(1.2); 
//           }
//           100% { 
//             filter: brightness(1.4) saturate(1.6); 
//           }
//         }
//       `}</style>
//     </header>
//   );
// }
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
      <div className="w-full px-4 lg:px-6 xl:px-8 py-2 lg:py-3">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="flex w-full items-center justify-between lg:hidden gap-2">
            {/* Logo 1 */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/logo1.png"
                alt="Logo 1"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable="false"
              />
            </a>
            {/* Banner */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/logo-banner.png"
                alt="Logo 2"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable="false"
              />
            </a>
          </div>

          {/* Desktop Layout */}
          <>
            <div className="hidden lg:flex flex-shrink-0">
              <a href="/" className="flex items-center group">
                <img
                  src="/assets/logo1.png"
                  alt="Logo 1"
                  className="h-16 xl:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                  draggable="false"
                />
              </a>
            </div>
            <div className="hidden lg:flex flex-shrink-0">
              <a href="/" className="flex items-center group">
                <img
                  src="/assets/logo-banner.png"
                  alt="Logo 2"
                  className="w-auto h-20 xl:h-24 transition-transform duration-300 group-hover:scale-105"
                  draggable="false"
                />
              </a>
            </div>
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-6">
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs xl:text-sm font-medium transition-colors duration-200 ${
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
                  className="relative inline-flex h-5 xl:h-6 w-9 xl:w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md"
                  style={{
                    backgroundColor: user.language ? "#3b82f6" : "#6b7280",
                  }}
                >
                  <span className="sr-only">Toggle language</span>
                  <span
                    className={`inline-block h-3 xl:h-4 w-3 xl:w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                      user.language
                        ? "translate-x-5 xl:translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                <span
                  className={`text-xs xl:text-sm font-medium transition-colors duration-200 ${
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
      <div className="w-full px-4 lg:px-6 xl:px-8 py-2 lg:py-3 border-t border-gray-200/20">
        <div className="flex items-center justify-between w-full">
          {/* Desktop Navigation - Clean centered with wrapping */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* Left spacer */}
            <div className="flex-shrink-0 w-20"></div>

            {/* Navigation Links */}
            <div className="flex-1 flex justify-center">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {NavLinks.map((link) => (
                  <li key={link.href} className="flex-shrink-0">
                    <a
                      href={link.href}
                      className={`font-medium text-sm xl:text-base relative group whitespace-nowrap transition-all duration-300 ${
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

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              {/* Membership Button */}
              <button
                onClick={() => navigate("/userMembership")}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 relative overflow-hidden whitespace-nowrap ${
                  scrolled
                    ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg"
                    : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-lg"
                }`}
                style={{ animation: "flash 1s infinite alternate" }}
              >
                <span className="relative z-10 drop-shadow-sm">
                  {user.language ? "MEMBERSHIP" : "ಸದಸ್ಯತ್ವ ನೊಂದಣಿ"}
                </span>
              </button>

              {/* Donation Button */}
              <button
                onClick={() => navigate("/donate")}
                className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden whitespace-nowrap ${
                  scrolled
                    ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 text-white shadow-lg"
                }`}
                style={{ animation: "neonGlow 1.5s ease-in-out infinite alternate" }}
              >
                <span className="relative z-10 drop-shadow-sm">
                  {user.language ? "DONATE" : "ದೇಣಿಗೆ"}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
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
          backgroundColor: "#ffffff",
          boxShadow: menuOpen
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : undefined,
        }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-2">
            <img src="/assets/logo1.png" alt="Logo" className="h-8 w-auto" draggable="false" />
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M18 6 6 18M6 6l12 12" strokeWidth={2.2} strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-y-auto bg-white">
          <ul className="flex flex-col py-4 space-y-1 px-4">
            {NavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-gray-700 text-base font-medium py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {getLinkText(link)}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Action Buttons */}
          <div className="px-4 py-4 space-y-3 bg-white">
            <button
              onClick={() => {
                navigate("/userMembership");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg font-bold transition-all duration-200 shadow-lg"
            >
              <span className="text-sm">
                {user.language ? "GET MEMBERSHIP" : "ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ"}
              </span>
            </button>

            <button
              onClick={() => {
                navigate("/donate");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white rounded-lg font-bold transition-all duration-300 shadow-lg"
            >
              <span className="text-sm">{user.language ? "DONATE NOW" : "ದೇಣಿಗೆ"}</span>
            </button>
          </div>
        </div>

        {/* Mobile Language Toggle */}
        <div className="border-t border-gray-100 px-6 py-4 bg-white">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-sm font-medium text-gray-600">ಕನ್ನಡ</span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-6 w-10 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: user.language ? "#3b82f6" : "#6b7280" }}
            >
              <span className="sr-only">Toggle language</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                  user.language ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-600">English</span>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes flash {
          0% {
            filter: brightness(1) saturate(1);
          }
          100% {
            filter: brightness(1.3) saturate(1.3);
          }
        }

        @keyframes neonGlow {
          0% {
            filter: brightness(1) saturate(1.2);
          }
          100% {
            filter: brightness(1.4) saturate(1.6);
          }
        }
      `}</style>
    </header>
  );
}
