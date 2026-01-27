"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import styles from "./contactbtn.module.css";
import { CircleArrowRight } from "lucide-react";

const MainContactBtn = () => {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const rotated = useRef(true);

  const handleClick = () => {
    if (!arrowRef.current) return;

    rotated.current = !rotated.current;

    gsap.to(arrowRef.current, {
      rotate: rotated.current ? -45 : 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
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
  );
};

export default MainContactBtn;
