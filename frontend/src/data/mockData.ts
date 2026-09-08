import { 
  UrbanObservation, 
  AIDetectionCategory, 
  DecisionRecommendation, 
  FleetUnit, 
  DataQualityInfo, 
  RecentActivityItem 
} from '../types';

export const KPI_METRICS = {
  activeVehicles: {
    value: 128,
    label: "Active Vehicles",
    subtext: "Vehicles currently contributing data",
    trend: "+0.43% ↑",
    isPositive: true,
    theme: "green"
  },
  dataPointsCollected: {
    value: "24,860",
    label: "Data Points Collected",
    subtext: "Today",
    trend: "+4.35% ↑",
    isPositive: true,
    theme: "orange"
  },
  roadConditions: {
    value: "94% Normal",
    label: "Road Conditions",
    subtext: "Current assessment",
    trend: "+2.59% ↑",
    isPositive: true,
    theme: "purple"
  },
  activeAlerts: {
    value: "07",
    label: "Active Alerts",
    subtext: "Require attention",
    trend: "-0.96% ↓",
    isPositive: true,
    theme: "blue"
  },
  issuesDetected: {
    value: 36,
    label: "Issues Detected",
    subtext: "Today",
    trend: "+3.12% ↑",
    isPositive: false,
    theme: "rose"
  },
  coverage: {
    value: "82 km",
    label: "Coverage",
    subtext: "Monitored routes",
    trend: "+1.85% ↑",
    isPositive: true,
    theme: "cyan"
  }
};

export const URBAN_OBSERVATIONS: UrbanObservation[] = [
  {
    id: "OBS-01",
    type: "pothole",
    title: "Deep Pothole Anomaly",
    location: "Sector 4, Shivaji Nagar",
    sector: "Central Corridor",
    lat: 18.5314,
    lng: 73.8446,
    severity: "high",
    detectedByVehicle: "Vehicle 102",
    route: "Route 12",
    timestamp: "10:42 AM",
    metric: "Depth: 8.2cm | IRI Roughness: 5.8 m/km",
    status: "Pending",
    confidence: 96.4,
    description: "Repeated vertical acceleration spike (2.4g) verified by vision camera edge model."
  },
  {
    id: "OBS-02",
    type: "traffic",
    title: "Traffic Congestion Bottleneck",
    location: "Main Road (Sancheti Chowk)",
    sector: "Central Corridor",
    lat: 18.5280,
    lng: 73.8510,
    severity: "medium",
    detectedByVehicle: "Vehicle 105",
    route: "Route 12",
    timestamp: "10:38 AM",
    metric: "Speed: 9 km/h (Normal: 35 km/h) | -74% Drop",
    status: "Monitoring",
    confidence: 98.2,
    description: "Traffic velocity below 10 km/h for >12 minutes. AI suggests Route 12B bypass."
  },
  {
    id: "OBS-03",
    type: "infrastructure",
    title: "Damaged Median Barrier",
    location: "Zone 2, Hadapsar Flyover Approach",
    sector: "East Industrial",
    lat: 18.5040,
    lng: 73.9010,
    severity: "high",
    detectedByVehicle: "Vehicle 117",
    route: "Route 8",
    timestamp: "10:31 AM",
    metric: "12m Damaged Guard Rail | Collision Risk",
    status: "Action Required",
    confidence: 94.1,
    description: "Camera edge detection identified bent metal railing protruding into right-hand lane."
  },
  {
    id: "OBS-04",
    type: "obstruction",
    title: "Severe Waterlogging / Sinkhole Hazard",
    location: "Sector 7 Underpass, Swargate",
    sector: "South Hub",
    lat: 18.5018,
    lng: 73.8580,
    severity: "critical",
    detectedByVehicle: "Vehicle 108",
    route: "Route 45",
    timestamp: "10:15 AM",
    metric: "Water Depth: ~18cm | Slowdown: 85%",
    status: "Action Required",
    confidence: 99.0,
    description: "Significant road immersion detected. Lane impassable for low-clearance vehicles."
  },
  {
    id: "OBS-05",
    type: "pothole",
    title: "Pavement Surface Degradation",
    location: "University Road Outer Ring",
    sector: "North University",
    lat: 18.5460,
    lng: 73.8290,
    severity: "medium",
    detectedByVehicle: "Vehicle 124",
    route: "Route 101",
    timestamp: "09:50 AM",
    metric: "Depth: 4.8cm | Length: 1.8m",
    status: "Monitoring",
    confidence: 91.5,
    description: "Multiple vibration micro-shocks logged by bus fleet chassis sensors."
  },
  {
    id: "OBS-06",
    type: "infrastructure",
    title: "Non-Functional Streetlight Cluster",
    location: "Kothrud Stand Approach Road",
    sector: "West Tech Corridor",
    lat: 18.5074,
    lng: 73.8077,
    severity: "low",
    detectedByVehicle: "Vehicle 132",
    route: "Route 101",
    timestamp: "09:12 AM",
    metric: "4 Adjacent Poles Dark During Dusk Run",
    status: "Pending",
    confidence: 89.7,
    description: "Ambient lux sensor recorded 0.4 lux below threshold on primary corridor."
  },
  {
    id: "OBS-07",
    type: "obstruction",
    title: "Stalled Commercial Truck in Transit Lane",
    location: "FC Road Deccan Corner",
    sector: "Central Corridor",
    lat: 18.5167,
    lng: 73.8415,
    severity: "high",
    detectedByVehicle: "Vehicle 102",
    route: "Route 12",
    timestamp: "08:45 AM",
    metric: "Lane Capacity Reduced by 50%",
    status: "Resolved",
    confidence: 97.5,
    description: "Obstruction cleared by traffic police towing unit; normal transit flow restored."
  }
];

