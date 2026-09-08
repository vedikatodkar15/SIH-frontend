import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read dataset files
const loadData = (filename) => {
  const filePath = path.join(__dirname, '..', 'dataset', filename);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading dataset ${filename}:`, err.message);
    return null;
  }
};

// In-memory mutable state for runtime operations
let busesData = loadData('buses.json') || [];
let routesData = loadData('routes.json') || [];
let stopsData = loadData('stops.json') || { stops: [], depots: [] };
let demandData = loadData('passenger-demand.json') || {};
let trafficData = loadData('traffic.json') || {};
let alertsData = loadData('alerts.json') || [];
let recommendationsData = loadData('recommendations.json') || { recommendations: [] };

let grievances = [
  {
    ticketId: "GRV-2026-8801",
    name: "Aakash Deshmukh",
    email: "aakash.d@example.com",
    category: "Bus Delay",
    route: "12",
    description: "Route 12 bus delayed by 18 minutes at Sancheti Chowk during evening rush hour.",
    status: "In Progress",
    timestamp: "2026-09-07 16:45 IST"
  }
];

// System Health Status
app.get('/api/system/status', (req, res) => {
  res.json({
    status: 'HEALTHY',
    version: '2.4.0-SIH2026',
    nodeEnv: process.env.NODE_ENV || 'development',
    serverTime: new Date().toISOString(),
    telemetryStream: 'CONNECTED',
    uptimeSeconds: Math.floor(process.uptime()),
    activeFleetCount: busesData.length,
    activeAlertsCount: alertsData.filter(a => a.status !== 'Resolved').length
  });
});

// 1. Buses Telemetry API
app.get('/api/buses', (req, res) => {
  const { route, status } = req.query;
  let filtered = [...busesData];
  if (route && route !== 'all') {
    filtered = filtered.filter(b => b.route === route);
  }
  if (status && status !== 'all') {
    filtered = filtered.filter(b => b.status.toLowerCase() === status.toLowerCase());
  }
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/buses/:id', (req, res) => {
  const bus = busesData.find(b => b.id === req.params.id);
  if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
  res.json({ success: true, data: bus });
});

// 2. Routes API
app.get('/api/routes', (req, res) => {
  res.json({ success: true, count: routesData.length, data: routesData });
});

// 3. Stops & Depots API
app.get('/api/stops', (req, res) => {
  res.json({ success: true, data: stopsData });
});

// 4. Passenger Demand API
app.get('/api/demand', (req, res) => {
  res.json({ success: true, data: demandData });
});

// 5. Traffic & Bottlenecks API
app.get('/api/traffic', (req, res) => {
  res.json({ success: true, data: trafficData });
});

// 6. Dynamic Reroute Simulation API
app.post('/api/reroute/simulate', (req, res) => {
  const { routeId, targetCorridor } = req.body;
  const simulation = trafficData.rerouteSimulation || {};
  res.json({
    success: true,
    message: 'Dynamic rerouting simulation computed successfully',
    data: {
      routeId: routeId || '12',
      bypassRoute: '12B',
      corridor: targetCorridor || 'Senapati Bapat Road',
      comparison: simulation
    }
  });
});

// 7. Alerts & Incidents API
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, count: alertsData.length, data: alertsData });
});

app.post('/api/alerts/:id/acknowledge', (req, res) => {
  const { id } = req.params;
  const alert = alertsData.find(a => a.id === id);
  if (!alert) return res.status(404).json({ success: false, message: 'Alert not found' });
  
  alert.status = 'Acknowledged';
  alert.acknowledgedAt = new Date().toLocaleTimeString('en-IN') + ' IST';
  res.json({ success: true, message: `Alert ${id} acknowledged`, data: alert });
});

// 8. AI Recommendations & Explainable Decisions API
app.get('/api/recommendations', (req, res) => {
  res.json({ success: true, data: recommendationsData });
});

app.post('/api/recommendations/:id/approve', (req, res) => {
  const { id } = req.params;
  const rec = recommendationsData.recommendations.find(r => r.id === id);
  if (!rec) return res.status(404).json({ success: false, message: 'Recommendation not found' });

  rec.status = 'APPROVED';
  rec.approvedAt = new Date().toLocaleTimeString('en-IN') + ' IST';
  
  // If dispatch standby recommendation, add standby bus to active fleet
  if (rec.type === 'DISPATCH_STANDBY') {
    const newBus = {
      id: "BUS-1210",
      route: "12",
      routeName: "Pune Stn - Univ. Rd (Standby Express)",
      status: "On Time",
      speed: 34,
      eta: "1 min",
      nextStop: "Shivaji Nagar Depot Exit",
      lat: 18.5338,
      lng: 73.8405,
      driver: "Anand Shinde (Standby)",
      conductor: "Pravin Jagtap",
      regNo: "MH-12-RN-9901",
      type: "Electric AC (Olectra)",
      fuelBattery: 96,
      occupancy: 12,
      delayMinutes: 0,
      lastPing: "Just now",
      engineTemp: "66°C",
      depot: "Shivaji Nagar Central Depot"
    };
    if (!busesData.find(b => b.id === newBus.id)) {
      busesData.push(newBus);
    }
  }

  res.json({
    success: true,
    message: `Recommendation ${id} approved and dispatched!`,
    data: rec
  });
});

// 9. Citizen Grievances API
app.get('/api/grievances', (req, res) => {
  res.json({ success: true, count: grievances.length, data: grievances });
});

app.post('/api/grievance', (req, res) => {
  const { name, email, category, route, description } = req.body;
  const newTicket = {
    ticketId: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name || 'Citizen',
    email: email || 'not-provided',
    category: category || 'General Feedback',
    route: route || 'N/A',
    description: description || '',
    status: 'Submitted',
    timestamp: new Date().toLocaleString('en-IN') + ' IST'
  };
  grievances.unshift(newTicket);
  res.status(201).json({
    success: true,
    message: 'Grievance submitted successfully. Tracking ticket generated.',
    data: newTicket
  });
});

// 10. Reports & Audits API
app.get('/api/reports', (req, res) => {
  res.json({
    success: true,
    generatedAt: new Date().toISOString(),
    kpiAudit: {
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
    },
    fleetStatusBreakdown: {
      onTime: 7,
      delayed: 3,
      critical: 1,
      maintenance: 1,
      offline: 1
    }
  });
});

app.listen(PORT, () => {
  console.log(`[UTIS Backend] Government Urban Transport Intelligence API running on http://localhost:${PORT}`);
  console.log(`[UTIS Backend] City: Pune Metropolitan Region | Ministry of Housing & Urban Affairs`);
});
