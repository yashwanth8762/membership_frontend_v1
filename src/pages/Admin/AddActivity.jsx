import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';
import { Form, ListGroup, Button, Image, Alert } from 'react-bootstrap';

export default function AddActivity() {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]); // File[]
  const [uploadStatus, setUploadStatus] = useState([]); // 'pending' | 'uploading' | 'uploaded' | 'error'
  const [uploadedMediaIds, setUploadedMediaIds] = useState([]); // string[]
  const [mediaConfirmed, setMediaConfirmed] = useState(false); // user must confirm adding media
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setUploadStatus((prev) => [...prev, ...newFiles.map(() => 'pending')]);
    setUploadedMediaIds((prev) => [...prev, ...newFiles.map(() => undefined)]);
    setMediaConfirmed(false); // reset confirmation if new files are added
  };

  // Remove a file before upload
  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadStatus((prev) => prev.filter((_, i) => i !== index));
    setUploadedMediaIds((prev) => prev.filter((_, i) => i !== index));
    setMediaConfirmed(false); // reset confirmation if files are removed
  };

  // Upload all files
  const uploadAllMedia = async () => {
    setError('');
    const token = localStorage.getItem('token');
    let newStatus = [...uploadStatus];
    let newMediaIds = [...uploadedMediaIds];
    for (let i = 0; i < selectedFiles.length; i++) {
      if (uploadStatus[i] === 'uploaded') continue;
      newStatus[i] = 'uploading';
      setUploadStatus([...newStatus]);
      try {
        const formData = new FormData();
        formData.append('media', selectedFiles[i]);
        const response = await axios.post(
          `${API_BASE_URL}media`,
          formData,
          { headers: { Authorization: token } }
        );
        if (response.status === 201 || response.status === 200) {
          newStatus[i] = 'uploaded';
          newMediaIds[i] = response.data.data;
        } else {
          newStatus[i] = 'error';
        }
      } catch (err) {
        newStatus[i] = 'error';
      }
      setUploadStatus([...newStatus]);
      setUploadedMediaIds([...newMediaIds]);
    }
  };

  // Confirm media to be added to activity
  const handleConfirmMedia = () => {
    setMediaConfirmed(true);
  };

  // Submit the activity
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title.trim() || !about.trim()) {
      setError('Title and About are required.');
      return;
    }
    if (selectedFiles.length > 0 && uploadStatus.some(status => status !== 'uploaded')) {
      setError('Please upload all media before submitting.');
      return;
    }
    if (selectedFiles.length > 0 && !mediaConfirmed) {
      setError('Please confirm adding media to activity.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_BASE_URL}Activity`, {
        title,
        about,
        media_file: uploadedMediaIds.filter(Boolean)
      }, {
        headers: { Authorization: token }
      });
      setSuccess('Activity created successfully!');
      setTimeout(() => navigate('/dashboard/activity'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          padding: '2.5rem 2rem',
          minWidth: 320,
          maxWidth: 500,
          margin: '2rem auto',
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, color: '#1e293b', textAlign: 'center' }}>Add Activity</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="activityTitle" className="mb-3">
            <Form.Label>Title<span style={{ color: '#e11d48', marginLeft: 4 }}>*</span></Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Enter activity title"
            />
          </Form.Group>
          <Form.Group controlId="activityAbout" className="mb-3">
            <Form.Label>About<span style={{ color: '#e11d48', marginLeft: 4 }}>*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={about}
              onChange={e => setAbout(e.target.value)}
              required
              placeholder="Enter activity details"
            />
          </Form.Group>
          <Form.Group controlId="fileUpload">
            <Form.Label>Select files to upload</Form.Label>
            <p>
              <small className="text-muted">
                Images up to 5MB, pdf up to 25MB are accepted
              </small>
            </p>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Form.Group>

          <ListGroup className="mb-3">
            {selectedFiles.map((file, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  {file.type.startsWith("image") && (
                    <Image
                      src={URL.createObjectURL(file)}
                      thumbnail
                      width={50}
                      height={50}
                      style={{ objectFit: 'cover', marginRight: 10 }}
                    />
                  )}
                  <span className="ml-2">{file.name}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="me-2"
                    disabled={uploadStatus[index] === 'uploading'}
                  >
                    <i className="ri-close-line"></i>
                  </Button>
                  {uploadStatus[index] === 'pending' && (
                    <span style={{ color: '#64748b', fontSize: 14 }}>Not uploaded</span>
                  )}
                  {uploadStatus[index] === 'uploading' && (
                    <span style={{ color: '#6366f1', fontSize: 14 }}>Uploading...</span>
                  )}
                  {uploadStatus[index] === 'uploaded' && (
                    <Button variant="success" size="sm" disabled>
                      <i className="ri-check-line"></i> Uploaded
                    </Button>
                  )}
                  {uploadStatus[index] === 'error' && (
                    <span style={{ color: '#e11d48', fontSize: 14 }}>Error</span>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {selectedFiles.length > 0 && (
            <Button
              type="button"
              variant="primary"
              className="mb-3"
              onClick={uploadAllMedia}
              disabled={uploadStatus.every(status => status === 'uploaded') || uploadStatus.some(status => status === 'uploading')}
            >
              {uploadStatus.some(status => status === 'uploading') ? 'Uploading...' : 'Upload Media'}
            </Button>
          )}

          {/* After all media uploaded, show confirmation step */}
          {selectedFiles.length > 0 && uploadStatus.length > 0 && uploadStatus.every(status => status === 'uploaded') && !mediaConfirmed && (
            <Alert variant="info" className="mb-3">
              <div>All media uploaded. <b>Click below to add media to activity.</b></div>
              <Button variant="success" className="mt-2" onClick={handleConfirmMedia}>Add Media to Activity</Button>
            </Alert>
          )}

          {error && <div style={{ color: '#e11d48', marginBottom: 12 }}>{error}</div>}
          {success && <div style={{ color: '#16a34a', marginBottom: 12 }}>{success}</div>}
          <Button
            type="submit"
            disabled={loading || (selectedFiles.length > 0 && (!mediaConfirmed || uploadStatus.some(status => status !== 'uploaded')))}
            style={{ padding: '12px 32px', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)', marginTop: 8 }}
          >
            {loading ? 'Creating...' : 'Create Activity'}
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
}
