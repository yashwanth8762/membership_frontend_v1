/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { notifySuccess, notifyError } from '../../utils/toastify';
import AdminLayout from './AdminLayout';

export default function AddGallery() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map(file => ({
      file,
      status: 'pending', // 'pending', 'uploading', 'saved'
      id: null,
      name: file.name,
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleMediaSave = async (index) => {
    const fileToSave = files[index];
    if (!fileToSave || fileToSave.status !== 'pending') return;

    const newFiles = [...files];
    newFiles[index].status = 'uploading';
    setFiles(newFiles);

    try {
      const formData = new FormData();
      formData.append('media', fileToSave.file);
      const response = await fetch(`${API_BASE_URL}media`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const finalFiles = [...files];
      if (response.ok && data.data) {
        finalFiles[index].status = 'saved';
        finalFiles[index].id = data.data;
        setFiles(finalFiles);
        notifySuccess(`'${fileToSave.name}' uploaded successfully!`);
      } else {
        finalFiles[index].status = 'pending';
        setFiles(finalFiles);
        notifyError(data.message || `Failed to upload ${fileToSave.name}`);
      }
    } catch (error) {
      const finalFiles = [...files];
      finalFiles[index].status = 'pending';
      setFiles(finalFiles);
      notifyError(`Failed to upload ${fileToSave.name}`);
    }
  };

  const handleMediaRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.some(file => file.status !== 'saved')) {
      notifyError('Please save all selected media files before submitting.');
      return;
    }
    if (files.length === 0) {
      notifyError('Please upload at least one media file.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        media: files.map(file => file.id),
      };
      const response = await fetch(`${API_BASE_URL}gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        notifySuccess('Gallery created successfully!');
        // Optional: Navigate to a gallery list page
        // navigate('/dashboard/gallery/list'); 
        setFiles([]);
      } else {
        notifyError(data.message || 'Failed to create gallery');
      }
    } catch (error) {
      notifyError('Failed to create gallery');
    } finally {
      setLoading(false);
    }
  };

  const backNavigate = () => {
    // You might want to navigate to a gallery list page
    navigate(-1); 
  };
  
  const allFilesSaved = files.length > 0 && files.every(f => f.status === 'saved');

  return (
    <AdminLayout>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%)', padding: '40px 0' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', padding: '2.5rem 2rem', position: 'relative' }}>
          <button
            onClick={backNavigate}
            style={{ position: 'absolute', left: 24, top: 24, background: 'none', border: 'none', color: '#6366f1', fontWeight: 600, fontSize: 16, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            ← Back
          </button>
          <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 30, marginBottom: 32, color: '#1e293b', letterSpacing: 0.5 }}>Add Media to Gallery</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontWeight: 600, color: '#334155', marginBottom: 6, display: 'block' }}>Upload Media</label>
              <input
                type="file"
                accept="image/*,application/pdf,video/*"
                multiple
                onChange={handleFileChange}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#f8fafc', outline: 'none', marginTop: 4,
                  // Custom styles for file input button
                  color: '#334155',
                  lineHeight: 1.5,
                }}
              />
            </div>
            
            <div style={{ marginBottom: 22 }}>
              {files.map((file, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: 8, marginBottom: 10, border: '1px solid #e5e7eb' }}>
                  <span style={{ fontWeight: 500, color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '10px' }}>{file.name}</span>
                  <div>
                    {file.status === 'pending' && (
                      <>
                        <button type="button" onClick={() => handleMediaSave(index)} style={{ padding: '4px 12px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>Save</button>
                        <button type="button" onClick={() => handleMediaRemove(index)} style={{ padding: '4px 12px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Remove</button>
                      </>
                    )}
                    {file.status === 'uploading' && <span style={{ color: '#6366f1', fontWeight: 600 }}>Saving...</span>}
                    {file.status === 'saved' && (
                      <>
                        <span style={{ color: '#16a34a', fontWeight: 600, marginRight: 8 }}>✓ Saved</span>
                        <button type="button" onClick={() => handleMediaRemove(index)} style={{ padding: '4px 12px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Remove</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || !allFilesSaved}
              style={{
                width: '100%', padding: '12px 0', borderRadius: 8,
                background: (loading || !allFilesSaved) ? '#a5b4fc' : 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
                color: '#fff', fontWeight: 700, fontSize: 18, border: 'none',
                cursor: (loading || !allFilesSaved) ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)', marginTop: 10,
              }}
            >
              {loading ? 'Submitting...' : 'Add to Gallery'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
