import { client } from "@/lib/rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

export const useGetVideo = ({
  queryKey,
  id,
}: {
  id: string;
  queryKey: string;
}) => {
  type ResponseType = InferResponseType<
    (typeof client.api.videos)[":id"]["$get"]
  >;

  const mutation = useQuery<ResponseType, Error>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await client.api.videos[":id"]["$get"]({
        param: { id },
      });
      return await response.json();
    },
  });

  return mutation;
};

export const useGetVideos = ({
  queryKey,
  orientation,
  type,
  published,
  sort,
  userId,
  limit,
  userInfo,
}: {
  queryKey: string;
  orientation: string;
  type?: string;
  userId?: string;
  sort?: string;
  published?: boolean;
  limit?: number;
  userInfo?: boolean;
}) => {
  type ResponseType = InferResponseType<(typeof client.api.videos)["$get"]>;

  const mutation = useQuery<ResponseType, Error>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await client.api.videos["$get"]({
        query: { orientation, type, published, sort, userId, limit, userInfo },
      });
      return await response.json();
    },
  });

  return mutation;
};

export const useGetRelatedVideos = ({
  queryKey,
  id,
  // sort,
  limit,
}: {
  queryKey: string;
  id: string;
  sort?: string;
  limit?: number;
}) => {
  type ResponseType = InferResponseType<
    (typeof client.api.videos)["related-videos"]["$get"]
  >;

  const mutation = useQuery<ResponseType, Error>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await client.api.videos["related-videos"]["$get"]({
        query: { id, limit },
      });
      return await response.json();
    },
  });

  return mutation;
};

export const useLikeVideo = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.videos)["like-video"][":id"]["$put"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.videos)["like-video"][":id"]["$put"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["like-video"],
    mutationFn: async (data) => {
      const response = await client.api.videos["like-video"][":id"]["$put"](
        data
      );
      return await response.json();
    },
  });

  return mutation;
};

export const useUpdateVideo = () => {
  type ResponseType = InferResponseType<
    (typeof client.api.videos)[":id"]["$put"]
  >;

  type RequestType = InferRequestType<
    (typeof client.api.videos)[":id"]["$put"]
  >;

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["update-video"],
    mutationFn: async (data) => {
      const response = await client.api.videos[":id"]["$put"](data);
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
