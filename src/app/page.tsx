"use client";

import Experience from "@/section/experience";
import HeroOne from "@/section/hero";
import TeachStach from "@/section/techStach";

export default function ThemeSwitcher() {

  return (
    <div className="bg-bg text-text">
      {/* main hero */}
      <HeroOne/> 
      {/* 2nd my experice           */}
      <Experience/>
      {/* 3rd tech use in projects  */}
      <TeachStach/>
      {/* 4th list of project  */}
      
      {/* 5th cetrificate and events  */}
      <div className="h-screen bg-amber-300"/>
    </div>
  );
}
