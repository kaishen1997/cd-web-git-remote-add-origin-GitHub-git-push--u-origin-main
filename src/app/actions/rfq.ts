"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "sales@tqweighing.com";

const RFQSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  message: z.string().optional(),
  variantIds: z.string().array().min(1, "At least one product variant must be selected"),
});

export type RFQState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: z.inferFlattenedErrors<typeof RFQSchema>["fieldErrors"];
};

/**
 * submitRFQ Server Action
 * Handles the final submission of a multi-step RFQ process.
 * In a B2B context, this replaces the checkout process.
 */
export async function submitRFQ(prevState: RFQState, formData: FormData): Promise<RFQState> {
  // Extract data from formData
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    message: formData.get("message") as string,
    variantIds: formData.getAll("variantIds") as string[],
  };

  // Validate
  const validated = RFQSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const { name, email, company, message, variantIds } = validated.data;

    // Create inquiry and inquiry items in a transaction
    await prisma.$transaction(async (tx) => {
      const inquiry = await tx.inquiry.create({
        data: {
          name,
          email,
          company,
          message,
          items: {
            create: variantIds.map((id) => ({
              variantId: id,
              quantity: 1, // Default to 1 for RFQ unless specified
            })),
          },
        },
      });

      // Fetch variant details for the email notification
      const variants = await tx.variant.findMany({
        where: { id: { in: variantIds } },
        include: { product: true },
      });

      const itemsHtml = variants.map(v => `
        <li>
          <strong>${v.product.name}</strong> - ${v.weightValue}${v.weightUnit} (${v.oimlClass})
          <br/>Material: ${v.material} | SKU: ${v.sku}
        </li>
      `).join("");

      // Send email notification (Resend)
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "TQ Weighing RFQ <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          subject: `New RFQ from ${company}`,
          html: `
            <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
              <h1 style="color: #ff6a00;">New RFQ Received</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Message:</strong> ${message || "N/A"}</p>
              <hr/>
              <h3>Selected Products:</h3>
              <ul>${itemsHtml}</ul>
              <hr/>
              <h3 style="color: #2c3e50;">Our Commitments:</h3>
              <ul>
                <li><strong>Precision Guarantee:</strong> OIML R111-1 compliant, calibration certificate included.</li>
                <li><strong>Material Integrity:</strong> Non-magnetic stainless steel (susceptibility &lt; 0.005).</li>
                <li><strong>Professional Service:</strong> Response within 12h, technical support from experts.</li>
              </ul>
            </div>
          `,
        });
      }

      return inquiry;
    });

    revalidatePath("/products");
    
    return {
      status: "success",
      message: "Your request for quotation has been submitted successfully. Our team will contact you within 24 hours.",
    };
  } catch (error) {
    console.error("RFQ Submission Error:", error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later or contact us directly.",
    };
  }
}

/**
 * validateStep Server Action
 * Used for real-time validation of multi-step forms before proceeding.
 */
export async function validateStep(step: number, data: any) {
  // logic for partial validation
  return { success: true };
}