export const AI_DETECTION_CATEGORIES: AIDetectionCategory[] = [
  {
    id: "cat-pothole",
    type: "pothole",
    name: "Pothole Detection",
    count: 14,
    severity: "high",
    icon: "Activity",
    description: "Vertical accelerometer peaks & camera optical defect classification",
    confidenceAvg: 95.8,
    primarySensor: "IMU 6-Axis + RGB Vision"
  },
  {
    id: "cat-traffic",
    type: "traffic",
    name: "Traffic Congestion",
    count: 8,
    severity: "medium",
    icon: "Zap",
    description: "Corridor velocity deviation vs historical free-flow baseline",
    confidenceAvg: 98.4,
    primarySensor: "GPS Velocity & Dwell Telemetry"
  },
  {
    id: "cat-infrastructure",
    type: "infrastructure",
    name: "Damaged Infrastructure",
    count: 6,
    severity: "high",
    icon: "ShieldAlert",
    description: "Guard rail bends, broken streetlights & pavement edge damage",
    confidenceAvg: 93.2,
    primarySensor: "YOLOv8 Edge Vision Node"
  },
  {
    id: "cat-obstruction",
    type: "obstruction",
    name: "Road Obstruction",
    count: 5,
    severity: "critical",
    icon: "AlertOctagon",
    description: "Stalled vehicles, debris & localized water accumulation",
    confidenceAvg: 96.1,
    primarySensor: "LiDAR / Ultrasonic + Vision"
  },
  {
    id: "cat-other",
    type: "other",
    name: "Other Issues",
    count: 3,
    severity: "low",
    icon: "Layers",
    description: "Faded lane markings, minor surface rutting & curb damage",
    confidenceAvg: 88.6,
    primarySensor: "Optical Surface Profiler"
  }
];

export const DECISION_RECOMMENDATIONS: DecisionRecommendation[] = [
  {
    id: "REC-01",
    order: 1,
    title: "Inspect road damage in Sector 4",
    reason: "Repeated observations reported by multiple vehicles.",
    severity: "high",
    location: "Sector 4, Shivaji Nagar",
    suggestedAction: "Dispatch Municipal PWD Pothole Repair Unit for immediate cold-mix patch.",
    actionLabel: "Dispatch PWD Gang",
    status: "Pending",
    detectingVehiclesCount: 4
  },
  {
    id: "REC-02",
    order: 2,
    title: "Monitor congestion near Main Road",
    reason: "Traffic density increased during the monitored period.",
    severity: "medium",
    location: "Main Road / Sancheti Chowk",
    suggestedAction: "Coordinate with Traffic Police to extend green signal phase by 15s or activate Route 12B bypass.",
    actionLabel: "Adjust Signal Timing",
    status: "Pending",
    detectingVehiclesCount: 6
  },
  {
    id: "REC-03",
    order: 3,
    title: "Schedule infrastructure inspection in Zone 2",
    reason: "Multiple observations indicate possible infrastructure damage.",
    severity: "high",
    location: "Zone 2, Hadapsar Flyover",
    suggestedAction: "Issue maintenance ticket to Highway Authority for median barrier restoration.",
    actionLabel: "Issue Work Order",
    status: "Pending",
    detectingVehiclesCount: 3
  }
];

