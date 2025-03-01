import { client } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useGetChallenges = () => {
  type ResponseType = InferResponseType<(typeof client.api.challenges)["$get"]>;

  const mutation = useQuery<ResponseType, Error>({
    queryKey: ["get-challenges"],
    queryFn: async () => {
      const response = await client.api.challenges["$get"]();
      return await response.json();
    },
  });

  return mutation;
};

export const useGetChallenge = ({ id }: { id: string }) => {
  type ResponseType = InferResponseType<
    (typeof client.api.challenges)[":id"]["$get"]
  >;

  const mutation = useQuery<ResponseType, Error>({
    queryKey: ["get-challenge", id],
    queryFn: async () => {
      const response = await client.api.challenges[":id"]["$get"]({
        param: { id },
      });
      return await response.json();
    },
  });

  return mutation;
};

export const useUpdateCharacter = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.characters)[":id"]["$put"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.characters)[":id"]["$put"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["update-character"],
    mutationFn: async (data) => {
      const response = await client.api.characters[":id"]["$put"](data);
      return await response.json();
    },
  });

  return mutation;
};

export const useDeleteCharacter = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.characters)[":id"]["$delete"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.characters)[":id"]["$delete"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["delete-video"],
    mutationFn: async (data) => {
      const response = await client.api.characters[":id"]["$delete"](data);
      return await response.json();
    },
  });

  return mutation;
};
