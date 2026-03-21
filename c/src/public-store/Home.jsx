// public-store/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Barcode, Package, X } from "lucide-react";
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
          // Optional: scroll to order list or highlight it
        }}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Left Column - Products Section */}
            <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
              {/* Search and Scan Bar */}
              <div className="flex-shrink-0 mb-4">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name or barcode..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setShowScanner(true)}
                    className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <Barcode className="w-5 h-5" />
                    <span className="hidden sm:inline">Scan</span>
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex-shrink-0 mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
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
                <div className="flex justify-between items-center mb-3 sticky top-0 bg-gray-50 py-2">
                  <h2 className="text-lg font-bold text-gray-900">Products</h2>
                  <span className="text-xs text-gray-500">
                    {filteredProducts.length} item(s)
                  </span>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No products found matching your search.</p>
                  </div>
                ) : (

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 pb-4">
  {filteredProducts.map(product => (
    <ProductCard
      key={product.id}
      product={product}
      onAddToCart={handleAddToCart}
      onScan={() => {
        setShowScanner(true);
      }}
    />
  ))}
</div>
                )}
              </div>
            </div>

            {/* Right Column - Order List (Always visible checkout) */}
            <div className="lg:col-span-1 h-full">
              <OrderList
                orders={orders}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>
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
    </div>
  );
};

export default Home;