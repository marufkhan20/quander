import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const app = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      email: z.string(),
      priceId: z.string(),
      userId: z.string(),
      subscriptionType: z.string(),
      subscription: z.string(),
      credits: z.number(),
    })
  ),
  async (c) => {
    try {
      const {
        email,
        priceId,
        userId,
        subscriptionType,
        subscription,
        credits,
      } = c.req.valid("json");

      console.log({
        email,
        priceId,
        userId,
        subscriptionType,
        subscription,
        credits,
      });

      if (
        !priceId ||
        !email ||
        !userId ||
        !subscriptionType ||
        !subscription ||
        credits === undefined
      ) {
        return c.json({ error: "Missing required fields" }, { status: 400 });
      }

      // Validate subscriptionType
      if (!["monthly", "yearly"].includes(subscriptionType)) {
        return c.json(
          { error: "Invalid subscriptionType, must be 'monthly' or 'yearly'" },
          { status: 400 }
        );
      }

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "subscription",
        success_url: process.env.STRIPE_SUCCESS_URL!,
        cancel_url: process.env.STRIPE_CANCEL_URL!,
        customer_email: email,
        allow_promotion_codes: true,
        subscription_data: {
          metadata: {
            userId,
            subscriptionType, // month or year
            subscription, // Basic, Standard, etc.
            credits,
          },
        },
      });

      console.log("Stripe session created:", session.id);
      return c.json({ id: session.id }, { status: 201 });
    } catch (error) {
      console.error("Error creating Stripe session:", error);

      return c.json(
        { error: error instanceof Error ? error.message : "Unknown error" },
        { status: 500 }
      );
    }
  }
);

export default app;
