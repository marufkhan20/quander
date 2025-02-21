import prisma from "@/app/server/db/prisma";
import { User } from "@prisma/client";

export class UserService {
  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async createUser(
    email: string,
    emailVerified: boolean,
    name?: string | null,
    image?: string | null,
    description?: string | null,
    videoTime?: string | null,
    creditValue?: string | null,
    subscription?: string
  ): Promise<User | null> {
    return await prisma.user.create({
      data: {
        email,
        name,
        image,
        emailVerified: emailVerified ? Date.now().toString() : null,
        description,
        videoTime,
        creditValue,
        subscription,
      },
    });
  }
}
