import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useBuySubscription = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.subscriptions)["$post"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.subscriptions)["$post"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["buy-subscription"],
    mutationFn: async (data) => {
      const response = await client.api.subscriptions["$post"](data);
      return await response.json();
    },
  });

  return mutation;
};

export const useDeleteVideo = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.videos)[":id"]["$delete"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.videos)[":id"]["$delete"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["delete-video"],
    mutationFn: async (data) => {
      const response = await client.api.videos[":id"]["$delete"](data);
      return await response.json();
    },
  });

  return mutation;
};
