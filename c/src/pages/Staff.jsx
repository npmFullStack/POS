// pages/Staff.jsx
import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
  MoreVertical,
  Filter,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import StatCard from "@/components/StatCard";
import Help from "@/components/modals/Help";

// Import help images
import instructionsImg from "@/assets/images/instructions.png";
import emptyImg from "@/assets/images/empty.png";

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const staffData = [
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@sukipro.com",
      phone: "+63 912 345 6789",
      status: "active",
      lastActive: "Today",
    },
    {
      id: 2,
      name: "John Reyes",
      email: "john.reyes@sukipro.com",
      phone: "+63 923 456 7890",
      status: "active",
      lastActive: "Today",
    },
    {
      id: 3,
      name: "Anna Cruz",
      email: "anna.cruz@sukipro.com",
      phone: "+63 934 567 8901",
      status: "active",
      lastActive: "Yesterday",
    },
    {
      id: 4,
      name: "Mike Dela Cruz",
      email: "mike.delacruz@sukipro.com",
      phone: "+63 945 678 9012",
      status: "inactive",
      lastActive: "3 days ago",
    },
    {
      id: 5,
      name: "Sarah Lim",
      email: "sarah.lim@sukipro.com",
      phone: "+63 956 789 0123",
      status: "active",
      lastActive: "Today",
    },
    {
      id: 6,
      name: "Paolo Gomez",
      email: "paolo.gomez@sukipro.com",
      phone: "+63 967 890 1234",
      status: "pending",
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
      changeMessage: "+12% vs last month",
      icon: Users,
    },
    {
      id: 2,
      title: "Active Staff",
      value: staffData.filter((s) => s.status === "active").length,
      change: "+2",
      changeType: "increase",
      changeMessage: "+2 this month",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Inactive Staff",
      value: staffData.filter((s) => s.status === "inactive").length,
      change: "1",
      changeType: "neutral",
      changeMessage:
        staffData.filter((s) => s.status === "inactive").length +
        " inactive staff",
      icon: XCircle,
      alert: true,
      alertMessage: "Inactive staff members need attention",
    },
    {
      id: 4,
      title: "Pending Invites",
      value: staffData.filter((s) => s.status === "pending").length,
      change: "Needs Action",
      changeType: "warning",
      changeMessage: "Pending approval",
      icon: Clock,
      alert: true,
      alertMessage: "Needs immediate attention",
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

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || staff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditStaff = (staff) => {
    console.log("Edit staff:", staff);
    setOpenDropdownId(null);
  };

  const handleDeleteStaff = (staffId) => {
    if (confirm("Delete this staff member?")) {
      console.log("Delete staff:", staffId);
    }
    setOpenDropdownId(null);
  };

  // Simplified help slides for Staff Management page - all icons use bg-primary and text-white
  const helpSlides = [
    {
      id: 1,
      title: "Welcome to Staff Management",
      description:
        "Manage your team members, track their status, and control access permissions all in one place.",
      image: instructionsImg,
      alt: "Instructions",
      isImage: true,
    },
    {
      id: 2,
      title: "Add Staff Members",
      description:
        "Click the 'Add Staff Member' button to invite new team members. Fill in their details and send invitation emails.",
      icon: UserPlus,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 3,
      title: "Search & Filter",
      description:
        "Use the search bar to find staff by name or email. Filter by status to quickly see active, inactive, or pending staff members.",
      icon: Search,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 4,
      title: "Staff Status Indicators",
      description:
        "Status badges show staff availability: Green for active, Gray for inactive, and Yellow for pending invites.",
      icon: UserCheck,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 5,
      title: "Edit & Delete Staff",
      description:
        "Click the three dots menu to edit staff information or remove team members from your organization.",
      icon: Edit,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
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
            variant="primary"
            icon={<UserPlus className="w-5 h-5" />}
            onClick={() => console.log("Add staff member")}
          >
            Add Staff Member
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
        {filteredStaff.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStaff.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 truncate max-w-[150px]">
                              {staff.name}
                            </p>
                            {staff.status === "active" && (
                              <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                            )}
                            {staff.status === "inactive" && (
                              <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
                            )}
                            {staff.status === "pending" && (
                              <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate max-w-[180px]">
                            {staff.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate max-w-[140px]">
                          {staff.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusBadgeColor(staff.status)}`}
                      >
                        <span className="capitalize">{staff.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate max-w-[100px]">
                          {staff.lastActive}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative flex items-center justify-end">
                        <button
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === staff.id ? null : staff.id,
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                        {openDropdownId === staff.id && (
                          <div className="absolute right-0 mt-1 top-full w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            <button
                              onClick={() => handleEditStaff(staff)}
                              className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStaff(staff.id)}
                              className="w-full px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4">
            <img
              src={emptyImg}
              alt="No staff members found"
              className="w-48 h-48 mx-auto mb-6 opacity-80"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No staff members found
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter to find what you're looking for."
                : "Get started by adding your first staff member to your team."}
            </p>
            <Button
              variant="primary"
              icon={<UserPlus className="w-5 h-5" />}
              onClick={() => console.log("Add staff member")}
            >
              {searchTerm || statusFilter !== "all"
                ? "Clear Filters & Add Staff"
                : "Add Your First Staff Member"}
            </Button>
          </div>
        )}
      </div>

      {/* Help Modal with slides - All icons use bg-primary and text-white */}
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={helpSlides}
        title="Staff Management Help & Tutorials"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default Staff;
