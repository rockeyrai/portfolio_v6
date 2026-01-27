"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./contactbtn.module.css";
import { ArrowRight } from "lucide-react";

const MainContactBtn = () => {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const [label, setLabel] = useState("Contact");

  // Arrow entrance animation
  useEffect(() => {
    if (!arrowRef.current) return;

    gsap.fromTo(
      arrowRef.current,
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
    );
  }, []);

  const handleClick = () => {
    if (!arrowRef.current) return;

    // Change text
    setLabel("Send");

    // Animate arrow FROM LEFT on click
    gsap.fromTo(
      arrowRef.current,
      {
        x: -20,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  };
  const handleMouseEnter = () => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current, {
      x: 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className={styles.hero1MenuHeroBtn}>
      <button
        className={styles.hero1Btn}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.hero1BtnLabel}>
          <span>{label}</span>
        </div>

        <div className={styles.hero1BtnIcon}>
          <ArrowRight ref={arrowRef} className={styles.hero1MenuSharp} />
        </div>
      </button>
    </div>
  );
};

export default MainContactBtn;
