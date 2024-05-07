"use client";

import { motion } from "framer-motion";
import React from "react";
import LoginForm from "@/components/login";
export default function Homepage() {
  return (
    <div className="relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg">
       <LoginForm />
       </div>
  );
}
