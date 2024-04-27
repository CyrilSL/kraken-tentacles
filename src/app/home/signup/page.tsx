"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/aurora-background";
import { SignupForm } from "@/components/signup";

export default function Homepage() {
  return (
   
    <div className="relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg">
       <SignupForm />
     </div>

  );
}
