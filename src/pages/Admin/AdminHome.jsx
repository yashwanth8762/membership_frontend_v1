import React from 'react';
import AdminLayout from './AdminLayout';

export default function AdminHome() {
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
        }}
      >
        AdminHome
      </div>
    </AdminLayout>
  )
}
