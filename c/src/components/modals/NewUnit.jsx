// components/modals/NewUnit.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/Button";
import ModalPortal from "@/components/ModalPortal";

const NewUnit = ({ isOpen, onClose, onCreateUnit }) => {
  const [unitName, setUnitName] = useState("");
  const [unitAbbreviation, setUnitAbbreviation] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unitName.trim()) {
      onCreateUnit({
        id: Date.now(),
        name: unitName.trim(),
        abbreviation:
          unitAbbreviation.trim() ||
          unitName.trim().substring(0, 3).toUpperCase(),
        status: "active",
        productCount: 0,
      });
      setUnitName("");
      setUnitAbbreviation("");
      onClose();
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          {/* Header with X button */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Create New Unit
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Define measurement units for your products
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
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Unit Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                placeholder="e.g., Piece, Kilogram, Liter, Box"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Abbreviation
              </label>
              <input
                type="text"
                value={unitAbbreviation}
                onChange={(e) => setUnitAbbreviation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                placeholder="e.g., pc, kg, L, bx"
              />
              <p className="text-xs text-gray-400 mt-1">
                Optional. If left blank, will be auto-generated from the unit
                name.
              </p>
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
                disabled={!unitName.trim()}
              >
                Create Unit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default NewUnit;
