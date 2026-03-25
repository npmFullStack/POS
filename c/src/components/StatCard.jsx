// components/StatCard.jsx
import React from "react";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";

const StatCard = ({ stat }) => {
  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-3 h-3" />;
      case "decrease":
        return <TrendingDown className="w-3 h-3" />;
      case "warning":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case "increase":
        return "text-emerald-600 bg-emerald-50";
      case "decrease":
        return "text-red-600 bg-red-50";
      case "warning":
        return "text-white bg-red-500";
      default:
        return "text-gray-800 bg-gray-50";
    }
  };

  // Generic function to check if stat has a progress bar
  // Now uses a more flexible approach: look for progressConfig or specific properties
  const hasProgressBar = () => {
    // Check if stat has explicit progress configuration
    if (stat.progressConfig) {
      return stat.progressConfig.enabled && stat.progressConfig.total > 0;
    }
    // Legacy support for specific titles (backward compatibility)
    if (
      stat.totalStock &&
      stat.totalStock > 0 &&
      stat.title === "Low Stock Items"
    ) {
      return true;
    }
    if (stat.capacity && stat.capacity > 0 && stat.title === "Total Products") {
      return true;
    }
    // Generic: if stat has total and current value, show progress bar
    if (stat.total && stat.total > 0 && typeof stat.value === "number") {
      return true;
    }
    return false;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    // Use explicit progress configuration if available
    if (stat.progressConfig) {
      const { value, total } = stat.progressConfig;
      if (total && total > 0) {
        const percentage = (value / total) * 100;
        return Math.min(percentage, 100);
      }
      return 0;
    }

    // Legacy support
    if (
      stat.totalStock &&
      stat.totalStock > 0 &&
      stat.title === "Low Stock Items"
    ) {
      const percentage = (stat.value / stat.totalStock) * 100;
      return Math.min(percentage, 100);
    }
    if (stat.capacity && stat.capacity > 0 && stat.title === "Total Products") {
      const percentage = (stat.value / stat.capacity) * 100;
      return Math.min(percentage, 100);
    }

    // Generic: use stat.total and stat.value
    if (stat.total && stat.total > 0 && typeof stat.value === "number") {
      const percentage = (stat.value / stat.total) * 100;
      return Math.min(percentage, 100);
    }
    return 0;
  };

  const Icon = stat.icon;
  const showProgressBar = hasProgressBar();
  const progressPercentage = getProgressPercentage();
  const isWarning = stat.changeType === "warning" || stat.alert;

  // Determine what message to show
  const getMessage = () => {
    if (stat.alert) {
      return stat.alertMessage || "Needs immediate attention";
    }
    if (stat.changeMessage) {
      return stat.changeMessage;
    }
    return stat.change;
  };

  // Get progress bar color (can be customized via progressConfig)
  const getProgressBarColor = () => {
    if (stat.progressConfig?.color) {
      return stat.progressConfig.color;
    }
    return isWarning ? "bg-red-600" : "bg-primary";
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="p-3">
        <div className="flex items-center justify-between">
          {/* Left side - Number and Title */}
          <div>
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs font-semibold text-gray-900 mt-0.5">
              {stat.title}
            </p>
          </div>

          {/* Right side - Icon */}
          <div
            className={`p-1.5 rounded-lg ${
              isWarning ? "bg-red-50" : "bg-gray-50"
            } group-hover:scale-110 transition-transform duration-200`}
          >
            <Icon
              className={`w-4 h-4 ${
                isWarning ? "text-red-600" : "text-primary"
              }`}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Progress Bar - Only shown for eligible cards */}
        {showProgressBar && (
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`rounded-full h-1.5 transition-all duration-300 ${getProgressBarColor()}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* Optional: Show percentage text or custom label */}
            <p className="text-xs text-gray-500 mt-1">
              {stat.progressConfig?.label ||
                `${Math.round(progressPercentage)}% of total`}
            </p>
          </div>
        )}

        {/* Single Message Indicator */}
        <div className="mt-2 pt-1.5 border-t border-gray-100">
          <div
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-xs font-medium ${getChangeColor(
              stat.changeType,
            )}`}
          >
            {getChangeIcon(stat.changeType)}
            <span>{getMessage()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
