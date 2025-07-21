// src/components/Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Karnataka Madara Mahasabha
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
          <Link to="/about-trust" className="hover:text-blue-200 transition-colors">About Trust</Link>
          <Link to="/membership" className="hover:text-blue-200 transition-colors">Membership</Link>
          <Link to="/gallery" className="hover:text-blue-200 transition-colors">Gallery</Link>
          <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4">
          <Link to="/" className="block py-2 hover:bg-blue-600">Home</Link>
          <Link to="/about-trust" className="block py-2 hover:bg-blue-600">About Trust</Link>
          <Link to="/membership" className="block py-2 hover:bg-blue-600">Membership</Link>
          <Link to="/gallery" className="block py-2 hover:bg-blue-600">Gallery</Link>
          <Link to="/contact" className="block py-2 hover:bg-blue-600">Contact</Link>
        </div>
      )}
    </header>
  );
}
