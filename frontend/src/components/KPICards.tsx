import React from 'react';
import { 
  BusFront, 
  Database, 
  Activity, 
  AlertTriangle, 
  AlertOctagon, 
  MapPin,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface KPICardItemProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  badgeBg: string;
  badgeColor: string;
  trendText: string;
  trendPositive: boolean;
}

const KPICardItem: React.FC<KPICardItemProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badgeBg,
  badgeColor,
  trendText,
  trendPositive
}) => {
  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 18px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      minWidth: 0,
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    }}>
      {/* Top row: Icon Badge + Trend Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: badgeBg,
          color: badgeColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={20} style={{ color: badgeColor }} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          fontSize: '11px',
          fontWeight: 700,
          color: trendPositive ? '#059669' : '#DC2626',
          backgroundColor: trendPositive ? '#ECFDF5' : '#FEF2F2',
          padding: '2px 7px',
          borderRadius: '9999px',
          border: `1px solid ${trendPositive ? '#A7F3D0' : '#FECACA'}`
        }}>
          {trendPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>{trendText}</span>
        </div>
      </div>

      {/* Value */}
      <div style={{
        fontSize: '24px',
        fontWeight: 800,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
        marginBottom: '4px'
      }}>
        {value}
      </div>

      {/* Label */}
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: '3px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {label}
      </div>

      {/* Supporting small info */}
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {subtext}
      </div>
    </div>
  );
};

interface KPICardsProps {
  activeVehicles?: number;
  dataPointsToday?: string | number;
  roadConditionPercent?: string;
  activeAlertsCount?: string | number;
  issuesDetectedCount?: number;
  coverageKm?: string;
}

export const KPICards: React.FC<KPICardsProps> = ({
  activeVehicles = 128,
  dataPointsToday = "24,860",
  roadConditionPercent = "94% Normal",
  activeAlertsCount = "07",
  issuesDetectedCount = 36,
  coverageKm = "82 km"
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '14px'
    }}>
      {/* 1. Active Vehicles */}
      <KPICardItem
        label="Active Vehicles"
        value={activeVehicles}
        subtext="Vehicles currently contributing data"
        icon={BusFront}
        badgeBg="#ECFDF5"
        badgeColor="#10B981"
        trendText="0.43% ↑"
        trendPositive={true}
      />

      {/* 2. Data Points Collected */}
      <KPICardItem
        label="Data Points Collected"
        value={dataPointsToday}
        subtext="Today"
        icon={Database}
        badgeBg="#FFFBEB"
        badgeColor="#F59E0B"
        trendText="4.35% ↑"
        trendPositive={true}
      />

      {/* 3. Road Conditions */}
      <KPICardItem
        label="Road Conditions"
        value={roadConditionPercent}
        subtext="Current assessment"
        icon={Activity}
        badgeBg="#F5F3FF"
        badgeColor="#8B5CF6"
        trendText="2.59% ↑"
        trendPositive={true}
      />

      {/* 4. Active Alerts */}
      <KPICardItem
        label="Active Alerts"
        value={activeAlertsCount}
        subtext="Require attention"
        icon={AlertTriangle}
        badgeBg="#EFF6FF"
        badgeColor="#3B82F6"
        trendText="-0.96% ↓"
        trendPositive={true}
      />

      {/* 5. Issues Detected */}
      <KPICardItem
        label="Issues Detected"
        value={issuesDetectedCount}
        subtext="Today"
        icon={AlertOctagon}
        badgeBg="#FEF2F2"
        badgeColor="#EF4444"
        trendText="3.12% ↑"
        trendPositive={false}
      />

      {/* 6. Coverage */}
      <KPICardItem
        label="Coverage"
        value={coverageKm}
        subtext="Monitored routes"
        icon={MapPin}
        badgeBg="#ECFEFF"
        badgeColor="#06B6D4"
        trendText="1.85% ↑"
        trendPositive={true}
      />
    </div>
  );
};
