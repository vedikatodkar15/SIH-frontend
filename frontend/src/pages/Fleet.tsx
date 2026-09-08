import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bus, BusStatus } from '../types';
import { 
  BusFront, 
  Search, 
  Download, 
  MapPin, 
  BatteryCharging, 
  Users, 
  X, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  PowerOff 
} from 'lucide-react';

export const Fleet: React.FC = () => {
  const navigate = useNavigate();
  const { buses, setSelectedBusId, t } = useApp();

  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPropulsion, setSelectedPropulsion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailModalBus, setDetailModalBus] = useState<Bus | null>(null);

  // Filter calculations
  const filteredBuses = buses.filter(bus => {
    if (selectedRoute !== 'all' && bus.route !== selectedRoute) return false;
    if (selectedStatus !== 'all' && bus.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    if (selectedPropulsion !== 'all') {
      if (selectedPropulsion === 'electric' && !bus.type.toLowerCase().includes('electric')) return false;
      if (selectedPropulsion === 'cng' && !bus.type.toLowerCase().includes('cng')) return false;
      if (selectedPropulsion === 'diesel' && !bus.type.toLowerCase().includes('diesel')) return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchId = bus.id.toLowerCase().includes(q);
      const matchReg = bus.regNo.toLowerCase().includes(q);
      const matchDriver = bus.driver.toLowerCase().includes(q);
      const matchStop = bus.nextStop.toLowerCase().includes(q);
      const matchRoute = bus.routeName.toLowerCase().includes(q);
      if (!matchId && !matchReg && !matchDriver && !matchStop && !matchRoute) return false;
    }
    return true;
  });

  const onTimeCount = buses.filter(b => b.status === 'On Time').length;
  const delayedCount = buses.filter(b => b.status === 'Delayed').length;
  const criticalCount = buses.filter(b => b.status === 'Critical').length;
  const maintenanceCount = buses.filter(b => b.status === 'Maintenance').length;
  const offlineCount = buses.filter(b => b.status === 'Offline').length;

  const handleTrackBus = (busId: string) => {
    setSelectedBusId(busId);
    navigate('/map');
  };

  const exportCSV = () => {
    const headers = ['Bus ID', 'Registration', 'Route', 'Route Name', 'Status', 'Speed (km/h)', 'Next Stop', 'ETA', 'Driver', 'Battery/Fuel (%)', 'Occupancy (%)', 'Depot'];
    const rows = filteredBuses.map(b => [
      b.id,
      b.regNo,
      b.route,
      `"${b.routeName}"`,
      b.status,
      b.speed,
      `"${b.nextStop}"`,
      b.eta,
      `"${b.driver}"`,
      b.fuelBattery,
      b.occupancy,
      `"${b.depot || 'N/A'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UTIS_Fleet_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: BusStatus) => {
    switch (status) {
      case 'On Time': return <span className="badge badge-ontime"><span className="badge-dot" />On Time</span>;
      case 'Delayed': return <span className="badge badge-delayed"><span className="badge-dot" />Delayed</span>;
      case 'Critical': return <span className="badge badge-critical"><span className="badge-dot" />Critical</span>;
      case 'Maintenance': return <span className="badge badge-maintenance"><span className="badge-dot" />Maintenance</span>;
      case 'Offline': return <span className="badge badge-offline"><span className="badge-dot" />Offline</span>;
    }
  };

  return (
    <div>
      {/* Category Pills Header */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button 
          className={`btn ${selectedStatus === 'all' ? 'btn-navy' : 'btn-outline'}`}
          onClick={() => setSelectedStatus('all')}
        >
          <span>All Fleet</span>
          <span style={{ opacity: 0.8, fontWeight: 700 }}>({buses.length})</span>
        </button>
        <button 
          className={`btn ${selectedStatus === 'on time' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setSelectedStatus('on time')}
          style={{ borderColor: 'var(--status-ontime)' }}
        >
          <CheckCircle2 size={16} color="var(--status-ontime)" />
          <span>On Time</span>
          <span style={{ fontWeight: 700, color: 'var(--status-ontime)' }}>({onTimeCount})</span>
        </button>
        <button 
          className={`btn ${selectedStatus === 'delayed' ? 'btn-navy' : 'btn-outline'}`}
          onClick={() => setSelectedStatus('delayed')}
          style={{ borderColor: 'var(--status-delayed)' }}
        >
          <Clock size={16} color="var(--status-delayed)" />
          <span>Delayed</span>
          <span style={{ fontWeight: 700, color: 'var(--status-delayed)' }}>({delayedCount})</span>
        </button>
        <button 
          className={`btn ${selectedStatus === 'critical' ? 'btn-navy' : 'btn-outline'}`}
          onClick={() => setSelectedStatus('critical')}
          style={{ borderColor: 'var(--status-critical)' }}
        >
          <AlertTriangle size={16} color="var(--status-critical)" />
          <span>Critical Alert</span>
          <span style={{ fontWeight: 700, color: 'var(--status-critical)' }}>({criticalCount})</span>
        </button>
        <button 
          className={`btn ${selectedStatus === 'maintenance' ? 'btn-navy' : 'btn-outline'}`}
          onClick={() => setSelectedStatus('maintenance')}
          style={{ borderColor: 'var(--status-maintenance)' }}
        >
          <Wrench size={16} color="var(--status-maintenance)" />
          <span>Maintenance</span>
          <span style={{ fontWeight: 700, color: 'var(--status-maintenance)' }}>({maintenanceCount})</span>
        </button>
        <button 
          className={`btn ${selectedStatus === 'offline' ? 'btn-navy' : 'btn-outline'}`}
          onClick={() => setSelectedStatus('offline')}
        >
          <PowerOff size={16} color="var(--status-offline)" />
          <span>Offline</span>
          <span style={{ fontWeight: 700, color: 'var(--status-offline)' }}>({offlineCount})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="gov-card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
            {/* Search Box */}
            <div className="search-container">
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search bus ID, reg, stop, driver..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Route Filter */}
            <select 
              className="form-select" 
              style={{ width: 'auto', padding: '6px 12px' }}
              value={selectedRoute}
              onChange={e => setSelectedRoute(e.target.value)}
            >
              <option value="all">All Corridors</option>
              <option value="12">Route 12 (Univ Rd via Sancheti)</option>
              <option value="12B">Route 12B (SB Road AI Bypass)</option>
              <option value="45">Route 45 (Swargate - Hadapsar)</option>
              <option value="101">Route 101 (Kothrud - Viman Nagar)</option>
              <option value="8">Route 8 (Katraj - Pune Stn)</option>
            </select>

            {/* Propulsion Filter */}
            <select 
              className="form-select" 
              style={{ width: 'auto', padding: '6px 12px' }}
              value={selectedPropulsion}
              onChange={e => setSelectedPropulsion(e.target.value)}
            >
              <option value="all">All Fuel / Propulsion</option>
              <option value="electric">Electric (EV Battery)</option>
              <option value="cng">CNG Standard</option>
              <option value="diesel">Diesel BS-VI</option>
            </select>
          </div>

          <button className="btn btn-outline" onClick={exportCSV}>
            <Download size={16} />
            <span>Export Filtered CSV</span>
          </button>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="table-responsive">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Bus ID</th>
              <th>Registration</th>
              <th>Corridor</th>
              <th>Status</th>
              <th>Speed</th>
              <th>Next Stop / ETA</th>
              <th>Battery / Fuel</th>
              <th>Passenger Load</th>
              <th>Driver</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuses.map(bus => (
              <tr key={bus.id}>
                <td>
                  <strong>{bus.id}</strong>
                </td>
                <td>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                    {bus.regNo}
                  </span>
                </td>
                <td>
                  <div><strong>R-{bus.route}</strong></div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{bus.routeName}</div>
                </td>
                <td>{getStatusBadge(bus.status)}</td>
                <td>
                  <span style={{ fontWeight: 700, color: bus.speed > 0 ? 'var(--gov-navy)' : 'var(--text-muted)' }}>
                    {bus.speed} km/h
                  </span>
                </td>
                <td>
                  <div>{bus.nextStop}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ETA: {bus.eta}</div>
                </td>
                <td>
                  <div className="meter-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span className="meter-text">{bus.fuelBattery}%</span>
                    </div>
                    <div className="meter-track">
                      <div 
                        className={`meter-fill ${bus.fuelBattery > 50 ? 'normal' : bus.fuelBattery > 25 ? 'moderate' : 'danger'}`} 
                        style={{ width: `${bus.fuelBattery}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="meter-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span className="meter-text">{bus.occupancy}%</span>
                    </div>
                    <div className="meter-track">
                      <div 
                        className={`meter-fill ${bus.occupancy < 75 ? 'normal' : bus.occupancy < 90 ? 'moderate' : 'danger'}`} 
                        style={{ width: `${bus.occupancy}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.8rem' }}>{bus.driver}</div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button 
                      className="btn btn-outline btn-sm"
                      title="Track on High-Res Map"
                      onClick={() => handleTrackBus(bus.id)}
                    >
                      <MapPin size={14} color="var(--gov-blue)" />
                      <span>Track</span>
                    </button>
                    <button 
                      className="btn btn-outline btn-sm"
                      title="Inspect Vehicle Telemetry"
                      onClick={() => setDetailModalBus(bus)}
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bus Detail Modal */}
      {detailModalBus && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <BusFront size={20} />
                <span>Vehicle Telemetry Diagnostic: {detailModalBus.id}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setDetailModalBus(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div className="form-label">Vehicle Registration</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{detailModalBus.regNo}</div>
                </div>
                <div>
                  <div className="form-label">Operational Status</div>
                  <div>{getStatusBadge(detailModalBus.status)}</div>
                </div>
                <div>
                  <div className="form-label">Active Route</div>
                  <div style={{ fontWeight: 600 }}>Route {detailModalBus.route} ({detailModalBus.routeName})</div>
                </div>
                <div>
                  <div className="form-label">Propulsion & Make</div>
                  <div>{detailModalBus.type}</div>
                </div>
                <div>
                  <div className="form-label">Assigned Driver</div>
                  <div>{detailModalBus.driver}</div>
                </div>
                <div>
                  <div className="form-label">Assigned Conductor</div>
                  <div>{detailModalBus.conductor}</div>
                </div>
                <div>
                  <div className="form-label">Home Depot</div>
                  <div>{detailModalBus.depot || 'Shivaji Nagar Central Depot'}</div>
                </div>
                <div>
                  <div className="form-label">Engine / Inverter Temp</div>
                  <div style={{ fontWeight: 700, color: detailModalBus.engineTemp && parseInt(detailModalBus.engineTemp) > 90 ? '#DC2626' : '#059669' }}>
                    {detailModalBus.engineTemp || '74°C (Normal)'}
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-alt)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>GPS Coordinates: {detailModalBus.lat}, {detailModalBus.lng}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last Ping: {detailModalBus.lastPing}</div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDetailModalBus(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => handleTrackBus(detailModalBus.id)}>
                <MapPin size={16} />
                <span>Locate on GIS Map</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
