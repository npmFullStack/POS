// pages/Inventory.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Package,
  Plus,
  Upload,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  AlertCircle,
  Grid,
  List,
  ChevronDown,
  Layers,
  HelpCircle,
} from "lucide-react";
import Button from "@/components/Button";
import Select from "@/components/Select";
import StatCard from "@/components/StatCard";
import AddStock from "@/components/modals/AddStock";
import NewCategory from "@/components/modals/NewCategory";
import NewProduct from "@/components/modals/NewProduct";
import ImportProduct from "@/components/modals/ImportProduct";
import Help from "@/components/modals/Help";

// Import images locally
import instructionsImg from "@/assets/images/instructions.png";
import addStockImg from "@/assets/images/newProduct.png";
import importProductImg from "@/assets/images/importProduct.png";
import newCategoryImg from "@/assets/images/newCategory.png";
import newProductImg from "@/assets/images/newProduct.png";
import PesoSign from "@/assets/icons/PesoSign.svg";

const Inventory = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedProductForStock, setSelectedProductForStock] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sample Products Data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Lays Classic",
      sku: "SNK-001",
      barcode: "4800012345678",
      category: "Junk Food",
      price: 89.0,
      cost: 65.0,
      stock: 50,
      lowStockThreshold: 10,
      unit: "piece",
      image: null,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Pringles Original",
      sku: "SNK-002",
      barcode: "4800012345679",
      category: "Junk Food",
      price: 149.0,
      cost: 110.0,
      stock: 35,
      lowStockThreshold: 10,
      unit: "piece",
      image: null,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "Cheetos Crunchy",
      sku: "SNK-003",
      barcode: "4800012345680",
      category: "Junk Food",
      price: 79.0,
      cost: 55.0,
      stock: 45,
      lowStockThreshold: 10,
      unit: "piece",
      image: null,
      status: "active",
      createdAt: "2024-01-20",
    },
    {
      id: 4,
      name: "Coke 1.5L",
      sku: "BEV-001",
      barcode: "4800012345682",
      category: "Beverages",
      price: 85.0,
      cost: 60.0,
      stock: 60,
      lowStockThreshold: 15,
      unit: "bottle",
      image: null,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 5,
      name: "Sprite 1.5L",
      sku: "BEV-002",
      barcode: "4800012345683",
      category: "Beverages",
      price: 85.0,
      cost: 60.0,
      stock: 55,
      lowStockThreshold: 15,
      unit: "bottle",
      image: null,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 6,
      name: "RC Cola 1.5L",
      sku: "BEV-003",
      barcode: "4800012345686",
      category: "Beverages",
      price: 80.0,
      cost: 55.0,
      stock: 8,
      lowStockThreshold: 15,
      unit: "bottle",
      image: null,
      status: "active",
      createdAt: "2024-02-01",
    },
    {
      id: 7,
      name: "Piattos Cheese",
      sku: "SNK-004",
      barcode: "4800012345684",
      category: "Junk Food",
      price: 69.0,
      cost: 48.0,
      stock: 3,
      lowStockThreshold: 10,
      unit: "piece",
      image: null,
      status: "active",
      createdAt: "2024-02-10",
    },
  ]);

  // Categories Data
  const [categories, setCategories] = useState([
    { id: 1, name: "Junk Food", productCount: 4, status: "active" },
    { id: 2, name: "Beverages", productCount: 3, status: "active" },
    { id: 3, name: "Canned Goods", productCount: 0, status: "active" },
    { id: 4, name: "Instant Noodles", productCount: 0, status: "active" },
  ]);

  const categoriesList = ["all", ...categories.map((c) => c.name)];

  const categoryOptions = categoriesList.map((cat) => ({
    value: cat,
    label: cat === "all" ? "All Categories" : cat,
  }));

  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: products.length,
      change: "+12% vs last month",
      changeType: "increase",
      icon: Package,
      capacity: 100,
    },
    {
      id: 2,
      title: "Low Stock Items",
      value: products.filter((p) => p.stock <= p.lowStockThreshold).length,
      change: "Needs attention",
      changeType: "warning",
      icon: AlertCircle,
      alert: true,
      totalStock: products.length,
    },
    {
      id: 3,
      title: "Categories",
      value: categories.filter((c) => c.status === "active").length,
      change: "+2 new",
      changeType: "increase",
      icon: Layers,
    },
    {
      id: 4,
      title: "Total Value",
      value: `₱${products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()}`,
      change: "Current valuation",
      changeType: "neutral",
      icon: () => <img src={PesoSign} alt="Peso" className="w-4 h-4" />,
    },
  ];

  const helpSlides = [
    {
      id: 1,
      title: "Welcome to Inventory Management",
      description:
        "Learn how to efficiently manage your products, track stock levels, and optimize your inventory with our comprehensive system.",
      image: instructionsImg,
      alt: "Instructions",
    },
    {
      id: 2,
      title: "Adding Stock Made Easy",
      description:
        "Quickly add stock to any product with our intuitive interface. Simply click 'Add Stock' and enter the quantity to update inventory instantly.",
      image: addStockImg,
      alt: "Add Stock",
    },
    {
      id: 3,
      title: "Bulk Import Products",
      description:
        "Save time by importing multiple products at once using Excel or CSV files. Our system will automatically validate and add your products.",
      image: importProductImg,
      alt: "Import Products",
    },
    {
      id: 4,
      title: "Organize with Categories",
      description:
        "Create custom categories to better organize your products. Filter, sort, and manage products more efficiently with proper categorization.",
      image: newCategoryImg,
      alt: "New Category",
    },
    {
      id: 5,
      title: "Add New Products",
      description:
        "Add individual products with detailed information including name, SKU, pricing, and stock levels. Set low stock thresholds for alerts.",
      image: newProductImg,
      alt: "New Product",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleImportFile = (file) => {
    console.log("Importing file:", file);
    alert(
      `Importing ${file.name}... This would parse the Excel file and add products.`,
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedProducts.length} products?`)) {
      setProducts(products.filter((p) => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const handleEditProduct = (product) => {
    console.log("Edit product:", product);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
    setOpenDropdownId(null);
  };

  const handleAddStock = (product) => {
    setSelectedProductForStock(product);
    setShowAddStockModal(true);
    setOpenDropdownId(null);
  };

  const handleAddStockSubmit = (stockData) => {
    setProducts(
      products.map((product) => {
        if (product.id === stockData.productId) {
          return {
            ...product,
            stock: product.stock + stockData.quantity,
          };
        }
        return product;
      }),
    );
    console.log("Stock added:", stockData);
  };

  const handleCreateProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleCreateCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section - Help button beside page title with no borders and transparent bg */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 text-gray-500 hover:text-primary transition-colors" />
          </button>
        </div>
        <div className="flex gap-3">
          {/* New Dropdown Button */}
          <div className="relative">
            <Button
              variant="primary"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => setShowNewDropdown(!showNewDropdown)}
            >
              New
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            {showNewDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 border border-gray-100 z-20">
                <button
                  onClick={() => {
                    setShowProductModal(true);
                    setShowNewDropdown(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Product
                </button>
                <button
                  onClick={() => {
                    setShowCategoryModal(true);
                    setShowNewDropdown(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  Category
                </button>
              </div>
            )}
          </div>
          <Button
            variant="outline"
            icon={<Upload className="w-5 h-5" />}
            onClick={() => setShowImportModal(true)}
          >
            Import
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="p-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, SKU, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            className="w-48"
          />
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "primary" : "secondary"}
              size="sm"
              icon={<Grid className="w-4 h-4" />}
              onClick={() => setViewMode("grid")}
            />
            <Button
              variant={viewMode === "list" ? "primary" : "secondary"}
              size="sm"
              icon={<List className="w-4 h-4" />}
              onClick={() => setViewMode("list")}
            />
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="bg-primary/10 rounded-xl p-3 flex items-center justify-between">
          <span className="text-sm font-medium text-primary">
            {selectedProducts.length} product(s) selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export Selected
            </Button>
            <Button variant="danger" size="sm" onClick={handleBulkDelete}>
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Products Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Package className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                {product.stock <= product.lowStockThreshold && (
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Low Stock
                  </span>
                )}
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                  className="absolute top-2 left-2 w-4 h-4 rounded border-gray-300 focus:ring-primary"
                />

                {/* Dropdown Menu */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdownId(
                        openDropdownId === product.id ? null : product.id,
                      );
                    }}
                    className="bg-white rounded-lg p-1.5 shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                  {openDropdownId === product.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                    >
                      <button
                        onClick={() => handleAddStock(product)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-600" />
                        Add Stock
                      </button>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2 whitespace-nowrap max-w-[100px] truncate">
                    {product.category}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Cost Price:</span>
                    <span className="text-gray-600">₱{product.cost}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Selling Price:</span>
                    <span className="text-xl font-bold text-primary">
                      ₱{product.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Profit:</span>
                    <span className="text-emerald-600 font-medium">
                      ₱{(product.price - product.cost).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-600">
                      Stock:{" "}
                      <span
                        className={`font-medium ${product.stock <= product.lowStockThreshold ? "text-red-600" : "text-gray-900"}`}
                      >
                        {product.stock}
                      </span>{" "}
                      {product.unit}s
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddStock(product)}
                    className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add Stock
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === filteredProducts.length &&
                        filteredProducts.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU/Barcode
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profit
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.barcode}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-600">{product.sku}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded max-w-[120px] truncate inline-block">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      ₱{product.cost}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary">
                      ₱{product.price}
                    </td>
                    <td className="px-4 py-3 text-right text-emerald-600">
                      ₱{(product.price - product.cost).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`${product.stock <= product.lowStockThreshold ? "text-red-600 font-medium" : "text-gray-600"}`}
                      >
                        {product.stock} {product.unit}s
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="relative flex justify-center gap-2">
                        <button
                          onClick={() => handleAddStock(product)}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg transition-colors group"
                          title="Add Stock"
                        >
                          <Plus className="w-4 h-4 text-gray-500 group-hover:text-emerald-600" />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenDropdownId(
                                openDropdownId === product.id
                                  ? null
                                  : product.id,
                              )
                            }
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          {openDropdownId === product.id && (
                            <div
                              ref={dropdownRef}
                              className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                            >
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="w-full px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="w-full px-3 py-1.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No products found</p>
          <Button
            variant="primary"
            onClick={() => setShowProductModal(true)}
            className="mt-4"
          >
            Add your first product
          </Button>
        </div>
      )}

      {/* Modals */}
      <NewProduct
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        categories={categories}
        onCreateProduct={handleCreateProduct}
      />
      <NewCategory
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCreateCategory={handleCreateCategory}
      />
      <AddStock
        isOpen={showAddStockModal}
        onClose={() => setShowAddStockModal(false)}
        product={selectedProductForStock}
        onAddStock={handleAddStockSubmit}
      />
      <ImportProduct
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportFile}
      />
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={helpSlides}
        title="Inventory Help & Tutorials"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default Inventory;
