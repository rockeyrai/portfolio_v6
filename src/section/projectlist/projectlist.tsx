"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectList.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Cultural Lens",
    description:
      "Cultural Lens is a cross-platform PWA that allows users to scan sculptures and artifacts to instantly discover their historical context, origin, and cultural significance. Built for the IBM Xplore 2026 Hackathon under the Culture theme, the platform leverages TensorFlow for image recognition and Supabase for real-time data handling. Users can also showcase and sell sculptures they create through an integrated mini-marketplace, bridging heritage preservation with modern digital commerce.",
    image: "/project/project1.webp",
  },
  {
    title: "Portfolio Nepal",
    description:
      "Portfolio Nepal is a comprehensive portfolio management web application designed for individuals and families. A single user can manage multiple family portfolios with automated stock syncing, eliminating manual data entry. The platform supports bulk alerts, weekly performance reports, and diversified asset tracking including stocks, gold, and silver—making long-term financial planning simple and transparent.",
    image: "/project/project2.webp",
  },
  {
    title: "Nordes",
    description:
      "Nordes is a marine services website developed for a Finland-based client, showcasing boat manufacturing, marine architecture, and related services. The platform uses Contentful as a headless CMS for dynamic content updates and Nodemailer for customer inquiries and service requests, ensuring smooth communication and easy content management for non-technical users.",
    image: "/project/project3.webp",
  },
  {
    title: "Sikshyalaya",
    description:
      "Sikshyalaya is a complete school management system that digitizes academic and administrative workflows. It manages student records, class schedules, teacher assignments, homework tracking, and academic performance in one centralized platform. The system improves coordination between teachers and students while reducing manual overhead for school administrators.",
    image: "/project/project4.webp",
  },
  {
    title: "Rai Restaurant",
    description:
      "Rai Restaurant is a real-time restaurant management system built to streamline operations and improve efficiency. Powered by Socket.IO, the platform enables live updates for orders, table status, and kitchen workflows, ensuring instant synchronization across staff devices and reducing operational delays.",
    image: "/project/project5.webp",
  },
];

const ProjectList: React.FC = () => {
  // Store ScrollTriggers for cleanup
  const triggers = React.useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const services = gsap.utils.toArray<HTMLElement>(`.${styles.service}`);

    if (!services.length) return;

    services.forEach((service, index) => {
      const imgContainer = service.querySelector(`.${styles.img}`);
      if (!imgContainer) return;

      const st1 = ScrollTrigger.create({
        trigger: service,
        start: `top ${70 - index * 15}%`,
        end: "bottom 40%",
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
          let progress = self.progress;
          let newWidth = 30 + 70 * progress;
          gsap.to(imgContainer, {
            width: newWidth + "%",
            duration: 0.1,
            ease: "none",
          });
        },
      });
      triggers.current.push(st1);

      const st2 = ScrollTrigger.create({
        trigger: service,
        start: `top ${70 - index * 15}%`,
        end: "bottom 40%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newHeight = 150 + 300 * progress;

          gsap.to(service, {
            height: `${newHeight}px`,
            duration: 0.1,
            ease: "none",
          });
        },
      });
      triggers.current.push(st2);
    });

    return () => {
      triggers.current.forEach((st) => st.kill());
      triggers.current = [];
    };
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.services}>
        <div className={styles.serviceHeader}>
            <h1>Project List</h1>
        </div>
        {projects.map((project, idx) => (
          <div key={idx} className={styles.service}>
            <div className={styles.serviceInfo}>
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </div>

            <div className={styles.serviceImg}>
              <div className={styles.img}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProjectList;
