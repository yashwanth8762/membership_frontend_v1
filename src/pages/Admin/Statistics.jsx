import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { API_BASE_URL } from "../../../config";
import { notifyError, notifySuccess } from "../../utils/toastify";

export default function Statistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API_BASE_URL}membership/statistics`);
      setStatistics(res.data);
    } catch (err) {
      setError("Failed to load statistics.");
      notifyError("Failed to load statistics.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDistrictStats = async () => {
    if (!statistics || !statistics.districtStats) {
      notifyError("No district statistics available to download.");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Title
      pdf.setFontSize(18);
      pdf.text("District & Taluk Statistics", 105, 20, { align: "center" });
      
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: "center" });

      let yPos = 45;
      const pageHeight = 280;
      const lineHeight = 8;
      const margin = 15;

      pdf.setFontSize(12);
      pdf.setFont(undefined, "bold");

      statistics.districtStats.forEach((district, idx) => {
        // Check if we need a new page
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = 20;
        }

        // District header (English only to avoid encoding issues)
        pdf.setFontSize(12);
        pdf.setFont(undefined, "bold");
        pdf.text(`District: ${district.districtName}`, margin, yPos);
        yPos += lineHeight;
        pdf.text(`Total Memberships: ${district.totalMemberships}`, margin + 5, yPos);
        yPos += lineHeight + 2;

        // Taluk details (English only)
        pdf.setFontSize(10);
        pdf.setFont(undefined, "normal");
        if (district.taluks.length === 0) {
          pdf.text("No taluks in this district", margin + 10, yPos);
          yPos += lineHeight;
        } else {
          district.taluks.forEach((taluk) => {
            if (yPos > pageHeight - 20) {
              pdf.addPage();
              yPos = 20;
            }
            pdf.text(`  • ${taluk.talukName}: ${taluk.count} memberships`, margin + 10, yPos);
            yPos += lineHeight;
          });
        }
        yPos += 5; // Space between districts
      });

      pdf.save("district_taluk_statistics.pdf");
      notifySuccess("District statistics PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      notifyError("Failed to generate PDF.");
    }
  };

  const handleDownloadTalukStats = async () => {
    if (!statistics || !statistics.talukStats) {
      notifyError("No taluk statistics available to download.");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Title
      pdf.setFontSize(18);
      pdf.text("Taluk Statistics", 148, 20, { align: "center" });
      
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 148, 30, { align: "center" });

      // Table headers
      let yPos = 45;
      const pageHeight = 200;
      const lineHeight = 8;
      const margin = 15;
      const colPositions = [margin, margin + 80, margin + 150];

      pdf.setFontSize(10);
      pdf.setFont(undefined, "bold");
      pdf.text("Taluk Name", colPositions[0], yPos);
      pdf.text("District Name", colPositions[1], yPos);
      pdf.text("Memberships", colPositions[2], yPos);
      
      yPos += lineHeight;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPos, 200, yPos);
      yPos += 3;

      // Table rows (English only)
      pdf.setFont(undefined, "normal");
      statistics.talukStats.forEach((taluk) => {
        if (yPos > pageHeight) {
          pdf.addPage();
          yPos = 20;
          // Redraw headers
          pdf.setFont(undefined, "bold");
          pdf.text("Taluk Name", colPositions[0], yPos);
          pdf.text("District Name", colPositions[1], yPos);
          pdf.text("Memberships", colPositions[2], yPos);
          yPos += lineHeight;
          pdf.line(margin, yPos, 200, yPos);
          yPos += 3;
          pdf.setFont(undefined, "normal");
        }

        pdf.text(taluk.talukName || "", colPositions[0], yPos);
        pdf.text(taluk.districtName || "", colPositions[1], yPos);
        pdf.text(taluk.count.toString(), colPositions[2], yPos);
        yPos += lineHeight;
      });

      pdf.save("taluk_statistics.pdf");
      notifySuccess("Taluk statistics PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      notifyError("Failed to generate PDF.");
    }
  };

  const handleDownloadAllStats = async () => {
    if (!statistics) {
      notifyError("No statistics available to download.");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      let yPos = 20;
      const pageHeight = 280;
      const lineHeight = 8;
      const margin = 15;

      // Summary Section
      pdf.setFontSize(18);
      pdf.setFont(undefined, "bold");
      pdf.text("Complete Statistics Report", 105, yPos, { align: "center" });
      yPos += 10;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, yPos, { align: "center" });
      yPos += 15;

      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("Summary", margin, yPos);
      yPos += lineHeight + 2;

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      pdf.text(`Total Districts: ${statistics.summary.totalDistricts}`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Total Taluks: ${statistics.summary.totalTaluks}`, margin + 5, yPos);
      yPos += lineHeight;
      pdf.text(`Total Memberships: ${statistics.summary.totalMemberships}`, margin + 5, yPos);
      yPos += 15;

      // District Statistics Section
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("District Statistics", margin, yPos);
      yPos += lineHeight + 2;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      statistics.districtStats.forEach((district) => {
        if (yPos > pageHeight - 20) {
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(`${district.districtName}: ${district.totalMemberships} memberships, ${district.taluks.length} taluks`, margin + 5, yPos);
        yPos += lineHeight;
      });
      yPos += 10;

      // Taluk Statistics Section
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("Taluk Statistics", margin, yPos);
      yPos += lineHeight + 2;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      statistics.talukStats.forEach((taluk) => {
        if (yPos > pageHeight - 20) {
          pdf.addPage();
          yPos = 20;
        }
        pdf.text(`${taluk.talukName} - ${taluk.districtName}: ${taluk.count} memberships`, margin + 5, yPos);
        yPos += lineHeight;
      });
      yPos += 10;

      // Detailed Breakdown Section
      if (yPos > pageHeight - 50) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont(undefined, "bold");
      pdf.text("Detailed District-Taluk Breakdown", margin, yPos);
      yPos += lineHeight + 2;

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      statistics.districtStats.forEach((district) => {
        if (yPos > pageHeight - 30) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFont(undefined, "bold");
        pdf.text(`${district.districtName} - Total: ${district.totalMemberships}`, margin + 5, yPos);
        yPos += lineHeight;

        pdf.setFont(undefined, "normal");
        if (district.taluks.length === 0) {
          pdf.text("  No taluks in this district", margin + 10, yPos);
          yPos += lineHeight;
        } else {
          district.taluks.forEach((taluk) => {
            if (yPos > pageHeight - 20) {
              pdf.addPage();
              yPos = 20;
            }
            pdf.text(`  • ${taluk.talukName}: ${taluk.count} memberships`, margin + 10, yPos);
            yPos += lineHeight;
          });
        }
        yPos += 3;
      });

      pdf.save("complete_statistics.pdf");
      notifySuccess("Complete statistics PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      notifyError("Failed to generate PDF.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">District & Taluk Statistics</h2>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadDistrictStats}
              disabled={loading || !statistics}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none transition"
            >
              Download District Stats PDF
            </button>
            <button
              onClick={handleDownloadTalukStats}
              disabled={loading || !statistics}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none transition"
            >
              Download Taluk Stats PDF
            </button>
            <button
              onClick={handleDownloadAllStats}
              disabled={loading || !statistics}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none transition"
            >
              Download Complete Report PDF
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded shadow">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-600 font-semibold">
            Loading statistics...
          </div>
        ) : statistics ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium opacity-90 mb-1">Total Districts</div>
                <div className="text-4xl font-bold">{statistics.summary.totalDistricts}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium opacity-90 mb-1">Total Taluks</div>
                <div className="text-4xl font-bold">{statistics.summary.totalTaluks}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium opacity-90 mb-1">Total Memberships</div>
                <div className="text-4xl font-bold">{statistics.summary.totalMemberships}</div>
              </div>
            </div>

            {/* District Statistics Table */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">District Statistics</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-400 shadow-sm">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Name (Kannada)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Total Memberships
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Number of Taluks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {statistics.districtStats.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-6 text-gray-500 font-medium">
                          No district statistics available.
                        </td>
                      </tr>
                    ) : (
                      statistics.districtStats.map((district, idx) => (
                        <tr key={district.districtId || idx} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {district.districtName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {district.districtKName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {district.totalMemberships}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {district.taluks.length}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Taluk Statistics Table */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Taluk Statistics</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-400 shadow-sm">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Taluk Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Taluk Name (Kannada)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Name (Kannada)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Total Memberships
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {statistics.talukStats.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-gray-500 font-medium">
                          No taluk statistics available.
                        </td>
                      </tr>
                    ) : (
                      statistics.talukStats.map((taluk, idx) => (
                        <tr key={taluk.talukId || idx} className="hover:bg-green-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {taluk.talukName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {taluk.talukKName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {taluk.districtName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {taluk.districtKName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {taluk.count}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed District-Taluk Breakdown */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Detailed District-Taluk Breakdown</h3>
              <div className="overflow-x-auto rounded-lg border border-gray-400 shadow-sm">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Name (Kannada)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        District Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Taluk Name (English)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Taluk Name (Kannada)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Taluk Memberships
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {statistics.districtStats.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-6 text-gray-500 font-medium">
                          No detailed statistics available.
                        </td>
                      </tr>
                    ) : (
                      statistics.districtStats.map((district, districtIdx) => (
                        <React.Fragment key={district.districtId || districtIdx}>
                          {/* District header row */}
                          <tr className="bg-blue-50 font-semibold">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {district.districtName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {district.districtKName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {district.totalMemberships}
                            </td>
                            <td colSpan={3} className="px-6 py-4"></td>
                          </tr>
                          {/* Taluk rows */}
                          {district.taluks.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-6 py-2 text-sm text-gray-500 italic">
                                No taluks in this district
                              </td>
                            </tr>
                          ) : (
                            district.taluks.map((taluk, talukIdx) => (
                              <tr key={`${district.districtId}-${taluk.talukId || talukIdx}`} className="hover:bg-gray-50">
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                                  {taluk.talukName}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                                  {taluk.talukKName}
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {taluk.count}
                                </td>
                              </tr>
                            ))
                          )}
                          {/* Spacing row */}
                          <tr>
                            <td colSpan={6} className="px-6 py-2 bg-gray-50"></td>
                          </tr>
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-600 font-semibold">
            No statistics available.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

