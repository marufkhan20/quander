/* eslint-disable @typescript-eslint/no-unused-vars */
import characterRoute from "@/app/server/routes/characterRoute";
import commentRoute from "@/app/server/routes/commentRoute";
import notificationRoute from "@/app/server/routes/notificationRoute";
import profileRoute from "@/app/server/routes/profileRoute";
import videoRoute from "@/app/server/routes/videoRoute";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app
  .route("/videos", videoRoute)
  .route("/profile", profileRoute)
  .route("/characters", characterRoute)
  .route("/comments", commentRoute)
  .route("/notifications", notificationRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;
