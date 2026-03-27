import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  Search,
  ChevronRight,
  X,
  Plus,
  HelpCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import instructionsImg from "@/assets/images/instructions.png";
import { shopService } from "@/services/shop.service";
import { authService } from "@/services/auth.service";

const SwitchShop = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [shops, setShops] = useState([]);
  const [activeShop, setActiveShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [switchingShopId, setSwitchingShopId] = useState(null);
  const [error, setError] = useState(null);

  // Load user shops and active shop
  const loadShops = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const { success: userSuccess, user } = await authService.getCurrentUser();
      
      if (!userSuccess || !user?.profile) {
        navigate("/login");
        return;
      }

      // Get all shops
      const shopsResult = await shopService.getAllUserShops(user.profile.id);
      
      if (!shopsResult.success) {
        setError("Failed to load shops. Please try again.");
        return;
      }

      const userShops = shopsResult.data || [];
      setShops(userShops);

      // Get active shop
      const activeResult = await shopService.getActiveShop(user.profile.id);
      
      if (activeResult.success && activeResult.data) {
        setActiveShop(activeResult.data);
      }
    } catch (err) {
      console.error("Error loading shops:", err);
      setError("An error occurred while loading shops.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadShops();
  }, [loadShops]);

  const handleSwitchShop = async (shop) => {
    try {
      setSwitchingShopId(shop.id);
      setError(null);

      // Set active shop in localStorage and state
      shopService.setActiveShop(shop.id);
      setActiveShop(shop);

      // Update the shops list to reflect the new active status
      setShops(prevShops =>
        prevShops.map(s => ({
          ...s,
          isActive: s.id === shop.id,
        }))
      );

      // Navigate back to dashboard after switching
      navigate("/dashboard");
    } catch (err) {
      console.error("Error switching shop:", err);
      setError("Failed to switch shop. Please try again.");
    } finally {
      setSwitchingShopId(null);
    }
  };

  const handleCreateShop = () => {
    navigate("/create-shop");
  };

  // Filter shops based on search term
  const filteredShops = shops.filter(
    (shop) =>
      shop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate active shop and inactive shops
  const currentActiveShop = activeShop;
  const inactiveShops = filteredShops.filter(
    (shop) => shop.id !== currentActiveShop?.id
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-gray-500">Loading your shops...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section with Help Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Switch Shop</h1>
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
            icon={<Plus className="w-4 h-4" />}
            onClick={handleCreateShop}
          >
            Create New Shop
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Search Bar - Only show if there are shops */}
      {shops.length > 0 && (
        <div className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shops by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Shop List */}
      {shops.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
          <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Shops Yet
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't created any shops. Get started by creating your first
            shop now.
          </p>
          <Button
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
            onClick={handleCreateShop}
          >
            Create Your First Shop
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Shop Section */}
          {currentActiveShop && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current Active Shop
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                      {currentActiveShop.shop_image_url ? (
                        <img
                          src={currentActiveShop.shop_image_url}
                          alt={currentActiveShop.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                          <Store className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {currentActiveShop.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>
                      {currentActiveShop.address && (
                        <p className="text-sm text-gray-500 mt-0.5">
                          {currentActiveShop.address}
                        </p>
                      )}
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>
          )}

          {/* Inactive Shops Section */}
          {inactiveShops.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Other Shops ({inactiveShops.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {inactiveShops.map((shop) => (
                  <div
                    key={shop.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                          {shop.shop_image_url ? (
                            <img
                              src={shop.shop_image_url}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <Store className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {shop.name}
                          </h3>
                          {shop.address && (
                            <p className="text-sm text-gray-500 truncate">
                              {shop.address}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">
                              Created: {new Date(shop.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={
                          switchingShopId === shop.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <ChevronRight className="w-3 h-3" />
                          )
                        }
                        onClick={() => handleSwitchShop(shop)}
                        disabled={switchingShopId === shop.id}
                        className="text-xs px-3 py-1.5 ml-4 flex-shrink-0"
                      >
                        {switchingShopId === shop.id ? "Switching..." : "Switch"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredShops.length === 0 && searchTerm && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No shops found
              </h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      )}

      {/* Help Modal */}
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={[
          {
            id: 1,
            title: "Switch Between Shops",
            description:
              "Easily manage multiple shops by switching between them. Only one shop can be active at a time.",
            image: instructionsImg,
            alt: "Switch Shop Overview",
            isImage: true,
          },
          {
            id: 2,
            title: "Select Active Shop",
            description:
              "Your currently active shop is shown at the top with a green checkmark. Click 'Switch' on any other shop to make it active and start managing it.",
            icon: Store,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 3,
            title: "Create New Shop",
            description:
              "Use the 'Create New Shop' button to add more shops to your account. Each shop can have its own inventory, staff, and settings.",
            icon: Plus,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
        ]}
        title="Switch Shop Help & Tutorials"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default SwitchShop;