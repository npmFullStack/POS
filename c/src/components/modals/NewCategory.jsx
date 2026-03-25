// components/modals/NewCategory.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/Button";
import ModalPortal from "@/components/ModalPortal";

const NewCategory = ({ isOpen, onClose, onCreateCategory }) => {
  const [categoryName, setCategoryName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onCreateCategory({
        id: Date.now(),
        name: categoryName.trim(),
        status: "active",
        productCount: 0,
      });
      setCategoryName("");
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          {/* Header with subheading */}
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              Create New Category
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Organize your products by category
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                placeholder="e.g., Snacks, Beverages, Electronics"
                autoFocus
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={!categoryName.trim()}
              >
                Create Category
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default NewCategory;
