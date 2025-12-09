import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import MembershipCard from "../components/MembershipCard";
import { useNavigate } from "react-router-dom";
import { notifyError, notifyWarning } from "../utils/toastify";

export default function UserMembership() {
  const [form, setForm] = useState(null);
  const [values, setValues] = useState({});
  const [mediaFiles, setMediaFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [fetchedMembershipData, setFetchedMembershipData] = useState(null);
  const [fetchingMembershipData, setFetchingMembershipData] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluk, setSelectedTaluk] = useState("");
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTaluks, setLoadingTaluks] = useState(false);
  const cardRef = useRef();
  const cardOnlyRef = useRef();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const getMembershipTypeInfo = (amount) => {
    const membershipTypes = {
      1: { name: "Test Membership", color: "#3b82f6", bgColor: "#dbeafe" },
      500: { name: "General Membership", color: "#3b82f6", bgColor: "#dbeafe" },
      5000: { name: "Special Membership", color: "#10b981", bgColor: "#d1fae5" },
      10000: { name: "Premium Membership", color: "#d97706", bgColor: "#fef3c7" },
      25000: { name: "Lifetime Membership", color: "#64748b", bgColor: "#f1f5f9" },
      50000: { name: "Poshaka Membership", color: "#eab308", bgColor: "#fef3c7" },
      100000: { name: "Mahaposhaka Sadasatva", color: "#9ca3af", bgColor: "#f9fafb" },
    };
    return membershipTypes[amount] || null;
  };

  const fetchMembershipData = async (membershipId) => {
    setFetchingMembershipData(true);
    try {
      const res = await axios.get(`${API_BASE_URL}membership/submission/${membershipId}`);
      setFetchedMembershipData(res.data);
    } catch {
      setError("Failed to fetch membership details.");
    } finally {
      setFetchingMembershipData(false);
    }
  };

  const fetchDistricts = async () => {
    setLoadingDistricts(true);
    try {
      const res = await axios.get(`${API_BASE_URL}district/public/active`);
      setDistricts(res.data);
    } catch {
      setError("Failed to load districts.");
    } finally {
      setLoadingDistricts(false);
    }
  };

  const fetchTaluksByDistrict = async (districtId) => {
    if (!districtId) {
      setTaluks([]);
      return;
    }
    setLoadingTaluks(true);
    try {
      const res = await axios.get(`${API_BASE_URL}taluk/public/get-taluk-by-district/${districtId}`);
      setTaluks(res.data.data.taluks || []);
    } catch {
      setError("Failed to load taluks for selected district.");
      setTaluks([]);
    } finally {
      setLoadingTaluks(false);
    }
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedTaluk("");
    if (districtId) {
      fetchTaluksByDistrict(districtId);
    } else {
      setTaluks([]);
    }
  };

  useEffect(() => {
    async function fetchForm() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}membership/form`);
        const fetchedForm = res.data[0];
        setForm(fetchedForm);

        const initialValues = {};
        fetchedForm?.fields.forEach((f) => {
          if (f.inputType === "checkbox") {
            initialValues[f.label] = false;
          } else if (f.inputType !== "media") {
            initialValues[f.label] = "";
          }
        });

        initialValues["Blood Group"] = "";
        initialValues["Email ID"] = "";
        initialValues["Adhar No"] = "";
        initialValues["Membership Amount"] = "";

        setValues(initialValues);

        const initialMedia = {};
        fetchedForm?.fields.forEach((f) => {
          if (f.inputType === "media") {
            initialMedia[f.label] = [];
          }
        });
        setMediaFiles(initialMedia);

        await fetchDistricts();
      } catch {
        setError("Failed to load form.");
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, []);

  const handleChange = (label, value, type) => {
    if (type === "media") {
      // handled separately
    } else {
      setValues((v) => ({ ...v, [label]: value }));
    }
  };

  const handleFileChange = (label, files) => {
    if (!files || files.length === 0) {
      setMediaFiles((prev) => ({ ...prev, [label]: [] }));
      return;
    }
    const selectedFile = files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    
    if (selectedFile.size > maxSize) {
      const errorMsg = `File size is too large. Please compress the image and upload a file less than 10MB. Current size: ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB`;
      setError(errorMsg);
      setSuccess("");
      notifyWarning(errorMsg);
      return;
    }
    
    const newFileObj = {
      file: selectedFile,
      status: "pending",
      id: null,
      name: selectedFile.name,
      preview: URL.createObjectURL(selectedFile),
    };
    setMediaFiles((prev) => ({ ...prev, [label]: [newFileObj] }));
    setError("");
  };

  const handleSaveMedia = async (label, index) => {
    const fileObj = mediaFiles[label][index];
    if (!fileObj || fileObj.status !== "pending") return;

    updateMediaStatus(label, index, "uploading");
    try {
      const formData = new FormData();
      formData.append("media", fileObj.file);

      const res = await axios.post(`${API_BASE_URL}media`, formData);
      if (res.status === 200 || res.status === 201) {
        const mediaId = res.data.data || res.data.id;
        if (mediaId) {
          updateMediaDetails(label, index, { status: "saved", id: mediaId });
          setSuccess(`'${fileObj.name}' uploaded successfully!`);
          setError("");
        } else {
          updateMediaStatus(label, index, "pending");
          setError(`Invalid response for ${fileObj.name}`);
          setSuccess("");
        }
      } else {
        updateMediaStatus(label, index, "pending");
        setError(res.data.message || `Failed to upload ${fileObj.name}`);
        setSuccess("");
      }
    } catch (err) {
      updateMediaStatus(label, index, "pending");
      
      // Handle 413 Payload Too Large error
      if (err.response?.status === 413) {
        const errorMessage = `File size is too large. Please compress the image and upload a file less than 10MB.`;
        setError(errorMessage);
        setSuccess("");
        notifyError(errorMessage);
      } else {
        const errorMsg = `Failed to upload ${fileObj.name}: ${err.response?.data?.message || err.message}`;
        setError(errorMsg);
        setSuccess("");
        notifyError(errorMsg);
      }
    }
  };

  const updateMediaStatus = (label, index, status) => {
    setMediaFiles((prev) => {
      const updated = [...prev[label]];
      updated[index] = { ...updated[index], status };
      return { ...prev, [label]: updated };
    });
  };

  const updateMediaDetails = (label, index, details) => {
    setMediaFiles((prev) => {
      const updated = [...prev[label]];
      updated[index] = { ...updated[index], ...details };
      return { ...prev, [label]: updated };
    });
  };

  const handleRemoveMedia = (label, index) => {
    setMediaFiles((prev) => {
      const updated = [...prev[label]];
      if (updated[index]?.preview) {
        URL.revokeObjectURL(updated[index].preview);
      }
      updated.splice(index, 1);
      return { ...prev, [label]: updated };
    });
    setSuccess("");
    setError("");
  };

  const allMediaSaved = () => {
    return Object.entries(mediaFiles).every(([label, filesArray]) => {
      if (filesArray.length === 0) return true;
      return filesArray.every((f) => f.status === "saved");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!selectedDistrict) {
      setError("Please select a district.");
      return;
    }
    if (!selectedTaluk) {
      setError("Please select a taluk.");
      return;
    }
    if (!allMediaSaved()) {
      const unsavedMedia = Object.entries(mediaFiles)
        .filter(
          ([label, filesArray]) =>
            filesArray.length > 0 && filesArray.some((f) => f.status !== "saved")
        )
        .map(
          ([label, filesArray]) =>
            `${label}: ${filesArray
              .filter((f) => f.status !== "saved")
              .map((f) => f.name)
              .join(", ")}`
        );

      setError(
        `Please save all selected media files before submitting. Unsaved files: ${unsavedMedia.join(
          "; "
        )}`
      );
      return;
    }

    

    try {
      const submissionValues = form.fields.map((field) => {
        if (field.inputType === "media") {
          const savedMedia = mediaFiles[field.label];
          if (!savedMedia || savedMedia.length === 0)
            return { label: field.label, value: [], media: [] };
          const mediaIds = savedMedia.map((f) => f.id).filter((id) => id !== null);
          return { label: field.label, value: mediaIds, media: mediaIds };
        } else {
          return { label: field.label, value: values[field.label] ?? "", media: [] };
        }
      });

      if (!submissionValues.some((v) => v.label === "Membership Amount")) {
        submissionValues.unshift({
          label: "Membership Amount",
          value: values["Membership Amount"] || "",
          media: [],
        });
      }

      const emailVal = values["Email ID"] || "";
      const adharVal = values["Adhar No"] || "";

      submissionValues.push(
        { label: "Blood Group", value: values["Blood Group"] || "", media: [] },
        { label: "Email ID", value: emailVal, media: [] },
        { label: "Adhar No", value: adharVal, media: [] }
      );

      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}membership/submit`, {
        formId: form.id,
        district: selectedDistrict,
        taluk: selectedTaluk,
        adhar_no: adharVal,
        email: emailVal,
        bloodGroup: values["Blood Group"] || "",
        values: submissionValues,
      });
      window.location.href = res.data.checkoutPageUrl;

      setMembershipId(res.data.membershipId);
      await fetchMembershipData(res.data.membershipId);
      setSuccess("Membership card created successfully!");
      setError("");
    } catch (err) {
      setError("Failed to create membership card.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cardOnlyRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    // Clone card to remove any transforms and ensure consistent size while capturing
    const original = cardOnlyRef.current;
    const clone = original.cloneNode(true);
    // slight downscale to avoid any tight line-wrap collisions during rasterization
    clone.style.transform = 'scale(0.94)';
    clone.style.transformOrigin = 'top left';
    clone.style.background = '#ffffff';
    clone.style.width = '600px';
    clone.style.maxWidth = '600px';
    clone.style.minWidth = '600px';
    clone.style.position = 'fixed';
    clone.style.left = '-2000px';
    clone.style.top = '0';
    document.body.appendChild(clone);

    // Remove any nested transforms that could distort the export (e.g., from MembershipCard)
    try {
      const all = clone.querySelectorAll('*');
      all.forEach((el) => {
        if (el && el.style && el.style.transform) {
          el.style.transform = 'none';
        }
      });
    } catch {}

    // Small wait to let images/fonts render in the clone
    await new Promise((r) => setTimeout(r, 150));

    const scale = Math.max(3, Math.ceil((window.devicePixelRatio || 2)));
    const canvas = await html2canvas(clone, {
      scale,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: 600,
      windowHeight: clone.scrollHeight,
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [canvas.width, canvas.height],
      compress: true,
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height, '', 'FAST');
    pdf.save(`membership_card_${membershipId || 'card'}.pdf`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        position: "relative",
      }}
    >
      {/* Go to Home Button (only when overlay is shown) */}
      {!showForm && (
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            padding: "8px 18px",
            background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
          }}
        >
          Go to Home
        </button>
      )}

      {/* Info Box Full Screen */}
      {!showForm && (
        <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          background: "#f1f5f9",
          color: "#1e293b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
          padding: "0 24px",
        }}
      >
          <button
            className="steps-btn-mobile"
      onClick={() => window.open("/assets/membership_steps.pdf", "_blank")}
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        padding: "8px 12px",
        background: "linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: 14,
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
              zIndex: 110,
      }}
    >
     {/* ಆನ್ ಲೈನ್ ಸದಸಯ ತ್ವ ಪಡೆಯುವ ವಿಧಾನ */}
     ಆನ್‌ಲೈನ್ ಸದಸ್ಯತ್ವ ಪಡೆಯುವ ವಿಧಾನ

    </button>
          <div
            className="umobile-paragraph"
            style={{
              maxWidth: 900,
              fontSize: 16,
              lineHeight: 1.6,
              fontWeight: 400,
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            ಕರ್ನಾಟಕ ರಾಜ್ಯದ ವಿವಿಧ ಜಿಲ್ಲೆ ಮತ್ತು ತಾಲ್ಲೂಕುಗಳಿಂದ ಕನಿಷ್ಠ 18 ವರ್ಷ
            ವಯಸ್ಸು ತುಂಬಿದ ಮಾದರ / ಮಾದಿಗ ಜನಾಂಗದ ಪುರುಷರು ಮತ್ತು ಮಹಿಳೆಯರು
            ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾಗೆ ಸದಸ್ಯರಾಗಲು ಅರ್ಹರಾಗಿರುತ್ತಾರೆ. ಸದಸ್ಯರಾಗಲು
            ಇಚ್ಛಿಸುವ ತಾಲ್ಲೂಕು ಮತ್ತು ಜಿಲ್ಲಾ ನಿವಾಸಿಗಳು ಸಭಾದ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ
            ನಿಗಧಿಪಡಿಸಿದ ಅರ್ಜಿ ನಮೂನೆಯಲ್ಲಿ ವಿವರಗಳನ್ನು ತುಂಬಿ ನಿಗಧಿ ಪಡಿಸಿದ ಶುಲ್ಕ
            ಪಾವತಿಸಬೇಕಾಗಿರುತ್ತದೆ. ಅರ್ಜಿ ನಮೂನೆ ಮತ್ತು ಪಾವತಿ ವಿವರಗಳು ಕೆಳಕಂಡಂತಿದ್ದು,
            ಆನ್‌ಲೈನ್‌ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಶುಲ್ಕ ಪಾವತಿಸಿ ಸದಸ್ಯತ್ವ ಪಡೆಯಬಹುದಾಗಿದೆ
            ಹಾಗೂ ಮೆಂಬರ್‌ಶಿಪ್‌ ಕಾರ್ಡ್‌ನ್ನು ಡೌನ್‌ಲೋಡ್‌ ಮಾಡಿಕೊಳ್ಳಬಹುದಾಗಿದೆ.
          </div>
          <div
            className="umobile-paragraph"
            style={{
              maxWidth: 900,
              fontSize: 18,
              lineHeight: 1.7,
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Men and Women belonging to the Madara / Madiga community from various
            Districts and Taluks of Karnataka, who are at least 18 years of age,
            are eligible to become members of the Karnataka Madara Mahasabha.
            Residents of the respective Taluk and District who wish to become members
            must fill in the details in the prescribed application form determined by
            the Executive Committee of the Mahasabha and pay the prescribed membership
            fee.
          </div>
          <button
            className="cta-btn-mobile"
            onClick={() => setShowForm(true)}
            style={{
              padding: "16px 40px",
              background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
              marginTop: 16,
            }}
          >
            ಸದಸ್ಯತ್ವ ಅರ್ಜಿ ನಮೂನೆಗೆ ಮುಂದುವರೆಯಿರಿ/Continue to Membership Application
            Form
          </button>
        </div>
      )}
      {/* Mobile responsiveness for info overlay */}
      <style>
        {`
          @media (max-width: 640px) {
            .umobile-paragraph {
              max-width: 92vw !important;
              font-size: 14px !important;
              line-height: 1.55 !important;
              margin-bottom: 24px !important;
              text-align: left !important;
            }
            .steps-btn-mobile {
              padding: 6px 10px !important;
              font-size: 12px !important;
              border-radius: 6px !important;
              top: 10px !important;
              right: 10px !important;
              z-index: 2000 !important;
            }
            .cta-btn-mobile {
              padding: 12px 20px !important;
              font-size: 16px !important;
              border-radius: 10px !important;
            }
          }
        `}
      </style>

      {/* Membership Form */}
      {showForm && (
        <div
          style={{
            width: "100vw",
            minHeight: "100vh",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 0",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              width: "100%",
              maxWidth: 600,
            }}
          >
            {/* Left: Go Home inside header when form is open */}
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "8px 14px",
                background: "#e5e7eb",
                color: "#1e293b",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(99,102,241,0.06)",
                whiteSpace: "nowrap",
              }}
            >
              Go Home
            </button>
            {/* Center: Title */}
            <h2
              style={{
                fontWeight: 700,
                fontSize: 24,
                color: "#1e293b",
                textAlign: "center",
                margin: 0,
              }}
            >
              ಸದಸ್ಯತ್ವ ಅರ್ಜಿ ನಮೂನೆ/Membership Application Form
            </h2>
            {/* Right: Cancel */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                padding: "8px 14px",
                background: "#e5e7eb",
                color: "#1e293b",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(99,102,241,0.06)",
                whiteSpace: "nowrap",
              }}
            >
              Cancel
            </button>
          </div>
          <div style={{ width: "100%", maxWidth: 600 }}>
            {loading && <div>Loading form...</div>}
            {error && (
              <div style={{ color: "#e11d48", marginBottom: 12 }}>{error}</div>
            )}
            {!membershipId && form && (
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 600, margin: "0 auto" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {form.fields.map((field, idx) => {
                    const fieldMediaFiles = mediaFiles[field.label] || [];
                    const isFullWidth =
                      field.inputType === "textarea" || field.inputType === "media";
                    const labelText = field.label;
                    return (
                      <div key={idx} className={isFullWidth ? "col-span-full" : ""}>
                        <label
                          style={{
                            fontWeight: 500,
                            color: "#334155",
                            display: "block",
                            marginBottom: 6,
                          }}
                        >
                          {labelText}
                          {field.required && (
                            <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span>
                          )}
                        </label>

                        {field.inputType === "text" && (
                          <input
                            type="text"
                            value={values[field.label] || ""}
                            onChange={(e) =>
                              handleChange(field.label, e.target.value)
                            }
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        )}

                        {field.inputType === "textarea" && (
                          <textarea
                            value={values[field.label] || ""}
                            onChange={(e) =>
                              handleChange(field.label, e.target.value)
                            }
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                          />
                        )}

                        {field.inputType === "number" && (
                          <input
                            type="number"
                            value={values[field.label] || ""}
                            onChange={(e) =>
                              handleChange(field.label, e.target.value)
                            }
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        )}

                        {["dropdown", "radio"].includes(field.inputType) &&
                          field.options && (
                            <select
                              value={values[field.label] || ""}
                              onChange={(e) =>
                                handleChange(field.label, e.target.value)
                              }
                              required={field.required}
                              className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="">Select...</option>
                              {field.options.map((opt, i) => (
                                <option key={i} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          )}

                        {field.inputType === "checkbox" && (
                          <input
                            type="checkbox"
                            checked={!!values[field.label]}
                            onChange={(e) =>
                              handleChange(field.label, e.target.checked)
                            }
                            className="scale-110"
                          />
                        )}

                        {field.inputType === "media" && (
                          <div className="w-full">
                            <div
                              style={{
                                fontSize: "0.875rem",
                                color: "#64748b",
                                marginBottom: "6px",
                                padding: "8px 12px",
                                background: "#f8fafc",
                                borderRadius: "6px",
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <strong style={{ color: "#475569" }}>Note:</strong> Maximum file size is 10MB. Please compress the image before uploading if it exceeds this limit.
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(field.label, e.target.files)
                              }
                              required={
                                field.required && fieldMediaFiles.length === 0
                              }
                              className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                              style={{ minHeight: 44 }}
                            />
                            {fieldMediaFiles.length > 0 && (
                              <div className="flex gap-2 mb-2">
                                {fieldMediaFiles[0].status === "pending" && (
                                  <button
                                    type="button"
                                    onClick={() => handleSaveMedia(field.label, 0)}
                                    className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                  >
                                    Save
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMedia(field.label, 0)}
                                  className="px-4 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                >
                                  Remove
                                </button>
                                {fieldMediaFiles[0].status === "uploading" && (
                                  <span className="text-blue-600 font-semibold">
                                    Saving...
                                  </span>
                                )}
                                {fieldMediaFiles[0].status === "saved" && (
                                  <span className="text-green-600 font-semibold align-middle">
                                    ✓ Saved
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* New Fields */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                  {/* Blood Group */}
                  <div>
                    <label
                      style={{
                        fontWeight: 500,
                        color: "#334155",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Blood Group
                      <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={values["Blood Group"] || ""}
                      onChange={(e) => handleChange("Blood Group", e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  {/* Email ID */}
                  <div>
                    <label
                      style={{
                        fontWeight: 500,
                        color: "#334155",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Email ID
                      {/* <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span> */}
                    </label>
                    <input
                      type="email"
                      value={values["Email ID"] || ""}
                      onChange={(e) => handleChange("Email ID", e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  {/* Adhar No */}
                  <div>
                    <label
                      style={{
                        fontWeight: 500,
                        color: "#334155",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      Adhar No
                      <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={values["Adhar No"] || ""}
                      onChange={(e) => handleChange("Adhar No", e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* District and Taluk */}

                <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
                  {/* District */}
                  <div className="col-span-1">
                    <label
                      className="block font-medium text-gray-700 mb-2"
                      htmlFor="district-select"
                    >
                      ಜಿಲ್ಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ/Select District
                      <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span>
                    </label>
                    <select
                      id="district-select"
                      value={selectedDistrict}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={loadingDistricts}
                    >
                      <option value="">Select district...</option>
                      {districts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {loadingDistricts && (
                      <div className="text-sm text-gray-500 mt-1">
                        Loading districts...
                      </div>
                    )}
                  </div>

                  {/* Taluk */}
                  <div className="col-span-1">
                    <label
                      className="block font-medium text-gray-700 mb-2"
                      htmlFor="taluk-select"
                    >
                      ತಾಲೂಕನ್ನು ಆಯ್ಕೆಮಾಡಿ/Select Taluk
                      <span style={{ color: "#e11d48", marginLeft: 4 }}>*</span>
                    </label>
                    <select
                      id="taluk-select"
                      value={selectedTaluk}
                      onChange={(e) => setSelectedTaluk(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={!selectedDistrict || loadingTaluks}
                    >
                      <option value="">Select taluk...</option>
                      {taluks.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {loadingTaluks && (
                      <div className="text-sm text-gray-500 mt-1">Loading taluks...</div>
                    )}
                    {!selectedDistrict && (
                      <div className="text-sm text-gray-500 mt-1">
                        Please select a district first
                      </div>
                    )}
                  </div>
                </div>

                {/* Membership Amount Selection */}
                <div className="col-span-full mb-6">
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #f1f5f9 0%, #e0e7ff 100%)",
                      borderRadius: "12px",
                      boxShadow: "0 2px 8px 0 rgba(99,102,241,0.08)",
                      padding: "18px 24px",
                      marginBottom: "8px",
                      borderLeft: "6px solid #6366f1",
                      fontSize: "1.08rem",
                      color: "#1e293b",
                      fontWeight: 500,
                      lineHeight: 1.7,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#4338ca",
                        fontSize: "1.1rem",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      ಸೂಚನೆ:
                    </span>
                    <ol style={{ paddingLeft: "1.2em", margin: 0, listStyleType: "decimal" }}>
                      <li style={{ marginBottom: "6px" }}>
                        ಸಮಾನ್ಯ , ವಿಶೇಷ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ ಹೊಂದಿರುವರು ಜಿಲ್ಲ
                        /ತಾಲ್ಲೂಕ ಮಟ್ಟದ ಪದಾಧೀಕಾರಿಗಳ ಚುನಾವಣೆಗೆ ಮಾತ್ರ ಸ್ಪರ್ಧೀಸಲು ಅವಕಾಶವಿರುತ್ತದೆ.
                      </li>
                      <li>
                        ಅಜೀವ, ಪೋಷಕ ಮತ್ತು ಮಹಾ ಪೋಷಕ ಸದಸ್ಯತ್ವ ಹೊಂದಿರುವರು ಮಾತ್ರ ರಾಜ್ಯ ಮಟ್ಟದ ಪದಾಧೀಕಾರಿಗಳ ಚುನಾವಣೆಗೆ ಸ್ಪರ್ಧಿಸಲು ಆರ್ಹರಿರುತ್ತಾರೆ.
                      </li>
                    </ol>

                    <span
                      style={{
                        fontWeight: 700,
                        color: "#4338ca",
                        fontSize: "1.1rem",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Note:
                    </span>
                    <ol style={{ paddingLeft: "1.2em", margin: 0, listStyleType: "decimal" }}>
                      <li style={{ marginBottom: "6px" }}>
                        Holders of General, Special and Premium memberships can only
                        contest elections for district/taluk level positions.
                      </li>
                      <li>
                        Holders of Lifetime, Patron and Chief Patron memberships are
                        eligible to contest state level positions.
                      </li>
                    </ol>
                  </div>
                  <select
                    value={values["Membership Amount"] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, "Membership Amount": e.target.value }))
                    }
                    required
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select amount...</option>
                    {/* <option value="1">
                      ₹1 - test ಸದಸ್ಯತ್ವ/test Membership
                    </option> */}
                    <option value="500">
                      ₹500 - ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವ/General Membership
                    </option>
                    <option value="5000">
                      ₹5,000 - ವಿಶೇಷ ಸದಸ್ಯತ್ವ/Special membership
                    </option>
                    <option value="10000">
                      ₹10,000 - ಪ್ರೀಮಿಯಂ ಸದಸ್ಯತ್ವ/Premium membership
                    </option>
                    <option value="25000">
                      ₹25,000 - ಆಜೀವ ಸದಸ್ಯತ್ವ/Lifetime Membership
                    </option>
                    <option value="50000">
                      ₹50,000 - ಪ್ಯಾಟ್ರಾನ್ ಸದಸ್ಯತ್ವ/Patron Membership
                    </option>
                    <option value="100000">
                      ₹1,00,000 - ಮುಖ್ಯ ಪ್ಯಾಟ್ರಾನ್ ಸದಸ್ಯತ್ವ/Chief Patron Membership
                    </option>
                  </select>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      padding: "12px 32px",
                      background:
                        "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 18,
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
                    }}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Create Membership Card"}
                  </button>
                </div>
              </form>
            )}
            {membershipId && fetchedMembershipData && !fetchingMembershipData && (
              <div
                ref={cardRef}
                style={{
                  margin: "2rem auto",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div ref={cardOnlyRef}>
                  <MembershipCard
                    membershipData={fetchedMembershipData}
                    showColorPicker={true}
                    cardType={getMembershipTypeInfo(
                      parseInt(values["Membership Amount"])
                    )}
                  />
                </div>
                <button
                  onClick={handleDownload}
                  style={{
                    padding: "10px 28px",
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 17,
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
                    margin: "1rem auto 0",
                    display: "block",
                  }}
                >
                  Download Card
                </button>
              </div>
            )}

            {fetchingMembershipData && (
              <div style={{ textAlign: "center", margin: "2rem auto" }}>
                <div>Loading membership card...</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Go to Home button if form is not available */}
      {showForm && !loading && !form && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "14px 36px",
              background: "linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(99,102,241,0.10)",
              marginTop: 24,
            }}
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
}
