"use client";

import EventList from "@/section/events/feature15";
import Experience from "@/section/experience";
import HeroOne from "@/section/hero";
import ProjectList from "@/section/projectlist/Feature14";
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
      <ProjectList/>
      {/* 5th cetrificate and events  */}
      <EventList/>
    </div>
  );
}
