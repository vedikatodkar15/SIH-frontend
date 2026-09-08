import React from 'react';
import { AIRecommendation } from '../types';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface XAIExplanationCardProps {
  recommendation: AIRecommendation;
  onApprove: (id: string) => void;
}

export const XAIExplanationCard: React.FC<XAIExplanationCardProps> = ({
  recommendation,
  onApprove
}) => {
  const isApproved = recommendation.status === 'APPROVED';

  return (
    <div className="xai-card" aria-label="Explainable AI Decision Details">
      <div className="xai-header">
        <div className="xai-title">
          <Sparkles size={22} color="#FBBF24" />
          <span>{recommendation.title}</span>
        </div>
        <div className="xai-confidence-pill">
          AI Confidence: {recommendation.confidenceScore}% (LSTM-GRU Ensemble)
        </div>
      </div>

      <div style={{ marginBottom: '14px', fontSize: '0.88rem', color: '#E2E8F0' }}>
        <strong>Transparent AI Logic Chain:</strong> The Autonomous Decision Engine evaluated real-time AFC tap-in velocity, onboard load sensors, and computer-vision traffic feeds:
      </div>

      {/* 4-Step Logic Grid */}
      <div className="xai-steps-grid">
        {recommendation.explanationSteps.map((step) => (
          <div key={step.step} className="xai-step-box">
            <div className="xai-step-badge">STEP {step.step}</div>
            <div className="xai-step-heading">{step.title}</div>
            <div className="xai-step-desc">{step.evidence}</div>
          </div>
        ))}
      </div>

      <div className="xai-footer">
        <div className="xai-impact-statement">
          <strong>Expected Impact:</strong> {recommendation.impact.travelTimeReduction || ''} • {recommendation.impact.passengerWaitTimeSavings || recommendation.impact.carbonAvoided || ''}
        </div>

        <div>
          {isApproved ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', fontWeight: 700, fontSize: '0.88rem' }}>
              <CheckCircle2 size={18} />
              <span>APPROVED & DISPATCHED {recommendation.approvedAt ? `(${recommendation.approvedAt})` : ''}</span>
            </div>
          ) : (
            <button 
              className="btn btn-saffron"
              onClick={() => onApprove(recommendation.id)}
            >
              <ShieldCheck size={16} />
              <span>Approve & Dispatch Standby Fleet</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
