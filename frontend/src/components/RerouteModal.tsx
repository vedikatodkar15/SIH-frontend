import React, { useState } from 'react';
import { RerouteSimulation } from '../types';
import { X, ArrowRight, CheckCircle2, Route as RouteIcon, AlertTriangle, Leaf, Clock } from 'lucide-react';

interface RerouteModalProps {
  simulation: RerouteSimulation;
  isOpen: boolean;
  onClose: () => void;
  onApplyReroute: () => void;
}

export const RerouteModal: React.FC<RerouteModalProps> = ({
  simulation,
  isOpen,
  onClose,
  onApplyReroute
}) => {
  const [applied, setApplied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleApply = () => {
    setApplied(true);
    onApplyReroute();
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  const { originalRoute, dynamicBypassRoute, differential } = simulation;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div className="modal-title">
            <RouteIcon size={20} color="#FBBF24" />
            <span>AI Dynamic Corridor Rerouting Simulation</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Simulating algorithmic diversion for <strong>Route 12</strong> around the <strong>Sancheti Chowk</strong> congestion bottleneck using Senapati Bapat (SB) Road Bypass:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Current Route */}
            <div style={{
              border: '2px solid #FCA5A5',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              backgroundColor: '#FEF2F2'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#DC2626', fontWeight: 700, marginBottom: '8px' }}>
                <AlertTriangle size={16} />
                <span>ORIGINAL CORRIDOR (R-12)</span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#991B1B', marginBottom: '10px' }}>
                {originalRoute.name}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                <li><strong>Distance:</strong> {originalRoute.distance}</li>
                <li><strong>Estimated Travel Time:</strong> <span style={{ color: '#DC2626', fontWeight: 700 }}>{originalRoute.estimatedTravelTime}</span></li>
                <li><strong>Congestion Severity:</strong> {originalRoute.congestionLevel}</li>
                <li><strong>Avg Transit Speed:</strong> {originalRoute.avgSpeed}</li>
                <li><strong>CO₂ Emissions:</strong> {originalRoute.co2Emission}</li>
                <li><strong>Congestion Risk Index:</strong> {originalRoute.riskScore}/100</li>
              </ul>
            </div>

            {/* AI Dynamic Bypass */}
            <div style={{
              border: '2px solid #6EE7B7',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              backgroundColor: '#ECFDF5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, marginBottom: '8px' }}>
                <CheckCircle2 size={16} />
                <span>AI DYNAMIC BYPASS (R-12B)</span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#065F46', marginBottom: '10px' }}>
                {dynamicBypassRoute.name}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                <li><strong>Distance:</strong> {dynamicBypassRoute.distance}</li>
                <li><strong>Estimated Travel Time:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{dynamicBypassRoute.estimatedTravelTime}</span></li>
                <li><strong>Congestion Severity:</strong> {dynamicBypassRoute.congestionLevel}</li>
                <li><strong>Avg Transit Speed:</strong> {dynamicBypassRoute.avgSpeed}</li>
                <li><strong>CO₂ Emissions:</strong> {dynamicBypassRoute.co2Emission}</li>
                <li><strong>Congestion Risk Index:</strong> {dynamicBypassRoute.riskScore}/100</li>
              </ul>
            </div>
          </div>

          {/* Benefit Differential Grid */}
          <div style={{
            background: 'var(--bg-surface-alt)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '10px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
              Projected Operational Optimization:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
              <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <Clock size={16} color="#059669" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Time Saved</div>
                <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.9rem' }}>{differential.travelTimeSaved}</div>
              </div>
              <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <RouteIcon size={16} color="#2563EB" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Punctuality Gain</div>
                <div style={{ fontWeight: 800, color: '#2563EB', fontSize: '0.9rem' }}>{differential.punctualityGain}</div>
              </div>
              <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <Leaf size={16} color="#10B981" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CO₂ Conserved</div>
                <div style={{ fontWeight: 800, color: '#10B981', fontSize: '0.9rem' }}>{differential.fuelCo2Saved}</div>
              </div>
              <div style={{ padding: '8px', background: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                <CheckCircle2 size={16} color="#D97706" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Commuter CSAT</div>
                <div style={{ fontWeight: 800, color: '#D97706', fontSize: '0.9rem' }}>{differential.commuterSatisfaction}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          {applied ? (
            <button className="btn btn-primary" disabled style={{ backgroundColor: '#059669' }}>
              <CheckCircle2 size={16} />
              <span>Corridor Reroute Applied to Fleet Telemetry!</span>
            </button>
          ) : (
            <button className="btn btn-saffron" onClick={handleApply}>
              <span>Confirm & Push Reroute to Active Fleet</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
