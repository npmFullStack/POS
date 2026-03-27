import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, HelpCircle, Store } from "lucide-react";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import instructionsImg from "@/assets/images/instructions.png";
import noShopImg from "@/assets/images/noShop.png";

const NoShop = () => {
  const navigate = useNavigate();
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <img
            src={noShopImg}
            alt="No shop found"
            className="w-72 h-72 object-contain mb-6"
          />
          
          {/* Added helpful message */}
          <div className="text-center mb-6 max-w-md">
            <p className="text-gray-600 mb-2">
              You haven't created any shops yet.
            </p>
            <p className="text-sm text-gray-500">
              Get started by creating your first shop. You'll be able to manage inventory, 
              track sales, and grow your business with SukiPRO.
            </p>
          </div>
          
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