import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FLEET_UNITS, 
  URBAN_OBSERVATIONS 
} from '../data/mockData';
import { INITIAL_ROUTES } from '../data/staticData';
import { MapLegend } from './MapLegend';
import { Search, Filter, Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { FleetUnit, UrbanObservation } from '../types';

interface IntelligenceMapProps {
  vehicles?: FleetUnit[];
  isSimulating?: boolean;
  onToggleSimulation?: () => void;
  selectedCategory?: string;
  onSelectVehicle?: (vehicle: FleetUnit) => void;
  onSelectObservation?: (obs: UrbanObservation) => void;
  focusedCoordinate?: [number, number] | null;
}

export const IntelligenceMap: React.FC<IntelligenceMapProps> = ({
  vehicles,
  isSimulating,
  onToggleSimulation,
  selectedCategory = 'all',
  onSelectVehicle,
  onSelectObservation,
  focusedCoordinate
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>(selectedCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Layer groups
  const vehiclesLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const busMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const routesLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const potholesLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const trafficLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const infraLayerRef = useRef<L.LayerGroup>(L.layerGroup());
  const alertsLayerRef = useRef<L.LayerGroup>(L.layerGroup());

  // Keep activeFilter synchronized with prop if changed from outside
  useEffect(() => {
    if (selectedCategory) {
      setActiveFilter(selectedCategory);
    }
  }, [selectedCategory]);

  // Pan to focused coordinate if provided
  useEffect(() => {
    if (focusedCoordinate && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(focusedCoordinate, 15, { duration: 1.2 });
    }
  }, [focusedCoordinate]);

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered at Pune metropolitan urban corridor
    const map = L.map(mapContainerRef.current, {
      center: [18.5204, 73.8567],
      zoom: 13,
      zoomControl: false // custom controls for cleaner NextAdmin design
    });

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | UTIS MoHUA',
      maxZoom: 19
    }).addTo(map);

    // Attach layers
    routesLayerRef.current.addTo(map);
    vehiclesLayerRef.current.addTo(map);
    potholesLayerRef.current.addTo(map);
    trafficLayerRef.current.addTo(map);
    infraLayerRef.current.addTo(map);
    alertsLayerRef.current.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Render Routes
  useEffect(() => {
    routesLayerRef.current.clearLayers();

    INITIAL_ROUTES.forEach(route => {
      const isBypass = route.id === '12B';
      const polyline = L.polyline(route.waypoints, {
        color: route.color || '#2563EB',
        weight: isBypass ? 4 : 3,
        opacity: 0.8,
        dashArray: isBypass ? '6, 6' : undefined
      });

      polyline.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 180px;">
          <div style="font-weight: 800; color: #0A2540; font-size: 13px; margin-bottom: 4px;">
            ${route.code}: ${route.name}
          </div>
          <div><strong>Status:</strong> ${route.status}</div>
          <div><strong>Distance:</strong> ${route.distanceKm} km (${route.avgTripTime})</div>
          <div><strong>Active Fleet:</strong> ${route.busesActive} buses</div>
          ${isBypass ? '<div style="color: #059669; font-weight: 700; margin-top: 4px;">★ AI Dynamic Congestion Bypass</div>' : ''}
        </div>
      `);

      routesLayerRef.current.addLayer(polyline);
    });
  }, []);

  // 3. Render and Smoothly Animate Moving Simulated Vehicles
  useEffect(() => {
    if (activeFilter !== 'all' && activeFilter !== 'vehicles') {
      vehiclesLayerRef.current.clearLayers();
      busMarkersRef.current.clear();
      return;
    }

    const currentVehicles = vehicles || FLEET_UNITS;

    currentVehicles.forEach(vehicle => {
      // Filter by search query if any
      if (searchQuery && 
          !vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !vehicle.route.toLowerCase().includes(searchQuery.toLowerCase())) {
        if (busMarkersRef.current.has(vehicle.id)) {
          const m = busMarkersRef.current.get(vehicle.id)!;
          vehiclesLayerRef.current.removeLayer(m);
          busMarkersRef.current.delete(vehicle.id);
        }
        return;
      }

      const isSyncing = vehicle.status === 'Data Sync';
      const markerColor = isSyncing ? '#D97706' : '#10B981';

      const busIcon = L.divIcon({
        className: 'custom-fleet-bus-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 6px;
            padding: 2px 6px;
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            font-weight: 800;
            box-shadow: 0 2px 5px rgba(0,0,0,0.25);
            white-space: nowrap;
            cursor: pointer;
            transition: transform 0.8s linear;
          ">
            <span>🚌</span>
            <span>${vehicle.id.replace('Vehicle ', 'V-')}</span>
            <span style="font-size: 9px; opacity: 0.9; background: rgba(0,0,0,0.2); padding: 1px 3px; border-radius: 3px;">
              ${vehicle.speed}k
            </span>
          </div>
        `,
        iconSize: [66, 24],
        iconAnchor: [33, 12]
      });

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; min-width: 220px; line-height: 1.4;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; margin-bottom: 6px;">
            <strong style="color: #0A2540; font-size: 14px;">${vehicle.id} (${vehicle.vehicleNumber})</strong>
            <span style="font-size: 10px; font-weight: 700; color: ${markerColor}; background: ${isSyncing ? '#FFFBEB' : '#ECFDF5'}; padding: 1px 6px; border-radius: 4px;">
              ${vehicle.status}
            </span>
          </div>
          <div><strong>Route:</strong> ${vehicle.route} (${vehicle.routeName})</div>
          <div><strong>Status:</strong> ${vehicle.status}</div>
          <div><strong>Transit Speed:</strong> <span style="color: #10B981; font-weight: 800;">${vehicle.speed} km/h</span></div>
          <div><strong>GPS Lat/Lng:</strong> ${vehicle.lat.toFixed(4)}, ${vehicle.lng.toFixed(4)}</div>
          <div><strong>Last Update:</strong> ${vehicle.lastUpdate}</div>
          <div><strong>Data:</strong> <span style="color: #059669; font-weight: 700;">Active Live Telemetry Stream</span></div>
          <div><strong>Driver:</strong> ${vehicle.driver}</div>
          <div><strong>Propulsion:</strong> ${vehicle.propulsion}</div>
        </div>
      `;

      if (busMarkersRef.current.has(vehicle.id)) {
        // Smoothly update existing marker coordinate without rebuilding DOM
        const marker = busMarkersRef.current.get(vehicle.id)!;
        marker.setLatLng([vehicle.lat, vehicle.lng]);
        marker.setIcon(busIcon);
        marker.setPopupContent(popupContent);
      } else {
        // Create new marker
        const marker = L.marker([vehicle.lat, vehicle.lng], { icon: busIcon });
        marker.bindPopup(popupContent);
        marker.on('click', () => {
          if (onSelectVehicle) onSelectVehicle(vehicle);
        });
        vehiclesLayerRef.current.addLayer(marker);
        busMarkersRef.current.set(vehicle.id, marker);
      }
    });
  }, [vehicles, activeFilter, searchQuery, onSelectVehicle]);

  // 4. Render Urban Observations (Road Issues, Traffic, Infrastructure, Alerts)
  useEffect(() => {
    potholesLayerRef.current.clearLayers();
    trafficLayerRef.current.clearLayers();
    infraLayerRef.current.clearLayers();
    alertsLayerRef.current.clearLayers();

    URBAN_OBSERVATIONS.forEach(obs => {
      // Filter by search query
      if (searchQuery && 
          !obs.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !obs.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !obs.detectedByVehicle.toLowerCase().includes(searchQuery.toLowerCase())) {
        return;
      }

      // Check category filter
      if (activeFilter !== 'all') {
        if (activeFilter === 'roads' && obs.type !== 'pothole') return;
        if (activeFilter === 'traffic' && obs.type !== 'traffic') return;
        if (activeFilter === 'infrastructure' && obs.type !== 'infrastructure') return;
        if (activeFilter === 'alerts' && obs.severity !== 'critical' && obs.severity !== 'high') return;
        if (activeFilter === 'vehicles') return;
      }

      // Marker Icon creation based on observation type
      let markerHtml = '';
      let targetLayer: L.LayerGroup;

      if (obs.type === 'pothole') {
        targetLayer = potholesLayerRef.current;
        markerHtml = `
          <div style="
            background-color: #8B5CF6;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            box-shadow: 0 2px 6px rgba(139, 92, 246, 0.4);
            cursor: pointer;
          " title="${obs.title}">
            ⚠️
          </div>
        `;
      } else if (obs.type === 'traffic') {
        targetLayer = trafficLayerRef.current;
        markerHtml = `
          <div style="
            background-color: #F59E0B;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            box-shadow: 0 2px 6px rgba(245, 158, 11, 0.4);
            cursor: pointer;
          " title="${obs.title}">
            🚦
          </div>
        `;
      } else if (obs.type === 'infrastructure') {
        targetLayer = infraLayerRef.current;
        markerHtml = `
          <div style="
            background-color: #3B82F6;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
            cursor: pointer;
          " title="${obs.title}">
            🏗️
          </div>
        `;
      } else {
        // Critical alert / obstruction
        targetLayer = alertsLayerRef.current;
        markerHtml = `
          <div style="
            background-color: #EF4444;
            color: #FFFFFF;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            width: 26px;
            height: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
            cursor: pointer;
            animation: pulse-dot 1.5s infinite;
          " title="${obs.title}">
            🔴
          </div>
        `;
      }

      const icon = L.divIcon({
        className: 'custom-urban-marker',
        html: markerHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      const marker = L.marker([obs.lat, obs.lng], { icon });

      // Master Prompt Section 26 format for alert popup:
      // "Road Damage / Location: Sector 4 / Severity: High / Detected by: Vehicle 102 / Status: Pending Inspection"
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; min-width: 220px; line-height: 1.4;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px; margin-bottom: 6px;">
            <strong style="color: #0A2540; font-size: 14px;">${obs.title}</strong>
            <span style="
              font-size: 10px; 
              font-weight: 700; 
              padding: 1px 6px; 
              border-radius: 4px; 
              color: ${obs.severity === 'critical' ? '#991B1B' : obs.severity === 'high' ? '#DC2626' : '#D97706'};
              background: ${obs.severity === 'critical' ? '#FEE2E2' : obs.severity === 'high' ? '#FEF2F2' : '#FFFBEB'};
            ">
              ${obs.severity.toUpperCase()}
            </span>
          </div>
          <div><strong>Location:</strong> ${obs.location}</div>
          <div><strong>Severity:</strong> ${obs.severity.toUpperCase()}</div>
          <div><strong>Detected By:</strong> <code>${obs.detectedByVehicle}</code> (${obs.route})</div>
          <div><strong>Status:</strong> <span style="font-weight: 700;">${obs.status}</span></div>
          ${obs.metric ? `<div style="margin-top: 4px; font-size: 11px; background: #F8FAFC; padding: 4px 6px; border-radius: 4px;">${obs.metric}</div>` : ''}
          <div style="font-size: 11px; color: #64748B; margin-top: 4px;">Detected: ${obs.timestamp} | AI Confidence: ${obs.confidence}%</div>
        </div>
      `);

      marker.on('click', () => {
        if (onSelectObservation) onSelectObservation(obs);
      });

      targetLayer.addLayer(marker);
    });
  }, [activeFilter, searchQuery, onSelectObservation]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.setView([18.5204, 73.8567], 13);
  };

  return (
    <div className="gov-card" style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Bar matching Section 7 */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>Urban Intelligence Map</span>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              backgroundColor: '#EFF6FF',
              color: 'var(--gov-blue)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #BFDBFE'
            }}>
              GIS LIVE
            </span>

            {isSimulating !== undefined && (
              <button
                onClick={onToggleSimulation}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: isSimulating ? '#ECFDF5' : '#F1F5F9',
                  color: isSimulating ? '#065F46' : '#64748B',
                  border: `1px solid ${isSimulating ? '#A7F3D0' : '#CBD5E1'}`,
                  borderRadius: '9999px',
                  padding: '2px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                title="Toggle real-time fleet movement simulation"
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isSimulating ? '#10B981' : '#94A3B8',
                  boxShadow: isSimulating ? '0 0 6px #10B981' : 'none'
                }} />
                <span>{isSimulating ? 'Fleet Simulation: Moving 🟢' : 'Simulation: Paused ⏸️'}</span>
              </button>
            )}
          </h2>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Live observations collected from public transport vehicles
          </div>
        </div>

        {/* Section 9: Search Location Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-alt)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 8px',
            gap: '6px'
          }}>
            <Search size={13} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search location, vehicle or issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '12px',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '190px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Section 9: Map Filter Pills Bar */}
      <div style={{
        padding: '8px 18px',
        backgroundColor: 'var(--bg-surface-alt)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
            Layer Filters:
          </span>
          {[
            { id: 'all', label: 'All Layers' },
            { id: 'vehicles', label: '🚌 Vehicles (128)' },
            { id: 'roads', label: '⚠️ Road Conditions (14)' },
            { id: 'traffic', label: '🚦 Traffic (8)' },
            { id: 'infrastructure', label: '🏗️ Infrastructure (6)' },
            { id: 'alerts', label: '🔴 Alerts (7)' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)',
                border: activeFilter === filter.id ? '1px solid var(--gov-blue)' : '1px solid var(--border-color)',
                backgroundColor: activeFilter === filter.id ? 'var(--gov-blue)' : 'var(--bg-surface)',
                color: activeFilter === filter.id ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
          Tracking 128 mobile urban intelligence nodes
        </div>
      </div>

      {/* Map Container */}
      <div style={{ position: 'relative', width: '100%', height: '420px' }}>
        <div 
          ref={mapContainerRef} 
          style={{ width: '100%', height: '100%' }} 
        />

        {/* Floating Map Zoom / Reset Controls */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <button
            onClick={handleZoomIn}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={handleResetView}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            title="Center Corridor View"
          >
            <Navigation size={13} />
          </button>
        </div>

        {/* Section 8: Map Legend Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 1000
        }}>
          <MapLegend />
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
        padding: '12px 18px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-surface-alt)',
        fontSize: '12px'
      }}>
        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Monitored Corridor
          </span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
            82 km
          </div>
        </div>

        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Packets Ingested
          </span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
            24,860 / day
          </div>
        </div>

        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Edge AI Latency
          </span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
            38 ms
          </div>
        </div>

        <div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Fleet Telemetry Sync
          </span>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#10B981', fontFamily: 'monospace' }}>
            99.8% Operational
          </div>
        </div>
      </div>
    </div>
  );
};
