import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { API_BASE_URL } from "../../config";
const membershipPrefixMap = {
  500: 'G',       // General
  5000: 'S',      // Special
  10000: 'P',     // Premium
  25000: 'L',     // Lifetime
  50000: 'PT',     // Patron
  100000: 'CPT',    // Chief Patron
};
const COLOR_SCHEMES = [
  {
    name: "Royal Blue",
    headerBg: "#1e40af",
    headerText: "#ffffff",
    border: "#3b82f6",
    detailText: "#1e40af",
    accent: "#3b82f6",
    barcode: "#1e40af",
    cardBg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    mainBg: "#f0f9ff",
    amount: 500,
  },
  {
    name: "Maroon Red",
    headerBg: "#7f1d1d",
    headerText: "#ffffff",
    border: "#b91c1c",
    detailText: "#7f1d1d",
    accent: "#b91c1c",
    barcode: "#7f1d1d",
    cardBg: "linear-gradient(135deg, #fca5a5 0%, #b91c1c 100%)",
    mainBg: "#fee2e2",
    amount: 5000,
  },
  {
    name: "Bronze",
    headerBg: "#92400e",
    headerText: "#ffffff",
    border: "#d97706",
    detailText: "#92400e",
    accent: "#d97706",
    barcode: "#92400e",
    cardBg: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    mainBg: "#fffbeb",
    amount: 10000,
  },
  {
    name: "Silver",
    headerBg: "#475569",
    headerText: "#ffffff",
    border: "#64748b",
    detailText: "#475569",
    accent: "#64748b",
    barcode: "#475569",
    cardBg: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
    mainBg: "#f8fafc",
    amount: 25000,
  },
  {
    name: "Gold",
    headerBg: "#a16207",
    headerText: "#ffffff",
    border: "#ca8a04",
    detailText: "#a16207",
    accent: "#eab308",
    barcode: "#a16207",
    cardBg: "linear-gradient(135deg, #fef3c7 0%, #fde047 100%)",
    mainBg: "#fefce8",
    amount: 50000,
  },
  {
    name: "Platinum",
    headerBg: "#374151",
    headerText: "#ffffff",
    border: "#6b7280",
    detailText: "#374151",
    accent: "#9ca3af",
    barcode: "#374151",
    cardBg: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    mainBg: "#f9fafb",
    amount: 100000,
  },
  {
    name: "Premium Gold",
    headerBg: "#92400e",
    headerText: "#fbbf24",
    border: "#f59e0b",
    detailText: "#92400e",
    accent: "#f59e0b",
    barcode: "#92400e",
    cardBg: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    mainBg: "#fef3c7",
    amount: 500000,
  },
];

const CARD_TYPE_MAP = {
  500: "ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವ",
  5000: "ವಿಶೇಷ ಸದಸ್ಯತ್ವ",
  10000: "ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ",
  25000: "ಆಜೀವ ಸದಸ್ಯತ್ವ",
  50000: "ಪೋಷಕ ಸದಸ್ಯತ್ವ",
  100000: "ಮಹಾಪೋಷಕ ಸದಸ್ಯತ್ವ",
  500000: "ಪ್ರೀಮಿಯಂ ಚಿನ್ನದ ಸದಸ್ಯತ್ವ",
};

