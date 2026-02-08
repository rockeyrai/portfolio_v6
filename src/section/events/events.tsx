import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Events.module.css";
import { SplitText } from "gsap/SplitText";

const initialClipPaths: string[] = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)",
  "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
  "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)",
  "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)",
  "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
  "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)",
  "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)",
  "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
];

const finalClipPaths: string[] = [
  "polygon(0% 0%, 33.5% 0%, 33.5% 33%, 0% 33.5%)",
  "polygon(33% 0%, 66.5% 0%, 66.5% 33%, 33% 33.5%)",
  "polygon(66% 0%, 100% 0%, 100% 33%, 66% 33.5%)",
  "polygon(0% 33%, 33.5% 33%, 33.5% 66%, 0% 66.5%)",
  "polygon(33% 33%, 66.5% 33%, 66.5% 66%, 33% 66.5%)",
  "polygon(66% 33%, 100% 33%, 100% 66%, 66% 66.5%)",
  "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)",
  "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)",
  "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
];

const EventList: React.FC = () => {
  const hasInitialized = useRef<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Refs for each event
  const event1Ref = useRef<HTMLDivElement>(null);
  const event2Ref = useRef<HTMLDivElement>(null);
  const event3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    ScrollTrigger.refresh();

    // Create masks for a specific image element
    function createMasks(imgElement: HTMLElement): void {
      for (let i = 0; i < 9; i++) {
        const mask = document.createElement("div");
        mask.classList.add(styles.mask, `m-${i}`);
        imgElement.appendChild(mask);
      }
    }

    // Animate a single event using refs
    function animateEvent(eventRef: React.RefObject<HTMLDivElement>): void {
      const event = eventRef.current;
      if (!event) return;

      const img = event.querySelector<HTMLElement>(`.${styles.img}`);
      const h1 = event.querySelector<HTMLElement>("h1");
      const p = event.querySelector<HTMLElement>("p");

      if (!img || !h1 || !p) return;
      const h1Split = SplitText.create(h1, {
        type: "chars",
        charsClass: styles.eventChar,
      });

      const pSplit = SplitText.create(p, {
        type: "lines",
        linesClass: styles.eventLine,
      });

      // Initial state (Hero-style)
      gsap.set(h1Split.chars, { y: "100%" });
      gsap.set(pSplit.lines, { y: "100%" });
      // Create masks for this specific image
      createMasks(img);

      const masks = img.querySelectorAll<HTMLElement>(`.${styles.mask}`);

      // Set initial clip paths for masks
      masks.forEach((mask: HTMLElement, index: number) => {
        gsap.set(mask, {
          clipPath: initialClipPaths[index],
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: event,
          start: "top 50%",
          end: "bottom 90%",
          toggleActions: "play none none reverse",
          markers: false, // Set to true for debugging
          // scrub: true,
        },
      });

      // Store the ScrollTrigger instance for cleanup
      if (tl.scrollTrigger) {
        scrollTriggersRef.current.push(tl.scrollTrigger);
      }

      const animationOrder: string[][] = [
        [".m-0"],
        [".m-1", ".m-3"],
        [".m-2", ".m-4", ".m-6"],
        [".m-5", ".m-7"],
        [".m-8"],
      ];

      // Animate masks
      animationOrder.forEach((targets: string[], index: number) => {
        tl.to(
          targets.flatMap((cls: string) =>
            Array.from(img.querySelectorAll<HTMLElement>(cls)),
          ),
          {
            clipPath: (i: number, el: HTMLElement) =>
              finalClipPaths[Array.from(masks).indexOf(el)],
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          index * 0.125,
        );
      });

      // Animate h1 after image animation completes
      // h1 chars
      tl.to(
        h1Split.chars,
        {
          y: 0,
          // stagger: 0.01,
          duration: 0.8,
          ease: "power4.out",
        },
        // "+=0.2",
      );

      // p lines
      tl.to(
        pSplit.lines,
        {
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
        },
        // "-=0.6",
      );
    }

    // Animate all events using their refs
    animateEvent(event1Ref);
    animateEvent(event2Ref);
    animateEvent(event3Ref);

    return () => {
      // Clean up all ScrollTriggers
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];

      // Additional cleanup for any remaining ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger &&
          containerRef.current?.contains(trigger.vars.trigger as Node)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section className={styles.section}>
      <div
        className={styles.heroImgs}
        ref={containerRef as React.RefObject<HTMLDivElement>}
      >
        <div className={styles.row}>
          <div className={styles.even} ref={event1Ref}>
            <div className={`${styles.img} ${styles.img1}`}></div>
            <div className={styles.col}>
              <h1>Startup Fest By ICT</h1>
              <p>
              Showcased Portfolio Nepal at Startup Fest by ICT, connecting with founders, developers, and industry professionals while gaining valuable feedback and insights from Nepal’s growing startup ecosystem.
              </p>
            </div>
          </div>
          <div className={styles.even} ref={event2Ref}>
            <div className={`${styles.img} ${styles.img2}`}></div>
            <div className={styles.col}>
              <h1>XIDEA 2026</h1>
              <p>Participated in my first hackathon at XIDEA 2026, where we built Cultural Lens—a cross-platform PWA that uses image recognition to identify sculptures and artifacts and present their historical and cultural significance.</p>
            </div>
          </div>
          <div className={styles.even} ref={event3Ref}>
            <div className={`${styles.img} ${styles.img3}`}></div>
            <div className={styles.col}>
              <h1>Upcoming </h1>
              <p>The journey continues as I explore new opportunities, ideas, and challenges ahead. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventList;
