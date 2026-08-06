import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { API_BASE_URL } from "../../../config";
import { notifyError } from "../../utils/toastify";

const PAGE_SIZE = 50;

export default function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const [summary, setSummary] = useState({ totalReferrers: 0, totalReferredMembers: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [expanded, setExpanded] = useState({});
  const [membersByReferrer, setMembersByReferrer] = useState({});
  const [loadingMembers, setLoadingMembers] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
    setExpanded({});
  }, [debouncedSearch]);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams({
          page: String(currentPage),
          size: String(PAGE_SIZE),
        });
        if (debouncedSearch) params.set("search", debouncedSearch);

        const res = await axios.get(
          `${API_BASE_URL}membership/referrals?${params.toString()}`,
          { timeout: 30000 }
        );

        setReferrals(res.data.referrals || []);
        setSummary(
          res.data.summary || { totalReferrers: 0, totalReferredMembers: 0 }
        );
        setCurrentPage(res.data.pagination?.currentPage || 1);
        setTotalPages(res.data.pagination?.totalPages || 1);
        setTotalItems(res.data.pagination?.totalItems || 0);
      } catch (err) {
        setReferrals([]);
        setError("Failed to load referral report.");
        notifyError("Failed to load referral report.");
      } finally {
        setLoading(false);
      }
    };
    fetchReferrals();
  }, [debouncedSearch, currentPage]);

  const fetchMembers = async (referredBy) => {
    if (membersByReferrer[referredBy] || loadingMembers[referredBy]) return;
    try {
      setLoadingMembers((prev) => ({ ...prev, [referredBy]: true }));
      const params = new URLSearchParams({ referredBy });
      const res = await axios.get(
        `${API_BASE_URL}membership/referrals/members?${params.toString()}`,
        { timeout: 30000 }
      );
      setMembersByReferrer((prev) => ({
        ...prev,
        [referredBy]: res.data.members || [],
      }));
    } catch (err) {
      notifyError("Failed to load referred members.");
      setMembersByReferrer((prev) => ({ ...prev, [referredBy]: [] }));
    } finally {
      setLoadingMembers((prev) => ({ ...prev, [referredBy]: false }));
    }
  };

  const toggleExpand = (referredBy) => {
    setExpanded((prev) => {
      const nextOpen = !prev[referredBy];
      if (nextOpen) fetchMembers(referredBy);
      return { ...prev, [referredBy]: nextOpen };
    });
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
    if (debouncedSearch) return "No referrals match that referred by name.";
    return "No referral data found yet.";
  }, [debouncedSearch]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    setExpanded({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fromItem = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const toItem = Math.min(currentPage * PAGE_SIZE, totalItems);

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Referral Report
            </h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Expand a referred by name to see who they referred.
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
        ) : referrals.length === 0 ? (
          <div className="py-16 text-center text-slate-500 font-medium">
            {emptyMessage}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {referrals.map((group) => {
                const key = group.referredBy;
                const isOpen = !!expanded[key];
                const members = membersByReferrer[key] || [];
                const isLoadingMembers = !!loadingMembers[key];

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
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-0.5">
                          Referred By
                        </div>
                        <div className="font-semibold text-slate-800 text-lg truncate">
                          {group.referrerName || group.referredBy}
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
                        {isLoadingMembers ? (
                          <div className="px-5 py-8 text-center text-slate-500">
                            Loading members...
                          </div>
                        ) : members.length === 0 ? (
                          <div className="px-5 py-8 text-center text-slate-500">
                            No members found for this referrer.
                          </div>
                        ) : (
                          <table className="w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600">
                              <tr>
                                <th className="text-left font-semibold px-4 py-3">#</th>
                                <th className="text-left font-semibold px-4 py-3">
                                  Membership ID
                                </th>
                                <th className="text-left font-semibold px-4 py-3">
                                  Name
                                </th>
                                <th className="text-left font-semibold px-4 py-3">
                                  Mobile
                                </th>
                                <th className="text-left font-semibold px-4 py-3">
                                  District
                                </th>
                                <th className="text-left font-semibold px-4 py-3">
                                  Taluk
                                </th>
                                <th className="text-left font-semibold px-4 py-3">
                                  Payment
                                </th>
                                <th className="text-left font-semibold px-4 py-3">
                                  Date
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {members.map((member, idx) => (
                                <tr
                                  key={member.id || `${key}-${idx}`}
                                  className="border-t border-slate-100 hover:bg-slate-50/80"
                                >
                                  <td className="px-4 py-3 text-slate-500">
                                    {idx + 1}
                                  </td>
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
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-sm text-slate-600">
                Showing {fromItem}-{toItem} of {totalItems} referrers
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || loading}
                  className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Previous
                </button>
                <span className="text-sm font-medium text-slate-700 px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || loading}
                  className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
