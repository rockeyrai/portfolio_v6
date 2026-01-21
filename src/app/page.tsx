"use client";

import Menu from "@/components/MainMenu";
import HeroOne from "@/section/hero";

export default function ThemeSwitcher() {

  return (
    <div className="bg-bg text-text">

      <Menu />
      <HeroOne/>
      <div className="h-screen bg-amber-600"/>
    </div>
  );
}
