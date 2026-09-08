/**
 * Government Public Transport Intelligence Platform (SIH)
 * Master Controller: View Router, Leaflet GIS Engine, Charts, Live Simulation & Multilingual Engine
 */

// Application State
const AppState = {
  currentView: "dashboard",
  currentLang: "en",
  fontSize: "md",
  highContrast: false,
  simulationActive: true,
  map: null,
  dashboardMiniMap: null,
  mapLayers: {
    buses: null,
    routes: null,
    stops: null,
    depots: null,
    heatmaps: null,
    traffic: null
  },
  charts: {},
  buses: [],
  alerts: []
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  // Deep clone data from TRANSPORT_DATA
  AppState.buses = JSON.parse(JSON.stringify(TRANSPORT_DATA.buses));
  AppState.alerts = JSON.parse(JSON.stringify(TRANSPORT_DATA.alerts));

  // Init Core Components
  initViewRouter();
  initHeaderControls();
  initAccessibility();
  initSidebar();
  renderKPIs();
  initFleetTable();
  initAlerts();
  initCitizenPortal();
  initReports();
  initApiStatus();
  initCharts();
  
  // Initialize Leaflet GIS Maps
  setTimeout(() => {
    initLeafletMaps();
  }, 100);

  // Start live GPS telemetry simulation
  startGpsSimulation();
  
  // Update Live Clock
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
});

/* ==========================================================================
   1. VIEW ROUTER (SPA ARCHITECTURE)
   ========================================================================== */
function initViewRouter() {
  const navItems = document.querySelectorAll(".nav-item[data-view]");
  
  function navigateTo(viewId) {
    if (!viewId) viewId = "dashboard";
    
    // Hide all views
    document.querySelectorAll(".view-panel").forEach(panel => {
      panel.classList.remove("active-view");
    });

    // Show target view
    const targetPanel = document.getElementById(`view-${viewId}`);
    if (targetPanel) {
      targetPanel.classList.add("active-view");
      AppState.currentView = viewId;
    } else {
      const fallback = document.getElementById("view-dashboard");
      if (fallback) fallback.classList.add("active-view");
      AppState.currentView = "dashboard";
    }

    // Update active nav state
    navItems.forEach(item => {
      if (item.getAttribute("data-view") === AppState.currentView) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Invalidate map sizes if switching to map or dashboard
    if (AppState.currentView === "map" && AppState.map) {
      setTimeout(() => AppState.map.invalidateSize(), 200);
    }
    if (AppState.currentView === "dashboard" && AppState.dashboardMiniMap) {
      setTimeout(() => AppState.dashboardMiniMap.invalidateSize(), 200);
    }

    // Update window hash
    window.location.hash = AppState.currentView;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click on sidebar items
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const view = item.getAttribute("data-view");
      navigateTo(view);

      // Close mobile sidebar if open
      const sidebar = document.getElementById("appSidebar");
      if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove("mobile-open");
      }
    });
  });

  // Handle Quick Action Buttons
  document.querySelectorAll("[data-action-view]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const view = btn.getAttribute("data-action-view");
      navigateTo(view);
    });
  });

  // Handle browser back/forward or direct hash load
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash !== AppState.currentView) {
      navigateTo(hash);
    }
  });

  // Initial load
  const initialHash = window.location.hash.replace("#", "");
  navigateTo(initialHash || "dashboard");
}

/* ==========================================================================
   2. HEADER, SIDEBAR & ACCESSIBILITY
   ========================================================================== */
function initSidebar() {
  const toggleBtn = document.getElementById("sidebarToggleBtn");
  const sidebar = document.getElementById("appSidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle("mobile-open");
      } else {
        document.body.classList.toggle("sidebar-collapsed");
      }
    });
  }
}

function initAccessibility() {
  const btnSm = document.getElementById("a11y-font-sm");
  const btnMd = document.getElementById("a11y-font-md");
  const btnLg = document.getElementById("a11y-font-lg");
  const btnContrast = document.getElementById("a11y-contrast");

  if (btnSm) {
    btnSm.addEventListener("click", () => {
      document.body.classList.remove("font-scale-md", "font-scale-lg");
      document.body.classList.add("font-scale-sm");
      showToast("Text size set to Small");
    });
  }
  if (btnMd) {
    btnMd.addEventListener("click", () => {
      document.body.classList.remove("font-scale-sm", "font-scale-lg");
      document.body.classList.add("font-scale-md");
      showToast("Text size reset to Default");
    });
  }
  if (btnLg) {
    btnLg.addEventListener("click", () => {
      document.body.classList.remove("font-scale-sm", "font-scale-md");
      document.body.classList.add("font-scale-lg");
      showToast("Text size set to Large");
    });
  }
  if (btnContrast) {
    btnContrast.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
      const isHigh = document.body.classList.contains("high-contrast");
      showToast(isHigh ? "High Contrast Mode: Enabled" : "High Contrast Mode: Disabled");
    });
  }
}

