import prisma from "../db/prisma";

type Notification = {
  title: string;
  creatorId: string;
  icon: string | null;
  read?: boolean;
  image: string | null;
  link?: string | null;
};

export const createNotification = async ({
  creatorId,
  title,
  image,
  icon,
  link,
  read,
}: Notification) => {
  const notification = await prisma.notification.create({
    data: {
      creatorId,
      title,
      image,
      icon,
      link,
      read,
    },
  });

  return notification;
};
