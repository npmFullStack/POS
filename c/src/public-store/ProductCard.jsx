// public-store/ProductCard.jsx
import React, { useState } from "react";
import { Plus, Minus, ShoppingCart, Scan } from "lucide-react";

const ProductCard = ({ product, onAddToCart, onScan }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Compact Product Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                #{product.id}
              </span>
              {product.barcode && (
                <button
                  onClick={() => onScan && onScan(product)}
                  className="text-gray-400 hover:text-primary transition-colors"
                  title="Scan barcode"
                >
                  <Scan className="w-3 h-3" />
                </button>
              )}
            </div>
            <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
              {product.name}
            </h3>
            <p className="text-primary font-bold text-lg">
              ₱{product.price.toLocaleString()}
            </p>
          </div>

          {/* Product Image (small) */}
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/48?text=Product";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No img</span>
              </div>
            )}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="w-8 text-center text-gray-900 font-medium text-sm">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="p-1.5 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-1.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;