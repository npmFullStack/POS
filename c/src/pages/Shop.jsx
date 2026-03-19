// pages/Shop.jsx
import React from "react";
import {
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Star,
  ShoppingBag,
} from "lucide-react";
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

  // Stats cards data
  const statsCards = [
    {
      title: "Total Sales",
      value: shopData.totalSales,
      icon: DollarSign,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Total Products",
      value: shopData.totalProducts,
      icon: Package,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Date Created",
      value: shopData.dateCreated,
      icon: Calendar,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Shop</h1>
      </div>

      {/* Shop Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Shop Image */}
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
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
                <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Active
                </span>
              </div>
              <p className="text-gray-600 mb-4">{shopData.description}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Total Revenue</p>
                    <p className="font-semibold text-gray-900">
                      {shopData.totalSales}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Products</p>
                    <p className="font-semibold text-gray-900">
                      {shopData.totalProducts}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Since</p>
                    <p className="font-semibold text-gray-900">2020</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Most Sold Products Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">
              Most Sold Products
            </h2>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shopData.mostSoldProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-white p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/200x200?text=${product.name}`;
                  }}
                />
                {/* Sales Badge */}
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  {product.sold}+ sold
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Sales */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Sales this month</span>
                    <span className="font-medium text-gray-700">
                      +{Math.floor(product.sold * 0.3)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{
                        width: `${Math.min(100, (product.sold / 2000) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Shop Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Monthly Growth</span>
              <span className="font-semibold text-green-600">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-semibold text-gray-900">₱1,250</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customer Rating</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">4.8</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">New order received - ₱2,499</span>
              <span className="text-gray-400 text-xs ml-auto">5 min ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                Product restocked - Wireless Headphones
              </span>
              <span className="text-gray-400 text-xs ml-auto">1 hour ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">
                New review received (5 stars)
              </span>
              <span className="text-gray-400 text-xs ml-auto">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
