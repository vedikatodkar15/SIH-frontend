export type BusStatus = 'On Time' | 'Delayed' | 'Critical' | 'Maintenance' | 'Offline';

export interface Bus {
  id: string;
  route: string;
  routeName: string;
  status: BusStatus;
  speed: number;
  eta: string;
  nextStop: string;
  lat: number;
  lng: number;
  driver: string;
  conductor: string;
  regNo: string;
  type: string;
  fuelBattery: number;
  occupancy: number;
  delayMinutes: number;
  lastPing: string;
  engineTemp?: string;
  depot?: string;
}

export interface Route {
  id: string;
  code: string;
  name: string;
  status: string;
  delayMin: number;
  busesActive: number;
  distanceKm: number;
  avgTripTime: string;
  color: string;
  waypoints: [number, number][];
}

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
  demand: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HIGH' | 'CRITICAL';
  waitingPassengers: number;
}

export interface Depot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  capacity: number;
  availableStandby: number;
}

export interface StopsData {
  stops: Stop[];
  depots: Depot[];
}

export interface SectorDemand {
  sector: string;
  currentDemand: number;
  predictedDemand: number;
  surgePercentage: string;
  status: string;
  recommendedBuses: number;
  availableBuses: number;
  deficit: number;
  routesImpacted: string[];
  action: string;
}

export interface HourlyTrend {
  time: string;
  actual: number;
  predicted: number;
}

export interface PassengerDemand {
  summary: {
    index: number;
    status: string;
    totalWaitingPassengers: number;
    topSurgeSector: string;
    peakTimeWindow: string;
    standbyDispatchedToday: number;
  };
  sectors: SectorDemand[];
  hourlyTrend: HourlyTrend[];
}

export interface Bottleneck {
  id: string;
  name: string;
  corridor: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  currentTraffic: string;
  predictedTraffic: string;
  avgSpeed: string;
  normalSpeed: string;
  speedDrop: string;
  cause: string;
  recommendedBypass: string;
  timeSavedViaBypass: string;
  coordinates: [number, number];
}

export interface RerouteSimulation {
  originalRoute: {
    name: string;
    distance: string;
    estimatedTravelTime: string;
    congestionLevel: string;
    avgSpeed: string;
    co2Emission: string;
    riskScore: number;
  };
  dynamicBypassRoute: {
    name: string;
    distance: string;
    estimatedTravelTime: string;
    congestionLevel: string;
    avgSpeed: string;
    co2Emission: string;
    riskScore: number;
  };
  differential: {
    travelTimeSaved: string;
    punctualityGain: string;
    fuelCo2Saved: string;
    commuterSatisfaction: string;
  };
}

export interface TrafficData {
  summary: {
    citywideCongestionIndex: string;
    activeBottlenecks: number;
    avgFleetSpeed: string;
    delayedCorridors: string[];
  };
  bottlenecks: Bottleneck[];
  rerouteSimulation: RerouteSimulation;
}

export type AlertLevel = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  level: AlertLevel;
  title: string;
  busId: string;
  route: string;
  location: string;
  time: string;
  detail: string;
  actionLabel: string;
  status: 'Active' | 'Unresolved' | 'Acknowledged' | 'Monitoring' | 'Resolved';
  coordinates?: [number, number];
  category?: string;
  acknowledgedAt?: string;
}

export interface ExplanationStep {
  step: number;
  title: string;
  evidence: string;
}

export interface AIRecommendation {
  id: string;
  type: 'DISPATCH_STANDBY' | 'DYNAMIC_REROUTING' | 'PREDICTIVE_MAINTENANCE';
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'SCHEDULED' | 'REJECTED';
  targetRoute?: string;
  alternateRoute?: string;
  depotSource?: string;
  busesToDispatch?: string[];
  busId?: string;
  regNo?: string;
  confidenceScore: number;
  impact: Record<string, string>;
  explanationSteps: ExplanationStep[];
  approvedAt?: string;
}

export interface Grievance {
  ticketId: string;
  name: string;
  email: string;
  category: string;
  route: string;
  description: string;
  status: 'Submitted' | 'In Progress' | 'Resolved';
  timestamp: string;
}

export interface KPIAudit {
  totalFleetSize: number;
  activeToday: number;
  onTimeReliability: string;
  peakPunctuality: string;
  avgPunctualityVariance: string;
  fuelDieselSavedLiters: number;
  co2AvoidedKg: number;
  totalTripsOperated: number;
  citizenComplaintsLogged: number;
  citizenComplaintsResolved: number;
}

export interface ApiServiceStatus {
  service: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  protocol: string;
  latency: string;
  uptime: string;
}

export type Language = 'en' | 'hi' | 'mr';
export type FontSizeScale = 'normal' | 'large' | 'xlarge';

// UTIS Domain Specific Types
export type UrbanObservationType = 'pothole' | 'traffic' | 'infrastructure' | 'obstruction' | 'other';
export type UrbanSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface UrbanObservation {
  id: string;
  type: UrbanObservationType;
  title: string;
  location: string;
  sector: string;
  lat: number;
  lng: number;
  severity: UrbanSeverity;
  detectedByVehicle: string;
  route: string;
  timestamp: string;
  metric?: string;
  status: 'Pending' | 'Monitoring' | 'Action Required' | 'Resolved';
  confidence: number;
  description: string;
}

export interface AIDetectionCategory {
  id: string;
  type: UrbanObservationType;
  name: string;
  count: number;
  severity: UrbanSeverity;
  icon: string;
  description: string;
  confidenceAvg: number;
  primarySensor: string;
}

export interface DecisionRecommendation {
  id: string;
  order: number;
  title: string;
  reason: string;
  severity: UrbanSeverity;
  location: string;
  suggestedAction: string;
  actionLabel: string;
  status: 'Pending' | 'Approved' | 'Dispatched';
  detectingVehiclesCount: number;
}

export interface FleetUnit {
  id: string;
  vehicleNumber: string;
  route: string;
  routeName: string;
  status: 'Active' | 'Data Sync' | 'Idle' | 'Offline';
  speed: number;
  driver: string;
  lastUpdate: string;
  lat: number;
  lng: number;
  propulsion: string;
  batteryFuel: number;
  sensorHealth: 'Optimal' | 'Calibrating' | 'Warning';
}

export interface DataQualityInfo {
  gpsStatus: string;
  sensorStatus: string;
  aiProcessing: string;
  dataSyncPercent: number;
  totalPacketsToday: number;
  lastSyncTimestamp: string;
  activeNodes: number;
  edgeLatencyMs: number;
}

export interface RecentActivityItem {
  id: string;
  time: string;
  message: string;
  type: 'pothole' | 'traffic' | 'infrastructure' | 'telemetry' | 'alert';
  vehicleId?: string;
  location?: string;
}
