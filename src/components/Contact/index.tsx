"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import styles from "./contactbtn.module.css";
import { CircleArrowRight } from "lucide-react";

const MainContactBtn = () => {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!arrowRef.current || !menuRef.current) return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // Arrow animation
    gsap.to(arrowRef.current, {
      rotate: newIsOpen ? 0 : -45,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (newIsOpen) {
      // Open menu animation
      gsap.fromTo(
        menuRef.current,
        {
          scale: 0,
          opacity: 0,
          xPercent: -50, // This replaces translateX(-50%)
        },
        {
          scale: 5,
          opacity: 1,
          xPercent: -50, // Keep it centered during animation
          duration: 0.5,
          ease: "back.out(1.4)",
          overwrite: "auto",
        },
      );
    } else {
      // Close menu animation
      gsap.to(menuRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        xPercent: -50, // Maintain the center during the exit
        ease: "power3.in",
        overwrite: "auto",
      });
    }
  };

  return (
    <>
      <div ref={menuRef} className={styles.contactmenu}>
        <h1>test</h1>
        <p>test2</p>
      </div>
      <div className={styles.hero1MenuHeroBtn}>
        <button className={styles.hero1Btn} onClick={handleClick}>
          <span className={styles.hero1BtnLabel}>Contact</span>
          <CircleArrowRight
            ref={arrowRef}
            strokeWidth={1.2}
            className={styles.hero1BtnIcon}
          />
        </button>
      </div>
    </>
  );
};

export default MainContactBtn;
