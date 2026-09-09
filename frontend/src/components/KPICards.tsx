import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatNumber, formatPercent } from '../utils/formatters';
import { 
  BusFront, 
  Activity, 
  Clock, 
  AlertTriangle, 
  Users, 
  Wrench, 
  Building2, 
  Zap,
  TrendingUp, 
  TrendingDown,
  ArrowRight
} from 'lucide-react';

interface KPICardItemProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  badgeBg: string;
  badgeColor: string;
  trendText: string;
  trendPositive: boolean;
  onViewDetails?: () => void;
  viewDetailsLabel: string;
}

const KPICardItem: React.FC<KPICardItemProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badgeBg,
  badgeColor,
  trendText,
  trendPositive,
  onViewDetails,
  viewDetailsLabel
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
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
    }}
    >
      {/* Top row: Circular Icon Badge + Trend Pill */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
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
          padding: '2px 8px',
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
        marginBottom: '2px'
      }}>
        {value}
      </div>

      {/* Label */}
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: 'var(--text-secondary)',
        lineHeight: 1.25,
        marginBottom: '4px'
      }}>
        {label}
      </div>

      {/* Supporting text */}
      <div style={{
        fontSize: '11px',
        color: 'var(--text-muted)',
        lineHeight: 1.3,
        marginBottom: '12px'
      }}>
        {subtext}
      </div>

      {/* View Details Action Link */}
      {onViewDetails && (
        <div 
          onClick={onViewDetails}
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--gov-blue)',
            cursor: 'pointer'
          }}
        >
          <span>{viewDetailsLabel}</span>
          <ArrowRight size={12} />
        </div>
      )}
    </div>
  );
};

export const KPICards: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, buses, alerts, demand } = useApp();

  const totalBuses = 1250;
  const activeCount = buses.filter(b => b.status !== 'Offline' && b.status !== 'Maintenance').length || 1087;
  const onTimeCount = buses.filter(b => b.status === 'On Time').length || 942;
  const delayedCount = buses.filter(b => b.status === 'Delayed').length || 145;
  const criticalCount = alerts.filter(a => a.status !== 'Resolved').length || 7;
  const maintenanceCount = 112;

  const onTimePercent = Math.round((onTimeCount / (onTimeCount + delayedCount || 1)) * 100);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px'
    }}>
      {/* 1. Total Fleet */}
      <KPICardItem
        label={t('totalFleet')}
        value={formatNumber(totalBuses, language)}
        subtext={t('totalFleetSub')}
        icon={BusFront}
        badgeBg="#EFF6FF"
        badgeColor="#1D4ED8"
        trendText="+3.2%"
        trendPositive={true}
        onViewDetails={() => navigate('/fleet')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 2. Active Buses */}
      <KPICardItem
        label={t('activeBuses')}
        value={formatNumber(activeCount, language)}
        subtext={t('activeBusesSub')}
        icon={Activity}
        badgeBg="#ECFDF5"
        badgeColor="#059669"
        trendText="+4.35%"
        trendPositive={true}
        onViewDetails={() => navigate('/fleet')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 3. On-Time Buses */}
      <KPICardItem
        label={t('onTimeBuses')}
        value={`${formatPercent(onTimePercent, language)} (${formatNumber(onTimeCount, language)})`}
        subtext={t('onTimeBusesSub')}
        icon={Clock}
        badgeBg="#F0FDF4"
        badgeColor="#16A34A"
        trendText="+2.59%"
        trendPositive={true}
        onViewDetails={() => navigate('/traffic')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 4. Delayed Buses */}
      <KPICardItem
        label={t('delayedBuses')}
        value={formatNumber(delayedCount, language)}
        subtext={t('delayedBusesSub')}
        icon={Clock}
        badgeBg="#FFFBEB"
        badgeColor="#D97706"
        trendText="-0.95%"
        trendPositive={true}
        onViewDetails={() => navigate('/traffic')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 5. Critical Alerts */}
      <KPICardItem
        label={t('criticalAlerts')}
        value={formatNumber(criticalCount, language)}
        subtext={t('criticalAlertsSub')}
        icon={AlertTriangle}
        badgeBg="#FEF2F2"
        badgeColor="#DC2626"
        trendText="-2 active"
        trendPositive={true}
        onViewDetails={() => navigate('/alerts')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 6. Passenger Demand */}
      <KPICardItem
        label={t('passengerDemand')}
        value={`${demand?.summary?.index || 88}%`}
        subtext={`${formatNumber(demand?.summary?.totalWaitingPassengers || 24860, language)} ${t('unitsPassengers')}`}
        icon={Users}
        badgeBg="#F5F3FF"
        badgeColor="#7C3AED"
        trendText="+12% surge"
        trendPositive={false}
        onViewDetails={() => navigate('/demand')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 7. Buses in Depot Maintenance */}
      <KPICardItem
        label={t('maintenanceBuses')}
        value={formatNumber(maintenanceCount, language)}
        subtext={t('maintenanceBusesSub')}
        icon={Wrench}
        badgeBg="#F8FAFC"
        badgeColor="#475569"
        trendText="Optimal"
        trendPositive={true}
        onViewDetails={() => navigate('/fleet')}
        viewDetailsLabel={t('viewDetails')}
      />

      {/* 8. Depot Utilization */}
      <KPICardItem
        label={t('depotUtilization')}
        value="84.2%"
        subtext={t('depotUtilizationSub')}
        icon={Building2}
        badgeBg="#F0F9FF"
        badgeColor="#0284C7"
        trendText="8 Depots"
        trendPositive={true}
        onViewDetails={() => navigate('/map')}
        viewDetailsLabel={t('viewDetails')}
      />
    </div>
  );
};

export default KPICards;
