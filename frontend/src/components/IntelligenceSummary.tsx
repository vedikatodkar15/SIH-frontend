import React from 'react';
import { URBAN_INTELLIGENCE_SUMMARY } from '../data/mockData';
import { Activity, Zap, ShieldCheck, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const IntelligenceSummary: React.FC = () => {
  const { roadCondition, trafficCondition, infrastructure } = URBAN_INTELLIGENCE_SUMMARY;

  return (
    <div className="gov-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between'
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Urban Intelligence Summary
          </h2>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Real-time assessment aggregated across mobile sensors
          </div>
        </div>

        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: '#059669',
          backgroundColor: '#ECFDF5',
          padding: '2px 8px',
          borderRadius: '9999px',
          border: '1px solid #A7F3D0'
        }}>
          Live Edge Analysis
        </span>
      </div>

      {/* Body with simple progress bars matching Section 10 */}
      <div style={{
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        flex: 1
      }}>
        
        {/* 1. Road Condition */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={15} style={{ color: '#8B5CF6' }} />
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Road Condition</strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Normal: 72% • Moderate: 20% • Poor: 8%
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div style={{
            height: '10px',
            backgroundColor: '#E2E8F0',
            borderRadius: '9999px',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '6px'
          }}>
            <div style={{ width: `${roadCondition.normal}%`, backgroundColor: '#10B981' }} title={`Normal: ${roadCondition.normal}%`} />
            <div style={{ width: `${roadCondition.moderate}%`, backgroundColor: '#F59E0B' }} title={`Moderate: ${roadCondition.moderate}%`} />
            <div style={{ width: `${roadCondition.poor}%`, backgroundColor: '#EF4444' }} title={`Poor: ${roadCondition.poor}%`} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
              Normal (72%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
              Moderate (20%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              Poor (8%)
            </span>
          </div>
        </div>

        {/* 2. Traffic Condition */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={15} style={{ color: '#F59E0B' }} />
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Traffic Condition</strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Low: 45% • Moderate: 38% • High: 17%
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div style={{
            height: '10px',
            backgroundColor: '#E2E8F0',
            borderRadius: '9999px',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '6px'
          }}>
            <div style={{ width: `${trafficCondition.low}%`, backgroundColor: '#10B981' }} title={`Low Congestion: ${trafficCondition.low}%`} />
            <div style={{ width: `${trafficCondition.moderate}%`, backgroundColor: '#F59E0B' }} title={`Moderate: ${trafficCondition.moderate}%`} />
            <div style={{ width: `${trafficCondition.high}%`, backgroundColor: '#EF4444' }} title={`High Congestion: ${trafficCondition.high}%`} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
              Low (45%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
              Moderate (38%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              High (17%)
            </span>
          </div>
        </div>

        {/* 3. Infrastructure Condition */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={15} style={{ color: '#3B82F6' }} />
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Infrastructure Assessment</strong>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Good: 81% • Needs Inspection: 14% • Critical: 5%
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div style={{
            height: '10px',
            backgroundColor: '#E2E8F0',
            borderRadius: '9999px',
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '6px'
          }}>
            <div style={{ width: `${infrastructure.good}%`, backgroundColor: '#10B981' }} title={`Good: ${infrastructure.good}%`} />
            <div style={{ width: `${infrastructure.needsInspection}%`, backgroundColor: '#F59E0B' }} title={`Needs Inspection: ${infrastructure.needsInspection}%`} />
            <div style={{ width: `${infrastructure.critical}%`, backgroundColor: '#EF4444' }} title={`Critical: ${infrastructure.critical}%`} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
              Good (81%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
              Needs Inspection (14%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
              Critical (5%)
            </span>
          </div>
        </div>

        {/* Quick Corridor Health Cards */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Primary Corridor Speed Indices
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 10px',
            backgroundColor: 'var(--bg-surface-alt)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px'
          }}>
            <span>Shivaji Nagar Corridor</span>
            <strong style={{ color: '#059669' }}>31 km/h (Normal)</strong>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 10px',
            backgroundColor: 'var(--bg-surface-alt)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px'
          }}>
            <span>Sancheti Chowk Flyover</span>
            <strong style={{ color: '#DC2626' }}>9 km/h (Congested)</strong>
          </div>
        </div>

      </div>
    </div>
  );
};
