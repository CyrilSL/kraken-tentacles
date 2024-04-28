// utils/useUserStores.js
import { useAdminCustomQuery } from "medusa-react";

export const useUserStores = (userId) => {
  const { data, isLoading } = useAdminCustomQuery(
    `/admin/fetch_user_stores?userId=${userId}`,
    [],
  );

  return { stores: data?.stores, isLoading };
};