'use client'

import { useAdminCustomQuery } from "medusa-react";
import useAdminSession from "@/lib/useAdminSession";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, isLoading: isUserLoading } = useAdminSession();
console.log(user);
  const {
    data: userStoresData,
    isLoading: isLoadingUserStores,
    error: userStoresError,
  } = useAdminCustomQuery(
    `admin/fetch_user_stores/` + user?.id,
    [`userStores`],
  );

  

  if (isUserLoading || isLoadingUserStores) {
    return <div>Loading...</div>;
  }

  if (userStoresError) {
    return <div>Error fetching user stores: {userStoresError.message}</div>;
  }

  const userStores = userStoresData?.stores || [];
  console.log("User ID : ",user?.id)
  console.log("User stores : ",userStores)
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {userStores.map((store) => (
        <Card key={store.id} className="w-full">
          <CardHeader>
            <CardTitle>{store.name}</CardTitle>
            <CardDescription>Launched on {new Date(store.created_at).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add store details or other content here */}
            <p>ID: {store.id}</p>
            <p>Currency: {store.default_currency_code}</p>
            <p>Domain: {store.domain || "N/A"}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Store</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}