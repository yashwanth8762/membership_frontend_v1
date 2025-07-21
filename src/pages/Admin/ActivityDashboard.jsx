import React from 'react'
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';

export default function ActivityDashboard() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        padding: '2.5rem 2rem',
        minWidth: 320,
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 32,
        color: '#1e293b',
        margin: '2rem auto',
        position: 'relative',
      }}
    >
      <button
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          padding: '10px 22px',
          background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 16,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)'
        }}
        onClick={() => navigate('/dashboard/activity/create')}
      >
        Add Activity
      </button>
      ActivityDashboard
    </div>
  </AdminLayout>
  )
}
