import {
  useBuySubscription,
  useCancelSubscription,
} from "@/api/useSubscription";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/useProfileStore";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  subscription: SubscriptionType;
  subscriptionType: "monthly" | "yearly";
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const SubscriptionPlan = ({ subscription, subscriptionType }: IProps) => {
  const { credits, name, price, priceId } = subscription;
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    subscription: activeSubscription,
    billingCycle,
    updateInfo,
    subId,
  } = useProfileStore();

  // buy subscription
  const { mutate: buySubscription, data } = useBuySubscription();

  useEffect(() => {
    if (data && "id" in data) {
      const redirectToStripe = async () => {
        const stripe = await stripePromise;
        if (stripe) {
          console.log("working");
          const { error } = await stripe.redirectToCheckout({
            sessionId: data?.id,
          });

          if (error) {
            console.error("Error:", error);
          }
        }
      };

      redirectToStripe();
    }
  }, [data]);

  // buy subscription handler
  const buySubscriptionHandler = () => {
    setIsLoading(true);

    // set plan info in local storage
    localStorage.setItem(
      "subscriptionPlan",
      JSON.stringify({
        name,
        subscriptionType,
        price,
      })
    );

    buySubscription({
      json: {
        email: session?.user?.email || "",
        priceId,
        credits,
        subscription: name,
        subscriptionType,
        userId: id || "",
      },
    });
  };

  // cancel subscription
  const {
    mutate: cancelSubscription,
    isPending,
    isSuccess,
    isError,
  } = useCancelSubscription();

  useEffect(() => {
    if (isSuccess) {
      updateInfo({
        billingCycle: null,
        credits: 0,
        subscription: "Free",
      });

      toast.success("Subscription Cancelled Successfully.");
    }

    if (isError) {
      toast.error("Server error occurred.");
    }
  }, [isSuccess, isError, updateInfo]);
  return (
    <div className="rounded-[10px] bg-white-2 h-fit">
      <div
        className={cn(
          "bg-white-2 p-[30px] pb-5",
          name === "standard" && "bg-primary/5"
        )}
      >
        <div className="flex items-center gap-2">
          <h4 className="text-base font-medium">{name} Plan</h4>
          {name === "standard" && (
            <p className="px-4 py-1 rounded-full bg-black/60 backdrop-blur-[20px] text-xs text-white/60">
              Popular
            </p>
          )}
        </div>
        <div className="flex items-end gap-1 mt-5">
          <h2 className="text-[38px] leading-[47px] md:text-[46px] md:leading-[57px] font-semibold">
            ${price}
          </h2>
          <span className="text-[24px] font-semibold">/{subscriptionType}</span>
        </div>
        <p className="mt-5 font-medium text-white/80">
          {subscriptionType === "yearly" ? credits * 12 : credits} Video Credits
        </p>
        {name === activeSubscription && billingCycle === subscriptionType ? (
          <button
            className="mt-[30px] flex items-center justify-center gap-1 w-full py-3 transition-all hover:bg-red-600 px-3 bg-red-500 rounded-[10px] font-semibold"
            onClick={() =>
              cancelSubscription({
                param: { subId: subId as string },
              })
            }
            disabled={isPending}
          >
            {isPending && (
              <Loader className="animate-spin transition-all size-4" />
            )}
            Cancel Subscription
          </button>
        ) : (
          <button
            className="mt-[30px] w-full py-3 px-3 rounded-[10px] font-semibold flex items-center justify-center gap-1 transition-all
            disabled:cursor-not-allowed text-white hover:text-black bg-[#fafafa]/10 disabled:bg-white/5 hover:bg-primary disabled:text-white/40 disabled:hover:text-white/40"
            onClick={buySubscriptionHandler}
            disabled={activeSubscription?.toLowerCase() !== "free" || isLoading}
          >
            {isLoading && (
              <Loader className="animate-spin transition-all size-4" />
            )}
            Get Started
          </button>
        )}
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
  );
};

export default SubscriptionPlan;
