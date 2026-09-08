import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlertLevel, Alert } from '../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Filter, 
  ShieldAlert, 
  Clock,
  Check
} from 'lucide-react';

export const AlertsIncidents: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, acknowledgeAlert, setSelectedBusId, t } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter(a => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unresolved') return a.status === 'Active' || a.status === 'Unresolved';
    if (selectedFilter === 'resolved') return a.status === 'Resolved' || a.status === 'Acknowledged';
    return a.level === selectedFilter;
  });

  const handleLocateOnMap = (alert: Alert) => {
    if (alert.busId && alert.busId.startsWith('BUS')) {
      setSelectedBusId(alert.busId);
    }
    navigate('/map');
  };

  return (
    <div>
      {/* Top Filter Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${selectedFilter === 'all' ? 'btn-navy' : 'btn-outline'}`}
            onClick={() => setSelectedFilter('all')}
          >
            <span>All Incidents ({alerts.length})</span>
          </button>
          <button 
            className={`btn ${selectedFilter === 'unresolved' ? 'btn-saffron' : 'btn-outline'}`}
            onClick={() => setSelectedFilter('unresolved')}
          >
            <AlertTriangle size={15} />
            <span>Unresolved ({alerts.filter(a => a.status === 'Active' || a.status === 'Unresolved').length})</span>
          </button>
          <button 
            className={`btn ${selectedFilter === 'critical' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderColor: 'var(--status-critical)' }}
            onClick={() => setSelectedFilter('critical')}
          >
            <span>Critical Only ({alerts.filter(a => a.level === 'critical').length})</span>
          </button>
          <button 
            className={`btn ${selectedFilter === 'warning' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setSelectedFilter('warning')}
          >
            <span>Warnings ({alerts.filter(a => a.level === 'warning').length})</span>
          </button>
          <button 
            className={`btn ${selectedFilter === 'resolved' ? 'btn-navy' : 'btn-outline'}`}
            onClick={() => setSelectedFilter('resolved')}
          >
            <CheckCircle2 size={15} color="var(--status-ontime)" />
            <span>Acknowledged / Resolved</span>
          </button>
        </div>
      </div>

      {/* Incident Cards Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredAlerts.map(alert => {
          const isAcked = alert.status === 'Acknowledged' || alert.status === 'Resolved';

          return (
            <div 
              key={alert.id}
              className="gov-card"
              style={{
                borderLeft: `5px solid ${alert.level === 'critical' ? 'var(--status-critical)' : alert.level === 'warning' ? 'var(--status-warning)' : 'var(--status-info)'}`,
                padding: '18px',
                opacity: isAcked ? 0.85 : 1
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`badge badge-${alert.level}`}>
                    <span className="badge-dot" />
                    {alert.level.toUpperCase()}
                  </span>
                  <span style={{ fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.95rem' }}>
                    {alert.title}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                    {alert.id}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <Clock size={14} />
                  <span>{alert.time}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                {alert.detail}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  <div><strong>Corridor:</strong> {alert.route}</div>
                  <div><strong>Location:</strong> {alert.location}</div>
                  <div><strong>Target Vehicle:</strong> {alert.busId}</div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <span style={{ fontWeight: 700, color: isAcked ? 'var(--status-ontime)' : 'var(--status-delayed)' }}>
                      {alert.status} {alert.acknowledgedAt ? `(${alert.acknowledgedAt})` : ''}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => handleLocateOnMap(alert)}
                  >
                    <MapPin size={14} color="var(--gov-blue)" />
                    <span>Locate on Map</span>
                  </button>

                  {!isAcked ? (
                    <button 
                      className="btn btn-navy btn-sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      <Check size={14} />
                      <span>Acknowledge Incident</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: 'var(--status-ontime)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={16} /> Acknowledged
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
