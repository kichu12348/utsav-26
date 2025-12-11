import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Loader.module.css";

export default function Loader({ onDone }: { onDone?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const eyes = gsap.utils.toArray(`.${styles.eyeShape}`);
    
    const tl = gsap.timeline({
      onComplete: () => onDone?.(),
    });

    // 1. Initial State
    tl.set(eyesRef.current, { opacity: 1 });
    tl.set(eyes, { 
      scaleY: 0.02, // Almost closed slit
      opacity: 0,
      filter: "drop-shadow(0 0 0px var(--theyyam-red))"
    });

    // 2. Eyes "ignite" (fade in as glowing slits)
    tl.to(eyes, {
      opacity: 0.8,
      duration: 1.2,
      ease: "power2.in",
      filter: "drop-shadow(0 0 15px var(--theyyam-red))"
    });

    // 3. Eyes "flare" open (intensity up, scale up)
    tl.to(eyes, {
      scaleY: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.4)", // Snap open with power
      filter: "drop-shadow(0 0 40px var(--theyyam-red))"
    });

    // 4. Intense stare (pulse with glow)
    tl.to(eyes, {
      scale: 1.05,
      filter: "drop-shadow(0 0 60px var(--theyyam-red))",
      duration: 1.2,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    });

    // 5. Fade out everything
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    });

  }, { scope: containerRef });

  return (
    <div className={styles.loader} ref={containerRef}>
      <div className={styles.eyesContainer} ref={eyesRef}>
        {/* Left Eye */}
        <svg className={styles.eyeSvg} viewBox="0 0 100 60">
           {/* Stylized Theyyam Eye Shape - Sharp Almond */}
           <path 
             className={styles.eyeShape} 
             d="M0,30 Q50,-10 100,30 Q50,70 0,30 Z" 
           />
        </svg>
        
        {/* Right Eye */}
        <svg className={styles.eyeSvg} viewBox="0 0 100 60">
           <path 
             className={styles.eyeShape} 
             d="M0,30 Q50,-10 100,30 Q50,70 0,30 Z" 
           />
        </svg>
      </div>
    </div>
  );
}
