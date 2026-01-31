"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import styles from "./feature.module.css";
import Image from "next/image";

const TeachStach: React.FC = () => {
  const marquees = [
    {
      title: "MY",
      images: [
        "/hero/image2.jpg",
        "/hero/image3.jpg",
        "/hero/image1.jpg",
        "/hero/image5.jpg",
      ],
    },
    {
      title: "TECH",
      images: [
        "/hero/image2.jpg",
        "/hero/image3.jpg",
        "/hero/image1.jpg",
        "/hero/image5.jpg",
      ],
    },
    {
      title: "STACK",
      images: [
        "/hero/image2.jpg",
        "/hero/image3.jpg",
        "/hero/image1.jpg",
        "/hero/image5.jpg",
      ],
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Split all .item h1 into individual chars
    new SplitType(`.${styles.item} h1`, { types: "chars" });

    // Animate character font weight
    const animateChars = (chars: HTMLElement[], reverse = false) => {
      gsap.fromTo(
        chars,
        { fontWeight: 100 },
        {
          fontWeight: 900,
          duration: 1,
          ease: "none",
          stagger: {
            each: 0.35,
            from: reverse ? "start" : "end",
          },
          scrollTrigger: {
            trigger: chars[0].closest(`.${styles["marquee-container"]}`),
            start: "50% bottom",
            end: "top top",
            scrub: true,
          },
        },
      );
    };

    // Animate each marquee container
    const marqueeContainers = document.querySelectorAll(
      `.${styles["marquee-container"]}`,
    );

    marqueeContainers.forEach((container, index) => {
      const marquee = container.querySelector(`.${styles.marquee}`);
      const words = marquee?.querySelectorAll(`.${styles.item} h1`);

      const moveRight = index % 2 === 0;

      // how far content can safely move without showing gaps
      const START_OFFSET = 6; // tweak 6–12
      const MOVE_DISTANCE = 10;

      gsap.fromTo(
        marquee,
        {
          xPercent: moveRight ? -START_OFFSET : START_OFFSET,
        },
        {
          xPercent: moveRight
            ? -START_OFFSET + MOVE_DISTANCE
            : START_OFFSET - MOVE_DISTANCE,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "150% top",
            scrub: true,
          },
        },
      );

      words?.forEach((word) => {
        const chars = Array.from(word.querySelectorAll(".char"));
        if (chars.length) {
          const reverse = index % 2 !== 0;
          animateChars(chars as HTMLElement[], reverse);
        }
      });
    });

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-ignore
      smooth: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className={styles.containers}>
      <section className={`${styles.marquees} ${styles.section}`}>
        {marquees.map((marqueeData, index) => {
          const moveRight = index % 2 === 0;
          const { title, images } = marqueeData;

          const beforeImages = moveRight
            ? images.slice(0, 1)
            : images.slice(0, 2);

          const afterImages = moveRight ? images.slice(1) : images.slice(2);

          return (
            <div className={styles["marquee-container"]} key={title}>
              <div className={styles.marquee}>
                {/* images BEFORE text */}
                {beforeImages.map((src, i) => (
                  <div className={styles.item} key={`b-${i}`}>
                    <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
                  </div>
                ))}

                {/* TEXT */}
                <div className={styles.item}>
                  <h1>{title}</h1>
                </div>

                {/* images AFTER text */}
                {afterImages.map((src, i) => (
                  <div className={styles.item} key={`a-${i}`}>
                    <Image src={src} alt="" fill style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TeachStach;
