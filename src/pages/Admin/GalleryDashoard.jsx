import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../config';
import AdminLayout from './AdminLayout';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { notifySuccess, notifyError } from '../../utils/toastify';
import { useNavigate } from 'react-router-dom';

const GalleryDashoard = () => {
  const [mediaList, setMediaList] = useState([]); // Flattened media array
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}gallery`);
      const data = await res.json();
    console.log("media",data)
      if (data) {
        // Flatten all media from all gallery objects
        const allMedia = data.flatMap(gallery =>
          (gallery.media || []).map(media => ({
            ...media,
            galleryId: gallery.id,
          }))
        );
        setMediaList(allMedia);
      } else {
        notifyError(data.message || 'Failed to fetch galleries');
      }
    } catch (err) {
      notifyError('Failed to fetch galleries');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (index) => {
    setModalImages(mediaList);
    setModalIndex(index);
    setModalOpen(true);
  };

  const handleDelete = async (mediaId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    setDeletingId(mediaId);
    try {
      const res = await fetch(`${API_BASE_URL}gallery/${mediaId}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        notifySuccess('Image deleted successfully!');
        setMediaList(mediaList.filter(m => m.id !== mediaId));
      } else {
        notifyError(data.message || 'Failed to delete image');
      }
    } catch (err) {
      notifyError('Failed to delete image');
    } finally {
      setDeletingId(null);
    }
  };

  const showPrev = () => setModalIndex((i) => (i - 1 + modalImages.length) % modalImages.length);
  const showNext = () => setModalIndex((i) => (i + 1) % modalImages.length);

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-end mb-4">
          <button
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm"
            onClick={() => navigate('/dashboard/gallery/create')}
          >
            Add Media
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery Dashboard</h2>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mediaList.map((media, idx) => (
                  <tr key={media.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {media.image_url && media.image_url.full && media.image_url.full.high_res ? (
                        <img src={`${API_BASE_URL}${media.image_url.full.high_res}`} alt="thumb" className="w-20 h-20 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                        onClick={() => handleView(idx)}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
                        onClick={() => handleDelete(media.id)}
                        disabled={deletingId === media.id}
                      >
                        {deletingId === media.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for viewing images */}
        {modalOpen && modalImages.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setModalOpen(false)}>
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 z-50" onClick={() => setModalOpen(false)}>
              <X size={32} />
            </button>
            <div className="relative w-full max-w-3xl h-full max-h-[85vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white" onClick={showPrev}>
                <ChevronLeft size={28} />
              </button>
              <img src={`${API_BASE_URL}${modalImages[modalIndex].image_url.full.high_res}`} alt={modalImages[modalIndex].name?.original || 'Gallery Image'} className="max-w-full max-h-full object-contain rounded-lg" />
              <button className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white" onClick={showNext}>
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GalleryDashoard;
