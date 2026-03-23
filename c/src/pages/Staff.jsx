// pages/Staff.jsx
import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import StatCard from "@/components/StatCard";
import Help from "@/components/modals/Help";

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showHelpModal, setShowHelpModal] = useState(false);

  const staffData = [
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@sukipro.com",
      phone: "+63 912 345 6789",
      status: "active",
      joinDate: "Jan 15, 2024",
      lastActive: "Today",
    },
    {
      id: 2,
      name: "John Reyes",
      email: "john.reyes@sukipro.com",
      phone: "+63 923 456 7890",
      status: "active",
      joinDate: "Feb 20, 2024",
      lastActive: "Today",
    },
    {
      id: 3,
      name: "Anna Cruz",
      email: "anna.cruz@sukipro.com",
      phone: "+63 934 567 8901",
      status: "active",
      joinDate: "Mar 05, 2024",
      lastActive: "Yesterday",
    },
    {
      id: 4,
      name: "Mike Dela Cruz",
      email: "mike.delacruz@sukipro.com",
      phone: "+63 945 678 9012",
      status: "inactive",
      joinDate: "Jan 10, 2024",
      lastActive: "3 days ago",
    },
    {
      id: 5,
      name: "Sarah Lim",
      email: "sarah.lim@sukipro.com",
      phone: "+63 956 789 0123",
      status: "active",
      joinDate: "Apr 12, 2024",
      lastActive: "Today",
    },
    {
      id: 6,
      name: "Paolo Gomez",
      email: "paolo.gomez@sukipro.com",
      phone: "+63 967 890 1234",
      status: "pending",
      joinDate: "May 01, 2024",
      lastActive: "Never",
    },
  ];

  const stats = [
    {
      id: 1,
      title: "Total Staff",
      value: staffData.length,
      change: "+12%",
      changeType: "increase",
      icon: Users,
    },
    {
      id: 2,
      title: "Active Staff",
      value: staffData.filter(s => s.status === "active").length,
      change: "+2",
      changeType: "increase",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Inactive Staff",
      value: staffData.filter(s => s.status === "inactive").length,
      change: "0",
      changeType: "warning",
      icon: XCircle,
    },
    {
      id: 4,
      title: "Pending Invites",
      value: staffData.filter(s => s.status === "pending").length,
      change: "Needs Action",
      changeType: "warning",
      icon: Clock,
      alert: true,
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-500 mt-1">Manage your team members</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            icon={<UserPlus className="w-5 h-5" />}
            onClick={() => console.log("Add staff member")}
          >
            Add Staff Member
          </Button>
          <Button
            variant="outline"
            icon={<HelpCircle className="w-5 h-5" />}
            onClick={() => setShowHelpModal(true)}
          >
            Help
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Staff List Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
        {/* Search and Filter Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-48"
            />
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{staff.name}</p>
                        <p className="text-xs text-gray-500">{staff.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      <span>{staff.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(staff.status)}`}>
                      <span className="capitalize">{staff.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{staff.joinDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{staff.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No staff members found</p>
            <Button
              variant="primary"
              onClick={() => console.log("Add staff member")}
              className="mt-4"
            >
              Add your first staff member
            </Button>
          </div>
        )}
      </div>

      {/* Help Modal */}
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
};

export default Staff;