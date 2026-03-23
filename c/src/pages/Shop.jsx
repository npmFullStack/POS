// pages/Shop.jsx
import React from "react";
import {
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Star,
  ShoppingBag,
  ArrowUpRight,
  Store,
  AlertCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import shopImage from "@/assets/images/shop.png";
import product1 from "@/assets/images/product1.png";
import product2 from "@/assets/images/product1.png";
import product3 from "@/assets/images/product1.png";

const Shop = () => {
  // Mock shop data
  const shopData = {
    name: "Nors",
    description:
      "Your favorite local store for quality products and exceptional service. We've been serving the community since 2020 with a wide range of products to meet your daily needs.",
    totalSales: "₱125,430",
    dateCreated: "January 15, 2020",
    totalProducts: 156,
    mostSoldProducts: [
      {
        id: 1,
        name: "Wireless Headphones",
        price: "₱2,499",
        sold: 1245,
        image: product1,
        rating: 4.8,
      },
      {
        id: 2,
        name: "Smart Watch Series 5",
        price: "₱5,999",
        sold: 987,
        image: product2,
        rating: 4.7,
      },
      {
        id: 3,
        name: "Premium Backpack",
        price: "₱1,899",
        sold: 756,
        image: product3,
        rating: 4.9,
      },
    ],
  };

  // Stats cards data matching Dashboard style
  const statsCards = [
    {
      title: "Total Sales",
      value: shopData.totalSales,
      icon: DollarSign,
      change: "+12.5%",
      changeType: "increase",
      trend: "up",
    },
    {
      title: "Total Products",
      value: shopData.totalProducts,
      icon: Package,
      change: "+8",
      changeType: "increase",
      trend: "up",
    },
    {
      title: "Active Customers",
      value: "1,234",
      icon: Users,
      change: "+15.3%",
      changeType: "increase",
      trend: "up",
    },
    {
      title: "Date Created",
      value: "2020",
      icon: Calendar,
      change: "Active",
      changeType: "warning",
      trend: "neutral",
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
      {/* Header Section - Matching Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Shop</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your store performance</p>
        </div>
        <Link
          to="/public-store/home"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0800] text-white rounded-lg hover:bg-[#FF0800]/90 transition-colors"
        >
          <Store className="w-5 h-5" />
          <span className="font-medium">View Public Store</span>
        </Link>
      </div>

      {/* Shop Profile Card - Enhanced with Dashboard styling */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Shop Image */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              <img
                src={shopImage}
                alt={shopData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${shopData.name}&background=FF0800&color=fff&size=128`;
                }}
              />
            </div>

            {/* Shop Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {shopData.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-600">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Active
                </span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{shopData.description}</p>

              {/* Quick Stats with Dashboard styling */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500">Total Revenue</p>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {shopData.totalSales}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {shopData.totalProducts}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-xs text-gray-500">Since</p>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Matching Dashboard exactly */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
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
                  
                  {/* Simple icon wrapper - matching Dashboard */}
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
                    {stat.title === "Date Created" ? "Status" : "vs last period"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Most Sold Products Section - Matching Dashboard recent orders style */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF0800]" />
              <h2 className="text-lg font-semibold text-gray-900">Most Sold Products</h2>
            </div>
            <Link to="/products" className="text-sm text-[#FF0800] hover:text-[#FF0800]/80 font-medium flex items-center gap-1">
              View all
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {shopData.mostSoldProducts.map((product) => (
            <div key={product.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Product Image */}
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/48x48?text=${product.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{product.sold}+ sold</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.price}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <p className="text-xs text-green-600">+{Math.floor(product.sold * 0.3)} this month</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Shop Stats - Matching Dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF0800]" />
              <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Monthly Growth</span>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-semibold text-gray-900">₱1,250</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Customer Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">4.8</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 flex-1">New order received - ₱2,499</span>
                <span className="text-gray-400 text-xs">5 min ago</span>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600 flex-1">Product restocked - Wireless Headphones</span>
                <span className="text-gray-400 text-xs">1 hour ago</span>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600 flex-1">New review received (5 stars)</span>
                <span className="text-gray-400 text-xs">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;