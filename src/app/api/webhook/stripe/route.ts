/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/server/db/prisma";
import { stripe } from "@/lib/stripe";
import { BillingCycle } from "@prisma/client";
import { NextResponse } from "next/server";

async function getRawBody(req: Request): Promise<Buffer> {
  const readable = req.body;
  const chunks: Uint8Array[] = [];
  const reader = readable?.getReader();

  if (reader) {
    let done = false;
    while (!done) {
      const { done: readerDone, value } = await reader.read();
      if (value) {
        chunks.push(value);
      }
      done = readerDone;
    }
  }

  // Concatenate Uint8Array chunks into a single Uint8Array
  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const mergedArray = new Uint8Array(totalLength);

  let offset = 0;
  for (const chunk of chunks) {
    mergedArray.set(chunk, offset);
    offset += chunk.length;
  }

  return Buffer.from(mergedArray);
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature") as string;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe signature or secret" },
      { status: 400 }
    );
  }

  let event;
  try {
    const rawBody = await getRawBody(req); // ✅ Fix: Use req.text() to get the raw body
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  console.log("event type", event.type);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { userId, subscriptionType, subscription, credits } =
        session.metadata || {};

      if (userId && subscriptionType && subscription) {
        const monthsToAdd = subscriptionType === "year" ? 12 : 1;
        const subExpireDate = new Date();
        subExpireDate.setMonth(subExpireDate.getMonth() + monthsToAdd);

        // 🔹 Fetch Subscription ID since session.subscription might be null
        let subscriptionId: string | null = session.subscription as string;

        if (!subscriptionId) {
          const subscriptions = await stripe.subscriptions.list({
            customer: session.customer as string,
            limit: 1,
          });
          subscriptionId = subscriptions.data[0]?.id || null; // Can be null if no subscription found
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            subscription,
            credits: parseInt(credits || "0", 10),
            subId: subscriptionId,
            subExpireDate,
            billingCycle:
              subscriptionType === "monthly"
                ? BillingCycle.monthly
                : BillingCycle.yearly,
          },
        });
      }
      break;
    }

    case "invoice.payment_succeeded": {
      console.log("success payment renew");
      const invoice = event.data.object;
      let subscriptionId = invoice.subscription;

      // If subscriptionId is not in the event, retrieve it from the invoice
      if (!subscriptionId) {
        const invoiceDetails = await stripe.invoices.retrieve(invoice.id);
        subscriptionId = invoiceDetails.subscription;
      }

      if (subscriptionId) {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscriptionId as string
        );
        const { userId, subscriptionType, subscription, credits } =
          stripeSubscription.metadata || {};

        if (userId && subscriptionType && subscription) {
          const monthsToAdd = subscriptionType === "year" ? 12 : 1;
          const subExpireDate = new Date();
          subExpireDate.setMonth(subExpireDate.getMonth() + monthsToAdd);

          await prisma.user.update({
            where: { id: userId },
            data: {
              subscription,
              subId: subscriptionId as string,
              credits: parseInt(credits || "0", 10),
              subExpireDate,
              billingCycle:
                subscriptionType === "monthly"
                  ? BillingCycle.monthly
                  : BillingCycle.yearly,
            },
          });
        }
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const subscriptionId = invoice.subscription as string;

      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const userId = subscription.metadata?.userId;

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscription: "Free",
              credits: 0,
            },
          });
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            subscription: "Free",
            credits: 0,
            subId: null,
            subExpireDate: null,
          },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
