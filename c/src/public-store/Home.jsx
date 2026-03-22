// public-store/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Barcode, Package, X, ShoppingCart } from "lucide-react";
import Header from "@/public-store/Header";
import ProductCard from "@/public-store/ProductCard";
import OrderList from "@/public-store/OrderList";
import BarcodeScanner from "@/public-store/BarcodeScanner";

// Sample Products Data with barcodes and IDs
const initialProducts = [
  {
    id: 1,
    barcode: "4800012345678",
    name: "Lays Classic",
    price: 89,
    stock: 50,
    image: null,
    category: "Junk Food"
  },
  {
    id: 2,
    barcode: "4800012345679",
    name: "Pringles Original",
    price: 149,
    stock: 35,
    image: null,
    category: "Junk Food"
  },
  {
    id: 3,
    barcode: "4800012345680",
    name: "Cheetos Crunchy",
    price: 79,
    stock: 45,
    image: null,
    category: "Junk Food"
  },
  {
    id: 4,
    barcode: "4800012345681",
    name: "Doritos Nacho Cheese",
    price: 99,
    stock: 40,
    image: null,
    category: "Junk Food"
  },
  {
    id: 5,
    barcode: "4800012345682",
    name: "Coke 1.5L",
    price: 85,
    stock: 60,
    image: null,
    category: "Beverages"
  },
  {
    id: 6,
    barcode: "4800012345683",
    name: "Sprite 1.5L",
    price: 85,
    stock: 55,
    image: null,
    category: "Beverages"
  },
  {
    id: 7,
    barcode: "4800012345684",
    name: "Piattos Cheese",
    price: 69,
    stock: 30,
    image: null,
    category: "Junk Food"
  },
  {
    id: 8,
    barcode: "4800012345685",
    name: "Nova Cheesy",
    price: 69,
    stock: 28,
    image: null,
    category: "Junk Food"
  },
  {
    id: 9,
    barcode: "4800012345686",
    name: "RC Cola 1.5L",
    price: 80,
    stock: 45,
    image: null,
    category: "Beverages"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMobileCart, setShowMobileCart] = useState(false);

  // Categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem("publicStoreAuth");
    if (!isAuth) {
      navigate("/public-store/login");
    }
  }, [navigate]);

  // Update cart count whenever orders change
  useEffect(() => {
    const totalItems = orders.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  }, [orders]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("publicStoreOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("publicStoreOrders", JSON.stringify(orders));
  }, [orders]);

  const handleAddToCart = (product, quantity) => {
    setOrders(prevOrders => {
      const existingItem = prevOrders.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevOrders.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevOrders, { ...product, quantity }];
      }
    });
    // Auto-hide cart drawer after adding on mobile (optional)
    if (window.innerWidth < 1024) {
      // Don't auto-close, let user decide
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setOrders(prevOrders =>
      prevOrders.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setOrders(prevOrders => prevOrders.filter(item => item.id !== productId));
  };

  const handleBarcodeScanned = (product, quantity) => {
    handleAddToCart(product, quantity);
    setShowScanner(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.barcode && product.barcode.includes(searchTerm));
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header 
        cartItemCount={cartCount} 
        onCartClick={() => {
          // On mobile, show cart drawer
          if (window.innerWidth < 1024) {
            setShowMobileCart(true);
          }
        }}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          {/* Desktop Layout - Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 h-full">
            {/* Left Column - Products Section */}
            <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
              {/* Search and Scan Bar */}
              <div className="flex-shrink-0 mb-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      placeholder="Search by name or barcode..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setShowScanner(true)}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
                  >
                    <Barcode className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Scan</span>
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex-shrink-0 mb-3 sm:mb-4">
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {category === "all" ? "All Items" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-2 sm:mb-3 sticky top-0 bg-gray-50 py-1 sm:py-2">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">Products</h2>
                  <span className="text-xs text-gray-500">
                    {filteredProducts.length} item(s)
                  </span>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-sm text-gray-500">No products found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 pb-4">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order List (Always visible checkout on desktop) */}
            <div className="lg:col-span-1 h-full">
              <OrderList
                orders={orders}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
          </div>

          {/* Mobile Layout - Products Only with Cart Button */}
          <div className="lg:hidden h-full flex flex-col">
            {/* Products Section - Full width on mobile */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search and Scan Bar */}
              <div className="flex-shrink-0 mb-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setShowScanner(true)}
                    className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 text-sm whitespace-nowrap"
                  >
                    <Barcode className="w-4 h-4" />
                    <span>Scan</span>
                  </button>
                </div>
              </div>

              {/* Category Filter - Horizontal Scroll */}
              <div className="flex-shrink-0 mb-3">
                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {category === "all" ? "All" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-2 sticky top-0 bg-gray-50 py-1">
                  <h2 className="text-sm font-bold text-gray-900">Products</h2>
                  <span className="text-xs text-gray-500">
                    {filteredProducts.length} items
                  </span>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <Package className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pb-4">
                    {filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Floating Cart Button - Mobile */}
            {orders.length > 0 && (
              <button
                onClick={() => setShowMobileCart(true)}
                className="lg:hidden fixed bottom-6 right-4 bg-primary text-white rounded-full shadow-lg p-3.5 z-40 animate-bounce-slow active:scale-95 transition-transform"
                aria-label="View cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
              </button>
            )}

            {/* Mobile Cart Drawer - Shows Order List */}
            {showMobileCart && (
              <>
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                  onClick={() => setShowMobileCart(false)}
                />
                <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 lg:hidden max-h-[85vh] flex flex-col animate-slide-up">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-900">Your Cart</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {orders.length} items
                      </span>
                    </div>
                    <button
                      onClick={() => setShowMobileCart(false)}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close cart"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <OrderList
                      orders={orders}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      isMobile={true}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          products={products}
          onProductFound={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;