import { useRef } from "react";
import styles from "./Scoreboard.module.css";
import { GiFire, GiDevilMask, GiTornado, GiSundial } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HouseScore {
  id: string;
  name: string;
  icon: React.ComponentType;
  color: string;
  score: number;
}

const Scoreboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scoreRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // TODO: Replace with actual API data
  const houseScores: HouseScore[] = [
    {
      id: "agni",
      name: "Agni",
      icon: GiFire,
      color: "var(--theyyam-red)",
      score: 0, // Placeholder - to be fetched from server
    },
    {
      id: "raudra",
      name: "Raudra",
      icon: GiDevilMask,
      color: "var(--theyyam-orange)",
      score: 0, // Placeholder - to be fetched from server
    },
    {
      id: "bhava",
      name: "Bhava",
      icon: GiTornado,
      color: "var(--theyyam-gold)",
      score: 0, // Placeholder - to be fetched from server
    },
    {
      id: "kaalam",
      name: "Kaalam",
      icon: GiSundial,
      color: "var(--bone)",
      score: 0, // Placeholder - to be fetched from server
    },
  ];

  useGSAP(
    () => {
      // Minimal staggered entry animation
      gsap.fromTo(
        ".scoreboard-item",
        {
          opacity: 0,
          y: 30, // Slide up from bottom
          filter: "blur(5px)", // Subtle blur
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.5, // One at a time (slow stagger)
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Start earlier when section is 80% visible
            toggleActions: "play none none reverse", // Play on entry, reverse on leave
          },
        }
      );

      // Animate title underline
      gsap.fromTo(
        `.${styles.titleLine}`,
        {
          scaleX: 0,
          opacity: 0,
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          delay: 0.2, // Small delay after items start
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Simple score counter animation
      scoreRefs.current.forEach((scoreEl, index) => {
        if (scoreEl) {
          const targetScore = houseScores[index].score;
          gsap.fromTo(
            scoreEl,
            { textContent: 0, opacity: 0 },
            {
              textContent: targetScore,
              opacity: 1,
              duration: 1.5,
              delay: 0.3 + index * 0.5, // Match the row stagger
              ease: "power1.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section className={styles.scoreboardSection} ref={containerRef}>
      <div className={styles.background}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.glowTop}></div>
        <div className={styles.glowBottom}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Scoreboard</h2>
          <div className={styles.titleLine}></div>
        </div>

        <div className={styles.scoreboardGrid}>
          {houseScores.map((house, index) => {
            const Icon = house.icon;

            return (
              <div
                key={house.id}
                className={`${styles.scoreboardItem} scoreboard-item`}
                style={{ "--house-color": house.color } as React.CSSProperties}
              >
                <div className={styles.itemBg}></div>
                <div className={styles.rank}>#{index + 1}</div>

                <div className={styles.itemContent}>
                  <div className={styles.houseInfo}>
                    <div className={styles.iconWrapper}>
                      <Icon />
                    </div>
                    <div className={styles.houseDetails}>
                      <h3 className={styles.houseName}>{house.name}</h3>
                      <span className={styles.houseLabel}>House</span>
                    </div>
                  </div>

                  <div className={styles.scoreContainer}>
                    <span
                      className={styles.score}
                      ref={(el) => {
                        scoreRefs.current[index] = el;
                      }}
                    >
                      {house.score}
                    </span>
                    <span className={styles.scoreLabel}>points</span>
                  </div>
                </div>

                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={
                      {
                        "--progress": `${house.score}%`,
                      } as React.CSSProperties
                    }
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Scoreboard;
