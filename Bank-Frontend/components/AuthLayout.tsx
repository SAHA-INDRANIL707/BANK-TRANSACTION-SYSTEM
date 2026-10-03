"use client";

import React from "react";
import { FadeSlide } from "@/components/ui/fade-slide";

interface AuthLayoutProps {
  badgeText: string;
  heroTitle: string;
  heroSubtitle: string;
  feature1: string;
  feature2: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  badgeText,
  heroTitle,
  heroSubtitle,
  feature1,
  feature2,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#175cd3] via-[#1550bd] to-[#0f3b8e] flex items-center justify-center p-3 sm:p-4 lg:p-5 selection:bg-blue-600 selection:text-white relative">
      {/* Atmospheric Background Glow Elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* BEGIN: Authentication Modal Wrapper */}
      <div className="w-full max-w-[880px] relative z-20 flex flex-col items-center">

        {/* TOP BRAND BAR — appears first, slides down */}
        <FadeSlide delay={0} y={-12} className="w-full">
          <header className="w-full flex items-center justify-between px-2 sm:px-3 mb-2.5 select-none" data-purpose="top-brand-bar">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white shadow-md flex items-center justify-center border border-white/40">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#144ebb]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v2h20V7L12 2zm-8 7.5v8h3.5v-8H4zm6 0v8h3.5v-8H10zm6 0v8H19.5v-8H16zm-14 10v2.5h20V19.5H2z"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-white uppercase">BOI</span>
                  <span className="text-white/40 text-xs font-light">|</span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">Bank of India</span>
                </div>
                <span className="text-[9px] tracking-wider font-medium text-blue-100/80 uppercase">Relationship beyond banking</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium tracking-wide">
              <span>Official NetBanking Portal</span>
            </div>
          </header>
        </FadeSlide>

        {/* MAIN AUTHENTICATION CARD — appears second, slides up */}
        <FadeSlide delay={0.14} y={20} className="w-full">
          <main className="w-full bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden card-shadow-modern relative flex flex-col md:flex-row items-stretch" data-purpose="auth-card">
            {/* Sphere 1: Large Left-Top sphere protruding across left side */}
            <div className="absolute -top-[100px] -left-[100px] w-[460px] sm:w-[490px] h-[460px] sm:h-[490px] rounded-full sphere-ambient-back pointer-events-none z-10"></div>
            {/* Sphere 2: Distinct Central Dynamic Floating 3D Sphere */}
            <div className="absolute bottom-[28px] left-[240px] sm:left-[255px] w-[130px] sm:w-[150px] h-[130px] sm:h-[150px] rounded-full sphere-glow-accent pointer-events-none z-20"></div>
            {/* Sphere 3: Bottom Left accent sphere */}
            <div className="absolute -bottom-[70px] -left-[45px] w-[240px] sm:w-[260px] h-[240px] sm:h-[260px] rounded-full sphere-subtle pointer-events-none z-10"></div>
            {/* Sphere 4: Delicate Bottom-Right decorative orb */}
            <div className="absolute -right-[40px] -bottom-[40px] sm:-right-[50px] sm:-bottom-[50px] w-[140px] sm:w-[165px] h-[140px] sm:h-[165px] rounded-full sphere-highlight pointer-events-none z-30"></div>

            {/* LEFT SECTION: Modern Fintech Visual Experience */}
            <section className="w-full md:w-[48%] relative z-30 p-6 sm:p-8 lg:p-9 flex flex-col justify-between text-white min-h-[190px] md:min-h-[410px]" data-purpose="brand-showcase">
              <div className="mb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill backdrop-blur-md">
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-[10px] font-medium tracking-wide text-white">{badgeText}</span>
                </div>
              </div>

              <div className="max-w-[260px] sm:max-w-[275px] pr-2 mb-auto">
                <p className="text-[10px] font-bold tracking-[0.2em] text-blue-200/90 uppercase mb-1.5">Omni Digital Banking</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">{heroTitle}</h1>
                <p className="text-[11px] sm:text-xs leading-relaxed text-blue-100/80 font-normal">{heroSubtitle}</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-white/80 text-[10.5px]">
                <div className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="font-medium">{feature1}</span>
                </div>
                <span className="text-white/30 text-xs">•</span>
                <div className="inline-flex items-center gap-1">
                  <svg className="w-3 h-3 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <span className="font-medium">{feature2}</span>
                </div>
              </div>
            </section>

            {/* RIGHT SECTION: Form Container passed as Children */}
            <section className="w-full md:w-[52%] relative z-30 px-6 py-6 sm:px-9 sm:py-8 flex flex-col justify-center items-center">
              {children}
            </section>
          </main>
        </FadeSlide>

        {/* Micro Privacy Footer — appears last */}
        <FadeSlide delay={0.28} y={10} className="w-full flex justify-center">
          <div className="flex items-center gap-3 mt-2.5 text-[10px] text-blue-100/70 select-none">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Security Advice</a>
          </div>
        </FadeSlide>

      </div>
    </div>
  );
}
