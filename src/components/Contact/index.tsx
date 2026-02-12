"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import styles from "./contactbtn.module.css";
import { CircleArrowRight } from "lucide-react";
import ContactForm from "../contactform";

const MainContactBtn = () => {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  // Memoized scroll handler
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const isScrollable = menu.scrollHeight > menu.clientHeight;

    if (!isScrollable) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const isAtTop = menu.scrollTop === 0;
    const isAtBottom = Math.abs(menu.scrollHeight - menu.clientHeight - menu.scrollTop) < 1;

    if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
      e.preventDefault();
    }

    e.stopPropagation();
  }, []);

  // Memoized touch handler
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.stopPropagation();
  }, []);

  // Manage scroll prevention
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;

    menu.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    menu.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    document.body.style.overflow = 'hidden';

    return () => {
      menu.removeEventListener('wheel', handleWheel, { capture: true });
      menu.removeEventListener('touchmove', handleTouchMove, { capture: true });
      document.body.style.overflow = '';
    };
  }, [isOpen, handleWheel, handleTouchMove]);

  // Memoized click handler
  const handleClick = useCallback(() => {
    if (!arrowRef.current || !menuRef.current || !contentRef.current) return;

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
      const content = contentRef.current;
      const maxHeight = window.innerHeight * 0.95;
      const maxWidth = window.innerWidth * 0.98;

      // Render 3D model before opening
      setShouldRender3D(true);

      // Set initial state
      gsap.set(menu, {
        width: window.innerWidth * 0.05,
        height: window.innerHeight * 0.05,
        borderRadius: "4em",
        pointerEvents: "auto",
      });

      gsap.set(content, {
        opacity: 0,
      });

      // Create timeline for coordinated animations
      const tl = gsap.timeline();

      // Expand menu
      tl.to(menu, {
        height: maxHeight,
        width: maxWidth,
        borderRadius: "2em",
        duration: 1.5,
        ease: "power1.inOut",
      }, 0);

      // Fade in content with delay
      tl.to(content, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, 0.5); // Start fading in halfway through the expansion

    } else {
      const menu = menuRef.current;
      const content = contentRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = "none";
          }
          // Unmount 3D model after closing animation completes
          setShouldRender3D(false);
        }
      });

      // Fade out content first
      tl.to(content, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 0);

      // Then collapse menu
      tl.to(menu, {
        width: window.innerWidth * 0.05,
        height: window.innerHeight * 0.05,
        borderRadius: "4em",
        duration: 1.2,
        ease: "power1.inOut",
        pointerEvents: "none",
      }, 0.3); // Start collapsing while fade out is happening
    }
  }, [isOpen]);

  return (
    <>
      <div 
        ref={menuRef} 
        className={`${styles.contactmenu} ${
          isOpen ? styles.contactmenuOpen : styles.contactmenuClose
        }`}
      >
        <div ref={contentRef} style={{ opacity: 0, height: '100%', width: '100%' }}>
          <ContactForm isOpen={isOpen} shouldRender3D={shouldRender3D} />
        </div>
      </div>
      <div
        className={`${styles.hero1MenuHeroBtn} ${
          isOpen ? styles.hero1MenuHeroBtnOpen : styles.hero1MenuHeroBtnClose
        }`}
      >
        <button 
          className={styles.hero1Btn} 
          onClick={handleClick}
          aria-label={isOpen ? "Close contact form" : "Open contact form"}
        >
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