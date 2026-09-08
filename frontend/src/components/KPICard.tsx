import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  variant?: 'ontime' | 'delayed' | 'critical' | 'warning' | 'purple' | 'blue' | 'default';
  colorTheme?: 'green' | 'orange' | 'purple' | 'blue';
  trendText?: string;
  trendPositive?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'default',
  colorTheme,
  trendText,
  trendPositive
}) => {
  // Determine color theme for NextAdmin circular icon badge
  let themeClass = 'icon-blue';
  if (colorTheme) {
    themeClass = `icon-${colorTheme}`;
  } else if (variant === 'ontime') {
    themeClass = 'icon-green';
  } else if (variant === 'warning') {
    themeClass = 'icon-orange';
  } else if (variant === 'purple') {
    themeClass = 'icon-purple';
  } else if (variant === 'delayed' || variant === 'critical') {
    themeClass = 'icon-orange';
  }

  return (
    <div className={`nextadmin-kpi-card kpi-${variant}`}>
      <div className={`kpi-circle-icon ${themeClass}`}>
        <Icon size={20} strokeWidth={2.2} />
      </div>
      <div className="kpi-main-metric">
        <div className="kpi-number-row">
          <span className="kpi-number">{value}</span>
          {trendText && (
            <span className={`kpi-trend-badge ${trendPositive === false ? 'trend-negative' : 'trend-positive'}`}>
              {trendText}
            </span>
          )}
        </div>
        <span className="kpi-title-label">{label}</span>
        <span className="kpi-sub-hint">{subtext}</span>
      </div>
    </div>
  );
};

