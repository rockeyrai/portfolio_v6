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
  const btnRef = useRef<HTMLDivElement | null>(null);
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
    const isAtBottom =
      Math.abs(menu.scrollHeight - menu.clientHeight - menu.scrollTop) < 1;

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

    menu.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    menu.addEventListener("touchmove", handleTouchMove, {
      passive: false,
      capture: true,
    });
    document.body.style.overflow = "hidden";

    return () => {
      menu.removeEventListener("wheel", handleWheel, { capture: true });
      menu.removeEventListener("touchmove", handleTouchMove, { capture: true });
      document.body.style.overflow = "";
    };
  }, [isOpen, handleWheel, handleTouchMove]);

  // Memoized click handler
  const handleClick = useCallback(() => {
    if (
      !arrowRef.current ||
      !menuRef.current ||
      !contentRef.current ||
      !btnRef.current
    )
      return;

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    gsap.to(arrowRef.current, {
      rotate: newIsOpen ? 0 : -45,
      duration: 0.45,
      ease: "power1.out",
    });

    // Get the real button dimensions
    const btnRect = btnRef.current.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    const isMobile = window.innerWidth < 700; // or your breakpoint

    if (newIsOpen) {
      const menu = menuRef.current;
      const content = contentRef.current;

      const maxHeight = window.innerHeight * (isMobile ? 0.97 : 0.95);
      const maxWidth = window.innerWidth * (isMobile ? 0.95 : 0.985);

      setShouldRender3D(true);

      // ✅ Use button's actual dimensions instead of screen ratios
      gsap.set(menu, {
        width: btnWidth,
        height: btnHeight,
        borderRadius: "4em",
        pointerEvents: "auto",
      });

      gsap.set(content, { opacity: 0 });

      const tl = gsap.timeline();

      tl.to(
        menu,
        {
          height: maxHeight,
          width: maxWidth,
          borderRadius: "2em",
          duration: 1.5,
          ease: "power1.inOut",
        },
        0,
      );

      tl.to(
        content,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.5,
      );
    } else {
      const menu = menuRef.current;
      const content = contentRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.pointerEvents = "none";
          }
          setShouldRender3D(false);
        },
      });

      tl.to(
        content,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        0,
      );

      // ✅ Collapse back to button's actual dimensions
      tl.to(
        menu,
        {
          width: btnWidth,
          height: btnHeight,
          borderRadius: "4em",
          duration: 1.2,
          ease: "power1.inOut",
          pointerEvents: "none",
        },
        0.3,
      );
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
        <div
          ref={contentRef}
          style={{ opacity: 0, height: "100%", width: "100%" }}
        >
          <ContactForm isOpen={isOpen} shouldRender3D={shouldRender3D} />
        </div>
      </div>
      <div
        ref={btnRef}
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
