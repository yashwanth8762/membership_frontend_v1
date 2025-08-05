import React, { useState } from 'react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
    // Optionally clear all localStorage: localStorage.clear();
    window.location.href = '/admin';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        height: 64,
        background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: 1,
        boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
        zIndex: 10,
        position: 'relative',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, fontSize: 26, marginRight: 16 }}>MF</span>
          Admin Dashboard
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={handleLogout}
            style={{
              background: '#fff',
              color: '#6366f1',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              padding: '8px 20px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => { e.target.style.background = '#6366f1'; e.target.style.color = '#fff'; }}
            onMouseOut={e => { e.target.style.background = '#fff'; e.target.style.color = '#6366f1'; }}
          >
            Logout
          </button>
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            style={{
              display: 'none',
              position: 'relative',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 28,
              cursor: 'pointer',
            }}
            className="admin-sidebar-toggle"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>
      </header>
      <div className="admin-layout-main" style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Sidebar */}
        <aside
          className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}
          style={{
            width: 220,
            background: '#fff',
            borderRight: '1px solid #e5e7eb',
            padding: '2rem 1rem 1rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            fontWeight: 500,
            fontSize: 17,
            color: '#334155',
            minHeight: 0,
            transition: 'transform 0.2s',
          }}
        >
          <a href="/dashboard" style={{ textDecoration: 'none', color: '#334155', marginBottom: 8 }}>Home</a>
          <a href="/dashboard/membership/create" style={{ textDecoration: 'none', color: '#334155', marginBottom: 8 }}>Create Membership Form</a>
          <a href="/dashboard/membership" style={{ textDecoration: 'none', color: '#334155', marginBottom: 8 }}>Membership Form</a>
          <a href="/dashboard/activity/list" style={{ textDecoration: 'none', color: '#334155', marginBottom: 8 }}>Activity</a>
          <a href="/dashboard/program/list" style={{ textDecoration: 'none', color: '#334155', marginBottom: 8 }}>Upcomming Programs</a>
          <a href="/dashboard/gallery/list" style={{ textDecoration: 'none', color: '#334155', marginBottom: 8 }}>Gallery</a>
        

        </aside>
        {/* Main content */}
        <main
          className="admin-main-content"
          style={{
            flex: 1,
            minHeight: 0,
            background: '#f8fafc',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
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
            {children}
          </div>
        </main>
      </div>
      {/* Footer */}
      <footer style={{
        height: 48,
        background: '#fff',
        color: '#64748b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        borderTop: '1px solid #e5e7eb',
        letterSpacing: 0.2,
      }}>
        © {new Date().getFullYear()} Membership Portal Admin. All rights reserved.
      </footer>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .admin-layout-main {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100vw !important;
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            flex-direction: row !important;
            gap: 24px !important;
            padding: 1rem 0.5rem 1rem 0.5rem !important;
            justify-content: center;
            align-items: center;
          }
          .admin-main-content {
            padding: 1rem !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
          }
          .admin-main-content > div {
            width: 100% !important;
            margin: 1rem 0 !important;
            padding: 1.5rem 0.5rem !important;
          }
          .admin-sidebar-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
} 