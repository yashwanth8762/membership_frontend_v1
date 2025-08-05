import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { notifySuccess, notifyError } from '../../utils/toastify';
import AdminLayout from './AdminLayout';

export default function EditActivity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [mediaFile, setMediaFile] = useState(null); // File object
  const [mediaId, setMediaId] = useState(''); // Saved media id
  const [mediaName, setMediaName] = useState(''); // Saved media name
  const [mediaUploading, setMediaUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [kTitle, setKTitle] = useState('');
  const [kAbout, setKAbout] = useState('');

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}activity/${id}`);
        const data = await res.json();
        if (res.ok && data.data) {
          setTitle(data.data.title);
          setAbout(data.data.about);
          setKTitle(data.data.k_title || '');
          setKAbout(data.data.k_about || '');
          if (Array.isArray(data.data.media_file) && data.data.media_file.length > 0) {
            setMediaId(data.data.media_file[0].id);
            setMediaName(data.data.media_file[0].name?.original || 'media');
          }
        } else {
          notifyError(data.message || 'Failed to fetch activity');
        }
      } catch (err) {
        notifyError('Failed to fetch activity');
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

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
    setSubmitting(true);
    try {
      const payload = {
        title,
        k_title: kTitle,
        about,
        k_about: kAbout,
        media_file: mediaId ? [mediaId] : [],
      };
      const response = await fetch(`${API_BASE_URL}activity/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        notifySuccess('Activity updated successfully!');
        navigate('/dashboard/activity/list');
      } else {
        notifyError(data.message || 'Failed to update activity');
      }
    } catch (error) {
      notifyError('Failed to update activity');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
        <h2>Edit Activity</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Title (Kannada)</label>
              <input
                type="text"
                value={kTitle}
                onChange={(e) => setKTitle(e.target.value)}
                required
                style={{ width: '100%', padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
                style={{ width: '100%', padding: 8, minHeight: 80 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>About (Kannada)</label>
              <textarea
                value={kAbout}
                onChange={(e) => setKAbout(e.target.value)}
                required
                style={{ width: '100%', padding: 8, minHeight: 80 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Media File (optional)</label>
              <input
                type="file"
                accept="image/*,application/pdf,video/*"
                onChange={handleMediaChange}
                disabled={!!mediaId}
                style={{ width: '100%', padding: 8 }}
              />
              {mediaFile && !mediaId && (
                <button
                  type="button"
                  onClick={handleMediaSave}
                  disabled={mediaUploading}
                  style={{ marginTop: 8, marginRight: 8, padding: '6px 18px' }}
                >
                  {mediaUploading ? 'Saving...' : 'Save'}
                </button>
              )}
              {mediaId && (
                <>
                  <div style={{ marginTop: 8, color: '#16a34a', fontWeight: 500 }}>
                    Saved: {mediaName}
                  </div>
                  <button
                    type="button"
                    onClick={handleMediaRemove}
                    style={{ marginTop: 8, marginRight: 8, padding: '6px 18px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4 }}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
            <button type="submit" disabled={submitting || (mediaFile && !mediaId)} style={{ padding: '8px 24px' }}>
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
