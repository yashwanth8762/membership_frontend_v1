import React, { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import { API_BASE_URL } from "../../config";

const COLOR_SCHEMES = [
  // Blue - ₹500 (General Membership)
  {
    name: "Royal Blue",
    headerBg: "#1e40af", // deeper blue
    headerText: "#ffffff",
    border: "#3b82f6", // blue-500
    detailText: "#1e40af",
    accent: "#3b82f6",
    barcode: "#1e40af",
    cardBg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)", // blue gradient
    mainBg: "#f0f9ff", // blue-50
    amount: 500,
  },
  // Green - ₹5,000 (Special membership)
  {
    name: "Emerald Green",
    headerBg: "#047857", // emerald-700
    headerText: "#ffffff",
    border: "#10b981", // emerald-500
    detailText: "#047857",
    accent: "#10b981",
    barcode: "#047857",
    cardBg: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)", // green gradient
    mainBg: "#ecfdf5", // emerald-50
    amount: 5000,
  },
  // Bronze - ₹10,000 (Premium membership)
  {
    name: "Bronze",
    headerBg: "#92400e", // amber-800
    headerText: "#ffffff",
    border: "#d97706", // amber-600
    detailText: "#92400e",
    accent: "#d97706",
    barcode: "#92400e",
    cardBg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)", // bronze gradient
    mainBg: "#fffbeb", // amber-50
    amount: 10000,
  },
  // Silver - ₹25,000 (Lifetime Membership)
  {
    name: "Silver",
    headerBg: "#475569", // slate-600
    headerText: "#ffffff",
    border: "#64748b", // slate-500
    detailText: "#475569",
    accent: "#64748b",
    barcode: "#475569",
    cardBg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)", // silver gradient
    mainBg: "#f8fafc", // slate-50
    amount: 25000,
  },
  // Gold - ₹50,000 (Patron Membership)
  {
    name: "Gold",
    headerBg: "#a16207", // yellow-700
    headerText: "#ffffff",
    border: "#ca8a04", // yellow-600
    detailText: "#a16207",
    accent: "#eab308", // yellow-500
    barcode: "#a16207",
    cardBg: "linear-gradient(135deg, #fef3c7 0%, #fde047 100%)", // gold gradient
    mainBg: "#fefce8", // yellow-50
    amount: 50000,
  },
  // Platinum - ₹100,000 (Chief Patron Membership)
  {
    name: "Platinum",
    headerBg: "#374151", // gray-700
    headerText: "#ffffff",
    border: "#6b7280", // gray-500
    detailText: "#374151",
    accent: "#9ca3af", // gray-400
    barcode: "#374151",
    cardBg: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)", // platinum gradient
    mainBg: "#f9fafb", // gray-50
    amount: 100000,
  },
  // Premium Gold - ₹500,000 (Premium Patron Membership)
  {
    name: "Premium Gold",
    headerBg: "#92400e", // amber-800
    headerText: "#fbbf24", // golden text
    border: "#f59e0b", // amber-500
    detailText: "#92400e",
    accent: "#f59e0b",
    barcode: "#92400e",
    cardBg: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)", // rich gold gradient
    mainBg: "#fef3c7", // amber-100
    amount: 500000,
  },
];

const CARD_TYPE_MAP = {
  500:  "ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವ",
  5000: "ವಿಶೇಷ ಸದಸ್ಯತ್ವ",
  10000: "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ",
  25000: "ಆಜೀವ ಸದಸ್ಯತ್ವ",
  50000: "ಪೋಷಕ ಸದಾಶತ್ವ",
  100000: "ಮಹಾಪೋಷಕ ಸದಾಶತ್ವ",
  500000: "ಪ್ರೀಮಿಯಂ ಚಿನ್ನದ ಸದಸ್ಯತ್ವ"
};

