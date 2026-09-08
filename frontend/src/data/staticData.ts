import { Bus, Route, StopsData, PassengerDemand, TrafficData, Alert, AIRecommendation, Grievance, KPIAudit, ApiServiceStatus } from '../types';

export const INITIAL_BUSES: Bus[] = [
  {
    id: "BUS-1024",
    route: "12",
    routeName: "Pune Stn - Univ. Rd",
    status: "Delayed",
    speed: 24,
    eta: "7 min",
    nextStop: "Shivaji Nagar",
    lat: 18.5295,
    lng: 73.8480,
    driver: "Ramesh Jadhav",
    conductor: "Anil More",
    regNo: "MH-12-RN-4024",
    type: "Electric AC (Olectra)",
    fuelBattery: 68,
    occupancy: 88,
    delayMinutes: 8,
    lastPing: "Just now",
    engineTemp: "74°C",
    depot: "Shivaji Nagar Central Depot"
  },
  {
    id: "BUS-1025",
    route: "12",
    routeName: "Pune Stn - Univ. Rd",
    status: "On Time",
    speed: 38,
    eta: "3 min",
    nextStop: "FC Road",
    lat: 18.5235,
    lng: 73.8420,
    driver: "Suresh Patil",
    conductor: "Ganesh Shinde",
    regNo: "MH-12-RN-4025",
    type: "CNG Standard (Tata)",
    fuelBattery: 76,
    occupancy: 62,
    delayMinutes: 1,
    lastPing: "12s ago",
    engineTemp: "82°C",
    depot: "Shivaji Nagar Central Depot"
  },
  {
    id: "BUS-1087",
    route: "45",
    routeName: "Swargate - Hadapsar",
    status: "On Time",
    speed: 41,
    eta: "4 min",
    nextStop: "Race Course",
    lat: 18.5042,
    lng: 73.8820,
    driver: "Amit Kulkarni",
    conductor: "Sanjay Thorat",
    regNo: "MH-12-RN-5120",
    type: "Electric AC (Olectra)",
    fuelBattery: 84,
    occupancy: 54,
    delayMinutes: 0,
    lastPing: "5s ago",
    engineTemp: "71°C",
    depot: "Swargate Terminal Depot"
  },
  {
    id: "BUS-1088",
    route: "45",
    routeName: "Swargate - Hadapsar",
    status: "Delayed",
    speed: 16,
    eta: "14 min",
    nextStop: "Hadapsar Gadital",
    lat: 18.5030,
    lng: 73.9180,
    driver: "Vikas Shinde",
    conductor: "Deepak Chavan",
    regNo: "MH-12-RN-5121",
    type: "Diesel BS-VI (Ashok Leyland)",
    fuelBattery: 52,
    occupancy: 94,
    delayMinutes: 12,
    lastPing: "Just now",
    engineTemp: "86°C",
    depot: "Hadapsar Workshop Depot"
  },
  {
    id: "BUS-1102",
    route: "101",
    routeName: "Kothrud - Viman Nagar",
    status: "Critical",
    speed: 0,
    eta: "Stalled",
    nextStop: "Main Junction",
    lat: 18.5281,
    lng: 73.8509,
    driver: "Rajesh Gaikwad",
    conductor: "Prasad Sawant",
    regNo: "MH-12-RN-6204",
    type: "Electric AC (JBM)",
    fuelBattery: 42,
    occupancy: 82,
    delayMinutes: 26,
    lastPing: "2m ago",
    engineTemp: "98°C",
    depot: "Kothrud Depot"
  },
  {
    id: "BUS-1105",
    route: "101",
    routeName: "Kothrud - Viman Nagar",
    status: "On Time",
    speed: 36,
    eta: "6 min",
    nextStop: "Deccan Gymkhana",
    lat: 18.5140,
    lng: 73.8370,
    driver: "Sunil Pawar",
    conductor: "Manoj Deshmukh",
    regNo: "MH-12-RN-6207",
    type: "Electric AC (JBM)",
    fuelBattery: 79,
    occupancy: 70,
    delayMinutes: 2,
    lastPing: "18s ago",
    engineTemp: "73°C",
    depot: "Kothrud Depot"
  },
  {
    id: "BUS-1145",
    route: "8",
    routeName: "Katraj - Pune Stn",
    status: "Maintenance",
    speed: 0,
    eta: "In Depot",
    nextStop: "Central Workshop",
    lat: 18.5040,
    lng: 73.9310,
    driver: "Depot Service Team",
    conductor: "N/A",
    regNo: "MH-12-RN-7011",
    type: "Electric Midi",
    fuelBattery: 92,
    occupancy: 0,
    delayMinutes: 0,
    lastPing: "10m ago",
    engineTemp: "45°C",
    depot: "Hadapsar Workshop Depot"
  },
  {
    id: "BUS-1150",
    route: "8",
    routeName: "Katraj - Pune Stn",
    status: "Offline",
    speed: 0,
    eta: "Shift Off",
    nextStop: "Katraj Terminus",
    lat: 18.4570,
    lng: 73.8670,
    driver: "Kailash Gite",
    conductor: "N/A",
    regNo: "MH-12-RN-7019",
    type: "CNG Standard",
    fuelBattery: 34,
    occupancy: 0,
    delayMinutes: 0,
    lastPing: "35m ago",
    engineTemp: "38°C",
    depot: "Swargate Terminal Depot"
  },
  {
    id: "BUS-1162",
    route: "12B",
    routeName: "Pune Stn - Univ (Alt)",
    status: "On Time",
    speed: 44,
    eta: "2 min",
    nextStop: "SB Road Complex",
    lat: 18.5332,
    lng: 73.8315,
    driver: "Mahesh Bhosle",
    conductor: "Rahul Kakade",
    regNo: "MH-12-RN-8014",
    type: "Electric AC (Olectra)",
    fuelBattery: 88,
    occupancy: 48,
    delayMinutes: 0,
    lastPing: "Just now",
    engineTemp: "70°C",
    depot: "Shivaji Nagar Central Depot"
  },
  {
    id: "BUS-1180",
    route: "101",
    routeName: "Kothrud - Viman Nagar",
    status: "On Time",
    speed: 39,
    eta: "5 min",
    nextStop: "Viman Nagar Corner",
    lat: 18.5580,
    lng: 73.9020,
    driver: "Nitin Bhalerao",
    conductor: "Santosh Tambe",
    regNo: "MH-12-RN-8410",
    type: "Electric AC (Olectra)",
    fuelBattery: 65,
    occupancy: 67,
    delayMinutes: 1,
    lastPing: "8s ago",
    engineTemp: "72°C",
    depot: "Kothrud Depot"
  },
  {
    id: "BUS-1192",
    route: "8",
    routeName: "Katraj - Pune Stn",
    status: "On Time",
    speed: 32,
    eta: "8 min",
    nextStop: "Swargate Hub",
    lat: 18.4890,
    lng: 73.8600,
    driver: "Sachin Wagh",
    conductor: "Dnyaneshwar Gore",
    regNo: "MH-12-RN-9012",
    type: "Electric AC",
    fuelBattery: 71,
    occupancy: 59,
    delayMinutes: 2,
    lastPing: "14s ago",
    engineTemp: "75°C",
    depot: "Swargate Terminal Depot"
  },
  {
    id: "BUS-1204",
    route: "12",
    routeName: "Pune Stn - Univ. Rd",
    status: "Delayed",
    speed: 19,
    eta: "11 min",
    nextStop: "University Road Gate",
    lat: 18.5460,
    lng: 73.8290,
    driver: "Tukaram Jagtap",
    conductor: "Kiran Salunke",
    regNo: "MH-12-RN-9205",
    type: "CNG Standard",
    fuelBattery: 49,
    occupancy: 91,
    delayMinutes: 9,
    lastPing: "4s ago",
    engineTemp: "84°C",
    depot: "Shivaji Nagar Central Depot"
  }
];