export const FLEET_UNITS: FleetUnit[] = [
  {
    id: "Vehicle 102",
    vehicleNumber: "MH-12-RN-4024",
    route: "Route 12",
    routeName: "Pune Stn - Univ. Rd",
    status: "Active",
    speed: 32,
    driver: "Ramesh Jadhav",
    lastUpdate: "10:42 AM",
    lat: 18.5295,
    lng: 73.8480,
    propulsion: "Electric AC (Olectra)",
    batteryFuel: 68,
    sensorHealth: "Optimal"
  },
  {
    id: "Vehicle 117",
    vehicleNumber: "MH-12-RN-5120",
    route: "Route 8",
    routeName: "Katraj - Pune Stn",
    status: "Active",
    speed: 24,
    driver: "Amit Kulkarni",
    lastUpdate: "10:41 AM",
    lat: 18.5042,
    lng: 73.8820,
    propulsion: "Electric AC",
    batteryFuel: 84,
    sensorHealth: "Optimal"
  },
  {
    id: "Vehicle 124",
    vehicleNumber: "MH-12-RN-7011",
    route: "Route 5",
    routeName: "Hadapsar Depot Loop",
    status: "Data Sync",
    speed: 0,
    driver: "Depot Standby Team",
    lastUpdate: "10:40 AM",
    lat: 18.5040,
    lng: 73.9310,
    propulsion: "Electric Midi",
    batteryFuel: 92,
    sensorHealth: "Calibrating"
  },
  {
    id: "Vehicle 108",
    vehicleNumber: "MH-12-RN-5121",
    route: "Route 45",
    routeName: "Swargate - Hadapsar",
    status: "Active",
    speed: 38,
    driver: "Vikas Shinde",
    lastUpdate: "10:39 AM",
    lat: 18.5030,
    lng: 73.9180,
    propulsion: "Diesel BS-VI",
    batteryFuel: 52,
    sensorHealth: "Optimal"
  },
  {
    id: "Vehicle 105",
    vehicleNumber: "MH-12-RN-4025",
    route: "Route 12",
    routeName: "Pune Stn - Univ. Rd",
    status: "Active",
    speed: 28,
    driver: "Suresh Patil",
    lastUpdate: "10:37 AM",
    lat: 18.5235,
    lng: 73.8420,
    propulsion: "CNG Standard",
    batteryFuel: 76,
    sensorHealth: "Optimal"
  },
  {
    id: "Vehicle 132",
    vehicleNumber: "MH-12-RN-6204",
    route: "Route 101",
    routeName: "Kothrud - Viman Nagar",
    status: "Active",
    speed: 34,
    driver: "Rajesh Gaikwad",
    lastUpdate: "10:36 AM",
    lat: 18.5281,
    lng: 73.8509,
    propulsion: "Electric AC (JBM)",
    batteryFuel: 42,
    sensorHealth: "Optimal"
  },
  {
    id: "Vehicle 140",
    vehicleNumber: "MH-12-RN-6207",
    route: "Route 8",
    routeName: "Katraj - Pune Stn",
    status: "Active",
    speed: 30,
    driver: "Sunil Pawar",
    lastUpdate: "10:34 AM",
    lat: 18.5140,
    lng: 73.8370,
    propulsion: "Electric AC",
    batteryFuel: 79,
    sensorHealth: "Optimal"
  },
  {
    id: "Vehicle 112",
    vehicleNumber: "MH-12-RN-8410",
    route: "Route 101",
    routeName: "Viman Nagar Stand",
    status: "Data Sync",
    speed: 0,
    driver: "Nitin Bhalerao",
    lastUpdate: "10:32 AM",
    lat: 18.5580,
    lng: 73.9020,
    propulsion: "Electric AC",
    batteryFuel: 65,
    sensorHealth: "Calibrating"
  }
];

