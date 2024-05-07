import { useAdminCustomPost } from "medusa-react";

export const useCreateStore = () => {
  const customPost = useAdminCustomPost<{ userId: string }, { success: boolean }>(
    "/admin/create_store",
    ["stores"]
  );

  const createStore = (userId) => {
    return customPost.mutate(
      { userId },
      {
        onSuccess: ({ success }) => {
          console.log(`Store creation ${success ? "successful" : "failed"}`);
        },
      }
    );
  };

  return { createStore, isLoading: customPost.isLoading };
};