"use client";

import { CareerTimeline } from "@/components/ui/CareerTimeline";
import { ThemedSection } from "@/components/ui/section-theme-transition/themed-section";
import React from "react";

export default function Career() {
  return (
    <ThemedSection id="career">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto mb-6">
          <CareerTimeline />
        </div>
      </div>
    </ThemedSection>
  );
}