const MembershipCard = ({
  membershipData,
  colorIdx: colorIdxProp,
  onColorChange,
  showColorPicker = true,
  onImageLoad
}) => {
  // Helper: get membership amount from data
  const getMembershipAmount = () => {
    if (!membershipData || !membershipData.values) return 500;
    const amountField = membershipData.values.find((v) => 
      v.label?.toLowerCase().includes('membership amount') ||
      v._doc?.label?.toLowerCase().includes('membership amount')
    );
    if (amountField) {
      const amount = amountField.value || amountField._doc?.value;
      return parseInt(amount) || 500;
    }
    return 500;
  };

  // Helper: get card type in Kannada
  const getCardType = (amount) => {
    return CARD_TYPE_MAP[amount] || "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್";
  };

  // Determine color scheme by amount
  const getColorSchemeByAmount = (amount) => {
    const scheme = COLOR_SCHEMES.find(scheme => scheme.amount === amount);
    const idx = scheme ? COLOR_SCHEMES.indexOf(scheme) : 0;
    return idx;
  };

  const membershipAmount = getMembershipAmount();
  const cardTypeDisplay = getCardType(membershipAmount);
  const autoColorIdx = getColorSchemeByAmount(membershipAmount);

  const [colorIdx, setColorIdx] = useState(colorIdxProp ?? autoColorIdx);
  const color = COLOR_SCHEMES[colorIdx];
  const [imageLoaded, setImageLoaded] = useState(false);

  // Update color when membership data changes
  useEffect(() => {
    const newMembershipAmount = getMembershipAmount();
    const newAutoColorIdx = getColorSchemeByAmount(newMembershipAmount);
    if (colorIdxProp === undefined) setColorIdx(newAutoColorIdx);
  }, [membershipData, colorIdxProp]);

  // Extract value by label
  const getValue = (label) => {
    if (!membershipData || !membershipData.values) return '';
    const field = membershipData.values.find((v) => 
      (v.label?.trim()?.toLowerCase() === label?.trim()?.toLowerCase() ||
      v.label?.trim()?.toLowerCase().includes(label?.trim()?.toLowerCase())) ||
      (v._doc?.label?.trim()?.toLowerCase() === label?.trim()?.toLowerCase() ||
      v._doc?.label?.trim()?.toLowerCase().includes(label?.trim()?.toLowerCase()))
    );
    if (!field) return '';
    if (field.value !== undefined) return field.value;
    if (field._doc && field._doc.value !== undefined) return field._doc.value;
    return '';
  };

  // Extract photo
  const getPhoto = () => {
    if (!membershipData || !membershipData.values) return undefined;
    const photoField = membershipData.values.find((v) => 
      v._doc?.label?.toLowerCase().includes('upload image') || 
      v._doc?.label?.toLowerCase().includes('photo') ||
      v._doc?.label?.toLowerCase().includes('image') ||
      v.label?.toLowerCase().includes('upload image') ||
      v.label?.toLowerCase().includes('photo') ||
      v.label?.toLowerCase().includes('image')
    );
    if (photoField && photoField.media && photoField.media.length > 0) {
      const mediaItem = photoField.media[0];
      if (mediaItem && mediaItem.image_url && mediaItem.image_url.full && mediaItem.image_url.full.high_res) {
        return `${API_BASE_URL}${mediaItem.image_url.full.high_res}`;
      }
    }
    return undefined;
  };

  // Extract all the data
  const membershipNumber = membershipData?.membershipId ? membershipData.membershipId.slice(-4) : '0000';
  const name = getValue('ಅರ್ಜಿದಾರನ/ಳ ಹೆಸರು/ Applicant Name') || getValue('Name') || getValue('Your Name') || 'N/A';
  const parentName = getValue('Father/Mother/Husband/Name') || getValue('ತಂದೆ/ತಾಯಿ/ಗಂಡನ ಹೆಸರು / Father/Mother/Husband/Name') || getValue('Parent') || 'N/A';
  const dob = getValue('Date of Birth') || getValue('ಜನ್ಮ ದಿನಾಂಕ/Date of Birth') || getValue('Birth') || 'N/A';
  const address = getValue('Permanent adress') || getValue('Permanent Address') || getValue('ಶಾಶ್ವತ ವಿಳಾಸ / Permanent adress') || 'N/A';
  const education = getValue('ವಿದ್ಯಾರ್ಹತೆ') || getValue('ವಿದ್ಯಾರ್ಹತೆ/ ವೃತ್ತಿ / Qualification/ Profession') || 'N/A';

  const photo = getPhoto();
  const cardId = membershipNumber;
  const qrValue = `${API_BASE_URL}/membership/user/${membershipData?.membershipId}`;

  // Color change handler (if parent wants to control)
  const handleColorChange = idx => {
    setColorIdx(idx);
    if (onColorChange) onColorChange(idx);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="mx-auto"
        style={{
          minWidth: 480,
          minHeight: 300,
          maxWidth: 600,
          fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif',
          background: color.cardBg,
        }}
      >
        <div
          className="relative w-full h-full rounded-xl shadow-lg border overflow-hidden flex flex-col"
          style={{
            borderColor: color.border,
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            background: "none",
          }}
        >
          {/* Header */}
          <div
            className="text-center py-2 px-3 rounded-t-xl"
            style={{
              background: color.headerBg,
              color: color.headerText,
              fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif',
            }}
          >
            <h1
              className="text-lg font-extrabold tracking-wide mb-1"
              style={{ letterSpacing: "0.02em" }}
            >
              ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾ
            </h1>
            <div className="flex justify-center">
              <div className="w-4/5 border-t" style={{ borderColor: color.headerText, opacity: 0.4, margin: "0.15rem 0" }}></div>
            </div>
            <p
              className="text-xs font-medium tracking-wide mt-1"
              style={{ letterSpacing: "0.01em" }}
            >
              ಸದಾಸ್ಯತ್ವ ಕಾರ್ಡ್
            </p>
          </div>
          {/* Main Content */}
          <div
            className="flex flex-1 px-4 py-2"
            style={{ 
              fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif', 
              color: color.detailText,
              background: color.mainBg,
              borderLeft: `4px solid ${color.accent}`,
              borderRight: `4px solid ${color.accent}`
            }}
          >
            {/* Left side - Details */}
            <div className="flex-1 pr-2 flex flex-col justify-center items-start">
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ: </span>
                <span className="font-bold" style={{ color: color.accent }}>{membershipNumber}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಹೆಸರು: </span>
                <span className="font-bold">{name}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ತಂದೆ: </span>
                <span>{parentName}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಜನ್ಮ ದಿನಾಂಕ: </span>
                <span className="font-bold">{dob}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ವಿಳಾಸ: </span>
                <span className="break-words">{address}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
  <span className="font-semibold">ವಿದ್ಯಾರ್ಹತೆ/ ⁠ಪದವಿ: </span>
  <span>{education}</span>
</div>

              {/* <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಸದಸ್ಯತ್ವ: </span>
                <span>{cardTypeDisplay}</span>
              </div> */}
            </div>
            {/* Right side - Photo */}
            <div className="flex flex-col items-center justify-center w-28 relative">
              <div className="relative mt-1">
                <div
                  className="w-20 h-24 rounded border-2 bg-gray-100 overflow-hidden flex items-center justify-center"
                  style={{ borderColor: color.border }}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt="ID Photo"
                      className="w-full h-full object-cover"
                      onLoad={() => {
                        setImageLoaded(true);
                        if (onImageLoad) onImageLoad();
                      }}
                    />
                  ) : (
                    <span className="text-xs font-semibold tracking-wide text-gray-500">ಪದವೀಧರ ಪ್ರಮುಖ ಚಿತ್ರ ಇಲ್ಲ</span>
                  )}
                </div>
              </div>
              <div className="text-center mt-1">
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{ color: color.accent }}
                >
                  ಮಾಹಿತಿ/ಪದವೀಧರ
                </span>
              </div>
            </div>
          </div>
          {/* Bottom section */}
          <div
            className="border-t border-dashed mt-0 pt-1 px-4 pb-1 flex items-end justify-between"
            style={{
              minHeight: 50,
              fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif',
              borderColor: color.accent,
              background: color.mainBg,
              borderLeft: `4px solid ${color.accent}`,
              borderRight: `4px solid ${color.accent}`,
              borderBottom: `4px solid ${color.accent}`,
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px'
            }}
          >
            {/* QR Code and ID */}
            <div className="flex flex-col items-center w-28">
  <div
    className="w-16 h-16 flex items-center justify-center mb-1"
    style={{ background: '#fff', border: `1px solid ${color.border}`, borderRadius: 8 }}
  >
    {qrValue && (
      <QRCode value={qrValue} size={48} />
    )}
  </div>
  <div className="text-center text-xs mt-0.5 font-semibold tracking-wide">{cardId}</div>

  <div
    className="mt-1 text-sm font-bold text-center"
    style={{ color: color.accent, letterSpacing: "0.02em" }}
  >
    {cardTypeDisplay}
  </div>
</div>

            {/* Signatures */}
            <div className="flex-1 flex justify-end space-x-8">
              <div className="text-center">
                <div
                  className="h-6 border-b mb-1"
                  style={{ borderColor: color.border }}
                ></div>
                <span className="text-xs font-medium tracking-wide">ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
