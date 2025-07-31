import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Lottie from 'lottie-react';
import styles from '../styles/LandingPage.module.css';

export default function LandingPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [loadingAnimationData, setLoadingAnimationData] = useState(null);
  const [expandedServices, setExpandedServices] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      const startTime = Date.now();
      try {
        // Fetch world.json
        const worldResponse = await fetch('/assets/world.json');
        if (!worldResponse.ok) throw new Error('Failed to load world.json');
        const worldData = await worldResponse.json();

        // Fetch Loading.json
        const loadingResponse = await fetch('/assets/Loading.json');
        if (!loadingResponse.ok) throw new Error('Failed to load Loading.json');
        const loadingData = await loadingResponse.json();

        // Preload images
        const images = [
          '/assets/Logo.png',
          '/assets/Faces.png',
          '/assets/1.png',
          '/assets/2.png',
          '/assets/3.svg',
          '/assets/4.svg',
          '/assets/5.png',
          '/assets/6.png',
          '/assets/7.svg',
          '/assets/8.png',
          '/assets/9.png',
          '/assets/10.png',
          '/assets/11.png',
        ];

        const imagePromises = images.map(
          (src) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            })
        );

        // Wait for all images to load
        await Promise.all(imagePromises);

        // Set animation data
        setAnimationData(worldData);
        setLoadingAnimationData(loadingData);

        // Ensure minimum 3-second loading time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = 3000 - elapsedTime;
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (isLoading) return;

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
  }, [isLoading]);

  const handleJoinClick = () => {
    router.push('/join');
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
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    console.log('Login submitted:', { phone, password });
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
      setIsLoginModalOpen(false);
    }, 5000);
  };

  const handleFooterLinkClick = (e, section) => {
    e.preventDefault();
    router.push(`/About#${section}`);
  };

  const toggleService = (index) => {
    setExpandedServices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const services = [
    {
      title: '1. Product Development',
      items: [
        '🔧 MVP Design & Development – Build fast prototypes for early market validation',
        '🎨 UI/UX Design – User flows, wireframes, usability testing, design systems',
        '💻 Full-stack Web Development – Frontend + backend builds (React, Node, etc.)',
        '📱 Mobile App Development – iOS/Android apps, cross-platform solutions',
        '🔌 API & Backend Architecture – Database design, scalable REST APIs, GraphQL',
        '🧪 QA & Testing Services – Manual & automated testing, bug tracking',
        '🚀 Tech Advisory / Fractional CTO – Product roadmapping, tech stack selection',
        '🔐 Security & Compliance Engineering – Especially for fintech/health startups',
      ],
    },
    {
      title: '2. Legal Assistance',
      items: [
        '🏢 Company Formation & Incorporation – India/US/Delaware/LLC setup',
        '📜 Founders\' Agreements & ESOPs – Equity splits, vesting terms',
        '🔒 IP Protection – Trademarks, copyrights, patents',
        '📄 Contract Drafting & Review – Client contracts, employment agreements',
        '📚 Compliance & Regulatory – Startup-specific laws, GDPR, PCI-DSS, etc.',
        '🤝 Investor Legal Docs – SAFEs, convertible notes, term sheets',
        '🌍 International Expansion Legalities – Cross-border entity formation',
        '📁 Privacy Policy & T&C Drafting – Website and product compliance',
      ],
    },
    {
      title: '3. Co-founder & Hiring',
      items: [
        '🧑‍💼 Co-founder Discovery & Matching – Based on skills, vision, chemistry',
        '🧠 Early Talent Acquisition – Engineers, designers, marketers, PMs',
        '🛠 Technical Hiring as a Service – Vetted devs, freelance CTOs',
        '💼 Hiring Infrastructure Setup – ATS, interview workflows, onboarding',
        '👥 Remote Hiring Networks – Global hiring, async team ops',
        '📈 Team Scaling Strategy – When and how to hire for growth',
        '📊 Equity & Compensation Benchmarking – What % to offer, how much to pay',
        '🧾 Hiring Compliance – Offer letters, contracts, tax forms',
      ],
    },
    {
      title: '4. Fundraising & Investment',
      items: [
        '💸 Pitch Deck Design & Storytelling – Investor-ready, compelling decks',
        '🧾 Financial Modeling & Projections – 3–5 year models, cash flow, runway',
        '🗂 Investor Research & Shortlisting – Matching based on stage & sector',
        '🧑‍⚖️ Term Sheet & Cap Table Advisory – Equity dilution, founder protection',
        '📢 Fundraising Campaign Management – End-to-end outreach & follow-ups',
        '🤝 Investor Warm Intros – From angels to VCs and syndicates',
        '📈 Due Diligence Preparation – Data room setup, checklist audits',
        '📄 Grant Writing & Non-dilutive Funding – For tech, impact, or R&D startups',
      ],
    },
    {
      title: '5. Marketing & Growth',
      items: [
        '🌐 Digital Marketing (Paid & Organic) – Google Ads, Meta Ads, SEO',
        '📲 Social Media & Content Marketing – Strategy, copy, visuals, scheduling',
        '🚀 Launch Campaigns & Pre-launch Hype – Waitlists, influencer collabs',
        '🧠 Growth Hacking Experiments – Virality loops, referral systems',
        '🛍 Product Marketing & Positioning – Market-fit messaging & GTM',
        '📈 Analytics & Funnel Optimization – CRO, heatmaps, A/B testing',
        '📬 Email Marketing & Drip Campaigns – Newsletters, onboarding series',
        '📱 ASO & App Launch Marketing – App store optimization, ratings boosts',
      ],
    },
    {
      title: '6. Finance & Accounting',
      items: [
        '📊 Startup Accounting & Bookkeeping – Monthly records, expense tracking',
        '📈 Runway & Burn Rate Tracking – Dashboard + alerts',
        '🧮 Financial Modeling & Forecasting – For founders and investors',
        '🧾 Tax Filing & Planning – Startup-specific taxation, R&D credits',
        '🧑‍💼 Virtual CFO Services – Financial strategy, investor reporting',
        '💰 Payroll Setup & Management – Compliance with local laws',
        '🏦 Fund Allocation & Expense Auditing – For grant or raised capital',
        '🔍 Financial Due Diligence Readiness – For fundraising or M&A',
      ],
    },
    {
      title: '7. Trending News',
      items: [
        '📰 Startup Funding Updates – Recent VC investments, angel rounds, and exits',
        '🚀 Emerging Tech Trends – AI, Web3, biotech, and other high-growth sectors',
        '🌍 Global Startup Ecosystem Insights – New hubs, policies, and opportunities',
        '📈 Market & Consumer Behavior Shifts – Impacting startup strategies',
        '🧑‍💼 Founder Stories & Lessons – Successes, failures, and pivots',
        '⚖️ Regulatory & Policy Changes – New laws affecting startups (e.g., data privacy, tax incentives)',
        '🤝 Partnerships & Acquisitions – Major collaborations or M&A in the startup space',
        '🌟 Innovation Spotlights – Breakthrough products, services, or business models',
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        {loadingAnimationData && (
          <Lottie
            animationData={loadingAnimationData}
            loop={true}
            className={styles.loadingAnimation}
          />
        )}
      </div>
    );
  }

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
      </Head>
      <div className="page-wrapper">
        <header>
          <nav className="container">
            <a href="#" className="logo">
              <img src="/assets/Logo.png" alt="StartupSync Logo" className="logo-image" />
              FounderCult
            </a>
          </nav>
        </header>

        <main>
          <section className="hero">
            <div className="container">
              <div className="hero-content fade-in">
                <div className="hero-text">
                  <h1>Turn Startup Chaos into a Clear Game Plan ♘</h1>
                  <p>
                    Your complete startup command center. All the tools, services, and connections startup founders need — to build smarter, move faster, and grow together.
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
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                className="world-animation"
              />
            )}
          </section>

          <section className="services-section scroll-reveal">
            <div className="container">
              <h2>Our Services</h2>
              <div className="services-content">
                {services.map((service, index) => (
                  <div className="service-item" key={index}>
                    <div className="service-header" onClick={() => toggleService(index)}>
                      <h3>{service.title}</h3>
                      <span className={`toggle-icon ${expandedServices[index] ? 'expanded' : ''}`}>
                        ▼
                      </span>
                    </div>
                    <div className={`service-content ${expandedServices[index] ? 'expanded' : ''}`}>
                      <ul>
                        {service.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="container">
              <div className="cta-content">
                <h2>Don't miss the Train!</h2>
                <p>Join a verified network of startup founders from around the world and start collaborating on partnerships that drive growth.</p>
                <div className="image-carousel">
                  {['1.png', '2.png', '3.svg', '4.svg', '5.png', '6.png', '7.svg', '8.png', '9.png', '10.png', '11.png'].map((img, index) => (
                    <img key={index} src={`/assets/${img}`} alt={`Carousel image ${index + 1}`} className="carousel-image" />
                  ))}
                  {['1.png', '2.png', '3.svg', '4.svg', '5.png', '6.png', '7.svg', '8.png', '9.png', '10.png', '11.png'].map((img, index) => (
                    <img key={`dup-${index}`} src={`/assets/${img}`} alt={`Carousel image ${index + 1}`} className="carousel-image" />
                  ))}
                </div>
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
                    <a href="/About#about-us" className="footer-link" onClick={(e) => handleFooterLinkClick(e, 'about-us')}>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/About#privacy-policy" className="footer-link" onClick={(e) => handleFooterLinkClick(e, 'privacy-policy')}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/About#terms-of-service" className="footer-link" onClick={(e) => handleFooterLinkClick(e, 'terms-of-service')}>
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="/About#careers" className="footer-link" onClick={(e) => handleFooterLinkClick(e, 'careers')}>
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-section"></div>
            </div>
            <div className="footer-bottom">
              <p>Copyright © {new Date().getFullYear()} FounderCult. All Rights Reserved.</p>
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
                  <h2>Login to FounderCult</h2>
                  <div className={styles.form}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Whatsapp Number</label>
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
                    <button className={styles.submitButton} onClick={handleLoginSubmit}>
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}