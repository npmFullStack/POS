// pages/Sales.jsx
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  PhilippinePeso,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Printer,
  Download,
  Eye,
  CreditCard,
  Smartphone,
  Coins,
  Receipt,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

  // Sales transactions data
  const salesData = [
    {
      id: "TRX-001",
      transactionId: "T20240520001",
      customer: "Walk-in Customer",
      items: 3,
      subtotal: 267.00,
      tax: 26.70,
      total: 293.70,
      amountPaid: 300.00,
      change: 6.30,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "09:30 AM",
      cashier: "Maria Santos",
      itemsList: [
        { name: "Lays Classic", quantity: 2, price: 89.00 },
        { name: "Coke 1.5L", quantity: 1, price: 85.00 },
      ],
    },
    {
      id: "TRX-002",
      transactionId: "T20240520002",
      customer: "Walk-in Customer",
      items: 5,
      subtotal: 429.00,
      tax: 42.90,
      total: 471.90,
      amountPaid: 500.00,
      change: 28.10,
      status: "completed",
      paymentMethod: "gcash",
      date: "2024-05-20",
      time: "10:15 AM",
      cashier: "John Reyes",
      itemsList: [
        { name: "Pringles Original", quantity: 2, price: 149.00 },
        { name: "Sprite 1.5L", quantity: 1, price: 85.00 },
        { name: "Nova Cheesy", quantity: 2, price: 69.00 },
      ],
    },
    {
      id: "TRX-003",
      transactionId: "T20240520003",
      customer: "Walk-in Customer",
      items: 2,
      subtotal: 178.00,
      tax: 17.80,
      total: 195.80,
      amountPaid: 200.00,
      change: 4.20,
      status: "completed",
      paymentMethod: "cash",
      date: "2024-05-20",
      time: "11:45 AM",
      cashier: "Maria Santos",
      itemsList: [
        { name: "Doritos Nacho Cheese", quantity: 2, price: 99.00 },
      ],
    },
    {
      id: "TRX-004",
      transactionId: "T20240520004",
      customer: "Walk-in Customer",
      items: 4,
      subtotal: 324.00,
      tax: 32.40,
      total: 356.40,
      amountPaid: 360.00,
      change: 3.60,
      status: "completed",
      paymentMethod: "credit_card",
      date: "2024-05-20",
      time: "01:20 PM",
      cashier: "Anna Cruz",
      itemsList: [
        { name: "RC Cola 1.5L", quantity: 2, price: 80.00 },
        { name: "Piattos Cheese", quantity: 2, price: 69.00 },
      ],
    },
    {
      id: "TRX-005",
      transactionId: "T20240520005",
      customer: "Walk-in Customer",
      items: 1,
      subtotal: 149.00,
      tax: 14.90,
      total: 163.90,
      amountPaid: 0,
      change: 0,
      status: "voided",
      paymentMethod: null,
      date: "2024-05-20",
      time: "02:30 PM",
      cashier: "John Reyes",
      itemsList: [{ name: "Pringles Original", quantity: 1, price: 149.00 }],
    },
    {
      id: "TRX-006",
      transactionId: "T20240519001",
      customer: "Walk-in Customer",
      items: 8,
      subtotal: 624.00,
      tax: 62.40,
      total: 686.40,
      amountPaid: 700.00,
      change: 13.60,
      status: "completed",
      paymentMethod: "gcash",
      date: "2024-05-19",
      time: "08:45 AM",
      cashier: "Maria Santos",
      itemsList: [
        { name: "Lays Classic", quantity: 3, price: 89.00 },
        { name: "Cheetos Crunchy", quantity: 2, price: 79.00 },
        { name: "Coke 1.5L", quantity: 2, price: 85.00 },
        { name: "Piattos Cheese", quantity: 1, price: 69.00 },
      ],
    },
  ];

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "cash":
        return <Coins className="w-3 h-3" />;
      case "gcash":
        return <Smartphone className="w-3 h-3" />;
      case "credit_card":
        return <CreditCard className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case "cash":
        return "Cash";
      case "gcash":
        return "GCash";
      case "credit_card":
        return "Credit Card";
      default:
        return "N/A";
    }
  };

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

  // Filter sales based on search, status, and date
  const filteredSales = salesData.filter((sale) => {
    const matchesSearch =
      sale.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.cashier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter;
    
    let matchesDate = true;
    const today = new Date().toISOString().split("T")[0];
    if (dateFilter === "today") {
      matchesDate = sale.date === today;
    } else if (dateFilter === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      matchesDate = sale.date === yesterday.toISOString().split("T")[0];
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate totals for filtered sales
  const totalSales = filteredSales
    .filter((s) => s.status === "completed")
    .reduce((sum, sale) => sum + sale.total, 0);
  
  const totalTransactions = filteredSales.filter((s) => s.status === "completed").length;
  const averageTransaction = totalTransactions > 0 ? totalSales / totalTransactions : 0;

  // Today's stats
  const todaySales = salesData
    .filter((s) => s.date === new Date().toISOString().split("T")[0] && s.status === "completed")
    .reduce((sum, sale) => sum + sale.total, 0);
  
  const todayTransactions = salesData.filter(
    (s) => s.date === new Date().toISOString().split("T")[0] && s.status === "completed"
  ).length;

  const stats = [
    {
      id: 1,
      title: "Today's Sales",
      value: `₱${todaySales.toLocaleString()}`,
      change: `+${todayTransactions} transactions`,
      changeType: "increase",
      icon: PhilippinePeso,
    },
    {
      id: 2,
      title: "Total Sales",
      value: `₱${totalSales.toLocaleString()}`,
      change: `${totalTransactions} transactions`,
      changeType: "increase",
      icon: ShoppingBag,
    },
    {
      id: 3,
      title: "Average Transaction",
      value: `₱${averageTransaction.toLocaleString()}`,
      change: "per sale",
      changeType: "neutral",
      icon: TrendingUp,
    },
    {
      id: 4,
      title: "Total Tax Collected",
      value: `₱${filteredSales
        .filter((s) => s.status === "completed")
        .reduce((sum, sale) => sum + sale.tax, 0)
        .toLocaleString()}`,
      change: "12% VAT",
      changeType: "neutral",
      icon: Receipt,
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
          <h1 className="text-3xl font-bold text-gray-900">Sales Transactions</h1>
          <p className="text-gray-500 mt-1">View and manage all cashier transactions</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            <span className="font-medium">Print Report</span>
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF0800] text-white rounded-lg hover:bg-[#FF0800]/90 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="font-medium">Sync POS</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FF0800]">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${getChangeColor(stat.changeType)}`}>
                    <span>{stat.change}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {stat.title === "Today's Sales" ? "today" : "filtered period"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0800] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0800] text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="voided">Voided</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0800] text-sm"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="all">All Time</option>
            </select>
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
                  Total
                </th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
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
                return (
                  <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
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
                      <span className="text-sm text-gray-900">{sale.items} items</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">₱{sale.total.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      {sale.paymentMethod && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
                          {getPaymentMethodIcon(sale.paymentMethod)}
                          {getPaymentMethodLabel(sale.paymentMethod)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{sale.cashier}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusBadge.color}`}>
                        {statusBadge.icon}
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No transactions found</p>
          </div>
        )}
      </div>

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Coins className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Cash Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₱{filteredSales
              .filter((s) => s.paymentMethod === "cash" && s.status === "completed")
              .reduce((sum, sale) => sum + sale.total, 0)
              .toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {filteredSales.filter((s) => s.paymentMethod === "cash" && s.status === "completed").length} transactions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">GCash Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₱{filteredSales
              .filter((s) => s.paymentMethod === "gcash" && s.status === "completed")
              .reduce((sum, sale) => sum + sale.total, 0)
              .toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {filteredSales.filter((s) => s.paymentMethod === "gcash" && s.status === "completed").length} transactions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Card Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ₱{filteredSales
              .filter((s) => s.paymentMethod === "credit_card" && s.status === "completed")
              .reduce((sum, sale) => sum + sale.total, 0)
              .toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {filteredSales.filter((s) => s.paymentMethod === "credit_card" && s.status === "completed").length} transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sales;