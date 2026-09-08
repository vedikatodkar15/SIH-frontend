import React from 'react';
import { RefreshCw, Radio, MapPin, Layers, Clock, ShieldCheck, Database } from 'lucide-react';

interface DashboardHeaderProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  timePeriod: string;
  setTimePeriod: (period: string) => void;
  lastUpdated: string;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onRefresh: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCity,
  setSelectedCity,
  selectedZone,
  setSelectedZone,
  timePeriod,
  setTimePeriod,
  lastUpdated,
  isSimulating,
  onToggleSimulation,
  onRefresh
}) => {
  return (
    <div className="dashboard-header-container" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Main Title Row matching Section 5 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '4px 0 6px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Urban Transport Intelligence Dashboard
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              border: '1px solid #A7F3D0'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
              Operational (99.8%)
            </span>
          </div>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            margin: '4px 0 0 0',
            fontWeight: 500
          }}>
            Real-time monitoring and analysis of urban conditions using public transport fleet data
          </p>
        </div>

        {/* Right meta strip: Last updated, Data source, System status */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}>
            <Database size={13} style={{ color: 'var(--gov-blue)' }} />
            <div style={{ fontSize: '11px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Data Source: </span>
              <strong style={{ color: 'var(--text-primary)' }}>Public Transport Fleet</strong>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}>
            <Clock size={13} style={{ color: 'var(--text-muted)' }} />
            <div style={{ fontSize: '11px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Last Updated: </span>
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{lastUpdated}</strong>
            </div>
          </div>

          <button
            onClick={onToggleSimulation}
            style={{
              height: '32px',
              padding: '0 12px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
              border: isSimulating ? '1px solid #10B981' : '1px solid var(--border-color)',
              backgroundColor: isSimulating ? '#ECFDF5' : 'var(--bg-surface)',
              color: isSimulating ? '#065F46' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            title="Toggle live telemetry feed emulation"
          >
            <Radio size={13} style={{ color: isSimulating ? '#10B981' : 'var(--text-muted)' }} />
            <span>{isSimulating ? 'Live Telemetry Active' : 'Feed Paused'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar (City, Zone, Time Period, Live Sync) */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '10px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* City / Metropolitan Area Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} style={{ color: 'var(--gov-blue)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Region:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                height: '32px',
                padding: '0 10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-alt)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Pune">Pune Metropolitan (PMPML)</option>
              <option value="Delhi">Delhi Capital Region (DTC)</option>
              <option value="Bengaluru">Bengaluru Urban (BMTC)</option>
              <option value="Mumbai">Mumbai Metro (BEST)</option>
            </select>
          </div>

          {/* Urban Corridor / Zone Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={14} style={{ color: 'var(--gov-blue)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Corridor Zone:</span>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              style={{
                height: '32px',
                padding: '0 10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-alt)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Urban Zones (42 Monitored)</option>
              <option value="central">Central Corridor (Shivaji Nagar - FC Rd)</option>
              <option value="east">East Industrial Sector (Hadapsar - Swargate)</option>
              <option value="north">North University Ring (Aundh - SPPU)</option>
              <option value="west">West Tech Corridor (Kothrud - Paud Rd)</option>
            </select>
          </div>

          {/* Time Period */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} style={{ color: 'var(--gov-blue)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Period:</span>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              style={{
                height: '32px',
                padding: '0 10px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-alt)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="live">Live Telemetry Stream</option>
              <option value="today">Today (Peak + Off-Peak)</option>
              <option value="week">Past 7 Days Aggregated</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              setSelectedCity('Pune');
              setSelectedZone('all');
              setTimePeriod('live');
            }}
            style={{
              height: '30px',
              padding: '0 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            Reset Filters
          </button>

          <button
            onClick={onRefresh}
            style={{
              height: '30px',
              padding: '0 12px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: 'var(--gov-blue)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(29, 78, 216, 0.2)'
            }}
          >
            <RefreshCw size={12} />
            <span>Sync Edge Nodes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
