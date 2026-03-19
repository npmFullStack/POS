// pages/Dashboard.jsx
import React from "react";
import {
  PhilippinePeso,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  Clock,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample stats data with peso currency
  const stats = [
    {
      id: 1,
      title: "Today's Sales",
      value: "₱12,450",
      change: "+₱2,100",
      icon: PhilippinePeso,
    },
    {
      id: 2,
      title: "Orders Today",
      value: "28",
      change: "+5",
      icon: ShoppingBag,
    },
    {
      id: 3,
      title: "Active Customers",
      value: "156",
      change: "+12",
      icon: Users,
    },
    {
      id: 4,
      title: "Low Stock Items",
      value: "8",
      change: "Need reorder",
      icon: Package,
      isWarning: true,
    },
    {
      id: 5,
      title: "Pending Orders",
      value: "12",
      change: "To process",
      icon: Clock,
    },
    {
      id: 6,
      title: "Monthly Growth",
      value: "+23.5%",
      change: "+3.2%",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Page Title with Public Store Link */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <Link
          to="/public-store"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF0800] text-white rounded-lg hover:bg-[#FF0800]/90 transition-colors"
        >
          <Store className="w-5 h-5" style={{ color: "#FFBF00" }} />
          <span>Open Public Store</span>
        </Link>
      </div>

      {/* Stats Grid - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                {/* Rounded icon with custom colors */}
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: "#FF0800" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#FFBF00" }} />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.isWarning
                      ? "text-orange-600"
                      : stat.change.startsWith("+") ||
                          stat.change.includes("process") ||
                          stat.change.includes("reorder")
                        ? "text-gray-600"
                        : "text-gray-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">Order #{item}2345</p>
                  <p className="text-sm text-gray-500">
                    2 items • ₱{45.99 + item * 100}
                  </p>
                </div>
                <span
                  className="px-3 py-1 text-sm rounded-full bg-[#FF0800]/10"
                  style={{ color: "#FF0800" }}
                >
                  {item === 1
                    ? "Pending"
                    : item === 2
                      ? "Processing"
                      : "Completed"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Low Stock Alert
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FF0800" }}
                  >
                    <Package className="w-5 h-5" style={{ color: "#FFBF00" }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Product {item}</p>
                    <p className="text-sm text-gray-500">SKU: PRD00{item}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ₱{item * 150 + 299}
                  </p>
                  <p className="text-sm text-red-600">
                    Stock: {item * 2 + 1} left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
