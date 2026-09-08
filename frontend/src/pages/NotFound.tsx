import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      textAlign: 'center'
    }}>
      <ShieldAlert size={64} color="var(--gov-navy)" style={{ marginBottom: '16px' }} />
      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '8px' }}>
        404 — Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '24px' }}>
        The requested transit intelligence view does not exist in the National Urban Transport Intelligence Platform.
      </p>
      <button className="btn btn-navy" onClick={() => navigate('/')}>
        <Home size={16} />
        <span>Return to Dashboard Command Center</span>
      </button>
    </div>
  );
};
