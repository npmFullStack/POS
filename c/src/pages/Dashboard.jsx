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
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: "Today's Sales",
      value: "₱12,450",
      change: "+12.5%",
      changeType: "increase",
      icon: PhilippinePeso,
      trend: "up",
    },
    {
      id: 2,
      title: "Orders Today",
      value: "28",
      change: "+21.7%",
      changeType: "increase",
      icon: ShoppingBag,
      trend: "up",
    },
    {
      id: 3,
      title: "Active Customers",
      value: "156",
      change: "+8.3%",
      changeType: "increase",
      icon: Users,
      trend: "up",
    },
    {
      id: 4,
      title: "Low Stock Items",
      value: "8",
      change: "Critical",
      changeType: "warning",
      icon: Package,
      trend: "down",
      alert: true,
    },
    {
      id: 5,
      title: "Pending Orders",
      value: "12",
      change: "Urgent",
      changeType: "warning",
      icon: Clock,
      trend: "neutral",
    },
    {
      id: 6,
      title: "Monthly Growth",
      value: "+23.5%",
      change: "+3.2%",
      changeType: "increase",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case "increase":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        {/* Simple button - no shadow */}
        <Link
          to="/public-store/home"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0800] text-white rounded-lg hover:bg-[#FF0800]/90 transition-colors"
        >
          <Store className="w-5 h-5" />
          <span className="font-medium">Visit Public Store</span>
        </Link>
      </div>

      {/* Stats Grid - Modern Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100"
            >
              <div className="relative z-10">
                {/* Header with icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  
                  {/* Simple icon wrapper - no shadow */}
                  <div className="p-3 rounded-2xl bg-[#FF0800]">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Footer with change indicator */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getChangeColor(stat.changeType)}`}>
                    {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                    {stat.trend === "down" && <ArrowUpRight className="w-3 h-3 rotate-90" />}
                    {stat.alert && <AlertCircle className="w-3 h-3" />}
                    <span>{stat.change}</span>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    vs last period
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link to="/sales" className="text-sm text-[#FF0800] hover:text-[#FF0800]/80 font-medium flex items-center gap-1">
                View all
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { id: "2345", items: 2, amount: 145.99, status: "pending", time: "5 mins ago" },
              { id: "2346", items: 3, amount: 245.99, status: "processing", time: "15 mins ago" },
              { id: "2347", items: 1, amount: 345.99, status: "completed", time: "1 hour ago" },
            ].map((order, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {order.items} items • ₱{order.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                      order.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                      order.status === "processing" ? "bg-blue-50 text-blue-700" :
                      "bg-green-50 text-green-700"
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-orange-50/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
              </div>
              <Link to="/inventory" className="text-sm text-[#FF0800] hover:text-[#FF0800]/80 font-medium flex items-center gap-1">
                Manage stock
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { name: "Premium Coffee Beans", sku: "COF001", stock: 3, price: 299, critical: true },
              { name: "Organic Green Tea", sku: "TEA002", stock: 5, price: 449, critical: false },
              { name: "Vanilla Syrup", sku: "SYR003", stock: 2, price: 199, critical: true },
            ].map((product, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      product.critical ? "bg-red-100" : "bg-orange-100"
                    }`}>
                      <Package className={`w-4 h-4 ${
                        product.critical ? "text-red-600" : "text-orange-600"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₱{product.price}</p>
                    <p className={`text-xs font-medium ${
                      product.stock <= 3 ? "text-red-600" : "text-orange-600"
                    }`}>
                      Stock: {product.stock} left
                    </p>
                  </div>
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