"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import styles from "./Preloader.module.css";
import { animationController } from "@/lib/animation/preloadHero";

const Preloader: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(SplitText);

    document.fonts.ready.then(() => {
      function createSplitTexts(
        elements: readonly {
          key: string;
          selector: string;
          type: "chars" | "lines";
        }[],
      ) {
        const splits: Record<string, any> = {};
        elements.forEach(({ key, selector, type }) => {
          const config: any = { type, mask: type };
          if (type === "chars") config.charsClass = styles.hero1Char;
          if (type === "lines") config.linesClass = styles.hero1Line;
          splits[key] = SplitText.create(selector, config);
        });
        return splits;
      }

      const splitElements: {
        key: string;
        selector: string;
        type: "lines" | "chars";
      }[] = [
        {
          key: "logoChars",
          selector: `.${styles.hero1PreloaderLogo} h1`,
          type: "chars",
        },
        {
          key: "footerLines",
          selector: `.${styles.hero1PreloaderFooter} p`,
          type: "lines",
        },
      ];

      const splits = createSplitTexts(splitElements);

      // Initial states
      gsap.set(splits.logoChars.chars, { x: "100%" });
      gsap.set([splits.footerLines.lines], { y: "100%" });

      function animateProgress(duration = 4) {
        const tl = gsap.timeline({
          onComplete: () => {
            animationController.playHero(); //  trigger hero
          },
        });
        const counterSteps = 5;
        let currentProgress = 0;

        for (let i = 0; i < counterSteps; i++) {
          const finalStep = i === counterSteps - 1;
          const targetProgress = finalStep
            ? 1
            : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
          currentProgress = targetProgress;

          tl.to(`.${styles.hero1PreloaderProgressBar}`, {
            scaleX: targetProgress,
            duration: duration / counterSteps,
            ease: "power2.out",
          });
        }
        return tl;
      }

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(splits.logoChars.chars, {
        x: "0%",
        stagger: 0.05,
        duration: 1,
        ease: "power4.inOut",
      })
        .to(
          splits.footerLines.lines,
          {
            y: "0%",
            stagger: 0.1,
            duration: 1,
            ease: "power4.inOut",
          },
          "0.25",
        )
        .add(animateProgress(), "<")
        .set(`.${styles.hero1PreloaderProgress}`, {
          backgroundColor: "var(--base-300)",
        })
        .to(
          splits.logoChars.chars,
          {
            x: "-100%",
            stagger: 0.05,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.5",
        )
        .to(
          splits.footerLines.lines,
          {
            y: "-100%",
            stagger: 0.1,
            duration: 1,
            ease: "power4.inOut",
          },
          "<",
        )
        .to(
          `.${styles.hero1PreloaderProgress}`,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .to(
          `.${styles.hero1PreloaderMask}`,
          {
            scale: 10,
            duration: 3,
            ease: "power1.inOut",
          },
          "<",
        )
        .to(
          `.${styles.hero1Img}`,
          {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "<",
        );
    });
  }, []);

  return (
    <>
      <div className={styles.hero1PreloaderProgress}>
        <div className={styles.hero1PreloaderProgressBar}></div>
        <div className={styles.hero1PreloaderLogo}>
          <h1>Obsidian</h1>
        </div>
      </div>
      <div className={styles.hero1PreloaderMask}></div>
      <div className={styles.hero1PreloaderContent}>
        <div className={styles.hero1PreloaderFooter}>
          <p>
            Space unfolds in light and shadow, where structure finds its quiet
            rhythm, and time aligns in harmony.
          </p>
        </div>
      </div>
    </>
  );
};

export default Preloader;
