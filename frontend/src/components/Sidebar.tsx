import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BusFront, 
  Map, 
  Sparkles, 
  TrendingUp, 
  Route as RouteIcon, 
  AlertTriangle, 
  Users, 
  FileText, 
  Server, 
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t, buses, alerts, recommendations } = useApp();
  const { user } = useAuth();

  const unresolvedAlertsCount = alerts.filter(a => a.status === 'Active' || a.status === 'Unresolved').length;
  const pendingRecsCount = recommendations.filter(r => r.status === 'PENDING_APPROVAL').length;
  const activeBusesCount = buses.filter(b => b.status !== 'Offline' && b.status !== 'Maintenance').length;

  const mainMonitoringItems = [
    { path: '/', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/fleet', label: t('liveFleet'), icon: BusFront, badge: activeBusesCount || 128, badgeType: 'fleet' },
    { path: '/map', label: t('gisMap'), icon: Map, badgeText: 'Live' },
    { path: '/traffic', label: t('trafficRoutes'), icon: RouteIcon },
    { path: '/alerts', label: t('alertsIncidents'), icon: AlertTriangle, badge: unresolvedAlertsCount > 0 ? unresolvedAlertsCount : 7, badgeType: 'alert' }
  ];

  const intelligenceItems = [
    { path: '/analytics', label: t('aiAnalytics'), icon: Sparkles, badge: pendingRecsCount > 0 ? pendingRecsCount : undefined, badgeType: 'alert' },
    { path: '/demand', label: t('demandPred'), icon: TrendingUp },
    { path: '/passenger', label: t('passengerInfo'), icon: Users },
    { path: '/reports', label: t('reports'), icon: FileText },
    { path: '/apis', label: t('dataApis'), icon: Server },
    { path: '/admin', label: t('administration'), icon: ShieldCheck }
  ];

  return (
    <aside className="app-sidebar" aria-label="Portal Navigation">
      <div className="sidebar-nav-list">
        <div style={{
          fontSize: '10.5px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          padding: '8px 12px 4px',
          textTransform: 'uppercase'
        }}>
          {t('mainMonitoring')}
        </div>
        {mainMonitoringItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              end={item.path === '/'}
            >
              <div className="nav-link-content">
                <Icon size={17} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`nav-counter-badge ${item.badgeType === 'alert' ? 'badge-alert' : 'badge-fleet'}`}>
                  {item.badge}
                </span>
              )}
              {item.badgeText && (
                <span className="nav-counter-badge badge-fleet" style={{ fontSize: '10px' }}>
                  {item.badgeText}
                </span>
              )}
            </NavLink>
          );
        })}

        <div style={{
          fontSize: '10.5px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          padding: '16px 12px 4px',
          textTransform: 'uppercase'
        }}>
          {t('intelligenceSystem')}
        </div>
        {intelligenceItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              <div className="nav-link-content">
                <Icon size={17} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`nav-counter-badge ${item.badgeType === 'alert' ? 'badge-alert' : 'badge-fleet'}`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
