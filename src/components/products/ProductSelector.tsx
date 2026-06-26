"use client";

import React, { useState, useMemo } from "react";
import { Variant, OimlClass } from "./ParameterTable";
import { cn } from "@/lib/utils";

interface ProductSelectorProps {
  variants: Variant[];
  onVariantChange: (variant: Variant) => void;
  className?: string;
}

/**
 * ProductSelector Component
 * Allows users to select product variants by Nominal Mass and OIML Class.
 * Style: Industrial Minimalist (Grid, 0.5px-style borders, Monochrome)
 */
export default function ProductSelector({ 
  variants, 
  onVariantChange,
  className 
}: ProductSelectorProps) {
  // Extract unique mass values and OIML classes from variants
  const masses = useMemo(() => {
    const uniqueMasses = Array.from(new Set(variants.map(v => `${v.weightValue}${v.weightUnit}`)));
    return uniqueMasses.sort((a, b) => {
      const valA = parseFloat(a);
      const valB = parseFloat(b);
      // Basic sort by numeric value
      return valA - valB;
    });
  }, [variants]);

  const classes = useMemo(() => {
    const uniqueClasses = Array.from(new Set(variants.map(v => v.oimlClass))) as OimlClass[];
    const order: OimlClass[] = ["E1", "E2", "F1", "F2", "M1", "M2", "M3"];
    return uniqueClasses.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [variants]);

  const [selectedMass, setSelectedMass] = useState(masses[0]);
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  // Find the variant that matches selected mass and class
  const currentVariant = useMemo(() => {
    const variant = variants.find(v => 
      `${v.weightValue}${v.weightUnit}` === selectedMass && 
      v.oimlClass === selectedClass
    );
    return variant || variants[0];
  }, [selectedMass, selectedClass, variants]);

  // Notify parent when variant changes
  React.useEffect(() => {
    onVariantChange(currentVariant);
  }, [currentVariant, onVariantChange]);

  // Check if a specific class is available for the current mass
  const isClassAvailable = (cls: OimlClass) => {
    return variants.some(v => `${v.weightValue}${v.weightUnit}` === selectedMass && v.oimlClass === cls);
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Mass Selection */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-industrial-900">
            01_Nominal_Mass
          </span>
          <div className="h-[1px] flex-grow bg-industrial-200"></div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {masses.map((mass) => (
            <button
              key={mass}
              onClick={() => setSelectedMass(mass)}
              className={cn(
                "px-3 py-2 text-xs font-mono border transition-all duration-200",
                selectedMass === mass
                  ? "bg-industrial-900 text-white border-industrial-900 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
                  : "bg-white text-industrial-600 border-industrial-200 hover:border-industrial-900"
              )}
            >
              {mass}
            </button>
          ))}
        </div>
      </div>

      {/* Class Selection */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-industrial-900">
            02_OIML_Class
          </span>
          <div className="h-[1px] flex-grow bg-industrial-200"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {classes.map((cls) => {
            const available = isClassAvailable(cls);
            return (
              <button
                key={cls}
                disabled={!available}
                onClick={() => setSelectedClass(cls)}
                className={cn(
                  "px-4 py-2 text-sm font-bold border transition-all duration-200 min-w-[60px]",
                  !available && "opacity-20 cursor-not-allowed grayscale",
                  available && selectedClass === cls
                    ? "bg-industrial-900 text-white border-industrial-900"
                    : available && "bg-white text-industrial-900 border-industrial-200 hover:border-industrial-900"
                )}
              >
                {cls}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[10px] text-industrial-400 italic">
          * Availability varies by weight value and material.
        </p>
      </div>
    </div>
  );
}
