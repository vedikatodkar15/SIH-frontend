import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bus, Route, Stop, Depot, Bottleneck } from '../types';
import { Layers, Eye, EyeOff, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MapComponentProps {
  buses: Bus[];
  routes: Route[];
  stops: Stop[];
  depots: Depot[];
  bottlenecks?: Bottleneck[];
  selectedBusId?: string | null;
  onSelectBus?: (bus: Bus) => void;
  height?: string;
  showControls?: boolean;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  buses,
  routes,
  stops,
  depots,
  bottlenecks = [],
  selectedBusId,
  onSelectBus,
  height = '540px',
  showControls = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer toggles
  const [showBuses, setShowBuses] = useState<boolean>(true);
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [showStops, setShowStops] = useState<boolean>(true);
  const [showDepots, setShowDepots] = useState<boolean>(true);
  const [showBottlenecks, setShowBottlenecks] = useState<boolean>(true);

  // Layer groups
  const busesLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const routesLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const stopsLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const depotsLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const bottlenecksLayerRef = useRef<L.LayerGroup>(L.layerGroup());

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Pune Metropolitan center
    const map = L.map(mapContainerRef.current, {
      center: [18.5204, 73.8567],
      zoom: 13,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | UTIS MoHUA',
      maxZoom: 19
    }).addTo(map);

    busesLayerRef.current.addTo(map);
    routesLayerRef.current.addTo(map);
    stopsLayerRef.current.addTo(map);
    depotsLayerRef.current.addTo(map);
    bottlenecksLayerRef.current.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Routes
  useEffect(() => {
    routesLayerRef.current.clearLayers();
    if (!showRoutes) return;

    routes.forEach(route => {
      const isBypass = route.id === '12B';
      const polyline = L.polyline(route.waypoints, {
        color: route.color || '#2563EB',
        weight: isBypass ? 5 : 4,
        opacity: isBypass ? 0.95 : 0.8,
        dashArray: isBypass ? '8, 8' : undefined
      });

      polyline.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4;">
          <div style="font-weight: 800; color: #0A2540; margin-bottom: 4px;">
            ${route.code}: ${route.name}
          </div>
          <div><strong>Status:</strong> ${route.status}</div>
          <div><strong>Active Buses:</strong> ${route.busesActive}</div>
          <div><strong>Avg Delay:</strong> ${route.delayMin} min</div>
          <div><strong>Distance:</strong> ${route.distanceKm} km (${route.avgTripTime})</div>
          ${isBypass ? '<div style="margin-top: 6px; color: #059669; font-weight: 700;">★ AI Dynamic Congestion Bypass Corridor</div>' : ''}
        </div>
      `);

      routesLayerRef.current.addLayer(polyline);
    });
  }, [routes, showRoutes]);

  // Update Stops
  useEffect(() => {
    stopsLayerRef.current.clearLayers();
    if (!showStops) return;

    stops.forEach(stop => {
      const stopIcon = L.divIcon({
        className: 'custom-stop-marker',
        html: `
          <div style="
            background-color: #1E3A8A;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          " title="${stop.name}">
            🚏
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon });
      marker.bindPopup(`
        <div style="font-size: 13px;">
          <div style="font-weight: 700; color: #0A2540;">${stop.name}</div>
          <div>Routes: ${stop.routes.join(', ')}</div>
          <div>Waiting Commuters: <strong>${stop.waitingPassengers}</strong></div>
          <div>Demand Level: <span style="font-weight: 700; color: ${stop.demand === 'VERY HIGH' || stop.demand === 'CRITICAL' ? '#DC2626' : '#2563EB'}">${stop.demand}</span></div>
        </div>
      `);
      stopsLayerRef.current.addLayer(marker);
    });
  }, [stops, showStops]);

  // Update Depots
  useEffect(() => {
    depotsLayerRef.current.clearLayers();
    if (!showDepots) return;

    depots.forEach(depot => {
      const depotIcon = L.divIcon({
        className: 'custom-depot-marker',
        html: `
          <div style="
            background-color: #0A2540;
            color: #FBBF24;
            border: 2px solid #FFFFFF;
            border-radius: 4px;
            padding: 2px 5px;
            font-size: 10px;
            font-weight: 800;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            white-space: nowrap;
          ">
            🏢 DEPOT
          </div>
        `,
        iconSize: [56, 20],
        iconAnchor: [28, 10]
      });

      const marker = L.marker([depot.lat, depot.lng], { icon: depotIcon });
      marker.bindPopup(`
        <div style="font-size: 13px;">
          <div style="font-weight: 800; color: #0A2540;">${depot.name}</div>
          <div>Total Capacity: <strong>${depot.capacity} buses</strong></div>
          <div style="color: #059669; font-weight: 700;">Standby Ready for AI Dispatch: ${depot.availableStandby} buses</div>
        </div>
      `);
      depotsLayerRef.current.addLayer(marker);
    });
  }, [depots, showDepots]);

  // Update Bottlenecks
  useEffect(() => {
    bottlenecksLayerRef.current.clearLayers();
    if (!showBottlenecks) return;

    bottlenecks.forEach(bn => {
      const bnIcon = L.divIcon({
        className: 'custom-bn-marker',
        html: `
          <div style="
            background-color: #DC2626;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            animation: pulse-dot 1.2s infinite;
            box-shadow: 0 0 10px rgba(220, 38, 38, 0.7);
          " title="${bn.name}">
            ⚠️
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker(bn.coordinates, { icon: bnIcon });
      marker.bindPopup(`
        <div style="font-size: 13px; line-height: 1.4;">
          <div style="font-weight: 800; color: #DC2626;">TRAFFIC BOTTLENECK: ${bn.name}</div>
          <div>Severity: <strong>${bn.severity}</strong></div>
          <div>Current Transit Speed: <span style="color: #DC2626; font-weight: 700;">${bn.avgSpeed}</span> (Normal: ${bn.normalSpeed})</div>
          <div>Primary Cause: ${bn.cause}</div>
          <div style="margin-top: 6px; background: #ECFDF5; padding: 4px; border-radius: 4px; color: #065F46;">
            <strong>AI Recommended Bypass:</strong> ${bn.recommendedBypass} (${bn.timeSavedViaBypass} faster)
          </div>
        </div>
      `);
      bottlenecksLayerRef.current.addLayer(marker);
    });
  }, [bottlenecks, showBottlenecks]);

  // Update Buses with Live Animated Moving Markers
  useEffect(() => {
    busesLayerRef.current.clearLayers();
    if (!showBuses) return;

    buses.forEach(bus => {
      const isSelected = selectedBusId === bus.id;

      let color = '#059669'; // On Time green
      if (bus.status === 'Delayed') color = '#DC2626';
      if (bus.status === 'Critical') color = '#991B1B';
      if (bus.status === 'Maintenance') color = '#7C3AED';
      if (bus.status === 'Offline') color = '#64748B';

      const busIcon = L.divIcon({
        className: 'custom-bus-marker',
        html: `
          <div style="
            background-color: ${color};
            color: #FFFFFF;
            border: ${isSelected ? '3px solid #FBBF24' : '2px solid #FFFFFF'};
            border-radius: 6px;
            padding: 3px 6px;
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            font-weight: 800;
            box-shadow: ${isSelected ? '0 0 12px #FBBF24' : '0 2px 5px rgba(0,0,0,0.3)'};
            transform: scale(${isSelected ? 1.15 : 1});
            transition: all 0.2s ease;
            white-space: nowrap;
          ">
            <span>🚌</span>
            <span>${bus.route}</span>
            <span style="font-size: 9px; opacity: 0.9; background: rgba(0,0,0,0.25); padding: 1px 3px; border-radius: 3px;">
              ${bus.speed}k
            </span>
          </div>
        `,
        iconSize: [70, 26],
        iconAnchor: [35, 13]
      });

      const marker = L.marker([bus.lat, bus.lng], { icon: busIcon });
      
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; min-width: 220px; line-height: 1.4;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; margin-bottom: 6px;">
            <strong style="color: #0A2540; font-size: 14px;">${bus.id} (${bus.regNo})</strong>
            <span style="font-size: 11px; font-weight: 700; color: ${color};">${bus.status}</span>
          </div>
          <div><strong>Route:</strong> Route ${bus.route} (${bus.routeName})</div>
          <div><strong>Speed:</strong> ${bus.speed} km/h | <strong>ETA:</strong> ${bus.eta}</div>
          <div><strong>Next Stop:</strong> ${bus.nextStop}</div>
          <div><strong>Driver:</strong> ${bus.driver}</div>
          <div><strong>Conductor:</strong> ${bus.conductor}</div>
          <div><strong>Propulsion:</strong> ${bus.type}</div>
          <div><strong>Battery/Fuel:</strong> ${bus.fuelBattery}% | <strong>Load:</strong> ${bus.occupancy}%</div>
          <div style="font-size: 11px; color: #64748B; margin-top: 4px;">Last GPS Ping: ${bus.lastPing}</div>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectBus) onSelectBus(bus);
      });

      busesLayerRef.current.addLayer(marker);

      // Pan to selected bus
      if (isSelected && mapInstanceRef.current) {
        mapInstanceRef.current.panTo([bus.lat, bus.lng]);
      }
    });
  }, [buses, showBuses, selectedBusId, onSelectBus]);

  return (
    <div style={{ position: 'relative', width: '100%', height }}>
      {/* Map DOM Container */}
      <div 
        ref={mapContainerRef} 
        style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)' }} 
      />

      {/* Layer Controls Bar */}
      {showControls && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          gap: '12px',
          fontSize: '0.78rem',
          fontWeight: 600
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showBuses} 
              onChange={e => setShowBuses(e.target.checked)} 
            />
            <span>🚌 Buses ({buses.length})</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showRoutes} 
              onChange={e => setShowRoutes(e.target.checked)} 
            />
            <span>🛣️ Routes</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showStops} 
              onChange={e => setShowStops(e.target.checked)} 
            />
            <span>🚏 Stops</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showDepots} 
              onChange={e => setShowDepots(e.target.checked)} 
            />
            <span>🏢 Depots</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showBottlenecks} 
              onChange={e => setShowBottlenecks(e.target.checked)} 
            />
            <span>⚠️ Bottlenecks</span>
          </label>
        </div>
      )}
    </div>
  );
};
