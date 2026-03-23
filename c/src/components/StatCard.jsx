// components/StatCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ stat }) => {
  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-3.5 h-3.5" />;
      case "decrease":
        return <TrendingDown className="w-3.5 h-3.5" />;
      default:
        return <Minus className="w-3.5 h-3.5" />;
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

  const Icon = stat.icon;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 to-primary/20" />
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
          <div className={`p-2.5 rounded-xl ${stat.changeType === 'warning' ? 'bg-amber-50' : 'bg-gray-50'} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className={`w-5 h-5 ${stat.changeType === 'warning' ? 'text-amber-500' : 'text-primary'}`} strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${getChangeColor(stat.changeType)}`}>
            {getChangeIcon(stat.changeType)}
            <span>{stat.change}</span>
          </div>
          {stat.alert && (
            <span className="ml-2 text-xs text-amber-600 font-medium">⚠️ Requires attention</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;