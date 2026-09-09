import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  Bus, 
  Route, 
  StopsData, 
  PassengerDemand, 
  TrafficData, 
  Alert, 
  AIRecommendation, 
  Grievance, 
  Language, 
  FontSizeScale 
} from '../types';
import { apiClient } from '../services/apiClient';
import { translations } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSizeScale;
  setFontSize: (size: FontSizeScale) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  isSimulating: boolean;
  toggleSimulation: () => void;
  buses: Bus[];
  routes: Route[];
  stopsData: StopsData;
  demand: PassengerDemand;
  traffic: TrafficData;
  alerts: Alert[];
  recommendations: AIRecommendation[];
  grievances: Grievance[];
  selectedBusId: string | null;
  setSelectedBusId: (id: string | null) => void;
  acknowledgeAlert: (id: string) => Promise<void>;
  approveRecommendation: (id: string) => Promise<void>;
  submitGrievance: (data: Partial<Grievance>) => Promise<Grievance>;
  t: (key: keyof typeof translations.en) => string;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = sessionStorage.getItem('utis_language');
      if (saved === 'en' || saved === 'hi' || saved === 'mr') return saved as Language;
    } catch {}
    return 'en';
  });
  const [fontSize, setFontSizeState] = useState<FontSizeScale>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stopsData, setStopsData] = useState<StopsData>({ stops: [], depots: [] });
  const [demand, setDemand] = useState<PassengerDemand>({
    summary: { index: 0, status: '', totalWaitingPassengers: 0, topSurgeSector: '', peakTimeWindow: '', standbyDispatchedToday: 0 },
    sectors: [],
    hourlyTrend: []
  });
  const [traffic, setTraffic] = useState<TrafficData>({
    summary: { citywideCongestionIndex: '', activeBottlenecks: 0, avgFleetSpeed: '', delayedCorridors: [] },
    bottlenecks: [],
    rerouteSimulation: {
      originalRoute: { name: '', distance: '', estimatedTravelTime: '', congestionLevel: '', avgSpeed: '', co2Emission: '', riskScore: 0 },
      dynamicBypassRoute: { name: '', distance: '', estimatedTravelTime: '', congestionLevel: '', avgSpeed: '', co2Emission: '', riskScore: 0 },
      differential: { travelTimeSaved: '', punctualityGain: '', fuelCo2Saved: '', commuterSatisfaction: '' }
    }
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  // Load initial datasets
  const refreshData = useCallback(async () => {
    const [busesRes, routesRes, stopsRes, demandRes, trafficRes, alertsRes, recsRes, grvRes] = await Promise.all([
      apiClient.getBuses(),
      apiClient.getRoutes(),
      apiClient.getStops(),
      apiClient.getDemand(),
      apiClient.getTraffic(),
      apiClient.getAlerts(),
      apiClient.getRecommendations(),
      apiClient.getGrievances()
    ]);
    setBuses(busesRes);
    setRoutes(routesRes);
    setStopsData(stopsRes);
    setDemand(demandRes);
    setTraffic(trafficRes);
    setAlerts(alertsRes);
    setRecommendations(recsRes);
    setGrievances(grvRes);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handle font size body classes
  const setFontSize = (size: FontSizeScale) => {
    setFontSizeState(size);
    document.body.classList.remove('font-large', 'font-xlarge');
    if (size === 'large') document.body.classList.add('font-large');
    if (size === 'xlarge') document.body.classList.add('font-xlarge');
  };

  // Handle high contrast body class
  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      sessionStorage.setItem('utis_language', lang);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };

  // Live GPS Telemetry Simulation loop
  useEffect(() => {
    if (!isSimulating || buses.length === 0) return;

    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          // Stationary or offline buses don't move
          if (bus.status === 'Critical' || bus.status === 'Maintenance' || bus.status === 'Offline') {
            return bus;
          }

          // Small jitter simulating realistic movement along Pune road corridor
          const latDelta = (Math.random() - 0.49) * 0.0006;
          const lngDelta = (Math.random() - 0.49) * 0.0006;
          const speedDelta = Math.floor((Math.random() - 0.5) * 4);
          const newSpeed = Math.max(12, Math.min(52, bus.speed + speedDelta));

          return {
            ...bus,
            lat: Number((bus.lat + latDelta).toFixed(5)),
            lng: Number((bus.lng + lngDelta).toFixed(5)),
            speed: newSpeed,
            lastPing: "Just now"
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating, buses.length]);

  const acknowledgeAlert = async (id: string) => {
    const updated = await apiClient.acknowledgeAlert(id);
    if (updated) {
      setAlerts(prev => prev.map(a => a.id === id ? updated : a));
    }
  };

  const approveRecommendation = async (id: string) => {
    const updated = await apiClient.approveRecommendation(id);
    if (updated) {
      setRecommendations(prev => prev.map(r => r.id === id ? updated : r));
      // Refresh fleet since a standby bus may have dispatched
      const updatedBuses = await apiClient.getBuses();
      setBuses(updatedBuses);
    }
  };

  const submitGrievance = async (data: Partial<Grievance>) => {
    const ticket = await apiClient.submitGrievance(data);
    setGrievances(prev => [ticket, ...prev]);
    return ticket;
  };

  const t = (key: keyof typeof translations.en): string => {
    const dict = (translations[language] || translations.en) as Record<string, string>;
    return dict[key] || (translations.en as Record<string, string>)[key] || (key as string);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        fontSize,
        setFontSize,
        highContrast,
        toggleHighContrast,
        isSimulating,
        toggleSimulation,
        buses,
        routes,
        stopsData,
        demand,
        traffic,
        alerts,
        recommendations,
        grievances,
        selectedBusId,
        setSelectedBusId,
        acknowledgeAlert,
        approveRecommendation,
        submitGrievance,
        t,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
