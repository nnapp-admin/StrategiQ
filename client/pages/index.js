import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Splash.module.css';
import { useState, useEffect } from 'react';

export default function SplashPage() {
  const router = useRouter();
  const fullText = 'Every StartUp has a story. This one begins with a click.';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100); // Adjust speed of typing here (100ms per character)
      return () => clearTimeout(typingTimeout);
    } else {
      setIsAnimationComplete(true); // Animation is complete
    }
  }, [index, fullText]);

  const handleTextClick = () => {
    if (isAnimationComplete) {
      router.push('/landing');
    }
  };

  const handleLogoClick = () => {
    router.push('/landing');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Every Startup has a story. This one begins with a click.</title>
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
      <div className={styles.splashContainer}>
        <img
          src="/assets/Logo.png"
          alt="Megheza Logo"
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
        <div
          onClick={handleTextClick}
          style={{ cursor: isAnimationComplete ? 'pointer' : 'default' }}
        >
          <h1 className={styles.tagline}>
            {displayedText}
            <span className={styles.cursor}>|</span>
          </h1>
        </div>
      </div>
    </>
  );
}