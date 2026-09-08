import React from 'react';
import { DATA_QUALITY_METRICS } from '../data/mockData';
import { ShieldCheck, Cpu, Radio, Database, CheckCircle2, Info } from 'lucide-react';

export const DataQuality: React.FC = () => {
  const { 
    gpsStatus, 
    sensorStatus, 
    aiProcessing, 
    dataSyncPercent, 
    totalPacketsToday,
    lastSyncTimestamp 
  } = DATA_QUALITY_METRICS;

  return (
    <div className="gov-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={17} style={{ color: 'var(--gov-blue)' }} />
            <h2 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Data Quality & System Status
            </h2>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Platform integrity, synchronization accuracy and edge sensor reliability
          </div>
        </div>

        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          backgroundColor: '#ECFDF5',
          color: '#059669',
          padding: '2px 8px',
          borderRadius: '9999px',
          border: '1px solid #A7F3D0'
        }}>
          System Trust Score: 99.4%
        </span>
      </div>

      {/* Grid of 4 System Status Cards matching Section 15 */}
      <div style={{
        padding: '16px 18px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '12px',
        flex: 1
      }}>
        {/* 1. GPS Status */}
        <div style={{
          backgroundColor: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>GPS Status</span>
            <Radio size={14} style={{ color: '#059669' }} />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            <span>{gpsStatus}</span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            99.9% RTK precision lock
          </div>
        </div>

        {/* 2. Sensor Status */}
        <div style={{
          backgroundColor: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Sensor Status</span>
            <CheckCircle2 size={14} style={{ color: '#059669' }} />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
            <span>{sensorStatus}</span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            3,420 IMU & vision nodes
          </div>
        </div>

        {/* 3. AI Processing */}
        <div style={{
          backgroundColor: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>AI Processing</span>
            <Cpu size={14} style={{ color: 'var(--gov-blue)' }} />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--gov-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--gov-blue)' }}></span>
            <span>{aiProcessing}</span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            Edge TensorRT: 38ms latency
          </div>
        </div>

        {/* 4. Data Synchronization */}
        <div style={{
          backgroundColor: 'var(--bg-surface-alt)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>Data Synchronization</span>
            <Database size={14} style={{ color: '#8B5CF6' }} />
          </div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#8B5CF6', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }}></span>
            <span>{dataSyncPercent}%</span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            {totalPacketsToday.toLocaleString()} packets today
          </div>
        </div>
      </div>

      {/* Mandatory Official Transparency Note matching Section 15 */}
      <div style={{
        padding: '10px 18px',
        backgroundColor: 'var(--bg-surface-alt)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '11px',
        color: 'var(--text-muted)',
        fontStyle: 'italic'
      }}>
        <Info size={13} style={{ color: 'var(--gov-blue)', flexShrink: 0 }} />
        <span>Data shown is for monitoring and decision-support purposes.</span>
      </div>
    </div>
  );
};
