// pages/Sales.jsx - Updated with accounting metrics and empty state
import React, { useState } from "react";
import {
  ShoppingBag,
  PhilippinePeso,
  TrendingUp,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Printer,
  Download,
  Eye,
  RefreshCw,
  Percent,
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Button from "@/components/Button";
import Select from "@/components/Select";
import StatCard from "@/components/StatCard";

// Import empty image
import emptyImg from "@/assets/images/noShop.png";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Date filter options
  const dateOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "all", label: "All Time" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "voided", label: "Voided" },
  ];

  // Sales transactions data - Cash only with cost of goods sold (COGS)
  const salesData = [
    {
      id: "TRX-001",
      transactionId: "T20240520001",
      customer: "Walk-in Customer",
      items: 3,
      subtotal: 267.0,
      tax: 26.7,
      total: 293.7,
      costOfGoods: 185.0, // COGS for items sold
      amountPaid: 300.0,
      change: 6.3,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "09:30 AM",
      cashier: "Maria Santos",
      itemsList: [
        {
          name: "Lays Classic",
          quantity: 2,
          price: 89.0,
          cost: 65.0,
          subtotal: 178.0,
        },
        {
          name: "Coke 1.5L",
          quantity: 1,
          price: 85.0,
          cost: 60.0,
          subtotal: 85.0,
        },
      ],
    },
    {
      id: "TRX-002",
      transactionId: "T20240520002",
      customer: "Walk-in Customer",
      items: 5,
      subtotal: 429.0,
      tax: 42.9,
      total: 471.9,
      costOfGoods: 315.0,
      amountPaid: 500.0,
      change: 28.1,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "10:15 AM",
      cashier: "John Reyes",
      itemsList: [
        {
          name: "Pringles Original",
          quantity: 2,
          price: 149.0,
          cost: 110.0,
          subtotal: 298.0,
        },
        {
          name: "Sprite 1.5L",
          quantity: 1,
          price: 85.0,
          cost: 60.0,
          subtotal: 85.0,
        },
        {
          name: "Nova Cheesy",
          quantity: 2,
          price: 69.0,
          cost: 48.0,
          subtotal: 138.0,
        },
      ],
    },
    {
      id: "TRX-003",
      transactionId: "T20240520003",
      customer: "Walk-in Customer",
      items: 2,
      subtotal: 178.0,
      tax: 17.8,
      total: 195.8,
      costOfGoods: 135.0,
      amountPaid: 200.0,
      change: 4.2,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "11:45 AM",
      cashier: "Maria Santos",
      itemsList: [
        {
          name: "Doritos Nacho Cheese",
          quantity: 2,
          price: 99.0,
          cost: 75.0,
          subtotal: 198.0,
        },
      ],
    },
    {
      id: "TRX-004",
      transactionId: "T20240520004",
      customer: "Walk-in Customer",
      items: 4,
      subtotal: 324.0,
      tax: 32.4,
      total: 356.4,
      costOfGoods: 225.0,
      amountPaid: 360.0,
      change: 3.6,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "01:20 PM",
      cashier: "Anna Cruz",
      itemsList: [
        {
          name: "RC Cola 1.5L",
          quantity: 2,
          price: 80.0,
          cost: 55.0,
          subtotal: 160.0,
        },
        {
          name: "Piattos Cheese",
          quantity: 2,
          price: 69.0,
          cost: 48.0,
          subtotal: 138.0,
        },
      ],
    },
    {
      id: "TRX-005",
      transactionId: "T20240520005",
      customer: "Walk-in Customer",
      items: 1,
      subtotal: 149.0,
      tax: 14.9,
      total: 163.9,
      costOfGoods: 110.0,
      amountPaid: 0,
      change: 0,
      status: "voided",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "02:30 PM",
      cashier: "John Reyes",
      itemsList: [
        {
          name: "Pringles Original",
          quantity: 1,
          price: 149.0,
          cost: 110.0,
          subtotal: 149.0,
        },
      ],
    },
    {
      id: "TRX-006",
      transactionId: "T20240519001",
      customer: "Walk-in Customer",
      items: 8,
      subtotal: 624.0,
      tax: 62.4,
      total: 686.4,
      costOfGoods: 445.0,
      amountPaid: 700.0,
      change: 13.6,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-19",
      time: "08:45 AM",
      cashier: "Maria Santos",
      itemsList: [
        {
          name: "Lays Classic",
          quantity: 3,
          price: 89.0,
          cost: 65.0,
          subtotal: 267.0,
        },
        {
          name: "Cheetos Crunchy",
          quantity: 2,
          price: 79.0,
          cost: 55.0,
          subtotal: 158.0,
        },
        {
          name: "Coke 1.5L",
          quantity: 2,
          price: 85.0,
          cost: 60.0,
          subtotal: 170.0,
        },
        {
          name: "Piattos Cheese",
          quantity: 1,
          price: 69.0,
          cost: 48.0,
          subtotal: 69.0,
        },
      ],
    },
  ];

  // Sales trend data for charts (last 7 days)
  const getSalesTrendData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const daySales = salesData
        .filter((s) => s.date === dateStr && s.status === "completed")
        .reduce((sum, s) => sum + s.total, 0);
      const dayTransactions = salesData.filter(
        (s) => s.date === dateStr && s.status === "completed",
      ).length;
      const dayGrossIncome = salesData
        .filter((s) => s.date === dateStr && s.status === "completed")
        .reduce((sum, s) => sum + (s.total - s.tax - s.costOfGoods), 0);

      last7Days.push({
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        sales: daySales,
        transactions: dayTransactions,
        grossIncome: dayGrossIncome,
        date: dateStr,
      });
    }
    return last7Days;
  };

  const salesTrendData = getSalesTrendData();

  // Filter sales based on search, status, and date
  const filteredSales = salesData.filter((sale) => {
    const matchesSearch =
      sale.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.cashier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || sale.status === statusFilter;

    let matchesDate = true;
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);

    if (dateFilter === "today") {
      matchesDate = sale.date === today;
    } else if (dateFilter === "yesterday") {
      matchesDate = sale.date === yesterdayStr;
    } else if (dateFilter === "week") {
      matchesDate = new Date(sale.date) >= thisWeekStart;
    } else if (dateFilter === "month") {
      matchesDate =
        new Date(sale.date).getMonth() === new Date().getMonth() &&
        new Date(sale.date).getFullYear() === new Date().getFullYear();
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate accounting metrics
  const completedSales = filteredSales.filter((s) => s.status === "completed");

  const totalRevenue = completedSales.reduce(
    (sum, sale) => sum + sale.total,
    0,
  );
  const totalTax = completedSales.reduce((sum, sale) => sum + sale.tax, 0);
  const totalCostOfGoods = completedSales.reduce(
    (sum, sale) => sum + (sale.costOfGoods || 0),
    0,
  );
  const netSales = totalRevenue - totalTax;
  const grossIncome = totalRevenue - totalCostOfGoods;
  const grossProfitMargin =
    totalRevenue > 0 ? (grossIncome / totalRevenue) * 100 : 0;
  const totalTransactions = completedSales.length;
  const averageTransaction =
    totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  const totalCashCollected = completedSales.reduce(
    (sum, sale) => sum + sale.amountPaid,
    0,
  );

  // Today's metrics
  const todayDate = new Date().toISOString().split("T")[0];
  const todaySales = salesData
    .filter((s) => s.date === todayDate && s.status === "completed")
    .reduce((sum, sale) => sum + sale.total, 0);
  const todayTransactions = salesData.filter(
    (s) => s.date === todayDate && s.status === "completed",
  ).length;

  // Stats data for StatCard components - Accounting focused
  const stats = [
    {
      id: 1,
      title: "TOTAL REVENUE",
      value: `₱${totalRevenue.toLocaleString()}`,
      change: `${totalTransactions} total transactions`,
      changeType: "increase",
      icon: PhilippinePeso,
      capacity: 100,
    },
    {
      id: 2,
      title: "GROSS INCOME",
      value: `₱${grossIncome.toLocaleString()}`,
      change: `${grossProfitMargin.toFixed(1)}% margin`,
      changeType: grossProfitMargin > 20 ? "increase" : "warning",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "COST OF GOODS SOLD",
      value: `₱${totalCostOfGoods.toLocaleString()}`,
      change: `${((totalCostOfGoods / totalRevenue) * 100 || 0).toFixed(1)}% of revenue`,
      changeType: "neutral",
      icon: ShoppingBag,
    },
    {
      id: 4,
      title: "NET SALES (excl. VAT)",
      value: `₱${netSales.toLocaleString()}`,
      change: `${totalTax.toLocaleString()} VAT collected`,
      changeType: "neutral",
      icon: Percent,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-100 text-green-700",
          icon: <CheckCircle className="w-3 h-3" />,
          label: "Completed",
        };
      case "voided":
        return {
          color: "bg-red-100 text-red-700",
          icon: <XCircle className="w-3 h-3" />,
          label: "Voided",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700",
          icon: <Clock className="w-3 h-3" />,
          label: "Pending",
        };
    }
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const handlePrintReport = () => {
    console.log("Printing report...");
  };

  const handleExportData = () => {
    console.log("Exporting data...");
  };

  const handleSyncPOS = () => {
    console.log("Syncing with POS...");
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sales & Accounting
          </h1>
          <p className="text-gray-500 mt-1">
            View sales performance and financial metrics
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon={<Printer className="w-5 h-5" />}
            onClick={handlePrintReport}
          >
            Print Report
          </Button>
          <Button
            variant="outline"
            icon={<Download className="w-5 h-5" />}
            onClick={handleExportData}
          >
            Export
          </Button>
          <Button
            variant="primary"
            icon={<RefreshCw className="w-5 h-5" />}
            onClick={handleSyncPOS}
          >
            Sync POS
          </Button>
        </div>
      </div>

      {/* Accounting Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Charts Section - Updated to match Dashboard styling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart - Similar to Dashboard's Sales Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Revenue Trend
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Daily sales performance (last 7 days)
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesTrendData}>
                <defs>
                  <linearGradient
                    id="colorSalesTrend"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
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
                  fill="url(#colorSalesTrend)"
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gross Income vs COGS Chart - Updated to match Dashboard's Bar Chart style */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Gross Income Analysis
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Revenue vs Cost of Goods Sold
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    name: "Metrics",
                    revenue: totalRevenue,
                    cogs: totalCostOfGoods,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#FF6B6B"
                  name="Total Revenue"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="cogs"
                  fill="#FFB347"
                  name="Cost of Goods Sold"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Gross Income: ₱{grossIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FFB347] rounded-full"></div>
                <span className="text-sm text-gray-600">
                  COGS: ₱{totalCostOfGoods.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by transaction ID or cashier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-40"
            />
            <Select
              options={dateOptions}
              value={dateFilter}
              onChange={setDateFilter}
              className="w-40"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  COGS
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Income
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cashier
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSales.map((sale) => {
                const statusBadge = getStatusBadge(sale.status);
                const grossIncomeAmount =
                  sale.status === "completed"
                    ? sale.total - sale.tax - (sale.costOfGoods || 0)
                    : 0;
                return (
                  <tr
                    key={sale.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-mono text-sm font-medium text-gray-900">
                          {sale.transactionId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-900">{sale.date}</p>
                        <p className="text-xs text-gray-500">{sale.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {sale.items} items
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        ₱{sale.total.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">+₱{sale.tax} VAT</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-amber-600">
                        ₱{(sale.costOfGoods || 0).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-green-600">
                        ₱{grossIncomeAmount.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {sale.cashier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusBadge.color}`}
                      >
                        {statusBadge.icon}
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => handleViewDetails(sale)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-16 px-4">
            <img
              src={emptyImg}
              alt="No transactions found"
              className="w-48 h-48 mx-auto mb-6 opacity-80"
            />
            <p className="text-gray-500 text-lg">No transactions found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || statusFilter !== "all" || dateFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No sales transactions recorded yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
