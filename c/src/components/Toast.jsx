// components/Toast.jsx
import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast container component to be placed in your app root
export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          padding: '0',
          background: 'transparent',
          boxShadow: 'none',
        },
      }}
    />
  );
};

const CONFIG = {
  success: { icon: CheckCircle, color: '#16a34a' },
  error:   { icon: XCircle,     color: '#dc2626' },
  warning: { icon: AlertCircle, color: '#d97706' },
  info:    { icon: Info,        color: '#2563eb' },
};

const ToastContent = ({ type, message, description, toastId, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef();
  const cfg = CONFIG[type] || CONFIG.info;
  const Icon = cfg.icon;

  useEffect(() => {
    startTimeRef.current = Date.now();
    let rafId;
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.max(0, ((duration - elapsed) / duration) * 100);
      setProgress(pct);
      if (pct > 0) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration]);

  return (
    <div style={{
      width: '320px',
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      animation: 'toastIn 0.22s cubic-bezier(0.34,1.5,0.64,1)',
    }}>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(12px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
      `}</style>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 10px 10px 12px',
      }}>
        <Icon size={16} color={cfg.color} strokeWidth={2.2} style={{ flexShrink: 0 }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: '600',
            color: '#111827',
            lineHeight: '1.3',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {message}
          </p>
          {description && (
            <p style={{
              margin: '2px 0 0',
              fontSize: '11.5px',
              color: '#6b7280',
              lineHeight: '1.35',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {description}
            </p>
          )}
        </div>

        <button
          onClick={() => toast.dismiss(toastId)}
          style={{
            flexShrink: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '3px',
            borderRadius: '5px',
            color: '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#f3f4f6'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; }}
          aria-label="Dismiss"
        >
          <X size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: '2px', background: '#f3f4f6' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: cfg.color,
          transition: 'width 75ms linear',
        }} />
      </div>
    </div>
  );
};

const makeToast = (type, defaultDuration) => (message, options = {}) => {
  const duration = options.duration ?? defaultDuration;
  toast.custom(
    (t) => (
      <ToastContent
        type={type}
        message={message}
        description={options.description}
        toastId={t.id}
        duration={duration}
      />
    ),
    { duration }
  );
};

export const toastUtils = {
  success: makeToast('success', 4000),
  error:   makeToast('error',   5000),
  warning: makeToast('warning', 4000),
  info:    makeToast('info',    4000),
  dismiss:    toast.dismiss,
  dismissAll: () => toast.dismiss(),
};