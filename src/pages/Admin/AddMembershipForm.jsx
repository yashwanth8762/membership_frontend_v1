import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import AdminLayout from './AdminLayout';

const FIELD_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'number', label: 'Number' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio' },
  { value: 'media', label: 'Media' },
];

export default function AddMembershipForm() {
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({
    inputType: 'text',
    label: '',
    label_kn: '',
    options: '', // comma separated for dropdown/radio/checkbox
    required: false,
    order: fields.length + 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewField((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addField = (e) => {
    e.preventDefault();
    const fieldToAdd = {
      ...newField,
      options: ['dropdown', 'checkbox', 'radio'].includes(newField.inputType)
        ? newField.options.split(',').map(opt => opt.trim()).filter(Boolean)
        : undefined,
      order: fields.length + 1,
    };
    setFields([...fields, fieldToAdd]);
    setNewField({ inputType: 'text', label: '', label_kn: '', options: '', required: false, order: fields.length + 2 });
  };

  const removeField = (idx) => {
    setFields(fields.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await axios.post(`${API_BASE_URL}membership/form`, { fields });
      setSuccess('Form structure saved successfully!');
      setFields([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save form structure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        padding: '2.5rem 2rem',
        margin: '2rem 0',
        width: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Placeholder logo */}
        <div style={{ marginBottom: 18 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 28,
            color: '#fff',
            boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
          }}>
            MF
          </div>
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 6, color: '#1e293b', letterSpacing: 1, textAlign: 'center' }}>Create Membership Form</h2>
        <p style={{ color: '#334155', marginBottom: 28, fontSize: 16, textAlign: 'center' }}>
          Welcome! Use this tool to build a custom membership form for your organization. Add fields, preview, and save instantly.
        </p>
        <form onSubmit={addField} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 24, width: '100%' }}>
          <div style={{ flex: 1, minWidth: 110 }}>
            <label style={{ color: '#1e293b', fontWeight: 500, fontSize: 15 }}>Field Type</label>
            <select name="inputType" value={newField.inputType} onChange={handleFieldChange} style={{ width: '100%', padding: 9, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, color: '#1e293b', background: '#f8fafc' }}>
              {FIELD_TYPES.map(ft => <option key={ft.value} value={ft.value}>{ft.label}</option>)}
            </select>
          </div>
          <div style={{ flex: 2, minWidth: 150 }}>
            <label style={{ color: '#1e293b', fontWeight: 500, fontSize: 15 }}>Label</label>
            <input name="label" value={newField.label} onChange={handleFieldChange} required style={{ width: '100%', padding: 9, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, color: '#1e293b', background: '#f8fafc' }} />
          </div>
          <div style={{ flex: 2, minWidth: 150 }}>
            <label style={{ color: '#1e293b', fontWeight: 500, fontSize: 15 }}>Kannada Label</label>
            <input name="label_kn" value={newField.label_kn} onChange={handleFieldChange} style={{ width: '100%', padding: 9, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, color: '#1e293b', background: '#f8fafc' }} />
          </div>
          {['dropdown', 'checkbox', 'radio'].includes(newField.inputType) && (
            <div style={{ flex: 2, minWidth: 150 }}>
              <label style={{ color: '#1e293b', fontWeight: 500, fontSize: 15 }}>Options (comma separated)</label>
              <input name="options" value={newField.options} onChange={handleFieldChange} style={{ width: '100%', padding: 9, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, color: '#1e293b', background: '#f8fafc' }} />
            </div>
          )}
          <div style={{ minWidth: 70, marginLeft:20 }}>
            <label style={{ color: '#1e293b', fontWeight: 500, fontSize: 15 }}>Required</label>
            <input name="required" type="checkbox" checked={newField.required} onChange={handleFieldChange} style={{ marginLeft: 8, transform: 'scale(1.15)' }} />
          </div>
          <button type="submit" style={{ padding: '10px 22px', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)' }}>Add Field</button>
        </form>

        <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 14, color: '#1e293b', textAlign: 'center' }}>Form Preview</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24, width: '100%' }}>
          {fields.map((field, idx) => (
            <li key={idx} style={{ marginBottom: 10, padding: 13, background: '#f8fafc', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#1e293b', fontSize: 16 }}>
              <span>
                <b>{field.label}</b> {field.label_kn && <span style={{ color: '#6366f1', marginLeft: 8 }}>{field.label_kn}</span>} <span style={{ color: '#6366f1' }}>({field.inputType})</span>
                {field.required && <span style={{ color: '#e11d48', marginLeft: 6 }}>*</span>}
                {field.options && <span style={{ color: '#64748b', marginLeft: 10 }}>Options: {field.options.join(', ')}</span>}
              </span>
              <button onClick={() => removeField(idx)} style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: 700, cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
            </li>
          ))}
          {fields.length === 0 && <li style={{ color: '#64748b', fontSize: 15, textAlign: 'center' }}>No fields added yet.</li>}
        </ul>

        {success && <div style={{ color: '#16a34a', marginBottom: 14, fontWeight: 500, fontSize: 15, textAlign: 'center' }}>{success}</div>}
        {error && <div style={{ color: '#e11d48', marginBottom: 14, fontWeight: 500, fontSize: 15, textAlign: 'center' }}>{error}</div>}

        <button onClick={handleSubmit} style={{ padding: '13px 32px', background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 10, cursor: 'pointer', boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)', marginTop: 8 }} disabled={loading || fields.length === 0}>
          {loading ? 'Saving...' : 'Save Form'}
        </button>
      </div>
    </AdminLayout>
  );
}
