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

  // Check if this stat should have a progress bar
  const hasProgressBar = () => {
    // Only show progress bar for Low Stock Items when totalStock exists
    if (
      stat.title === "Low Stock Items" &&
      stat.totalStock &&
      stat.totalStock > 0
    ) {
      return true;
    }
    // Only show progress bar for Total Products when capacity exists
    if (stat.title === "TOTAL PRODUCTS" && stat.capacity && stat.capacity > 0) {
      return true;
    }
    return false;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (
      stat.title === "Low Stock Items" &&
      stat.totalStock &&
      stat.totalStock > 0
    ) {
      const percentage = (stat.value / stat.totalStock) * 100;
      // Cap at 100% to avoid overflow
      return Math.min(percentage, 100);
    }
    if (stat.title === "Total Products" && stat.capacity && stat.capacity > 0) {
      const percentage = (stat.value / stat.capacity) * 100;
      return Math.min(percentage, 100);
    }
    return 0;
  };

  const Icon = stat.icon;
  const showProgressBar = hasProgressBar();
  const progressPercentage = getProgressPercentage();
  const isWarning = stat.changeType === "warning";

  // Determine what message to show
  const getMessage = () => {
    if (stat.alert) {
      return "Needs immediate attention";
    }
    return stat.change;
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
                className={`rounded-full h-1.5 transition-all duration-300 ${
                  isWarning ? "bg-red-600" : "bg-primary"
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* Optional: Show percentage text */}
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(progressPercentage)}% of total
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
