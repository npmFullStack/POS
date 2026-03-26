// src/pages/NoShop.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Plus, HelpCircle } from "lucide-react";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import instructionsImg from "@/assets/images/instructions.png";

const NoShop = () => {
  const navigate = useNavigate();
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Section with Help Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">No Shop Found</h1>
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
            onClick={() => navigate("/create-shop")}
          >
            Create New Shop
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Store className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Welcome to SukiPRO!
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You haven't created a shop yet. Get started by creating your first
            shop to begin managing your business.
          </p>

          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => navigate("/create-shop")}
            >
              Create Your First Shop
            </Button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Need help getting started?
              </h3>
              <p className="text-xs text-gray-500">
                Check out our documentation or contact support for assistance
                with setting up your shop.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={[
          {
            id: 1,
            title: "Create Your First Shop",
            description:
              "Get started by creating your first shop. You'll need to provide basic information about your store, including name and address.",
            image: instructionsImg,
            alt: "Create Shop",
            isImage: true,
          },
          {
            id: 2,
            title: "Shop Setup",
            description:
              "After creating your shop, you can start adding products, managing inventory, and tracking sales. Set up your shop profile with logo and business details.",
            icon: Store,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 3,
            title: "Multiple Shops",
            description:
              "SukiPRO allows you to manage multiple shops from one account. You can switch between shops easily from the shop dropdown menu.",
            icon: Store,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 4,
            title: "Need Help?",
            description:
              "If you need assistance setting up your shop, check our documentation or contact our support team. We're here to help you succeed!",
            icon: HelpCircle,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
        ]}
        title="Getting Started with SukiPRO"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default NoShop;