export const INITIAL_ROUTES: Route[] = [
  {
    id: "12",
    code: "R-12",
    name: "Pune Station ⇄ University Road via Sancheti Chowk",
    status: "Congested",
    delayMin: 14,
    busesActive: 16,
    distanceKm: 9.4,
    avgTripTime: "38 min",
    color: "#DC2626",
    waypoints: [
      [18.5284, 73.8744],
      [18.5280, 73.8510],
      [18.5314, 73.8446],
      [18.5218, 73.8412],
      [18.5360, 73.8340],
      [18.5529, 73.8260]
    ]
  },
  {
    id: "12B",
    code: "R-12B (AI Alt)",
    name: "Pune Station ⇄ University Road via SB Road (AI Dynamic Bypass)",
    status: "Smooth",
    delayMin: 4,
    busesActive: 6,
    distanceKm: 10.1,
    avgTripTime: "24 min",
    color: "#10B981",
    waypoints: [
      [18.5284, 73.8744],
      [18.5230, 73.8580],
      [18.5167, 73.8415],
      [18.5330, 73.8310],
      [18.5529, 73.8260]
    ]
  },
  {
    id: "45",
    code: "R-45",
    name: "Swargate ⇄ Hadapsar Gadital",
    status: "Moderate",
    delayMin: 7,
    busesActive: 22,
    distanceKm: 11.2,
    avgTripTime: "34 min",
    color: "#F59E0B",
    waypoints: [
      [18.5018, 73.8580],
      [18.5050, 73.8750],
      [18.5040, 73.9010],
      [18.5020, 73.9270]
    ]
  },
  {
    id: "101",
    code: "R-101",
    name: "Kothrud Stand ⇄ Viman Nagar",
    status: "Normal",
    delayMin: 3,
    busesActive: 28,
    distanceKm: 18.6,
    avgTripTime: "52 min",
    color: "#2563EB",
    waypoints: [
      [18.5074, 73.8077],
      [18.5167, 73.8415],
      [18.5280, 73.8510],
      [18.5430, 73.8820],
      [18.5679, 73.9143]
    ]
  },
  {
    id: "8",
    code: "R-8",
    name: "Katraj Hub ⇄ Pune Railway Station",
    status: "Normal",
    delayMin: 5,
    busesActive: 18,
    distanceKm: 12.0,
    avgTripTime: "40 min",
    color: "#059669",
    waypoints: [
      [18.4575, 73.8677],
      [18.4810, 73.8620],
      [18.5018, 73.8580],
      [18.5284, 73.8744]
    ]
  }
];

