import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Lottie from 'lottie-react'; // Import Lottie component
import styles from '../styles/LandingPage.module.css'; // Import CSS module for modal styling

export default function LandingPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null); // State for animation data

  // Fetch animation data if needed (optional, for dynamic loading)
  useEffect(() => {
    // If world.json is in public/assets/, you can reference it directly
    // Lottie component can handle the path directly, so no fetch is strictly needed
    // This useEffect is a fallback if you need to load JSON dynamically
    const loadAnimation = async () => {
      try {
        const response = await fetch('/assets/world.json');
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        } else {
          console.error('Failed to load world.json');
        }
      } catch (error) {
        console.error('Error fetching animation:', error);
      }
    };
    loadAnimation();
  }, []);

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    // Smooth scrolling for navigation links (exclude footer links)
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]:not(.footer-link)');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 1000);

    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener('load', () => {
        document.body.classList.add('loaded');
      });
    };
  }, []);

  const handleJoinClick = () => {
    router.push('/register');
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsMessageVisible(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', {
      phone: e.target.phone.value,
      password: e.target.password.value,
    });
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
      setIsLoginModalOpen(false);
    }, 5000);
  };

  const handleFooterLinkClick = (e) => {
    e.preventDefault();
    router.push('/About');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Collaboration Platform for Startup Founders</title>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700;800&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.9.6/lottie.min.js" async />
      </Head>
      <div className="page-wrapper">
        <header>
          <nav className="container">
            <a href="#" className="logo">
              <img src="/assets/Logo.png" alt="StartupSync Logo" className="logo-image" />
              TrillionTribe
            </a>
            <button className="cta-button" onClick={handleLoginClick}>
              Login
            </button>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-content fade-in">
                <div className="hero-text">
                  <h1>A Networking Site for Founders to Collaborate & Grow</h1>
                  <p>
                    For NO Entry fee, join a curated network of startup founders to form partnerships, share resources, and accelerate growth. Find design partners, early adopters, co-marketing allies, or strategic collaborators in a secure, focused space. No noise, no monthly fees—just real opportunities to build together. Your startup deserves the right partners to thrive.
                  </p>
                  <div className="hero-buttons">
                    <button className="cta-button" onClick={handleJoinClick}>
                      Join
                    </button>
                    <button className="secondary-button" onClick={handleLoginClick}>
                      Login
                    </button>
                  </div>
                  <div className="hero-checklist">
                    ✓ Curated founder network ✓ Secure collaboration tools ✓ Partnership-focused
                  </div>
                </div>
                <div className="hero-visual">
                  <img src="/assets/Faces.png" alt="Startup Collaboration Network" className="hero-image" />
                </div>
              </div>
            </div>
          </section>

          <section className="world-image-section scroll-reveal">
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={true}
                className="world-animation"
              />
            ) : (
              <div>Loading animation...</div> // Fallback while animation loads
            )}
          </section>

          <section className="cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>Don't miss the Train! </h2>
                <p>Join a curated network of startup founders and start collaborating on partnerships that drive growth.</p>
                <button className="cta-button cta-button-large" onClick={handleJoinClick}>
                  Start Your Application
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="container">
            <div className="footer-content">
              <div className="footer-section"></div>
              <div className="footer-section"></div>
              <div className="footer-section company-section">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="/About" className="footer-link" onClick={handleFooterLinkClick}>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/About" className="footer-link" onClick={handleFooterLinkClick}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/About" className="footer-link" onClick={handleFooterLinkClick}>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/About" className="footer-link" onClick={handleFooterLinkClick}>
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-section"></div>
            </div>
            <div className="footer-bottom">
              <p>Copyright © 2025 StrategiQ. All Rights Reserved.</p>
            </div>
          </div>
        </footer>

        {isLoginModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ×
              </button>
              {isMessageVisible ? (
                <div className={styles.message}>
                  Thank you for applying! We're reviewing your profile and will update you once the verification process is complete.
                </div>
              ) : (
                <>
                  <h2>Login to StrategiQ</h2>
                  <form onSubmit={handleLoginSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                      Login
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}