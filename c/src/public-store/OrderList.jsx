// public-store/OrderList.jsx
import React, { useState } from "react";
import { Trash2, Minus, Plus, Search, X, ShoppingBag } from "lucide-react";

const OrderList = ({ orders, onUpdateQuantity, onRemoveItem, isMobile = false }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const calculateTotal = () => {
    return orders.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Filter orders based on search term
  const filteredOrders = orders.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.id && item.id.toString().includes(searchTerm)) ||
    (item.barcode && item.barcode.includes(searchTerm))
  );

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${!isMobile && 'h-full'}`} style={!isMobile ? { height: "calc(100vh - 180px)" } : {}}>
      {/* Header with Title and Search */}
      <div className="flex-shrink-0 p-3 sm:p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Current Order</h2>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
              {orders.length} item(s)
            </span>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search in order..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Order Items */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">
              {searchTerm ? "No items match your search" : "No items in cart"}
            </p>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
              {searchTerm ? "Clear search to see all items" : "Scan or search products to add"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((item) => (
              <div key={item.id} className="p-2 sm:p-3 hover:bg-gray-50 transition-colors">
                {/* Flexible layout for mobile/desktop */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  {/* Product Info Row */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    {/* Product Image */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/48?text=Product";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Name and Price */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs sm:text-sm text-gray-600">
                          ₱{item.price}
                        </span>
                        <span className="text-xs text-gray-400">/each</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quantity Controls and Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 ml-12 sm:ml-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors touch-manipulation"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                      <span className="text-sm sm:text-base text-gray-700 w-6 sm:w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 sm:p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors touch-manipulation"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right min-w-[65px] sm:min-w-[80px]">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1.5 sm:p-2 touch-manipulation"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Checkout Section */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              ₱{calculateTotal().toLocaleString()}
            </span>
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-100">
            <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
            <span className="text-xl sm:text-2xl font-bold text-primary">
              ₱{calculateTotal().toLocaleString()}
            </span>
          </div>
          
          {/* Checkout Button */}
          <button 
            disabled={orders.length === 0}
            className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 ${
              orders.length > 0
                ? "bg-primary text-white hover:bg-primary/90 active:scale-[0.98] cursor-pointer shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Checkout ({calculateTotal().toLocaleString()})
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;