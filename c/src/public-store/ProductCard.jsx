// public-store/ProductCard.jsx
import React, { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Product Image - Fixed height for mobile */}
      <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 h-24 sm:h-28 md:h-32 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/96?text=No+Image";
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mb-0.5" />
            <span className="text-[8px] sm:text-[10px] text-gray-400">No image</span>
          </div>
        )}
        
        {/* Category badge */}
        {product.category && (
          <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm text-white text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded">
            {product.category}
          </span>
        )}
      </div>
      
      {/* Product Details */}
      <div className="p-2 sm:p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-0.5 line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <p className="text-primary font-bold text-sm sm:text-base">
              ₱{product.price.toLocaleString()}
            </p>
          </div>
          <span className="text-[8px] sm:text-[10px] font-mono bg-gray-100 text-gray-500 px-1 py-0.5 rounded flex-shrink-0">
            #{product.id}
          </span>
        </div>

        {/* Stock Info */}
        {product.stock !== undefined && (
          <p className="text-[9px] sm:text-[10px] text-gray-500 mb-2">
            Stock: {product.stock}
          </p>
        )}

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
            <button
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="p-1 sm:p-1.5 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
            </button>
            <span className="w-6 sm:w-7 text-center text-gray-900 font-medium text-xs sm:text-sm">
              {quantity}
            </span>
            <button
              onClick={incrementQuantity}
              className="p-1 sm:p-1.5 hover:bg-gray-50 transition-colors touch-manipulation"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary text-white py-1 sm:py-1.5 rounded-md font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-1 touch-manipulation"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;