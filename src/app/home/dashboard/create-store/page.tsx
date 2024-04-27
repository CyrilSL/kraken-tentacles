'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminCustomPost } from "medusa-react";
import useAdminSession from "@/lib/useAdminSession";

export default function CreateStoreCard() {
  const [name, setName] = React.useState("");
  const [theme, setTheme] = React.useState("");
  const customPost = useAdminCustomPost<
    { userId: string; storeDetails: { name: string; theme: string } },
    { message: string; store: any }
  >("/admin/create_store", ["stores"]);
  const { user, isLoading: isUserLoading } = useAdminSession();

  const handleDeploy = () => {
    if (isUserLoading) return; // Wait for user data to be loaded

    customPost.mutate(
      {
        userId: user?.id || 'No User ID Retrieved',
        storeDetails: { name, theme },
      },
      {
        onSuccess: ({ message, store }) => {
          console.log(message);
          console.log(store);
        },
      }
    );
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Store</CardTitle>
          <CardDescription>Deploy your new Store in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your Store"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Theme</Label>
                <Select
                  value={theme}
                  onValueChange={(value) => setTheme(value)}
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="prime">Prime</SelectItem>
                    <SelectItem value="fun">Fun</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="radical">Radical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleDeploy} disabled={customPost.isLoading || isUserLoading}>
            {customPost.isLoading || isUserLoading ? "Loading..." : "Deploy"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}