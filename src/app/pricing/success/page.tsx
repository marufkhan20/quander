/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";
import confetti from "canvas-confetti";
import { CheckCircle, Loader, Play, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SubscriptionSuccess() {
  const [price, setPrice] = useState(0);
  const { isLoading, billingCycle, subscription } = useProfileStore();

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/");
      toast.error("Please login.");
    }
  }, [status, session, router]);

  useEffect(() => {
    const data = localStorage.getItem("subscriptionPlan");
    if (data) {
      const subscriptionPlan = JSON.parse(data);
      setPrice(subscriptionPlan?.price);
    }
  }, []);

  const loading = isLoading || status === "loading";

  function getNextDate(type: string): string {
    const currentDate = new Date();

    if (type === "monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (type === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }

    return currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // animation effect
  useEffect(() => {
    if (!loading && billingCycle) {
      const timer = setTimeout(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
        };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);

          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loading, billingCycle]);
  return (
    <div className="flex flex-col items-center p-4">
      <div className="max-w-md w-full space-y-8">
        {!loading && (
          <div className="text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white">
              Subscription Activated!
            </h1>
            <p className="mt-2 text-slate-400">
              Thank you for subscribing to Quander {subscription}
            </p>
          </div>
        )}

        <Card
          className={cn(
            "bg-[#141414] border-slate-800 p-6 rounded-xl",
            loading && "min-h-[300px] flex items-center justify-center"
          )}
        >
          {loading ? (
            <Loader className="text-white transition-all animate-spin" />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-white">
                    {subscription} Plan
                  </h2>
                  <p className="text-sm text-slate-400">
                    {billingCycle === "monthly" ? "Monthly" : "Annual"}{" "}
                    subscription
                  </p>
                </div>
                <div className="bg-primary/10 rounded-full p-2">
                  <Star className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-slate-200">
                    Unlimited video uploads
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-slate-200">
                    Premium content access
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-slate-200">
                    Ad-free experience
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-slate-200">
                    Priority support
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">
                    Next billing date
                  </span>
                  <span className="text-sm text-white">
                    {getNextDate(billingCycle || "")}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-slate-400">Amount</span>
                  <span className="text-sm text-white">
                    ${price}/{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {!loading && (
          <>
            <div className="space-y-4">
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary/90 text-black font-medium py-6">
                  <Play className="mr-2 h-4 w-4" /> Start Exploring Premium
                  Content
                </Button>
              </Link>
            </div>

            <p className="text-center text-xs text-slate-500 mt-8">
              Need help? Contact{" "}
              <a href="#" className="text-primary hover:underline">
                support@quander.com
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