export const INITIAL_STOPS: StopsData = {
  stops: [
    { id: "ST01", name: "Pune Railway Station", lat: 18.5284, lng: 73.8744, routes: ["12", "12B", "8", "101"], demand: "VERY HIGH", waitingPassengers: 142 },
    { id: "ST02", name: "Shivaji Nagar Bus Terminus", lat: 18.5314, lng: 73.8446, routes: ["12", "12B", "45", "101"], demand: "HIGH", waitingPassengers: 98 },
    { id: "ST03", name: "FC Road (Fergusson College)", lat: 18.5218, lng: 73.8412, routes: ["12", "12B"], demand: "HIGH", waitingPassengers: 85 },
    { id: "ST04", name: "Deccan Gymkhana", lat: 18.5167, lng: 73.8415, routes: ["12", "45"], demand: "MEDIUM", waitingPassengers: 64 },
    { id: "ST05", name: "University Road (Savitribai Phule)", lat: 18.5529, lng: 73.8260, routes: ["12", "12B", "101"], demand: "VERY HIGH", waitingPassengers: 180 },
    { id: "ST06", name: "Swargate Central Bus Hub", lat: 18.5018, lng: 73.8580, routes: ["45", "8"], demand: "VERY HIGH", waitingPassengers: 210 },
    { id: "ST07", name: "Hadapsar Depot / Gadital", lat: 18.5020, lng: 73.9270, routes: ["45"], demand: "HIGH", waitingPassengers: 115 },
    { id: "ST08", name: "Main Junction (Sancheti Chowk)", lat: 18.5280, lng: 73.8510, routes: ["12", "101"], demand: "CRITICAL", waitingPassengers: 160 },
    { id: "ST09", name: "Kothrud Stand (Paud Road)", lat: 18.5074, lng: 73.8077, routes: ["101"], demand: "MEDIUM", waitingPassengers: 72 },
    { id: "ST10", name: "Viman Nagar (Symbiosis Corner)", lat: 18.5679, lng: 73.9143, routes: ["101"], demand: "HIGH", waitingPassengers: 130 },
    { id: "ST11", name: "Katraj Snake Park Junction", lat: 18.4575, lng: 73.8677, routes: ["8"], demand: "MEDIUM", waitingPassengers: 58 }
  ],
  depots: [
    { id: "DP01", name: "Shivaji Nagar Central Depot", lat: 18.5340, lng: 73.8400, capacity: 220, availableStandby: 14 },
    { id: "DP02", name: "Swargate Terminal Depot", lat: 18.4980, lng: 73.8560, capacity: 260, availableStandby: 9 },
    { id: "DP03", name: "Hadapsar Workshop Depot", lat: 18.5040, lng: 73.9310, capacity: 180, availableStandby: 6 },
    { id: "DP04", name: "Kothrud Depot", lat: 18.5050, lng: 73.8040, capacity: 140, availableStandby: 8 }
  ]
};