const MembershipCard = ({
  membershipData,
  colorIdx: colorIdxProp,
  onColorChange,
  showColorPicker = true,
  onImageLoad,
  exportMode = false,
}) => {
  const getMembershipAmount = () => {
    if (!membershipData || !membershipData.values) return 500;
    const amountField = membershipData.values.find(
      (v) =>
        v.label?.toLowerCase().includes("membership amount") ||
        v._doc?.label?.toLowerCase().includes("membership amount")
    );
    if (amountField) {
      const amount = amountField.value || amountField._doc?.value;
      return parseInt(amount) || 500;
    }
    return 500;
  };

  const getCardType = (amount) => {
    return CARD_TYPE_MAP[amount] || "ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್";
  };

  const getColorSchemeByAmount = (amount) => {
    const scheme = COLOR_SCHEMES.find((scheme) => scheme.amount === amount);
    const idx = scheme ? COLOR_SCHEMES.indexOf(scheme) : 0;
    return idx;
  };

  const membershipAmount = getMembershipAmount();
  const cardTypeDisplay = getCardType(membershipAmount);
  const autoColorIdx = getColorSchemeByAmount(membershipAmount);

  const [colorIdx, setColorIdx] = useState(colorIdxProp ?? autoColorIdx);
  const color = COLOR_SCHEMES[colorIdx];
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const newMembershipAmount = getMembershipAmount();
    const newAutoColorIdx = getColorSchemeByAmount(newMembershipAmount);
    if (colorIdxProp === undefined) setColorIdx(newAutoColorIdx);
  }, [membershipData, colorIdxProp]);

  const getValue = (label) => {
    if (!membershipData || !membershipData.values) return "";
    const field = membershipData.values.find(
      (v) =>
        v.label?.trim()?.toLowerCase() === label?.trim()?.toLowerCase() ||
        v.label?.trim()?.toLowerCase().includes(label?.trim()?.toLowerCase()) ||
        v._doc?.label?.trim()?.toLowerCase() ===
          label?.trim()?.toLowerCase() ||
        v._doc?.label?.trim()?.toLowerCase().includes(label?.trim()?.toLowerCase())
    );
    if (!field) return "";
    if (field.value !== undefined) return field.value;
    if (field._doc && field._doc.value !== undefined) return field._doc.value;
    return "";
  };

  const getPhoto = () => {
    if (!membershipData || !membershipData.values) return undefined;
    const photoField = membershipData.values.find((v) =>
      v._doc?.label?.includes("ಛಾಯಾಚಿತ್ರ /Upload photo")
    );
    if (photoField && photoField.media && photoField.media.length > 0) {
      const mediaItem = photoField.media[0];
      if (
        mediaItem &&
        mediaItem.image_url &&
        mediaItem.image_url.full &&
        mediaItem.image_url.full.high_res
      ) {
        return `${API_BASE_URL}${mediaItem.image_url.full.high_res}`;
      }
    }
    return undefined;
  };

  const membershipNumber = membershipData?.membershipId;

  const name =
    getValue("ಅರ್ಜಿದಾರನ/ಳ ಹೆಸರು/ Applicant Name") ||
    getValue("Name") ||
    getValue("Your Name") ||
    "N/A";
  const dob =
    getValue("Date of Birth") ||
    getValue("ಜನ್ಮ ದಿನಾಂಕ/Date of Birth") ||
    getValue("Birth") ||
    "N/A";
  const address =
    getValue("Permanent adress") ||
    getValue("Permanent Address") ||
    getValue("ಖಾಯಂ ವಿಳಾಸ / Permanent adress") ||
    "N/A";
  const education =
    getValue("ವಿದ್ಯಾರ್ಹತೆ") ||
    getValue("ವಿದ್ಯಾರ್ಹತೆ/ ವೃತ್ತಿ / Qualification/ Profession") ||
    "ನೋಡಿ";

  const photo = getPhoto();

  const cardId = membershipNumber;
  const qrValue = `${API_BASE_URL}/membership/user/${membershipData?.membershipId}`;

  const handleColorChange = (idx) => {
    setColorIdx(idx);
    if (onColorChange) onColorChange(idx);
  };
  const prefix = membershipPrefixMap[membershipAmount] || '';

  return (
    <div className="flex flex-col items-center">
      <div
        className="mx-auto"
        style={{
          minWidth: 480,
          minHeight: 300,
          maxWidth: 600,
          fontFamily: "Inter, Roboto, Segoe UI, Arial, sans-serif",
          background: exportMode ? "#ffffff" : color.cardBg,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'geometricPrecision',
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
          {/* Header with logo */}
          <div
            className="text-center py-2 px-3 rounded-t-xl flex items-center"
            style={{
              background: color.headerBg,
              color: color.headerText,
              fontFamily: "Inter, Roboto, Segoe UI, Arial, sans-serif",
            }}
          >
            {/* Logo image on left */}
            <div className="flex-shrink-0 ">
  <img
    src="assets/logo1.png"
    alt="Logo"
    crossOrigin="anonymous"
    style={{ height: 75, width: 160, objectFit: "contain" }} // increased size
  />
</div>
{/* Text center aligned but flex-grow, shifted slightly left */}
<div className="flex-grow" style={{ marginLeft: "-2.5rem" }}>
  <h1
    className="text-lg font-bold mb-1"
    style={{
      letterSpacing: "normal",
      lineHeight: 1.3,
      fontFamily:
        "'Noto Sans Kannada','Noto Sans','Inter','Segoe UI',Arial,sans-serif",
      fontWeight: 700,
      fontSynthesis: 'none',
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility',
    }}
  >
    ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾ (ರಿ.,)
  </h1>
  <h1
    className="text-lg font-bold mb-1"
    style={{
      letterSpacing: "normal",
      lineHeight: 1.3,
      fontFamily:
        "'Inter','Segoe UI','Noto Sans',Arial,sans-serif",
      fontWeight: 700,
      fontSynthesis: 'none',
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility',
    }}
  >
    Karnataka Madara Mahasabha (R.,)
  </h1>
  <div className="flex justify-center">
    <div
      className="w-4/5 border-t"
      style={{
        borderColor: color.headerText,
        opacity: 0.4,
        margin: "0.15rem 0",
      }}
    ></div>
  </div>
  <p className="text-xs font-medium mt-1" style={{ letterSpacing: 'normal', fontKerning: 'normal' }}>
    ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್
  </p>
</div>

          </div>

          {/* Main Content */}
          <div
            className="flex flex-1 px-4 py-2"
            style={{
              color: color.detailText,
              background: exportMode ? "#fff7f7" : color.mainBg,
              borderLeft: `4px solid ${color.accent}`,
              borderRight: `4px solid ${color.accent}`,
            }}
          >
            {/* Left side - Details */}
            <div className="flex-1 pr-2 flex flex-col justify-center items-start">
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಸದಸ್ಯತ್ವ ಸಂಖ್ಯೆ: </span>
                <span className="font-bold" style={{ color: color.accent }}>
                  {membershipNumber}
                </span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಹೆಸರು: </span>
                <span className="font-bold">{name}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಜನ್ಮ ದಿನಾಂಕ: </span>
                <span className="font-bold">{dob}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ಖಾಯಂ ವಿಳಾಸ: </span>
                <span className="break-words">{address}</span>
              </div>
              <div className="mb-0.5 text-sm font-medium">
                <span className="font-semibold">ವಿದ್ಯಾರ್ಹತೆ: </span>
                <span>{education}</span>
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
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover"
                      onLoad={() => {
                        setImageLoaded(true);
                        if (onImageLoad) onImageLoad();
                      }}
                    />
                  ) : (
                    <span className="text-xs font-semibold tracking-wide text-gray-500">
                      ಪದವೀಧರ ಪ್ರಮುಖ ಚಿತ್ರ ಇಲ್ಲ
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div
            className="border-t border-dashed mt-0 pt-1 px-4 pb-1 flex items-center justify-between"
            style={{
              minHeight: 50,
              borderColor: color.accent,
              background: exportMode ? "#fff7f7" : color.mainBg,
              borderLeft: `4px solid ${color.accent}`,
              borderRight: `4px solid ${color.accent}`,
              borderBottom: `4px solid ${color.accent}`,
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            {/* QR Code with centered text */}
            <div className="flex items-center space-x-3">
              <div
                className="w-16 h-16 flex items-center justify-center bg-white rounded border"
                style={{ borderColor: color.border, padding: "4px" }}
              >
                {qrValue && <QRCode value={qrValue} size={48} />}
              </div>
              {/* The text box must use same h-16 and flex items-center */}
              <div className="h-16 flex items-center" style={{ marginLeft: "50px" }}>
  <span
    className="text-base font-bold whitespace-nowrap"
    style={{ color: color.accent }}
  >
    {/* {prefix ? `${prefix}-` : ''} */}
    {cardTypeDisplay}
  </span>
</div>
            </div>

            {/* Signatures */}
            <div className="flex-1 flex justify-end space-x-8">
              <div className="text-center">
                <div
                  className="h-6 border-b mb-1"
                  style={{ borderColor: color.border }}
                />
                <span
                  className="text-xs font-medium"
                  style={{
                    letterSpacing: 'normal',
                    fontKerning: 'normal',
                    textRendering: 'optimizeLegibility',
                    fontFamily: "'Noto Sans Kannada','Noto Sans','Inter','Segoe UI',Arial,sans-serif",
                    fontVariantLigatures: 'normal',
                    fontFeatureSettings: '"kern" 1, "liga" 1, "clig" 1',
                  }}
                >
                  ಪ್ರಧಾನ ಕಾರ್ಯದರ್ಶಿ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
