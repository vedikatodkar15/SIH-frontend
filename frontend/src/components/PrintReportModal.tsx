import React from 'react';
import { KPIAudit, Bus } from '../types';
import { X, Printer, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PrintReportModalProps {
  audit: KPIAudit;
  buses: Bus[];
  isOpen: boolean;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  audit,
  buses,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <Printer size={18} />
            <span>Official Government Audit Report Preview</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close preview">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ backgroundColor: '#FFFFFF', padding: '24px' }}>
          {/* Official Document Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0A2540', paddingBottom: '16px', marginBottom: '20px' }}>
            <img src="/assets/emblem.svg" alt="Emblem" style={{ height: '54px', marginBottom: '8px' }} />
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#475569' }}>
              Government of India • Ministry of Housing & Urban Affairs
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A2540', marginTop: '4px' }}>
              Urban Transport Intelligence System (UTIS)
            </h2>
            <div style={{ fontSize: '0.88rem', color: '#1D4ED8', fontWeight: 600 }}>
              Daily Fleet Performance & Environmental Audit Report
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
              Jurisdiction: Pune Metropolitan Region (PMPML Model) • Generated: {new Date().toLocaleDateString('en-IN')}
            </div>
          </div>

          {/* KPI Summary Table */}
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A2540', marginBottom: '10px' }}>
            1. Executive Key Performance Indicators (KPIs)
          </h3>
          <table className="gov-table" style={{ marginBottom: '20px', fontSize: '0.82rem' }}>
            <tbody>
              <tr>
                <td><strong>Total Authorized Fleet Size:</strong></td>
                <td>{audit.totalFleetSize} buses</td>
                <td><strong>Active In-Service Buses:</strong></td>
                <td>{audit.activeToday} buses</td>
              </tr>
              <tr>
                <td><strong>On-Time Punctuality Index:</strong></td>
                <td><span style={{ color: '#059669', fontWeight: 700 }}>{audit.onTimeReliability}</span></td>
                <td><strong>Peak Hour Punctuality:</strong></td>
                <td>{audit.peakPunctuality}</td>
              </tr>
              <tr>
                <td><strong>Fuel / Diesel Conserved:</strong></td>
                <td>{audit.fuelDieselSavedLiters.toLocaleString()} Liters</td>
                <td><strong>Carbon Emissions Reduced:</strong></td>
                <td><span style={{ color: '#059669', fontWeight: 700 }}>{audit.co2AvoidedKg.toLocaleString()} kg CO₂</span></td>
              </tr>
              <tr>
                <td><strong>Trips Completed Today:</strong></td>
                <td>{audit.totalTripsOperated.toLocaleString()}</td>
                <td><strong>Citizen Grievances Resolved:</strong></td>
                <td>{audit.citizenComplaintsResolved} / {audit.citizenComplaintsLogged} ({Math.round(audit.citizenComplaintsResolved / audit.citizenComplaintsLogged * 100)}%)</td>
              </tr>
            </tbody>
          </table>

          {/* Active Fleet Sample Table */}
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0A2540', marginBottom: '10px' }}>
            2. Real-Time Telemetry Audit Sample
          </h3>
          <table className="gov-table" style={{ fontSize: '0.8rem', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>Bus ID</th>
                <th>Reg No</th>
                <th>Route</th>
                <th>Status</th>
                <th>Battery/Fuel</th>
                <th>Occupancy</th>
                <th>Depot</th>
              </tr>
            </thead>
            <tbody>
              {buses.slice(0, 6).map(bus => (
                <tr key={bus.id}>
                  <td><strong>{bus.id}</strong></td>
                  <td>{bus.regNo}</td>
                  <td>R-{bus.route}</td>
                  <td>{bus.status}</td>
                  <td>{bus.fuelBattery}%</td>
                  <td>{bus.occupancy}%</td>
                  <td>{bus.depot}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Official Sign-off Seal */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '30px', paddingTop: '16px', borderTop: '1px solid #CBD5E1' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
              <div>System Document Hash: UTIS-PN-2026-AUD-99214</div>
              <div>Cryptographically signed via National Transport Intelligence Engine</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#0A2540', fontSize: '0.85rem' }}>Officer Commanding</div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>Central Transit Operations Centre, Pune</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-navy" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Official Document (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