export const DATA_QUALITY_METRICS: DataQualityInfo = {
  gpsStatus: "Operational",
  sensorStatus: "Operational",
  aiProcessing: "Operational",
  dataSyncPercent: 98,
  totalPacketsToday: 24860,
  lastSyncTimestamp: "08 Sep 2026, 10:42 AM",
  activeNodes: 128,
  edgeLatencyMs: 38
};

export const RECENT_ACTIVITY_ITEMS: RecentActivityItem[] = [
  {
    id: "ACT-01",
    time: "10:42 AM",
    message: "Vehicle 102 detected road damage (8cm pothole, Sector 4)",
    type: "pothole",
    vehicleId: "Vehicle 102",
    location: "Sector 4, Shivaji Nagar"
  },
  {
    id: "ACT-02",
    time: "10:38 AM",
    message: "Traffic congestion detected on Main Road corridor (speed 9 km/h)",
    type: "traffic",
    vehicleId: "Vehicle 105",
    location: "Main Road (Sancheti Chowk)"
  },
  {
    id: "ACT-03",
    time: "10:31 AM",
    message: "Infrastructure observation received: bent median barrier in Zone 2",
    type: "infrastructure",
    vehicleId: "Vehicle 117",
    location: "Zone 2 Hadapsar Flyover"
  },
  {
    id: "ACT-04",
    time: "10:24 AM",
    message: "Vehicle 117 uploaded sensor batch (1,200 telemetry points)",
    type: "telemetry",
    vehicleId: "Vehicle 117",
    location: "Hadapsar Hub"
  },
  {
    id: "ACT-05",
    time: "10:15 AM",
    message: "Waterlogging advisory flagged by Vehicle 108 (Sector 7 Underpass)",
    type: "alert",
    vehicleId: "Vehicle 108",
    location: "Sector 7 Underpass"
  },
  {
    id: "ACT-06",
    time: "10:04 AM",
    message: "Vehicle 105 auto-calibrated IMU accelerometer on Route 12",
    type: "telemetry",
    vehicleId: "Vehicle 105",
    location: "FC Road"
  },
  {
    id: "ACT-07",
    time: "09:52 AM",
    message: "Fleet sync completed: 116 of 128 vehicles reporting live telemetry",
    type: "telemetry",
    location: "Metropolitan Operations Center"
  }
];

export const URBAN_INTELLIGENCE_SUMMARY = {
  roadCondition: {
    normal: 72,
    moderate: 20,
    poor: 8,
    statusText: "94% Satisfactory Coverage"
  },
  trafficCondition: {
    low: 45,
    moderate: 38,
    high: 17,
    statusText: "Moderate Transit Speed (26.8 km/h)"
  },
  infrastructure: {
    good: 81,
    needsInspection: 14,
    critical: 5,
    statusText: "81% Infrastructure Healthy"
  }
};

