import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      // Staggered reveal of grid blocks
      gsap.fromTo(
        [
          `.${styles.brandArea}`,
          `.${styles.infoBlock}`,
          `.${styles.actionStrip}`,
        ],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer className={styles.footerSection} ref={footerRef}>
      <div className={styles.gridSystem}>
        {/* BIG LEFT BLOCK: Brand Manifest */}
        <div className={styles.brandArea}>
          <div className={styles.brandBigText}>UTSAV</div>
          <div className={styles.quoteBox}>
            <p className={styles.quote}>
              "When the drums beat and the fire burns, the mortal form
              dissolves. What remains is the dancing God."
            </p>
            <span className={styles.quoteAuthor}>— The Spirit of Theyyam</span>
          </div>
        </div>

        {/* TOP MIDDLE BLOCK: Location */}
        <div className={styles.infoBlock}>
          <div className={styles.blockLabel}>
            <FaMapMarkerAlt /> Ritual Grounds
          </div>
          <div className={styles.blockContent}>
            College of Engineering,
            <br />
            Chengannur, Kerala
            <span className={styles.highlight}>The Sacred Kavu</span>
          </div>
        </div>

        {/* TOP RIGHT BLOCK: Dates & Contact */}
        <div className={styles.infoBlock}>
          <div className={styles.blockLabel}>
            <FaCalendarAlt /> Festival Dates
          </div>
          <div className={styles.blockContent}>
            March 26th - 28th, 2026
            <br />
            <br />
            <div className={styles.blockLabel}>
              <FaEnvelope /> Festival Custodians
            </div>
            <a
              href="mailto:utsavcec26@gmail.com"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              utsavcec26@gmail.com
            </a>
          </div>
        </div>

        {/* BOTTOM STRIP: Socials & Copyright */}
        <div className={styles.actionStrip}>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>

          <div className={styles.copyright}>
            2026 UTSAV Arts Festival. <br />
            Celebrating the Divine Dance. <br />
            Made wid{" "}
            <span className={styles.heart}>
              <FaHeart color="red" />
            </span>{" "}
            by kichu
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
