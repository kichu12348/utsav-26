import { useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Generate particle data
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
    }));
  }, []);

  useGSAP(
    () => {
      const letters = titleRef.current?.querySelectorAll(`.${styles.letter}`);
      if (!letters || letters.length === 0) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Ensure initial state
      gsap.set(letters, {
        y: 40,
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        color: "var(--theyyam-red)", // Start with the ritual red
      });

      tl.to(letters, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.8,
        stagger: {
          each: 0.15,
          from: "center", // Ignite from center out
        },
        color: "var(--theyyam-gold)",
        ease: "power2.out",
      }).to(letters, {
        textShadow: "0 0 30px var(--glow-orange)",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Eyes Animation - Glow once then vanish
      const eyes = containerRef.current?.querySelectorAll(
        `.${styles.eyeLeft}, .${styles.eyeRight}`
      );
      if (eyes && eyes.length > 0) {
        const eyeTl = gsap.timeline({ delay: 0.5 });

        eyeTl
          .to(eyes, {
            opacity: 0.3,
            duration: 2,
            ease: "power2.out",
          })
          .to(eyes, {
            opacity: 0.6,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
          })
          .to(eyes, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.in",
            delay: 0.2,
          });
      }

      // Particles Animation - Float from bottom to top
      const particleElements = particlesRef.current?.querySelectorAll(
        `.${styles.particle}`
      );
      if (particleElements && particleElements.length > 0) {
        particleElements.forEach((particle) => {
          const delay = parseFloat(particle.getAttribute("data-delay") || "0");
          const duration = parseFloat(
            particle.getAttribute("data-duration") || "5"
          );

          gsap.fromTo(
            particle,
            {
              y: 0,
              opacity: 0,
            },
            {
              y: -window.innerHeight * 1.2,
              opacity: 1,
              ease: "none",
              duration: duration,
              delay: delay,
              repeat: -1,
              repeatDelay: Math.random() * 2,
              modifiers: {
                opacity: (value) => {
                  const progress = parseFloat(value);
                  if (progress < 0.2) return progress * 5;
                  if (progress > 0.7) return (1 - progress) * 3.33;
                  return 1;
                },
              },
            }
          );
        });
      }
    },
    { scope: containerRef }
  );

  const text = "UTSAV";

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.eyeLeft}></div>
      <div className={styles.eyeRight}></div>
      <div className={styles.overlay}></div>
      <div className={styles.bottomBar}></div>
      <div className={styles.particles} ref={particlesRef}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            data-delay={p.delay}
            data-duration={p.duration}
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>
      <div className={styles.content}>
        <h1 className={styles.title} ref={titleRef}>
          {text.split("").map((char, index) => (
            <span key={index} className={styles.letter}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

export default Hero;
