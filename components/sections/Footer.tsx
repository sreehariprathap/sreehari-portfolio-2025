"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
      <p>© {new Date().getFullYear()} Sreehari Prathap. All rights reserved.</p>
    </footer>
  );
}