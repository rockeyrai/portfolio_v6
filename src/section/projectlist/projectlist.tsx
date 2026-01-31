"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectList.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

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

    // ------------------------
    // Cleanup
    // ------------------------
    return () => {
      triggers.current.forEach((st) => st.kill());
      triggers.current = [];
    };
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.services}>
        <div className={styles.serviceHeader}>
          <div className={styles.col}>
            <h1>all services</h1>
          </div>
        </div>
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className={styles.service}>
            <div className={styles.serviceInfo}>
              <h1>lore ips</h1>
              <p>lorem ipsum dolor sit amet con</p>
            </div>

            <div className={styles.serviceImg}>
              <div className={styles.img}>
                <Image src="/hero/image1.jpg" alt="service" fill style={{ objectFit: "cover" }} />

              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ProjectList;
