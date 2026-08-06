import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { API_BASE_URL } from "../../../config";
import { notifyError } from "../../utils/toastify";

export default function Referrals() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        const res = await axios.get(
          `${API_BASE_URL}membership/referrals${params.toString() ? `?${params}` : ""}`
        );
        setData(res.data);
      } catch (err) {
        setError("Failed to load referral report.");
        notifyError("Failed to load referral report.");
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, [debouncedSearch]);

  const referrals = data?.referrals || [];
  const summary = data?.summary || { totalReferrers: 0, totalReferredMembers: 0 };

  // Flat list of all referred members with their referred-by name (shown by default)
  const allRows = useMemo(() => {
    const rows = [];
    referrals.forEach((group) => {
      (group.referredMembers || []).forEach((member) => {
        rows.push({
          referredBy: group.referrerName || group.referredBy,
          referredByRaw: group.referredBy,
          referrerMembershipId: group.referrerMembershipId || "",
          ...member,
        });
      });
    });
    return rows.sort((a, b) => {
      const byName = String(a.referredBy).localeCompare(String(b.referredBy));
      if (byName !== 0) return byName;
      return new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0);
    });
  }, [referrals]);

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const emptyMessage = useMemo(() => {
    if (debouncedSearch) return "No referrals match that referred by name.";
    return "No referral data found yet.";
  }, [debouncedSearch]);

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Referral Report
            </h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              All referrals with their Referred By name.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3 text-center min-w-[120px]">
              <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                Referrers
              </div>
              <div className="text-2xl font-bold text-indigo-800">
                {summary.totalReferrers}
              </div>
            </div>
            <div className="rounded-xl bg-cyan-50 border border-cyan-100 px-4 py-3 text-center min-w-[120px]">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                Referred
              </div>
              <div className="text-2xl font-bold text-cyan-900">
                {summary.totalReferredMembers}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by referred by name..."
            className="w-full max-w-xl p-3 rounded-xl border border-slate-300 bg-slate-50 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-700 border border-red-100">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-slate-500 font-medium">
            Loading referrals...
          </div>
        ) : allRows.length === 0 ? (
          <div className="py-16 text-center text-slate-500 font-medium">
            {emptyMessage}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 overflow-x-auto bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">#</th>
                  <th className="text-left font-semibold px-4 py-3">
                    Referred By
                  </th>
                  <th className="text-left font-semibold px-4 py-3">
                    Membership ID
                  </th>
                  <th className="text-left font-semibold px-4 py-3">
                    Card Holder Name
                  </th>
                  <th className="text-left font-semibold px-4 py-3">Mobile</th>
                  <th className="text-left font-semibold px-4 py-3">District</th>
                  <th className="text-left font-semibold px-4 py-3">Taluk</th>
                  <th className="text-left font-semibold px-4 py-3">Payment</th>
                  <th className="text-left font-semibold px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {allRows.map((row, idx) => (
                  <tr
                    key={row.id || `${row.referredByRaw}-${idx}`}
                    className="border-t border-slate-100 hover:bg-slate-50/80"
                  >
                    <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-indigo-800">
                        {row.referredBy}
                      </div>
                      {row.referrerMembershipId && (
                        <div className="text-xs text-slate-500 mt-0.5">
                          ID: {row.referrerMembershipId}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {row.membershipId || "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-800">{row.name}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.mobile || "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.district || "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {row.taluk || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          row.paymentStatus === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {row.paymentStatus || "PENDING"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(row.submittedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
