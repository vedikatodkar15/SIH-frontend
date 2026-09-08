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

      // 10% chance to push a subtle new simulated observation
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

  // Handle clicking an AI detection category card -> filter map
  const handleSelectAICategory = (categoryType: string) => {
    setMapCategory(categoryType);
    // Smooth scroll to map if scrolled down
    const mapEl = document.getElementById('urban-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Handle inspecting an alert -> pan map to its coordinates
  const handleInspectAlert = (obs: UrbanObservation) => {
    setFocusedCoordinate([obs.lat, obs.lng]);
    const mapEl = document.getElementById('urban-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Handle selecting a vehicle from Fleet list -> pan map to its coordinates
  const handleSelectVehicle = (vehicle: FleetUnit) => {
    setSelectedVehicleId(vehicle.id);
    setFocusedCoordinate([vehicle.lat, vehicle.lng]);
    const mapEl = document.getElementById('urban-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Manual trigger for edge sync
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      maxWidth: '1600px',
      margin: '0 auto',
      width: '100%'
    }}>
      
      {/* 1. Dashboard Header & Filter Strip (Section 5) */}
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
      />

      {/* 2. KPI Summary Cards (Section 6) */}
      <KPICards
        activeVehicles={128}
        dataPointsToday={dataPointsCount.toLocaleString()}
        roadConditionPercent="94% Normal"
        activeAlertsCount="07"
        issuesDetectedCount={36}
        coverageKm="82 km"
      />

      {/* 3. NextAdmin Executive Graphs: Ingestion Telemetry & Transit Velocity */}
      <AnalyticsCharts />

      {/* 4. Main GIS Map (55-65%) + Urban Intelligence Summary (35-45%) (Sections 7, 8, 9, 10) */}
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

      {/* 4. AI-Based Detection Section (Section 11) */}
      <AIDetection
        onSelectCategory={handleSelectAICategory}
        activeCategory={mapCategory}
      />

      {/* 5. Priority Alerts Table (Section 12) */}
      <div id="priority-alerts-section">
        <AlertsPanel
          onInspectObservation={handleInspectAlert}
        />
      </div>

      {/* 6. AI-Assisted Recommended Actions (Section 13) */}
      <DecisionSupport />

      {/* 7. Fleet Intelligence, Data Quality & Recent Activity (Sections 14, 15, 16) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* Section 14: Fleet Intelligence */}
        <FleetStatus
          vehicles={fleetUnits}
          onSelectVehicle={handleSelectVehicle}
          selectedVehicleId={selectedVehicleId}
        />

        {/* Section 15: Data Quality & System Status */}
        <DataQuality />

        {/* Section 16: Recent Activity Timeline */}
        <RecentActivity
          activityItems={activityStream}
        />
      </div>

    </div>
  );
};

export default Dashboard;
