import React from "react"
import Homepage from "./homepage"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"
//import NavbarHome from './components/Navbar'NavigationMenuHome
//import { MedusaProvider } from 'medusa-react'
import { HowItWorks } from "@/components/HowItWorks"
//import { Hero } from "@/components/Hero";
import { Hero } from "@/components/Hero"
//import './App.css'
import { Pricing } from "@/components/Pricing"
import { FAQ } from "@/components/FAQ"

export default function page() {
  return (
    <>
    <Navbar />
    
    <div className="relative flex flex-col items-center  bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg">
    <Hero />  
      {/* <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
        Kraken Store!
      </div>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        Comin Soon!{" "}
      </div>
      <Link href="/signup">
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Get Your Own Spike Now!
        </button>
      </Link> */}
      <HowItWorks />
      {/* <Pricing /> */}
      <Pricing />
      <FAQ />
    </div>
    
    </>
  )
}
