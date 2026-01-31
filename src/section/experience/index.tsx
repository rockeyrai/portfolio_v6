import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import styles from "./Experience.module.css";
import SplitType from "split-type";
import Image from "next/image";

const experienceDate = [
  ["broadwayinfosys: Aug 2024 - Nov 2024"],
  ["Peridot pvt : March 2024 - May 2024 "],
  ["Peridot pvt : Jun 2024 - Dec 2024 "],

];

const experienceTitle = [
  "MERN Stack",
  "jr Associate Developer",
  "jr Full-Stack Developer",

];

const experienceDescription = [
  // MERN Stack
  "Developed full-stack web applications using MongoDB, Express, React, and Node.js, focusing on component-driven UI, RESTful APIs, and efficient data flow across the stack.",

  // Jr Associate Developer
  "Assisted senior developers in building and maintaining web features, fixing bugs, writing reusable components, and collaborating in an agile team environment to deliver reliable solutions.",

  // Jr Full-Stack Developer
  "Designed and implemented end-to-end features across frontend and backend, integrating APIs, managing databases, and ensuring performance, scalability, and clean application architecture.",
];


const experienceImg = [
  "/exp/image1.webp",
  "/exp/image2.webp",
  "/exp/image3.webp",
];

const Experience: React.FC = () => {
  const stickyRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement[]>([]);
  const serviceImgRef = useRef<HTMLDivElement>(null);
  const serviceCopyRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLSpanElement>(null);
  const currentCountRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const stickySection = stickyRef.current;
    const services = servicesRef.current;
    const serviceImg = serviceImgRef.current;
    const serviceCopyEl = serviceCopyRef.current;
    const progress = progressRef.current;
    const separator = separatorRef.current;
    const currentCount = currentCountRef.current;

    if (!stickySection || !serviceImg || !serviceCopyEl) return;

    const imgHeight = 250;
    const totalServices = experienceDate.length;

    // Set initial service copy
    serviceCopyEl.textContent = experienceDate[0][0];
    let currentSplitText = new SplitType(serviceCopyEl);

    // Activate first service on load
    services.forEach((s, idx) => {
      const desc = s.querySelector("span") as HTMLElement;
      if (idx === 0) {
        const titleHeight = 38;
        const descHeight = desc.scrollHeight;
        const totalHeight = titleHeight + descHeight + 10;
        
        gsap.set(s, { height: totalHeight});
        gsap.set(desc, { opacity: 1, height: descHeight });
      } else {
        gsap.set(s, { height: 38});
        gsap.set(desc, { opacity: 0, height: 0 });
      }
    });
    currentCount!.textContent = "1";
    let currentIndex = 0;

    // Helper function to get actual height
    const getActualHeight = (element: HTMLElement): number => {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.height = 'auto';
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      element.parentElement?.appendChild(clone);
      const height = clone.scrollHeight;
      element.parentElement?.removeChild(clone);
      return height;
    };

    const animateTextChange = async (index: number) => {
      return new Promise<void>((resolve) => {
        gsap.to(currentSplitText.lines, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          stagger: 0.03,
          ease: "power3.inOut",
          onComplete: () => {
            currentSplitText.revert();
            serviceCopyEl.textContent = experienceDate[index][0];
            currentSplitText = new SplitType(serviceCopyEl);

            gsap.set(currentSplitText.lines, { opacity: 0, y: 20 });

            gsap.to(currentSplitText.lines, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.03,
              ease: "power3.out",
              onComplete: () => resolve(),
            });
          },
        });
      });
    };

    const stickyEnd = window.innerHeight * totalServices + 50; // extra buffer

    ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${stickyEnd}`,
      pin: true,
      scrub: true,
      onUpdate: async (self) => {
        const activeIndex = Math.min(
          totalServices - 1,
          Math.floor(self.progress * totalServices)
        );

        if (progress) {
          if (window.innerWidth > 700) {
            gsap.set(progress, {
              scaleY: self.progress,
              transformOrigin: "top",
            });
          } else {
            gsap.set(progress, {
              scaleX: self.progress,
              transformOrigin: "left",
            });
          }
        }

        if (activeIndex !== currentIndex) {
          currentIndex = activeIndex;
          currentCount!.textContent = String(activeIndex + 1);

          services.forEach((s, idx) => {
            const desc = s.querySelector("span") as HTMLElement;
            if (idx === activeIndex) {
              // Calculate the actual height needed
              const titleHeight = 38; // base title height
              const descHeight = desc.scrollHeight;
              const totalHeight = titleHeight + descHeight + 10; // 10px for padding/margin
              
              gsap.to(s, {
                height: totalHeight,
                duration: 0.4,
                ease: "power3.out",
              });
              gsap.to(desc, {
                opacity: 1,
                height: descHeight,
                duration: 0.4,
                ease: "power3.out",
              });
            } else {
              gsap.to(s, {
                height: 38,
                duration: 0.4,
                ease: "power3.out",
              });
              gsap.to(desc, {
                opacity: 0,
                height: 0,
                duration: 0.3,
                ease: "power3.out",
              });
            }
          });

          await Promise.all([
            gsap.to(serviceImg, {
              y: -(activeIndex * imgHeight),
              duration: 0.5,
              ease: "power3.inOut",
              overwrite: true,
            }),
            animateTextChange(activeIndex),
            separator &&
              gsap.fromTo(
                separator,
                { scaleX: 0 },
                {
                  scaleX: 1,
                  duration: 0.6,
                  ease: "power2.inOut",
                  transformOrigin: "center",
                  yoyo: true,
                  repeat: 1,
                }
              ),
          ]);
        }
      },
    });
  }, []);

  return (
    <div className={styles.containers}>
      <section className={`${styles.sticky} ${styles.section}`} ref={stickyRef}>
        <div className={styles.col}>
          <div className={styles.services}>
            {experienceTitle.map((title, idx) => (
              <div
                className={styles.service}
                key={idx}
                ref={(el) => {
                  if (el) servicesRef.current[idx] = el;
                }}
              >
                <p>{title}</p>
                <span>{experienceDescription[idx]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles["service-img-wrapper"]}>
            <div className={styles["service-img"]} ref={serviceImgRef}>
              {experienceImg.map((src, i) => (
                <div className={styles.img} key={i}>
                  <Image src={src} alt="" fill style={{width:"100%", height:"100%", objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles["service-copy"]}>
            <p ref={serviceCopyRef}/>
          </div>
        </div>

        <div className={styles["progress-bar"]}>
          <div className={styles.progress} ref={progressRef}></div>
        </div>

        <div className={styles.index}>
          <span ref={currentCountRef}>1</span>
          <span className={styles.separator} ref={separatorRef}></span>
          <span>{experienceDate.length}</span>
        </div>
      </section>

    </div>
  );
};

export default Experience;