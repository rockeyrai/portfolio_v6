"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import styles from "./contactbtn.module.css";
import { CircleArrowRight } from "lucide-react";
import ContactForm from "../contactform";

const MainContactBtn = (isUnder: boolean) => {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll propagation when contact form is open
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isOpen && menuRef.current) {
        const menu = menuRef.current;
        const isScrollable = menu.scrollHeight > menu.clientHeight;
        
        if (!isScrollable) {
          // If content isn't scrollable, block all scroll
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        const isAtTop = menu.scrollTop === 0;
        const isAtBottom = Math.abs(menu.scrollHeight - menu.clientHeight - menu.scrollTop) < 1;
        
        // Prevent scrolling past boundaries
        if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
          e.preventDefault();
        }
        
        // Always stop propagation to prevent background scroll
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isOpen && menuRef.current) {
        // Allow scrolling within the contact form but prevent body scroll
        e.stopPropagation();
      }
    };

    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      
      // Use capture phase to intercept events before they reach Lenis
      menu.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      menu.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

      // Disable body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        menu.removeEventListener('wheel', handleWheel, { capture: true });
        menu.removeEventListener('touchmove', handleTouchMove, { capture: true });
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

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

      const maxHeight = window.innerHeight * 0.95;
      const maxWidth = window.innerWidth * 0.98;

      // Set initial state
      gsap.set(menuRef.current, {
        width: window.innerWidth * 0.05,
        height: window.innerHeight * 0.05,
        borderRadius: "4em",
        pointerEvents: "auto", // Enable immediately to capture events
      });

      const tl = gsap.timeline({
        defaults: {
          duration: 1.5,
          ease: "power1.inOut",
        },
      });

      tl.to(
        menu,
        {
          height: maxHeight,
          width: maxWidth,
          borderRadius: "2em",
          pointerEvents: "auto",
        },
        0,
      );
    } else {
      gsap.to(menuRef.current, {
        width: window.innerWidth * 0.05,
        height: window.innerHeight * 0.05,
        borderRadius: "4em",
        duration: 1.5,
        ease: "power1.inOut",
        pointerEvents: "none",
        onComplete: () => {
          // Ensure pointer events are disabled after animation
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = "none";
          }
        },
      });
    }
  };

  return (
    <>
      <div ref={menuRef} className={`${styles.contactmenu} ${
          isOpen ? styles.contactmenuOpen : styles.contactmenuClose
        }`}>
          <ContactForm/>
        </div>
      <div
        className={`${styles.hero1MenuHeroBtn} ${
          isOpen ? styles.hero1MenuHeroBtnOpen : styles.hero1MenuHeroBtnClose
        }`}
      >
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
