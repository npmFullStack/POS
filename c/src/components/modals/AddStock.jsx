// components/modals/AddStock.jsx
import React, { useState } from 'react';
import { X, Package, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import ModalPortal from '@/components/ModalPortal';

const AddStock = ({ isOpen, onClose, product, onAddStock }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      onAddStock({
        productId: product.id,
        quantity: parseInt(quantity),
        date: new Date().toISOString()
      });
      setQuantity(1);
      onClose();
    }
  };

  const newStockLevel = product.stock + (parseInt(quantity) || 0);

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Add Stock</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5">
            <div className="flex gap-6">
              {/* Left side - Image Holder */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Package className="w-16 h-16 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Right side - Product Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Stock
                    </label>
                    <div className="text-2xl font-bold text-gray-900">
                      {product.stock} {product.unit}s
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selling Price
                    </label>
                    <div className="text-2xl font-bold text-primary">
                      ₱{product.price}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity to Add <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    autoFocus
                  />
                </div>

                <div className="bg-primary/10 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-primary">
                    After adding stock, the new stock level will be {newStockLevel} {product.unit}s
                  </p>
                </div>

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
                    disabled={!quantity || quantity <= 0}
                  >
                    Add Stock
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AddStock;