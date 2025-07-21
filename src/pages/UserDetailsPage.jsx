import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'http://172.20.10.5:5000/';

export default function UserDetailsPage() {
  const { membershipId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API_BASE_URL}membership/submission/${membershipId}`);
        console.log(res.data); // Debug: log the response
        setData(res.data);
      } catch (err) {
        setError('Failed to fetch user details');
      }
    }
    fetchData();
  }, [membershipId]);

  if (error) return <div style={{ color: '#e11d48', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  if (!data) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', padding: '2.5rem 2rem' }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 16, color: '#1e293b', textAlign: 'center' }}>User Membership Details</h2>
      {data.values.map((field, idx) => (
        <div key={idx} style={{ marginBottom: 18, color: '#334155', fontSize: 16 }}>
          <b>{field.label}:</b> {field.value}
        </div>
      ))}
    </div>
  );
} 