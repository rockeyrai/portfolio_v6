"use client";

import Experience from "@/section/experience";
import HeroOne from "@/section/hero";
import TeachStach from "@/section/techStach";

export default function ThemeSwitcher() {

  return (
    <div className="bg-bg text-text">

      <HeroOne/>
      <Experience/>
      <TeachStach/>
      <div className="h-screen bg-amber-300"/>
    </div>
  );
}
