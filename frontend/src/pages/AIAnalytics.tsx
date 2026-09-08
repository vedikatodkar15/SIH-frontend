import React from 'react';
import { useApp } from '../context/AppContext';
import { XAIExplanationCard } from '../components/XAIExplanationCard';
import { 
  Sparkles, 
  Clock, 
  Users, 
  Route as RouteIcon, 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck,
  Zap
} from 'lucide-react';

export const AIAnalytics: React.FC = () => {
  const { recommendations, approveRecommendation, t } = useApp();

  return (
    <div>
      {/* Top Banner */}
      <div className="gov-card" style={{ padding: '20px', marginBottom: '24px', background: 'linear-gradient(135deg, #0A2540 0%, #173860 100%)', color: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Cpu size={28} color="#FBBF24" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            Autonomous Transport Decision & Explainability Engine
          </h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#CBD5E1', maxWidth: '850px' }}>
          Real-time integration of LSTM-GRU predictive neural models, smart ticketing (AFC) tap-in velocity, and computer-vision arterial traffic sensors for proactive municipal fleet optimization.
        </p>
      </div>

      {/* 4 AI Core Pillars */}
      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '14px' }}>
        1. Real-Time Predictive Intelligence Pillars
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {/* Pillar 1: Delay Prediction */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '4px solid var(--status-delayed)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Clock size={20} color="var(--status-delayed)" />
            <strong style={{ fontSize: '0.92rem', color: 'var(--gov-navy)' }}>Delay Prediction</strong>
          </div>
          <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Target Corridor:</strong> Route 12 (Sancheti Chowk)</div>
            <div><strong>Current Delay:</strong> 8 min ➔ <strong>Projected:</strong> <span style={{ color: '#DC2626', fontWeight: 700 }}>14 min</span></div>
            <div><strong>Confidence:</strong> 94.2% (LSTM-GRU Flow v3.2)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Primary trigger: Narrowing at Sancheti flyover approach.
            </div>
          </div>
        </div>

        {/* Pillar 2: Demand Prediction */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '4px solid #2563EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Users size={20} color="#2563EB" />
            <strong style={{ fontSize: '0.92rem', color: 'var(--gov-navy)' }}>Demand Surge Prediction</strong>
          </div>
          <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Hotspot:</strong> SPPU University Road Gate</div>
            <div><strong>Projected Surge:</strong> <span style={{ color: '#2563EB', fontWeight: 700 }}>+39.3%</span> (850 pax)</div>
            <div><strong>Peak Window:</strong> 17:30 - 19:45 IST</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Deficit: 2 buses needed to maintain 5-min headway.
            </div>
          </div>
        </div>

        {/* Pillar 3: Traffic Congestion */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '4px solid #D97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <RouteIcon size={20} color="#D97706" />
            <strong style={{ fontSize: '0.92rem', color: 'var(--gov-navy)' }}>Congestion Forecasting</strong>
          </div>
          <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Corridor:</strong> Sancheti Chowk Junction</div>
            <div><strong>Congestion Index:</strong> <span style={{ color: '#D97706', fontWeight: 700 }}>84%</span></div>
            <div><strong>Projected Speed:</strong> 11 km/h (Normal: 35 km/h)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              AI recommends Route 12B Senapati Bapat Rd bypass.
            </div>
          </div>
        </div>

        {/* Pillar 4: Predictive Maintenance */}
        <div className="gov-card" style={{ padding: '16px', borderTop: '4px solid #7C3AED' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Wrench size={20} color="#7C3AED" />
            <strong style={{ fontSize: '0.92rem', color: 'var(--gov-navy)' }}>Predictive Maintenance</strong>
          </div>
          <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Asset:</strong> BUS-1024 (MH-12-RN-4024)</div>
            <div><strong>Component:</strong> Regenerative Brake & Inverter</div>
            <div><strong>Risk Score:</strong> <span style={{ color: '#7C3AED', fontWeight: 700 }}>68/100 (Medium)</span></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Brake thermal threshold +12% over 72h operational baseline.
            </div>
          </div>
        </div>
      </div>

      {/* Explainable AI Decision Cards */}
      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '14px' }}>
        2. Active Autonomous Recommendations (Explainable AI - XAI)
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {recommendations.map(rec => (
          <XAIExplanationCard 
            key={rec.id}
            recommendation={rec}
            onApprove={approveRecommendation}
          />
        ))}
      </div>
    </div>
  );
};
