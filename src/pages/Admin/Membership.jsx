import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { API_BASE_URL } from '../../../config';

export default function Membership() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchForm() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}membership/form`);
        setForm(res.data[0]);
      } catch (err) {
        setError('Failed to load form.');
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, []);

  const handleEdit = () => {
    // Implement navigation to edit page or open edit modal
    alert('Edit functionality not implemented yet.');
  };

  const handleDelete = async () => {
    if (!form) return;
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    try {
      await axios.delete(`${API_BASE_URL}membership/form/${form._id}`);
      setForm(null);
      setSuccess('Form deleted successfully!');
    } catch (err) {
      setError('Failed to delete form.');
    }
  };

  return (
    <AdminLayout>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', padding: '2.5rem 2rem', width: '100%', minWidth: 0, boxSizing: 'border-box', margin: '2rem 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 24, right: 32, display: 'flex', gap: 12 }}>
          <button onClick={handleEdit} style={{ padding: '8px 18px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Edit</button>
          <button onClick={handleDelete} style={{ padding: '8px 18px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Delete</button>
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 16, color: '#1e293b', textAlign: 'center' }}>Membership Form</h2>
        {loading && <div>Loading form...</div>}
        {error && <div style={{ color: '#e11d48', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: '#16a34a', marginBottom: 12 }}>{success}</div>}
        {form && (
          <form style={{ maxWidth: 600, margin: '0 auto' }}>
            {form.fields.map((field, idx) => (
              <div key={idx} style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 500, color: '#334155', display: 'block', marginBottom: 6 }}>{field.label}{field.required && <span style={{ color: '#e11d48', marginLeft: 4 }}>*</span>}</label>
                {field.inputType === 'text' && (
                  <input type="text" value={''} disabled style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }} />
                )}
                {field.inputType === 'textarea' && (
                  <textarea value={''} disabled style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }} />
                )}
                {field.inputType === 'number' && (
                  <input type="number" value={''} disabled style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }} />
                )}
                {['dropdown', 'radio'].includes(field.inputType) && field.options && (
                  <select value={''} disabled style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, background: '#f8fafc' }}>
                    <option value="">Select...</option>
                    {field.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                )}
                {field.inputType === 'checkbox' && (
                  <input type="checkbox" checked={false} disabled style={{ transform: 'scale(1.2)' }} />
                )}
                {/* Media and other types can be added here */}
              </div>
            ))}
          </form>
        )}
      </div>
    </AdminLayout>
  )
}
