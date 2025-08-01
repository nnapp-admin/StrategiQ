import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/About.module.css';

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleHashScroll = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.substring(1); // Remove the '#' from hash
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Run on mount and when hash changes
    handleHashScroll();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, [router.asPath]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About - FounderCult</title>
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <section id="about-us" className={styles.section}>
            <h1 className={styles.title}>About Us</h1>
            <div className={styles.content}>
              <p>At FounderCult, we believe the future of startups lies not just in brilliant ideas, but in strategic collaboration.</p>
              <p>We’re building the world’s first platform designed exclusively for startup founders to discover, connect, access services and collaborate with one another. Whether you're looking to co-launch a product, exchange services, bundle offerings, or find your next strategic ally — this is the place where deals begin.</p>
              <p>Every profile on FounderCult is more than a business card. It’s a live intent layer — telling the world what you’re building, what you offer, and what you’re looking for.</p>
              <p>We're not here to replace social media. We’re here to give startups their own networking OS — focused, frictionless, and future-minded.</p>
              <p><strong>Because when founders build together, better startups happen.</strong></p>
            </div>
          </section>

          <section id="privacy-policy" className={styles.section}>
            <h2 className={styles.subtitle}>Privacy Policy</h2>
            <div className={styles.content}>
              <p><strong>Effective Date: July 24, 2025</strong></p>
              <p>At FounderCult, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal and business information.</p>
              <h3>1. Information We Collect</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email, startup name, role, etc.</li>
                <li><strong>Profile Content:</strong> Services offered, partnership interests, company description</li>
                <li><strong>Usage Data:</strong> Interactions on the platform, messages, preferences</li>
                <li><strong>Cookies:</strong> For authentication and analytics</li>
              </ul>
              <h3>2. How We Use Your Information</h3>
              <ul>
                <li>To provide and improve the platform</li>
                <li>To match you with relevant founders or opportunities</li>
                <li>To facilitate communication and deals</li>
                <li>To personalize your experience</li>
              </ul>
              <h3>3. Data Sharing</h3>
              <p>We do not sell your personal data. Your profile is publicly viewable by other users for collaboration purposes. Private messages and sensitive business information are not shared.</p>
              <h3>4. Your Control</h3>
              <p>You can update or delete your profile at any time. You may also opt out of communications.</p>
              <h3>5. Security</h3>
              <p>We take data security seriously and use industry-standard protocols to protect your information.</p>
              <h3>6. Third-Party Tools</h3>
              <p>We may use analytics tools and services to improve performance, all of which comply with relevant privacy regulations.</p>
              <h3>7. Changes</h3>
              <p>We may update this policy. Continued use of the platform constitutes acceptance of any changes.</p>
              <p>For any questions, contact us at <a href="mailto:cassini.corporation@gmail.com">cassini.corporation@gmail.com</a>.</p>
            </div>
          </section>

          <section id="terms-of-service" className={styles.section}>
            <h2 className={styles.subtitle}>Terms of Service</h2>
            <div className={styles.content}>
              <p><strong>Effective Date: July 24, 2025</strong></p>
              <p>Welcome to FounderCult. By using our platform, you agree to the following terms:</p>
              <h3>1. Platform Purpose</h3>
              <p>FounderCult is a platform for startup founders to connect, collaborate, and explore partnership opportunities. We provide tools to showcase your startup and interact with others, but we do not guarantee outcomes or enforce agreements.</p>
              <h3>2. Eligibility</h3>
              <p>You must be at least 18 years old and authorized to represent your startup.</p>
              <h3>3. User Conduct</h3>
              <p>You agree not to:</p>
              <ul>
                <li>Misrepresent yourself or your company</li>
                <li>Post spam or promotional material unrelated to collaboration</li>
                <li>Attempt to hack, disrupt, or abuse the platform</li>
                <li>Harass or misuse the messaging features</li>
              </ul>
              <h3>4. Content Ownership</h3>
              <p>You retain ownership of all the content you create. By posting on FounderCult, you grant us a license to display your content to other users within the platform.</p>
              <h3>5. Disclaimers</h3>
              <p>We are not responsible for any business outcomes, losses, or damages that result from partnerships formed through the platform.</p>
              <h3>6. Termination</h3>
              <p>We reserve the right to remove profiles or restrict access if users violate these terms or harm the integrity of the community.</p>
              <h3>7. Modifications</h3>
              <p>We may modify these terms. We'll notify users of significant changes. Continued use of the platform means you accept the revised terms.</p>
              <p>For legal inquiries, contact us at <a href="mailto:cassini.corporation@gmail.com">cassini.corporation@gmail.com</a>.</p>
            </div>
          </section>

          <section id="careers" className={styles.section}>
            <h2 className={styles.subtitle}>Careers</h2>
            <div className={styles.content}>
              <p>We are always looking for passionate individuals to join our team at FounderCult. Currently, we do not have specific open positions listed, but we welcome speculative applications from talented professionals interested in contributing to our mission.</p>
              <p>Please send your resume and a brief cover letter to <a href="mailto:cassini.corporation@gmail.com">cassini.corporation@gmail.com</a>.</p>
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <p>Copyright © {new Date().getFullYear()} FounderCult.</p>
        </footer>
      </div>
    </>
  );
}