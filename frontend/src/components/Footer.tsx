import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, HelpCircle, Eye } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-color)',
      padding: '16px 24px',
      marginTop: '24px',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left identity matching Section 31 */}
        <div>
          <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '13px' }}>
            Urban Transport Intelligence System (UTIS)
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            AI-Powered Mobile Urban Intelligence Platform Using Public Transport Fleet
          </div>
          <div style={{ fontSize: '10px', color: 'var(--gov-blue)', fontWeight: 700, marginTop: '3px' }}>
            Prototype | Smart India Hackathon 2026
          </div>
        </div>

        {/* Center / Right links & badges matching Section 31 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          fontSize: '11px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 700 }}>
            <CheckCircle2 size={13} />
            <span>System Status: Operational</span>
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
            <Lock size={12} />
            <span>Data Privacy & Anonymization Compliant</span>
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
            <Eye size={12} />
            <span>GIGW 3.0 Accessible</span>
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <HelpCircle size={12} />
            <span>Help & Feedback</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
