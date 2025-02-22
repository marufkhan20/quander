/* eslint-disable @next/next/no-img-element */
"use client";

import {
  useGetNotifications,
  useUpdateNotification,
} from "@/api/useNotification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, timeAgo } from "@/lib/utils";
import { Bell, Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Notifications() {
  const { data: session } = useSession();
  const router = useRouter();
  const [allRead, setAllRead] = useState(true);

  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotifications({
    creatorId: session?.user?.id || "",
    queryKey: `get-notifications-${session?.user?.id}`,
  });

  useEffect(() => {
    if (notifications) {
      const allRead = notifications.every((notification) => notification.read);

      setAllRead(allRead);
    }
  }, [notifications]);

  // read notification
  const { mutate: readNotification, isSuccess } = useUpdateNotification();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const handleRedirect = (id: string, link: string) => {
    readNotification({
      param: { id },
      json: {
        read: true,
      },
    });

    router.push(link);
  };
  return (
    <div className="hidden lg:flex items-center justify-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none">
          <button className="hidden lg:flex size-[46px] bg-white/5 rounded-[8px] items-center justify-center cursor-pointer bg-nav-item transition-all relative">
            <Bell className="size-[18px] text-primary" />
            {!allRead && (
              <div className="absolute size-[6px] rounded-full top-2 right-2 bg-[#df3840]" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[380px] bg-[#141414] border-slate-800 text-slate-100 mt-3"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Notifications</p>
              <button className="text-xs text-primary hover:underline">
                Mark all as read
              </button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-800" />
          <DropdownMenuGroup className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600">
            {notifications?.map((item) => {
              const { id, title, image, icon, read, createdAt, link } =
                item || {};

              return (
                <DropdownMenuItem
                  key={id}
                  className={cn(
                    "flex items-start gap-3 p-4 focus:bg-slate-800 focus:text-slate-100 cursor-pointer",
                    read ? "text-slate-400" : "bg-white/5"
                  )}
                  onClick={() => handleRedirect(id, link || "/")}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="User avatar"
                      className="rounded-full size-10 object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="rounded-full size-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <p className={cn("text-sm", read && "text-slate-400")}>
                      {title}
                    </p>
                    <p
                      className={cn(
                        "text-xs",
                        read ? "text-slate-500" : "text-slate-400"
                      )}
                    >
                      {timeAgo(new Date(createdAt))}
                    </p>
                  </div>

                  <button
                    className={cn(
                      "rounded-full p-1",
                      read ? "text-slate-500 hover:bg-white/10" : "text-primary"
                    )}
                  >
                    {read ? (
                      <Check className="size-4" />
                    ) : (
                      <X className="size-4" />
                    )}
                  </button>
                </DropdownMenuItem>
              );
            })}

            {!isLoading && notifications?.length === 0 && (
              <p className="py-3 px-2 text-sm">No notification found!</p>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-800" />
          <DropdownMenuItem className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer p-4">
            <button className="text-sm text-center w-full text-primary hover:underline">
              View all notifications
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
