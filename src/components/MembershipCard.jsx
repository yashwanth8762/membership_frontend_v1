import React, { useState } from "react";
import QRCode from 'react-qr-code';
import { API_BASE_URL } from "../../config";

const COLOR_SCHEMES = [
  {
    name: "Royal Blue",
    headerBg: "#1e3a8a", // blue-900
    headerText: "#fff",
    border: "#60a5fa", // blue-400
    detailText: "#1e3a8a",
    accent: "#3b82f6", // blue-500
    barcode: "#1e3a8a",
    cardBg: "linear-gradient(135deg, #fff 60%, #dbeafe 100%)",
  },
  {
    name: "Emerald Green",
    headerBg: "#047857", // emerald-700
    headerText: "#fff",
    border: "#34d399", // emerald-400
    detailText: "#065f46",
    accent: "#10b981", // emerald-500
    barcode: "#047857",
    cardBg: "linear-gradient(135deg, #fff 60%, #d1fae5 100%)",
  },
  {
    name: "Slate & Gold",
    headerBg: "#1e293b", // slate-800
    headerText: "#ffd700", // gold
    border: "#ffd700",
    detailText: "#1e293b",
    accent: "#ffd700",
    barcode: "#1e293b",
    cardBg: "linear-gradient(135deg, #fff 60%, #fef9c3 100%)",
  },
  {
    name: "Maroon & Cream",
    headerBg: "#7f1d1d", // red-900
    headerText: "#fff",
    border: "#f87171", // red-400
    detailText: "#7f1d1d",
    accent: "#f87171",
    barcode: "#7f1d1d",
    cardBg: "linear-gradient(135deg, #fff 60%, #fef3c7 100%)",
  },
  {
    name: "Teal & White",
    headerBg: "#0f766e", // teal-700
    headerText: "#fff",
    border: "#2dd4bf", // teal-400
    detailText: "#134e4a",
    accent: "#14b8a6",
    barcode: "#0f766e",
    cardBg: "linear-gradient(135deg, #fff 60%, #ccfbf1 100%)",
  },
];

const MembershipCard = ({
  membershipData,
  colorIdx: colorIdxProp,
  onColorChange,
  showColorPicker = true,
}) => {
  const [colorIdx, setColorIdx] = useState(colorIdxProp ?? 0);
  const color = COLOR_SCHEMES[colorIdx];

  // Extract data directly from the API response
  const getValue = (label) => {
    if (!membershipData || !membershipData.values) return '';
    const field = membershipData.values.find((v) => 
      v.label?.trim()?.toLowerCase() === label?.trim()?.toLowerCase() ||
      v.label?.trim()?.toLowerCase().includes(label?.trim()?.toLowerCase())
    );
    return field ? field.value : '';
  };

  // Extract photo from populated media
  const getPhoto = () => {
    if (!membershipData || !membershipData.values) return undefined;
    
    console.log('membershipData',membershipData);
    const photoField = membershipData.values.find((v) => 
      v?._doc?.label?.toLowerCase().includes('upload image') || 
      v?._doc?.label?.toLowerCase().includes('photo') ||
      v?._doc?.label?.toLowerCase().includes('image')
    );
    
    console.log('photoField found:', photoField);
    
    if (photoField && photoField.media && photoField.media.length > 0) {
      const mediaItem = photoField.media[0];
      console.log('mediaItem:', mediaItem);
      
      if (mediaItem && mediaItem.image_url && mediaItem.image_url.full && mediaItem.image_url.full.high_res) {
        const photoUrl = `${API_BASE_URL}${mediaItem.image_url.full.high_res}`;
        console.log('Photo URL constructed:', photoUrl);
        return photoUrl;
      }
    }
    return undefined;
  };

  // Extract all the data
  const membershipNumber = membershipData?.membershipId ? membershipData.membershipId.slice(-4) : '0000';
  const serialNumber = '1';
  const name = getValue('Enter Your Name') || getValue('Name') || getValue('Your Name') || 'N/A';
  const parentName = getValue('Father/Mother/Husband/Name') || getValue('Father') || getValue('Parent') || 'N/A';
  const dob = getValue('Date of Birth') || getValue('DOB') || getValue('Birth') || 'N/A';
  const address = getValue('Permanent adress') || getValue('Permanent Address') || getValue('Address') || 'N/A';
  const photo = getPhoto();
  const cardId = membershipNumber;
  const qrValue = `http://172.20.10.5:5173/membership/user/${membershipData?.membershipId}`;

  console.log('MembershipCard data extracted:', {
    membershipNumber,
    name,
    parentName,
    dob,
    address,
    photo,
    cardId
  });

  // Allow parent to control color if desired
  const handleColorChange = idx => {
    setColorIdx(idx);
    if (onColorChange) onColorChange(idx);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Color Picker Boxes */}
      {showColorPicker && (
        <div className="flex space-x-4 mb-4">
          {COLOR_SCHEMES.map((scheme, idx) => (
            <button
              key={scheme.name}
              onClick={() => handleColorChange(idx)}
              style={{
                background: scheme.cardBg,
                border: colorIdx === idx ? `3px solid ${scheme.accent}` : `2px solid #e5e7eb`,
                width: 32,
                height: 32,
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: colorIdx === idx ? "0 0 0 2px #0002" : undefined,
                outline: "none",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              aria-label={scheme.name}
            />
          ))}
        </div>
      )}

      {/* Card */}
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
              ರಾಜ್ಯ ಬಕ್ಷಿ ಲೀಗರ್ ಸಂಘ
            </h1>
            <div className="flex justify-center">
              <div className="w-4/5 border-t" style={{ borderColor: color.headerText, opacity: 0.4, margin: "0.15rem 0" }}></div>
            </div>
            <p
              className="text-xs font-medium tracking-wide mt-1"
              style={{ letterSpacing: "0.01em" }}
            >
              ಕ್ರೀಡಾರಾಜ್ಯದ ರಸ್ತೆ ವಿಶ್ವೇಶ್ವರಪುರ ಬೆಂಗಳೂರು - 560004
            </p>
          </div>

          {/* Main Content */}
          <div
            className="flex flex-1 px-4 py-2"
            style={{ fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif', color: color.detailText }}
          >
            {/* Left side - Details */}
            <div className="flex-1 pr-2 flex flex-col justify-center items-start">
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಕ್ರಿಮ ಸಂಖ್ಯೆ: </span>
                <span>{serialNumber}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ: </span>
                <span className="font-bold" style={{ color: color.accent }}>{membershipNumber}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಹೆಸರು: </span>
                <span className="font-bold">{name}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ತಂದೆ/ಗಾಂಗ: </span>
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
            className="border-t border-dashed mt-0 pt-1 px-4 pb-1 bg-white bg-opacity-90 flex items-end justify-between"
            style={{
              minHeight: 50,
              fontFamily: 'Inter, Roboto, Segoe UI, Arial, sans-serif',
              borderColor: color.border,
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
            </div>

            {/* Signatures */}
            <div className="flex-1 flex justify-end space-x-8">
              <div className="text-center">
                <div
                  className="h-6 border-b mb-1"
                  style={{ borderColor: color.border }}
                ></div>
                <span className="text-xs font-medium tracking-wide">ಅಧ್ಯಕ್ಷರು</span>
              </div>
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
