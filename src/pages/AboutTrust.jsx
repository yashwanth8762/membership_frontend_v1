// src/pages/AboutTrust.jsx
import { useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';

export default function AboutTrust() {
  const [language, setLanguage] = useState('kannada');

  // English content
  const englishContent = (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">About Karnataka Madara Mahasabha</h1>
      <p className="text-lg mb-4">
        The Karnataka Madara Mahasabha is a vibrant community dedicated to fostering unity, cultural heritage, and social development among its members. Founded with a vision to empower the community through education, social welfare, and collective progress, the Sabha plays a pivotal role in enriching lives and preserving traditions.
      </p>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">Our Mission</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Promote the cultural heritage of the Madara community</li>
        <li>Facilitate educational opportunities and scholarships</li>
        <li>Organize community events and programs to foster solidarity</li>
        <li>Support social welfare initiatives and charitable activities</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">History</h2>
      <p className="mb-4">
        The Madara Mahasabha traces its roots back to decades of community service and activism, evolving into a structured organization that addresses the community's contemporary needs while respecting its rich past.
      </p>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">Activities</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Conduct membership drives to strengthen the community network</li>
        <li>Host cultural festivals celebrating Kannada traditions</li>
        <li>Launch health and wellness camps</li>
        <li>Engage in philanthropy and support for underprivileged members</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <img src="/assets/images/event1.jpg" alt="Community event" className="rounded-lg shadow-md w-full h-48 object-cover" />
        <img src="/assets/images/event2.jpg" alt="Cultural festival" className="rounded-lg shadow-md w-full h-48 object-cover" />
        <img src="/assets/images/event3.jpg" alt="Health camp" className="rounded-lg shadow-md w-full h-48 object-cover" />
      </div>
    </div>
  );

  // Kannada content (placeholder — replace with accurate translations)
  const kannadaContent = (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">ಕರ್ನಾಟಕ ಮಾಡರ ಮಹಾಸಭೆ ಬಗ್ಗೆ</h1>
      <p className="text-lg mb-4">
        ಕರ್ನಾಟಕ ಮಾಡರ ಮಹಾಸಭೆಯು ಸದಸ್ಯರಲ್ಲಿ ಐಕ್ಯತೆ, ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಅಭಿವೃದ್ಧಿಯನ್ನು ಬೆಳೆಸುವ ಗುರಿಯೊಂದಿಗೆ ಸ್ಥಾಪಿತವಾಗಿದೆ. ಶಿಕ್ಷಣ, ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ ಮತ್ತು ಸಾಮೂಹಿಕ ಪ್ರಗತಿಯ ಮೂಲಕ ಸಮುದಾಯವನ್ನು ಸಬಲಗೊಳಿಸುವ ದೃಷ್ಟಿಯೊಂದಿಗೆ, ಸಭೆಯು ಜೀವನವನ್ನು ಸುಧಾರಿಸುವಲ್ಲಿ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳನ್ನು ಸಂರಕ್ಷಿಸುವಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸುತ್ತದೆ.
      </p>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">ನಮ್ಮ ಧ್ಯೇಯ</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>ಮಾಡರ ಸಮುದಾಯದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುವುದು</li>
        <li>ಶೈಕ್ಷಣಿಕ ಅವಕಾಶಗಳು ಮತ್ತು ಶಿಷ್ಯವೃತ್ತಿಗಳನ್ನು ಸುಗಮಗೊಳಿಸುವುದು</li>
        <li>ಸಮುದಾಯ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಘಟನೆಗಳನ್ನು ಆಯೋಜಿಸುವುದು</li>
        <li>ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು ಮತ್ತು ಧರ್ಮಾರ್ಥ ಚಟುವಟಿಕೆಗಳಿಗೆ ಬೆಂಬಲ ನೀಡುವುದು</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">ಚರಿತ್ರೆ</h2>
      <p className="mb-4">
        ಮಾಡರ ಮಹಾಸಭೆಯು ದಶಕಗಳ ಸಮುದಾಯ ಸೇವೆ ಮತ್ತು ಸಕ್ರಿಯತೆಯಿಂದ ಹುಟ್ಟಿಕೊಂಡಿದೆ, ಇದು ಸಮುದಾಯದ ಸಮಕಾಲೀನ ಅಗತ್ಯಗಳನ್ನು ಪೂರೈಸುವ ಸಂಘಟಿತ ಸಂಸ್ಥೆಯಾಗಿ ರೂಪುಗೊಂಡಿದೆ.
      </p>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">ಚಟುವಟಿಕೆಗಳು</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>ಸದಸ್ಯತ್ವ ಚಳುವಳಿಗಳನ್ನು ನಡೆಸಿ ಸಮುದಾಯ ಬಲವರ್ಧನೆ</li>
        <li>ಕನ್ನಡ ಸಂಪ್ರದಾಯಗಳನ್ನು ಆಚರಿಸುವ ಸಾಂಸ್ಕೃತಿಕ ಹಬ್ಬಗಳು</li>
        <li>ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಶಿಬಿರಗಳು</li>
        <li>ದಾನಧರ್ಮ ಮತ್ತು ಶ್ರೀಮಂತರಲ್ಲದ ಸದಸ್ಯರಿಗೆ ಬೆಂಬಲ</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-3">ಗ್ಯಾಲರಿ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <img src="/assets/images/event1.jpg" alt="ಸಮುದಾಯ ಕಾರ್ಯಕ್ರಮ" className="rounded-lg shadow-md w-full h-48 object-cover" />
        <img src="/assets/images/event2.jpg" alt="ಸಾಂಸ್ಕೃತಿಕ ಹಬ್ಬ" className="rounded-lg shadow-md w-full h-48 object-cover" />
        <img src="/assets/images/event3.jpg" alt="ಆರೋಗ್ಯ ಶಿಬಿರ" className="rounded-lg shadow-md w-full h-48 object-cover" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageToggle onLanguageChange={setLanguage} />
      {language === 'english' ? englishContent : kannadaContent}
    </div>
  );
}
