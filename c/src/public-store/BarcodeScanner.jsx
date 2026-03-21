// public-store/BarcodeScanner.jsx
import React, { useState, useRef, useEffect } from "react";
import { Barcode, Search, X, Plus } from "lucide-react";

const BarcodeScanner = ({ products, onProductFound, onClose }) => {
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle barcode input change
  const handleBarcodeChange = (e) => {
    const value = e.target.value;
    setBarcode(value);
    setError("");

    // Search for products matching barcode or name
    if (value.length > 0) {
      const matches = products.filter(product => 
        (product.barcode && product.barcode.toLowerCase().includes(value.toLowerCase())) ||
        (product.id && product.id.toString().includes(value)) ||
        (product.name && product.name.toLowerCase().includes(value.toLowerCase()))
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Handle product selection
  const handleSelectProduct = (product) => {
    onProductFound(product, quantity);
    setBarcode("");
    setQuantity(1);
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle Enter key to search/add product
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && barcode.trim()) {
      e.preventDefault();
      
      // Try to find product by barcode or ID
      const product = products.find(p => 
        (p.barcode && p.barcode === barcode) || 
        (p.id && p.id.toString() === barcode)
      );
      
      if (product) {
        handleSelectProduct(product);
      } else {
        setError("Product not found. Please check the barcode.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Barcode className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">Scan Barcode</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Barcode Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter or Scan Barcode
            </label>
            <div className="relative">
              <Barcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                ref={inputRef}
                type="text"
                value={barcode}
                onChange={handleBarcodeChange}
                onKeyPress={handleKeyPress}
                placeholder="Scan barcode or enter product code..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border border-gray-300 rounded-lg py-1"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suggestions
              </label>
              <div className="space-y-2">
                {suggestions.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          ID: {product.id} | ₱{product.price.toLocaleString()}
                        </p>
                      </div>
                      <Plus className="w-4 h-4 text-primary" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Manual Entry Button */}
          <button
            onClick={() => {
              if (barcode.trim()) {
                handleKeyPress({ key: 'Enter', preventDefault: () => {} });
              }
            }}
            className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Add Product
          </button>

          <p className="mt-3 text-xs text-gray-500 text-center">
            Tip: Use a barcode scanner to scan products quickly
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;