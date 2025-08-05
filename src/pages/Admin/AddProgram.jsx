/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { notifySuccess, notifyError } from '../../utils/toastify';
import AdminLayout from './AdminLayout';

export default function AddProgram() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [programDate, setProgramDate] = useState('');
  const [programTime, setProgramTime] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaId, setMediaId] = useState('');
  const [mediaName, setMediaName] = useState('');
  const [mediaUploading, setMediaUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [kTitle, setKTitle] = useState('');
  const [kAbout, setKAbout] = useState('');
  const [kLocation, setKLocation] = useState('');

  const handleMediaChange = (e) => {
    setMediaFile(e.target.files[0]);
    setMediaId('');
    setMediaName('');
  };

  const handleMediaSave = async () => {
    if (!mediaFile) return;
    setMediaUploading(true);
    try {
      const formData = new FormData();
      formData.append('media', mediaFile);
      const response = await fetch(`${API_BASE_URL}media`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok && data.data) {
        setMediaId(data.data);
        setMediaName(mediaFile.name);
        notifySuccess('Media uploaded successfully!');
      } else {
        notifyError(data.message || 'Failed to upload media');
      }
    } catch (error) {
      notifyError('Failed to upload media');
    } finally {
      setMediaUploading(false);
    }
  };

  const handleMediaRemove = () => {
    setMediaFile(null);
    setMediaId('');
    setMediaName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        k_title: kTitle,
        about,
        k_about: kAbout,
        location,
        k_location: kLocation,
        program_date: programDate,
        program_time: programTime,
        media_file: mediaId ? [mediaId] : [],
      };
      const response = await fetch(`${API_BASE_URL}upcommingprograms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        notifySuccess('Program created successfully!');
        setTitle('');
        setKTitle('');
        setAbout('');
        setKAbout('');
        setLocation('');
        setKLocation('');
        navigate('/dashboard/program/list');
      } else {
        notifyError(data.message || 'Failed to create program');
      }
    } catch (error) {
      notifyError('Failed to create program');
    } finally {
      setLoading(false);
    }
  };
  const backNavigate = () => {
    navigate('/dashboard/program/list');
  };
  return (
    <AdminLayout>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%)', padding: '40px 0' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', padding: '2.5rem 2rem', position: 'relative' }}>
          <button
            onClick={backNavigate}
            style={{
              position: 'absolute',
              left: 24,
              top: 24,
              background: 'none',
              border: 'none',
              color: '#6366f1',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            ← Back
          </button>
          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 30, marginBottom: 32, color: '#1e293b', letterSpacing: 0.5 }}>Add Program</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4 }}
                placeholder="Enter program title"
              />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4, minHeight: 90, resize: 'vertical' }}
                placeholder="Describe the program"
              />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4 }}
                placeholder="Enter program location"
              />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Title (Kannada)</label>
              <input
                type="text"
                value={kTitle}
                onChange={(e) => setKTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4 }}
                placeholder="Enter program title in Kannada"
              />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>About (Kannada)</label>
              <textarea
                value={kAbout}
                onChange={(e) => setKAbout(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4, minHeight: 90, resize: 'vertical' }}
                placeholder="Describe the program in Kannada"
              />
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Location (Kannada)</label>
              <input
                type="text"
                value={kLocation}
                onChange={(e) => setKLocation(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4 }}
                placeholder="Enter program location in Kannada"
              />
            </div>
            <div style={{ marginBottom: 22, display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Program Date</label>
                <input
                  type="date"
                  value={programDate}
                  onChange={(e) => setProgramDate(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Program Time <span style={{ color: '#64748b', fontWeight: 400 }}>(optional)</span></label>
                <input
                  type="time"
                  value={programTime}
                  onChange={(e) => setProgramTime(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 16, background: '#f8fafc', outline: 'none', marginTop: 4 }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Media File <span style={{ color: '#64748b', fontWeight: 400 }}>(optional)</span></label>
              <input
                type="file"
                accept="image/*,application/pdf,video/*"
                onChange={handleMediaChange}
                disabled={!!mediaId}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f8fafc', outline: 'none', marginTop: 4 }}
              />
              {mediaFile && !mediaId && (
                <button
                  type="button"
                  onClick={handleMediaSave}
                  disabled={mediaUploading}
                  style={{ marginTop: 10, marginRight: 8, padding: '7px 22px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => e.target.style.background = '#4338ca'}
                  onMouseOut={e => e.target.style.background = '#6366f1'}
                >
                  {mediaUploading ? 'Saving...' : 'Save'}
                </button>
              )}
              {mediaId && (
                <>
                  <div style={{ marginTop: 10, color: '#16a34a', fontWeight: 500 }}>
                    Saved: {mediaName}
                  </div>
                  <button
                    type="button"
                    onClick={handleMediaRemove}
                    style={{ marginTop: 10, marginRight: 8, padding: '7px 22px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseOver={e => e.target.style.background = '#b91c1c'}
                    onMouseOut={e => e.target.style.background = '#ef4444'}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || (mediaFile && !mediaId)}
              style={{
                width: '100%',
                padding: '12px 0',
                borderRadius: 8,
                background: loading ? '#a5b4fc' : 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
                marginTop: 10,
                transition: 'background 0.2s',
              }}
              onMouseOver={e => { if (!loading) e.target.style.background = '#4338ca'; }}
              onMouseOut={e => { if (!loading) e.target.style.background = 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)'; }}
            >
              {loading ? 'Submitting...' : 'Add Program'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
