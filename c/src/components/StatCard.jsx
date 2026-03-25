// components/StatCard.jsx
import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({ stat }) => {
  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-3 h-3" />;
      case "decrease":
        return <TrendingDown className="w-3 h-3" />;
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
        return "text-amber-600 bg-amber-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  // Check if this stat should have a progress bar
  const hasProgressBar = () => {
    if (stat.title === "Low Stock Items" && stat.totalStock) {
      return true;
    }
    if (stat.title === "Total Products" && stat.capacity) {
      return true;
    }
    return false;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (stat.title === "Low Stock Items" && stat.totalStock) {
      return (stat.value / stat.totalStock) * 100;
    }
    if (stat.title === "Total Products" && stat.capacity) {
      return (stat.value / stat.capacity) * 100;
    }
    return 0;
  };

  const Icon = stat.icon;
  const showProgressBar = hasProgressBar();
  const progressPercentage = getProgressPercentage();

  // Determine what message to show
  const getMessage = () => {
    if (stat.alert) {
      return "Needs attention";
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
            <p className="text-xs font-medium text-gray-900 mt-0.5">
              {stat.title}
            </p>
          </div>

          {/* Right side - Icon */}
          <div
            className={`p-1.5 rounded-lg ${
              stat.changeType === "warning" ? "bg-amber-50" : "bg-gray-50"
            } group-hover:scale-110 transition-transform duration-200`}
          >
            <Icon
              className={`w-4 h-4 ${
                stat.changeType === "warning"
                  ? "text-amber-500"
                  : "text-primary"
              }`}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Progress Bar - Only shown for eligible cards */}
        {showProgressBar && (
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
              <div
                className="bg-primary rounded-full h-1 transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
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
