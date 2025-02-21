import { ServiceProvider } from "@/app/server/services/ServiceProvider";
import { Config } from "@/lib/Config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: Config.GOOGLE_CLIENT_ID,
      clientSecret: Config.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // 'lax' should work for most cases.
        path: "/",
        domain:
          process.env.NODE_ENV === "development" ? undefined : ".quander.co",
      },
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const userService = ServiceProvider.getUserService();
      try {
        console.log("user", user);
        if (!user.email) {
          console.error("User email is undefined during sign-in");
          return false;
        }
        const userDb = await userService.getUserByEmail(user.email);
        const emailVerified = account?.email_verified ? true : false;
        if (!userDb) {
          const newUser = await userService.createUser(
            user.email,
            emailVerified,
            user.name,
            user.image,
            "",
            "0m",
            "0",
            "Free"
          );
          user.id = newUser?.id || user.id; // Set the new user's id
        } else {
          user.id = userDb.id; // Use the existing user's id
        }

        return true;
      } catch (error) {
        console.log("hello");
        console.error("Error during sign-in:", error);
        return false;
      }
    },

    // Add id to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Assuming user has an id property
      }
      return token;
    },

    // Pass the id to the session object
    async session({ session, token }) {
      // Add the id from token to session.user
      if (token.id) {
        if (session?.user) {
          session.user.id = token.id as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
});
export { handler as GET, handler as POST };
