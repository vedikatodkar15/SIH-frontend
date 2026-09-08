import React from 'react';
import { RECENT_ACTIVITY_ITEMS } from '../data/mockData';
import { Clock, Activity, Zap, ShieldAlert, Database, AlertTriangle } from 'lucide-react';
import { RecentActivityItem } from '../types';

interface RecentActivityProps {
  activityItems?: RecentActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activityItems = RECENT_ACTIVITY_ITEMS
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'pothole':
        return <Activity size={13} style={{ color: '#8B5CF6' }} />;
      case 'traffic':
        return <Zap size={13} style={{ color: '#F59E0B' }} />;
      case 'infrastructure':
        return <ShieldAlert size={13} style={{ color: '#3B82F6' }} />;
      case 'alert':
        return <AlertTriangle size={13} style={{ color: '#EF4444' }} />;
      case 'telemetry':
      default:
        return <Database size={13} style={{ color: '#10B981' }} />;
    }
  };

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
            <Clock size={17} style={{ color: 'var(--gov-blue)' }} />
            <h2 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Recent Intelligence
            </h2>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Latest observations and telemetry ingestion from public transport fleet
          </div>
        </div>

        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          backgroundColor: '#EFF6FF',
          color: 'var(--gov-blue)',
          padding: '2px 8px',
          borderRadius: '9999px',
          border: '1px solid #BFDBFE'
        }}>
          Live Stream
        </span>
      </div>

      {/* Timeline matching Section 16 */}
      <div style={{
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'auto',
        maxHeight: '340px'
      }}>
        {activityItems.map((item, idx) => (
          <div
            key={item.id || idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              position: 'relative'
            }}
          >
            {/* Timeline icon dot */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '1px'
            }}>
              {getIcon(item.type)}
            </div>

            {/* Timeline Content */}
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-primary)',
                fontWeight: 600,
                lineHeight: 1.4
              }}>
                <span style={{
                  fontFamily: 'monospace',
                  fontWeight: 800,
                  color: 'var(--gov-blue)',
                  marginRight: '6px'
                }}>
                  {item.time}
                </span>
                <span>— {item.message}</span>
              </div>

              {item.location && (
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Location: {item.location}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
