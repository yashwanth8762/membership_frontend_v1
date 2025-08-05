import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import AdminLayout from './AdminLayout';

export default function ProgramDashboard() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE_URL}upcommingprograms`);
        const data = await res.json();
        if (res.ok && data.data) {
          setPrograms(data.data);
        } else {
          setError(data.message || 'Failed to fetch programs');
        }
      } catch (err) {
        setError('Failed to fetch programs');
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <AdminLayout>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          padding: '2.5rem 2rem',
          minWidth: 320,
          color: '#1e293b',
          margin: '2rem auto',
          position: 'relative',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: 24,
            right: 32,
            padding: '10px 22px',
            background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)'
          }}
          onClick={() => navigate('/dashboard/program/create')}
        >
          Add Program
        </button>
        <div style={{ fontWeight: 700, fontSize: 32, textAlign: 'center', marginBottom: 24 }}>
          Program Dashboard
        </div>
        {loading && <div style={{ marginBottom: 16 }}>Loading programs...</div>}
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f1f5f9', fontWeight: 600 }}>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>S.No</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Title</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>About</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Date</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Time</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Media</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Title (Kannada)</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>About (Kannada)</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Location (Kannada)</th>
                <th style={{ padding: '12px 8px', borderBottom: '2px solid #e5e7eb' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && !error && programs.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 24, color: '#64748b' }}>No programs found.</td>
                </tr>
              )}
              {!loading && !error && programs.map((program, idx) => (
                <tr key={program.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ padding: '10px 8px', fontWeight: 500 }}>{program.title}</td>
                  <td style={{ padding: '10px 8px', color: '#334155' }}>{program.about}</td>
                  <td style={{ padding: '10px 8px', color: '#64748b' }}>{new Date(program.program_date).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 8px', color: '#64748b' }}>{program.program_time || '-'}</td>
                  <td style={{ padding: '10px 8px', minWidth: 120 }}>
                    {Array.isArray(program.media_file) && program.media_file.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {program.media_file.map((media, i) => {
                          if (media.image_url && media.image_url.thumbnail && media.image_url.thumbnail.high_res) {
                            return (
                              <a key={i} href={`${API_BASE_URL}${media.image_url.full.high_res}`} target="_blank" rel="noopener noreferrer">
                                <img src={`${API_BASE_URL}${media.image_url.thumbnail.high_res}`} alt={media.name?.original || 'media'} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
                              </a>
                            );
                          }
                          if (media.doc_url) {
                            return (
                              <a key={i} href={`${API_BASE_URL}${media.doc_url}`} target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontWeight: 500 }}>
                                PDF
                              </a>
                            );
                          }
                          if (media.video_url && (media.video_url.video?.high_res || media.video_url.video?.low_res)) {
                            return (
                              <span key={i} style={{ color: '#06b6d4', fontWeight: 500 }}>Video</span>
                            );
                          }
                          return <span key={i}>Media</span>;
                        })}
                      </div>
                    ) : (
                      <span style={{ color: '#64748b' }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 8px', fontWeight: 500 }}>{program.k_title}</td>
                  <td style={{ padding: '10px 8px', color: '#334155' }}>{program.k_about}</td>
                  <td style={{ padding: '10px 8px', color: '#334155' }}>{program.k_location}</td>
                  <td style={{ padding: '10px 8px', minWidth: 120 }}>
                    {/* Actions: Edit/Delete can be added here */}
                    <a
                      href={`/dashboard/program/edit/${program.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#059669',
                        textDecoration: 'underline',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginRight: 12
                      }}
                    >
                      Edit
                    </a>
                    <button
                      onClick={async () => {
                        if (!window.confirm('Are you sure you want to delete this program?')) return;
                        try {
                          const res = await fetch(`${API_BASE_URL}upcommingprograms/${program.id}`, { method: 'DELETE' });
                          if (res.ok) {
                            setPrograms((prev) => prev.filter((p) => p.id !== program.id));
                            window.toastify && window.toastify.notifySuccess ? window.toastify.notifySuccess('Program deleted!') : alert('Program deleted!');
                          } else {
                            const data = await res.json();
                            window.toastify && window.toastify.notifyError ? window.toastify.notifyError(data.message || 'Failed to delete') : alert(data.message || 'Failed to delete');
                          }
                        } catch (err) {
                          window.toastify && window.toastify.notifyError ? window.toastify.notifyError('Failed to delete') : alert('Failed to delete');
                        }
                      }}
                      style={{
                        color: '#fff',
                        background: '#ef4444',
                        border: 'none',
                        borderRadius: 4,
                        padding: '4px 14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
