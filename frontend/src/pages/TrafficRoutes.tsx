import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RerouteModal } from '../components/RerouteModal';
import { 
  Route as RouteIcon, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Leaf, 
  Gauge, 
  Play
} from 'lucide-react';

export const TrafficRoutes: React.FC = () => {
  const { traffic, routes, approveRecommendation } = useApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      {/* Top Congestion Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CITYWIDE CONGESTION INDEX</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', marginTop: '4px' }}>
            {traffic.summary.citywideCongestionIndex}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Evening Peak Velocity Drop
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE BOTTLENECK CHOKE POINTS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
            {traffic.summary.activeBottlenecks}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Monitored via Traffic Police CCTV AI
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVERAGE TRANSIT FLEET SPEED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: '4px' }}>
            {traffic.summary.avgFleetSpeed}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            Free-flow nominal: 38 km/h
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ALGORITHMIC BYPASS READY</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', marginTop: '6px' }}>
            Route 12B (SB Road)
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Saves 14 min per round trip
          </div>
        </div>
      </div>

      {/* Featured Route 12 vs 12B Bypass Showcase */}
      <div className="gov-card" style={{ padding: '20px', marginBottom: '24px', border: '2px solid var(--gov-blue)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy)', margin: 0 }}>
              Autonomous Route Diversion: Sancheti Chowk Bottleneck Bypass
            </h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Comparing congested trunk Route 12 with AI-optimized Senapati Bapat (SB) Road Bypass (Route 12B)
            </div>
          </div>

          <button className="btn btn-saffron" onClick={() => setIsModalOpen(true)}>
            <Play size={16} />
            <span>Open Dynamic Rerouting Simulator</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {/* Route 12 */}
          <div style={{ background: '#FEF2F2', border: '1px solid #F87171', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, color: '#DC2626', fontSize: '1rem' }}>Route 12 (Conventional)</span>
              <span className="badge badge-delayed">Congested</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#7F1D1D', marginBottom: '10px' }}>
              Pune Station ⇄ University Road via Sancheti Chowk Flyover Approach
            </p>
            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Trip Time:</strong> 38 minutes (Avg delay: +14 min)</div>
              <div><strong>Transit Speed:</strong> 14.8 km/h through bottleneck</div>
              <div><strong>Congestion Severity:</strong> 84% (Severe delay risk)</div>
            </div>
          </div>

          {/* Route 12B */}
          <div style={{ background: '#ECFDF5', border: '1px solid #34D399', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>Route 12B (AI Dynamic Bypass)</span>
              <span className="badge badge-ontime">Free Flow</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#064E3B', marginBottom: '10px' }}>
              Pune Station ⇄ University Road via Senapati Bapat (SB) Road
            </p>
            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Trip Time:</strong> 24 minutes (14 minutes faster!)</div>
              <div><strong>Transit Speed:</strong> 32.4 km/h clear corridor</div>
              <div><strong>Congestion Severity:</strong> 22% (Minimal resistance)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arterial Bottlenecks Table */}
      <div className="gov-card">
        <div className="card-header">
          <div className="card-title">
            <AlertTriangle size={18} color="var(--status-delayed)" />
            <span>Monitored Traffic Choke Points & Automated Bypass Corridors</span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Bottleneck Location</th>
                <th>Corridor Segment</th>
                <th>Severity</th>
                <th>Current Speed</th>
                <th>Normal Speed</th>
                <th>Speed Drop</th>
                <th>Root Cause</th>
                <th>AI Recommended Bypass Corridor</th>
                <th>Time Saved</th>
              </tr>
            </thead>
            <tbody>
              {traffic.bottlenecks.map(bn => (
                <tr key={bn.id}>
                  <td><strong>{bn.name}</strong></td>
                  <td>{bn.corridor}</td>
                  <td>
                    <span className={`badge ${bn.severity === 'CRITICAL' ? 'badge-critical' : bn.severity === 'HIGH' ? 'badge-delayed' : 'badge-warning'}`}>
                      {bn.severity}
                    </span>
                  </td>
                  <td><span style={{ color: '#DC2626', fontWeight: 700 }}>{bn.avgSpeed}</span></td>
                  <td>{bn.normalSpeed}</td>
                  <td><strong style={{ color: '#DC2626' }}>{bn.speedDrop}</strong></td>
                  <td style={{ fontSize: '0.78rem' }}>{bn.cause}</td>
                  <td><strong style={{ color: '#059669' }}>{bn.recommendedBypass}</strong></td>
                  <td><strong style={{ color: '#059669' }}>{bn.timeSavedViaBypass}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RerouteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        simulation={traffic.rerouteSimulation}
        onApplyReroute={() => approveRecommendation('REC-02')}
      />
    </div>
  );
};
