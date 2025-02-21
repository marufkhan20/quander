import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define the secret used to sign JWTs (use your NextAuth secret here)
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("pathname", pathname);

  // Skip authentication for certain paths
  const excludedPaths = [
    "/api/auth",
    "/api/videos",
    "/api/webhook",
    /^\/api\/videos\/.*/,
    "/api/profile",
    "/api/characters",
  ];
  if (
    excludedPaths.some((path) =>
      typeof path === "string" ? pathname.startsWith(path) : path.test(pathname)
    )
  ) {
    return NextResponse.next(); // If matched, proceed without authentication
  }

  // Extract the cookies from the request headers
  const cookie = req.headers.get("cookie");
  // console.log('cookie', cookie);
  if (!cookie) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Find the session token from the cookie
  const sessionToken = cookie
    .split(";")
    .find((cookieItem) =>
      cookieItem.trim().startsWith("next-auth.session-token=")
    )
    ?.split("=")[1];

  if (!sessionToken) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Verify the JWT token using the secret

    await getToken({ req, secret });
    // const decoded = jwt.verify(sessionToken, secret || '');

    // console.log('decoded session', decoded);

    // If the request is authenticated, continue to the API route
    return NextResponse.next();
  } catch (err) {
    console.log("JWT verification failed", err);
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  matcher: ["/api/:path*"], // Apply middleware to all API routes
};
