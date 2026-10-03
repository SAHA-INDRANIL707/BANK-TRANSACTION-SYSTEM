"use client";

import Link from "next/link";
import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      badgeText="256-bit Bank Grade Security"
      heroTitle="Create account"
      heroSubtitle="Join millions of satisfied users managing finances effortlessly."
      feature1="Instant Setup"
      feature2="Zero Paperwork"
    >
      <div className="w-full max-w-[290px] sm:max-w-[310px]">
        <div className="text-center mb-2.5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-0.5">Sign up</h2>
          <p className="text-[11px] text-slate-400 font-normal">Create your personal NetBanking credentials</p>
        </div>

        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <label className="block text-[10.5px] font-semibold text-slate-600 mb-0.5 ml-0.5">Full Name</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400 pointer-events-none flex items-center justify-center">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-800 text-xs rounded-lg pl-9 pr-3 py-1.5 outline-none transition duration-150 placeholder-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* User Email */}
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
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-800 text-xs rounded-lg pl-9 pr-3 py-1.5 outline-none transition duration-150 placeholder-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* Password with Eye Icons */}
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
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-800 text-xs rounded-lg pl-9 pr-9 py-1.5 outline-none transition duration-150 placeholder-slate-400 shadow-sm"
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

          {/* Terms Checkbox */}
          <div className="pt-0.5">
            <label className="flex items-start text-[10px] text-slate-600 cursor-pointer select-none leading-tight">
              <input type="checkbox" required className="rounded border-slate-300 text-blue-600 w-3 h-3 mr-1.5 mt-0.5 focus:ring-0 cursor-pointer" />
              <span>
                I agree to <a href="#" className="text-blue-600 hover:underline">Terms</a> &amp; <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-0.5">
            <button
              type="submit"
              className="w-full bg-[#144ebb] hover:bg-[#0f409e] active:scale-[0.99] text-white text-xs font-semibold py-1.5 sm:py-2 rounded-lg shadow-sm hover:shadow transition duration-150 ease-in-out flex items-center justify-center gap-1.5"
            >
              <span>Sign up</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full border-t border-slate-200"></div>
            <span className="text-[9.5px] text-slate-400 bg-white px-2 absolute uppercase tracking-wider font-semibold">Or</span>
          </div>

          {/* Secondary Button */}
          <div>
            <button
              type="button"
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 active:scale-[0.99] text-[11px] font-semibold py-1.5 rounded-lg transition duration-150 ease-in-out flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Sign up with other methods</span>
            </button>
          </div>
        </form>

        <p className="text-center text-[10.5px] text-slate-500 mt-2">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors ml-0.5">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
