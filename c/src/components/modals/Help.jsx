// components/modals/Help.jsx
import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";
import Button from "@/components/Button";

const Help = ({
  isOpen,
  onClose,
  slides = [],
  title = "Help & Tutorials",
  icon: Icon = HelpCircle,
  buttonText = "Got it",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen || !slides.length) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Image/Icon Container */}
            <div className="overflow-hidden mb-4 flex justify-center">
              {current.isImage ? (
                <img
                  src={current.image}
                  alt={current.alt || current.title}
                  className="w-full h-44 object-contain"
                />
              ) : (
                <div
                  className={`w-24 h-24 rounded-full ${current.bgColor || "bg-primary"} flex items-center justify-center`}
                >
                  {current.icon && (
                    <current.icon
                      className={`w-12 h-12 ${current.iconColor || "text-white"}`}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {current.title}
              </h3>
              <p className="text-sm text-gray-600">{current.description}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevSlide}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Slide Indicators */}
              <div className="flex gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Slide Counter */}
            <div className="text-center mb-5">
              <p className="text-xs text-gray-400">
                {currentSlide + 1} of {slides.length}
              </p>
            </div>

            {/* Got it Button */}
            <Button
              onClick={onClose}
              variant="primary"
              className="w-full py-2.5"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Help;
