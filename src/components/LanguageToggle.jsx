// src/components/LanguageToggle.jsx
import { useState } from 'react';

export default function LanguageToggle({ onLanguageChange }) {
  const [language, setLanguage] = useState('english');

  const toggleLanguage = () => {
    const newLanguage = language === 'english' ? 'kannada' : 'english';
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
    >
      {language === 'english' ? 'ಕನ್ನಡ' : 'English'}
    </button>
  );
}
