import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useAddComment = () => {
  type ResponseType = InferResponseType<(typeof client.api.comments)["$post"]>;

  type RequestType = InferRequestType<(typeof client.api.comments)["$post"]>;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["add-comment"],
    mutationFn: async (data) => {
      const response = await client.api.comments["$post"](data);
      return await response.json();
    },
  });

  return mutation;
};

export const useUpdateComment = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.comments)[":id"]["$put"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.comments)[":id"]["$put"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["update-comment"],
    mutationFn: async (data) => {
      const response = await client.api.comments[":id"]["$put"](data);
      return await response.json();
    },
  });

  return mutation;
};

export const useDeleteComment = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.comments)[":id"]["$delete"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.comments)[":id"]["$delete"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["delete-comment"],
    mutationFn: async (data) => {
      const response = await client.api.comments[":id"]["$delete"](data);
      return await response.json();
    },
  });

  return mutation;
};
