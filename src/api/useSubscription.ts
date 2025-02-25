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

export const useCancelSubscription = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.subscriptions)[":subId"]["$delete"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.subscriptions)[":subId"]["$delete"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["cancel-subscription"],
    mutationFn: async (data) => {
      const response = await client.api.subscriptions[":subId"]["$delete"](
        data
      );
      return await response.json();
    },
  });

  return mutation;
};
