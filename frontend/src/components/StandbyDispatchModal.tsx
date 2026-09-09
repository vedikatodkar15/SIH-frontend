import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BusFront, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface StandbyDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSuccess?: () => void;
}

export const StandbyDispatchModal: React.FC<StandbyDispatchModalProps> = ({
  isOpen,
  onClose,
  onConfirmSuccess
}) => {
  const { t } = useApp();
  const [selectedRoute, setSelectedRoute] = useState<string>('Route 12 (Katraj ↔ Nigdi Express)');
  const [selectedDepot, setSelectedDepot] = useState<string>('Swargate Central Depot (Zone 1)');
  const [unitsCount, setUnitsCount] = useState<number>(2);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedSuccess, setDeployedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedSuccess(true);
      setTimeout(() => {
        setDeployedSuccess(false);
        onClose();
        if (onConfirmSuccess) onConfirmSuccess();
      }, 1500);
    }, 600);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(3px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 40px rgba(10, 37, 64, 0.2)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Modal Header */}
        <div style={{
          backgroundColor: '#0A2540',
          color: '#FFFFFF',
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #1D4ED8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: 'rgba(29, 78, 216, 0.3)',
              color: '#93C5FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800 }}>
                {t('standbyModalTitle')}
              </div>
              <div style={{ fontSize: '11px', color: '#CBD5E1' }}>
                {t('standbyModalSub')}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '22px' }}>
          {deployedSuccess ? (
            <div style={{ textAlign: 'center', padding: '32px 16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0A2540', marginBottom: '8px' }}>
                {t('deploySuccessToast')}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B' }}>
                Vehicles #EB-204 and #EB-209 dispatched into corridor telemetry. Estimated arrival: 8 minutes.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* AI Justification Callout */}
              <div style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '12px',
                color: '#1E40AF',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <Sparkles size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#2563EB' }} />
                <div>
                  <div style={{ fontWeight: 800, marginBottom: '2px' }}>AI Neural Rationale</div>
                  <div>
                    High surge detected at Katraj terminal (+42% queue density) combined with 14-min choke at Sancheti Chowk. Dispatching 2 standby e-buses restores corridor headway from 16 min down to 6 min.
                  </div>
                </div>
              </div>

              {/* Designated Route */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                  {t('standbyModalRoute')}
                </label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0F172A',
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  <option>Route 12 (Katraj ↔ Nigdi Express)</option>
                  <option>Route 24 (Swargate ↔ Hadapsar Gadital)</option>
                  <option>Route 36 (Kothrud Stand ↔ Viman Nagar)</option>
                  <option>Route 101 (Pune Station ↔ Hinjawadi Phase 3)</option>
                </select>
              </div>

              {/* Source Depot & Units */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    {t('standbyModalDepot')}
                  </label>
                  <select
                    value={selectedDepot}
                    onChange={(e) => setSelectedDepot(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#0F172A'
                    }}
                  >
                    <option>Swargate Central Depot (Zone 1 - 8 Available)</option>
                    <option>Kothrud Depot (Zone 2 - 5 Available)</option>
                    <option>Shivajinagar Depot (Zone 1 - 4 Available)</option>
                    <option>Hadapsar Depot (Zone 3 - 6 Available)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    {t('standbyModalUnits')}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setUnitsCount(Math.max(1, unitsCount - 1))}
                      style={{
                        width: '32px',
                        height: '34px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <div style={{
                      flex: 1,
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#0F172A'
                    }}>
                      {unitsCount} Units
                    </div>
                    <button
                      type="button"
                      onClick={() => setUnitsCount(Math.min(6, unitsCount + 1))}
                      style={{
                        width: '32px',
                        height: '34px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#F8FAFC',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Units Preview Details */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                padding: '10px 14px',
                fontSize: '11px',
                color: '#475569'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Designated Units:</span>
                  <strong>#EB-204 (Tata Ultra EV) • #EB-209 (Olectra K9)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Assigned Drivers:</span>
                  <strong>D. Waghmare (Badge 402) • S. Shinde (Badge 311)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Injection ETA:</span>
                  <strong style={{ color: '#059669' }}>8 mins to Swargate Chowk</strong>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {t('standbyModalCancel')}
                </button>
                <button
                  type="button"
                  disabled={isDeploying}
                  onClick={handleConfirm}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#1D4ED8',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)'
                  }}
                >
                  {isDeploying ? 'Authorizing Dispatch...' : t('standbyModalConfirm')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
