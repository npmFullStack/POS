// components/Toast.jsx
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast container component to be placed in your app root
export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          padding: '0',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        },
      }}
    />
  );
};

// Toast component with progress bar
const ToastContent = ({ type, message, description, toastId, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
      setProgress(remaining);
      
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          text: 'text-white',
          icon: CheckCircle,
          progressBg: 'bg-green-400',
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          text: 'text-white',
          icon: XCircle,
          progressBg: 'bg-red-400',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500',
          text: 'text-white',
          icon: AlertCircle,
          progressBg: 'bg-amber-400',
        };
      case 'info':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          icon: Info,
          progressBg: 'bg-blue-400',
        };
      default:
        return {
          bg: 'bg-gray-800',
          text: 'text-white',
          icon: Info,
          progressBg: 'bg-gray-600',
        };
    }
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      <div className={`${styles.bg} ${styles.text}`}>
        <div className="flex items-center gap-3 p-4">
          <div className="flex-shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
            {description && (
              <p className="text-xs opacity-90 mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="flex-shrink-0 ml-2 opacity-80 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-white/30">
          <div
            className={`h-full ${styles.progressBg} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Toast utility functions
export const toastUtils = {
  success: (message, options = {}) => {
    toast.custom((t) => (
      <ToastContent
        type="success"
        message={message}
        description={options.description}
        toastId={t.id}
        duration={options.duration || 4000}
      />
    ), { duration: options.duration || 4000, ...options });
  },

  error: (message, options = {}) => {
    toast.custom((t) => (
      <ToastContent
        type="error"
        message={message}
        description={options.description}
        toastId={t.id}
        duration={options.duration || 5000}
      />
    ), { duration: options.duration || 5000, ...options });
  },

  warning: (message, options = {}) => {
    toast.custom((t) => (
      <ToastContent
        type="warning"
        message={message}
        description={options.description}
        toastId={t.id}
        duration={options.duration || 4000}
      />
    ), { duration: options.duration || 4000, ...options });
  },

  info: (message, options = {}) => {
    toast.custom((t) => (
      <ToastContent
        type="info"
        message={message}
        description={options.description}
        toastId={t.id}
        duration={options.duration || 4000}
      />
    ), { duration: options.duration || 4000, ...options });
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Loading...',
      success: (data) => {
        if (typeof messages.success === 'function') {
          return messages.success(data);
        }
        return messages.success || 'Success!';
      },
      error: (err) => {
        if (typeof messages.error === 'function') {
          return messages.error(err);
        }
        return messages.error || 'Something went wrong';
      },
    }, options);
  },

  dismiss: toast.dismiss,
  dismissAll: () => toast.dismiss(),
};