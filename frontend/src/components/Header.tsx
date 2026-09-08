import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Eye, Languages, Search, Bell, Moon, Sun, ChevronDown, CheckCircle2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    fontSize, 
    setFontSize, 
    highContrast, 
    toggleHighContrast 
  } = useApp();

  const [clock, setClock] = useState<string>('--:--:-- IST');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showNotif, setShowNotif] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="gov-nextadmin-header" style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      {/* 1. Official Tricolor Accent Strip & SIH Prototype Banner */}
      <div className="sih-top-strip" style={{
        background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
        height: '4px',
        width: '100%'
      }} />

      {/* Top Utility Bar with Accessibility and Prototype Note */}
      <div style={{
        backgroundColor: 'var(--gov-navy)',
        color: '#FFFFFF',
        padding: '3px 20px',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: '#E66E19',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '9px',
            padding: '1px 6px',
            borderRadius: '2px',
            letterSpacing: '0.04em'
          }}>
            SIH 2026 PROTOTYPE
          </span>
          <span style={{ opacity: 0.9 }}>Government of India • Ministry of Housing and Urban Affairs</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Accessibility Font Size Scaling */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ opacity: 0.75 }}>Text:</span>
            <button
              onClick={() => setFontSize('normal')}
              style={{
                background: fontSize === 'normal' ? 'rgba(255,255,255,0.25)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                borderRadius: '2px',
                padding: '0 4px',
                fontSize: '10px',
                cursor: 'pointer'
              }}
              title="Standard font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              style={{
                background: fontSize === 'large' ? 'rgba(255,255,255,0.25)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                borderRadius: '2px',
                padding: '0 4px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Large font size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: highContrast ? '#FBBF24' : 'transparent',
              color: highContrast ? '#000000' : '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '2px',
              padding: '1px 6px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
            title="Toggle high contrast accessibility mode"
          >
            <Eye size={11} />
            <span>Contrast</span>
          </button>
        </div>
      </div>

      {/* 2. Main Executive Header matching Section 4 & NextAdmin */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        
        {/* Left Side: Emblem + Government of India / UTIS Text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img 
              src="/assets/emblem.svg" 
              alt="National Emblem of India" 
              style={{ height: '38px', objectFit: 'contain' }}
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
              Government of India
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2
            }}>
              Urban Transport Intelligence System
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              AI-Powered Mobile Urban Intelligence Platform Using Public Transport Fleet
            </div>
          </div>
        </div>

        {/* Right Side: Operational Status, Timestamp, Language, Search, Theme, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Section 4: System Status: ● Operational */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ECFDF5',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 700
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
            }} />
            <span>Operational</span>
          </div>

          {/* Section 4: Last Updated Dynamic Timestamp */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-surface-alt)',
            border: '1px solid var(--border-color)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '11px',
            color: 'var(--text-primary)',
            fontFamily: 'monospace',
            fontWeight: 700
          }}>
            <span>{clock}</span>
          </div>

          {/* Search Bar matching NextAdmin reference */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-alt)',
            border: '1px solid var(--border-color)',
            borderRadius: '9999px',
            padding: '4px 10px',
            gap: '6px'
          }}>
            <Search size={13} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search corridor or vehicle..."
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '11px',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '130px'
              }}
            />
          </div>

          {/* Section 4: Language Selector (English / Hindi / Marathi) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px 6px',
            backgroundColor: 'var(--bg-surface-alt)'
          }}>
            <Languages size={12} style={{ color: 'var(--gov-blue)' }} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>

          {/* Theme Switcher Button (NextAdmin Sun/Moon) */}
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
            title="Toggle Light / Dark Mode"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
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
              title="Priority Alerts"
            >
              <Bell size={15} />
              <span style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#EF4444'
              }} />
            </button>

            {showNotif && (
              <div style={{
                position: 'absolute',
                top: '38px',
                right: '0',
                width: '280px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1200,
                padding: '10px'
              }}>
                <div style={{ fontWeight: 800, fontSize: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '6px', marginBottom: '8px' }}>
                  Critical Urban Alerts (2)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '11px', padding: '6px', backgroundColor: '#FEF2F2', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 700, color: '#DC2626' }}>Deep Pothole Anomaly (8.2cm)</div>
                    <div style={{ color: 'var(--text-muted)' }}>Sector 4 • Vehicle 102</div>
                  </div>
                  <div style={{ fontSize: '11px', padding: '6px', backgroundColor: '#FFFBEB', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 700, color: '#D97706' }}>Congestion Bottleneck (9 km/h)</div>
                    <div style={{ color: 'var(--text-muted)' }}>Sancheti Chowk • Route 12</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Officer Profile Badge matching NextAdmin */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderLeft: '1px solid var(--border-color)',
            paddingLeft: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--gov-navy)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              RS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                Shri R. Sharma
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1.1 }}>
                Control Officer
              </span>
            </div>
            <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
          </div>

        </div>
      </div>
    </header>
  );
};
