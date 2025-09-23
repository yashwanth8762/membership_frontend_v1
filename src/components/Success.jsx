import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { clearCart } from '../reducers/cart';
import Confetti from 'react-confetti';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import MembershipCard from './MembershipCard';

export default function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // To get window size for confetti full screen coverage
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [membershipData, setMembershipData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const cardRef = useRef();

  useEffect(() => {
    // dispatch(clearCart());
    
    const fetchMembershipData = async () => {
      try {
        const merchantOrderId = searchParams.get('merchantOrderId');
        if (merchantOrderId) {
          // First get the membership submission by merchantOrderId (which is the _id)
          const submissionRes = await axios.get(`${API_BASE_URL}membership/submission/${merchantOrderId}`);
          if (submissionRes.data) {
            setMembershipData(submissionRes.data);
          }
        }
      } catch (err) {
        console.error('Error fetching membership data:', err);
        setError('Failed to load membership details');
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
 
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, navigate, searchParams]);

  const waitForFonts = async () => {
    if (document && document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch {}
    }
    await new Promise(r => setTimeout(r, 150));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    await waitForFonts();
    const html2pdf = (await import('html2pdf.js')).default;

    // Build a dedicated hidden export node to avoid layout issues
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-99999px';
    container.style.top = '0';
    container.style.width = '600px';
    container.style.background = '#ffffff';
    document.body.appendChild(container);

    // Render a clean HTML snapshot of the card
    container.innerHTML = cardRef.current.outerHTML;
    const node = container.firstChild;
    node.style.width = '600px';
    node.style.maxWidth = '600px';
    node.style.minWidth = '600px';

    const rect = node.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    const scale = Math.max(3, Math.ceil((window.devicePixelRatio || 2)));

    const opt = {
      margin: 0,
      filename: `membership_card_${membershipData?.membershipId || 'card'}.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        scale,
        backgroundColor: '#ffffff',
        useCORS: true,
        letterRendering: true,
        windowWidth: 600,
        windowHeight: height,
        logging: false,
      },
      jsPDF: {
        unit: 'pt',
        format: [width, height],
        orientation: 'landscape',
        compress: true,
      },
      pagebreak: { mode: ['avoid-all'] },
    };

    await html2pdf().set(opt).from(node).save();
    document.body.removeChild(container);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 flex-col relative overflow-hidden py-8">
      <Confetti width={windowDimension.width} height={windowDimension.height} />
      <h1
        className="text-3xl sm:text-4xl font-extrabold text-green-600 drop-shadow-lg mb-8 
                   animate-success-pop z-10 relative"
      >
        Payment Successful
      </h1>
      
      {loading && (
        <div className="text-lg text-green-600 mb-8 z-10 relative">
          Loading your membership card...
        </div>
      )}
      
      {error && (
        <div className="text-lg text-red-600 mb-8 z-10 relative">
          {error}
        </div>
      )}
      
      {membershipData && !loading && (
        <div className="mb-8 z-10 relative">
          <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">
            Your Membership Card
          </h2>
          <div ref={cardRef}>
            <MembershipCard
              membershipData={membershipData}
              showColorPicker={false}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownload}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold text-base shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Download Card
            </button>
          </div>
        </div>
      )}
      
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700 transition text-white font-semibold text-lg shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 animate-fadeIn z-10 relative"
      >
        Back to Home
      </button>
      <style>
        {`
          @keyframes success-pop {
            0% { opacity: 0; transform: scale(0.95); }
            70% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-success-pop {
            animation: success-pop 0.9s cubic-bezier(.3,1.5,.3,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.9s 0.4s both;
          }
        `}
      </style>
    </div>
  );
}
