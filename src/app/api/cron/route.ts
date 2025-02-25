import prisma from "@/app/server/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    where: { billingCycle: "yearly" },
    select: { id: true, subscription: true }, // Select only necessary fields
  });

  // Update users based on their subscription type
  for (const user of users) {
    let newCredits = 0;

    switch (user.subscription) {
      case "basic":
        newCredits = 100;
        break;
      case "standard":
        newCredits = 200;
        break;
      case "premium":
        newCredits = 300;
        break;
    }

    // Update credits for each user
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: newCredits },
    });
  }

  return NextResponse.json({ ok: true });
}
