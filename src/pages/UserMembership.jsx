import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import QRCode from 'react-qr-code';

export default function UserMembership() {
  const [form, setForm] = useState(null);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [mediaFiles, setMediaFiles] = useState({});
  const [mediaSaveStatus, setMediaSaveStatus] = useState({});
  const cardRef = useRef();

  useEffect(() => {
    async function fetchForm() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}membership/form`);
        setForm(res.data[0]);
        // Initialize values
        console.log(res.data[0])
        const initial = {};
        res.data[0]?.fields.forEach(f => { initial[f.label] = f.inputType === 'checkbox' ? false : ''; });
        setValues(initial);
      } catch (err) {
        setError('Failed to load form.');
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, []);

  const handleChange = (label, value, type) => {
    if (type === 'media') {
      // value is a File object
      if (value) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaFiles(files => ({ ...files, [label]: reader.result }));
        };
        reader.readAsDataURL(value);
      } else {
        setMediaFiles(files => ({ ...files, [label]: undefined }));
      }
    } else {
      setValues(v => ({ ...v, [label]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      const submissionValues = Object.entries(values).map(([label, value]) => {
        if (form.fields.find(f => f.label === label && f.inputType === 'media')) {
          return { label, value: mediaFiles[label] || '' };
        }
        return { label, value };
      });
      const res = await axios.post(`${API_BASE_URL}membership/submit`, {
        formId: form.id,
        values: submissionValues,
      });
      setMembershipId(res.data.membershipId);
      setSuccess('Membership card created successfully!');
    } catch (err) {
      setError('Failed to create membership card.');
    }
  };

  // Save media to /media API
  const handleSaveMedia = async (label) => {
    if (!mediaFiles[label]) return;
    setMediaSaveStatus(s => ({ ...s, [label]: 'saving' }));
    try {
      await axios.post(`${API_BASE_URL}media`, { media: mediaFiles[label] });
      setMediaSaveStatus(s => ({ ...s, [label]: 'saved' }));
    } catch (err) {
      setMediaSaveStatus(s => ({ ...s, [label]: 'error' }));
    }
  };

  // Download as image (using html2canvas)
  const handleDownload = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    html2canvas(cardRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = `membership_card_${membershipId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdfa 0%, #e0e7ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', padding: '2.5rem 2rem', width: '100%', maxWidth: 500, minWidth: 0, boxSizing: 'border-box', margin: '2rem 0' }}>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 16, color: '#1e293b', textAlign: 'center' }}>Membership Registration</h2>
        {loading && <div>Loading form...</div>}
        {error && <div style={{ color: '#e11d48', marginBottom: 12 }}>{error}</div>}
        {!membershipId && form && (
          <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
            {form.fields.map((field, idx) => (
              <div key={idx} style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, color: '#334155', display: 'block', marginBottom: 6 }}>{field.label}{field.required && <span style={{ color: '#e11d48', marginLeft: 4 }}>*</span>}</label>
                {field.inputType === 'text' && (
                  <input type="text" value={values[field.label] || ''} onChange={e => handleChange(field.label, e.target.value)} required={field.required} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }} />
                )}
                {field.inputType === 'textarea' && (
                  <textarea value={values[field.label] || ''} onChange={e => handleChange(field.label, e.target.value)} required={field.required} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }} />
                )}
                {field.inputType === 'number' && (
                  <input type="number" value={values[field.label] || ''} onChange={e => handleChange(field.label, e.target.value)} required={field.required} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }} />
                )}
                {['dropdown', 'radio'].includes(field.inputType) && field.options && (
                  <select value={values[field.label] || ''} onChange={e => handleChange(field.label, e.target.value)} required={field.required} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }}>
                    <option value="">Select...</option>
                    {field.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                )}
                {field.inputType === 'checkbox' && (
                  <input type="checkbox" checked={!!values[field.label]} onChange={e => handleChange(field.label, e.target.checked)} style={{ transform: 'scale(1.2)' }} />
                )}
                {field.inputType === 'media' && (
                  <>
                    <input type="file" accept="image/*" onChange={e => handleChange(field.label, e.target.files[0], 'media')} required={field.required} style={{ width: '100%' }} />
                    {mediaFiles[field.label] && (
                      <>
                        <img src={mediaFiles[field.label]} alt="Preview" style={{ marginTop: 8, maxWidth: '100%', maxHeight: 120, borderRadius: 8, border: '1px solid #cbd5e1' }} />
                        <button
                          type="button"
                          onClick={() => handleSaveMedia(field.label)}
                          style={{ marginTop: 8, padding: '8px 18px', background: '#06b6d4', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
                          disabled={!mediaFiles[field.label] || mediaSaveStatus[field.label] === 'saving'}
                        >
                          {mediaSaveStatus[field.label] === 'saving' ? 'Saving...' : mediaSaveStatus[field.label] === 'saved' ? 'Saved' : 'Save'}
                        </button>
                        {mediaSaveStatus[field.label] === 'error' && <span style={{ color: '#e11d48', marginLeft: 8 }}>Error saving image</span>}
                        {mediaSaveStatus[field.label] === 'saved' && <span style={{ color: '#16a34a', marginLeft: 8 }}>Image saved</span>}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
            {success && <div style={{ color: '#16a34a', marginBottom: 12 }}>{success}</div>}
            {error && <div style={{ color: '#e11d48', marginBottom: 12 }}>{error}</div>}
            <button type="submit" style={{ padding: '12px 32px', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)', marginTop: 8 }}>Create Membership Card</button>
          </form>
        )}
        {membershipId && (
          <div ref={cardRef} style={{ margin: '2rem auto', background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)', padding: '2rem', textAlign: 'center', maxWidth: 350 }}>
            <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Membership Card</h3>
            <div style={{ marginBottom: 10, color: '#334155', fontWeight: 500 }}>Membership ID: <span style={{ color: '#06b6d4', fontWeight: 700 }}>{membershipId}</span></div>
            {form.fields.map((field, idx) => (
              <div key={idx} style={{ marginBottom: 8, color: '#334155', fontSize: 16 }}>
                <b>{field.label}:</b> {field.inputType === 'media' && mediaFiles[field.label] ? <img src={mediaFiles[field.label].image_url.full.high_res} alt="" style={{ maxWidth: 80, maxHeight: 80, borderRadius: 8, border: '1px solid #cbd5e1' }} /> : String(values[field.label])}
              </div>
            ))}
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <QRCode value={`http://172.20.10.5:5173/membership/user/${membershipId}`} size={80} />
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                Scan to view details
              </div>
            </div>
          </div>
        )}
        {membershipId && (
          <button onClick={handleDownload} style={{ padding: '10px 28px', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', fontWeight: 700, fontSize: 17, border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)', margin: '0 auto', display: 'block' }}>
            Download Card
          </button>
        )}
      </div>
    </div>
  );
}