/* --- Real-Time Fleet Route Simulation Engine --- */
export const VEHICLE_SIMULATION_ROUTES: Record<string, [number, number][]> = {
  "Vehicle 102": [
    [18.5284, 73.8744], [18.5292, 73.8680], [18.5280, 73.8580], [18.5280, 73.8510],
    [18.5314, 73.8446], [18.5250, 73.8420], [18.5218, 73.8412], [18.5295, 73.8380],
    [18.5360, 73.8340], [18.5460, 73.8290], [18.5529, 73.8260]
  ],
  "Vehicle 105": [
    [18.5529, 73.8260], [18.5460, 73.8290], [18.5360, 73.8340], [18.5295, 73.8380],
    [18.5218, 73.8412], [18.5250, 73.8420], [18.5314, 73.8446], [18.5280, 73.8510],
    [18.5280, 73.8580], [18.5292, 73.8680], [18.5284, 73.8744]
  ],
  "Vehicle 117": [
    [18.4575, 73.8677], [18.4680, 73.8660], [18.4810, 73.8620], [18.4890, 73.8600],
    [18.4960, 73.8590], [18.5018, 73.8580], [18.5140, 73.8660], [18.5220, 73.8700],
    [18.5284, 73.8744]
  ],
  "Vehicle 140": [
    [18.5284, 73.8744], [18.5220, 73.8700], [18.5140, 73.8660], [18.5018, 73.8580],
    [18.4960, 73.8590], [18.4890, 73.8600], [18.4810, 73.8620], [18.4680, 73.8660],
    [18.4575, 73.8677]
  ],
  "Vehicle 108": [
    [18.5018, 73.8580], [18.5035, 73.8660], [18.5050, 73.8750], [18.5042, 73.8820],
    [18.5040, 73.8950], [18.5040, 73.9010], [18.5035, 73.9100], [18.5030, 73.9180],
    [18.5020, 73.9270]
  ],
  "Vehicle 124": [
    [18.5040, 73.9310], [18.5080, 73.9320], [18.5120, 73.9280], [18.5100, 73.9220],
    [18.5050, 73.9230], [18.5040, 73.9310]
  ],
  "Vehicle 132": [
    [18.5074, 73.8077], [18.5110, 73.8180], [18.5140, 73.8290], [18.5167, 73.8415],
    [18.5220, 73.8460], [18.5280, 73.8510], [18.5360, 73.8680], [18.5430, 73.8820],
    [18.5520, 73.8920], [18.5580, 73.9020], [18.5679, 73.9143]
  ],
  "Vehicle 112": [
    [18.5679, 73.9143], [18.5580, 73.9020], [18.5520, 73.8920], [18.5430, 73.8820],
    [18.5360, 73.8680], [18.5280, 73.8510], [18.5220, 73.8460], [18.5167, 73.8415],
    [18.5140, 73.8290], [18.5110, 73.8180], [18.5074, 73.8077]
  ]
};

export interface VehicleProgressState {
  segment: number;
  progress: number;
  direction: 1 | -1;
}

export function advanceSimulatedFleet(
  fleet: FleetUnit[],
  progressMap: Record<string, VehicleProgressState>
): { updatedFleet: FleetUnit[]; updatedProgressMap: Record<string, VehicleProgressState> } {
  const updatedProgressMap = { ...progressMap };

  const updatedFleet = fleet.map(vehicle => {
    const route = VEHICLE_SIMULATION_ROUTES[vehicle.id];
    if (!route || route.length < 2) return vehicle;

    // Initialize progress if not exists
    if (!updatedProgressMap[vehicle.id]) {
      const initialSegment = Math.floor(Math.random() * (route.length - 1));
      updatedProgressMap[vehicle.id] = {
        segment: initialSegment,
        progress: Math.random() * 0.7,
        direction: Math.random() > 0.5 ? 1 : -1
      };
    }

    let { segment, progress, direction } = updatedProgressMap[vehicle.id];

    // Smooth movement progress along current segment
    const step = 0.08;
    progress += step;

    if (progress >= 1.0) {
      progress = 0;
      segment += direction;

      if (segment >= route.length - 1) {
        segment = route.length - 2;
        direction = -1;
      } else if (segment < 0) {
        segment = 0;
        direction = 1;
      }
    }

    updatedProgressMap[vehicle.id] = { segment, progress, direction };

    const p1 = route[segment];
    const p2 = route[segment + 1] || route[segment];

    const lat = p1[0] + (p2[0] - p1[0]) * progress;
    const lng = p1[1] + (p2[1] - p1[1]) * progress;

    // Realistic dynamic speed calculation
    let currentSpeed = vehicle.speed;
    if (vehicle.status !== 'Data Sync') {
      const distToBottleneck = Math.hypot(lat - 18.5280, lng - 73.8510);
      if (distToBottleneck < 0.006) {
        currentSpeed = Math.floor(9 + Math.random() * 4); // 9-13 km/h near congested junction
      } else {
        currentSpeed = Math.floor(28 + Math.random() * 12); // 28-40 km/h free flow
      }
    }

    return {
      ...vehicle,
      lat: Number(lat.toFixed(6)),
      lng: Number(lng.toFixed(6)),
      speed: currentSpeed,
      lastUpdate: "Just now"
    };
  });

  return { updatedFleet, updatedProgressMap };
}
