import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { formatTime } from '../utils/formatters';
import { 
  Languages, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ChevronDown, 
  LogOut, 
  User, 
  ShieldCheck, 
  BusFront, 
  MapPin, 
  AlertTriangle, 
  Building2, 
  CheckCircle2,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { 
    language, 
    setLanguage, 
    t, 
    buses, 
    routes, 
    stopsData, 
    alerts, 
    setSelectedBusId 
  } = useApp();
  const { user, logout } = useAuth();

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifContainerRef = useRef<HTMLDivElement>(null);

  // Live IST Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close search & dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
      if (notifContainerRef.current && !notifContainerRef.current.contains(target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-mode');
  };

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await logout();
    navigate('/login', { 
      replace: true, 
      state: { message: t('loggedOut') || 'You have been securely logged out.' } 
    });
  };

  // Search filter calculations
  const query = searchQuery.trim().toLowerCase();
  const matchingBuses = query ? buses.filter(b => 
    b.id.toLowerCase().includes(query) || 
    b.regNo.toLowerCase().includes(query) ||
    b.route.toLowerCase().includes(query) ||
    b.driver.toLowerCase().includes(query)
  ).slice(0, 3) : [];

  const matchingRoutes = query ? routes.filter(r => 
    r.code.toLowerCase().includes(query) || 
    r.name.toLowerCase().includes(query)
  ).slice(0, 2) : [];

  const matchingStops = query ? stopsData.stops.filter(s => 
    s.name.toLowerCase().includes(query)
  ).slice(0, 2) : [];

  const matchingDepots = query ? stopsData.depots.filter(d => 
    d.name.toLowerCase().includes(query)
  ).slice(0, 2) : [];

  const matchingAlerts = query ? alerts.filter(a => 
    a.title.toLowerCase().includes(query) || 
    a.location.toLowerCase().includes(query)
  ).slice(0, 2) : [];

  const hasSearchResults = query.length > 0 && (
    matchingBuses.length > 0 || 
    matchingRoutes.length > 0 || 
    matchingStops.length > 0 || 
    matchingDepots.length > 0 || 
    matchingAlerts.length > 0
  );

  const handleSelectBus = (busId: string) => {
    setSelectedBusId(busId);
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/fleet');
  };

  const handleSelectRoute = (routeCode: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/traffic');
  };

  const handleSelectStop = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/map');
  };

  const handleSelectAlert = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/alerts');
  };

  return (
    <header className="gov-header-container" style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      {/* 1. Official Tricolor Accent Strip */}
      <div style={{
        background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
        height: '4px',
        width: '100%'
      }} />

      {/* 2. Top Administrative Entity Strip (Government of India) */}
      <div style={{
        backgroundColor: '#0A2540',
        color: '#FFFFFF',
        padding: '4px 20px',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {t('govIndia')}
          </span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ opacity: 0.9 }}>{t('ministry')}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Operational Status Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)'
            }} />
            <span style={{ color: '#D1FAE5', fontWeight: 600, fontSize: '11px' }}>
              {t('operational')} • {formatTime(currentTime, language)}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Executive Header */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
      }}>
        
        {/* Left Side: National Emblem + System Name */}
        <div 
          onClick={() => navigate('/')} 
          style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img 
              src="/assets/emblem.svg" 
              alt="National Emblem of India" 
              style={{ height: '42px', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--gov-navy)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.1
            }}>
              {t('govIndia')}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              {t('portalTitle')}
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.2, marginTop: '1px' }}>
              {t('subTitle')}
            </div>
          </div>
        </div>

        {/* Center/Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          
          {/* Functional Search Bar with Live Categorized Results */}
          <div ref={searchContainerRef} style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface-alt)',
              border: '1px solid var(--border-color)',
              borderRadius: '9999px',
              padding: '6px 14px',
              gap: '8px',
              width: '260px',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
            }}>
              <Search size={14} style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                placeholder={t('searchPlaceholder')}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  width: '100%',
                  fontWeight: 500
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-muted)' }}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div style={{
                position: 'absolute',
                top: '40px',
                left: 0,
                width: '360px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                zIndex: 1300,
                padding: '8px',
                maxHeight: '380px',
                overflowY: 'auto'
              }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '4px 8px 6px', borderBottom: '1px solid var(--border-light)' }}>
                  {t('searchResults')}
                </div>

                {!hasSearchResults && (
                  <div style={{ padding: '16px', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {t('noResultsFound')}
                  </div>
                )}

                {/* Matching Buses */}
                {matchingBuses.length > 0 && (
                  <div style={{ marginTop: '6px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gov-blue)', padding: '2px 8px' }}>
                      FLEET BUSES
                    </div>
                    {matchingBuses.map(bus => (
                      <div
                        key={bus.id}
                        onClick={() => handleSelectBus(bus.id)}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: 'var(--text-primary)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <BusFront size={13} style={{ color: 'var(--gov-blue)' }} />
                          <span style={{ fontWeight: 700 }}>{bus.id}</span>
                          <span style={{ color: 'var(--text-muted)' }}>({bus.regNo})</span>
                        </div>
                        <span style={{ 
                          fontSize: '9.5px', 
                          fontWeight: 700, 
                          color: bus.status === 'On Time' ? '#059669' : '#DC2626',
                          backgroundColor: bus.status === 'On Time' ? '#ECFDF5' : '#FEF2F2',
                          padding: '1px 5px',
                          borderRadius: '3px'
                        }}>
                          {bus.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matching Routes */}
                {matchingRoutes.length > 0 && (
                  <div style={{ marginTop: '6px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--gov-navy)', padding: '2px 8px' }}>
                      ROUTES & CORRIDORS
                    </div>
                    {matchingRoutes.map(route => (
                      <div
                        key={route.id}
                        onClick={() => handleSelectRoute(route.code)}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: 'var(--text-primary)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={13} style={{ color: '#D97706' }} />
                          <span style={{ fontWeight: 700 }}>Route {route.code}:</span>
                          <span style={{ color: 'var(--text-muted)' }}>{route.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matching Depots & Stops */}
                {(matchingDepots.length > 0 || matchingStops.length > 0) && (
                  <div style={{ marginTop: '6px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#059669', padding: '2px 8px' }}>
                      DEPOTS & STOPS
                    </div>
                    {matchingDepots.map(depot => (
                      <div
                        key={depot.id}
                        onClick={handleSelectStop}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: 'var(--text-primary)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Building2 size={13} style={{ color: '#059669' }} />
                          <span style={{ fontWeight: 700 }}>{depot.name}</span>
                        </div>
                        <span style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>
                          {depot.availableStandby} Standby
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matching Alerts */}
                {matchingAlerts.length > 0 && (
                  <div style={{ marginTop: '6px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#DC2626', padding: '2px 8px' }}>
                      URBAN INCIDENTS
                    </div>
                    {matchingAlerts.map(alert => (
                      <div
                        key={alert.id}
                        onClick={handleSelectAlert}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: 'var(--text-primary)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <AlertTriangle size={13} style={{ color: '#DC2626' }} />
                          <span style={{ fontWeight: 700 }}>{alert.title}</span>
                        </div>
                        <span style={{ fontSize: '9.5px', color: '#DC2626', fontWeight: 700 }}>
                          {alert.level}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Fully Functional Language Selector */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px 8px',
            backgroundColor: 'var(--bg-surface-alt)'
          }}>
            <Languages size={13} style={{ color: 'var(--gov-blue)' }} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
              title="Change Portal Language"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface-alt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
            title="Toggle Light / Dark Theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Priority Alerts Notification Bell */}
          <div ref={notifContainerRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotif(!showNotif)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface-alt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                position: 'relative'
              }}
              title={t('notifications')}
            >
              <Bell size={15} />
              <span style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                boxShadow: '0 0 0 2px var(--bg-surface)'
              }} />
            </button>

            {showNotif && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                width: '300px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                zIndex: 1300,
                padding: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 800, fontSize: '12px', color: 'var(--gov-navy)' }}>
                    {t('notifications')} (2)
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--gov-blue)', cursor: 'pointer', fontWeight: 600 }}>
                    {t('markAllRead')}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div 
                    onClick={() => { setShowNotif(false); navigate('/alerts'); }}
                    style={{ fontSize: '11px', padding: '8px', backgroundColor: '#FEF2F2', borderRadius: '6px', borderLeft: '3px solid #DC2626', cursor: 'pointer' }}
                  >
                    <div style={{ fontWeight: 700, color: '#DC2626' }}>Deep Pothole Anomaly (8.2cm)</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>Sector 4 • Vehicle #102 • Action Required</div>
                  </div>
                  <div 
                    onClick={() => { setShowNotif(false); navigate('/traffic'); }}
                    style={{ fontSize: '11px', padding: '8px', backgroundColor: '#FFFBEB', borderRadius: '6px', borderLeft: '3px solid #D97706', cursor: 'pointer' }}
                  >
                    <div style={{ fontWeight: 700, color: '#D97706' }}>Congestion Bottleneck (9 km/h)</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>Sancheti Chowk • Route 12 Adherence Drop</div>
                  </div>
                </div>

                <div 
                  onClick={() => { setShowNotif(false); navigate('/alerts'); }}
                  style={{ textAlign: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-light)', fontSize: '11px', fontWeight: 700, color: 'var(--gov-blue)', cursor: 'pointer' }}
                >
                  {t('viewAllAlerts')} →
                </div>
              </div>
            )}
          </div>

          {/* Authenticated Officer Profile with Clean Government Panel */}
          <div ref={profileMenuRef} style={{ position: 'relative' }}>
            {(() => {
              const officerName = user?.name || 'Officer';
              const officerDesignation = user?.roleTitle || 'Transport Control Officer';
              const officerDept = user?.department || 'Command & Control Center, Urban Transport Authority';
              const officerId = user?.badgeId || user?.id;
              const initials = officerName
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map(w => w[0].toUpperCase())
                .join('') || officerName.slice(0, 2).toUpperCase() || 'OF';

              return (
                <>
                  <div 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderLeft: '1px solid var(--border-color)',
                      paddingLeft: '12px',
                      cursor: 'pointer'
                    }}
                    title={t('officerProfile')}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#1B3A6F',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      {initials}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                        {officerName}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.1, marginTop: '2px' }}>
                        {officerDesignation}
                      </span>
                    </div>
                    <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
                  </div>

                  {/* Officer Profile Dropdown Panel */}
                  {showProfileMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '42px',
                      right: 0,
                      width: '270px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      boxShadow: '0 8px 24px rgba(27, 58, 111, 0.15)',
                      zIndex: 1300,
                      overflow: 'hidden',
                      animation: 'modal-enter 0.15s ease-out'
                    }}>
                      {/* Header title */}
                      <div style={{
                        backgroundColor: '#1B3A6F',
                        color: '#FFFFFF',
                        padding: '10px 14px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase'
                      }}>
                        {t('officerProfile')}
                      </div>

                      <div style={{ padding: '16px' }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          paddingBottom: '14px',
                          borderBottom: '1px solid var(--border-light)'
                        }}>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                            {officerName}
                          </div>
                          <div style={{ fontSize: '12px', color: '#1B3A6F', fontWeight: 700 }}>
                            {officerDesignation}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.35 }}>
                            {officerDept}
                          </div>
                          {officerId && (
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', fontFamily: 'monospace' }}>
                              ID: {officerId}
                            </div>
                          )}
                        </div>

                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            marginTop: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            border: '1px solid #FECACA',
                            backgroundColor: '#FEF2F2',
                            color: '#C62828',
                            fontSize: '12px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEE2E2'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                        >
                          <LogOut size={14} />
                          <span>{t('logout')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
