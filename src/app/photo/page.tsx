"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhotoIndex = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ---------- SECTION 1
    ScrollTrigger.create({
      trigger: section1Ref.current,
      start: "top top",
      end: "+=600",
      pin: true,           // 🔒 lock scroll here
      scrub: true,
      onUpdate: (self) => {
        const height = 100 + self.progress * 200;
        gsap.set(box1Ref.current, { height });
      },
    });

    // ---------- SECTION 2
    ScrollTrigger.create({
      trigger: section2Ref.current,
      start: "top top",
      end: "+=600",
      pin: true,           // 🔒 lock scroll here
      scrub: true,
      onUpdate: (self) => {
        const width = 100 + self.progress * 300;
        gsap.set(box2Ref.current, { width });
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <>
      {/* SECTION 1 */}
      <section ref={section1Ref} >
        <div ref={box1Ref} className="box box1" />
      </section>

      {/* SECTION 2 */}
      <section ref={section2Ref} className="wrapper">
        <div ref={box2Ref} className="box box2" />
      </section>

      <style jsx>{`
        .wrapper {
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px;
          background:red
        }

        .box1 {
          width: 200px;
          height: 100px;
          background: red;
        }

        .box2 {
          width: 100px;
          height: 150px;
          background: blue;
        }
      `}</style>
    </>
  );
};

export default PhotoIndex;
