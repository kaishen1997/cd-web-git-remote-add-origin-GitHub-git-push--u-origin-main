"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Local types until Prisma client is generated
export type OimlClass = "E1" | "E2" | "F1" | "F2" | "M1" | "M2" | "M3";

export interface TechnicalSpec {
  maxPermissibleError?: number;
  magnetization?: number;
  susceptibility?: number;
  density?: number;
  surfaceRoughness?: number;
}

export interface Variant {
  id: string;
  weightValue: number;
  weightUnit: string;
  oimlClass: OimlClass;
  material: string;
  spec?: TechnicalSpec | null;
}

interface ParameterTableProps {
  selectedVariant: Variant;
  className?: string;
}

/**
 * ParameterTable Component
 * Implements Industrial Minimalism style: sharp borders, mono font, high contrast.
 * Dynamically displays specifications for the selected weight variant.
 */
export default function ParameterTable({ selectedVariant, className }: ParameterTableProps) {
  const { spec } = selectedVariant;

  const specs = [
    { label: "Nominal Value", value: `${selectedVariant.weightValue}${selectedVariant.weightUnit}` },
    { label: "OIML Accuracy Class", value: selectedVariant.oimlClass },
    { label: "Material Composition", value: selectedVariant.material },
    { 
      label: "Permissible Error (± mg)", 
      value: spec?.maxPermissibleError !== undefined ? spec.maxPermissibleError.toFixed(4) : "—" 
    },
    { 
      label: "Magnetic Susceptibility (χ)", 
      value: spec?.susceptibility !== undefined ? spec.susceptibility.toFixed(5) : "—" 
    },
    { 
      label: "Magnetization (µT)", 
      value: spec?.magnetization !== undefined ? spec.magnetization.toFixed(2) : "—" 
    },
    { 
      label: "Density (kg/m³)", 
      value: spec?.density !== undefined ? `${spec.density}` : "—" 
    },
  ];

  return (
    <div className={cn("border border-industrial-900 bg-white", className)}>
      <div className="bg-industrial-900 text-white px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold">
        Specification_Matrix / {selectedVariant.weightValue}{selectedVariant.weightUnit}
      </div>
      <div className="divide-y divide-industrial-200">
        {specs.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between px-4 py-3 hover:bg-industrial-50 transition-colors group"
          >
            <span className="text-[11px] uppercase text-industrial-500 font-bold tracking-tight">
              {item.label}
            </span>
            <span className="font-mono text-sm text-industrial-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-industrial-100 px-4 py-2 border-t border-industrial-900 flex justify-between items-center">
        <span className="text-[9px] text-industrial-400 uppercase tracking-tighter">
          System_Ref: {selectedVariant.id.substring(0, 8)}
        </span>
        <span className="text-[9px] text-industrial-900 font-bold uppercase italic">
          Verified Precision
        </span>
      </div>
    </div>
  );
}
