import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "./component/Navbar";
import { Toaster } from "@/components/ui/toaster"


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <div className="flex  flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}