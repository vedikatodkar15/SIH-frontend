import React, { useState, useEffect, useRef } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { KPICards } from '../components/KPICards';
import { IntelligenceMap } from '../components/IntelligenceMap';
import { IntelligenceSummary } from '../components/IntelligenceSummary';
import { AIDetection } from '../components/AIDetection';
import { AlertsPanel } from '../components/AlertsPanel';
import { DecisionSupport } from '../components/DecisionSupport';
import { FleetStatus } from '../components/FleetStatus';
import { DataQuality } from '../components/DataQuality';
import { RecentActivity } from '../components/RecentActivity';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { StandbyDispatchModal } from '../components/StandbyDispatchModal';
import { 
  RECENT_ACTIVITY_ITEMS, 
  FLEET_UNITS, 
  advanceSimulatedFleet, 
  VehicleProgressState 
} from '../data/mockData';
import { FleetUnit, UrbanObservation, RecentActivityItem } from '../types';

export const Dashboard: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Pune');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [timePeriod, setTimePeriod] = useState<string>('live');
  const [lastUpdated, setLastUpdated] = useState<string>('08 Sep 2026, 10:42 AM');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [isStandbyModalOpen, setIsStandbyModalOpen] = useState<boolean>(false);

  // Moving fleet units live state
  const [fleetUnits, setFleetUnits] = useState<FleetUnit[]>(FLEET_UNITS);
  const progressMapRef = useRef<Record<string, VehicleProgressState>>({});

  const [mapCategory, setMapCategory] = useState<string>('all');
  const [focusedCoordinate, setFocusedCoordinate] = useState<[number, number] | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [activityStream, setActivityStream] = useState<RecentActivityItem[]>(RECENT_ACTIVITY_ITEMS);
  const [dataPointsCount, setDataPointsCount] = useState<number>(24860);

  // Dynamic live clock update
  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
      setLastUpdated(`08 Sep 2026, ${timeStr}`);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000);
    return () => clearInterval(interval);
  }, []);

  // Live telemetry stream emulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setDataPointsCount(prev => prev + Math.floor(Math.random() * 4) + 1);

      // 15% chance to push a simulated observation
      if (Math.random() > 0.85) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
        const randomUnits = ['Vehicle 102', 'Vehicle 105', 'Vehicle 117', 'Vehicle 108', 'Vehicle 132'];
        const chosenUnit = randomUnits[Math.floor(Math.random() * randomUnits.length)];

        const newAct: RecentActivityItem = {
          id: `ACT-${Date.now()}`,
          time: timeStr,
          message: `${chosenUnit} ingested telemetry batch (32 IMU vibration samples)`,
          type: 'telemetry',
          vehicleId: chosenUnit
        };

        setActivityStream(prev => [newAct, ...prev.slice(0, 9)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Live moving fleet simulation along designated corridors
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setFleetUnits(prevFleet => {
        const { updatedFleet, updatedProgressMap } = advanceSimulatedFleet(prevFleet, progressMapRef.current);
        progressMapRef.current = updatedProgressMap;
        return updatedFleet;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleSelectAICategory = (categoryType: string) => {
    setMapCategory(categoryType);
    const mapEl = document.getElementById('urban-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleInspectAlert = (obs: UrbanObservation) => {
    setFocusedCoordinate([obs.lat, obs.lng]);
    const mapEl = document.getElementById('urban-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSelectVehicle = (vehicle: FleetUnit) => {
    setSelectedVehicleId(vehicle.id);
    setFocusedCoordinate([vehicle.lat, vehicle.lng]);
    const mapEl = document.getElementById('urban-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleManualSync = () => {
    setDataPointsCount(prev => prev + 120);
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    setLastUpdated(`08 Sep 2026, ${timeStr}`);
    
    const syncAct: RecentActivityItem = {
      id: `ACT-SYNC-${Date.now()}`,
      time: timeStr,
      message: "Central fleet sync completed: 128 mobile urban sensing nodes synchronized",
      type: "telemetry"
    };
    setActivityStream(prev => [syncAct, ...prev.slice(0, 9)]);
  };

  const handleStandbySuccess = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    const deployAct: RecentActivityItem = {
      id: `ACT-DEPLOY-${Date.now()}`,
      time: timeStr,
      message: "Standby electric buses #EB-204 and #EB-209 deployed to Route 12 corridor from Swargate Depot",
      type: "telemetry"
    };
    setActivityStream(prev => [deployAct, ...prev.slice(0, 9)]);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '1600px',
      margin: '0 auto',
      width: '100%'
    }}>
      
      {/* 1. Command Center Operational Summary & Quick Actions */}
      <DashboardHeader
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        timePeriod={timePeriod}
        setTimePeriod={setTimePeriod}
        lastUpdated={lastUpdated}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(!isSimulating)}
        onRefresh={handleManualSync}
        onDeployStandby={() => setIsStandbyModalOpen(true)}
      />

      {/* 2. NextAdmin Style KPI Summary Cards */}
      <KPICards />

      {/* 3. NextAdmin Executive Graphs: Dual-Area Chart, Stacked Bar, Donut, Corridor Bar */}
      <AnalyticsCharts />

      {/* 4. Main GIS Map (55-65%) + Urban Intelligence Summary (35-45%) */}
      <div 
        id="urban-map-section"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1.1fr)',
          gap: '20px',
          alignItems: 'stretch'
        }}
        className="map-summary-grid"
      >
        <IntelligenceMap
          vehicles={fleetUnits}
          isSimulating={isSimulating}
          onToggleSimulation={() => setIsSimulating(!isSimulating)}
          selectedCategory={mapCategory}
          onSelectVehicle={handleSelectVehicle}
          onSelectObservation={handleInspectAlert}
          focusedCoordinate={focusedCoordinate}
        />

        <IntelligenceSummary />
      </div>

      {/* 5. AI-Based Detection Section */}
      <AIDetection
        onSelectCategory={handleSelectAICategory}
        activeCategory={mapCategory}
      />

      {/* 6. Priority Alerts Table */}
      <div id="priority-alerts-section">
        <AlertsPanel
          onInspectObservation={handleInspectAlert}
        />
      </div>

      {/* 7. AI-Assisted Decision Support & XAI */}
      <DecisionSupport />

      {/* 8. Fleet Intelligence, Data Quality & Recent Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        <FleetStatus
          vehicles={fleetUnits}
          onSelectVehicle={handleSelectVehicle}
          selectedVehicleId={selectedVehicleId}
        />

        <DataQuality />

        <RecentActivity
          activityItems={activityStream}
        />
      </div>

      {/* Standby Bus Dispatch Modal */}
      <StandbyDispatchModal
        isOpen={isStandbyModalOpen}
        onClose={() => setIsStandbyModalOpen(false)}
        onConfirmSuccess={handleStandbySuccess}
      />

    </div>
  );
};

export default Dashboard;
