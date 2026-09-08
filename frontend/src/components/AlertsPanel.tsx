import React, { useState } from 'react';
import { URBAN_OBSERVATIONS } from '../data/mockData';
import { AlertTriangle, MapPin, CheckCircle, Eye, Filter } from 'lucide-react';
import { UrbanObservation, UrbanSeverity } from '../types';

interface AlertsPanelProps {
  onInspectObservation?: (obs: UrbanObservation) => void;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ onInspectObservation }) => {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [alertsList, setAlertsList] = useState<UrbanObservation[]>(URBAN_OBSERVATIONS);

  const filteredAlerts = alertsList.filter(obs => {
    if (severityFilter === 'all') return true;
    return obs.severity === severityFilter;
  });

  const handleAcknowledge = (id: string) => {
    setAlertsList(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'Resolved' ? 'Monitoring' : 'Resolved' };
      }
      return a;
    }));
  };

  const getSeverityBadge = (severity: UrbanSeverity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: '#FEF2F2',
          text: '#DC2626',
          border: '#FECACA',
          label: 'Critical'
        };
      case 'high':
        return {
          bg: '#FFFBEB',
          text: '#D97706',
          border: '#FDE68A',
          label: 'High'
        };
      case 'medium':
        return {
          bg: '#EFF6FF',
          text: '#2563EB',
          border: '#BFDBFE',
          label: 'Medium'
        };
      case 'low':
      default:
        return {
          bg: '#F1F5F9',
          text: '#475569',
          border: '#E2E8F0',
          label: 'Low'
        };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
      case 'Action Required':
        return { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' };
      case 'Pending':
        return { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' };
      case 'Monitoring':
      default:
        return { bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
    }
  };

  return (
    <div className="gov-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={17} style={{ color: '#DC2626' }} />
            <h2 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Priority Alerts
            </h2>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              padding: '2px 8px',
              borderRadius: '9999px',
              border: '1px solid #FECACA'
            }}>
              {filteredAlerts.length} Active
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Real-time urban condition anomalies requiring administrative attention
          </div>
        </div>

        {/* Severity Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All (7)' },
            { id: 'critical', label: 'Critical' },
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSeverityFilter(f.id)}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: 'var(--radius-sm)',
                border: severityFilter === f.id ? '1px solid var(--gov-blue)' : '1px solid var(--border-color)',
                backgroundColor: severityFilter === f.id ? 'var(--gov-blue)' : 'var(--bg-surface-alt)',
                color: severityFilter === f.id ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table matching Section 12 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px',
          textAlign: 'left'
        }}>
          <thead>
            <tr style={{
              backgroundColor: 'var(--bg-surface-alt)',
              borderBottom: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <th style={{ padding: '10px 16px', fontWeight: 700 }}>Priority</th>
              <th style={{ padding: '10px 16px', fontWeight: 700 }}>Issue / Anomaly</th>
              <th style={{ padding: '10px 16px', fontWeight: 700 }}>Location</th>
              <th style={{ padding: '10px 16px', fontWeight: 700 }}>Detected By</th>
              <th style={{ padding: '10px 16px', fontWeight: 700 }}>Status</th>
              <th style={{ padding: '10px 16px', fontWeight: 700 }}>Detected At</th>
              <th style={{ padding: '10px 16px', fontWeight: 700, textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map(alert => {
              const sev = getSeverityBadge(alert.severity);
              const st = getStatusBadge(alert.status);

              return (
                <tr
                  key={alert.id}
                  style={{
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Priority */}
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: sev.bg,
                      color: sev.text,
                      border: `1px solid ${sev.border}`,
                      padding: '2px 7px',
                      borderRadius: '4px'
                    }}>
                      {sev.label}
                    </span>
                  </td>

                  {/* Issue */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {alert.title}
                    </div>
                    {alert.metric && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {alert.metric}
                      </div>
                    )}
                  </td>

                  {/* Location */}
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                      <span>{alert.location}</span>
                    </div>
                  </td>

                  {/* Detected By */}
                  <td style={{ padding: '12px 16px' }}>
                    <code style={{
                      backgroundColor: 'var(--bg-surface-alt)',
                      padding: '2px 5px',
                      borderRadius: '3px',
                      border: '1px solid var(--border-color)',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {alert.detectedByVehicle}
                    </code>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      ({alert.route})
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: st.bg,
                      color: st.text,
                      border: `1px solid ${st.border}`,
                      padding: '2px 7px',
                      borderRadius: '4px'
                    }}>
                      {alert.status}
                    </span>
                  </td>

                  {/* Detected At */}
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    {alert.timestamp}
                  </td>

                  {/* Action */}
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => {
                          if (onInspectObservation) onInspectObservation(alert);
                        }}
                        style={{
                          height: '28px',
                          padding: '0 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Focus and inspect on GIS Map"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>

                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        style={{
                          height: '28px',
                          padding: '0 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid #10B981',
                          backgroundColor: alert.status === 'Resolved' ? '#ECFDF5' : '#10B981',
                          color: alert.status === 'Resolved' ? '#065F46' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle size={12} />
                        <span>{alert.status === 'Resolved' ? 'Reopen' : 'Resolve'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
