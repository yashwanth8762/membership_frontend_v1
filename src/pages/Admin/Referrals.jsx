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
  const [expanded, setExpanded] = useState({});

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

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    if (debouncedSearch) return "No referrals match your search.";
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
              See each referrer and the members they referred.
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
            placeholder="Search by referrer name, ID, or referred member..."
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
        ) : referrals.length === 0 ? (
          <div className="py-16 text-center text-slate-500 font-medium">
            {emptyMessage}
          </div>
        ) : (
          <div className="space-y-4">
            {referrals.map((group) => {
              const key = group.referredBy;
              const isOpen = !!expanded[key];
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(key)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-800 text-lg truncate">
                        {group.referrerName}
                      </div>
                      <div className="text-sm text-slate-500 mt-0.5">
                        {group.referrerMembershipId
                          ? `Membership ID: ${group.referrerMembershipId}`
                          : `Referral value: ${group.referredBy}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm px-3 py-1">
                        {group.referralCount} referred
                      </span>
                      <span className="text-slate-400 text-xl">
                        {isOpen ? "▾" : "▸"}
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                          <tr>
                            <th className="text-left font-semibold px-4 py-3">#</th>
                            <th className="text-left font-semibold px-4 py-3">
                              Membership ID
                            </th>
                            <th className="text-left font-semibold px-4 py-3">Name</th>
                            <th className="text-left font-semibold px-4 py-3">Mobile</th>
                            <th className="text-left font-semibold px-4 py-3">
                              District
                            </th>
                            <th className="text-left font-semibold px-4 py-3">Taluk</th>
                            <th className="text-left font-semibold px-4 py-3">
                              Payment
                            </th>
                            <th className="text-left font-semibold px-4 py-3">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.referredMembers.map((member, idx) => (
                            <tr
                              key={member.id || `${key}-${idx}`}
                              className="border-t border-slate-100 hover:bg-slate-50/80"
                            >
                              <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                              <td className="px-4 py-3 font-medium text-slate-800">
                                {member.membershipId || "-"}
                              </td>
                              <td className="px-4 py-3 text-slate-800">
                                {member.name}
                              </td>
                              <td className="px-4 py-3 text-slate-700">
                                {member.mobile || "-"}
                              </td>
                              <td className="px-4 py-3 text-slate-700">
                                {member.district || "-"}
                              </td>
                              <td className="px-4 py-3 text-slate-700">
                                {member.taluk || "-"}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    member.paymentStatus === "COMPLETED"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {member.paymentStatus || "PENDING"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-600">
                                {formatDate(member.submittedAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
