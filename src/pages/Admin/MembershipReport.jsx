import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
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
        const districtsData = res.data || [];
        setDistricts([{ _id: "30", name: "All Districts" }, ...districtsData]);
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
        const res = await axios.get(
          `${API_BASE_URL}taluk/public/get-taluk-by-district/${selectedDistrict}`
        );
        const taluksData = res.data?.data?.taluks || [];
        setTaluks([{ _id: "30", name: "All Taluks" }, ...taluksData]);
        setSelectedTaluk("30");
        setError("");
      } catch {
        setError("Failed to load taluks for selected district.");
        setTaluks([{ _id: "30", name: "All Taluks" }]);
        setSelectedTaluk("30");
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
        const res = await axios.get(
          `${API_BASE_URL}membership/submissions?district=${districtId}&taluk=${talukId}`
        );
        setSubmissions(res.data || []);
        setError("");
      } catch {
        setError("Failed to load membership submissions.");
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions(selectedDistrict, selectedTaluk);
  }, [selectedDistrict, selectedTaluk]);

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedTaluk("30");
  };

  const handleTalukChange = (e) => {
    const talukId = e.target.value;
    setSelectedTaluk(talukId);
  };

  const getCardHolderName = (values) => {
    if (!values) return "";
    let field = values.find(
      (v) =>
        v.label &&
        (
          v.label.trim().toLowerCase() === "enter your name" ||
          v.label.trim().toLowerCase() === "name" ||
          v.label.trim().toLowerCase().includes("your name")
        )
    );
    return field ? field.value : "";
  };

  const handleViewCard = (submission) => {
    setCardRecord(submission);
    setShowCard(true);
  };

  const closeCard = () => {
    setShowCard(false);
    setCardRecord(null);
  };

  const handleDownload = () => {
    if (!cardRef.current) return;
    html2canvas(cardRef.current, { useCORS: true, backgroundColor: null }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `membership_card_${cardRecord.membershipId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleExportXLSX = () => {
    if (!cardRecord) return;

    const record = cardRecord;
    const obj = {};
    obj["Membership ID"] = record.membershipId || "";
    obj["District"] = record.district?.name || "";
    obj["Taluk"] = record.taluk?.name || "";
    obj["Submitted At"] = record.submittedAt
      ? new Date(record.submittedAt).toLocaleString()
      : "";

    if (Array.isArray(record.values)) {
      record.values.forEach((v) => {
        if (
          v.label &&
          (v.label.toLowerCase().includes("upload image") ||
            v.label.toLowerCase().includes("photo") ||
            v.label.toLowerCase().includes("image"))
        ) {
          if (v.media && v.media.length > 0) {
            obj[v.label] = v.media.map(
              (m) => m.name?.original || m.name?.temp || "Image Provided"
            ).join(", ");
          } else {
            obj[v.label] = "No Image";
          }
        } else {
          obj[v.label] = v.value;
        }
      });
    }

    const ws = XLSX.utils.json_to_sheet([obj]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CardHolder");
    XLSX.writeFile(
      wb,
      `membership_card_${record.membershipId || "card"}.xlsx`
    );
  };

  const handleExportAllXLSX = () => {
    if (!submissions.length) return;
    const rows = submissions.map((record) => {
      const obj = {};

      obj["Membership ID"] = record.membershipId || "";
      obj["District"] = record.district?.name || "";
      obj["Taluk"] = record.taluk?.name || "";
      obj["Submitted At"] = record.submittedAt
        ? new Date(record.submittedAt).toLocaleString()
        : "";

      if (Array.isArray(record.values)) {
        record.values.forEach((v) => {
          if (
            v.label &&
            (v.label.toLowerCase().includes("upload image") ||
              v.label.toLowerCase().includes("photo") ||
              v.label.toLowerCase().includes("image"))
          ) {
            if (v.media && v.media.length > 0) {
              obj[v.label] = v.media.map(
                (m) => m.name?.original || m.name?.temp || "Image Provided"
              ).join(", ");
            } else {
              obj[v.label] = "No Image";
            }
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
      {/* Button to export all users Excel above table */}
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 flex justify-between items-center">
          Membership Report
          <button
            onClick={handleExportAllXLSX}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none"
          >
            Download Excel
          </button>
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded shadow">{error}</div>
        )}

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex flex-col w-64">
            <label htmlFor="district" className="mb-2 font-semibold text-gray-700">
              District
            </label>
            {loadingDistricts ? (
              <div className="text-gray-500 italic">Loading districts...</div>
            ) : (
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              >
                {districts.map((d) => (
                  <option key={d._id || d.id} value={d._id || d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col w-64">
            <label htmlFor="taluk" className="mb-2 font-semibold text-gray-700">
              Taluk
            </label>
            {loadingTaluks ? (
              <div className="text-gray-500 italic">Loading taluks...</div>
            ) : (
              <select
                id="taluk"
                value={selectedTaluk}
                onChange={handleTalukChange}
                disabled={!taluks.length}
                className={`block w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none transition ${
                  taluks.length
                    ? "border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 bg-white"
                    : "border-gray-200 bg-gray-100 cursor-not-allowed"
                }`}
              >
                {taluks.map((t) => (
                  <option key={t._id || t.id} value={t._id || t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600 font-semibold">
            Loading membership submissions...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-400 shadow-sm">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Membership ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Cardholder Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Taluk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500 font-medium">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  submissions.map((s) => (
                    <tr
                      key={s.membershipId || s.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {s.membershipId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {getCardHolderName(s.values) || (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {s.district?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {s.taluk?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewCard(s)}
                          className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded font-semibold text-xs shadow"
                        >
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

      {/* Modal for single card */}
      {showCard && cardRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div
            className="relative bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full flex flex-col items-center"
            style={{ minWidth: 520, minHeight: 400 }}
          >
            <button
              onClick={closeCard}
              className="absolute top-4 right-4 z-20 text-gray-700 text-3xl font-bold hover:text-red-600 focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.8)",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div ref={cardRef} className="z-10">
              <MembershipCard
                membershipData={cardRecord}
                isEnglish={false}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none z-10"
              >
                Download Card
              </button>
              <button
                onClick={handleExportXLSX}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none z-10"
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
