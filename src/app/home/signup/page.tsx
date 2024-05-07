"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/aurora-background";
import { SignupForm } from "@/components/signup";

export default function Homepage() {
  return (
   
    <AuroraBackground className="">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
       <SignupForm />
      </motion.div>
    </AuroraBackground>

  );
}