export const INITIAL_DEMAND: PassengerDemand = {
  summary: {
    index: 78,
    status: "High Peak Demand",
    totalWaitingPassengers: 1314,
    topSurgeSector: "University Road / FC Road Corridor",
    peakTimeWindow: "17:30 - 19:45 IST",
    standbyDispatchedToday: 14
  },
  sectors: [
    {
      sector: "University Road (SPPU Campus)",
      currentDemand: 610,
      predictedDemand: 850,
      surgePercentage: "+39.3%",
      status: "VERY HIGH",
      recommendedBuses: 6,
      availableBuses: 4,
      deficit: 2,
      routesImpacted: ["12", "12B", "101"],
      action: "Deploy 2 standby electric buses from Shivaji Nagar Depot"
    },
    {
      sector: "Swargate Central Bus Hub",
      currentDemand: 720,
      predictedDemand: 910,
      surgePercentage: "+26.4%",
      status: "VERY HIGH",
      recommendedBuses: 8,
      availableBuses: 7,
      deficit: 1,
      routesImpacted: ["45", "8"],
      action: "Deploy 1 feeder mini-bus from Swargate Depot"
    },
    {
      sector: "Pune Railway Station Hub",
      currentDemand: 580,
      predictedDemand: 690,
      surgePercentage: "+19.0%",
      status: "HIGH",
      recommendedBuses: 7,
      availableBuses: 7,
      deficit: 0,
      routesImpacted: ["12", "12B", "8", "101"],
      action: "Balanced, maintain 5-minute headway"
    },
    {
      sector: "Viman Nagar IT Corridor",
      currentDemand: 440,
      predictedDemand: 590,
      surgePercentage: "+34.1%",
      status: "HIGH",
      recommendedBuses: 6,
      availableBuses: 5,
      deficit: 1,
      routesImpacted: ["101"],
      action: "Short-loop Route 101 service from Yerawada"
    },
    {
      sector: "Hadapsar Industrial Belt",
      currentDemand: 380,
      predictedDemand: 450,
      surgePercentage: "+18.4%",
      status: "MEDIUM",
      recommendedBuses: 5,
      availableBuses: 5,
      deficit: 0,
      routesImpacted: ["45"],
      action: "Normal schedule sufficient"
    }
  ],
  hourlyTrend: [
    { time: "06:00", actual: 240, predicted: 250 },
    { time: "08:00", actual: 680, predicted: 710 },
    { time: "10:00", actual: 920, predicted: 890 },
    { time: "12:00", actual: 510, predicted: 530 },
    { time: "14:00", actual: 480, predicted: 500 },
    { time: "16:00", actual: 750, predicted: 780 },
    { time: "17:30", actual: 1120, predicted: 1280 },
    { time: "19:00", actual: 1050, predicted: 1180 },
    { time: "21:00", actual: 620, predicted: 640 },
    { time: "23:00", actual: 210, predicted: 190 }
  ]
};

