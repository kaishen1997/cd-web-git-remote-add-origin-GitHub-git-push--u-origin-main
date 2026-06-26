import React from "react";
import ProductDetails from "@/components/products/ProductDetails";
import { Variant, OimlClass } from "@/components/products/ParameterTable";

// Mock data generator for different classes
const generateVariants = (slug: string): Variant[] => {
  const masses = ["1g", "2g", "5g", "10g", "20g", "50g", "100g", "200g", "500g", "1kg", "2kg", "5kg", "10kg", "20kg"];
  const classes: OimlClass[] = ["E1", "E2", "F1", "F2"];
  const variants: Variant[] = [];

  masses.forEach((mass) => {
    classes.forEach((cls) => {
      const val = parseFloat(mass);
      const unit = mass.replace(/[0-9]/g, "");
      
      variants.push({
        id: `var-${slug}-${mass}-${cls}`,
        weightValue: val,
        weightUnit: unit,
        oimlClass: cls,
        material: "Non-magnetic Stainless Steel",
        sku: `TQ-${slug.toUpperCase()}-${mass}-${cls}`,
        spec: {
          maxPermissibleError: 0.001 * (val / 10), // simplified logic
          susceptibility: 0.0005,
          magnetization: 0.05,
          density: 8000,
        }
      });
    });
  });

  return variants;
};

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // In a real app, fetch from Prisma: 
  // const product = await prisma.product.findUnique({ where: { slug }, include: { variants: { include: { spec: true } } } });
  
  const product = {
    name: slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
    description: "High-precision OIML R111-1 compliant weights designed for analytical balances and industrial metrology. Manufactured from premium non-magnetic stainless steel with mirror-polished surface finish.",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
    ]
  };

  const variants = generateVariants(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "brand": {
      "@type": "Brand",
      "name": "TQ Weighing"
    },
    "sku": variants[0]?.sku,
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": variants.length,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "offers": variants.map(v => ({
        "@type": "Offer",
        "sku": v.sku,
        "weight": {
          "@type": "QuantitativeValue",
          "value": v.weightValue,
          "unitText": v.weightUnit
        },
        "itemCondition": "https://schema.org/NewCondition",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Accuracy Class",
            "value": v.oimlClass
          },
          {
            "@type": "PropertyValue",
            "name": "Material",
            "value": v.material
          },
          {
            "@type": "PropertyValue",
            "name": "Max Permissible Error",
            "value": v.spec?.maxPermissibleError
          }
        ]
      }))
    }
  };

  return (
    <main className="flex-grow px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetails product={product} variants={variants} />
    </main>
  );
}
