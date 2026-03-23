// components/modals/ImportProduct.jsx
import React, { useRef } from 'react';
import { X, Upload, Download, FileSpreadsheet, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import ModalPortal from '@/components/ModalPortal';

const ImportProduct = ({ isOpen, onClose, onImport }) => {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImport?.(file);
      onClose();
    }
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      ['Name', 'SKU', 'Barcode', 'Category', 'Price', 'Cost', 'Stock', 'Low Stock Threshold', 'Unit'],
      ['Sample Product', 'SMP-001', '4800012345678', 'Junk Food', '89.00', '65.00', '50', '10', 'piece']
    ];
    
    const csvContent = templateData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Import Products</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">Excel (.xlsx, .xls) or CSV files</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4"
              >
                Select File
              </Button>
            </div>

            {/* Template Download */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Download className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sample Template</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Required columns: Name, SKU, Category, Price, Stock
              </p>
              <button 
                onClick={handleDownloadTemplate}
                className="text-xs text-primary hover:underline font-medium"
              >
                Download template file
              </button>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                Make sure your file follows the template format. Maximum file size: 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ImportProduct;