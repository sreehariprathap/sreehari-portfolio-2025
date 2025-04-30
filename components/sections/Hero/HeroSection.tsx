"use client";

import Hero from "@/components/Hero";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";

export default function HeroSection() {
  return (
    <div className="lg:w-1/2 h-screen lg:sticky top-0 left-0 overflow-hidden">
      <HeroHighlight>
        <Hero />
      </HeroHighlight>
    </div>
  );
}