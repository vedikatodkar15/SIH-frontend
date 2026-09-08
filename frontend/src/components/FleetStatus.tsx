import React from 'react';
import { FLEET_UNITS } from '../data/mockData';
import { BusFront, Radio, CheckCircle, Clock, Navigation } from 'lucide-react';
import { FleetUnit } from '../types';

interface FleetStatusProps {
  vehicles?: FleetUnit[];
  onSelectVehicle?: (vehicle: FleetUnit) => void;
  selectedVehicleId?: string | null;
}

export const FleetStatus: React.FC<FleetStatusProps> = ({
  vehicles,
  onSelectVehicle,
  selectedVehicleId
}) => {
  const unitsToDisplay = vehicles || FLEET_UNITS;
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
            <BusFront size={17} style={{ color: 'var(--gov-blue)' }} />
            <h2 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Fleet Intelligence
            </h2>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Public transit vehicles operating as mobile urban intelligence units
          </div>
        </div>

        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          backgroundColor: '#ECFDF5',
          color: '#059669',
          padding: '2px 8px',
          borderRadius: '9999px',
          border: '1px solid #A7F3D0'
        }}>
          116 / 128 Online
        </span>
      </div>

      {/* Summary Strip matching Section 14: 128 Active, 116 Reporting, 24 Routes, 98% Data Availability */}
      <div style={{
        padding: '12px 18px',
        backgroundColor: 'var(--bg-surface-alt)',
        borderBottom: '1px solid var(--border-color)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
            128
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Active
          </div>
        </div>

        <div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#059669', fontFamily: 'monospace' }}>
            116
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Reporting
          </div>
        </div>

        <div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gov-blue)', fontFamily: 'monospace' }}>
            24
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Routes
          </div>
        </div>

        <div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#8B5CF6', fontFamily: 'monospace' }}>
            98%
          </div>
          <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Availability
          </div>
        </div>
      </div>

      {/* Vehicle Status List matching Section 14 */}
      <div style={{
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        maxHeight: '340px',
        overflowY: 'auto'
      }}>
        {unitsToDisplay.map(unit => {
          const isSelected = selectedVehicleId === unit.id;
          const isSyncing = unit.status === 'Data Sync';

          return (
            <div
              key={unit.id}
              onClick={() => {
                if (onSelectVehicle) onSelectVehicle(unit);
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: isSelected ? '#EFF6FF' : 'var(--bg-surface)',
                border: isSelected ? '1px solid var(--gov-blue)' : '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>🚌</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {unit.id} — <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{unit.route}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Speed: {unit.speed} km/h • {unit.propulsion}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: isSyncing ? '#FFFBEB' : '#ECFDF5',
                  color: isSyncing ? '#D97706' : '#059669',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: `1px solid ${isSyncing ? '#FDE68A' : '#A7F3D0'}`
                }}>
                  {unit.status}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {unit.lastUpdate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
