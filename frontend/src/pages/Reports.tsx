import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PrintReportModal } from '../components/PrintReportModal';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Leaf, 
  Calendar, 
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Reports: React.FC = () => {
  const { buses, t } = useApp();
  const [period, setPeriod] = useState<string>('today');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  const onTimeCount = buses.filter(b => b.status === 'On Time').length;
  const delayedCount = buses.filter(b => b.status === 'Delayed').length;
  const criticalCount = buses.filter(b => b.status === 'Critical').length;
  const maintenanceCount = buses.filter(b => b.status === 'Maintenance').length;
  const offlineCount = buses.filter(b => b.status === 'Offline').length;

  const doughnutData = {
    labels: ['On Time', 'Delayed', 'Critical Alert', 'Depot Maintenance', 'Shift Offline'],
    datasets: [
      {
        data: [onTimeCount, delayedCount, criticalCount, maintenanceCount, offlineCount],
        backgroundColor: [
          '#059669',
          '#DC2626',
          '#991B1B',
          '#7C3AED',
          '#64748B'
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: { family: 'Inter', size: 12 },
          boxWidth: 14
        }
      }
    }
  };

  const auditData = {
    totalFleetSize: 1250,
    activeToday: 1087,
    onTimeReliability: "82.4%",
    peakPunctuality: "78.1%",
    avgPunctualityVariance: "+/- 4.2 min",
    fuelDieselSavedLiters: 4210,
    co2AvoidedKg: 11450,
    totalTripsOperated: 4820,
    citizenComplaintsLogged: 18,
    citizenComplaintsResolved: 15
  };

  const downloadReportCSV = () => {
    const lines = [
      'METRIC,VALUE,BENCHMARK,STATUS',
      'Total Authorized Fleet Size,1250 buses,1200 buses,Authorized',
      'Active Revenue Service Fleet,1087 buses,1000 buses,Optimal',
      'Fleet Punctuality (On-Time %),82.4%,80.0%,Pass (GIGW Compliant)',
      'Fuel Conserved,4210 Liters,3800 Liters,Above Target',
      'CO2 Emissions Avoided,11450 kg,10000 kg,Exceeded',
      'Trips Completed Today,4820 trips,4500 trips,Completed',
      'Citizen Grievance Resolution Rate,83.3%,75.0%,Satisfactory'
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UTIS_Government_Audit_Report_${period}_2026.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Period Filter & Actions Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Calendar size={18} color="var(--gov-blue)" />
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
            Audit Reporting Horizon:
          </label>
          <select 
            className="form-select" 
            style={{ width: 'auto', padding: '6px 12px' }}
            value={period}
            onChange={e => setPeriod(e.target.value)}
          >
            <option value="today">Today (07 Sept 2026 - Operational Day)</option>
            <option value="week">Past 7 Days (Consolidated Week)</option>
            <option value="month">Month-to-Date (September 2026)</option>
            <option value="quarter">Quarter 3 (Q3 FY26 - MoHUA)</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={downloadReportCSV}>
            <Download size={16} />
            <span>Export Audit CSV</span>
          </button>
          <button className="btn btn-navy" onClick={() => setIsPrintModalOpen(true)}>
            <Printer size={16} />
            <span>Official Print / PDF Preview</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL REVENUE TRIPS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: '4px' }}>
            {auditData.totalTripsOperated.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            99.2% Schedule Adherence
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PUNCTUALITY RELIABILITY</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {auditData.onTimeReliability}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            MoHUA Benchmark: &gt; 80%
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>FUEL CONSERVED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>
            {auditData.fuelDieselSavedLiters.toLocaleString()} L
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Dynamic Bypass Savings
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CO₂ REDUCTION ACHIEVED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {auditData.co2AvoidedKg.toLocaleString()} kg
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            FAME-II Target Surpassed
          </div>
        </div>
      </div>

      {/* Main Grid: Fleet Doughnut Chart + Regulatory Audit Catalogue */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Fleet Distribution Doughnut */}
        <div className="gov-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gov-navy)', marginBottom: '4px' }}>
            Active Fleet Status Distribution Breakdown
          </h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Real-time telemetry proportion across all monitored depots
          </div>
          <div style={{ height: '280px' }}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

        {/* Regulatory Audit Reports Catalogue */}
        <div className="gov-card">
          <div className="card-header">
            <div className="card-title">
              <FileText size={18} color="var(--gov-blue)" />
              <span>Standard Audit Document Library</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-alt)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gov-navy)' }}>
                MoHUA Monthly Punctuality & Headway Audit
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 6px' }}>
                Form 4B — Municipal Transit Reliability Certification
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setIsPrintModalOpen(true)}>
                View & Print
              </button>
            </div>

            <div style={{ padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-alt)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gov-navy)' }}>
                Electric Fleet Battery Health & SOC Diagnostic
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 6px' }}>
                Battery pack degradation and depot charging utilization
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setIsPrintModalOpen(true)}>
                View & Print
              </button>
            </div>

            <div style={{ padding: '10px 12px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-alt)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gov-navy)' }}>
                Carbon Offset & Green Mobility Certification
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 6px' }}>
                Quantified tailpipe emissions avoided under National Clean Air Programme
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setIsPrintModalOpen(true)}>
                View & Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <PrintReportModal 
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        audit={auditData}
        buses={buses}
      />
    </div>
  );
};
