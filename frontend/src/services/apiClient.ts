import { Bus, Route, StopsData, PassengerDemand, TrafficData, Alert, AIRecommendation, Grievance, KPIAudit, ApiServiceStatus } from '../types';
import { 
  INITIAL_BUSES, 
  INITIAL_ROUTES, 
  INITIAL_STOPS, 
  INITIAL_DEMAND, 
  INITIAL_TRAFFIC, 
  INITIAL_ALERTS, 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_API_SERVICES, 
  INITIAL_GRIEVANCES, 
  INITIAL_KPI_AUDIT 
} from '../data/staticData';

const API_BASE_URL = 'http://localhost:5000/api';

// In-memory runtime fallback storage
let localBuses: Bus[] = [...INITIAL_BUSES];
let localAlerts: Alert[] = [...INITIAL_ALERTS];
let localRecommendations: AIRecommendation[] = [...INITIAL_RECOMMENDATIONS];
let localGrievances: Grievance[] = [...INITIAL_GRIEVANCES];

export const apiClient = {
  async getBuses(): Promise<Bus[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/buses`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Backend not running, use local state
    }
    return localBuses;
  },

  async getRoutes(): Promise<Route[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/routes`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return INITIAL_ROUTES;
  },

  async getStops(): Promise<StopsData> {
    try {
      const res = await fetch(`${API_BASE_URL}/stops`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return INITIAL_STOPS;
  },

  async getDemand(): Promise<PassengerDemand> {
    try {
      const res = await fetch(`${API_BASE_URL}/demand`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return INITIAL_DEMAND;
  },

  async getTraffic(): Promise<TrafficData> {
    try {
      const res = await fetch(`${API_BASE_URL}/traffic`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return INITIAL_TRAFFIC;
  },

  async getAlerts(): Promise<Alert[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return localAlerts;
  },

  async acknowledgeAlert(id: string): Promise<Alert | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts/${id}/acknowledge`, { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const alert = localAlerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'Acknowledged';
      alert.acknowledgedAt = new Date().toLocaleTimeString('en-IN') + ' IST';
      return { ...alert };
    }
    return null;
  },

  async getRecommendations(): Promise<AIRecommendation[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations`);
      if (res.ok) {
        const json = await res.json();
        return json.data.recommendations || [];
      }
    } catch {
      // Fallback
    }
    return localRecommendations;
  },

  async approveRecommendation(id: string): Promise<AIRecommendation | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/${id}/approve`, { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const rec = localRecommendations.find(r => r.id === id);
    if (rec) {
      rec.status = 'APPROVED';
      rec.approvedAt = new Date().toLocaleTimeString('en-IN') + ' IST';
      if (rec.type === 'DISPATCH_STANDBY') {
        const newBus: Bus = {
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
        if (!localBuses.find(b => b.id === newBus.id)) {
          localBuses.push(newBus);
        }
      }
      return { ...rec };
    }
    return null;
  },

  async getGrievances(): Promise<Grievance[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/grievances`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    return localGrievances;
  },

  async submitGrievance(data: Partial<Grievance>): Promise<Grievance> {
    try {
      const res = await fetch(`${API_BASE_URL}/grievance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch {
      // Fallback
    }
    const newTicket: Grievance = {
      ticketId: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name || 'Citizen',
      email: data.email || 'citizen@pune.gov.in',
      category: data.category || 'General Feedback',
      route: data.route || 'N/A',
      description: data.description || '',
      status: 'Submitted',
      timestamp: new Date().toLocaleString('en-IN') + ' IST'
    };
    localGrievances.unshift(newTicket);
    return newTicket;
  },

  async getReports(): Promise<{ kpiAudit: KPIAudit }> {
    try {
      const res = await fetch(`${API_BASE_URL}/reports`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch {
      // Fallback
    }
    return { kpiAudit: INITIAL_KPI_AUDIT };
  },

  async getApiServices(): Promise<ApiServiceStatus[]> {
    return INITIAL_API_SERVICES;
  }
};
