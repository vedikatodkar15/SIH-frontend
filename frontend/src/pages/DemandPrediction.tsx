import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, Users, AlertCircle, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

export const DemandPrediction: React.FC = () => {
  const { demand, approveRecommendation, recommendations } = useApp();

  const isStandbyDispatched = recommendations.find(r => r.id === 'REC-01')?.status === 'APPROVED';

  const chartData = {
    labels: demand.hourlyTrend.map(d => d.time),
    datasets: [
      {
        label: 'Actual Commuter Tap-ins (AFC)',
        data: demand.hourlyTrend.map(d => d.actual),
        borderColor: '#1D4ED8',
        backgroundColor: 'rgba(29, 78, 216, 0.1)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#1D4ED8'
      },
      {
        label: 'LSTM AI Predicted Passenger Load',
        data: demand.hourlyTrend.map(d => d.predicted),
        borderColor: '#E66E19',
        borderDash: [5, 5],
        backgroundColor: 'rgba(230, 110, 25, 0.05)',
        tension: 0.35,
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: '#E66E19'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { family: 'Inter', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: '#0A2540',
        titleFont: { family: 'Inter', size: 13, weight: 'bold' as const },
        bodyFont: { family: 'Inter', size: 12 }
      }
    },
    scales: {
      y: {
        title: { display: true, text: 'Passengers / Hour', font: { family: 'Inter', size: 12 } },
        grid: { color: '#E2E8F0' }
      },
      x: {
        grid: { color: '#F1F5F9' }
      }
    }
  };

  return (
    <div>
      {/* Top Demand Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AGGREGATE DEMAND INDEX</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: '4px' }}>
            {demand.summary.index} / 100
          </div>
          <div style={{ fontSize: '0.78rem', color: '#DC2626', fontWeight: 700, marginTop: '4px' }}>
            {demand.summary.status}
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL WAITING COMMUTERS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1D4ED8', marginTop: '4px' }}>
            {demand.summary.totalWaitingPassengers.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Across 11 Major Stops
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOP SURGE SECTOR</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: '6px' }}>
            {demand.summary.topSurgeSector}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Window: {demand.summary.peakTimeWindow}
          </div>
        </div>

        <div className="gov-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>STANDBY E-BUSES DISPATCHED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {isStandbyDispatched ? demand.summary.standbyDispatchedToday + 2 : demand.summary.standbyDispatchedToday}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            Capacity Deficit Balanced
          </div>
        </div>
      </div>

      {/* Hourly Surge Line Chart */}
      <div className="gov-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--gov-navy)', margin: 0 }}>
              Hourly Commuter Tap-In Surge vs AI LSTM Predictive Baseline
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Data derived from real-time Automated Fare Collection (AFC) gates & UPI QR validators
            </div>
          </div>
        </div>
        <div style={{ height: '320px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Sector Balancing & Fleet Rebalancing Table */}
      <div className="gov-card">
        <div className="card-header">
          <div className="card-title">
            <Users size={18} color="var(--gov-blue)" />
            <span>Key Transit Sector Capacity Balancing Matrix</span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Sector Name</th>
                <th>Current Demand</th>
                <th>Predicted Peak</th>
                <th>Surge %</th>
                <th>Demand Level</th>
                <th>Active Buses</th>
                <th>Required Buses</th>
                <th>Deficit</th>
                <th>Recommended Fleet Action</th>
              </tr>
            </thead>
            <tbody>
              {demand.sectors.map(sector => (
                <tr key={sector.sector}>
                  <td><strong>{sector.sector}</strong></td>
                  <td>{sector.currentDemand} pax/hr</td>
                  <td><strong style={{ color: '#0A2540' }}>{sector.predictedDemand} pax/hr</strong></td>
                  <td>
                    <span style={{ color: '#DC2626', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <ArrowUpRight size={14} />
                      {sector.surgePercentage}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${sector.status === 'VERY HIGH' ? 'badge-critical' : sector.status === 'HIGH' ? 'badge-warning' : 'badge-ontime'}`}>
                      {sector.status}
                    </span>
                  </td>
                  <td>{sector.availableBuses}</td>
                  <td><strong>{sector.recommendedBuses}</strong></td>
                  <td>
                    {sector.deficit > 0 ? (
                      <span style={{ color: '#DC2626', fontWeight: 800 }}>-{sector.deficit} buses</span>
                    ) : (
                      <span style={{ color: '#059669', fontWeight: 700 }}>Balanced</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontSize: '0.78rem' }}>{sector.action}</span>
                      {sector.deficit > 0 && !isStandbyDispatched && (
                        <button 
                          className="btn btn-saffron btn-sm"
                          onClick={() => approveRecommendation('REC-01')}
                        >
                          Dispatch
                        </button>
                      )}
                      {sector.deficit > 0 && isStandbyDispatched && (
                        <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> Dispatched
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
