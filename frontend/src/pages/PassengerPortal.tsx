import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Search, 
  Clock, 
  IndianRupee, 
  Info, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  BusFront
} from 'lucide-react';

export const PassengerPortal: React.FC = () => {
  const { grievances, submitGrievance, t } = useApp();

  // Search state
  const [searchRoute, setSearchRoute] = useState<string>('');
  
  // Grievance form state
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [category, setCategory] = useState<string>('Bus Delay');
  const [route, setRoute] = useState<string>('12');
  const [description, setDescription] = useState<string>('');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const citizenRoutes = [
    { route: "12", dest: "University Road via FC Road", nextBus: "3 min", status: "On Time", fare: "₹ 15", type: "Electric AC" },
    { route: "12B", dest: "University Road via SB Road Bypass", nextBus: "2 min", status: "Fast Bypass", fare: "₹ 15", type: "Electric AC" },
    { route: "45", dest: "Hadapsar Gadital Hub", nextBus: "4 min", status: "On Time", fare: "₹ 20", type: "Diesel BS-VI" },
    { route: "101", dest: "Viman Nagar Corner", nextBus: "6 min", status: "Moderate", fare: "₹ 25", type: "Electric AC" },
    { route: "8", dest: "Katraj Snake Park Junction", nextBus: "8 min", status: "On Time", fare: "₹ 20", type: "Electric AC" }
  ];

  const filteredRoutes = citizenRoutes.filter(r => 
    r.route.toLowerCase().includes(searchRoute.toLowerCase()) || 
    r.dest.toLowerCase().includes(searchRoute.toLowerCase())
  );

  const handleSubmitGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    const ticket = await submitGrievance({
      name,
      email,
      category,
      route,
      description
    });

    setSubmissionSuccess(`Grievance successfully filed! Your Tracking Ticket ID is ${ticket.ticketId}.`);
    setName('');
    setEmail('');
    setDescription('');
    setTimeout(() => {
      setSubmissionSuccess(null);
    }, 6000);
  };

  return (
    <div>
      {/* Public Commuter Service Advisories */}
      <div className="gov-card" style={{ padding: '16px', marginBottom: '24px', background: 'var(--gov-blue-subtle)', borderLeft: '4px solid var(--gov-blue)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Info size={18} color="var(--gov-blue)" />
          <strong style={{ fontSize: '0.95rem', color: 'var(--gov-navy)' }}>Official Citizen Transit Advisories</strong>
        </div>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li>
            <strong>Route 12 Traffic Advisory:</strong> Commuters traveling from Pune Station to University Road are advised to board <strong>Route 12B</strong> to bypass Sancheti Chowk congestion and save 14 minutes.
          </li>
          <li>
            <strong>Zero Emission Corridor:</strong> 100% of Route 12 and 12B fleet operates on zero-emission electric battery technology under FAME-II Smart Mobility.
          </li>
          <li>
            <strong>Student & Senior Citizen Passes:</strong> Digital verification counter active at Shivaji Nagar Central Terminus.
          </li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Real-time Bus ETA & Schedule Lookup */}
        <div className="gov-card">
          <div className="card-header">
            <div className="card-title">
              <BusFront size={18} color="var(--gov-blue)" />
              <span>Real-Time Commuter Transit Schedule & Next Bus ETA</span>
            </div>
          </div>
          <div className="card-body">
            <div className="search-container" style={{ maxWidth: '100%', marginBottom: '16px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search route number or destination..." 
                value={searchRoute}
                onChange={e => setSearchRoute(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredRoutes.map(item => (
                <div 
                  key={item.route}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface-alt)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.95rem' }}>
                        Route {item.route}
                      </span>
                      <span className={`badge ${item.status === 'Fast Bypass' ? 'badge-ontime' : item.status === 'On Time' ? 'badge-ontime' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Destination: {item.dest} • {item.type}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 800, fontSize: '0.95rem' }}>
                      <Clock size={14} />
                      <span>{item.nextBus}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      Standard Fare: {item.fare}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Citizen Grievance & Feedback Form */}
        <div className="gov-card">
          <div className="card-header">
            <div className="card-title">
              <MessageSquare size={18} color="var(--gov-saffron)" />
              <span>Public Grievance Redressal Portal</span>
            </div>
          </div>
          <div className="card-body">
            {submissionSuccess && (
              <div style={{
                background: '#ECFDF5',
                border: '1px solid #6EE7B7',
                color: '#065F46',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>{submissionSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmitGrievance}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kulkarni"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email or Mobile Number</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. ramesh.k@example.com"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select" 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="Bus Delay">Corridor Delay</option>
                    <option value="Overcrowding">Severe Overcrowding</option>
                    <option value="Driver Behavior">Driver / Staff Behavior</option>
                    <option value="Cleanliness">Cleanliness & AC</option>
                    <option value="Route Suggestion">Route Suggestion</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Route</label>
                  <select 
                    className="form-select" 
                    value={route} 
                    onChange={e => setRoute(e.target.value)}
                  >
                    <option value="12">Route 12</option>
                    <option value="12B">Route 12B</option>
                    <option value="45">Route 45</option>
                    <option value="101">Route 101</option>
                    <option value="8">Route 8</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Grievance Description *</label>
                <textarea 
                  className="form-textarea" 
                  rows={3} 
                  required 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe location, time, and issue..."
                />
              </div>

              <button type="submit" className="btn btn-navy" style={{ width: '100%' }}>
                Submit Grievance & Generate Tracking ID
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Submitted Grievance Status Tracker */}
      <div className="gov-card">
        <div className="card-header">
          <div className="card-title">
            <CheckCircle2 size={18} color="var(--status-ontime)" />
            <span>Recent Public Grievance Audit Logs</span>
          </div>
        </div>
        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Complainant</th>
                <th>Category</th>
                <th>Route</th>
                <th>Description</th>
                <th>Filed Timestamp</th>
                <th>Resolution Status</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map(g => (
                <tr key={g.ticketId}>
                  <td><strong>{g.ticketId}</strong></td>
                  <td>{g.name}</td>
                  <td>{g.category}</td>
                  <td>Route {g.route}</td>
                  <td style={{ maxWidth: '280px', fontSize: '0.78rem' }}>{g.description}</td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{g.timestamp}</td>
                  <td>
                    <span className={`badge ${g.status === 'Resolved' ? 'badge-ontime' : 'badge-warning'}`}>
                      {g.status}
                    </span>
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