export const INITIAL_TRAFFIC: TrafficData = {
  summary: {
    citywideCongestionIndex: "67%",
    activeBottlenecks: 4,
    avgFleetSpeed: "31.4 km/h",
    delayedCorridors: ["Route 12 (Sancheti Chowk)", "Route 45 (Hadapsar Gadital)"]
  },
  bottlenecks: [
    {
      id: "BN-01",
      name: "Main Junction (Sancheti Chowk)",
      corridor: "Shivaji Nagar to Deccan / University Rd",
      severity: "CRITICAL",
      currentTraffic: "High",
      predictedTraffic: "Severe",
      avgSpeed: "11 km/h",
      normalSpeed: "35 km/h",
      speedDrop: "-68%",
      cause: "Flyover lane restriction & metro pillar alignment",
      recommendedBypass: "Route 12B via Senapati Bapat (SB) Road",
      timeSavedViaBypass: "14 minutes",
      coordinates: [18.5280, 73.8510]
    },
    {
      id: "BN-02",
      name: "Hadapsar Gadital Flyover Approach",
      corridor: "Swargate to Hadapsar",
      severity: "HIGH",
      currentTraffic: "Medium",
      predictedTraffic: "High",
      avgSpeed: "16 km/h",
      normalSpeed: "40 km/h",
      speedDrop: "-60%",
      cause: "Evening market spillover and intercity bus docking",
      recommendedBypass: "Magarpatta South Ring Feeder",
      timeSavedViaBypass: "9 minutes",
      coordinates: [18.5020, 73.9270]
    },
    {
      id: "BN-03",
      name: "Deccan Gymkhana Bus Stop Belt",
      corridor: "FC Road to Deccan",
      severity: "MODERATE",
      currentTraffic: "Medium",
      predictedTraffic: "Medium",
      avgSpeed: "22 km/h",
      normalSpeed: "35 km/h",
      speedDrop: "-37%",
      cause: "Pedestrian signal cycle extension",
      recommendedBypass: "Jangali Maharaj (JM) Road one-way loop",
      timeSavedViaBypass: "5 minutes",
      coordinates: [18.5167, 73.8415]
    },
    {
      id: "BN-04",
      name: "Katraj Ghat Entry",
      corridor: "Katraj to Swargate",
      severity: "LOW",
      currentTraffic: "Low",
      predictedTraffic: "Medium",
      avgSpeed: "28 km/h",
      normalSpeed: "45 km/h",
      speedDrop: "-37%",
      cause: "Truck lane merging",
      recommendedBypass: "Old Tunnel Corridor",
      timeSavedViaBypass: "3 minutes",
      coordinates: [18.4575, 73.8677]
    }
  ],
  rerouteSimulation: {
    originalRoute: {
      name: "Route 12 (Via Sancheti Chowk)",
      distance: "9.4 km",
      estimatedTravelTime: "38 min",
      congestionLevel: "Severe (84%)",
      avgSpeed: "14.8 km/h",
      co2Emission: "18.2 kg",
      riskScore: 88
    },
    dynamicBypassRoute: {
      name: "Route 12B (Via Senapati Bapat Road AI Bypass)",
      distance: "10.1 km",
      estimatedTravelTime: "24 min",
      congestionLevel: "Low (22%)",
      avgSpeed: "32.4 km/h",
      co2Emission: "11.6 kg",
      riskScore: 18
    },
    differential: {
      travelTimeSaved: "14 minutes (-36.8%)",
      punctualityGain: "+38%",
      fuelCo2Saved: "36.2% reduction",
      commuterSatisfaction: "+4.2/5"
    }
  }
};

