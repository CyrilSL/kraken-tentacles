'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "./component/Navbar";
import { Toaster } from "@/components/ui/toaster"
import React from "react"
import { useAdminGetSession } from "medusa-react"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { user, isLoading } = useAdminGetSession()
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter()

  useEffect(() => {
    // Set isLoadingUser to false when the user data is available
    if (!isLoading && (user || !user)) {
      setIsLoadingUser(false);
    }
  }, [isLoading, user]);


  if (isLoadingUser) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
        <Toaster />
      </div>
    </div>
  );
}