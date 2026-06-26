import { PrismaClient, OimlClass } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // 1. Create Products
  const analyticalWeights = await prisma.product.upsert({
    where: { slug: "analytical-precision-weights" },
    update: {},
    create: {
      name: "High-Precision Analytical Weights",
      slug: "analytical-precision-weights",
      description: "OIML R111-1 compliant analytical weights designed for laboratory balances and metrology. Manufactured from premium non-magnetic stainless steel with mirror-polished surface finish.",
      category: "Laboratory Calibration",
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      ],
    },
  });

  const industrialWeights = await prisma.product.upsert({
    where: { slug: "industrial-calibration-weights" },
    update: {},
    create: {
      name: "Industrial Heavy-Duty Weights",
      slug: "industrial-calibration-weights",
      description: "Robust calibration weights for industrial scales. Available in stainless steel and high-quality cast iron, designed for long-term stability in harsh environments.",
      category: "Industrial Metrology",
      images: [
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop",
      ],
    },
  });

  // 2. Define weight ranges
  const mgWeights = [1, 2, 5, 10, 20, 50, 100, 200, 500];
  const gWeights = [1, 2, 5, 10, 20, 50, 100, 200, 500];
  const kgWeights = [1, 2, 5, 10, 20, 50];

  const classes: OimlClass[] = ["E1", "E2", "F1", "F2", "M1"];

  // 3. Helper to create variants
  const createVariantsForProduct = async (product: any, classFilter: (c: OimlClass) => boolean) => {
    for (const c of classes.filter(classFilter)) {
      // mg
      for (const v of mgWeights) {
        await createVariant(product.id, v, "mg", c);
      }
      // g
      for (const v of gWeights) {
        await createVariant(product.id, v, "g", c);
      }
      // kg
      for (const v of kgWeights) {
        await createVariant(product.id, v, "kg", c);
      }
    }
  };

  const createVariant = async (productId: string, val: number, unit: string, oiml: OimlClass) => {
    const sku = `TQ-${oiml}-${val}${unit}`;
    const material = oiml.startsWith("E") ? "316L Non-magnetic Stainless Steel" : 
                     oiml.startsWith("F") ? "304 Stainless Steel" : "Premium Cast Iron";
    
    // Simplified Max Permissible Error (MPE) based on OIML R111
    // In a real scenario, this would be a lookup table
    let mpe = 0;
    const baseValInMg = unit === "mg" ? val : unit === "g" ? val * 1000 : val * 1000000;
    
    if (oiml === "E1") mpe = baseValInMg * 0.000001;
    else if (oiml === "E2") mpe = baseValInMg * 0.000003;
    else if (oiml === "F1") mpe = baseValInMg * 0.00001;
    else if (oiml === "F2") mpe = baseValInMg * 0.00003;
    else mpe = baseValInMg * 0.0001;

    await prisma.variant.upsert({
      where: { sku },
      update: {},
      create: {
        productId,
        weightValue: val,
        weightUnit: unit,
        oimlClass: oiml,
        material,
        sku,
        spec: {
          create: {
            maxPermissibleError: mpe,
            magnetization: oiml.startsWith("E") ? 0.05 : 0.5,
            susceptibility: oiml.startsWith("E") ? 0.0005 : 0.005,
            density: oiml === "M1" ? 7200 : 8000,
            surfaceRoughness: oiml.startsWith("E") ? 0.1 : 0.5,
          }
        }
      }
    });
  };

  // E1, E2 belong to Analytical
  await createVariantsForProduct(analyticalWeights, (c) => c === "E1" || c === "E2");
  // F1, F2, M1 belong to Industrial
  await createVariantsForProduct(industrialWeights, (c) => c === "F1" || c === "F2" || c === "M1");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
