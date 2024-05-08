'use client'
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAdminStore, useAdminCustomPost } from "medusa-react"

type DomainUpdateRequest = {
  storeId: string;
  domain: string;
};

type DomainUpdateResponse = {
  message: string;
};

export default function Settings() {
  const [domainName, setDomainName] = useState("");
  const { store, isLoading } = useAdminStore();
  const { toast } = useToast();
  const cleanURL = (url) => {
    return url.replace(/(^\w+:|^)\/\//, "");
  };

  const updateDomain = useAdminCustomPost<DomainUpdateRequest, DomainUpdateResponse>(
    "/admin/add_domain",
    ["updateDomain"]
  );

  const handleDomainNameChange = (e) => {
    setDomainName(e.target.value);
  };

  const handleUpdateDomain = () => {
    if (store?.id && domainName) {
      updateDomain.mutate(
        {
          storeId: store.id,
          domain: domainName,
        },
        {
          onSuccess: () => {
            toast({
              title: "Domain updated successfully!",
              description: `Visit your new store at ${domainName}.${cleanURL(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL)}`,
            });
          },
          onError: (error) => {
            console.error("Failed to update domain:", error);
            toast({
              title: "Error",
              description: "Failed to update domain. Please try again.",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      console.error("Missing required values: storeId or domain");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Subdomain Name</CardTitle>
                <CardDescription>
                  Set your unique domain name.
                  <br></br>
                  your-domain.{cleanURL(process.env.NEXT_PUBLIC_BASE_URL)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Enter your domain"
                    value={domainName}
                    onChange={handleDomainNameChange}
                  />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleUpdateDomain}>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}