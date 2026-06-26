"use client";

import React, { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitRFQ, RFQState } from "@/app/actions/rfq";
import { cn } from "@/lib/utils";
import { Variant } from "../products/ParameterTable";

interface RFQFormProps {
  variantId: string;
  productName: string;
  variantName: string;
  className?: string;
}

const initialState: RFQState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full py-4 bg-industrial-900 text-white font-bold uppercase tracking-[0.2em] text-xs transition-all",
        pending ? "opacity-50 cursor-not-allowed" : "hover:bg-industrial-800 active:scale-[0.98]"
      )}
    >
      {pending ? "Processing_Request..." : "Confirm_and_Submit_RFQ"}
    </button>
  );
}

/**
 * RFQForm Component
 * Multi-step form for B2B inquiries.
 * Step 1: Contact Information
 * Step 2: Confirmation & Message
 */
export default function RFQForm({ variantId, productName, variantName, className }: RFQFormProps) {
  const [step, setStep] = useState(1);
  const [state, formAction] = useFormState(submitRFQ, initialState);

  const handleContinue = () => {
    // Simple validation for Step 1
    const form = document.querySelector('form');
    if (form) {
      const name = form.querySelector('input[name="name"]') as HTMLInputElement;
      const email = form.querySelector('input[name="email"]') as HTMLInputElement;
      const company = form.querySelector('input[name="company"]') as HTMLInputElement;

      if (name.checkValidity() && email.checkValidity() && company.checkValidity()) {
        setStep(2);
      } else {
        name.reportValidity() || email.reportValidity() || company.reportValidity();
      }
    }
  };

  // Track RFQ Success
  useEffect(() => {
    if (state.status === "success") {
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "rfq_submission_success", {
          product_name: productName,
          variant_name: variantName,
          variant_id: variantId,
        });
      }
    }
  }, [state.status, productName, variantName, variantId]);

  // Success state handling
  if (state.status === "success") {
    return (
      <div className={cn("border border-industrial-900 bg-white p-10 text-center relative overflow-hidden", className)}>
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="successGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#successGrid)" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center border-2 border-industrial-900 bg-industrial-50">
            <svg className="h-8 w-8 text-industrial-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-black text-industrial-900 uppercase tracking-tighter mb-4 italic">
            Submission_Received
          </h3>
          <div className="space-y-4 max-w-xs mx-auto">
            <p className="text-sm font-bold text-industrial-900 leading-tight">
              We will provide a formal quotation within 1-2 hours.
            </p>
            <p className="text-[10px] text-industrial-400 uppercase tracking-widest leading-relaxed">
              Our engineering team is reviewing your technical specifications for {productName} ({variantName}).
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-industrial-100">
            <button 
              onClick={() => window.location.reload()}
              className="text-[10px] uppercase font-black tracking-[0.3em] text-industrial-900 hover:opacity-70 transition-opacity flex items-center gap-2 mx-auto"
            >
              <span className="w-2 h-2 bg-industrial-900 rounded-full animate-pulse"></span>
              Create New Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border border-industrial-900 bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.05)]", className)}>
      {/* Header / Progress */}
      <div className="border-b border-industrial-900 flex">
        <div className={cn(
          "flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center border-r border-industrial-900 transition-colors",
          step === 1 ? "bg-industrial-900 text-white" : "bg-white text-industrial-400"
        )}>
          01_Identity
        </div>
        <div className={cn(
          "flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-center transition-colors",
          step === 2 ? "bg-industrial-900 text-white" : "bg-white text-industrial-400"
        )}>
          02_Requirement
        </div>
      </div>

      <form action={formAction} className="p-8">
        {/* Hidden input for variant ID */}
        <input type="hidden" name="variantIds" value={variantId} />

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase tracking-widest text-industrial-900">Contact_Name</label>
              <input
                required
                name="name"
                type="text"
                placeholder="TECHNICAL REPRESENTATIVE"
                className="w-full border-b-2 border-industrial-100 py-3 text-sm font-bold placeholder:text-industrial-200 focus:border-industrial-900 outline-none transition-all uppercase"
              />
              {state.errors?.name && <p className="mt-1 text-[10px] text-red-600 font-bold">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase tracking-widest text-industrial-900">Email_Address</label>
              <input
                required
                name="email"
                type="email"
                placeholder="METROLOGY@COMPANY.CORP"
                className="w-full border-b-2 border-industrial-100 py-3 text-sm font-bold placeholder:text-industrial-200 focus:border-industrial-900 outline-none transition-all uppercase"
              />
              {state.errors?.email && <p className="mt-1 text-[10px] text-red-600 font-bold">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase tracking-widest text-industrial-900">Company_Entity</label>
              <input
                required
                name="company"
                type="text"
                placeholder="FACILITY / LAB NAME"
                className="w-full border-b-2 border-industrial-100 py-3 text-sm font-bold placeholder:text-industrial-200 focus:border-industrial-900 outline-none transition-all uppercase"
              />
              {state.errors?.company && <p className="mt-1 text-[10px] text-red-600 font-bold">{state.errors.company[0]}</p>}
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 w-full py-4 border-2 border-industrial-900 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-industrial-900 hover:text-white transition-all active:scale-[0.98]"
            >
              Continue_to_Step_02 →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-industrial-900 p-4 border-l-[6px] border-industrial-400">
              <span className="block text-[8px] font-black text-industrial-300 uppercase tracking-widest mb-1">Inquiry_Reference</span>
              <span className="text-[11px] font-mono font-bold text-white uppercase italic">
                {productName} // {variantName}
              </span>
            </div>
            
            <div className="space-y-1">
              <label className="block text-[9px] font-black uppercase tracking-widest text-industrial-900">Message / Add_Requirements</label>
              <textarea
                name="message"
                rows={4}
                placeholder="ENTER CALIBRATION DETAILS, QUANTITY, OR SHIPPING DESTINATION..."
                className="w-full border-2 border-industrial-100 p-4 text-xs font-bold focus:border-industrial-900 outline-none transition-all resize-none placeholder:text-industrial-200"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-4 border-2 border-industrial-100 text-industrial-400 text-[10px] font-black uppercase tracking-widest hover:border-industrial-900 hover:text-industrial-900 transition-all"
              >
                ← Back
              </button>
              <div className="w-2/3">
                <SubmitButton />
              </div>
            </div>
            {state.status === "error" && (
              <p className="mt-2 text-[10px] text-red-600 text-center font-black uppercase tracking-tighter">{state.message}</p>
            )}
          </div>
        )}
      </form>
      <div className="bg-industrial-50 px-8 py-4 border-t border-industrial-900/10 flex justify-between items-center">
        <p className="text-[8px] text-industrial-400 leading-relaxed uppercase font-bold tracking-tighter">
          Encryption: AES-256-GCM // System_Active
        </p>
        <div className="flex gap-2">
          <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