function initHeaderControls() {
  // Language Selector
  const langSelect = document.getElementById("headerLanguageSelect");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      const selected = e.target.value;
      setLanguage(selected);
    });
  }

  // Header Notifications Bell
  const notifBtn = document.getElementById("headerNotifBtn");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      const targetPanel = document.getElementById("view-alerts");
      if (targetPanel) {
        const navItem = document.querySelector('.nav-item[data-view="alerts"]');
        if (navItem) navItem.click();
      }
    });
  }

  // Header Search Input
  const headerSearch = document.getElementById("headerGlobalSearch");
  if (headerSearch) {
    headerSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = headerSearch.value.trim().toLowerCase();
        if (query) {
          // Switch to fleet or citizen and filter
          const navFleet = document.querySelector('.nav-item[data-view="fleet"]');
          if (navFleet) {
            navFleet.click();
            const fleetInput = document.getElementById("fleetSearchInput");
            if (fleetInput) {
              fleetInput.value = query;
              fleetInput.dispatchEvent(new Event("input"));
            }
          }
        }
      }
    });
  }
}

function setLanguage(lang) {
  if (!TRANSPORT_DATA.translations[lang]) return;
  AppState.currentLang = lang;
  const dict = TRANSPORT_DATA.translations[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  showToast(`Language switched to: ${lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}`);
}

function updateLiveClock() {
  const clockEl = document.getElementById("headerLiveClock");
  if (!clockEl) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  clockEl.textContent = `${timeStr} IST`;
}

/* ==========================================================================
   3. RENDER KPIS & METRICS
   ========================================================================== */
function renderKPIs() {
  const k = TRANSPORT_DATA.kpis;
  
  const totalFleetEl = document.getElementById("kpiTotalFleet");
  const activeBusesEl = document.getElementById("kpiActiveBuses");
  const onTimeEl = document.getElementById("kpiOnTime");
  const delayedEl = document.getElementById("kpiDelayed");
  const criticalEl = document.getElementById("kpiCritical");
  const demandEl = document.getElementById("kpiDemand");

  if (totalFleetEl) totalFleetEl.textContent = k.totalFleet.toLocaleString();
  if (activeBusesEl) activeBusesEl.textContent = k.activeBuses.toLocaleString();
  if (onTimeEl) onTimeEl.textContent = `${k.onTimePercentage}%`;
  if (delayedEl) delayedEl.textContent = k.delayedBuses;
  if (criticalEl) criticalEl.textContent = `0${k.criticalAlerts}`;
  if (demandEl) demandEl.textContent = `${k.passengerDemandIndex}%`;
}

/* ==========================================================================
   4. LEAFLET GIS INTERACTIVE MAP
   ========================================================================== */
function initLeafletMaps() {
  const mapElement = document.getElementById("leafletMap");
  if (!mapElement) return;

  const center = TRANSPORT_DATA.metadata.centerCoords;
  const zoom = TRANSPORT_DATA.metadata.defaultZoom;

  // Main GIS Map
  AppState.map = L.map('leafletMap', {
    center: center,
    zoom: zoom,
    zoomControl: false
  });

  L.control.zoom({ position: 'topleft' }).addTo(AppState.map);

  // Free OpenStreetMap Tiles with Government Portal subtle tone
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Government GIS Portal',
    maxZoom: 18
  }).addTo(AppState.map);

  // Initialize Layer Groups
  AppState.mapLayers.routes = L.layerGroup().addTo(AppState.map);
  AppState.mapLayers.depots = L.layerGroup().addTo(AppState.map);
  AppState.mapLayers.stops = L.layerGroup().addTo(AppState.map);
  AppState.mapLayers.heatmaps = L.layerGroup().addTo(AppState.map);
  AppState.mapLayers.buses = L.layerGroup().addTo(AppState.map);

  // Render Static Features (Routes, Stops, Depots, Congestion zones)
  renderMapRoutes();
  renderMapStops();
  renderMapDepots();
  renderDemandHeatZones();
  renderLiveBusPins();

  // Initialize Dashboard Mini Map if container exists
  const miniMapEl = document.getElementById("dashboardMiniMap");
  if (miniMapEl) {
    AppState.dashboardMiniMap = L.map('dashboardMiniMap', {
      center: center,
      zoom: 12,
      zoomControl: false,
      attributionControl: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(AppState.dashboardMiniMap);

    // Add key routes to mini map
    TRANSPORT_DATA.routes.forEach(r => {
      L.polyline(r.waypoints, {
        color: r.color,
        weight: 3,
        opacity: 0.8
      }).addTo(AppState.dashboardMiniMap);
    });

    // Add key buses to mini map
    AppState.buses.slice(0, 6).forEach(bus => {
      const color = getStatusColor(bus.status);
      L.circleMarker([bus.lat, bus.lng], {
        radius: 6,
        color: '#FFFFFF',
        weight: 1.5,
        fillColor: color,
        fillOpacity: 1
      }).addTo(AppState.dashboardMiniMap);
    });
  }

  // Hook Layer Toggle Checkboxes
  initMapLayerToggles();
}

function renderMapRoutes() {
  AppState.mapLayers.routes.clearLayers();

  TRANSPORT_DATA.routes.forEach(route => {
    const isAlt = route.id === "12B";
    const line = L.polyline(route.waypoints, {
      color: route.color,
      weight: isAlt ? 5 : 4,
      dashArray: isAlt ? "6, 8" : null,
      opacity: 0.85
    });

    line.bindPopup(`
      <div style="font-family: 'Noto Sans', sans-serif; min-width: 180px;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #0A2540;">${route.code}: ${route.name}</div>
        <div style="font-size: 0.8rem; margin: 4px 0;">Status: <strong>${route.status}</strong> (${route.delayMin} min delay)</div>
        <div style="font-size: 0.75rem; color: #64748B;">Active Buses: ${route.busesActive} | Distance: ${route.distanceKm} km</div>
      </div>
    `);

    AppState.mapLayers.routes.addLayer(line);
  });
}

function renderMapStops() {
  AppState.mapLayers.stops.clearLayers();

  TRANSPORT_DATA.stops.forEach(stop => {
    const stopIcon = L.divIcon({
      className: 'stop-pin',
      html: `
        <div style="background-color: #0A2540; color: #FFFFFF; width: 20px; height: 20px; border-radius: 4px; border: 2px solid #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          🚏
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon });
    marker.bindPopup(`
      <div style="font-family: 'Noto Sans', sans-serif;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #0A2540;">🚏 ${stop.name}</div>
        <div style="font-size: 0.8rem; margin: 4px 0;">Waiting Passengers: <strong>${stop.waitingPassengers}</strong></div>
        <div style="font-size: 0.75rem; color: #64748B;">Routes: ${stop.routes.join(", ")} | Demand: <span style="color: #DC2626; font-weight: 700;">${stop.demand}</span></div>
      </div>
    `);

    AppState.mapLayers.stops.addLayer(marker);
  });
}

function renderMapDepots() {
  AppState.mapLayers.depots.clearLayers();

  TRANSPORT_DATA.depots.forEach(depot => {
    const depotIcon = L.divIcon({
      className: 'depot-pin',
      html: `
        <div style="background-color: #1E40AF; color: #FFFFFF; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; box-shadow: 0 2px 5px rgba(0,0,0,0.35);">
          🏛️
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const marker = L.marker([depot.lat, depot.lng], { icon: depotIcon });
    marker.bindPopup(`
      <div style="font-family: 'Noto Sans', sans-serif;">
        <div style="font-weight: 700; font-size: 0.9rem; color: #0A2540;">🏛️ ${depot.name}</div>
        <div style="font-size: 0.8rem; margin: 4px 0;">Standby Buses Available: <strong style="color: #059669;">${depot.availableStandby}</strong></div>
        <div style="font-size: 0.75rem; color: #64748B;">Depot Total Capacity: ${depot.capacity} Vehicles</div>
        <button class="btn btn-sm btn-primary" style="margin-top: 6px; width: 100%;" onclick="dispatchStandbyBus('${depot.name}')">Dispatch Standby Bus</button>
      </div>
    `);

    AppState.mapLayers.depots.addLayer(marker);
  });
}

function renderDemandHeatZones() {
  AppState.mapLayers.heatmaps.clearLayers();

  // High demand passenger clusters represented with translucent concentric rings
  const clusters = [
    { lat: 18.5529, lng: 73.8260, radius: 450, color: "#DC2626", label: "University Road (SPPU) - Peak Overcrowding" },
    { lat: 18.5280, lng: 73.8510, radius: 400, color: "#DC2626", label: "Sancheti Chowk - Bottleneck Congestion" },
    { lat: 18.5018, lng: 73.8580, radius: 350, color: "#F59E0B", label: "Swargate Central Hub - High Passenger Flow" }
  ];

  clusters.forEach(c => {
    const circle = L.circle([c.lat, c.lng], {
      color: c.color,
      fillColor: c.color,
      fillOpacity: 0.22,
      radius: c.radius,
      weight: 1.5
    });

    circle.bindTooltip(`<strong>${c.label}</strong>`, { sticky: true });
    AppState.mapLayers.heatmaps.addLayer(circle);
  });
}

function renderLiveBusPins() {
  if (!AppState.mapLayers.buses) return;
  AppState.mapLayers.buses.clearLayers();

  AppState.buses.forEach(bus => {
    const color = getStatusColor(bus.status);
    const busIcon = L.divIcon({
      className: 'bus-marker-pin',
      html: `
        <div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 3px 6px rgba(0,0,0,0.35); cursor: pointer;">
          🚌
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const marker = L.marker([bus.lat, bus.lng], { icon: busIcon });
    
    // Popup with exact required details: Bus ID, Route, Status, Speed, Next Stop, ETA
    marker.bindPopup(`
      <div style="font-family: 'Noto Sans', sans-serif; width: 220px; padding: 2px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid #E2E8F0; padding-bottom: 4px;">
          <strong style="font-size: 1rem; color: #0A2540;">${bus.id}</strong>
          <span class="badge badge-${bus.status.toLowerCase().replace(' ', '-')}">${bus.status}</span>
        </div>
        <div style="font-size: 0.8rem; margin-bottom: 3px;"><strong>Route:</strong> ${bus.route} (${bus.routeName})</div>
        <div style="font-size: 0.8rem; margin-bottom: 3px;"><strong>Speed:</strong> ${bus.speed} km/h</div>
        <div style="font-size: 0.8rem; margin-bottom: 3px;"><strong>Next Stop:</strong> ${bus.nextStop}</div>
        <div style="font-size: 0.8rem; margin-bottom: 3px;"><strong>ETA:</strong> ${bus.eta}</div>
        <div style="font-size: 0.75rem; color: #64748B; margin-top: 6px; padding-top: 4px; border-top: 1px dashed #CBD5E1;">
          Reg: ${bus.regNo} | Battery: ${bus.fuelBattery}% | Load: ${bus.occupancy}%
        </div>
        <button class="btn btn-sm btn-secondary" style="width: 100%; margin-top: 8px;" onclick="openBusModal('${bus.id}')">View Complete Telemetry</button>
      </div>
    `);

    marker.on('click', () => {
      // Also update side telemetry bar if open
      showFloatingBusCard(bus);
    });

    AppState.mapLayers.buses.addLayer(marker);
  });
}

function showFloatingBusCard(bus) {
  const card = document.getElementById("mapFloatingBusInfo");
  if (!card) return;

  card.style.display = "block";
  document.getElementById("mapCardBusId").textContent = bus.id;
  document.getElementById("mapCardRoute").textContent = `Route ${bus.route} (${bus.routeName})`;
  document.getElementById("mapCardStatus").textContent = bus.status;
  document.getElementById("mapCardStatus").className = `badge badge-${bus.status.toLowerCase().replace(' ', '-')}`;
  document.getElementById("mapCardSpeed").textContent = `${bus.speed} km/h`;
  document.getElementById("mapCardNextStop").textContent = bus.nextStop;
  document.getElementById("mapCardEta").textContent = bus.eta;
}

function initMapLayerToggles() {
  const toggleTraffic = document.getElementById("layerToggleTraffic");
  const toggleHeatmap = document.getElementById("layerToggleHeatmap");
  const toggleStops = document.getElementById("layerToggleStops");
  const toggleDepots = document.getElementById("layerToggleDepots");
  const filterRouteSelect = document.getElementById("mapFilterRoute");

  if (toggleTraffic) {
    toggleTraffic.addEventListener("change", (e) => {
      if (e.target.checked) {
        AppState.map.addLayer(AppState.mapLayers.routes);
      } else {
        AppState.map.removeLayer(AppState.mapLayers.routes);
      }
    });
  }

  if (toggleHeatmap) {
    toggleHeatmap.addEventListener("change", (e) => {
      if (e.target.checked) {
        AppState.map.addLayer(AppState.mapLayers.heatmaps);
      } else {
        AppState.map.removeLayer(AppState.mapLayers.heatmaps);
      }
    });
  }

  if (toggleStops) {
    toggleStops.addEventListener("change", (e) => {
      if (e.target.checked) {
        AppState.map.addLayer(AppState.mapLayers.stops);
      } else {
        AppState.map.removeLayer(AppState.mapLayers.stops);
      }
    });
  }

  if (toggleDepots) {
    toggleDepots.addEventListener("change", (e) => {
      if (e.target.checked) {
        AppState.map.addLayer(AppState.mapLayers.depots);
      } else {
        AppState.map.removeLayer(AppState.mapLayers.depots);
      }
    });
  }

  if (filterRouteSelect) {
    filterRouteSelect.addEventListener("change", (e) => {
      const selectedRoute = e.target.value;
      if (selectedRoute === "ALL") {
        renderMapRoutes();
      } else {
        AppState.mapLayers.routes.clearLayers();
        const routeObj = TRANSPORT_DATA.routes.find(r => r.id === selectedRoute);
        if (routeObj) {
          const line = L.polyline(routeObj.waypoints, {
            color: routeObj.color,
            weight: 5,
            opacity: 0.95
          }).addTo(AppState.mapLayers.routes);
          AppState.map.fitBounds(line.getBounds(), { padding: [40, 40] });
        }
      }
    });
  }
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'on time': return '#10B981';
    case 'delayed': return '#F59E0B';
    case 'critical': return '#DC2626';
    case 'maintenance': return '#2563EB';
    case 'offline': default: return '#64748B';
  }
}

/* ==========================================================================
   5. LIVE FLEET MONITORING (TABLE & MODAL)
   ========================================================================== */
function initFleetTable() {
  const searchInput = document.getElementById("fleetSearchInput");
  const routeFilter = document.getElementById("fleetRouteFilter");
  const statusFilter = document.getElementById("fleetStatusFilter");

  function refreshTable() {
    const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
    const r = routeFilter ? routeFilter.value : "ALL";
    const s = statusFilter ? statusFilter.value : "ALL";

    const filtered = AppState.buses.filter(bus => {
      const matchesQuery = !q || 
        bus.id.toLowerCase().includes(q) || 
        bus.route.toLowerCase().includes(q) ||
        bus.nextStop.toLowerCase().includes(q) ||
        bus.driver.toLowerCase().includes(q) ||
        bus.regNo.toLowerCase().includes(q);

      const matchesRoute = r === "ALL" || bus.route === r;
      const matchesStatus = s === "ALL" || bus.status.toLowerCase() === s.toLowerCase();

      return matchesQuery && matchesRoute && matchesStatus;
    });

    renderFleetRows(filtered);
    updateFleetSummaryCounters(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", refreshTable);
  if (routeFilter) routeFilter.addEventListener("change", refreshTable);
  if (statusFilter) statusFilter.addEventListener("change", refreshTable);

  // Initial render
  refreshTable();
}

function renderFleetRows(busesList) {
  const tbody = document.getElementById("fleetTableBody");
  if (!tbody) return;

  if (busesList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 24px; color: #64748B;">
          No buses found matching current filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = busesList.map(bus => {
    const statusClass = `badge badge-${bus.status.toLowerCase().replace(' ', '-')}`;
    return `
      <tr>
        <td>
          <div style="font-weight: 700; color: #0A2540;">${bus.id}</div>
          <div style="font-size: 0.72rem; color: #64748B;">${bus.regNo}</div>
        </td>
        <td>
          <div style="font-weight: 600;">Route ${bus.route}</div>
          <div style="font-size: 0.72rem; color: #64748B;">${bus.routeName}</div>
        </td>
        <td><span class="${statusClass}">${bus.status}</span></td>
        <td><strong>${bus.speed}</strong> km/h</td>
        <td><span style="font-weight: 600; color: ${bus.status === 'Delayed' ? '#D97706' : '#0F172A'}">${bus.eta}</span></td>
        <td>${bus.nextStop}</td>
        <td style="text-align: right;">
          <button class="btn btn-sm btn-secondary" onclick="openBusModal('${bus.id}')">View Details</button>
          <button class="btn btn-sm btn-primary" onclick="locateBusOnMap('${bus.id}')" title="Track Live">📍 Map</button>
        </td>
      </tr>
    `;
  }).join("");
}

function updateFleetSummaryCounters(list) {
  const countTotal = document.getElementById("fleetCountTotal");
  const countActive = document.getElementById("fleetCountActive");
  const countDelayed = document.getElementById("fleetCountDelayed");
  const countCritical = document.getElementById("fleetCountCritical");

  if (countTotal) countTotal.textContent = AppState.buses.length;
  if (countActive) countActive.textContent = AppState.buses.filter(b => b.status === "On Time" || b.status === "Delayed").length;
  if (countDelayed) countDelayed.textContent = AppState.buses.filter(b => b.status === "Delayed").length;
  if (countCritical) countCritical.textContent = AppState.buses.filter(b => b.status === "Critical").length;
}

function openBusModal(busId) {
  const bus = AppState.buses.find(b => b.id === busId);
  if (!bus) return;

  const modal = document.getElementById("busDetailModal");
  if (!modal) return;

  document.getElementById("modalBusTitle").textContent = `${bus.id} Telemetry & Fleet Profile`;
  document.getElementById("modalBusReg").textContent = bus.regNo;
  document.getElementById("modalBusRoute").textContent = `Route ${bus.route}: ${bus.routeName}`;
  document.getElementById("modalBusStatus").textContent = bus.status;
  document.getElementById("modalBusStatus").className = `badge badge-${bus.status.toLowerCase().replace(' ', '-')}`;
  document.getElementById("modalBusSpeed").textContent = `${bus.speed} km/h`;
  document.getElementById("modalBusEta").textContent = bus.eta;
  document.getElementById("modalBusNextStop").textContent = bus.nextStop;
  document.getElementById("modalBusDriver").textContent = bus.driver;
  document.getElementById("modalBusConductor").textContent = bus.conductor || "N/A";
  document.getElementById("modalBusType").textContent = bus.type;
  document.getElementById("modalBusBattery").textContent = `${bus.fuelBattery}%`;
  document.getElementById("modalBusOccupancy").textContent = `${bus.occupancy}%`;

  // Update battery & load bar widths
  const batteryBar = document.getElementById("modalBatteryBar");
  const loadBar = document.getElementById("modalLoadBar");
  if (batteryBar) batteryBar.style.width = `${bus.fuelBattery}%`;
  if (loadBar) loadBar.style.width = `${bus.occupancy}%`;

  modal.classList.add("active");
}

function closeBusModal() {
  const modal = document.getElementById("busDetailModal");
  if (modal) modal.classList.remove("active");
}

function locateBusOnMap(busId) {
  const bus = AppState.buses.find(b => b.id === busId);
  if (!bus) return;

  // Switch to GIS Map
  const navMap = document.querySelector('.nav-item[data-view="map"]');
  if (navMap) navMap.click();

  setTimeout(() => {
    if (AppState.map) {
      AppState.map.setView([bus.lat, bus.lng], 16);
      showFloatingBusCard(bus);
      showToast(`Tracking ${bus.id} on GIS Live Map`);
    }
  }, 250);
}

/* ==========================================================================
   6. AI ANALYTICS & EXPLAINABLE AI (XAI)
   ========================================================================== */
function executeAiRecommendation(actionType) {
  if (actionType === 'deployBuses') {
    showToast("✅ Executing: 2 Standby Electric Buses dispatched from Shivaji Nagar Depot to Route 12.");
    
    // Add realistic feedback
    const btn = document.getElementById("btnApproveAiDeploy");
    if (btn) {
      btn.innerHTML = "✓ Dispatched (Order #ORD-8921)";
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      btn.disabled = true;
    }
  } else if (actionType === 'rerouteBypass') {
    showToast("✅ Dynamic Reroute Applied: Route 12 traffic diverted via SB Road Bypass (Route 12B). Commuters alerted.");
    const btn = document.getElementById("btnApplyReroute");
    if (btn) {
      btn.innerHTML = "✓ Active on Traffic Management Grid";
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-success");
      btn.disabled = true;
    }
  }
}

function dispatchStandbyBus(depotName) {
  showToast(`✅ Dispatched standby bus from ${depotName}. ETA to line: 6 minutes.`);
}

/* ==========================================================================
   7. ALERTS & INCIDENT MANAGEMENT
   ========================================================================== */
function initAlerts() {
  const alertsContainer = document.getElementById("alertsFeedContainer");
  const filterBtns = document.querySelectorAll(".alert-filter-btn");

  function renderAlerts(filter) {
    if (!alertsContainer) return;

    const filtered = AppState.alerts.filter(a => {
      if (!filter || filter === "ALL") return true;
      return a.level.toLowerCase() === filter.toLowerCase();
    });

    if (filtered.length === 0) {
      alertsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: #64748B;">No alerts found for selected filter.</div>`;
      return;
    }

    alertsContainer.innerHTML = filtered.map(a => `
      <div class="alert-item ${a.level}">
        <div class="alert-header">
          <div class="alert-title">${a.title}</div>
          <div class="alert-time">🕒 ${a.time}</div>
        </div>
        <div class="alert-detail">
          <strong>Location:</strong> ${a.location} | <strong>Target:</strong> ${a.busId} (${a.route})<br>
          ${a.detail}
        </div>
        <div class="alert-actions">
          <button class="btn btn-sm btn-primary" onclick="handleAlertAction('${a.id}', '${a.busId}')">
            ${a.actionLabel || "View on Map"}
          </button>
          <button class="btn btn-sm btn-secondary" onclick="acknowledgeAlert('${a.id}')">
            Acknowledge & Log
          </button>
        </div>
      </div>
    `).join("");
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
      const level = btn.getAttribute("data-alert-filter");
      renderAlerts(level);
    });
  });

  // Initial render
  renderAlerts("ALL");
}

function handleAlertAction(alertId, busId) {
  if (busId && busId !== "MULTIPLE" && busId !== "CIVIL") {
    locateBusOnMap(busId);
  } else {
    // Switch to Map and center on main junction
    const navMap = document.querySelector('.nav-item[data-view="map"]');
    if (navMap) navMap.click();
    setTimeout(() => {
      if (AppState.map) {
        AppState.map.setView([18.5280, 73.8510], 15);
      }
    }, 200);
  }
}

function acknowledgeAlert(alertId) {
  showToast(`Alert [${alertId}] marked as Acknowledged by Control Room.`);
}

/* ==========================================================================
   8. CITIZEN / PASSENGER PORTAL
   ========================================================================== */
function initCitizenPortal() {
  const searchInput = document.getElementById("citizenSearchInput");
  const searchBtn = document.getElementById("citizenSearchBtn");
  const resultsDiv = document.getElementById("citizenSearchResults");

  function searchBusArrival() {
    if (!searchInput || !resultsDiv) return;
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      resultsDiv.innerHTML = `<div style="padding: 12px; color: #64748B;">Please enter a bus number (e.g., 1024, 1025) or route number (e.g., 12, 45, 101).</div>`;
      return;
    }

    const matches = AppState.buses.filter(b => 
      b.id.toLowerCase().includes(query) || 
      b.route.toLowerCase().includes(query) ||
      b.routeName.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsDiv.innerHTML = `<div style="padding: 14px; color: #DC2626; background: #FEF2F2; border-radius: 4px;">No upcoming buses found for query "${query}". Please check the route number.</div>`;
      return;
    }

    resultsDiv.innerHTML = matches.slice(0, 4).map(b => `
      <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 14px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <div style="font-weight: 700; font-size: 1rem; color: #0A2540;">🚌 Route ${b.route} (${b.routeName})</div>
          <div style="font-size: 0.8rem; color: #475569;">Bus ID: <strong>${b.id}</strong> | Next Stop: <strong>${b.nextStop}</strong></div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.25rem; font-weight: 800; color: #1D4ED8;">ETA: ${b.eta}</div>
          <span class="badge badge-${b.status.toLowerCase().replace(' ', '-')}">${b.status}</span>
        </div>
      </div>
    `).join("");
  }

  if (searchBtn) searchBtn.addEventListener("click", searchBusArrival);
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchBusArrival();
    });
  }

  // Grievance / Feedback form submission
  const feedbackForm = document.getElementById("citizenFeedbackForm");
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const ticketId = "GRV-PMPML-" + Math.floor(100000 + Math.random() * 900000);
      showToast(`Grievance submitted successfully! Reference ID: ${ticketId}`);
      
      const responseBox = document.getElementById("citizenFeedbackResponse");
      if (responseBox) {
        responseBox.style.display = "block";
        responseBox.innerHTML = `
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; padding: 12px; border-radius: 6px;">
            <strong>Ticket Acknowledged:</strong> Your complaint has been registered under ID <strong>${ticketId}</strong>. An SMS confirmation has been dispatched to your mobile. Expected resolution within 24 hours.
          </div>
        `;
      }
      feedbackForm.reset();
    });
  }
}