export const INITIAL_ALERTS: Alert[] = [
  {
    id: "ALT-901",
    level: "critical",
    title: "CRITICAL: Route Deviation & Telemetry Halt",
    busId: "BUS-1102",
    route: "Route 101",
    location: "Main Junction (Sancheti Chowk)",
    time: "15:42 IST",
    detail: "Bus deviated 450m from designated corridor. Engine temperature sensor spiked to 98°C. Vehicle stationary.",
    actionLabel: "View on Map",
    status: "Unresolved",
    coordinates: [18.5281, 73.8509],
    category: "Telemetry Halt"
  },
  {
    id: "ALT-902",
    level: "warning",
    title: "WARNING: Severe Traffic Congestion Detected",
    busId: "MULTIPLE",
    route: "Route 12",
    location: "Sancheti Chowk Flyover Approach",
    time: "17:15 IST",
    detail: "Average vehicular speed dropped to 9 km/h. Expected service delay: +15 minutes.",
    actionLabel: "View Route & Reroute",
    status: "Active",
    coordinates: [18.5280, 73.8510],
    category: "Congestion"
  },
  {
    id: "ALT-903",
    level: "warning",
    title: "WARNING: High Passenger Overcrowding",
    busId: "BUS-1088",
    route: "Route 45",
    location: "Hadapsar Gadital Approach",
    time: "17:22 IST",
    detail: "Load sensors register 94% passenger capacity. Boarding refusal predicted at next 2 stops.",
    actionLabel: "Dispatch Standby",
    status: "Active",
    coordinates: [18.5030, 73.9180],
    category: "Overcrowding"
  },
  {
    id: "ALT-904",
    level: "info",
    title: "INFO: Battery Level Below 45%",
    busId: "BUS-1102",
    route: "Route 101",
    location: "Main Junction",
    time: "17:05 IST",
    detail: "State of Charge (SoC) reached 42%. Vehicle scheduled for fast-charging at Viman Nagar depot upon run completion.",
    actionLabel: "View Depot Chargers",
    status: "Monitoring",
    coordinates: [18.5281, 73.8509],
    category: "Battery / Energy"
  },
  {
    id: "ALT-905",
    level: "info",
    title: "INFO: Road Resurfacing Advisory",
    busId: "CIVIL",
    route: "Route 8",
    location: "Katraj Bypass Lane 3",
    time: "09:00 IST",
    detail: "Civil works until 21:00 IST. Diversion advisory active. Average slowdown 3.5 minutes.",
    actionLabel: "View Advisory",
    status: "Resolved",
    coordinates: [18.4575, 73.8677],
    category: "Civil Works"
  }
];

