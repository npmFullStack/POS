// pages/ImportProduct.jsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  X,
  Eye,
  Settings,
  Package,
  Barcode,
  Tag,
  DollarSign,
  Box,
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import Button from "@/components/Button";
import Help from "@/components/modals/Help";
import Select from "@/components/Select";
import PesoSign from "@/assets/icons/PesoSign";
import instructionsImg from "@/assets/images/instructions.png";

const ImportProduct = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("upload"); // upload, mapping, preview
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [previewData, setPreviewData] = useState([]);
  const [columnMapping, setColumnMapping] = useState({});
  const [defaultValues, setDefaultValues] = useState({
    category: "",
    unit: "piece",
    lowStockThreshold: 10,
    status: "active",
  });
  const [showDefaultSettings, setShowDefaultSettings] = useState(false);
  const [importProgress, setImportProgress] = useState(null);
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [availableFields, setAvailableFields] = useState([]);

  // Unit options for Select component
  const unitOptions = [
    { value: "piece", label: "Piece" },
    { value: "box", label: "Box" },
    { value: "pack", label: "Pack" },
    { value: "bottle", label: "Bottle" },
    { value: "kg", label: "Kilogram" },
    { value: "gram", label: "Gram" },
  ];

  // All possible product fields
  const allProductFields = [
    { key: "name", label: "Product Name", icon: Package, required: true },
    { key: "sku", label: "SKU", icon: Tag, required: true },
    { key: "price", label: "Selling Price", icon: PesoSign, required: true },
    { key: "cost", label: "Cost Price", icon: PesoSign, required: false },
    { key: "stock", label: "Initial Stock", icon: Box, required: true },
    { key: "barcode", label: "Barcode", icon: Barcode, required: false },
    { key: "category", label: "Category", icon: Tag, required: false },
    { key: "unit", label: "Unit", icon: Package, required: false },
    {
      key: "lowStockThreshold",
      label: "Low Stock Threshold",
      icon: AlertTriangle,
      required: false,
    },
    { key: "image", label: "Image URL", icon: ImageIcon, required: false },
  ];

  const helpSlides = [
    {
      id: 1,
      title: "Import Products Guide",
      description:
        "Learn how to bulk import products using Excel or CSV files. Map your columns correctly to ensure data is imported accurately.",
      image: instructionsImg,
      alt: "Import Instructions",
      isImage: true,
    },
    {
      id: 2,
      title: "Smart Column Detection",
      description:
        "We automatically detect which columns from your file match product fields. Only matching columns will appear for selection.",
      icon: CheckCircle,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 3,
      title: "Select What to Import",
      description:
        "Simply check the boxes for columns you want to import. Unchecked columns will be ignored. This gives you full control over what data gets imported.",
      icon: Settings,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 4,
      title: "Data Validation",
      description:
        "Ensure prices and stock numbers are numeric values. Categories will be created automatically if they don't exist in your inventory.",
      icon: AlertCircle,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
    {
      id: 5,
      title: "Overwrite Existing Products",
      description:
        "Enable the 'Overwrite existing products' option to update products with the same SKU. Otherwise, new products will be created.",
      icon: RefreshCw,
      iconColor: "text-white",
      bgColor: "bg-primary",
    },
  ];

  // Function to find matching fields based on Excel headers
  const findMatchingFields = (excelHeaders) => {
    const matched = [];

    excelHeaders.forEach((header) => {
      const headerLower = String(header).toLowerCase().trim();

      // Try to match Excel header to product fields
      const matchedField = allProductFields.find((field) => {
        const fieldLower = field.label.toLowerCase();
        // Check for exact match or common variations
        return (
          headerLower === fieldLower ||
          headerLower === field.key ||
          headerLower === field.label.toLowerCase().replace(/\s/g, "") ||
          (field.key === "name" &&
            (headerLower === "product" || headerLower === "productname")) ||
          (field.key === "sku" &&
            (headerLower === "code" || headerLower === "productcode")) ||
          (field.key === "price" &&
            (headerLower === "sellingprice" || headerLower === "unitprice")) ||
          (field.key === "cost" && headerLower === "costprice") ||
          (field.key === "stock" &&
            (headerLower === "quantity" || headerLower === "qty"))
        );
      });

      if (matchedField) {
        matched.push({
          ...matchedField,
          excelColumn: header,
          columnIndex: excelHeaders.indexOf(header),
        });
      }
    });

    return matched;
  };

  const handleFileUpload = useCallback((uploadedFile) => {
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      if (jsonData.length > 0) {
        const headersRow = jsonData[0];
        const dataRows = jsonData.slice(1, 6); // Get first 5 rows for preview

        setHeaders(headersRow);
        setPreviewData(dataRows);
        setFileData(jsonData);

        // Find matching fields based on Excel headers
        const matchedFields = findMatchingFields(headersRow);
        setAvailableFields(matchedFields);

        // Auto-map fields by default (check all by default)
        const autoMapping = {};
        matchedFields.forEach((field) => {
          autoMapping[field.key] = field.columnIndex;
        });
        setColumnMapping(autoMapping);

        setStep("mapping");
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  }, []);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  };

  const toggleColumnMapping = (fieldKey) => {
    setColumnMapping((prev) => {
      const newMapping = { ...prev };
      if (newMapping[fieldKey] !== undefined) {
        // If already mapped, remove it
        delete newMapping[fieldKey];
      } else {
        // Find the field and map it
        const field = availableFields.find((f) => f.key === fieldKey);
        if (field) {
          newMapping[fieldKey] = field.columnIndex;
        }
      }
      return newMapping;
    });
  };

  const handleDefaultValueChange = (field, value) => {
    setDefaultValues((prev) => ({ ...prev, [field]: value }));
  };

  const validateMapping = () => {
    const requiredMapped = availableFields
      .filter((f) => f.required)
      .every((f) => columnMapping[f.key] !== undefined);

    if (!requiredMapped) {
      alert(
        "Please check all required fields that exist in your file (Product Name, SKU, Selling Price, and Initial Stock if they are present in your Excel file)",
      );
      return false;
    }
    return true;
  };

  const handleProcessImport = () => {
    if (!validateMapping()) return;

    setStep("preview");
    // Process preview data
    const processedData = fileData.slice(1, 11).map((row) => {
      const product = {};
      availableFields.forEach((field) => {
        const columnIndex = columnMapping[field.key];
        if (columnIndex !== undefined && row[columnIndex]) {
          let value = row[columnIndex];
          // Handle numeric fields
          if (
            ["price", "cost", "stock", "lowStockThreshold"].includes(field.key)
          ) {
            value = parseFloat(value) || 0;
          }
          product[field.key] = value;
        } else if (defaultValues[field.key] !== undefined) {
          product[field.key] = defaultValues[field.key];
        }
      });
      return product;
    });
    setPreviewData(processedData);
  };

  const handleConfirmImport = () => {
    // Process all rows
    const allProducts = fileData.slice(1).map((row) => {
      const product = {};
      availableFields.forEach((field) => {
        const columnIndex = columnMapping[field.key];
        if (columnIndex !== undefined && row[columnIndex]) {
          let value = row[columnIndex];
          if (
            ["price", "cost", "stock", "lowStockThreshold"].includes(field.key)
          ) {
            value = parseFloat(value) || 0;
          }
          product[field.key] = value;
        } else if (defaultValues[field.key] !== undefined) {
          product[field.key] = defaultValues[field.key];
        }
      });

      // Add additional required fields
      product.id = Date.now() + Math.random();
      product.status = defaultValues.status || "active";
      product.createdAt = new Date().toISOString().split("T")[0];
      product.image = null;

      return product;
    });

    // Simulate import progress
    setImportProgress({ current: 0, total: allProducts.length });

    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(allProducts.length / 10);
      if (current >= allProducts.length) {
        clearInterval(interval);
        setImportProgress({
          current: allProducts.length,
          total: allProducts.length,
        });
        setTimeout(() => {
          // Here you would save to your state/API
          console.log("Imported products:", allProducts, { overwriteExisting });
          navigate("/inventory");
        }, 500);
      } else {
        setImportProgress({ current, total: allProducts.length });
      }
    }, 100);
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      allProductFields.map((f) => f.label),
      [
        "Lays Classic",
        "SNK-001",
        "89.00",
        "65.00",
        "50",
        "4800012345678",
        "Junk Food",
        "piece",
        "10",
        "https://example.com/image.jpg",
      ],
      [
        "Pringles Original",
        "SNK-002",
        "149.00",
        "110.00",
        "35",
        "4800012345679",
        "Junk Food",
        "piece",
        "10",
        "",
      ],
      [
        "Coke 1.5L",
        "BEV-001",
        "85.00",
        "60.00",
        "60",
        "4800012345682",
        "Beverages",
        "bottle",
        "15",
        "",
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "product_import_template.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* Header Section - Matching Inventory page style */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/inventory")}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to Inventory"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Import Products</h1>
          <button
            onClick={() => setShowHelpModal(true)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5 text-gray-500 hover:text-primary transition-colors" />
          </button>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon={<Download className="w-5 h-5" />}
            onClick={handleDownloadTemplate}
          >
            Download Template
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between max-w-md">
          {["upload", "mapping", "preview"].map((s, idx) => (
            <React.Fragment key={s}>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s
                      ? "bg-primary text-white"
                      : (step === "mapping" && s === "upload") ||
                          (step === "preview" &&
                            (s === "upload" || s === "mapping"))
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {(step === "mapping" && s === "upload") ||
                  (step === "preview" &&
                    (s === "upload" || s === "mapping")) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step === s ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {s === "upload"
                    ? "Upload File"
                    : s === "mapping"
                      ? "Select Columns"
                      : "Preview & Import"}
                </span>
              </div>
              {idx < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Import Progress */}
      {importProgress && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">
              Importing products...
            </span>
            <span className="text-sm text-green-600">
              {importProgress.current} / {importProgress.total}
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{
                width: `${(importProgress.current / importProgress.total) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      {step === "upload" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area - Left */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <input
                id="file-upload"
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Excel (.xlsx, .xls) or CSV files
              </p>
              <Button variant="primary" size="sm">
                Select File
              </Button>
              <p className="text-xs text-gray-400 mt-4">
                Maximum file size: 10MB
              </p>
            </div>
          </div>

          {/* Instructions - Right */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">
                Import Instructions
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">
                  How it works:
                </h4>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Upload your Excel or CSV file</span>
                  </li>
                  <li className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>We'll detect matching columns automatically</span>
                  </li>
                  <li className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Check/uncheck columns you want to import</span>
                  </li>
                  <li className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Only checked columns will be imported</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                  <div className="text-xs text-red-700">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Only checked columns will be imported</li>
                      <li>Unchecked columns will be ignored</li>
                      <li>Make sure numeric fields contain valid numbers</li>
                      <li>Required fields must be present in your file</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Column Mapping Step - Only show fields that match Excel columns */}
      {step === "mapping" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column Mapping - Left */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Select Columns to Import
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Check the boxes for columns you want to import from your file
              </p>
              {availableFields.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  No matching columns found in your file. Please check your file
                  headers.
                </p>
              )}
            </div>

            <div className="p-5 max-h-[600px] overflow-y-auto">
              <div className="space-y-3">
                {availableFields.map((field) => {
                  const Icon = field.icon;
                  const isChecked = columnMapping[field.key] !== undefined;
                  return (
                    <div
                      key={field.key}
                      className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleColumnMapping(field.key)}
                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-medium text-gray-800 text-sm">
                                {field.label}
                              </span>
                              {field.required && (
                                <span className="text-red-500 text-xs">*</span>
                              )}
                              <span className="text-xs text-gray-400">
                                Excel: "{String(field.excelColumn)}"
                              </span>
                            </div>
                          </div>
                          {isChecked && (
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Default Values and Options - Right */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Set Default Values
                  </h3>
                </div>
                <button
                  onClick={() => setShowDefaultSettings(!showDefaultSettings)}
                  className="text-sm text-primary hover:underline"
                >
                  {showDefaultSettings ? "Hide" : "Show"}
                </button>
              </div>

              {showDefaultSettings && (
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Category
                    </label>
                    <input
                      type="text"
                      value={defaultValues.category}
                      onChange={(e) =>
                        handleDefaultValueChange("category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="e.g., General"
                    />
                  </div>
                  <div>
                    <Select
                      label="Default Unit"
                      options={unitOptions}
                      value={defaultValues.unit}
                      onChange={(value) =>
                        handleDefaultValueChange("unit", value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Low Stock Threshold
                    </label>
                    <input
                      type="number"
                      value={defaultValues.lowStockThreshold}
                      onChange={(e) =>
                        handleDefaultValueChange(
                          "lowStockThreshold",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Overwrite Option */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={overwriteExisting}
                  onChange={(e) => setOverwriteExisting(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary" />
                    <span className="font-medium text-gray-800">
                      Overwrite existing products
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    If a product with the same SKU already exists, it will be
                    updated with the new data
                  </p>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setStep("upload")}>
                Back
              </Button>
              <Button variant="primary" onClick={handleProcessImport}>
                Continue to Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Step */}
      {step === "preview" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Preview Import Data
                </h3>
                <p className="text-sm text-gray-500">
                  Review the first 10 products that will be imported
                  {overwriteExisting &&
                    " (existing products will be overwritten)"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{previewData.length} products shown</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    {availableFields
                      .filter((f) => columnMapping[f.key] !== undefined)
                      .map((field) => (
                        <th
                          key={field.key}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {field.label}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {previewData.map((product, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {idx + 1}
                      </td>
                      {availableFields
                        .filter((f) => columnMapping[f.key] !== undefined)
                        .map((field) => (
                          <td
                            key={field.key}
                            className="px-4 py-3 text-sm text-gray-600"
                          >
                            {field.key === "price" || field.key === "cost"
                              ? `₱${product[field.key] || 0}`
                              : product[field.key] || "-"}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep("mapping")}>
              Back to Selection
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/inventory")}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmImport}>
                Confirm & Import
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      <Help
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        slides={helpSlides}
        title="Import Products Help"
        icon={HelpCircle}
        buttonText="Got it"
      />
    </div>
  );
};

export default ImportProduct;
