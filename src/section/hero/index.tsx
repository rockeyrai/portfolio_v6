"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import styles from "./Hero.module.css";

const HeroOne: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!root.current) return;

    const ctx = gsap.context(() => {
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
            key: "headerChars",
            selector: `.${styles.hero1Header} h1`,
            type: "chars",
          },
          {
            key: "heroFooterH3",
            selector: `.${styles.hero1Footer} h3`,
            type: "lines",
          },
          {
            key: "heroFooterP",
            selector: `.${styles.hero1Footer} p`,
            type: "lines",
          },
        ];

        const splits = createSplitTexts(splitElements);

        // Initial states
        gsap.set(
          [
            splits.headerChars.chars,
            splits.heroFooterH3.lines,
            splits.heroFooterP.lines,
          ],
          { y: "100%" },
        );

        gsap.set(`.${styles.hero1Img}`, {
          scale: 1.3,
        });

        const tl = gsap.timeline({ delay: 5 });

        tl.to(splits.headerChars.chars, {
          y: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
        })
          .to(
            `.${styles.hero1Img}`,
            {
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
            },
            "<",
          )
          .to(
            [splits.heroFooterH3.lines, splits.heroFooterP.lines],
            {
              y: 0,
              stagger: 0.1,
              duration: 1,
              ease: "power4.out",
            },
            "-=0.8",
          );
      });
    });
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <>
      <div ref={root} className={styles.heroContainers}>
        <section className={styles.hero1}>
          <div className={styles.hero1Inner}>
            <div className={styles.hero1Img}>
              <img src="/hero/image1.jpg" alt="hero1" />
            </div>
            <div className={styles.hero1Content}>
              <div className={styles.hero1Header}>
                <h1>Obsidian</h1>
              </div>

              <div className={styles.hero1Footer}>
                <h3>Space defined through light and silence</h3>
                <p>
                  Geometry and balance converge, creating environments that
                  breathe with ease.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroOne;
