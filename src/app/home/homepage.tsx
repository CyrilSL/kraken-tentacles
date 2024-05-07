"use client";

import React from "react";
import Link from "next/link";
export default function Homepage() {
  return (
    <div>
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Kraken Store!
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
Comin Soon!        </div>
<Link href="/signup">        
<button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
         Get Your Own Spike Now!
        </button>
        </Link>

      </div>
  
  );
}
