'use client'
import React, { useState, useEffect } from 'react';
import { useAdminStore } from "medusa-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"

type Props = {
  userId: string
}


const StoreDetails = () => {
    const { 
        store,
        isLoading
      } = useAdminStore();


      console.log(store);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Hello! </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management
                and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            
          </Card>
          
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
       
        </div>
      </main>
      <h2>Admin Store Data</h2>
      {/* Display your store data here */}
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};

export default StoreDetails;