/* ==========================================================================
   9. REPORTS & EXPORTS
   ========================================================================== */
function initReports() {
  // CSV Export
  window.exportFleetCSV = function() {
    const headers = ["Bus ID", "Registration", "Route", "Route Name", "Status", "Speed (km/h)", "ETA", "Next Stop", "Battery (%)", "Occupancy (%)", "Driver"];
    const rows = AppState.buses.map(b => [
      b.id,
      b.regNo,
      b.route,
      `"${b.routeName}"`,
      b.status,
      b.speed,
      b.eta,
      `"${b.nextStop}"`,
      b.fuelBattery,
      b.occupancy,
      `"${b.driver}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Gov_Transport_Fleet_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✅ CSV Telemetry Report downloaded successfully.");
  };

  // View Report Modal
  window.viewReportPreview = function(reportTitle) {
    const modal = document.getElementById("reportModal");
    if (!modal) return;
    document.getElementById("reportModalTitle").textContent = reportTitle;
    document.getElementById("reportModalDate").textContent = `Generated on ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} at ${new Date().toLocaleTimeString()}`;
    modal.classList.add("active");
  };

  window.closeReportModal = function() {
    const modal = document.getElementById("reportModal");
    if (modal) modal.classList.remove("active");
  };
}

/* ==========================================================================
   10. DATA & APIS STATUS
   ========================================================================== */
function initApiStatus() {
  const container = document.getElementById("apiStatusContainer");
  if (!container) return;

  container.innerHTML = TRANSPORT_DATA.apiStatus.map(api => `
    <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 14px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
      <div>
        <div style="font-weight: 700; color: #0A2540; font-size: 0.9rem;">${api.service}</div>
        <div style="font-size: 0.75rem; color: #64748B;">Protocol: <code>${api.protocol}</code> | Uptime: <strong>${api.uptime}</strong></div>
      </div>
      <div style="text-align: right;">
        <span class="badge badge-on-time">${api.status}</span>
        <div style="font-size: 0.72rem; color: #059669; font-weight: 600; margin-top: 3px;">Ping: ${api.latency}</div>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   11. CHART.JS VISUALIZATIONS
   ========================================================================== */
function initCharts() {
  // Chart 1: Demand Prediction Peak Hours (Line & Bar)
  const demandCtx = document.getElementById("demandPredictionChart");
  if (demandCtx && typeof Chart !== 'undefined') {
    AppState.charts.demand = new Chart(demandCtx, {
      type: 'line',
      data: {
        labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00 (Peak)', '20:00', '22:00'],
        datasets: [
          {
            label: 'Predicted Passenger Demand (Commuters/hr)',
            data: [280, 890, 1150, 620, 580, 940, 1420, 880, 310],
            borderColor: '#1D4ED8',
            backgroundColor: 'rgba(29, 78, 216, 0.1)',
            fill: true,
            tension: 0.35,
            borderWidth: 2.5
          },
          {
            label: 'Current Bus Seating Capacity',
            data: [400, 800, 950, 700, 700, 850, 980, 800, 450],
            borderColor: '#10B981',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { font: { family: 'Noto Sans', size: 11 } } },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: '#F1F5F9' }, ticks: { font: { family: 'Noto Sans', size: 10 } } },
          x: { grid: { display: false }, ticks: { font: { family: 'Noto Sans', size: 10 } } }
        }
      }
    });
  }

  // Chart 2: Fleet Performance Distribution (Doughnut)
  const fleetPerfCtx = document.getElementById("fleetPerformanceChart");
  if (fleetPerfCtx && typeof Chart !== 'undefined') {
    AppState.charts.performance = new Chart(fleetPerfCtx, {
      type: 'doughnut',
      data: {
        labels: ['On-Time (82%)', 'Delayed (10%)', 'Critical/Alerts (2%)', 'Maintenance (4%)', 'Offline (2%)'],
        datasets: [{
          data: [1025, 126, 25, 50, 24],
          backgroundColor: ['#10B981', '#F59E0B', '#DC2626', '#2563EB', '#94A3B8'],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Noto Sans', size: 10 } } }
        },
        cutout: '68%'
      }
    });
  }
}

/* ==========================================================================
   12. LIVE GPS TELEMETRY SIMULATION LOOP
   ========================================================================== */
function startGpsSimulation() {
  // Gently simulates moving vehicles, speeds, and timestamps every 3.5 seconds
  setInterval(() => {
    if (!AppState.simulationActive) return;

    AppState.buses.forEach(bus => {
      // Don't move stalled or offline vehicles
      if (bus.status === "Maintenance" || bus.status === "Offline" || bus.status === "Critical") return;

      // Small jitter in GPS coordinates to simulate motion along routes
      const latDelta = (Math.random() - 0.5) * 0.0006;
      const lngDelta = (Math.random() - 0.5) * 0.0006;
      bus.lat += latDelta;
      bus.lng += lngDelta;

      // Small speed variance (+/- 3 km/h)
      const speedChange = Math.floor((Math.random() - 0.5) * 4);
      bus.speed = Math.max(12, Math.min(52, bus.speed + speedChange));
      bus.lastPing = "Just now";
    });

    // Re-render live map markers if map is visible
    if (AppState.currentView === "map" || AppState.currentView === "dashboard") {
      renderLiveBusPins();
    }
  }, 3500);
}

/* ==========================================================================
   13. TOAST NOTIFICATIONS HELPER
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>ℹ️</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global modal dismiss handler
window.addEventListener("click", (e) => {
  const busModal = document.getElementById("busDetailModal");
  const repModal = document.getElementById("reportModal");
  if (e.target === busModal) closeBusModal();
  if (e.target === repModal) closeReportModal();
});
