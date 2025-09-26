import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import AdminLayout from "./AdminLayout";
import MembershipCard from "../../components/MembershipCard";
import { API_BASE_URL } from "../../../config";

export default function MembershipReport() {
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("30");
  const [selectedTaluk, setSelectedTaluk] = useState("30");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTaluks, setLoadingTaluks] = useState(false);
  const [error, setError] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [cardRecord, setCardRecord] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);
        const res = await axios.get(`${API_BASE_URL}district/public/active`);
        setDistricts([{ _id: "30", name: "All Districts" }, ...(res.data || [])]);
        setError("");
      } catch {
        setError("Failed to load districts.");
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (!selectedDistrict || selectedDistrict === "30") {
      setTaluks([{ _id: "30", name: "All Taluks" }]);
      setSelectedTaluk("30");
      return;
    }
    const fetchTaluks = async () => {
      try {
        setLoadingTaluks(true);
        const res = await axios.get(`${API_BASE_URL}taluk/public/get-taluk-by-district/${selectedDistrict}`);
        setTaluks([{ _id: "30", name: "All Taluks" }, ...(res.data?.data?.taluks || [])]);
        setSelectedTaluk("30");
        setError("");
      } catch {
        setTaluks([{ _id: "30", name: "All Taluks" }]);
        setSelectedTaluk("30");
        setError("Failed to load taluks for selected district.");
      } finally {
        setLoadingTaluks(false);
      }
    };
    fetchTaluks();
  }, [selectedDistrict]);

  useEffect(() => {
    const fetchSubmissions = async (districtId, talukId) => {
      if (!districtId || !talukId) {
        setSubmissions([]);
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}membership/submissions?district=${districtId}&taluk=${talukId}`);
        setSubmissions(res.data || []);
        setError("");
      } catch {
        setSubmissions([]);
        setError("Failed to load membership submissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions(selectedDistrict, selectedTaluk);
  }, [selectedDistrict, selectedTaluk]);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedTaluk("30");
  };

  const handleTalukChange = (e) => {
    setSelectedTaluk(e.target.value);
  };

  const getCardHolderName = (values) => {
    if (!values) return "";
    const field = values.find(
      (v) =>
        v.label &&
        (v.label.trim().toLowerCase() === "enter your name" ||
          v.label.trim().toLowerCase() === "name" ||
          v.label.trim().toLowerCase().includes("your name"))
    );
    return field ? field.value : "";
  };

  const handleViewCard = async (submission) => {
    if (submission?.values && Array.isArray(submission.values)) {
      // Ensure MembershipCard receives media paths compatible with its own prefixing
      const fixedValues = submission.values.map((item) => {
        if (
          item.label === "ಛಾಯಾಚಿತ್ರ /Upload photo" &&
          Array.isArray(item.media) &&
          item.media.length > 0
        ) {
          const fixedMedia = item.media.map((mediaItem) => {
            const m = { ...mediaItem };
            const highRes = m?.image_url?.full?.high_res;
            if (typeof highRes === 'string') {
              // If backend already returned absolute URL or one we previously prefixed,
              // strip the API_BASE_URL so MembershipCard can safely prepend it once.
              const base = API_BASE_URL;
              const normalized = highRes.startsWith(base)
                ? highRes.slice(base.length)
                : highRes;
              m.image_url = {
                ...(m.image_url || {}),
                full: {
                  ...((m.image_url && m.image_url.full) || {}),
                  high_res: normalized.replace(/^\/+/, ''),
                },
              };
            }
            return m;
          });
          return { ...item, media: fixedMedia };
        }
        return item;
      });
      setCardRecord({ ...submission, values: fixedValues });
    } else {
      setCardRecord(submission);
    }
    setShowCard(true);
  };

  // When showing the card, fix relative asset paths (logo/signature) to be root-relative
  useEffect(() => {
    if (!showCard || !cardRef.current) return;
    const fixLocalAssets = () => {
      try {
        const imgs = cardRef.current.querySelectorAll('img');
        imgs.forEach((img) => {
          const src = img.getAttribute('src') || '';
          if (src.startsWith('assets/')) {
            img.setAttribute('src', `/${src}`);
          }
        });
      } catch {}
    };
    // run now and after a short delay to catch late renders
    fixLocalAssets();
    const t = setTimeout(fixLocalAssets, 50);
    return () => clearTimeout(t);
  }, [showCard]);

  const closeCard = () => {
    setShowCard(false);
    setCardRecord(null);
  };

  const waitForFonts = async () => {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {}
    }
  };

  const waitForImagesToLoad = (container) => {
    const images = container.querySelectorAll('img');
    const promises = [];
    images.forEach(img => {
      if (img.complete) return;
      promises.push(new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      }));
    });
    return Promise.all(promises);
  };

  const handleExportPDF = async () => {
    if (!cardRef.current) return;

    await waitForFonts();
    await waitForImagesToLoad(cardRef.current);
    await new Promise(r => setTimeout(r, 300)); // safety delay

    const html2pdf = (await import("html2pdf.js")).default;

    // Create hidden container to avoid layout issues during export
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '600px';
    container.style.background = '#fff';
    document.body.appendChild(container);

    container.innerHTML = cardRef.current.outerHTML;
    const node = container.firstChild;
    node.style.width = '600px';

    const rect = node.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);
    const scale = Math.max(3, Math.ceil(window.devicePixelRatio || 2));

    const options = {
      margin: 0,
      filename: `membership_card_${cardRecord?.membershipId || "card"}.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: {
        scale,
        backgroundColor: '#fff',
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

    await html2pdf().set(options).from(node).save();
    document.body.removeChild(container);
  };

  const handleExportAllXLSX = () => {
    if (!submissions.length) return;
    const rows = submissions.map(record => {
      const obj = {
        "Membership ID": record.membershipId || "",
        "District": record.district?.name || "",
        "Taluk": record.taluk?.name || "",
        "Submitted At": record.submittedAt ? new Date(record.submittedAt).toLocaleString() : ""
      };
      if (Array.isArray(record.values)) {
        record.values.forEach(v => {
          if (v.label && (v.label.toLowerCase().includes("image") || v.label.toLowerCase().includes("photo"))) {
            obj[v.label] = v.media && v.media.length > 0
              ? v.media.map(m => m.name?.original || m.name?.temp || "Image Provided").join(", ")
              : "No Image";
          } else {
            obj[v.label] = v.value;
          }
        });
      }
      return obj;
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Members");
    XLSX.writeFile(wb, `membership_report.xlsx`);
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 flex justify-between items-center">
          Membership Report
          <button onClick={handleExportAllXLSX} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none">
            Download Excel
          </button>
        </h2>

        {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded shadow">{error}</div>}

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex flex-col w-64">
            <label htmlFor="district" className="mb-2 font-semibold text-gray-700">District</label>
            {loadingDistricts ? <div className="text-gray-500 italic">Loading districts...</div> : (
              <select id="district" value={selectedDistrict} onChange={handleDistrictChange} className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition">
                {districts.map(d => <option key={d._id || d.id} value={d._id || d.id}>{d.name}</option>)}
              </select>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="taluk" className="mb-2 font-semibold text-gray-700">Taluk</label>
            {loadingTaluks ? <div className="text-gray-500 italic">Loading taluks...</div> : (
              <select id="taluk" value={selectedTaluk} onChange={handleTalukChange} disabled={!taluks.length} className={`block w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none transition ${taluks.length ? "border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 bg-white" : "border-gray-200 bg-gray-100 cursor-not-allowed"}`}>
                {taluks.map(t => <option key={t._id || t.id} value={t._id || t.id}>{t.name}</option>)}
              </select>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600 font-semibold">Loading membership submissions...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-400 shadow-sm">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Membership ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Cardholder Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">District</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Taluk</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {!submissions.length ? (
                  <tr><td colSpan={5} className="text-center py-6 text-gray-500 font-medium">No records found.</td></tr>
                ) : (
                  submissions.map(s => (
                    <tr key={s.membershipId || s.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.membershipId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{getCardHolderName(s.values) || <span className="text-gray-400">N/A</span>}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.district?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.taluk?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button onClick={() => handleViewCard(s)} className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded font-semibold text-xs shadow">
                          View Card
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCard && cardRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full flex flex-col items-center" style={{ minWidth: 520, minHeight: 400 }}>
            <button onClick={closeCard} aria-label="Close" className="absolute top-4 right-4 z-20 text-gray-700 text-3xl font-bold hover:text-red-600 focus:outline-none" style={{ background: "rgba(255,255,255,0.8)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            <div ref={cardRef} className="z-10">
              <MembershipCard membershipData={cardRecord} isEnglish={false} />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none z-10">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
