"use client";

import Link from "next/link";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      badgeText="256-bit Bank Grade Security"
      heroTitle="Welcome back"
      heroSubtitle="Effortlessly oversee accounts, instant payments, and premium wealth management."
      feature1="Instant UPI & RTGS"
      feature2="Zero Latency"
    >
      <div className="w-full max-w-[290px] sm:max-w-[310px]">
        {/* Heading */}
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-0.5">Sign in</h2>
          <p className="text-[11px] sm:text-xs text-slate-400 font-normal">Enter your credentials to access your account</p>
        </div>

        {/* Form Fields */}
        <form className="space-y-2.5 sm:space-y-3" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div>
            <label className="block text-[10.5px] font-semibold text-slate-600 mb-0.5 ml-0.5">User Email</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <input
                type="email"
                required
                placeholder="e.g. user@bank.in"
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-800 text-xs rounded-lg pl-9 pr-3 py-2 outline-none transition duration-150 placeholder-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* Password Input with Eye Icons */}
          <div>
            <label className="block text-[10.5px] font-semibold text-slate-600 mb-0.5 ml-0.5">Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-800 text-xs rounded-lg pl-9 pr-9 py-2 outline-none transition duration-150 placeholder-slate-400 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-slate-400 hover:text-blue-600 focus:outline-none transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-[10.5px] pt-0.5">
            <label className="flex items-center text-slate-600 cursor-pointer select-none">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 w-3 h-3 mr-1.5 focus:ring-0 cursor-pointer" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <Link
            href="/dashboard"
            className="w-full bg-[#1351c7] hover:bg-[#0e44aa] active:bg-[#0b388e] text-white font-semibold text-xs py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow transition duration-150 flex items-center justify-center group focus:outline-none"
          >
            <span>Proceed to Account</span>
            <svg className="ml-1.5 h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </Link>
        </form>

        {/* Alternate Sign Up CTA Link */}
        <div className="mt-3 text-center">
          <p className="text-[11px] text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800 font-bold transition-colors">
              Register here
            </Link>
          </p>
        </div>

        {/* Security Indicator */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-400 text-[10px]">
          <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Safe Banking • 256-Bit SSL Secured</span>
        </div>
      </div>
    </AuthLayout>
  );
}
