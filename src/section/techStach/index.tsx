"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import styles from "./feature.module.css";

import DockerSvg from "../../../public/techsvg/docker";
import AntigravitySvg from "../../../public/techsvg/antigravity";
import ChatgptSvg from "../../../public/techsvg/chatgpt";
import ClaudeSvg from "../../../public/techsvg/claude";
import CloudinarySvg from "../../../public/techsvg/cloudinary";
import ContentfulSvg from "../../../public/techsvg/contentful";
import CopilotSvg from "../../../public/techsvg/copilot";
import CssSvg from "../../../public/techsvg/css";
import D3jsSvg from "../../../public/techsvg/d3js";
import ExpoioSvg from "../../../public/techsvg/expoio";
import ExpressjsSvg from "../../../public/techsvg/expressjs";
import FirebaseSvg from "../../../public/techsvg/firebase";
import GitSvg from "../../../public/techsvg/git";
import GithubSvg from "../../../public/techsvg/github";
import Htm5Svg from "../../../public/techsvg/htm5";
import JavascriptSvg from "../../../public/techsvg/javascript";
import JiraSvg from "../../../public/techsvg/jira";
import MongodbSvg from "../../../public/techsvg/mongodb";
import MysqlSvg from "../../../public/techsvg/mysql";
import NodejsSvg from "../../../public/techsvg/nodejs";
import ReactSvg from "../../../public/techsvg/react";
import ReduxSvg from "../../../public/techsvg/redux";
import StrapiSvg from "../../../public/techsvg/strapi";
import TailwindcssSvg from "../../../public/techsvg/tailwindcss";
import TypescriptSvg from "../../../public/techsvg/typescript";
import VercelSvg from "../../../public/techsvg/vercel";
import VisualstudioSvg from "../../../public/techsvg/visualstudio";
import Socketio from "../../../public/techsvg/socketio";
import GoogleCloud from "../../../public/techsvg/googleCloud";
import Gsap from "../../../public/techsvg/gsap";
import Linux from "../../../public/techsvg/linux";
import Postman from "../../../public/techsvg/postman";
import Numpuy from "../../../public/techsvg/numpy";
import Redis from "../../../public/techsvg/redis";
import Python from "../../../public/techsvg/puthon";
import FigmaSvg from "../../../public/techsvg/figma";

const TeachStach: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const marquees = [
    {
      title: "MY",
      icons: [
        ChatgptSvg,
        ClaudeSvg,
        CloudinarySvg,
        ContentfulSvg,
        CopilotSvg,
        CssSvg,
        D3jsSvg,
        DockerSvg,
        Socketio,
        GoogleCloud,
        Numpuy,
        Python,
        AntigravitySvg,
      ],
    },
    {
      title: "TECH",
      icons: [
        ExpoioSvg,
        ExpressjsSvg,
        FirebaseSvg,
        GitSvg,
        GithubSvg,
        Htm5Svg,
        JavascriptSvg,
        JiraSvg,
        MongodbSvg,
        Gsap,
        Redis,
        FigmaSvg,
      ],
    },
    {
      title: "STACK",
      icons: [
        MysqlSvg,
        NodejsSvg,
        ReactSvg,
        ReduxSvg,
        StrapiSvg,
        TailwindcssSvg,
        TypescriptSvg,
        VercelSvg,
        VisualstudioSvg,
        Linux,
        Postman,
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
          const { title, icons } = marqueeData;

          const beforeIcons = moveRight
            ? icons.slice(0, isMobile ? 2 : 3)
            : icons.slice(0, isMobile ? 2 : 4);

          const afterIcons = moveRight
            ? icons.slice(isMobile ? 4 : 5)
            : icons.slice(isMobile ? 4 : 6);

          return (
            <div className={styles["marquee-container"]} key={title}>
              <div className={styles.marquee}>
                {/* icons BEFORE text */}
                {beforeIcons.map((Icon, i) => (
                  <div className={styles.itemImg} key={`b-${i}`}>
                    <Icon style={{ width: "100%", height: "100%" }} />
                  </div>
                ))}

                {/* TEXT */}
                <div className={styles.item}>
                  <h1>{title}</h1>
                </div>

                {/* icons AFTER text */}
                {afterIcons.map((Icon, i) => (
                  <div className={styles.itemImg} key={`a-${i}`}>
                    <Icon style={{ width: "100%", height: "100%" }} />
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
