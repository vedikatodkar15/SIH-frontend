import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  RefreshCw, 
  Radio, 
  MapPin, 
  Layers, 
  Clock, 
  Database, 
  Sparkles, 
  Zap, 
  Map, 
  BusFront, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface DashboardHeaderProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  timePeriod: string;
  setTimePeriod: (period: string) => void;
  lastUpdated: string;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onRefresh: () => void;
  onDeployStandby: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedCity,
  setSelectedCity,
  selectedZone,
  setSelectedZone,
  timePeriod,
  setTimePeriod,
  lastUpdated,
  isSimulating,
  onToggleSimulation,
  onRefresh,
  onDeployStandby
}) => {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div className="dashboard-header-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. TOP COMMAND CENTER OPERATIONAL SUMMARY BANNER (Section 13) */}
      <div style={{
        backgroundColor: '#0A2540',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 22px',
        color: '#FFFFFF',
        boxShadow: '0 4px 16px rgba(10, 37, 64, 0.12)',
        border: '1px solid #1E3A8A',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '320px',
          height: '100%',
          background: 'radial-gradient(circle at top right, rgba(29, 78, 216, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                {t('commandCenter')}
              </h1>

              {/* Status Indicator */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                color: '#A7F3D0',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                <span>{t('normalOperations')}</span>
              </div>
            </div>
            <div style={{ fontSize: '11.5px', color: '#93C5FD', marginTop: '2px' }}>
              {t('commandSub')}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Live Telemetry Status Pill */}
            <button
              onClick={onToggleSimulation}
              style={{
                height: '30px',
                padding: '0 10px',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                border: isSimulating ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.2)',
                backgroundColor: isSimulating ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.08)',
                color: isSimulating ? '#A7F3D0' : '#E2E8F0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Radio size={12} style={{ color: isSimulating ? '#10B981' : '#94A3B8' }} />
              <span>{isSimulating ? 'Live Telemetry Active' : 'Feed Paused'}</span>
            </button>

            <button
              onClick={onRefresh}
              style={{
                height: '30px',
                padding: '0 10px',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Trigger Central Sync"
            >
              <RefreshCw size={12} />
              <span>Sync Fleet</span>
            </button>
          </div>
        </div>

        {/* AI Operational Recommendation Callout Strip */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', maxWidth: '850px' }}>
            <Sparkles size={18} style={{ color: '#FBBF24', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {t('aiDispatchTitle')}
              </div>
              <div style={{ fontSize: '12.5px', color: '#FFFFFF', lineHeight: 1.4, marginTop: '2px' }}>
                {t('aiDispatchText')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onDeployStandby}
              style={{
                backgroundColor: '#1D4ED8',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
            >
              <Zap size={14} />
              <span>{t('deployStandby')}</span>
            </button>

            <button
              onClick={() => navigate('/map')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
            >
              <Map size={14} />
              <span>{t('exploreGis')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. QUICK ACTIONS SECTION (Section 14) */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '12px 18px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {t('quickActions')}:
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {/* Track Bus */}
          <button
            onClick={() => navigate('/fleet')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gov-blue)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <BusFront size={13} style={{ color: 'var(--gov-blue)' }} />
            <span>{t('trackBus')}</span>
          </button>

          {/* View GIS Map */}
          <button
            onClick={() => navigate('/map')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gov-blue)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <Map size={13} style={{ color: '#059669' }} />
            <span>{t('viewMap')}</span>
          </button>

          {/* View Alerts */}
          <button
            onClick={() => navigate('/alerts')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gov-blue)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <AlertTriangle size={13} style={{ color: '#DC2626' }} />
            <span>{t('viewAlerts')}</span>
          </button>

          {/* Check Demand */}
          <button
            onClick={() => navigate('/demand')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gov-blue)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <TrendingUp size={13} style={{ color: '#7C3AED' }} />
            <span>{t('checkDemand')}</span>
          </button>

          {/* Generate Report */}
          <button
            onClick={() => navigate('/reports')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gov-blue)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            <FileText size={13} style={{ color: '#0284C7' }} />
            <span>{t('generateReport')}</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default DashboardHeader;
