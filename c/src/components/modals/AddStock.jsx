// components/modals/AddStock.jsx
import React, { useState } from "react";
import { X, Package, AlertCircle } from "lucide-react";
import Button from "@/components/Button";
import ModalPortal from "@/components/ModalPortal";

const AddStock = ({ isOpen, onClose, product, onAddStock }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      onAddStock({
        productId: product.id,
        quantity: parseInt(quantity),
        date: new Date().toISOString(),
      });
      setQuantity(1);
      onClose();
    }
  };

  const newStockLevel = product.stock + (parseInt(quantity) || 0);

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
          {/* Header with subheading */}
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add Stock</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Increase inventory for this product
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5">
            {/* Horizontal div with image on left, product details on right */}
            <div className="flex gap-5 mb-6">
              {/* Left side - Bigger Image */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Package className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Right side - Product Details (name, stock, price) */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    SKU: {product.sku}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Current Stock
                  </label>
                  <div className="text-base font-bold text-gray-900 whitespace-nowrap">
                    {product.stock} {product.unit}s
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-0.5">
                    Selling Price
                  </label>
                  <div className="text-base font-bold text-primary whitespace-nowrap">
                    ₱{product.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Quantity to Add <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-0"
                required
                autoFocus
              />
            </div>

            {/* Alert Message */}
            <div className="bg-primary/10 rounded-lg p-3 flex items-start gap-2 mb-5">
              <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-primary">
                After adding stock, the new stock level will be {newStockLevel}{" "}
                {product.unit}s
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
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
                disabled={!quantity || quantity <= 0}
              >
                Add Stock
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AddStock;
