import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sliders, 
  Key, 
  Save, 
  CheckCircle2, 
  Lock,
  FileCheck
} from 'lucide-react';

export const Administration: React.FC = () => {
  const [congestionThreshold, setCongestionThreshold] = useState<number>(15);
  const [occupancyThreshold, setOccupancyThreshold] = useState<number>(85);
  const [batteryThreshold, setBatteryThreshold] = useState<number>(25);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const officers = [
    { name: "Dr. Vikram K. Ranade, IAS", role: "Principal Secretary & Transport Director", dept: "Urban Mobility Directorate", clearance: "Level 5 (Master Exec)", status: "Active" },
    { name: "Sanjay Deshpande", role: "Chief Traffic & Fleet Controller", dept: "Central Control Hub, Pune", clearance: "Level 4 (Fleet Ops)", status: "Active" },
    { name: "Priyanka S. Mahajan", role: "Lead Transport AI Scientist", dept: "Autonomous Mobility Lab", clearance: "Level 4 (Algorithms)", status: "Active" },
    { name: "Girish K. Bhalerao", role: "Superintendent of Depots", dept: "Shivaji Nagar Depot Operations", clearance: "Level 3 (Asset Dispatch)", status: "Active" }
  ];

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  return (
    <div>
      {/* Top Banner */}
      <div className="gov-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <ShieldCheck size={26} color="var(--gov-blue)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy)', margin: 0 }}>
            System Administration & Operational Thresholds
          </h2>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          Restricted Government Control Room Configuration • Role-Based Access Control (RBAC) & Automated Dispatch Rules.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Authorized Officers RBAC Table */}
        <div className="gov-card">
          <div className="card-header">
            <div className="card-title">
              <Users size={18} color="var(--gov-navy)" />
              <span>Authorized Control Room Officers (RBAC)</span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Officer Name</th>
                  <th>Designation</th>
                  <th>Security Clearance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {officers.map(o => (
                  <tr key={o.name}>
                    <td>
                      <strong>{o.name}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{o.dept}</div>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{o.role}</td>
                    <td>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-blue)', background: 'var(--gov-blue-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                        {o.clearance}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-ontime">
                        <span className="badge-dot" />
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Operational Threshold Settings */}
        <div className="gov-card">
          <div className="card-header">
            <div className="card-title">
              <Sliders size={18} color="var(--gov-saffron)" />
              <span>Autonomous Trigger Parameters</span>
            </div>
          </div>
          <div className="card-body">
            {saveSuccess && (
              <div style={{
                background: '#ECFDF5',
                border: '1px solid #6EE7B7',
                color: '#065F46',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>Threshold parameters updated and pushed to AI Edge controllers!</span>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label">Congestion Alert Speed Threshold</label>
                <span style={{ fontWeight: 800, color: 'var(--gov-navy)' }}>{congestionThreshold} km/h</span>
              </div>
              <input 
                type="range" 
                min={8} 
                max={30} 
                value={congestionThreshold} 
                onChange={e => setCongestionThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gov-blue)' }}
              />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Triggers Route Rerouting advisory when corridor speed falls below this limit.
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label">Passenger Overcrowding Threshold</label>
                <span style={{ fontWeight: 800, color: 'var(--gov-navy)' }}>{occupancyThreshold}%</span>
              </div>
              <input 
                type="range" 
                min={70} 
                max={98} 
                value={occupancyThreshold} 
                onChange={e => setOccupancyThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gov-saffron)' }}
              />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Flags bus load warning and recommends standby bus injection.
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label">EV Battery Depot Return Advisory</label>
                <span style={{ fontWeight: 800, color: 'var(--gov-navy)' }}>{batteryThreshold}%</span>
              </div>
              <input 
                type="range" 
                min={15} 
                max={40} 
                value={batteryThreshold} 
                onChange={e => setBatteryThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#DC2626' }}
              />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Automates terminal charging routing when State of Charge falls below threshold.
              </div>
            </div>

            <button className="btn btn-navy" style={{ width: '100%' }} onClick={handleSaveSettings}>
              <Save size={16} />
              <span>Apply Parameters to Central Dispatch Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security & Audit Trails */}
      <div className="gov-card">
        <div className="card-header">
          <div className="card-title">
            <FileCheck size={18} color="var(--status-ontime)" />
            <span>Immutable Administrative Security Audit Trail</span>
          </div>
        </div>
        <div style={{ padding: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div><code>[2026-09-07 17:15 IST]</code> Officer Sanjay Deshpande executed dynamic corridor reroute simulation for Route 12 corridor.</div>
          <div><code>[2026-09-07 16:42 IST]</code> Standby e-bus BUS-1210 dispatched from Shivaji Nagar Depot following AI surge recommendation.</div>
          <div><code>[2026-09-07 15:44 IST]</code> Telemetry deviation alert ALT-901 flagged for BUS-1102; mechanical diagnostics initiated.</div>
          <div><code>[2026-09-07 09:00 IST]</code> Daily system health audit passed with 99.98% GTFS-RT feed integrity.</div>
        </div>
      </div>
    </div>
  );
};
