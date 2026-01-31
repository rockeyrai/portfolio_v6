"use client";

import EventList from "@/section/events/events";
import Experience from "@/section/experience";
import HeroOne from "@/section/hero";
import ProjectList from "@/section/projectlist/projectlist";
import TeachStach from "@/section/techStach";
import GeminiSvg from "../../public/techsvg/gemini";
export default function ThemeSwitcher() {
  return (
    <div className="bg-bg text-text">
      <HeroOne />
      <Experience />
      <TeachStach />
      <ProjectList />
      <EventList />
    </div>
  );
}
