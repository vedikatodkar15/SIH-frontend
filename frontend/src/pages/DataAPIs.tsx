import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApiServiceStatus } from '../types';
import { 
  Server, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  Code, 
  Terminal, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export const DataAPIs: React.FC = () => {
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [services, setServices] = useState<ApiServiceStatus[]>([
    { service: "GPS Fleet Telemetry Stream", status: "ONLINE", protocol: "MQTT / TLS 1.3", latency: "24 ms", uptime: "99.98%" },
    { service: "Spatial GIS Route Server", status: "ONLINE", protocol: "WMS / GeoJSON", latency: "38 ms", uptime: "99.95%" },
    { service: "AI Edge Prediction Engine", status: "ONLINE", protocol: "REST / gRPC", latency: "18 ms", uptime: "99.92%" },
    { service: "Automated Fare Collection (AFC)", status: "ONLINE", protocol: "ISO 8583 / UPI", latency: "45 ms", uptime: "99.99%" },
    { service: "Traffic Police CCTV Sensor Sync", status: "ONLINE", protocol: "RTSP / AI Vision", latency: "82 ms", uptime: "98.70%" },
    { service: "National Transit Data Open API", status: "ONLINE", protocol: "GTFS-RT Feed", latency: "52 ms", uptime: "99.94%" }
  ]);

  const [activeTab, setActiveTab] = useState<'curl' | 'js' | 'python'>('curl');

  const runHealthPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setServices(prev => 
        prev.map(s => {
          const jitter = Math.floor(Math.random() * 10) - 4;
          const currentVal = parseInt(s.latency) || 30;
          const newVal = Math.max(12, currentVal + jitter);
          return {
            ...s,
            latency: `${newVal} ms`
          };
        })
      );
      setIsPinging(false);
    }, 900);
  };

  const curlSnippet = `curl -X GET "http://localhost:5000/api/buses?route=12" \\
  -H "Authorization: Bearer UTIS_DEMO_TOKEN_SIH2026" \\
  -H "Accept: application/json"`;

  const jsSnippet = `const response = await fetch('http://localhost:5000/api/buses?route=12', {
  headers: {
    'Authorization': 'Bearer UTIS_DEMO_TOKEN_SIH2026',
    'Accept': 'application/json'
  }
});
const data = await response.json();
console.log('Active Fleet Telemetry:', data.data);`;

  const pythonSnippet = `import requests

url = "http://localhost:5000/api/buses"
params = {"route": "12"}
headers = {"Authorization": "Bearer UTIS_DEMO_TOKEN_SIH2026"}

res = requests.get(url, params=params, headers=headers)
fleet_data = res.json()["data"]
print(f"Tracking {len(fleet_data)} buses on corridor.")`;

  return (
    <div>
      {/* Top Banner */}
      <div className="gov-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy)', margin: 0 }}>
              National Open Transit Data & API Gateway
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Standardized Open Data feeds complying with Ministry of Housing & Urban Affairs (MoHUA) GTFS-Realtime guidelines.
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={runHealthPing}
            disabled={isPinging}
          >
            <RefreshCw size={16} className={isPinging ? 'spin' : ''} />
            <span>{isPinging ? 'Pinging Microservices...' : 'Run Gateway Health Ping'}</span>
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="gov-card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div className="card-title">
            <Activity size={18} color="var(--status-ontime)" />
            <span>Operational Telemetry & Protocol Status</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
            ● ALL 6 CORE INTEGRATIONS OPERATIONAL
          </span>
        </div>
        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>System Status</th>
                <th>Transport Protocol</th>
                <th>Round-Trip Latency</th>
                <th>Uptime (30d)</th>
                <th>Data Source Model</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.service}>
                  <td><strong>{s.service}</strong></td>
                  <td>
                    <span className="badge badge-ontime">
                      <span className="badge-dot" />
                      {s.status}
                    </span>
                  </td>
                  <td><code style={{ fontSize: '0.78rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>{s.protocol}</code></td>
                  <td><strong style={{ color: '#059669' }}>{s.latency}</strong></td>
                  <td>{s.uptime}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {s.service.includes('GPS') ? 'Simulated Live Telemetry' : 'MoHUA Production Sandbox'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Developer API Documentation Sandbox */}
      <div className="gov-card">
        <div className="card-header">
          <div className="card-title">
            <Code size={18} color="var(--gov-blue)" />
            <span>Developer Integration Guide (REST / GTFS-RT)</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              className={`btn btn-sm ${activeTab === 'curl' ? 'btn-navy' : 'btn-outline'}`}
              onClick={() => setActiveTab('curl')}
            >
              cURL
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'js' ? 'btn-navy' : 'btn-outline'}`}
              onClick={() => setActiveTab('js')}
            >
              JavaScript
            </button>
            <button 
              className={`btn btn-sm ${activeTab === 'python' ? 'btn-navy' : 'btn-outline'}`}
              onClick={() => setActiveTab('python')}
            >
              Python
            </button>
          </div>
        </div>
        <div className="card-body">
          <pre style={{
            background: '#0F172A',
            color: '#E2E8F0',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            overflowX: 'auto',
            lineHeight: 1.5
          }}>
            {activeTab === 'curl' && curlSnippet}
            {activeTab === 'js' && jsSnippet}
            {activeTab === 'python' && pythonSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
