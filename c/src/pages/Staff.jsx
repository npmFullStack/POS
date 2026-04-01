// pages/Staff.jsx
import React, { useState, useEffect, useRef } from "react";
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
import NewStaff from "@/components/modals/NewStaff";
import { staffService } from "@/services/staff.service";
import { shopService } from "@/services/shop.service";
import { authService } from "@/services/auth.service"; // Add this import
import { toastUtils } from "@/components/Toast";
import { supabase } from "@/lib/supabase"; 
// Import help images
import instructionsImg from "@/assets/images/instructions.png";
import emptyImg from "@/assets/images/noShop.png";

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showNewStaffModal, setShowNewStaffModal] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeShop, setActiveShop] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const dropdownRef = useRef(null);

  const stats = [
    {
      id: 1,
      title: "Total Staff",
      value: staffData.length,
      change: "+0%",
      changeType: "neutral",
      changeMessage: "Total staff members",
      icon: Users,
    },
    {
      id: 2,
      title: "Active Staff",
      value: staffData.filter((s) => s.status === "active").length,
      change: "+0",
      changeType: "increase",
      changeMessage: "Active staff members",
      icon: CheckCircle,
    },
    {
      id: 3,
      title: "Inactive Staff",
      value: staffData.filter((s) => s.status === "inactive").length,
      change: "0",
      changeType: "neutral",
      changeMessage: "Inactive staff members",
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

  // Load staff data when component mounts or shop changes
  useEffect(() => {
    loadStaffData();
    
    // Listen for shop changes
    const handleShopChange = () => {
      console.log("Shop changed, reloading staff data...");
      loadStaffData();
    };
    
    window.addEventListener("shop-changed", handleShopChange);
    return () => window.removeEventListener("shop-changed", handleShopChange);
  }, []);

  const loadStaffData = async () => {
    setLoading(true);
    try {
      console.log("Loading staff data...");
      
      // Get current user from auth
      const { success, user } = await authService.getCurrentUser();
      if (!success || !user) {
        console.error("No authenticated user found");
        toastUtils.error("Please sign in to view staff");
        setLoading(false);
        return;
}
      
      console.log("Current auth user:", user);
      
      // Get the actual user ID from the users table
      let userId = null;
      
      if (user.profile && user.profile.id) {
        // If profile exists, use that ID
        userId = user.profile.id;
        console.log("Using profile ID:", userId);
      } else {
const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("auth_id", user.id)
          .single();
        
        if (userError) {
          console.error("Error fetching user record:", userError);
          toastUtils.error("User profile not found. Please contact support.");
          setLoading(false);
          return;
        }
userId = userData.id;
        console.log("Fetched user ID from users table:", userId);
      }
      
      setCurrentUser({ ...user, profileId: userId });
      
      // Get active shop using the correct user ID
      const activeResult = await shopService.getActiveShop(userId);
      console.log("Active shop result:", activeResult);if (activeResult.success && activeResult.data) {
        setActiveShop(activeResult.data);
        console.log("Active shop found:", activeResult.data);
        
        // Load staff for this shop
        const staffResult = await staffService.getShopStaff(activeResult.data.id);
        console.log("Staff result:", staffResult);
        
        if (staffResult.success) {
          setStaffData(staffResult.data);
console.log("Staff data loaded:", staffResult.data.length, "members");
        } else {
          console.error("Failed to load staff:", staffResult.error);
          toastUtils.error("Failed to load staff data");
          setStaffData([]);
        }
      } else {
        console.log("No active shop found");
        setActiveShop(null);
        setStaffData([]);
toastUtils.info("Please create a shop first to manage staff");
      }
    } catch (error) {
      console.error("Error loading staff:", error);
      toastUtils.error("Failed to load staff data");
      setStaffData([]);
    } finally {
      setLoading(false);
    }
  };


  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.username?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || staff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateStaff = async (newStaff) => {
    if (!activeShop) {
      toastUtils.error("No active shop selected. Please select or create a shop first.");
      return;
    }
    
    console.log("Creating staff for shop:", activeShop.id, activeShop.name);
    
    const result = await staffService.createStaff(newStaff, activeShop.id);
    if (result.success) {
      await loadStaffData(); // Reload staff data
      toastUtils.success("Staff member added successfully!");
    } else {
      toastUtils.error("Failed to add staff member", {
        description: result.error,
      });
    }
  };

  const handleEditStaff = (staff) => {
    console.log("Edit staff:", staff);
    setOpenDropdownId(null);
    // You can implement edit functionality here
  };

  const handleDeleteStaff = async (staffId) => {
    if (window.confirm("Delete this staff member?")) {
      const result = await staffService.deleteStaff(staffId);
      if (result.success) {
        await loadStaffData(); // Reload staff data
        toastUtils.success("Staff member deleted successfully!");
      } else {
        toastUtils.error("Failed to delete staff member", {
          description: result.error,
        });
      }
    }
    setOpenDropdownId(null);
  };

  const handleUpdateStatus = async (staffId, newStatus) => {
    const result = await staffService.updateStaffStatus(staffId, newStatus);
    if (result.success) {
      await loadStaffData(); // Reload staff data
      toastUtils.success(`Staff status updated to ${newStatus}!`);
    } else {
      toastUtils.error("Failed to update staff status", {
        description: result.error,
      });
    }
    setOpenDropdownId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simplified help slides for Staff Management page
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
        "Click the 'Add Staff Member' button to invite new team members. Fill in their details including name, username, and password.",
      icon: UserPlus,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 3,
      title: "Search & Filter",
      description:
        "Use the search bar to find staff by name or username. Filter by status to quickly see active, inactive, or pending staff members.",
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
      title: "Manage Staff",
      description:
        "Click the three dots menu to edit staff information, change status, or remove team members from your organization.",
      icon: Edit,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show message if no active shop
  if (!activeShop) {
    return (
      <div className="text-center py-16 px-4">
        <img
          src={emptyImg}
          alt="No shop found"
          className="w-48 h-48 mx-auto mb-6 opacity-80"
        />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Active Shop Found
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Please select or create a shop first to manage staff members.
        </p>
        <Button
          variant="primary"
          onClick={() => window.location.href = "/switch-shop"}
        >
          Switch or Create Shop
        </Button>
      </div>
    );
  }

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
            onClick={() => setShowNewStaffModal(true)}
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
                placeholder="Search by name or username..."
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
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center flex-shrink-0">
                          {staff.image ? (
                            <img
                              src={staff.image}
                              alt={staff.fullName || staff.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <Users className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 truncate max-w-[150px]">
                              {staff.fullName || staff.name}
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
                          <p className="text-xs text-gray-500">
                            @{staff.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {staff.phone && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="w-3 h-3" />
                            <span className="truncate max-w-[140px]">
                              {staff.phone}
                            </span>
                          </div>
                        )}
                        {!staff.phone && (
                          <span className="text-xs text-gray-400">No phone</span>
                        )}
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
                              openDropdownId === staff.id ? null : staff.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>
                        {openDropdownId === staff.id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-1 top-full w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                          >
                            <button
                              onClick={() => handleEditStaff(staff)}
                              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            
                            {/* Status Change Options */}
                            {staff.status !== "active" && (
                              <button
                                onClick={() => handleUpdateStatus(staff.id, "active")}
                                className="w-full px-3 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                Set Active
                              </button>
                            )}
                            {staff.status !== "inactive" && (
                              <button
                                onClick={() => handleUpdateStatus(staff.id, "inactive")}
                                className="w-full px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <UserX className="w-3.5 h-3.5" />
                                Set Inactive
                              </button>
                            )}
                            
                            <div className="border-t border-gray-100 my-1"></div>
                            
                            <button
                              onClick={() => handleDeleteStaff(staff.id)}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
              onClick={() => setShowNewStaffModal(true)}
            >
              {searchTerm || statusFilter !== "all"
                ? "Clear Filters & Add Staff"
                : "Add Your First Staff Member"}
            </Button>
          </div>
        )}
      </div>

      {/* New Staff Modal */}
      <NewStaff
        isOpen={showNewStaffModal}
        onClose={() => setShowNewStaffModal(false)}
        onCreateStaff={handleCreateStaff}
      />

      {/* Help Modal */}
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