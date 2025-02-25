"use client";
import { monthlySubscriptions, yearlySubscriptions } from "@/contants";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SubscriptionPlan from "./_components/SubscriptionPlan";
import SubscriptionPlanSkeleton from "./_components/SubscriptionPlanSkeleton";

const PricingPage = () => {
  const [subscriptionType, setSubscriptionType] = useState("monthly");

  const { isLoading, billingCycle } = useProfileStore();
  const { status } = useSession();

  useEffect(() => {
    if (billingCycle) {
      setSubscriptionType(billingCycle);
    }
  }, [billingCycle]);

  const loading = isLoading || status === "loading";
  return (
    <main className="mt-10 sm:px-10 xl:px-20 mb-10">
      <h2 className="text-center text-[24px] leading-[18px] md:text-[32px] md:leading-[40px] font-extrabold mb-4">
        A plan for every need
      </h2>
      <p className="text-center text-sm md:text-base text-white/80">
        Turn your ideas into vibrant animated videos in minute. Choose a <br />
        plan that fits you and start creating.
      </p>

      <div className="sm:w-fit mx-auto p-1 rounded-[10px] bg-white/5 flex items-center gap-2 mt-10">
        <button
          className={cn(
            "flex-1 sm:w-[230px] py-[10px] rounded-md transition-all relative",
            subscriptionType === "monthly" && "text-primary"
          )}
          disabled={loading}
          onClick={() => setSubscriptionType("monthly")}
        >
          {subscriptionType === "monthly" && (
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
            "flex-1 sm:w-[230px] py-[10px] rounded-md transition-all relative",
            subscriptionType === "yearly" && "text-primary"
          )}
          disabled={loading}
          onClick={() => setSubscriptionType("yearly")}
        >
          {subscriptionType === "yearly" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-primary/5 rounded-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Yearly
        </button>
      </div>

      {loading ? (
        <div className="mt-10 grid items-center sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          <SubscriptionPlanSkeleton />
          <SubscriptionPlanSkeleton />
          <SubscriptionPlanSkeleton />
        </div>
      ) : (
        <div className="mt-10 grid items-center sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {subscriptionType === "yearly" &&
            yearlySubscriptions?.map((subscription) => (
              <SubscriptionPlan
                key={subscription?.id}
                subscription={subscription}
                subscriptionType="yearly"
              />
            ))}

          {subscriptionType === "monthly" &&
            monthlySubscriptions?.map((subscription) => (
              <SubscriptionPlan
                key={subscription?.id}
                subscription={subscription}
                subscriptionType="monthly"
              />
            ))}
        </div>
      )}
    </main>
  );
};

export default PricingPage;
