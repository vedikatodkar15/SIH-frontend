import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, Activity, Zap, ChevronDown, Calendar, Database, ShieldCheck } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const AnalyticsCharts: React.FC = () => {
  const [telemetryPeriod, setTelemetryPeriod] = useState<string>('Monthly');
  const [corridorPeriod, setCorridorPeriod] = useState<string>('This Week');

  // 1. NextAdmin-inspired Smooth Area Line Chart: "Urban Sensing Telemetry & Defect Ingestion"
  const lineLabels = telemetryPeriod === 'Monthly' 
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : telemetryPeriod === 'Weekly'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'];

  const lineDataPoints = telemetryPeriod === 'Monthly'
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
        label: 'Fleet Sensor Packets (x1k)',
        data: lineDataPoints,
        borderColor: '#3B82F6',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');
          return gradient;
        },
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#3B82F6',
        pointBorderWidth: 2
      },
      {
        label: 'Surface Anomaly Ingestion Rate',
        data: lineDefects,
        borderColor: '#8B5CF6',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.01)');
          return gradient;
        },
        fill: true,
        tension: 0.45,
        borderWidth: 3,
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
        display: false // Clean NextAdmin look, custom legend below
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
        grid: {
          display: false
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#94A3B8'
        }
      },
      y: {
        min: 0,
        max: 100,
        grid: {
          color: '#F1F5F9'
        },
        ticks: {
          stepSize: 20,
          font: { family: 'Inter', size: 11 },
          color: '#94A3B8'
        }
      }
    }
  };

  // 2. NextAdmin-inspired Stacked / Grouped Bar Chart: "Corridor Transit Velocity vs Delay"
  const barData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Transit Velocity (km/h)',
        data: [44, 52, 68, 64, 28, 42, 65],
        backgroundColor: '#3B82F6',
        borderRadius: 4,
        barThickness: 10
      },
      {
        label: 'Delay Avoidance Index',
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
      legend: {
        display: false // custom legend in header
      },
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
        grid: {
          display: false
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          color: '#94A3B8'
        }
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
        grid: {
          color: '#F1F5F9'
        },
        ticks: {
          stepSize: 20,
          font: { family: 'Inter', size: 11 },
          color: '#94A3B8'
        }
      }
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
      gap: '20px',
      alignItems: 'stretch'
    }} className="analytics-charts-grid">
      
      {/* 1. Left Large Card: Telemetry & Sensing Overview (NextAdmin "Payments Overview" style) */}
      <div className="gov-card" style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Card Header with Title & Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}>
              Telemetry & Sensing Ingestion Overview
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Real-time Edge AI ingestion volume vs road surface anomalies
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3B82F6' }}></span>
                Telemetry Packets
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#8B5CF6' }}></span>
                Anomaly Index
              </span>
            </div>

            <select
              value={telemetryPeriod}
              onChange={(e) => setTelemetryPeriod(e.target.value)}
              style={{
                height: '28px',
                padding: '0 8px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-alt)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>
        </div>

        {/* Chart Canvas */}
        <div style={{ height: '220px', width: '100%', position: 'relative' }}>
          <Line data={telemetryLineData} options={telemetryLineOptions} />
        </div>

        {/* Bottom Split Stat Strip (Matching NextAdmin Received Amount / Due Amount) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderTop: '1px solid var(--border-light)',
          marginTop: '16px',
          paddingTop: '12px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Total Ingested Data Points
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              marginTop: '2px'
            }}>
              24,860 <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>(+4.35% ↑)</span>
            </div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              AI Surface Verification Rate
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#8B5CF6',
              fontFamily: 'monospace',
              marginTop: '2px'
            }}>
              96.4% <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>(Edge Latency: 38ms)</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Right Card: Transit Velocity & Delay Avoidance (NextAdmin "Profit this week" style) */}
      <div className="gov-card" style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {/* Card Header with Title & Dropdown */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}>
              Transit Velocity vs Delay
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Corridor throughput speed vs congestion index
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select
              value={corridorPeriod}
              onChange={(e) => setCorridorPeriod(e.target.value)}
              style={{
                height: '28px',
                padding: '0 8px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-alt)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
            </select>
          </div>
        </div>

        {/* Legend Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#3B82F6' }}></span>
            Transit Speed (km/h)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#38BDF8' }}></span>
            Delay Avoidance Index
          </span>
        </div>

        {/* Chart Canvas */}
        <div style={{ height: '210px', width: '100%', position: 'relative' }}>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Bottom Stat Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid var(--border-light)',
          marginTop: '16px',
          paddingTop: '12px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Peak Transit Speed
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
              38.4 km/h
            </div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-light)', height: '28px' }} />

          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Avg Commute Gain
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#10B981', fontFamily: 'monospace' }}>
              +14 mins / trip
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
