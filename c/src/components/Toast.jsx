// components/Toast.jsx
import React from 'react';
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
          background: '#fff',
          color: '#1f2937',
          padding: '0',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
          border: '1px solid #f3f4f6',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

// Toast utility functions with modern styling
export const toastUtils = {
  success: (message, options = {}) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-slide-in' : 'animate-slide-out'
        } flex items-center gap-3 bg-white rounded-xl shadow-lg border border-green-100 p-4 min-w-[320px] max-w-md`}
        style={{
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div className="flex-shrink-0">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          {options.description && (
            <p className="text-xs text-gray-500 mt-0.5">{options.description}</p>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ), { duration: options.duration || 4000, ...options });
  },

  error: (message, options = {}) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-slide-in' : 'animate-slide-out'
        } flex items-center gap-3 bg-white rounded-xl shadow-lg border border-red-100 p-4 min-w-[320px] max-w-md`}
      >
        <div className="flex-shrink-0">
          <XCircle className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          {options.description && (
            <p className="text-xs text-gray-500 mt-0.5">{options.description}</p>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ), { duration: options.duration || 5000, ...options });
  },

  warning: (message, options = {}) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-slide-in' : 'animate-slide-out'
        } flex items-center gap-3 bg-white rounded-xl shadow-lg border border-amber-100 p-4 min-w-[320px] max-w-md`}
      >
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-amber-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          {options.description && (
            <p className="text-xs text-gray-500 mt-0.5">{options.description}</p>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ), { duration: options.duration || 4000, ...options });
  },

  info: (message, options = {}) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-slide-in' : 'animate-slide-out'
        } flex items-center gap-3 bg-white rounded-xl shadow-lg border border-blue-100 p-4 min-w-[320px] max-w-md`}
      >
        <div className="flex-shrink-0">
          <Info className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
          {options.description && (
            <p className="text-xs text-gray-500 mt-0.5">{options.description}</p>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ), { duration: options.duration || 4000, ...options });
  },

  // Promise handler for async operations
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

// Optional: Add these CSS animations to your global CSS file
export const toastAnimations = `
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}

.animate-slide-out {
  animation: slideOut 0.2s ease-in forwards;
}
`;