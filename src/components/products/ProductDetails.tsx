"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductSelector from "@/components/products/ProductSelector";
import ParameterTable, { Variant } from "@/components/products/ParameterTable";
import RFQForm from "@/components/rfq/RFQForm";
import TrustVault from "@/components/TrustVault";
import { ChevronRight, Box, Ruler, ShieldCheck } from "lucide-react";

interface ProductDetailsProps {
  product: {
    name: string;
    description: string;
    images: string[];
  };
  variants: Variant[];
}

export default function ProductDetails({ product, variants }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);

  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-industrial-400">
        <a href="/" className="hover:text-industrial-900 transition-colors">Home</a>
        <ChevronRight className="w-3 h-3" />
        <a href="/products" className="hover:text-industrial-900 transition-colors">Products</a>
        <ChevronRight className="w-3 h-3" />
        <span className="text-industrial-900">{product.name}</span>
      </nav>

      {/* Main Content: Image + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Product Image (Sticky) */}
        <div className="lg:col-span-7">
          <div className="sticky top-8 space-y-4">
            <div className="aspect-square bg-white border border-industrial-200 relative overflow-hidden group">
              {/* Technical Grid Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#smallGrid)" />
                </svg>
              </div>

              {/* Product Image */}
              <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 group-hover:scale-105">
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0] || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"}
                    alt={product.name}
                    fill
                    className="object-contain filter contrast-125 grayscale"
                    priority
                  />
                </div>
              </div>

              {/* Overlay Labels */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                <div className="px-2 py-1 bg-industrial-900 text-white text-[8px] font-bold uppercase tracking-widest">
                  High_Contrast_Studio_Shot
                </div>
                <div className="px-2 py-1 bg-white border border-industrial-900 text-industrial-900 text-[8px] font-bold uppercase tracking-widest">
                  Ref: {selectedVariant.sku || "N/A"}
                </div>
              </div>

              {/* Aesthetic corner markers */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-industrial-900"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-industrial-900"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-industrial-900"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-industrial-900"></div>
            </div>

            {/* Thumbnail Preview (Optional) */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((img, i) => (
                <div key={i} className="aspect-square bg-white border border-industrial-200 p-2 cursor-pointer hover:border-industrial-900 transition-colors">
                  <div className="relative w-full h-full grayscale opacity-50 hover:opacity-100 transition-opacity">
                    <Image src={img} alt={`${product.name} view ${i}`} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Selection & RFQ */}
        <div className="lg:col-span-5 space-y-12">
          <header className="space-y-4">
            <h1 className="text-4xl font-black text-industrial-900 uppercase tracking-tighter leading-none">
              {product.name}
            </h1>
            <p className="text-sm text-industrial-500 leading-relaxed max-w-md">
              {product.description}
            </p>
          </header>

          <ProductSelector 
            variants={variants} 
            onVariantChange={setSelectedVariant} 
          />

          <ParameterTable 
            selectedVariant={selectedVariant} 
          />

          <RFQForm 
            variantId={selectedVariant.id} 
            productName={product.name}
            variantName={`${selectedVariant.weightValue}${selectedVariant.weightUnit} ${selectedVariant.oimlClass}`}
          />
          
          {/* Quick Info Bits */}
          <div className="grid grid-cols-3 gap-4 border-t border-industrial-200 pt-8">
            <div className="space-y-1">
              <Box className="w-4 h-4 text-industrial-900" />
              <div className="text-[10px] font-bold uppercase">Ready_Ship</div>
              <div className="text-[9px] text-industrial-400">Stock Available</div>
            </div>
            <div className="space-y-1">
              <Ruler className="w-4 h-4 text-industrial-900" />
              <div className="text-[10px] font-bold uppercase">OIML_STD</div>
              <div className="text-[9px] text-industrial-400">Verified Precision</div>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 text-industrial-900" />
              <div className="text-[10px] font-bold uppercase">Safe_Vault</div>
              <div className="text-[9px] text-industrial-400">Secure Handling</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section at Bottom */}
      <TrustVault />
    </div>
  );
}
