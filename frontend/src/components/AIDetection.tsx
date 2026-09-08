import React from 'react';
import { AI_DETECTION_CATEGORIES } from '../data/mockData';
import { Activity, Zap, ShieldAlert, AlertOctagon, Layers, Sparkles } from 'lucide-react';
import { AIDetectionCategory } from '../types';

interface AIDetectionProps {
  onSelectCategory?: (type: string) => void;
  activeCategory?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Activity,
  Zap,
  ShieldAlert,
  AlertOctagon,
  Layers
};

export const AIDetection: React.FC<AIDetectionProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  return (
    <div className="gov-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      overflow: 'hidden'
    }}>
      {/* Header with simple AI explanation */}
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
            <Sparkles size={16} style={{ color: 'var(--gov-blue)' }} />
            <h2 style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              AI-Based Detection
            </h2>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              backgroundColor: '#F5F3FF',
              color: '#7C3AED',
              padding: '2px 8px',
              borderRadius: '9999px',
              border: '1px solid #DDD6FE'
            }}>
              AI-assisted detection
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>
            Onboard vehicle computer-vision and accelerometer inference models classify road anomalies in real time without manual reporting.
          </div>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Click any card to highlight on GIS map
        </div>
      </div>

      {/* 5 AI Detection Cards matching Section 11 */}
      <div style={{
        padding: '16px 18px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        {AI_DETECTION_CATEGORIES.map((cat: AIDetectionCategory) => {
          const IconComponent = iconMap[cat.icon] || Activity;
          const isSelected = activeCategory === (cat.type === 'pothole' ? 'roads' : cat.type);

          let badgeBg = '#ECFDF5';
          let badgeColor = '#059669';
          let cardBorder = 'var(--border-color)';

          if (cat.severity === 'critical') {
            badgeBg = '#FEF2F2';
            badgeColor = '#DC2626';
          } else if (cat.severity === 'high') {
            badgeBg = '#FFFBEB';
            badgeColor = '#D97706';
          } else if (cat.severity === 'medium') {
            badgeBg = '#EFF6FF';
            badgeColor = '#2563EB';
          } else {
            badgeBg = '#F1F5F9';
            badgeColor = '#475569';
          }

          return (
            <div
              key={cat.id}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(cat.type === 'pothole' ? 'roads' : cat.type);
                }
              }}
              style={{
                backgroundColor: isSelected ? 'var(--bg-surface-alt)' : 'var(--bg-surface)',
                border: isSelected ? '2px solid var(--gov-blue)' : `1px solid ${cardBorder}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                boxShadow: isSelected ? '0 0 0 2px rgba(29, 78, 216, 0.15)' : 'none'
              }}
            >
              {/* Top: Icon + Severity Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: badgeBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComponent size={16} style={{ color: badgeColor }} />
                </div>

                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: badgeBg,
                  color: badgeColor,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>
                  {cat.severity} Severity
                </span>
              </div>

              {/* Middle: Name & Count */}
              <div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  fontFamily: 'monospace'
                }}>
                  {cat.count < 10 ? `0${cat.count}` : cat.count} detected
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {cat.name}
                </div>
              </div>

              {/* Bottom: Sensor + AI label */}
              <div style={{
                paddingTop: '8px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '10px',
                color: 'var(--text-muted)'
              }}>
                <span>{cat.primarySensor}</span>
                <span style={{ fontWeight: 600, color: 'var(--gov-blue)' }}>
                  AI-assisted detection
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
