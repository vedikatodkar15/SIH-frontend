import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapComponent } from '../components/MapComponent';
import { Bus } from '../types';
import { 
  MapPin, 
  BusFront, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  BatteryCharging, 
  Users, 
  Clock, 
  Navigation,
  X
} from 'lucide-react';

export const GISMap: React.FC = () => {
  const { buses, routes, stopsData, traffic, selectedBusId, setSelectedBusId } = useApp();

  const activeBus = buses.find(b => b.id === selectedBusId) || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', position: 'relative' }}>
      {/* Top Map Header Strip */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '12px',
        background: 'var(--bg-surface)',
        padding: '10px 16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'var(--gov-blue-subtle)', 
            padding: '6px', 
            borderRadius: 'var(--radius-sm)',
            color: 'var(--gov-blue)'
          }}>
            <MapPin size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gov-navy)', margin: 0 }}>
              Pune Metropolitan GIS Geospatial Transit Command
            </h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              OpenStreetMap + GeoJSON Corridor Layers • Dynamic Telemetry Coordinates
            </div>
          </div>
        </div>

        {/* Bus Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gov-navy)' }}>
            Focus Vehicle:
          </label>
          <select 
            className="form-select" 
            style={{ width: '220px', padding: '6px 10px', fontSize: '0.82rem' }}
            value={selectedBusId || ''}
            onChange={(e) => setSelectedBusId(e.target.value ? e.target.value : null)}
          >
            <option value="">-- All Active Vehicles --</option>
            {buses.map(b => (
              <option key={b.id} value={b.id}>
                {b.id} ({b.regNo}) - R-{b.route} [{b.status}]
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Map Container */}
      <div style={{ flex: 1, position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <MapComponent 
          buses={buses}
          routes={routes}
          stops={stopsData.stops}
          depots={stopsData.depots}
          bottlenecks={traffic.bottlenecks}
          selectedBusId={selectedBusId}
          onSelectBus={(bus) => setSelectedBusId(bus.id)}
          height="100%"
          showControls={true}
        />

        {/* Floating Telemetry HUD when a bus is focused */}
        {activeBus && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            zIndex: 1000,
            background: 'rgba(10, 37, 64, 0.95)',
            color: '#FFFFFF',
            backdropFilter: 'blur(8px)',
            border: '2px solid var(--gov-saffron)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            width: '320px',
            boxShadow: 'var(--shadow-lg)',
            animation: 'modal-enter 0.2s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BusFront size={18} color="#FBBF24" />
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{activeBus.id}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({activeBus.regNo})</span>
              </div>
              <button 
                onClick={() => setSelectedBusId(null)}
                style={{ color: '#CBD5E1', padding: '2px' }}
                aria-label="Close HUD"
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
              <div><strong>Route:</strong> Route {activeBus.route} ({activeBus.routeName})</div>
              <div><strong>Status:</strong> <span style={{ color: activeBus.status === 'On Time' ? '#34D399' : '#F87171', fontWeight: 700 }}>{activeBus.status}</span></div>
              <div><strong>Speed:</strong> {activeBus.speed} km/h • <strong>ETA:</strong> {activeBus.eta}</div>
              <div><strong>Next Stop:</strong> {activeBus.nextStop}</div>
              <div><strong>Battery / Fuel:</strong> {activeBus.fuelBattery}% • <strong>Load:</strong> {activeBus.occupancy}%</div>
              <div><strong>Driver:</strong> {activeBus.driver}</div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                Lat/Lng: {activeBus.lat}, {activeBus.lng} • Last Ping: {activeBus.lastPing}
              </div>
            </div>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          fontSize: '0.75rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '4px' }}>Map Legend</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block' }} />
            <span>On-Time Bus (Green)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#DC2626', display: 'inline-block' }} />
            <span>Delayed Bus (Red)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '16px', height: '3px', backgroundColor: '#10B981', display: 'inline-block', borderTop: '2px dashed #10B981' }} />
            <span>Route 12B AI Bypass (Dashed)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⚠️</span>
            <span>Congestion Bottleneck</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🏢</span>
            <span>Depot Standby Facility</span>
          </div>
        </div>
      </div>
    </div>
  );
};
