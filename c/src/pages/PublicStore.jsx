// pages/PublicStore.jsx
import React, { useState } from "react";
import { Search, Package, ShoppingCart, Minus, Plus, X } from "lucide-react";

const PublicStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Sample products
  const products = [
    { id: 1, name: "Product 1", price: 299, stock: 15, sku: "PRD001" },
    { id: 2, name: "Product 2", price: 449, stock: 8, sku: "PRD002" },
    { id: 3, name: "Product 3", price: 599, stock: 3, sku: "PRD003" },
    { id: 4, name: "Product 4", price: 179, stock: 25, sku: "PRD004" },
    { id: 5, name: "Product 5", price: 899, stock: 12, sku: "PRD005" },
    { id: 6, name: "Product 6", price: 349, stock: 6, sku: "PRD006" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="text-white p-4 sticky top-0 z-10"
        style={{ backgroundColor: "#FF0800" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold" style={{ color: "#FFBF00" }}>
            Public Store
          </h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-6 h-6" style={{ color: "#FFBF00" }} />
            {cart.length > 0 && (
              <span
                className="absolute -top-1 -right-1 bg-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                style={{ color: "#FF0800" }}
              >
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF0800] focus:border-transparent"
            />
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={() => setShowCart(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button onClick={() => setShowCart(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div
                className="p-4 flex-1 overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 200px)" }}
              >
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">₱{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-xl">₱{total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: "#FF0800" }}
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: "#FF0800" }}
              >
                <Package className="w-6 h-6" style={{ color: "#FFBF00" }} />
              </div>

              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold">₱{product.price}</span>
                <span
                  className={`text-sm ${product.stock < 5 ? "text-red-600" : "text-gray-600"}`}
                >
                  Stock: {product.stock}
                </span>
              </div>

              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className="w-full py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#FF0800" }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicStore;
