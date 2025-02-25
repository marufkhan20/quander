"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const errorMessage =
    "We couldn't process your subscription request at this time.";
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="rounded-[10px] bg-white/[0.02] h-fit">
          <div className="bg-red-500/5 p-[30px] pb-5">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500 size-5" />
              <h4 className="text-base font-medium">Payment Failed</h4>
            </div>

            <div className="mt-5">
              <p className="text-white/80">{errorMessage}</p>
            </div>

            <Link
              href="/pricing"
              className="mt-[30px] w-full py-3 transition-all hover:bg-primary hover:text-black px-3 bg-[#fafafa]/10 rounded-[10px] font-semibold flex items-center justify-center gap-2"
              // onClick={onRetry}
            >
              <RefreshCw className="size-4" />
              Try Again
            </Link>
          </div>

          <div className="p-[30px]">
            <h4 className="uppercase text-sm font-semibold text-white/80 mb-2">
              Possible Issues
            </h4>

            <ul className="flex flex-col gap-[10px] mb-6">
              <li className="flex items-start gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs text-white/70">1</span>
                </div>
                <span className="text-sm text-white/70">
                  Your card may have insufficient funds
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs text-white/70">2</span>
                </div>
                <span className="text-sm text-white/70">
                  Your bank may have declined the transaction
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center mt-0.5">
                  <span className="text-xs text-white/70">3</span>
                </div>
                <span className="text-sm text-white/70">
                  There might be a temporary issue with our payment system
                </span>
              </li>
            </ul>

            <button
              className="w-full py-3 transition-all hover:bg-white/5 px-3 bg-transparent border border-white/10 rounded-[10px] font-medium text-white/80"
              // onClick={onContactSupport}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
