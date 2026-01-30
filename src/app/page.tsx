"use client";

import EventList from "@/section/events/events";
import Experience from "@/section/experience";
import HeroOne from "@/section/hero";
import ProjectList from "@/section/projectlist/projectlist";
import TeachStach from "@/section/techStach";
import { api } from "@/lib/api";
import { useEffect } from "react";
export default function ThemeSwitcher() {

useEffect(() => {
  async function loadImages() {
    try {
      const images = await api.getImages("gallery");
      console.log("images dat",images)
    } catch (err) {
      console.error(err.message);
    }
  }

  loadImages();
}, []);


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
