import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Store, MapPin, X, HelpCircle } from "lucide-react";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import Info from "@/components/Info";
import { authService } from "@/services/auth.service";
import { shopService } from "@/services/shop.service";
import { toastUtils } from "@/components/Toast";
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
      if (file.size > 2 * 1024 * 1024) {
        toastUtils.error("Image size should be less than 2MB");
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
      toastUtils.error("Please enter shop name");
      return;
    }
    if (!formData.address.trim()) {
      toastUtils.error("Please enter shop address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const {
        success,
        user,
        error: userError,
      } = await authService.getCurrentUser();

      if (!success || !user || !user.profile) {
        throw new Error("User not found. Please sign in again.");
      }

      const result = await shopService.createShop(
        {
          name: formData.shopName,
          address: formData.address,
          shopImage: formData.shopImage,
        },
        user.profile.id,
      );

      if (result.success) {
        shopService.setActiveShop(result.data.id);

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("shop-created"));
          window.dispatchEvent(new Event("shop-changed"));
        }

        toastUtils.success("Shop created successfully!", {
          description: `${formData.shopName} is now ready to use.`,
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toastUtils.error("Failed to create shop", {
          description: result.error || "Please try again later.",
        });
        setError(result.error || "Failed to create shop");
      }
    } catch (error) {
      toastUtils.error("Failed to create shop", {
        description: error.message || "Please try again later.",
      });
      setError(error.message || "Failed to create shop. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
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

      {error && (
        <Info 
          icon={<XCircle className="w-5 h-5" />}
          title="Error"
          message={error}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shop Image
                </h3>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Shop preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8">
                        <Store className="w-20 h-20 text-gray-300 mb-4" />
                        <p className="text-sm text-gray-500 text-center mb-3">
                          Upload a square image for your shop
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="shop-image-upload"
                        />
                        <label
                          htmlFor="shop-image-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Choose Image
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
              </div>

              {/* Right Column - Shop Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shop Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter shop name"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                        placeholder="Enter shop address"
                        required
                      />
                    </div>
                  </div>

                  <Info
                    icon={<Store className="w-4 h-4" />}
                    title="Note"
                    message="You can always edit shop details later from the shop settings."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-t border-gray-100 px-8 py-5 flex justify-end gap-3">
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