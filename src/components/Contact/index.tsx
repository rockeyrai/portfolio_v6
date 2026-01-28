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
      ease: "power1.out",
    });

    if (newIsOpen) {
      const menu = menuRef.current;

      const maxHeight =window.innerHeight * 0.94

      const maxWidth = window.innerWidth * 0.98
    

      gsap.to(menu, {
        height: maxHeight,
        width: maxWidth,
        duration: 1.3,
        ease: "power1.inOut",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        width: 120, // collapse back
        duration: 1.3,
        ease: "power1.inOut",
        pointerEvents: "none",
      });
    }
  };

  return (
    <>
      <div ref={menuRef} className={styles.contactmenu}>

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
