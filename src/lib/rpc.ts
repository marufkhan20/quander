import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const baseUrl = "http://localhost:3000";

export const client = hc<AppType>(baseUrl);
