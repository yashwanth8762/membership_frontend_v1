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
    if (theme === 'solid') {
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
      return link.about_en || link.community_en || link.organization_en || link.activities_en || link.upcoming_en || link.gallery_en || link.contact_en;
    } else {
      return link.about_kn || link.community_kn || link.organization_kn || link.activities_kn || link.upcoming_kn || link.gallery_kn || link.contact_kn;
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
          <div className="flex w-full items-center justify-between lg:hidden">
            {/* Logo 1 */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/logo1.png"
                alt="Logo 1"
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable="false"
              />
            </a>
            {/* Banner */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/logo-banner.png"
                alt="Logo 2"
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
                draggable="false"
              />
            </a>
            {/* Avatar */}
            <a href="/" className="flex items-center group">
              <img
                src="/assets/matangi.jpeg"
                alt="Matanga Muni"
                className="h-14 w-14 rounded-full border-4 border-red-500 transition-transform duration-300 group-hover:scale-105 object-cover"
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
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center group">
                  <img
                    src="/assets/matangi.jpeg"
                    alt="Matanga Muni"
                    className="w-24 h-24 rounded-full border-4 border-red-500 transition-transform duration-300 group-hover:scale-105 object-cover"
                    draggable="false"
                  />
                </a>
              </div>
              {/* Language Toggle */}
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled 
                    ? (!user.language ? 'text-gray-900' : 'text-gray-500') 
                    : 'text-white'
                }`}>
                  ಕನ್ನಡ
                </span>
                <button
                  onClick={toggleLanguage}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-md"
                  style={{ backgroundColor: user.language ? '#3b82f6' : '#6b7280' }}
                >
                  <span className="sr-only">Toggle language</span>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                      user.language ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled 
                    ? (user.language ? 'text-gray-900' : 'text-gray-500') 
                    : 'text-white'
                }`}>
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
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full ${
                      scrolled ? "bg-blue-600" : "bg-white"
                    }`}></span>
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
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50"
              }`}
            >
              {user.language ? 'Get Membership' : 'ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ'}
            </button>

            {/* Donation Button */}
            <button
              onClick={() => navigate("/donate")}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                scrolled
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                  : "bg-green-500/80 text-white hover:bg-green-500 backdrop-blur-sm border border-green-400/30 hover:border-green-400/50"
              }`}
            >
              {user.language ? 'Donate' : 'ದಾನ'}
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
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-40 transform transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
        style={{
          boxShadow: menuOpen
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : undefined,
        }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          {/* <div className="flex items-center space-x-3">
            <img
              src="/assets/logo1.png"
              alt="Logo 1"
              className="h-12 w-auto"
              draggable="false"
            />
            <img
              src="/assets/logo2.png"
              alt="Logo 2"
              className="h-12 w-auto"
              draggable="false"
            />
          </div> */}
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
        <div className="flex-1 overflow-y-auto">
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
          <div className="px-6 py-4 space-y-3">
            <button
              onClick={() => {
                navigate("/userMembership");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              {user.language ? 'Get Membership' : 'ಸದಸ್ಯತ್ವ ಪಡೆಯಿಕೆ'}
            </button>
            
            <button
              onClick={() => {
                navigate("/donation");
                setMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
            >
              {user.language ? 'Donate' : 'ದಾನ'}
            </button>
          </div>
        </div>

        {/* Mobile Language Toggle */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-sm font-medium text-gray-600">ಕನ್ನಡ</span>
            <button
              onClick={toggleLanguage}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: user.language ? '#3b82f6' : '#6b7280' }}
            >
              <span className="sr-only">Toggle language</span>
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-sm ${
                  user.language ? 'translate-x-6' : 'translate-x-1'
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
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
