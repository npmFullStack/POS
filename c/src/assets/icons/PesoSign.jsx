// components/icons/PesoSign.jsx
import React from "react";

const PesoSign = ({ className = "w-4 h-4", strokeWidth = 2 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Vertical stem */}
      <line x1="7" y1="4" x2="7" y2="20" />
      {/* P bowl */}
      <path d="M7 4 L12 4 Q17 4 17 8.5 Q17 13 12 13 L7 13" />
      {/* Two horizontal bars — wider spacing, equal overhang on both sides */}
      <line x1="5" y1="7" x2="18" y2="6.5" />
      <line x1="5" y1="10" x2="18" y2="10.5" />
    </svg>
  );
};

export default PesoSign;
