import React from 'react';

export const MapLegend: React.FC = () => {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(4px)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '8px 12px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      fontSize: '11px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      flexWrap: 'wrap',
      color: 'var(--text-primary)',
      fontWeight: 600
    }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Map Legend:
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>🚌</span>
        <span>Active Vehicle</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ color: '#10B981', fontSize: '14px', lineHeight: 1 }}>●</span>
        <span>Normal Road</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>⚠️</span>
        <span>Road Issue</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>🚦</span>
        <span>Traffic Issue</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>🏗️</span>
        <span>Infrastructure Issue</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ color: '#EF4444', fontSize: '14px', lineHeight: 1 }}>🔴</span>
        <span>Critical Alert</span>
      </div>
    </div>
  );
};
