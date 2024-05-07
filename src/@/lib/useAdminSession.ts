import { useAdminGetSession } from "medusa-react"


const useAdminSession = () => {
  const { user, isLoading } = useAdminGetSession()

  return { user, isLoading };
};

export default useAdminSession;
