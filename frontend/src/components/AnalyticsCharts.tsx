import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useApp } from '../context/AppContext';
import { formatNumber, formatPercent } from '../utils/formatters';
import { TrendingUp, Activity, Zap, ChevronDown, Calendar, ShieldCheck, BusFront, BatteryCharging } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsCharts: React.FC = () => {
  const { t, language } = useApp();
  const [telemetryPeriod, setTelemetryPeriod] = useState<string>('Monthly');
  const [corridorPeriod, setCorridorPeriod] = useState<string>('This Week');

  // 1. Dual Area Chart (NextAdmin "Payments Overview" style)
  const lineLabels = telemetryPeriod === 'Monthly' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : telemetryPeriod === 'Weekly'
    ? [t('daysMon'), t('daysTue'), t('daysWed'), t('daysThu'), t('daysFri'), t('daysSat'), t('daysSun')]
    : ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'];

  const linePackets = telemetryPeriod === 'Monthly'
    ? [18, 26, 32, 44, 38, 56, 68, 72, 85, 92, 78, 64]
    : telemetryPeriod === 'Weekly'
    ? [42, 58, 64, 78, 85, 92, 88]
    : [22, 45, 82, 76, 58, 69, 94, 88, 54, 31];

  const lineDefects = telemetryPeriod === 'Monthly'
    ? [12, 18, 22, 28, 24, 35, 42, 40, 52, 58, 48, 36]
    : telemetryPeriod === 'Weekly'
    ? [18, 24, 32, 38, 42, 36, 28]
    : [14, 28, 46, 38, 26, 34, 52, 44, 25, 12];

  const telemetryLineData = {
    labels: lineLabels,
    datasets: [
      {
        label: t('telemetryPackets'),
        data: linePackets,
        borderColor: '#3B82F6',
        backgroundColor: (context: any) => {
          const ctx = context.chart?.ctx;
          if (!ctx) return 'rgba(59, 130, 246, 0.2)';
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');
          return gradient;
        },
        fill: true,
        tension: 0.45,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#3B82F6',
        pointBorderWidth: 2
      },
      {
        label: t('surfaceAnomalies'),
        data: lineDefects,
        borderColor: '#8B5CF6',
        backgroundColor: (context: any) => {
          const ctx = context.chart?.ctx;
          if (!ctx) return 'rgba(139, 92, 246, 0.2)';
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.01)');
          return gradient;
        },
        fill: true,
        tension: 0.45,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#8B5CF6',
        pointBorderWidth: 2
      }
    ]
  };

  const telemetryLineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 12, weight: 'bold' as const },
        bodyFont: { family: 'Inter', size: 11 },
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: '#F1F5F9' },
        ticks: { stepSize: 20, font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
      }
    }
  };

  // 2. Stacked Bar Chart (NextAdmin "Profit this week" style)
  const barDays = [t('daysSat'), t('daysSun'), t('daysMon'), t('daysTue'), t('daysWed'), t('daysThu'), t('daysFri')];
  const barData = {
    labels: barDays,
    datasets: [
      {
        label: t('transitVelocity'),
        data: [44, 52, 68, 64, 28, 42, 65],
        backgroundColor: '#3B82F6',
        borderRadius: 4,
        barThickness: 10
      },
      {
        label: t('delayAvoidance'),
        data: [18, 24, 12, 14, 12, 28, 16],
        backgroundColor: '#38BDF8',
        borderRadius: 4,
        barThickness: 10
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: { family: 'Inter', size: 12, weight: 'bold' as const },
        bodyFont: { family: 'Inter', size: 11 },
        padding: 10,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        grid: { color: '#F1F5F9' },
        ticks: { stepSize: 20, font: { family: 'Inter', size: 11 }, color: '#94A3B8' }
      }
    }
  };

  // 3. Donut Chart (NextAdmin "Used Devices" style)
  const donutData = {
    labels: [t('propulsionElectric'), t('propulsionCng'), t('propulsionDiesel')],
    datasets: [
      {
        data: [425, 525, 300],
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverOffset: 6
      }
    ]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0F172A',
        padding: 10,
        cornerRadius: 8
      }
    }
  };

  // 4. Corridor Adherence Bar Chart
  const corridorBarData = {
    labels: ['R-12 Katraj', 'R-24 Swargate', 'R-36 Kothrud', 'R-101 Hinjawadi', 'R-42 Khadki'],
    datasets: [
      {
        label: 'Punctuality Adherence (%)',
        data: [84, 91, 78, 88, 94],
        backgroundColor: '#1D4ED8',
        borderRadius: 4,
        barThickness: 12
      }
    ]
  };

  const corridorBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#0F172A', padding: 8, cornerRadius: 6 }
    },
    scales: {
      x: { min: 0, max: 100, ticks: { callback: (v: any) => `${v}%` } },
      y: { grid: { display: false } }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Row: Dual Area Chart (Payments Overview style) + Weekly Stacked Bar (Profit this week style) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.85fr) minmax(0, 1.15fr)',
        gap: '20px',
        alignItems: 'stretch'
      }} className="analytics-charts-grid">
        
        {/* Left Large Card: Telemetry & Sensing Overview */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Card Header with Title & Period Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em'
              }}>
                {t('telemetryOverview')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t('telemetrySubtitle')}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3B82F6' }}></span>
                  {t('telemetryPackets')}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }}></span>
                  {t('surfaceAnomalies')}
                </span>
              </div>

              {/* Dropdown Selector */}
              <select
                value={telemetryPeriod}
                onChange={(e) => setTelemetryPeriod(e.target.value)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-alt)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="Monthly">{t('periodMonthly')}</option>
                <option value="Weekly">{t('periodWeekly')}</option>
                <option value="Daily">{t('periodDaily')}</option>
              </select>
            </div>
          </div>

          {/* Area Chart Canvas */}
          <div style={{ height: '220px', width: '100%', position: 'relative' }}>
            <Line data={telemetryLineData} options={telemetryLineOptions} />
          </div>

          {/* Bottom Summary Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '12px',
            marginTop: '12px',
            gap: '16px'
          }}>
            <div style={{ borderRight: '1px solid var(--border-light)', paddingRight: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Total Packets Ingested Today
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '6px'
              }}>
                <span>582.4K</span>
                <span style={{ fontSize: '10px', color: '#059669', fontWeight: 700 }}>+8.4% ↑</span>
              </div>
            </div>

            <div style={{ paddingLeft: '4px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Surface Anomalies Neutralized
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                marginTop: '2px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '6px'
              }}>
                <span>142 Potholes</span>
                <span style={{ fontSize: '10px', color: '#1D4ED8', fontWeight: 700 }}>94% PWD Fixed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Weekly Transit Velocity vs Delay Avoidance (Stacked Bar) */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div>
              <div style={{
                fontSize: '15px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em'
              }}>
                {t('weeklyVelocityTitle')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                {t('weeklyVelocitySubtitle')}
              </div>
            </div>

            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--gov-blue)',
              backgroundColor: 'var(--gov-blue-subtle)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              {t('periodWeekly')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#3B82F6' }}></span>
              {t('transitVelocity')}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#38BDF8' }}></span>
              {t('delayAvoidance')}
            </span>
          </div>

          <div style={{ height: '220px', width: '100%', position: 'relative' }}>
            <Bar data={barData} options={barOptions} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '12px',
            marginTop: '12px',
            fontSize: '11px',
            color: 'var(--text-secondary)'
          }}>
            <span>Citywide Mean Transit Speed: <strong>24.6 km/h</strong></span>
            <span style={{ color: '#059669', fontWeight: 700 }}>Adherence: 86.6%</span>
          </div>
        </div>

      </div>

      {/* Bottom Row: Donut Chart (Used Devices style) + Corridor Efficiency Bar Chart */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* 3. Donut Chart: Fleet Propulsion Mix */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {t('fuelPropulsionTitle')}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', marginBottom: '14px' }}>
              {t('fuelPropulsionSubtitle')}
            </div>
          </div>

          <div style={{ height: '170px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={donutData} options={donutOptions} />
            <div style={{
              position: 'absolute',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {formatNumber(1250, language)}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                {t('totalFleet')}
              </div>
            </div>
          </div>

          {/* Donut Legend with Percentages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                {t('propulsionElectric')}
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>425 Units (34%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3B82F6' }}></span>
                {t('propulsionCng')}
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>525 Units (42%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                {t('propulsionDiesel')}
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>300 Units (24%)</strong>
            </div>
          </div>
        </div>

        {/* 4. Corridor Adherence Bar Chart */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {t('routePerformanceTitle')}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', marginBottom: '14px' }}>
              {t('routePerformanceSubtitle')}
            </div>
          </div>

          <div style={{ height: '170px', width: '100%', position: 'relative' }}>
            <Bar data={corridorBarData} options={corridorBarOptions} />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '12px',
            marginTop: '12px',
            fontSize: '11px',
            color: 'var(--text-muted)'
          }}>
            <span>Benchmark: MoHUA Urban Mobility Service Level (UMSL-85%)</span>
            <span style={{ color: '#059669', fontWeight: 700 }}>4 of 5 Corridors Passing</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsCharts;
