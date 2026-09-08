/**
 * Government Public Transport Intelligence Platform (SIH)
 * Core Mock Datasets & State Configuration
 * City Model: Pune Smart City Transport Grid (PMPML / MoHUA Model)
 */

const TRANSPORT_DATA = {
  metadata: {
    systemName: "Urban Transport Intelligence System",
    ministry: "Ministry of Housing & Urban Affairs | Government of India",
    hackathonTitle: "AI-Powered Mobile Urban Intelligence Platform Using Public Transport Fleet",
    version: "v2.4-SIH2026",
    lastUpdated: "07 September 2026, 17:30 IST",
    city: "Pune Metropolitan Region",
    centerCoords: [18.5204, 73.8567],
    defaultZoom: 13
  },

  // Overview KPIs
  kpis: {
    totalFleet: 1250,
    activeBuses: 1087,
    onTimePercentage: 82,
    delayedBuses: 126,
    criticalAlerts: 8,
    passengerDemandIndex: 78,
    fuelSavedKm: "4,210 L",
    co2ReducedKg: "11,450 kg",
    avgSpeedKmh: 31.4,
    tripsCompletedToday: 4820
  },

  // Bus Stops with real Pune geographic coordinates
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

  // Depots
  depots: [
    { id: "DP01", name: "Shivaji Nagar Central Depot", lat: 18.5340, lng: 73.8400, capacity: 220, availableStandby: 14 },
    { id: "DP02", name: "Swargate Terminal Depot", lat: 18.4980, lng: 73.8560, capacity: 260, availableStandby: 9 },
    { id: "DP03", name: "Hadapsar Workshop Depot", lat: 18.5040, lng: 73.9310, capacity: 180, availableStandby: 6 },
    { id: "DP04", name: "Kothrud Depot", lat: 18.5050, lng: 73.8040, capacity: 140, availableStandby: 8 }
  ],

  // Routes
  routes: [
    {
      id: "12",
      code: "R-12",
      name: "Pune Station ⇄ University Road via Sancheti Chowk",
      status: "Congested",
      delayMin: 14,
      busesActive: 16,
      distanceKm: 9.4,
      avgTripTime: "38 min",
      waypoints: [
        [18.5284, 73.8744],
        [18.5280, 73.8510],
        [18.5314, 73.8446],
        [18.5218, 73.8412],
        [18.5360, 73.8340],
        [18.5529, 73.8260]
      ],
      color: "#DC2626" // Red for high congestion
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
      waypoints: [
        [18.5284, 73.8744],
        [18.5230, 73.8580],
        [18.5167, 73.8415],
        [18.5330, 73.8310],
        [18.5529, 73.8260]
      ],
      color: "#10B981" // Green for optimal bypass
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
      waypoints: [
        [18.5018, 73.8580],
        [18.5050, 73.8750],
        [18.5040, 73.9010],
        [18.5020, 73.9270]
      ],
      color: "#F59E0B"
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
      waypoints: [
        [18.5074, 73.8077],
        [18.5167, 73.8415],
        [18.5280, 73.8510],
        [18.5430, 73.8820],
        [18.5679, 73.9143]
      ],
      color: "#2563EB"
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
      waypoints: [
        [18.4575, 73.8677],
        [18.4810, 73.8620],
        [18.5018, 73.8580],
        [18.5284, 73.8744]
      ],
      color: "#059669"
    }
  ],

  // Live Buses Fleet
  buses: [
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
      lastPing: "Just now"
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
      lastPing: "12s ago"
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
      lastPing: "5s ago"
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
      lastPing: "Just now"
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
      lastPing: "2m ago"
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
      lastPing: "18s ago"
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
      lastPing: "10m ago"
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
      lastPing: "35m ago"
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
      lastPing: "Just now"
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
      lastPing: "8s ago"
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
      lastPing: "14s ago"
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
      lastPing: "4s ago"
    }
  ],

  // AI Decision Engine Insights
  aiInsights: {
    delayPrediction: {
      route: "Route 12",
      currentDelay: "8 min",
      predictedDelay: "14 min",
      riskLevel: "HIGH",
      reason: "High traffic bottleneck detected at Sancheti Chowk due to construction lane narrowing.",
      confidence: "94.2%",
      historicalModel: "LSTM-GRU Urban Traffic Flow v3.2"
    },

    demandPrediction: {
      area: "University Road (SPPU Campus)",
      currentDemand: "HIGH",
      predictedDemand: "VERY HIGH",
      currentDemandPass: 610,
      predictedDemandPass: 850,
      recommendedBuses: 6,
      availableBuses: 4,
      deficit: 2,
      peakWindow: "17:30 - 19:45 IST",
      recommendation: "Deploy 2 standby electric buses from Shivaji Nagar Depot to Route 12."
    },

    trafficPrediction: {
      location: "Main Junction (Sancheti Chowk)",
      currentTraffic: "Medium",
      predictedTraffic: "High",
      expectedPeak: "17:45 - 18:30 IST",
      predictedAvgSpeed: "12 km/h",
      congestionIndex: "84%"
    },

    predictiveMaintenance: {
      busId: "BUS-1024",
      regNo: "MH-12-RN-4024",
      component: "Regenerative Braking & Inverter Temp",
      maintenanceRisk: "Medium (Score: 68/100)",
      telemetryAnomalies: "Brake pad thermal threshold +12% over 3 days.",
      recommendedAction: "Schedule priority overnight preventative inspection at Depot 1."
    },

    explainableDecision: {
      title: "AI Recommendation: Deploy 2 Additional Buses to Route 12",
      steps: [
        {
          num: 1,
          title: "Passenger Demand Surge Detected",
          detail: "Smart ticketing AFC tap-ins at SPPU University Road show +34% influx over baseline (850 projected passengers)."
        },
        {
          num: 2,
          title: "Fleet Saturation & Overcrowding",
          detail: "Active buses on Route 12 report 91% average onboard occupancy; passenger comfort threshold breached."
        },
        {
          num: 3,
          title: "Predicted Downstream Bottleneck",
          detail: "Traffic sensor computer-vision feed anticipates 14 min delays at Sancheti Chowk within the next 20 minutes."
        },
        {
          num: 4,
          title: "Optimal Proximity Asset Available",
          detail: "Shivaji Nagar Depot (0.8 km away) has 2 charged standby e-buses ready for immediate dispatch."
        }
      ],
      impactEstimation: "Deploying saves an estimated 18.5 passenger-hours and avoids 42 min aggregate trip delay."
    }
  },

  // Alerts & Incidents
  alerts: [
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
      status: "Unresolved"
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
      status: "Active"
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
      status: "Active"
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
      status: "Monitoring"
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
      status: "Resolved"
    }
  ],

  // Citizen Transit Live ETA Feed
  citizenFeed: {
    popularRoutes: [
      { route: "12", dest: "University Road via FC Road", nextBus: "3 min", status: "On Time", fare: "₹ 15" },
      { route: "12B", dest: "University Road via SB Road Bypass", nextBus: "2 min", status: "Fast Route", fare: "₹ 15" },
      { route: "45", dest: "Hadapsar Gadital Hub", nextBus: "4 min", status: "On Time", fare: "₹ 20" },
      { route: "101", dest: "Viman Nagar Corner", nextBus: "6 min", status: "Moderate", fare: "₹ 25" },
      { route: "8", dest: "Katraj Snake Park Junction", nextBus: "8 min", status: "On Time", fare: "₹ 20" }
    ],
    serviceAdvisories: [
      "Route 12 experiencing 8-12 min delays near Sancheti Chowk. Commuters advised to board Route 12B for 14 min faster travel.",
      "Green Mobility Initiative: 100% of Route 12 and 12B buses operate on zero-emission electric battery technology.",
      "Student Concession Passes: Digital verification available on counter 4 at Shivaji Nagar Terminus."
    ]
  },

  // API & Service Status Monitoring
  apiStatus: [
    { service: "GPS Fleet Telemetry Stream", status: "ONLINE", protocol: "MQTT / TLS 1.3", latency: "24 ms", uptime: "99.98%" },
    { service: "Spatial GIS Route Server", status: "ONLINE", protocol: "WMS / GeoJSON", latency: "38 ms", uptime: "99.95%" },
    { service: "AI Edge Prediction Engine", status: "ONLINE", protocol: "REST / gRPC", latency: "18 ms", uptime: "99.92%" },
    { service: "Automated Fare Collection (AFC)", status: "ONLINE", protocol: "ISO 8583 / UPI", latency: "45 ms", uptime: "99.99%" },
    { service: "Traffic Police CCTV Sensor Sync", status: "ONLINE", protocol: "RTSP / AI Vision", latency: "82 ms", uptime: "98.70%" },
    { service: "National Transit Data Open API", status: "ONLINE", protocol: "GTFS-RT Feed", latency: "52 ms", uptime: "99.94%" }
  ],

  // Multi-language Dictionaries
  translations: {
    en: {
      portalTitle: "Urban Transport Intelligence System",
      subTitle: "AI-Powered Mobile Urban Intelligence Platform Using Public Transport Fleet",
      govIndia: "Government of India",
      ministry: "Ministry of Housing & Urban Affairs",
      dashboard: "Dashboard",
      liveFleet: "Live Fleet",
      gisMap: "GIS Map",
      aiAnalytics: "AI Analytics",
      demandPred: "Demand Prediction",
      trafficRoutes: "Traffic & Routes",
      alertsIncidents: "Alerts & Incidents",
      passengerInfo: "Passenger Portal",
      reports: "Reports",
      dataApis: "Data & APIs",
      administration: "Administration",
      totalFleet: "Total Fleet",
      activeBuses: "Active Buses",
      onTimeBuses: "On-Time Buses",
      delayedBuses: "Delayed Buses",
      criticalAlerts: "Critical Alerts",
      passengerDemand: "Passenger Demand",
      quickActions: "Quick Actions",
      trackBus: "Track Bus",
      viewMap: "View GIS Map",
      viewAlerts: "View Alerts",
      checkDemand: "Check Demand",
      generateReport: "Generate Report",
      whyAiDecision: "Why did AI make this decision?",
      approveAction: "Approve & Execute Action",
      rerouteAction: "Apply Recommended Reroute",
      statusOnTime: "On Time",
      statusDelayed: "Delayed",
      statusCritical: "Critical",
      statusOffline: "Offline",
      statusMaintenance: "Maintenance"
    },
    hi: {
      portalTitle: "शहरी परिवहन आसूचना प्रणाली",
      subTitle: "सार्वजनिक परिवहन बेड़े का उपयोग करते हुए एआई-संचालित शहरी आसूचना मंच",
      govIndia: "भारत सरकार",
      ministry: "आवासन और शहरी कार्य मंत्रालय",
      dashboard: "डैशबोर्ड",
      liveFleet: "लाइव बेड़ा",
      gisMap: "जीआईएस मानचित्र",
      aiAnalytics: "एआई विश्लेषण",
      demandPred: "मांग पूर्वानुमान",
      trafficRoutes: "यातायात एवं मार्ग",
      alertsIncidents: "चेतावनी एवं घटनाएं",
      passengerInfo: "यात्री पोर्टल",
      reports: "रिपोर्ट",
      dataApis: "डेटा एवं एपीआई",
      administration: "प्रशासन",
      totalFleet: "कुल बेड़ा",
      activeBuses: "सक्रिय बसें",
      onTimeBuses: "समय पर बसें",
      delayedBuses: "विलंबित बसें",
      criticalAlerts: "गंभीर चेतावनियां",
      passengerDemand: "यात्री मांग",
      quickActions: "त्वरित कार्रवाई",
      trackBus: "बस ट्रैक करें",
      viewMap: "मानचित्र देखें",
      viewAlerts: "चेतावनियां देखें",
      checkDemand: "मांग जांचें",
      generateReport: "रिपोर्ट बनाएं",
      whyAiDecision: "एआई ने यह निर्णय क्यों लिया?",
      approveAction: "स्वीकृत करें एवं लागू करें",
      rerouteAction: "अनुशंसित मार्ग लागू करें",
      statusOnTime: "समय पर",
      statusDelayed: "विलंबित",
      statusCritical: "गंभीर",
      statusOffline: "ऑफ़लाइन",
      statusMaintenance: "रखरखाव"
    },
    mr: {
      portalTitle: "शहरी सार्वजनिक वाहतूक गुप्तवार्ता प्रणाली",
      subTitle: "सार्वजनिक वाहतूक ताफ्याद्वारे एआय-सक्षम नागरी गतिशीलता मंच",
      govIndia: "भारत सरकार",
      ministry: "गृहनिर्माण आणि शहरी व्यवहार मंत्रालय",
      dashboard: "डॅशबोर्ड",
      liveFleet: "थेट बस ताफा",
      gisMap: "जीआयएस नकाशा",
      aiAnalytics: "एआय विश्लेषण",
      demandPred: "प्रवासी मागणी अंदाज",
      trafficRoutes: "वाहतूक व मार्ग",
      alertsIncidents: "सूचना व घटना",
      passengerInfo: "प्रवासी कक्ष",
      reports: "अहवाल",
      dataApis: "डेटा व एपीआय",
      administration: "प्रशासन",
      totalFleet: "एकूण बस ताफा",
      activeBuses: "सक्रिय बसेस",
      onTimeBuses: "वेळेवर बसेस",
      delayedBuses: "उशिरा बसेस",
      criticalAlerts: "तातडीच्या सूचना",
      passengerDemand: "प्रवासी मागणी",
      quickActions: "तातडीच्या कृती",
      trackBus: "बस ट्रॅक करा",
      viewMap: "नकाशा पहा",
      viewAlerts: "सूचना पहा",
      checkDemand: "मागणी तपासा",
      generateReport: "अहवाल तयार करा",
      whyAiDecision: "एआय ने हा निर्णय का घेतला?",
      approveAction: "मंजूर करा व अंमलात आणा",
      rerouteAction: "पर्यायी मार्ग लागू करा",
      statusOnTime: "वेळेवर",
      statusDelayed: "उशीर",
      statusCritical: "गंभीर",
      statusOffline: "ऑफलाईन",
      statusMaintenance: "देखभाल"
    }
  }
};

// Expose globally
if (typeof window !== 'undefined') {
  window.TRANSPORT_DATA = TRANSPORT_DATA;
}
