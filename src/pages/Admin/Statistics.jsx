import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
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

  const handleDownloadDistrictStats = () => {
    if (!statistics || !statistics.districtStats) {
      notifyError("No district statistics available to download.");
      return;
    }

    const rows = [];
    statistics.districtStats.forEach((district) => {
      // Add district row
      rows.push({
        "District Name (English)": district.districtName,
        "District Name (Kannada)": district.districtKName,
        "Total Memberships": district.totalMemberships,
        "Taluk Name (English)": "",
        "Taluk Name (Kannada)": "",
        "Taluk Memberships": "",
      });

      // Add taluk rows under this district
      district.taluks.forEach((taluk) => {
        rows.push({
          "District Name (English)": "",
          "District Name (Kannada)": "",
          "Total Memberships": "",
          "Taluk Name (English)": taluk.talukName,
          "Taluk Name (Kannada)": taluk.talukKName,
          "Taluk Memberships": taluk.count,
        });
      });

      // Add empty row for spacing
      rows.push({
        "District Name (English)": "",
        "District Name (Kannada)": "",
        "Total Memberships": "",
        "Taluk Name (English)": "",
        "Taluk Name (Kannada)": "",
        "Taluk Memberships": "",
      });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "District & Taluk Statistics");
    XLSX.writeFile(wb, `district_taluk_statistics.xlsx`);
    notifySuccess("Statistics downloaded successfully!");
  };

  const handleDownloadTalukStats = () => {
    if (!statistics || !statistics.talukStats) {
      notifyError("No taluk statistics available to download.");
      return;
    }

    const rows = statistics.talukStats.map((taluk) => ({
      "Taluk Name (English)": taluk.talukName,
      "Taluk Name (Kannada)": taluk.talukKName,
      "District Name (English)": taluk.districtName,
      "District Name (Kannada)": taluk.districtKName,
      "Total Memberships": taluk.count,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Taluk Statistics");
    XLSX.writeFile(wb, `taluk_statistics.xlsx`);
    notifySuccess("Taluk statistics downloaded successfully!");
  };

  const handleDownloadAllStats = () => {
    if (!statistics) {
      notifyError("No statistics available to download.");
      return;
    }

    const wb = XLSX.utils.book_new();

    // Summary sheet
    const summaryRows = [
      { Metric: "Total Districts", Value: statistics.summary.totalDistricts },
      { Metric: "Total Taluks", Value: statistics.summary.totalTaluks },
      { Metric: "Total Memberships", Value: statistics.summary.totalMemberships },
    ];
    const summaryWs = XLSX.utils.json_to_sheet(summaryRows);
    XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");

    // District statistics sheet
    const districtRows = [];
    statistics.districtStats.forEach((district) => {
      districtRows.push({
        "District Name (English)": district.districtName,
        "District Name (Kannada)": district.districtKName,
        "Total Memberships": district.totalMemberships,
        "Number of Taluks": district.taluks.length,
      });
    });
    const districtWs = XLSX.utils.json_to_sheet(districtRows);
    XLSX.utils.book_append_sheet(wb, districtWs, "District Statistics");

    // Taluk statistics sheet
    const talukRows = statistics.talukStats.map((taluk) => ({
      "Taluk Name (English)": taluk.talukName,
      "Taluk Name (Kannada)": taluk.talukKName,
      "District Name (English)": taluk.districtName,
      "District Name (Kannada)": taluk.districtKName,
      "Total Memberships": taluk.count,
    }));
    const talukWs = XLSX.utils.json_to_sheet(talukRows);
    XLSX.utils.book_append_sheet(wb, talukWs, "Taluk Statistics");

    // Detailed district-taluk breakdown
    const detailedRows = [];
    statistics.districtStats.forEach((district) => {
      detailedRows.push({
        "District Name (English)": district.districtName,
        "District Name (Kannada)": district.districtKName,
        "Total Memberships": district.totalMemberships,
        "Taluk Name (English)": "",
        "Taluk Name (Kannada)": "",
        "Taluk Memberships": "",
      });
      district.taluks.forEach((taluk) => {
        detailedRows.push({
          "District Name (English)": "",
          "District Name (Kannada)": "",
          "Total Memberships": "",
          "Taluk Name (English)": taluk.talukName,
          "Taluk Name (Kannada)": taluk.talukKName,
          "Taluk Memberships": taluk.count,
        });
      });
      detailedRows.push({
        "District Name (English)": "",
        "District Name (Kannada)": "",
        "Total Memberships": "",
        "Taluk Name (English)": "",
        "Taluk Name (Kannada)": "",
        "Taluk Memberships": "",
      });
    });
    const detailedWs = XLSX.utils.json_to_sheet(detailedRows);
    XLSX.utils.book_append_sheet(wb, detailedWs, "Detailed Breakdown");

    XLSX.writeFile(wb, `complete_statistics.xlsx`);
    notifySuccess("Complete statistics downloaded successfully!");
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
              Download District Stats
            </button>
            <button
              onClick={handleDownloadTalukStats}
              disabled={loading || !statistics}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none transition"
            >
              Download Taluk Stats
            </button>
            <button
              onClick={handleDownloadAllStats}
              disabled={loading || !statistics}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded font-semibold text-base shadow focus:outline-none transition"
            >
              Download All Stats
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

