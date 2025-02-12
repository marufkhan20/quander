"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  return (
    <main className="mt-10 px-20 mb-10">
      <h2 className="text-center text-[32px] leading-[40px] font-extrabold mb-4">
        A plan for every need
      </h2>
      <p className="text-center text-white/80">
        Turn your ideas into vibrant animated videos in minute. Choose a <br />
        plan that fits you and start creating.
      </p>

      <div className="w-fit mx-auto p-1 rounded-[10px] bg-white/5 flex items-center gap-2 mt-10">
        <button
          className={cn(
            "w-[230px] py-[10px] rounded-md transition-all relative",
            activeTab === "monthly" && "text-primary"
          )}
          onClick={() => setActiveTab("monthly")}
        >
          {activeTab === "monthly" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-primary/5 rounded-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Monthly
        </button>
        <button
          className={cn(
            "w-[230px] py-[10px] rounded-md transition-all relative",
            activeTab === "yearly" && "text-primary"
          )}
          onClick={() => setActiveTab("yearly")}
        >
          {activeTab === "yearly" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-primary/5 rounded-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Yearly
        </button>
      </div>

      <div className="mt-10 grid items-center grid-cols-3 gap-[30px]">
        <div className="rounded-[10px] bg-white-2 h-fit">
          <div className="bg-white-2 p-[30px] pb-5">
            <h4 className="text-base font-medium">Basic Plan</h4>
            <div className="flex items-end gap-1 mt-5">
              <h2 className="text-[46px] leading-[57px] font-semibold">$19</h2>
              <span className="text-[24px] font-semibold">/month</span>
            </div>
            <p className="mt-5 font-medium text-white/80">100 Video Credits</p>
            <button className="mt-[30px] w-full py-3 transition-all hover:bg-primary hover:text-black px-3 bg-[#fafafa]/10 rounded-[10px] font-semibold">
              Get Started
            </button>
          </div>
          <div className="p-[30px]">
            <h4 className="uppercase text-sm font-semibold text-white/80 mb-2">
              Features
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Everything in our <span className="text-white">free plan</span>{" "}
              plus...
            </p>
            <ul className="flex flex-col gap-[6px]">
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-[10px] bg-white-2 h-fit overflow-hidden">
          <div className="bg-primary/5 p-[30px] pb-5 relative">
            {/* <div className="size-[137px] rounded-full absolute -top-[10%] -right-[10%] bg-primary/20 blur" /> */}
            <div className="flex items-center gap-2">
              <h4 className="text-base font-medium">Standard Plan</h4>
              <p className="px-4 py-1 rounded-full bg-black/60 backdrop-blur-[20px] text-xs text-white/60">
                Popular
              </p>
            </div>
            <div className="flex items-end gap-1 mt-5">
              <h2 className="text-[46px] leading-[57px] font-semibold">$34</h2>
              <span className="text-[24px] font-semibold">/month</span>
            </div>
            <p className="mt-5 font-medium text-white/80">100 Video Credits</p>
            <button className="mt-[30px] w-full py-3 transition-all bg-primary text-black px-3 rounded-[10px] font-semibold">
              Get Started
            </button>
          </div>
          <div className="p-[30px]">
            <h4 className="uppercase text-sm font-semibold text-white/80 mb-2">
              Features
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Everything in our <span className="text-white">basic</span>{" "}
              plus...
            </p>
            <ul className="flex flex-col gap-[6px]">
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-[10px] bg-white-2 h-fit">
          <div className="bg-white-2 p-[30px] pb-5">
            <h4 className="text-base font-medium">Premium Plan</h4>
            <div className="flex items-end gap-1 mt-5">
              <h2 className="text-[46px] leading-[57px] font-semibold">$59</h2>
              <span className="text-[24px] font-semibold">/month</span>
            </div>
            <p className="mt-5 font-medium text-white/80">100 Video Credits</p>
            <button className="mt-[30px] w-full py-3 transition-all hover:bg-primary hover:text-black px-3 bg-[#fafafa]/10 rounded-[10px] font-semibold">
              Get Started
            </button>
          </div>
          <div className="p-[30px]">
            <h4 className="uppercase text-sm font-semibold text-white/80 mb-2">
              Features
            </h4>
            <p className="text-xs text-white/70 mb-3">
              Everything in our <span className="text-white">free plan</span>{" "}
              plus...
            </p>
            <ul className="flex flex-col gap-[6px]">
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="size-[22px] rounded-full border border-white/10 flex items-center justify-center">
                  <Check className="size-[14px] text-white/70" />
                </div>
                <span className="text-sm text-white/70">100 Video Credits</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;
