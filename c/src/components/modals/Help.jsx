// components/modals/Help.jsx
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import ModalPortal from '@/components/ModalPortal';
import Button from '@/components/Button';

// Import images (you'll need to add these images to your assets/images folder)
import addStockImg from '@/assets/images/addStock.png';
import importProductImg from '@/assets/images/importProduct.png';
import newCategoryImg from '@/assets/images/newCategory.png';
import newProductImg from '@/assets/images/newProduct.png';
import instructionsImg from '@/assets/images/instructions.png';

const Help = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "How to Use the System",
      description: "Step-by-step guide to navigate and use the inventory management system effectively.",
      image: instructionsImg,
      alt: "Instructions"
    },
    {
      id: 2,
      title: "Add Stock",
      description: "Learn how to add stock to your products. Simply click the 'Add Stock' button and enter the quantity.",
      image: addStockImg,
      alt: "Add Stock"
    },
    {
      id: 3,
      title: "Import Products",
      description: "Import products in bulk using Excel or CSV files. Click 'Import' and select your file to get started.",
      image: importProductImg,
      alt: "Import Products"
    },
    {
      id: 4,
      title: "Create New Category",
      description: "Organize your products by creating categories. This helps in filtering and managing products better.",
      image: newCategoryImg,
      alt: "New Category"
    },
    {
      id: 5,
      title: "Add New Product",
      description: "Add individual products with details like name, SKU, price, cost, and stock information.",
      image: newProductImg,
      alt: "New Product"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-gray-900">Help & Tutorials</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Carousel Container */}
            <div className="relative">
              {/* Image Container */}
              <div className="bg-gray-50 rounded-xl overflow-hidden mb-6">
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].alt}
                  className="w-full h-80 object-contain"
                />
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-gray-600">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevSlide}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                
                {/* Slide Indicators */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        currentSlide === index 
                          ? 'w-8 bg-primary' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Slide Counter */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  {currentSlide + 1} of {slides.length}
                </p>
              </div>
            </div>

            {/* Close Button at Bottom */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={onClose}
                variant="primary"
                className="px-8"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Help;