import { client } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useGetNotifications = ({
  queryKey,
  creatorId,
}: {
  creatorId: string;
  queryKey: string;
}) => {
  type ResponseType = InferResponseType<
    (typeof client.api.notifications)[":creatorId"]["$get"]
  >;

  const mutation = useQuery<ResponseType, Error>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await client.api.notifications[":creatorId"]["$get"]({
        param: { creatorId },
      });
      return await response.json();
    },
  });

  return mutation;
};

export const useUpdateNotification = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.notifications)[":id"]["$put"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.notifications)[":id"]["$put"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["update-notification"],
    mutationFn: async (data) => {
      const response = await client.api.notifications[":id"]["$put"](data);
      return await response.json();
    },
  });

  return mutation;
};

export const useDeleteNotification = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.notifications)[":id"]["$delete"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.notifications)[":id"]["$delete"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["delete-notification"],
    mutationFn: async (data) => {
      const response = await client.api.notifications[":id"]["$delete"](data);
      return await response.json();
    },
  });

  return mutation;
};
