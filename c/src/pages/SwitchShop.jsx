import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  Search,
  ChevronRight,
  X,
  Plus,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import instructionsImg from "@/assets/images/instructions.png";

const SwitchShop = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Mock shops data - only one active shop at a time
  const [shops, setShops] = useState([
    {
      id: 1,
      name: "Nors",
      address: "123 Main Street, Downtown",
      type: "Retail Store",
      status: "active",
      image:
        "https://ui-avatars.com/api/?name=Nors&background=FF0800&color=fff",
    },
    {
      id: 2,
      name: "TechHub",
      address: "456 Tech Avenue, Business District",
      type: "Electronics Store",
      status: "inactive",
      lastActive: "1 hour ago",
      image:
        "https://ui-avatars.com/api/?name=TechHub&background=3B82F6&color=fff",
    },
    {
      id: 3,
      name: "Fashionista",
      address: "789 Style Street, Fashion District",
      type: "Clothing Boutique",
      status: "inactive",
      lastActive: "1 day ago",
      image:
        "https://ui-avatars.com/api/?name=Fashionista&background=10B981&color=fff",
    },
  ]);

  // Filter shops based on search term
  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSwitchShop = (shop) => {
    // Update active status - selected shop becomes active
    const updatedShops = shops.map((s) => ({
      ...s,
      status: s.id === shop.id ? "active" : "inactive",
    }));
    setShops(updatedShops);
  };

  const handleCreateShop = () => {
    navigate("/create-shop");
  };

  // Separate active shop and inactive shops
  const activeShop = shops.find((shop) => shop.status === "active");
  const inactiveShops = shops.filter((shop) => shop.status !== "active");

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

      {/* Search Bar - Only show if there are shops */}
      {shops.length > 0 && (
        <div className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shops by name, address, or type..."
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
          {activeShop && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-100">
                <h2 className="text-xs font-semibold text-gray-950 uppercase tracking-wider">
                  Current Active Shop
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                      <img
                        src={activeShop.image}
                        alt={activeShop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {activeShop.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {activeShop.address}
                      </p>
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
              <div className="px-6 py-3 border-b border-gray-100">
                <h2 className="text-xs font-semibold text-gray-950 uppercase tracking-wider">
                  Other Shops
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {inactiveShops.map((shop) => (
                  <div
                    key={shop.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                          <img
                            src={shop.image}
                            alt={shop.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {shop.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {shop.address}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-gray-400">
                              Last active: {shop.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ChevronRight className="w-3 h-3" />}
                        onClick={() => handleSwitchShop(shop)}
                        className="text-xs px-3 py-1.5"
                      >
                        Switch
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
              "Your currently active shop is shown at the top with a green checkmark. Click 'Switch' on any other shop to make it active.",
            icon: Store,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 3,
            title: "Create New Shop",
            description:
              "Use the 'Create New Shop' button to add more shops to your account. Each shop can have its own inventory and settings.",
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
