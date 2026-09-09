import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  Languages,
  KeyRound,
  CheckCircle2
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useApp();

  // Inputs are strictly initialized to empty strings
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Save password modal state
  const [showSavePasswordModal, setShowSavePasswordModal] = useState<boolean>(false);
  const [pendingCredentials, setPendingCredentials] = useState<{ id: string; pass: string } | null>(null);

  const fromPath = (location.state as { from?: { pathname?: string }; message?: string })?.from?.pathname || '/';

  // Check for status messages passed in location state (e.g., logout or session expiry)
  useEffect(() => {
    const passedMessage = (location.state as { message?: string })?.message;
    if (passedMessage) {
      setStatusMessage(passedMessage);
    }
  }, [location]);

  // If already authenticated in current session, immediately navigate to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(fromPath, { replace: true });
    }
  }, [isAuthenticated, navigate, fromPath]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    const cleanUser = userId.trim();
    const cleanPass = password.trim();

    // 1. Client field validation
    if (!cleanUser) {
      setErrorMessage(t('emptyUsername') || 'Please enter your username.');
      return;
    }

    if (!cleanPass) {
      setErrorMessage(t('emptyPassword') || 'Please enter your password.');
      return;
    }

    setIsLoading(true);
    // Prototype mode: accepts any non-empty username + password
    const result = await login(cleanUser, cleanPass);
    setIsLoading(false);

    if (result.success) {
      setPendingCredentials({ id: cleanUser, pass: cleanPass });
      setShowSavePasswordModal(true);
    } else {
      setErrorMessage(result.error || t('invalidCredentials') || 'Invalid username or password. Please try again.');
    }
  };

  // Handle browser password manager save action
  const handleConfirmSavePassword = async () => {
    if (pendingCredentials && typeof window !== 'undefined' && 'PasswordCredential' in window && navigator.credentials) {
      try {
        const CredentialConstructor = (window as unknown as { PasswordCredential: new (data: { id: string; password: string; name: string }) => Credential }).PasswordCredential;
        const cred = new CredentialConstructor({
          id: pendingCredentials.id,
          password: pendingCredentials.pass,
          name: pendingCredentials.id
        });
        await navigator.credentials.store(cred);
      } catch {
        // Fallback: standard browser form submission handles native prompt
      }
    }
    setPendingCredentials(null);
    setShowSavePasswordModal(false);
    navigate(fromPath, { replace: true });
  };

  const handleDismissSavePassword = () => {
    setPendingCredentials(null);
    setShowSavePasswordModal(false);
    navigate(fromPath, { replace: true });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F7FA',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: '#172033'
    }}>
      {/* 1. Official National Tricolor Top Accent */}
      <div style={{
        background: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
        height: '4px',
        width: '100%'
      }} />

      {/* 2. Administrative Header Strip with Visible Language Dropdown */}
      <header style={{
        backgroundColor: '#1B3A6F',
        color: '#FFFFFF',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {t('govIndia')}
          </span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ opacity: 0.9 }}>{t('ministry')}</span>
        </div>

        {/* Visible Language Selector with Full Names */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Languages size={15} style={{ color: '#93C5FD' }} />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
            aria-label="Select Portal Language"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '4px',
              padding: '4px 10px',
              outline: 'none',
              cursor: 'pointer'
            }}
            title="Change Portal Language"
          >
            <option value="en" style={{ color: '#172033' }}>English</option>
            <option value="hi" style={{ color: '#172033' }}>हिन्दी (Hindi)</option>
            <option value="mr" style={{ color: '#172033' }}>मराठी (Marathi)</option>
          </select>
        </div>
      </header>

      {/* 3. Main Login Container */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 16px',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #D0D5DD',
          boxShadow: '0 4px 16px rgba(27, 58, 111, 0.08)',
          overflow: 'hidden'
        }}>
          {/* Header Area with National Emblem */}
          <div style={{
            backgroundColor: '#1B3A6F',
            padding: '26px 28px 22px',
            textAlign: 'center',
            color: '#FFFFFF',
            borderBottom: '2px solid #2B5DA8'
          }}>
            <div style={{
              width: '50px',
              height: '54px',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              padding: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}>
              <img 
                src="/assets/emblem.svg" 
                alt="National Emblem of India" 
                style={{ height: '44px', objectFit: 'contain' }}
              />
            </div>
            <div style={{
              fontSize: '10.5px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#93C5FD',
              marginBottom: '4px'
            }}>
              {t('govIndia')}
            </div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: '0 0 4px',
              lineHeight: 1.25
            }}>
              {t('portalTitle')}
            </h1>
            <div style={{
              fontSize: '11.5px',
              color: '#E2E8F0',
              fontWeight: 500
            }}>
              {t('loginPortalTitle')}
            </div>
          </div>

          {/* Form Content */}
          <div style={{ padding: '26px 28px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px',
              paddingBottom: '12px',
              borderBottom: '1px solid #EAECF0'
            }}>
              <ShieldCheck size={18} style={{ color: '#1B3A6F', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#1B3A6F' }}>
                  {t('officerLogin')}
                </div>
                <div style={{ fontSize: '11px', color: '#667085', lineHeight: 1.3, marginTop: '2px' }}>
                  {t('officerLoginDesc')}
                </div>
              </div>
            </div>

            {/* Status / Logged Out Notification */}
            {statusMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Error Message Notice */}
            {errorMessage && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FEF2F2',
                color: '#C62828',
                border: '1px solid #FECACA',
                padding: '9px 12px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: 600,
                marginBottom: '16px'
              }}>
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Username Field */}
              <div>
                <label 
                  htmlFor="officer-username"
                  style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#172033', marginBottom: '5px' }}
                >
                  {t('userId')} <span style={{ color: '#C62828' }}>*</span>
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #D0D5DD',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  padding: '9px 12px',
                  gap: '10px'
                }}>
                  <User size={15} style={{ color: '#667085' }} />
                  <input
                    id="officer-username"
                    name="username"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder={t('userIdPlaceholder')}
                    autoComplete="username"
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '13px',
                      color: '#172033',
                      fontWeight: 600
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="officer-password"
                  style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#172033', marginBottom: '5px' }}
                >
                  {t('password')} <span style={{ color: '#C62828' }}>*</span>
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #D0D5DD',
                  borderRadius: '6px',
                  backgroundColor: '#FFFFFF',
                  padding: '9px 12px',
                  gap: '10px'
                }}>
                  <Lock size={15} style={{ color: '#667085' }} />
                  <input
                    id="officer-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    autoComplete="current-password"
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '13px',
                      color: '#172033',
                      fontWeight: 600
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#667085',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  backgroundColor: '#1B3A6F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 18px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 4px rgba(27, 58, 111, 0.2)',
                  marginTop: '6px',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.currentTarget.style.backgroundColor = '#152E58';
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.currentTarget.style.backgroundColor = '#1B3A6F';
                }}
              >
                {isLoading ? (
                  <span>{t('loggingIn')}</span>
                ) : (
                  <>
                    <span>{t('loginButton')}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security Notice Footer */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #EAECF0',
            padding: '12px 20px',
            fontSize: '10px',
            color: '#667085',
            lineHeight: 1.45,
            textAlign: 'center'
          }}>
            {t('securityNotice')}
          </div>
        </div>
      </main>

      {/* 4. Save Password in Browser Modal */}
      {showSavePasswordModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 25, 47, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px',
          backdropFilter: 'blur(2px)'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #D0D5DD',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            maxWidth: '380px',
            width: '100%',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#EFF6FF',
              color: '#1B3A6F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <KeyRound size={20} />
            </div>

            <h3 style={{
              fontSize: '15px',
              fontWeight: 800,
              color: '#172033',
              margin: '0 0 6px'
            }}>
              {t('savePasswordTitle') || 'Save password in browser?'}
            </h3>

            <p style={{
              fontSize: '11.5px',
              color: '#667085',
              lineHeight: 1.4,
              margin: '0 0 18px'
            }}>
              {t('savePasswordDesc') || 'Your browser password manager can securely store credentials for faster sign-in to this portal.'}
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleConfirmSavePassword}
                style={{
                  flex: 1,
                  backgroundColor: '#1B3A6F',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {t('savePasswordBtn') || 'Save password'}
              </button>
              <button
                type="button"
                onClick={handleDismissSavePassword}
                style={{
                  flex: 1,
                  backgroundColor: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #D0D5DD',
                  borderRadius: '6px',
                  padding: '9px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {t('notNowBtn') || 'Not now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
