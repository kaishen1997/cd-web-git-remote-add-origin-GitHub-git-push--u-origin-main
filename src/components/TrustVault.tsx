"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Download, Award, FileText } from "lucide-react";

interface TrustVaultProps {
  className?: string;
}

/**
 * TrustVault Component
 * High-trust signal section for B2B industrial sites.
 * Style: Digital certificate cards with anti-counterfeiting patterns and 3D embossed effects.
 */
export default function TrustVault({ className }: TrustVaultProps) {
  return (
    <div className={cn("py-16 border-t border-industrial-200", className)}>
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-industrial-900">
          Trust_Vault<span className="text-industrial-400">.sys</span>
        </h2>
        <div className="h-[1px] flex-grow bg-industrial-200"></div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-industrial-400 uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          Secured Verification
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ISO 9001 Certificate Card */}
        <CertificateCard 
          title="ISO 9001:2015"
          subtitle="Quality Management System"
          id="CERT-8842-QMS"
          issuer="Bureau Veritas"
        />

        {/* OIML R111 Compliance */}
        <CertificateCard 
          title="OIML R111-1"
          subtitle="International Recommendation"
          id="OIML-2023-CS2"
          issuer="NIM China / PTB Germany"
        />

        {/* Traceability Card */}
        <div className="relative group overflow-hidden border border-industrial-900 bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
          {/* Anti-counterfeiting pattern background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <Award className="w-8 h-8 text-industrial-900" />
              <div className="px-2 py-1 bg-green-50 text-green-700 text-[9px] font-bold border border-green-200 rounded-sm">
                ACTIVE_STATUS
              </div>
            </div>
            
            <h3 className="text-lg font-black leading-tight mb-2 uppercase italic">
              Traceability Documentation
            </h3>
            <p className="text-xs text-industrial-500 mb-6 leading-relaxed">
              Full traceability to national standards (NIM/NIST). Digital records archived for 10 years.
            </p>

            <div className="mt-auto space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-industrial-900 text-industrial-900 text-xs font-bold uppercase tracking-widest transition-all active:translate-y-[2px] active:shadow-none shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-industrial-50">
                <Download className="w-3 h-3" />
                Download Standards Mapping
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-6 border-2 border-dashed border-industrial-200 bg-industrial-50/50 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-industrial-200 flex items-center justify-center bg-white shadow-inner">
            <FileText className="w-6 h-6 text-industrial-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-industrial-900 uppercase">Verification QR Integration</h4>
            <p className="text-[10px] text-industrial-500">All certificates include a unique QR code for instant digital validation.</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-industrial-400">
          Last_Audit: 2026-03-15 | Next_Review: 2027-03-14
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ title, subtitle, id, issuer }: { title: string, subtitle: string, id: string, issuer: string }) {
  return (
    <div className="relative group overflow-hidden border border-industrial-900 bg-white p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
      {/* Guilloche-style background pattern (Simplified) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50 Q 25 0 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <path d="M0 40 Q 25 -10 50 40 T 100 40" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <path d="M0 60 Q 25 10 50 60 T 100 60" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-10 h-10 border border-industrial-200 flex items-center justify-center bg-industrial-50 shadow-sm">
            <span className="text-[8px] font-black text-industrial-900">CERT</span>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-mono text-industrial-400 uppercase tracking-tighter">Issue_ID</div>
            <div className="text-[10px] font-bold text-industrial-900 font-mono">{id}</div>
          </div>
        </div>

        <h3 className="text-xl font-black text-industrial-900 mb-1 uppercase tracking-tight">{title}</h3>
        <p className="text-[10px] text-industrial-500 uppercase tracking-wider mb-6 font-bold">{subtitle}</p>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] w-4 bg-industrial-900"></div>
          <span className="text-[9px] uppercase font-bold text-industrial-400 italic">Issued by {issuer}</span>
        </div>

        <button className="group/btn w-full flex items-center justify-between px-4 py-3 bg-industrial-900 text-white text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-black active:scale-[0.98]">
          <span>View Certificate</span>
          <Download className="w-3 h-3 transition-transform group-hover/btn:translate-y-[1px]" />
        </button>

        {/* 3D Embossed Stamp Mockup */}
        <div className="absolute bottom-2 right-2 w-14 h-14 rounded-full border-4 border-industrial-900/5 flex items-center justify-center opacity-20 pointer-events-none rotate-12">
           <div className="text-[6px] font-black text-center leading-tight uppercase">
             Official<br/>Certified<br/>2026
           </div>
        </div>
      </div>
    </div>
  );
}
