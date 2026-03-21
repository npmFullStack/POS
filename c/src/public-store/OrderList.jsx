// public-store/OrderList.jsx
import React, { useState } from "react";
import { Trash2, Minus, Plus, Search, X } from "lucide-react";

const OrderList = ({ orders, onUpdateQuantity, onRemoveItem }) => {
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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col" style={{ height: "calc(100vh - 180px)" }}>
      {/* Header with Title and Search - Fixed */}
      <div className="flex-shrink-0 p-3 border-b border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-900">Current Order</h2>
          <span className="text-xs text-gray-500">{orders.length} item(s)</span>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search in order..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Order Items - Takes remaining space */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              {searchTerm ? "No items match your search" : "No items in cart"}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {searchTerm ? "Clear search to see all items" : "Scan or search products to add"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((item) => (
              <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors">
                <div className="flex gap-2">
                  {/* Compact Product Image */}
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/40?text=Product";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-[10px]">No img</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          #{item.id}
                          {item.barcode && ` | ${item.barcode}`}
                        </p>
                        <p className="text-primary font-semibold text-xs mt-0.5">
                          ₱{item.price.toLocaleString()}
                        </p>
                      </div>
                      
                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="text-sm text-gray-700 w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Checkout Section - Always Visible */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="p-4 space-y-2">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">
              ₱{calculateTotal().toLocaleString()}
            </span>
          </div>
          
          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary">
              ₱{calculateTotal().toLocaleString()}
            </span>
          </div>
          
          {/* Checkout Button */}
          <button 
            disabled={orders.length === 0}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
              orders.length > 0
                ? "bg-primary text-white hover:bg-primary/90 active:scale-98 cursor-pointer shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Checkout (₱{calculateTotal().toLocaleString()})
          </button>
          
          {/* Quick Actions */}
          {orders.length > 0 && (
            <div className="flex gap-2 pt-1">
              <button className="flex-1 text-xs text-gray-500 hover:text-gray-700 py-1 border border-gray-200 rounded-lg transition-colors">
                Clear All
              </button>
              <button className="flex-1 text-xs text-gray-500 hover:text-gray-700 py-1 border border-gray-200 rounded-lg transition-colors">
                Discount
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;