import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Loader.module.css";

export default function Loader({ onDone }: { onDone?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const eyes = gsap.utils.toArray(`.${styles.eyeShape}`);

      const tl = gsap.timeline({
        onComplete: () => onDone?.(),
      });

      // 1. Initial State
      tl.set(eyesRef.current, { opacity: 1 });
      tl.set(eyes, {
        scaleY: 0.02, // Almost closed slit
        opacity: 0,
        filter: "drop-shadow(0 0 0px var(--theyyam-red))",
      });

      // 2. Eyes "ignite" (fade in as glowing slits)
      tl.to(eyes, {
        opacity: 0.8,
        duration: 1.2,
        ease: "power2.in",
        filter: "drop-shadow(0 0 40px var(--theyyam-red))",
      });

      tl.to(eyes, {
        scaleY: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.4)",
      });

      tl.to(eyes, {
        filter: "drop-shadow(0 0 60px var(--theyyam-red))",
        duration: 1.2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      });

      // 5. Fade out everything
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div className={styles.loader} ref={containerRef}>
      <div className={styles.eyesContainer} ref={eyesRef}>
        {/* Left Eye - Sinister Scowl (Outer High, Inner Low) */}
        <svg className={styles.eyeSvg} viewBox="0 0 100 70">
          <path
            className={styles.eyeShape}
            d="M 10,25 
               Q 50,15 90,45 
               Q 50,80 10,25 
               Z"
          />
        </svg>

        {/* Right Eye - Sinister Scowl (Inner Low, Outer High) */}
        <svg className={styles.eyeSvg} viewBox="0 0 100 70">
          <path
            className={styles.eyeShape}
            d="M 10,45 
               Q 50,15 90,25 
               Q 50,80 10,45 
               Z"
          />
        </svg>
      </div>
    </div>
  );
}
