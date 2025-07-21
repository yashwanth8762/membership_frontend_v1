import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "About the Trust", href: "#services" },
  { name: "Community & it's History", href: "#pricing" },
  { name: "Activities", href: "#how" },
  { name: "Upcoming Program's", href: "#testimonials" },
  { name: "Gallery", href: "#blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo1.png"
            alt="Logo"
            className="h-18 w-auto"
            draggable="false"
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-gray-800 hover:text-blue-600"
                    : "text-white hover:text-blue-300"
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center">
          <a
            onClick={()=>{
              navigate("/userMembership")
            }}
            className={`px-5 py-2 rounded-full font-semibold shadow transition-all duration-300 ${
              scrolled
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
            }`}
          >
            Get Membership
          </a>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className={`md:hidden inline-flex items-center justify-center p-2 rounded transition ${
            scrolled
              ? "hover:bg-gray-100 text-gray-800"
              : "hover:bg-white/20 text-white"
          }`}
          aria-label="Open Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
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
      </nav>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-xs bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        style={{
          boxShadow: menuOpen
            ? "0 6px 32px -8px rgba(34,34,80,0.15)"
            : undefined,
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <img
            src="/assets/logo1.png"
            alt="Logo"
            className="h-18"
            draggable="false"
          />
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <svg
              width={28}
              height={28}
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
        <ul className="flex flex-col py-6 space-y-4 px-7">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="block text-gray-700 text-lg font-medium hover:text-blue-600 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
