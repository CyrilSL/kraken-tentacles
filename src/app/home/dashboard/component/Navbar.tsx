import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Plus, Package2, Store, PanelLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard/stores" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <Store className="h-5 w-5" />
                  <span className="sr-only">Your Stores</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Your Stores</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard/create-store" className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Create New Store</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Create New Store</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link href="/dashboard/stores" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
              <Store className="h-5 w-5" />
              Your Stores
            </Link>
            <Link href="/dashboard/create-store" className="flex items-center gap-4 px-2.5 text-foreground">
              <Plus className="h-5 w-5" />
              Create New Store
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;
