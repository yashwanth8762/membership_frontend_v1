import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../config';
import { notifySuccess, notifyError } from '../../utils/toastify';
import AdminLayout from './AdminLayout';

const AddActivity = () => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [mediaFile, setMediaFile] = useState(null); // File object
  const [mediaId, setMediaId] = useState(''); // Saved media id
  const [mediaName, setMediaName] = useState(''); // Saved media name
  const [mediaUploading, setMediaUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);
  const [kTitle, setKTitle] = useState('');
  const [kAbout, setKAbout] = useState('');

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
      const response = await axios.post(`${API_BASE_URL}media`, formData);
      if (response.data?.data) {
        setMediaId(response.data.data);
        setMediaName(mediaFile.name);
        notifySuccess('Media uploaded successfully!');
      } else {
        notifyError('Failed to upload media');
      }
    } catch (error) {
      notifyError(error?.response?.data?.message || 'Failed to upload media');
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
        media_file: mediaId ? [mediaId] : [],
      };
      const config = {
        headers: {
          Authorization: user.access_token,
        },
      };
      const response = await axios.post(`${API_BASE_URL}activity`, payload, config);
      notifySuccess('Activity created successfully!');
      setTitle('');
      setKTitle('');
      setAbout('');
      setKAbout('');
      setMediaFile(null);
      setMediaId('');
      setMediaName('');
    } catch (error) {
      notifyError(error?.response?.data?.message || 'Failed to create activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Activity</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="k_title" className="block text-sm font-medium text-gray-700 mb-1">
              Title (Kannada)*
            </label>
            <input
              type="text"
              id="k_title"
              value={kTitle}
              onChange={(e) => setKTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              About*
            </label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="k_about" className="block text-sm font-medium text-gray-700 mb-1">
              About (Kannada)*
            </label>
            <textarea
              id="k_about"
              value={kAbout}
              onChange={(e) => setKAbout(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="media" className="block text-sm font-medium text-gray-700 mb-1">
              Media File (optional)
            </label>
            <input
              type="file"
              id="media"
              accept="image/*,application/pdf,video/*"
              onChange={handleMediaChange}
              disabled={!!mediaId}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm"
            />
            
            {mediaFile && !mediaId && (
              <button
                type="button"
                onClick={handleMediaSave}
                disabled={mediaUploading}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mediaUploading ? 'Saving...' : 'Save'}
              </button>
            )}
            {mediaId && (
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm font-medium text-green-700">
                  Saved: {mediaName}
                </span>
                <button
                  type="button"
                  onClick={handleMediaRemove}
                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || (mediaFile && !mediaId)}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Add Activity'}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddActivity;
