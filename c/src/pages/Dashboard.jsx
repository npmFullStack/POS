// Dashboard.jsx - Updated with image holder, removed New Sale, added help and save image icons
import React, { useState, useRef } from "react";
import {
  PhilippinePeso,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  Clock,
  Store,
  ArrowUpRight,
  HelpCircle,
  Download,
  RefreshCw,
  AlertTriangle,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import Button from "@/components/Button";
import Select from "@/components/Select";
import StatCard from "@/components/StatCard";
import CustomDateRangePicker from "@/components/CustomDateRangePicker";
import PesoSign from "@/assets/icons/PesoSign";
import Help from "@/components/modals/Help";

// Import empty image for image holder
import emptyImg from "@/assets/images/empty.png";
import instructionsImg from "@/assets/images/instructions.png";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("today");
  const [customRange, setCustomRange] = useState(null);
  const [dateRangeText, setDateRangeText] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Refs for charts
  const salesTrendRef = useRef(null);
  const transactionsProfitRef = useRef(null);
  const categoryDistributionRef = useRef(null);

  // Time range options for Select component
  const timeRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  // Stats data for physical store (cash only)
  const stats = [
    {
      id: 1,
      title: "TOTAL SALES",
      value: "₱12,450",
      change: "+12.5% vs last period",
      changeType: "increase",
      icon: PhilippinePeso,
      capacity: 100,
    },
    {
      id: 2,
      title: "TOTAL TRANSACTIONS",
      value: "28",
      change: "+21.7% vs last period",
      changeType: "increase",
      icon: ShoppingBag,
      capacity: 100,
    },
    {
      id: 3,
      title: "CUSTOMERS TODAY",
      value: "42",
      change: "+8.3% vs yesterday",
      changeType: "increase",
      icon: Users,
      capacity: 100,
    },
    {
      id: 4,
      title: "LOW STOCK ITEMS",
      value: "8",
      change: "Critical - Needs attention",
      changeType: "warning",
      icon: Package,
      alert: true,
      totalStock: 156,
    },
    {
      id: 5,
      title: "CASH IN DRAWER",
      value: "₱8,450",
      change: "Ready for deposit",
      changeType: "neutral",
      icon: PesoSign,
      capacity: 100,
    },
    {
      id: 6,
      title: "TODAY'S GROWTH",
      value: "+23.5%",
      change: "+3.2% from yesterday",
      changeType: "increase",
      icon: TrendingUp,
      capacity: 100,
    },
  ];

  // Sales data for charts (physical store daily sales)
  const salesData = [
    { name: "Mon", sales: 4200, transactions: 28, profit: 1250 },
    { name: "Tue", sales: 5800, transactions: 35, profit: 1750 },
    { name: "Wed", sales: 7100, transactions: 42, profit: 2100 },
    { name: "Thu", sales: 6500, transactions: 38, profit: 1950 },
    { name: "Fri", sales: 8900, transactions: 52, profit: 2650 },
    { name: "Sat", sales: 12400, transactions: 68, profit: 3700 },
    { name: "Sun", sales: 9800, transactions: 55, profit: 2950 },
  ];

  // Category distribution data for pie chart
  const categoryData = [
    { name: "Junk Food", value: 45, color: "#FF0800" },
    { name: "Beverages", value: 30, color: "#FF6B6B" },
    { name: "Canned Goods", value: 15, color: "#FFA07A" },
    { name: "Instant Noodles", value: 10, color: "#FFB347" },
  ];

  // Updated recent transactions data (without customer name)
  const recentTransactions = [
    {
      id: "TRX-2345",
      items: 2,
      amount: 145.99,
      paymentMethod: "Cash",
      time: "5 mins ago",
      cashReceived: 200,
      change: 54.01,
    },
    {
      id: "TRX-2346",
      items: 3,
      amount: 245.99,
      paymentMethod: "Cash",
      time: "15 mins ago",
      cashReceived: 250,
      change: 4.01,
    },
    {
      id: "TRX-2347",
      items: 1,
      amount: 345.99,
      paymentMethod: "Cash",
      time: "1 hour ago",
      cashReceived: 350,
      change: 4.01,
    },
    {
      id: "TRX-2348",
      items: 4,
      amount: 89.99,
      paymentMethod: "Cash",
      time: "2 hours ago",
      cashReceived: 100,
      change: 10.01,
    },
  ];

  // Low stock products data
  const lowStockProducts = [
    {
      name: "Premium Coffee Beans",
      sku: "COF001",
      stock: 3,
      price: 299,
      critical: true,
      image: null,
    },
    {
      name: "Organic Green Tea",
      sku: "TEA002",
      stock: 5,
      price: 449,
      critical: false,
      image: null,
    },
    {
      name: "Vanilla Syrup",
      sku: "SYR003",
      stock: 2,
      price: 199,
      critical: true,
      image: null,
    },
    {
      name: "Chocolate Powder",
      sku: "CHC004",
      stock: 7,
      price: 159,
      critical: false,
      image: null,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700";
      case "processing":
        return "bg-blue-50 text-blue-700";
      case "completed":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((item, index) => (
            <p key={index} className="text-sm" style={{ color: item.color }}>
              {item.name}: ₱{item.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Function to capture chart as image
  const captureChartAsImage = async (ref, chartName) => {
    if (!ref.current) return;

    try {
      // Find the chart container
      const chartContainer = ref.current.querySelector(".recharts-wrapper");
      if (!chartContainer) return;

      // Get the SVG element
      const svgElement = chartContainer.querySelector("svg");
      if (!svgElement) return;

      // Clone the SVG with proper styling
      const svgClone = svgElement.cloneNode(true);

      // Add background color to the SVG
      svgClone.setAttribute("style", "background-color: white;");

      // Get dimensions
      const bbox = svgElement.getBBox();
      const width = bbox.width || svgElement.clientWidth || 800;
      const height = bbox.height || svgElement.clientHeight || 400;

      svgClone.setAttribute("width", width);
      svgClone.setAttribute("height", height);
      svgClone.setAttribute("viewBox", `0 0 ${width} ${height}`);

      // Convert SVG to canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      const svgString = new XMLSerializer().serializeToString(svgClone);
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        // Download the image
        const link = document.createElement("a");
        link.download = `${chartName}_${new Date().toISOString().slice(0, 19)}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      img.src =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svgString)));
    } catch (error) {
      console.error("Error capturing chart:", error);
    }
  };

  const handleCustomRangeApply = (range) => {
    setCustomRange(range);
    if (range) {
      const start = new Date(range.start).toLocaleDateString();
      const end = new Date(range.end).toLocaleDateString();
      setDateRangeText(`${start} - ${end}`);
      setTimeRange("custom");
    } else {
      setCustomRange(null);
      setDateRangeText("");
      setTimeRange("today");
    }
  };

  const getDateRangeDisplay = () => {
    if (timeRange === "custom" && customRange) {
      return dateRangeText;
    }
    const option = timeRangeOptions.find((opt) => opt.value === timeRange);
    return option ? option.label : "Today";
  };

  return (
    <div className="space-y-6">
      {/* Header Section with Help Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 text-gray-500 hover:text-primary transition-colors" />
          </button>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon={<RefreshCw className="w-5 h-5" />}
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            icon={<Download className="w-5 h-5" />}
            onClick={() => console.log("Export report")}
          >
            Export Report
          </Button>

          {/* Visit Public Store button */}
          <Link to="/public-store/login">
            <Button variant="primary" icon={<Store className="w-5 h-5" />}>
              Visit Public Store
            </Button>
          </Link>
        </div>
      </div>
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center gap-2">
          <Select
            options={timeRangeOptions}
            value={timeRange === "custom" ? "today" : timeRange}
            onChange={(value) => {
              setTimeRange(value);
              if (value !== "custom") {
                setCustomRange(null);
                setDateRangeText("");
              }
            }}
            className="w-40"
          />
          <CustomDateRangePicker
            onApply={handleCustomRangeApply}
            buttonText="Custom Range"
            variant="outline"
            size="default"
          />
        </div>
        <div className="text-sm text-gray-500 ml-auto">
          <span className="font-medium">Date Range:</span>{" "}
          {getDateRangeDisplay()}
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Sales Trend
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Daily sales performance
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<Camera className="w-4 h-4" />}
                onClick={() =>
                  captureChartAsImage(salesTrendRef, "Sales_Trend")
                }
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Save chart as image"
              />
            </div>
          </div>
          <div className="p-6" ref={salesTrendRef}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0800" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF0800" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#FF0800"
                  strokeWidth={2}
                  fill="url(#colorSales)"
                  name="Sales"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions & Profit Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Transactions & Profit
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Daily transactions and profit comparison
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<Camera className="w-4 h-4" />}
                onClick={() =>
                  captureChartAsImage(
                    transactionsProfitRef,
                    "Transactions_Profit",
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Save chart as image"
              />
            </div>
          </div>
          <div className="p-6" ref={transactionsProfitRef}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="transactions"
                  fill="#FF6B6B"
                  name="Transactions"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="profit"
                  fill="#FFB347"
                  name="Profit"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Category Distribution
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Sales by product category
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<Camera className="w-4 h-4" />}
                onClick={() =>
                  captureChartAsImage(
                    categoryDistributionRef,
                    "Category_Distribution",
                  )
                }
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Save chart as image"
              />
            </div>
          </div>
          <div className="p-6" ref={categoryDistributionRef}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
            <p className="text-sm text-gray-500 mt-1">
              Store performance indicators
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">
                  Average Transaction Value
                </p>
                <p className="text-2xl font-bold text-gray-900">₱445.00</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +8.2%
                </p>
                <p className="text-xs text-gray-400">vs last week</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Items per Transaction</p>
                <p className="text-2xl font-bold text-gray-900">3.2</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +0.5
                </p>
                <p className="text-xs text-gray-400">vs last week</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Peak Sales Hour</p>
                <p className="text-2xl font-bold text-gray-900">
                  5:00 PM - 7:00 PM
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Busiest period
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Transactions
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Latest cash transactions
                </p>
              </div>
              <Link
                to="/sales"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <PesoSign className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.items} items
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Cash: ₱{transaction.cashReceived} | Change: ₱
                          {transaction.change}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₱{transaction.amount}
                    </p>
                    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700">
                      Cash
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {transaction.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert - With Image Holder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-orange-50/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Low Stock Alert
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Items below threshold
                  </p>
                </div>
              </div>
              <Link
                to="/inventory"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                Manage stock
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {lowStockProducts.map((product, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Image Holder - similar to Inventory */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          SKU: {product.sku}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₱{product.price}
                        </p>
                        <div className="flex items-center gap-1">
                          {product.critical && (
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                          )}
                          <p
                            className={`text-xs font-medium ${
                              product.stock <= 3
                                ? "text-red-600"
                                : "text-orange-600"
                            }`}
                          >
                            Stock: {product.stock} left
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions Section - Removed New Sale */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/inventory">
            <Button
              variant="outline"
              className="w-full"
              icon={<Package className="w-5 h-5" />}
            >
              Manage Inventory
            </Button>
          </Link>
          <Link to="/inventory?action=add">
            <Button
              variant="outline"
              className="w-full"
              icon={<Package className="w-5 h-5" />}
            >
              Add Product
            </Button>
          </Link>
          <Link to="/reports">
            <Button
              variant="outline"
              className="w-full"
              icon={<TrendingUp className="w-5 h-5" />}
            >
              View Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* Help Modal */}
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={[
          {
            id: 1,
            title: "Welcome to Dashboard",
            description:
              "Get a comprehensive overview of your store's performance, including sales trends, transactions, and key metrics.",
            image: instructionsImg,
            alt: "Dashboard Overview",
            isImage: true,
          },
          {
            id: 2,
            title: "Sales Analytics",
            description:
              "Track your daily sales performance with interactive charts. Click the camera icon to save charts as images for reports.",
            icon: TrendingUp,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 3,
            title: "Export Reports",
            description:
              "Use the Export Report button to download your store's performance data for further analysis or record keeping.",
            icon: Download,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 4,
            title: "Low Stock Monitoring",
            description:
              "Keep an eye on low stock items in the alerts section. Click 'Manage stock' to quickly restock items.",
            icon: AlertTriangle,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
        ]}
        title="Dashboard Help & Tutorials"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default Dashboard;
