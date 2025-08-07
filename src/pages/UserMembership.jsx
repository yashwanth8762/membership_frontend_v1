import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import QRCode from 'react-qr-code';
import MembershipCard from '../components/MembershipCard';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../reducers/user';


export default function UserMembership() {
  
  const [form, setForm] = useState(null);
  // Values for non-media inputs
  const [values, setValues] = useState({});
  // Media files per label: { label: [{file, status, id, name, preview}] }
  const [mediaFiles, setMediaFiles] = useState({});
  // UI states
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [fetchedMembershipData, setFetchedMembershipData] = useState(null);
  const [fetchingMembershipData, setFetchingMembershipData] = useState(false);
  const cardRef = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const isEnglish = !!user.language;
  const toggleLanguage = () => {
    dispatch(setLanguage(!user.language));
  };
  const [showForm, setShowForm] = useState(false);

  // Fetch membership data after submission
  const fetchMembershipData = async (membershipId) => {
    console.log('Fetching membership data for ID:', membershipId);
    
    try {
      setFetchingMembershipData(true);
      console.log('Fetching membership data for ID:', membershipId);
      const res = await axios.get(`${API_BASE_URL}membership/submission/${membershipId}`);
      console.log('Fetched membership data:', res.data);
      setFetchedMembershipData(res.data);
    } catch (err) {
      console.error('Failed to fetch membership data:', err);
      setError('Failed to fetch membership details.');
    } finally {
      setFetchingMembershipData(false);
    }
  };

  // Fetch form on mount
  useEffect(() => {
    async function fetchForm() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}membership/form`);
        const fetchedForm = res.data[0];
        setForm(fetchedForm);

        // Initialize values for non-media fields
        const initialValues = {};
        fetchedForm?.fields.forEach(f => {
          if (f.inputType === 'checkbox') {
            initialValues[f.label] = false;
          } else if (f.inputType !== 'media') {
            initialValues[f.label] = '';
          }
        });
        setValues(initialValues);

        // Initialize mediaFiles with empty arrays for media fields
        const initialMedia = {};
        fetchedForm?.fields.forEach(f => {
          if (f.inputType === 'media') {
            initialMedia[f.label] = [];
          }
        });
        setMediaFiles(initialMedia);

      } catch (err) {
        setError('Failed to load form.');
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, []);

  // Handle non-media input changes
  const handleChange = (label, value, type) => {
    if (type === 'media') {
      // Media handled separately in handleFileChange
    } else {
      setValues(v => ({ ...v, [label]: value }));
    }
  };

  // Handle file selection for media fields
  const handleFileChange = (label, files) => {
    if (!files || files.length === 0) {
      setMediaFiles(prev => ({ ...prev, [label]: [] }));
      return;
    }

    const selectedFile = files[0];
    const newFileObj = {
      file: selectedFile,
      status: 'pending', // pending, uploading, saved
      id: null,
      name: selectedFile.name,
      preview: URL.createObjectURL(selectedFile),
    };
    setMediaFiles(prev => ({ ...prev, [label]: [newFileObj] }));
  };

  // Handle media save (uploading to backend)
  const handleSaveMedia = async (label, index) => {
    const fileObj = mediaFiles[label][index];
    if (!fileObj || fileObj.status !== 'pending') return;

    updateMediaStatus(label, index, 'uploading');

    try {
      const formData = new FormData();
      formData.append('media', fileObj.file);

      console.log('Uploading media file:', fileObj.name);
      
      // Note: No headers object here - let axios detect and set automatically
      const res = await axios.post(`${API_BASE_URL}media`, formData);

      console.log('Media upload response:', res.data);

      if (res.status === 200 || res.status === 201) {
        // Check if we have a valid media ID
        const mediaId = res.data.data || res.data.id;
        if (mediaId) {
          updateMediaDetails(label, index, {
            status: 'saved',
            id: mediaId,
          });
          setSuccess(`'${fileObj.name}' uploaded successfully!`);
          setError('');
          console.log(`Media saved with ID: ${mediaId}`);
        } else {
          updateMediaStatus(label, index, 'pending');
          setError(`Invalid response from server for ${fileObj.name}`);
          setSuccess('');
          console.error('No media ID in response:', res.data);
        }
      } else {
        updateMediaStatus(label, index, 'pending');
        setError(res.data.message || `Failed to upload ${fileObj.name}`);
        setSuccess('');
        console.error('Upload failed with status:', res.status);
      }
    } catch (err) {
      updateMediaStatus(label, index, 'pending');
      setError(`Failed to upload ${fileObj.name}: ${err.message}`);
      setSuccess('');
      console.error('Upload error:', err);
    }
  };

  // Helper to update status of a media file (for specific label and index)
  const updateMediaStatus = (label, index, status) => {
    setMediaFiles(prev => {
      const updated = [...prev[label]];
      updated[index] = { ...updated[index], status };
      return { ...prev, [label]: updated };
    });
  };

  // Helper to update details of media file, e.g. status and id
  const updateMediaDetails = (label, index, details) => {
    setMediaFiles(prev => {
      const updated = [...prev[label]];
      updated[index] = { ...updated[index], ...details };
      return { ...prev, [label]: updated };
    });
  };

  // Remove media file from specific media field
  const handleRemoveMedia = (label, index) => {
    setMediaFiles(prev => {
      const updated = [...prev[label]];
      // Revoke object URL to avoid memory leak
      if (updated[index]?.preview) {
        URL.revokeObjectURL(updated[index].preview);
      }
      updated.splice(index, 1);
      return { ...prev, [label]: updated };
    });
    setSuccess('');
    setError('');
  };

  // Check if all media files (for all media fields) are uploaded/saved
  const allMediaSaved = () => {
    const result = Object.entries(mediaFiles).every(([label, filesArray]) => {
      // If no files are uploaded for this field, consider it "saved"
      if (filesArray.length === 0) {
        return true;
      }
      // If files are uploaded, check if all are saved
      return filesArray.every(f => f.status === 'saved');
    });
    
    console.log('Media files check:', Object.entries(mediaFiles).map(([label, filesArray]) => ({
      label,
      files: filesArray.map(f => ({ name: f.name, status: f.status, id: f.id }))
    })));
    console.log('All media saved result:', result);
    
    return result;
  };

  // Debug function to check media status
  const debugMediaStatus = () => {
    console.log('=== MEDIA STATUS DEBUG ===');
    Object.entries(mediaFiles).forEach(([label, filesArray]) => {
      console.log(`${label}:`, filesArray.map(f => ({
        name: f.name,
        status: f.status,
        id: f.id,
        hasFile: !!f.file
      })));
    });
    console.log('All saved check:', allMediaSaved());
    console.log('========================');
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // Debug: Log media files status
    console.log('Media files status:', mediaFiles);
    console.log('All media saved check:', allMediaSaved());

    // Check if all media files are saved before submission
    if (!allMediaSaved()) {
      const unsavedMedia = Object.entries(mediaFiles)
        .filter(([label, filesArray]) => 
          filesArray.length > 0 && filesArray.some(f => f.status !== 'saved')
        )
        .map(([label, filesArray]) => 
          `${label}: ${filesArray.filter(f => f.status !== 'saved').map(f => f.name).join(', ')}`
        );
      
      setError(`Please save all selected media files before submitting. Unsaved files: ${unsavedMedia.join('; ')}`);
      return;
    }

    try {
      const submissionValues = form.fields.map(field => {
        if (field.inputType === 'media') {
          const savedMedia = mediaFiles[field.label];
          if (!savedMedia || savedMedia.length === 0) {
            return { label: field.label, value: [], media: [] };
          }
          const mediaIds = savedMedia.map(f => f.id).filter(id => id !== null);
          return { label: field.label, value: mediaIds, media: mediaIds };
        } else {
          return { 
            label: field.label, 
            value: values[field.label] ?? '', 
            media: [] 
          };
        }
      });

      // Add membership amount as the first item
      submissionValues.unshift({
        label: 'Membership Amount',
        value: values['Membership Amount'],
        media: []
      });

      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}membership/submit`, {
        formId: form.id,
        values: submissionValues,
      });
      setMembershipId(res.data.membershipId);
      
      // Fetch the complete membership data after submission
      await fetchMembershipData(res.data.membershipId);
      
      setSuccess('Membership card created successfully!');
      setError('');
    } catch (err) {
      setError('Failed to create membership card.');
      setSuccess('');
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  // Download card as image
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
    <div
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        position: 'relative',
      }}
    >
      {/* Language Toggle */}
      <div className="flex items-center space-x-2 mb-8 self-end" style={{ alignSelf: 'flex-end', marginRight: 32, marginTop: 24 }}>
        <span className={`text-sm font-medium ${!isEnglish ? 'text-gray-900' : 'text-gray-500'}`}>ಕನ್ನಡ</span>
        <button
          onClick={toggleLanguage}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{ backgroundColor: isEnglish ? '#3b82f6' : '#6b7280' }}
        >
          <span className="sr-only">Toggle language</span>
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnglish ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
        <span className={`text-sm font-medium ${isEnglish ? 'text-gray-900' : 'text-gray-500'}`}>English</span>
      </div>
      {/* Go to Home Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          padding: '8px 18px',
          background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 16,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
        }}
      >
        {isEnglish ? 'Go to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ'}
      </button>
      {/* Info Box Full Screen */}
      {!showForm && (
        <div style={{
          width: '100vw',
          minHeight: '100vh',
          background: '#f1f5f9',
          color: '#1e293b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          padding: '0 24px',
        }}>
          <div style={{
            maxWidth: 900,
            fontSize: 18,
            lineHeight: 1.7,
            fontWeight: 500,
            textAlign: 'center',
            marginBottom: 40,
          }}>
            ಕರ್ನಾಟಕ ರಾಜ್ಯದ ವಿವಿಧ ಜಿಲ್ಲೆ ಮತ್ತು ತಾಲ್ಲೂಕುಗಳಿಂದ ಕನಿಷ್ಠ 18 ವರ್ಷ ವಯಸ್ಸು ತುಂಬಿದ ಮಾದರ ಜನಾಂಗದ ಪುರುಷರು ಮತ್ತು ಮಹಿಳೆಯರು ಕರ್ನಾಟಕ ಮಾದರ ಮಹಾಸಭಾಗೆ ಸದಸ್ಯರಾಗಲು ಅರ್ಹರಾಗಿರುತ್ತಾರೆ. ಸದಸ್ಯರಾಗಲು ಇಚ್ಚಿಸುವ ತಾಲ್ಲೂಕು ಮತ್ತು ಜಿಲ್ಲಾ ನಿವಾಸಿಗಳು ಸಭಾದ ಕಾರ್ಯಕಾರಿ ಸಮಿತಿ ನಿಗಧಿಪಡಿಸಿದ ಅರ್ಜಿ ನಮೂನೆಯಲ್ಲಿ ವಿವರಗಳನ್ನು ತುಂಬಿ ನಿಗಧಿ ಪಡಿಸಿದ ಶುಲ್ಕ ಪಾವತಿಸಬೇಕಾಗಿರುತ್ತದೆ. ಅರ್ಜಿ ನಮೂನೆ ಮತ್ತು ಪಾವತಿ ವಿವರಗಳು ಕೆಳಕಂಡಂತಿದ್ದು, ಆನ್‌ಲೈನ್‌ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಶುಲ್ಕ ಪಾವತಿಸಿ ಸದಸ್ಯತ್ವ ಪಡೆಯಬಹುದಾಗಿದೆ ಹಾಗೂ ಮೆಂಬರ್‌ಶಿಪ್‌ ಕಾರ್ಡ್‌ನ್ನು ಡೌನ್‌ಲೋಡ್‌ ಮಾಡಿಕೊಳ್ಳಬಹುದಾಗಿದೆ.
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
              marginTop: 16,
            }}
          >
            ಸದಸ್ಯತ್ವ ಅರ್ಜಿ ನಮೂನೆಗೆ ಮುಂದುವರೆಯಿರಿ
          </button>
        </div>
      )}
      {/* Membership Form */}
      {showForm && (
        <div
          style={{
            width: '100vw',
            minHeight: '100vh',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 0',
            margin: 0,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, width: '100%', maxWidth: 600 }}>
            <h2
              style={{
                fontWeight: 700,
                fontSize: 28,
                color: '#1e293b',
                textAlign: 'center',
                margin: 0,
                flex: 1,
              }}
            >
              {isEnglish ? 'Membership Application Form' : 'ಸದಸ್ಯತ್ವ ಅರ್ಜಿ ನಮೂನೆ'}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                marginLeft: 16,
                padding: '8px 18px',
                background: '#e5e7eb',
                color: '#1e293b',
                fontWeight: 600,
                fontSize: 15,
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                boxShadow: '0 2px 8px 0 rgba(99,102,241,0.06)',
              }}
            >
              {isEnglish ? 'Cancel' : 'ರದ್ದುಮಾಡಿ'}
            </button>
          </div>
          <div style={{ width: '100%', maxWidth: 600 }}>
            {loading && <div>Loading form...</div>}
            {error && <div style={{ color: '#e11d48', marginBottom: 12 }}>{error}</div>}
            {!membershipId && form && (
              <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
                {/* Membership Amount Selection */}
                <div className="col-span-full mb-4">
                  <label className="block font-medium text-gray-700 mb-2">
                    {isEnglish ? 'Select Membership Amount' : 'ಸದಸ್ಯತ್ವ ಮೊತ್ತವನ್ನು ಆಯ್ಕೆಮಾಡಿ'} <span style={{ color: '#e11d48', marginLeft: 4 }}>*</span>
                  </label>
                  <select
                    value={values['Membership Amount'] || ''}
                    onChange={e => setValues(v => ({ ...v, 'Membership Amount': e.target.value }))}
                    required
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">{isEnglish ? 'Select amount...' : 'ಮೊತ್ತ ಆಯ್ಕೆಮಾಡಿ...'}</option>
                    <option value="500">₹500 - {isEnglish ? 'General Membership' : 'ಸಾಮಾನ್ಯ ಸದಸ್ಯತ್ವ'}</option>
                    <option value="25000">₹25,000 - {isEnglish ? 'Lifetime Membership' : 'ಆಜೀವ ಸದಸ್ಯತ್ವ'}</option>
                    <option value="50000">₹50,000 - {isEnglish ? 'Patron Membership' : 'ಪ್ಯಾಟ್ರಾನ್ ಸದಸ್ಯತ್ವ'}</option>
                    <option value="100000">₹1,00,000 - {isEnglish ? 'Chief Patron Membership' : 'ಮುಖ್ಯ ಪ್ಯಾಟ್ರಾನ್ ಸದಸ್ಯತ್ವ'}</option>
                  </select>
                </div>
                {/* End Membership Amount Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {form.fields.map((field, idx) => {
                    const fieldMediaFiles = mediaFiles[field.label] || [];
                    // Full width for textarea and media fields
                    const isFullWidth = field.inputType === 'textarea' || field.inputType === 'media';
                    const labelText = isEnglish ? field.label : (field.label_kn || field.label);
                    return (
                      <div
                        key={idx}
                        className={isFullWidth ? 'col-span-full' : ''}
                      >
                        <label
                          style={{
                            fontWeight: 500,
                            color: '#334155',
                            display: 'block',
                            marginBottom: 6,
                          }}
                        >
                          {labelText}
                          {field.required && <span style={{ color: '#e11d48', marginLeft: 4 }}>*</span>}
                        </label>

                        {/* Non-media fields */}
                        {field.inputType === 'text' && (
                          <input
                            type="text"
                            value={values[field.label] || ''}
                            onChange={e => handleChange(field.label, e.target.value)}
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        )}

                        {field.inputType === 'textarea' && (
                          <textarea
                            value={values[field.label] || ''}
                            onChange={e => handleChange(field.label, e.target.value)}
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                          />
                        )}

                        {field.inputType === 'number' && (
                          <input
                            type="number"
                            value={values[field.label] || ''}
                            onChange={e => handleChange(field.label, e.target.value)}
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        )}

                        {['dropdown', 'radio'].includes(field.inputType) && field.options && (
                          <select
                            value={values[field.label] || ''}
                            onChange={e => handleChange(field.label, e.target.value)}
                            required={field.required}
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            <option value="">{isEnglish ? 'Select...' : 'ಆಯ್ಕೆಮಾಡಿ...'}</option>
                            {field.options.map((opt, i) => (
                              <option key={i} value={opt}>
                                {isEnglish ? opt : (field.options_kn && field.options_kn[i] ? field.options_kn[i] : opt)}
                              </option>
                            ))}
                          </select>
                        )}

                        {field.inputType === 'checkbox' && (
                          <input
                            type="checkbox"
                            checked={!!values[field.label]}
                            onChange={e => handleChange(field.label, e.target.checked)}
                            className="scale-110"
                          />
                        )}

                        {/* Media field */}
                        {field.inputType === 'media' && (
                          <div className="w-full">
                            <label className="block text-gray-700 font-medium mb-2">
                              {/* {isEnglish ? 'Upload Photo' : 'ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ'} */}
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleFileChange(field.label, e.target.files)}
                              required={field.required && fieldMediaFiles.length === 0}
                              className="w-full p-2.5 rounded-lg border border-slate-300 text-base bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                              style={{ minHeight: 44 }}
                            />
                            {fieldMediaFiles.length > 0 && (
                              <div className="flex gap-2 mb-2">
                                {fieldMediaFiles[0].status === 'pending' && (
                                  <button
                                    type="button"
                                    onClick={() => handleSaveMedia(field.label, 0)}
                                    className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                                  >
                                    {isEnglish ? 'Save' : 'ಉಳಿಸಿ'}
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMedia(field.label, 0)}
                                  className="px-4 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                >
                                  {isEnglish ? 'Remove' : 'ತೊಳೆಗೆಯೆಡೆ'}
                                </button>
                                {fieldMediaFiles[0].status === 'uploading' && (
                                  <span className="text-blue-600 font-semibold">{isEnglish ? 'Saving...' : 'ಉಳಿಸಿ ಮಾಡುತ್ತಿದೆ...'}</span>
                                )}
                                {fieldMediaFiles[0].status === 'saved' && (
                                  <span className="text-green-600 font-semibold align-middle">{isEnglish ? '✓ Saved' : '✓ ಉಳಿಸಿದೆ'}</span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {success && <div style={{ color: '#16a34a', marginBottom: 12 }}>{success}</div>}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: 24 }}>
                  <button
                    type="button"
                    onClick={debugMediaStatus}
                    style={{
                      padding: '8px 16px',
                      background: '#6b7280',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 14,
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                  >
                    Debug Media Status
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 32px',
                      background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 18,
                      border: 'none',
                      borderRadius: 10,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
                    }}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Create Membership Card'}
                  </button>
                </div>
              </form>
            )}
            {membershipId && fetchedMembershipData && !fetchingMembershipData && (
              <div ref={cardRef} style={{ margin: '2rem auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <MembershipCard 
                  membershipData={fetchedMembershipData}
                  showColorPicker={true} 
                />
                <button
                  onClick={handleDownload}
                  style={{
                    padding: '10px 28px',
                    background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 17,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
                    margin: '1rem auto 0',
                    display: 'block',
                  }}
                >
                  {isEnglish ? 'Download Card' : 'ಸದಸ್ಯತ್ವ ಕಾರ್ಡ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ'}
                </button>
              </div>
            )}
            
            {fetchingMembershipData && (
              <div style={{ textAlign: 'center', margin: '2rem auto' }}>
                <div>Loading membership card...</div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Go to Home button if form is not available */}
      {showForm && !loading && !form && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '14px 36px',
              background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 20,
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
              marginTop: 24,
            }}
          >
            {isEnglish ? 'Go to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ'}
          </button>
        </div>
      )}
    </div>
  );
}