export const INITIAL_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: "REC-01",
    type: "DISPATCH_STANDBY",
    title: "Deploy 2 Standby E-Buses to Route 12",
    priority: "HIGH",
    status: "PENDING_APPROVAL",
    targetRoute: "12",
    depotSource: "Shivaji Nagar Central Depot",
    busesToDispatch: ["BUS-1210 (Standby)", "BUS-1211 (Standby)"],
    confidenceScore: 94.2,
    impact: {
      travelTimeReduction: "42 min aggregate delay prevented",
      passengerWaitTimeSavings: "18.5 passenger-hours saved",
      loadRelief: "Occupancy reduced from 91% to 64%"
    },
    explanationSteps: [
      {
        step: 1,
        title: "Passenger Demand Surge Detected",
        evidence: "Smart ticketing AFC tap-ins at SPPU University Road show +34% influx over baseline (850 projected passengers)."
      },
      {
        step: 2,
        title: "Fleet Saturation & Overcrowding",
        evidence: "Active buses on Route 12 report 91% average onboard occupancy; passenger comfort threshold breached."
      },
      {
        step: 3,
        title: "Predicted Downstream Bottleneck",
        evidence: "Traffic sensor computer-vision feed anticipates 14 min delays at Sancheti Chowk within the next 20 minutes."
      },
      {
        step: 4,
        title: "Optimal Proximity Asset Available",
        evidence: "Shivaji Nagar Depot (0.8 km away) has 2 charged standby e-buses ready for immediate dispatch."
      }
    ]
  },
  {
    id: "REC-02",
    type: "DYNAMIC_REROUTING",
    title: "Activate Route 12B Bypass via Senapati Bapat Road",
    priority: "HIGH",
    status: "APPROVED",
    targetRoute: "12",
    alternateRoute: "12B",
    confidenceScore: 96.8,
    impact: {
      travelTimeReduction: "14 minutes per trip saved",
      congestionAvoidance: "Avoids Sancheti Chowk 84% choke point",
      carbonAvoided: "6.6 kg CO2 per round trip"
    },
    explanationSteps: [
      {
        step: 1,
        title: "Congestion Threshold Exceeded",
        evidence: "Average speed on Sancheti Chowk corridor dropped below 12 km/h."
      },
      {
        step: 2,
        title: "Corridor Geometry Feasibility",
        evidence: "Senapati Bapat Road clear with 34 km/h free-flow transit speed."
      },
      {
        step: 3,
        title: "Commuter Stop Coverage",
        evidence: "Bypass serves major student interchange while preserving origin and destination."
      }
    ]
  },
  {
    id: "REC-03",
    type: "PREDICTIVE_MAINTENANCE",
    title: "Overnight Regenerative Brake Inspection for BUS-1024",
    priority: "MEDIUM",
    status: "SCHEDULED",
    busId: "BUS-1024",
    regNo: "MH-12-RN-4024",
    confidenceScore: 89.5,
    impact: {
      breakdownPrevention: "Prevents potential in-service brake locking",
      maintenanceCostSavings: "₹ 24,000 preventative vs emergency towing"
    },
    explanationSteps: [
      {
        step: 1,
        title: "Telemetry Thermal Anomaly",
        evidence: "Brake pad sensor temperature trending +12% above mean over past 72 operational hours."
      },
      {
        step: 2,
        title: "Preventive Window Alignment",
        evidence: "Bus scheduled for shift-end return to Shivaji Nagar depot at 21:30 IST."
      }
    ]
  }
];

export const INITIAL_API_SERVICES: ApiServiceStatus[] = [
  { service: "GPS Fleet Telemetry Stream", status: "ONLINE", protocol: "MQTT / TLS 1.3", latency: "24 ms", uptime: "99.98%" },
  { service: "Spatial GIS Route Server", status: "ONLINE", protocol: "WMS / GeoJSON", latency: "38 ms", uptime: "99.95%" },
  { service: "AI Edge Prediction Engine", status: "ONLINE", protocol: "REST / gRPC", latency: "18 ms", uptime: "99.92%" },
  { service: "Automated Fare Collection (AFC)", status: "ONLINE", protocol: "ISO 8583 / UPI", latency: "45 ms", uptime: "99.99%" },
  { service: "Traffic Police CCTV Sensor Sync", status: "ONLINE", protocol: "RTSP / AI Vision", latency: "82 ms", uptime: "98.70%" },
  { service: "National Transit Data Open API", status: "ONLINE", protocol: "GTFS-RT Feed", latency: "52 ms", uptime: "99.94%" }
];

export const INITIAL_GRIEVANCES: Grievance[] = [
  {
    ticketId: "GRV-2026-8801",
    name: "Aakash Deshmukh",
    email: "aakash.d@example.com",
    category: "Bus Delay",
    route: "12",
    description: "Route 12 bus delayed by 18 minutes at Sancheti Chowk during evening rush hour.",
    status: "In Progress",
    timestamp: "2026-09-07 16:45 IST"
  },
  {
    ticketId: "GRV-2026-8802",
    name: "Pooja Kulkarni",
    email: "pooja.k@example.com",
    category: "Overcrowding",
    route: "45",
    description: "Route 45 bus was full, could not board at Hadapsar Gadital stop.",
    status: "Resolved",
    timestamp: "2026-09-07 14:10 IST"
  }
];

export const INITIAL_KPI_AUDIT: KPIAudit = {
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
