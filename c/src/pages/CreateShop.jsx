import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Store, MapPin, X, HelpCircle } from "lucide-react";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import { authService } from "@/services/auth.service";
import { shopService } from "@/services/shop.service";
import instructionsImg from "@/assets/images/instructions.png";

const CreateShop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    shopImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        shopImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      shopImage: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.shopName.trim()) {
      setError("Please enter shop name");
      return;
    }
    if (!formData.address.trim()) {
      setError("Please enter shop address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Get current user
      const {
        success,
        user,
        error: userError,
      } = await authService.getCurrentUser();

      if (!success || !user || !user.profile) {
        throw new Error("User not found. Please sign in again.");
      }

      console.log("Creating shop for user:", user.profile.id);

      // Create shop with image upload handled internally
      const result = await shopService.createShop(
        {
          name: formData.shopName,
          address: formData.address,
          shopImage: formData.shopImage,
        },
        user.profile.id,
      );

      if (result.success) {
        console.log("Shop created successfully:", result.data);

        // Set as active shop
        shopService.setActiveShop(result.data.id);

        // Dispatch event to notify ProtectedLayout about shop creation
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("shop-created"));
          window.dispatchEvent(new Event("shop-changed"));
        }

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        console.error("Shop creation failed:", result.error);
        setError(result.error || "Failed to create shop");
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      setError(error.message || "Failed to create shop. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create Shop</h1>
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 text-gray-500 hover:text-primary transition-colors" />
          </button>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Shop Image Upload */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Shop Image
              </h3>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Shop preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Store className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="shop-image-upload"
                  />
                  <label
                    htmlFor="shop-image-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-fit"
                  >
                    <Upload className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </span>
                  </label>
                  <p className="text-xs text-gray-400 mt-2">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                      placeholder="Enter shop name"
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0 resize-none"
                      placeholder="Enter shop address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-3 flex items-start gap-2">
              <Store className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs font-semibold text-primary">
                You can always edit shop details later from the shop settings.
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 flex justify-end gap-3">
            <Button variant="outline" onClick={handleBack} type="button">
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={!formData.shopName || !formData.address || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Shop"}
            </Button>
          </div>
        </form>
      </div>

      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={[
          {
            id: 1,
            title: "Create a New Shop",
            description:
              "Fill in the shop details to create a new store. Your shop will be ready to use immediately.",
            image: instructionsImg,
            alt: "Create Shop Overview",
            isImage: true,
          },
          {
            id: 2,
            title: "Shop Information",
            description:
              "Provide a unique shop name and address. This information will be displayed to your customers and used for business operations.",
            icon: Store,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 3,
            title: "Shop Image",
            description:
              "Upload a square image for your shop logo or storefront. This will help identify your shop in the shop switcher.",
            icon: Upload,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
          {
            id: 4,
            title: "Ready to Go",
            description:
              "After creating your shop, you'll be redirected to your dashboard where you can start managing your business.",
            icon: ArrowLeft,
            iconColor: "text-white",
            bgColor: "bg-primary",
          },
        ]}
        title="Create Shop Help & Tutorials"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default CreateShop;
