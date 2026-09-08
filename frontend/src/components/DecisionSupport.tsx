import React, { useState } from 'react';
import { DECISION_RECOMMENDATIONS } from '../data/mockData';
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Building, AlertCircle } from 'lucide-react';
import { DecisionRecommendation } from '../types';

export const DecisionSupport: React.FC = () => {
  const [recommendations, setRecommendations] = useState<DecisionRecommendation[]>(DECISION_RECOMMENDATIONS);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (id: string, actionName: string) => {
    setRecommendations(prev => prev.map(rec => {
      if (rec.id === id) {
        return { ...rec, status: 'Dispatched' };
      }
      return rec;
    }));

    setActionFeedback(`Operational directive issued: "${actionName}" for administrative follow-up.`);
    setTimeout(() => {
      setActionFeedback(null);
    }, 4000);
  };

  return (
    <div className="gov-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      overflow: 'hidden'
    }}>
      {/* Header matching Section 13 */}
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
            <ShieldCheck size={17} style={{ color: 'var(--gov-blue)' }} />
            <h2 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Recommended Actions
            </h2>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              backgroundColor: '#EFF6FF',
              color: 'var(--gov-blue)',
              padding: '2px 8px',
              borderRadius: '9999px',
              border: '1px solid #BFDBFE'
            }}>
              AI-assisted recommendation
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Operational priorities synthesized for municipal civil departments and transport authorities
          </div>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Advisory only • Final authority remains with executive officers
        </div>
      </div>

      {/* Action Feedback Banner */}
      {actionFeedback && (
        <div style={{
          backgroundColor: '#ECFDF5',
          borderBottom: '1px solid #A7F3D0',
          padding: '8px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          color: '#065F46',
          fontWeight: 600
        }}>
          <CheckCircle2 size={15} style={{ color: '#10B981' }} />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* 3 Numbered Recommendation Cards matching Section 13 */}
      <div style={{
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {recommendations.map(rec => {
          const isDispatched = rec.status === 'Dispatched';

          return (
            <div
              key={rec.id}
              style={{
                backgroundColor: isDispatched ? '#F0FDF4' : 'var(--bg-surface-alt)',
                border: `1px solid ${isDispatched ? '#A7F3D0' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              {/* Left Column: Number & Content */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '240px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isDispatched ? '#10B981' : 'var(--gov-blue)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {rec.order}
                </div>

                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {rec.title}
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    lineHeight: 1.4
                  }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Reason: </strong>
                    <span>{rec.reason}</span>
                  </div>

                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <span><strong>Location:</strong> {rec.location}</span>
                    <span>•</span>
                    <span><strong>Corroborated by:</strong> {rec.detectingVehiclesCount} public transport units</span>
                    <span>•</span>
                    <span style={{ color: 'var(--gov-blue)', fontWeight: 600 }}>
                      AI-assisted recommendation
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Action Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleAction(rec.id, rec.suggestedAction)}
                  disabled={isDispatched}
                  style={{
                    height: '32px',
                    padding: '0 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: 'var(--radius-sm)',
                    border: isDispatched ? '1px solid #10B981' : 'none',
                    backgroundColor: isDispatched ? '#ECFDF5' : 'var(--gov-blue)',
                    color: isDispatched ? '#065F46' : '#FFFFFF',
                    cursor: isDispatched ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                    boxShadow: isDispatched ? 'none' : '0 1px 2px rgba(29, 78, 216, 0.2)'
                  }}
                >
                  {isDispatched ? (
                    <>
                      <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                      <span>Work Order Dispatched</span>
                    </>
                  ) : (
                    <>
                      <span>{rec.actionLabel}</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
