import gsap from "gsap";

class AnimationController {
  heroTL: gsap.core.Timeline | null = null;

  setHeroTimeline(tl: gsap.core.Timeline) {
    this.heroTL = tl;
    tl.pause(); // hero NEVER auto-plays
  }

  playHero() {
    this.heroTL?.play();
  }
}

export const animationController = new AnimationController();
