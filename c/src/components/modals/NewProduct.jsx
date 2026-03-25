// components/modals/NewProduct.jsx
import React, { useState } from "react";
import { X, Package, Barcode, Tag, Box, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import ModalPortal from "@/components/ModalPortal";

const NewProduct = ({ isOpen, onClose, categories, onCreateProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    barcode: "",
    category: "",
    cost: "",
    price: "",
    stock: "",
    lowStockThreshold: "10",
    unit: "piece",
  });

  if (!isOpen) return null;

  const unitOptions = [
    { value: "piece", label: "Piece" },
    { value: "box", label: "Box" },
    { value: "pack", label: "Pack" },
    { value: "bottle", label: "Bottle" },
    { value: "kg", label: "Kilogram" },
    { value: "gram", label: "Gram" },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat.name,
    label: cat.name,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...formData,
      cost: parseFloat(formData.cost) || 0,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      lowStockThreshold: parseInt(formData.lowStockThreshold),
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      image: null,
    };
    onCreateProduct(newProduct);
    onClose();
    // Reset form
    setFormData({
      name: "",
      sku: "",
      barcode: "",
      category: "",
      cost: "",
      price: "",
      stock: "",
      lowStockThreshold: "10",
      unit: "piece",
    });
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center z-10">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Add New Product
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Fill in the product details
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                    placeholder="Enter product name"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                    placeholder="Unique product code"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Barcode
                  </label>
                  <div className="relative">
                    <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="barcode"
                      value={formData.barcode}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={categoryOptions}
                    value={formData.category}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                    placeholder="Select Category"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Pricing
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Cost Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₱
                    </span>
                    <input
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Selling Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      ₱
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Inventory Settings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Initial Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    name="lowStockThreshold"
                    value={formData.lowStockThreshold}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                    placeholder="10"
                    min="0"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Unit
                </label>
                <Select
                  options={unitOptions}
                  value={formData.unit}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, unit: value }))
                  }
                  placeholder="Select unit"
                />
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-red-100 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-primary">
                You can always edit product details and manage stock levels
                later from the inventory.
              </p>
            </div>

            {/* Actions - disabled button when form is incomplete */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5 -mx-5 px-5 flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={
                  !formData.name ||
                  !formData.sku ||
                  !formData.category ||
                  !formData.price
                }
              >
                Save Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default NewProduct;
