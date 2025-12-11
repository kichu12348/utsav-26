import React, { useRef } from 'react';
import styles from './Houses.module.css';
import { GiFire, GiDevilMask, GiTornado, GiSundial } from 'react-icons/gi';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const houses = [
  {
    id: 'agni',
    name: 'Agni',
    icon: GiFire,
    color: 'var(--theyyam-red)',
    description: 'Fire'
  },
  {
    id: 'raudra',
    name: 'Raudra',
    icon: GiDevilMask,
    color: 'var(--theyyam-orange)',
    description: 'Wrath'
  },
  {
    id: 'bhava',
    name: 'Bhava',
    icon: GiTornado,
    color: 'var(--theyyam-gold)',
    description: 'Chaos'
  },
  {
    id: 'kaalam',
    name: 'Kaalam',
    icon: GiSundial,
    color: 'var(--bone)',
    description: 'Time'
  }
];

const Houses = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.house-item',
      { 
        opacity: 0,
        scale: 0.85
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className={styles.housesSection} ref={containerRef}>
      <div className={styles.background}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.ornamentsTop}></div>
        <div className={styles.ornamentsBottom}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Four Houses</h2>
          <div className={styles.titleLine}></div>
        </div>
        
        <div className={styles.grid}>
          {houses.map((house, index) => {
            const Icon = house.icon;
            return (
              <div 
                key={house.id} 
                className={`${styles.house} house-item`}
                style={{ '--house-color': house.color } as React.CSSProperties}
              >
                <div className={styles.houseBg}></div>
                <div className={styles.houseInner}>
                  <div className={styles.iconWrapper}>
                    <Icon />
                  </div>
                  <h3 className={styles.houseName}>{house.name}</h3>
                  <span className={styles.houseDesc}>{house.description}</span>
                </div>
                <div className={styles.houseNumber}>{String(index + 1).padStart(2, '0')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Houses;
