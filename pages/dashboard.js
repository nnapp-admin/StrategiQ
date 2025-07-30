import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MessageCard from '../components/MessageCard';
import UserProfile from '../components/UserProfile';
import ProfileCard from '../components/ProfileCard';
import TrendingComponent from '../components/TrendingComponent';
import PremiumCard from '../components/PremiumCard';
import styles from '../styles/Dashboard.module.css';

// Dynamically import components with SSR disabled
const ContinentsDisplay = dynamic(() => import('../components/ContinentsDisplay'), { ssr: false });
const ContinentShop = dynamic(() => import('../components/ContinentShop'), { ssr: false });

export default function Dashboard() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isContinentsDisplayOpen, setIsContinentsDisplayOpen] = useState(false);
  const [isContinentShopOpen, setIsContinentShopOpen] = useState(false);
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const [user, setUser] = useState({
    name: 'Alex Rivera',
    profession: 'Pulse Narrative',
    bio: 'The Megheza connected me with creators worldwide. Every project here feels like a collaboration with purpose.',
    profilePic: '/assets/profile-placeholder.png',
    isOnline: true,
  });

  const [chatList] = useState([
    { id: 1, name: 'John Smith', lastMessage: 'Hey, check out this story...', time: '10:30 AM', isOnline: true },
    { id: 2, name: 'Emma Wilson', lastMessage: 'Can we discuss the article?', time: 'Yesterday', isOnline: false },
    { id: 3, name: 'Global News Group', lastMessage: 'New assignment posted', time: '2 days ago', isOnline: true },
  ]);

  const [networkUsers] = useState([
    {
      name: 'John Smith',
      profession: 'Freelance Journalist',
      bio: 'Passionate about uncovering hidden stories.',
      profilePic: '/assets/profile-placeholder.png',
      isOnline: true,
    },
    {
      name: 'Emma Wilson',
      profession: 'Editor',
      bio: 'Helping shape narratives that matter.',
      profilePic: '/assets/profile-placeholder.png',
      isOnline: false,
    },
    {
      name: 'Sarah Lee',
      profession: 'Photojournalist',
      bio: 'Capturing the world one frame at a time.',
      profilePic: '/assets/profile-placeholder.png',
      isOnline: true,
    },
    {
      name: 'Michael Chen',
      profession: 'Investigative Reporter',
      bio: 'Digging deep into stories that impact lives.',
      profilePic: '/assets/profile-placeholder.png',
      isOnline: false,
    },
    {
      name: 'Aisha Khan',
      profession: 'Columnist',
      bio: 'Writing to inspire change and spark dialogue.',
      profilePic: '/assets/profile-placeholder.png',
      isOnline: true,
    },
  ]);

  useEffect(() => {
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
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
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

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', {
      phone: e.target.phone.value,
      password: e.target.password.value,
    });
    setIsLoginModalOpen(false);
  };

  const handleNetworkClick = () => {
    setIsDashboardVisible(false);
    setTimeout(() => {
      setIsNetworkOpen(true);
      setIsContinentsDisplayOpen(false);
      setIsContinentShopOpen(false);
      setIsTrendingOpen(false);
      setIsSidebarOpen(false);
      setSelectedContinent(null);
      setSelectedChat(null);
    }, 300);
  };

  const handleShopClick = () => {
    setIsDashboardVisible(false);
    setTimeout(() => {
      setIsContinentsDisplayOpen(true);
      setIsNetworkOpen(false);
      setIsContinentShopOpen(false);
      setIsTrendingOpen(false);
      setIsSidebarOpen(false);
      setSelectedContinent(null);
      setSelectedChat(null);
    }, 300);
  };

  const handleTrendingClick = () => {
    setIsDashboardVisible(false);
    setTimeout(() => {
      setIsTrendingOpen(true);
      setIsNetworkOpen(false);
      setIsContinentsDisplayOpen(false);
      setIsContinentShopOpen(false);
      setIsSidebarOpen(false);
      setSelectedContinent(null);
      setSelectedChat(null);
    }, 300);
  };

  const handleContinentClick = (continentName) => {
    setIsContinentsDisplayOpen(false);
    setSelectedContinent(continentName);
    setTimeout(() => {
      setIsContinentShopOpen(true);
    }, 300);
  };

  const handleCloseComponent = () => {
    setIsNetworkOpen(false);
    setIsContinentsDisplayOpen(false);
    setIsContinentShopOpen(false);
    setIsTrendingOpen(false);
    setSelectedContinent(null);
    setSelectedChat(null);
    setTimeout(() => {
      setIsDashboardVisible(true);
    }, 300);
  };

  const handleMessageClick = (user) => {
    const chat = chatList.find((c) => c.name === user.name) || {
      id: chatList.length + 1,
      name: user.name,
      lastMessage: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOnline: user.isOnline,
    };
    setSelectedChat(chat);
    setIsNetworkOpen(false);
    setIsTrendingOpen(false);
    setIsDashboardVisible(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Journalist Dashboard - The Megheza</title>
      </Head>
      <div className={styles.pageWrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <button className={styles.logo} onClick={handleCloseComponent}>
              <Image src="/assets/Logo.png" alt="The Megheza Logo" width={48} height={48} className={styles.logoImage} />
              <span className={styles.logoText}>FireFounder</span>
            </button>
            <div className={styles.headerButtons}>
              <button className={styles.headerButton} onClick={handleNetworkClick}>
                Network
              </button>
              <button className={styles.headerButton} onClick={handleShopClick}>
                Resources
              </button>
              <button className={styles.headerButton} onClick={handleTrendingClick}>
                Trending
              </button>
            </div>
            <button className={styles.hamburger} onClick={toggleSidebar}>
              ☰
            </button>
          </nav>
        </header>

        <main className={styles.main}>
          <section className={styles.dashboardSection}>
            <div className={styles.container}>
              <div className={`${styles.dashboardContent} ${isDashboardVisible ? styles.visible : styles.hidden}`}>
                <div className={styles.cardContainer}>
                  <UserProfile user={user} setUser={setUser} />
                  <PremiumCard />
                  <div className={styles.messageWrapper}>
                    <MessageCard className={styles.messageCard} chatList={chatList} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
                  </div>
                </div>
              </div>

              {isNetworkOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <div className={styles.networkList}>
                      {networkUsers.map((networkUser, index) => (
                        <ProfileCard
                          key={index}
                          initialUserData={networkUser}
                          isRevealed={true}
                          onMessageClick={() => handleMessageClick(networkUser)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {isContinentsDisplayOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <ContinentsDisplay onContinentClick={handleContinentClick} />
                  </div>
                </div>
              )}
              {isContinentShopOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <ContinentShop continentName={selectedContinent} onClose={handleCloseComponent} />
                  </div>
                </div>
              )}
              {isTrendingOpen && (
                <div className={styles.componentOverlay}>
                  <div className={styles.component}>
                    <button className={styles.closeButton} onClick={handleCloseComponent}>
                      ×
                    </button>
                    <TrendingComponent onClose={handleCloseComponent} />
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>

        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
          <button className={styles.closeSidebar} onClick={toggleSidebar}>
            ×
          </button>
          <button className={styles.sidebarButton} onClick={handleNetworkClick}>
            Network
          </button>
          <button className={styles.sidebarButton} onClick={handleShopClick}>
            Resources
          </button>
          <button className={styles.sidebarButton} onClick={handleTrendingClick}>
            Trending
          </button>
        </div>

        {isLoginModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                ×
              </button>
              <h2>Login to Megheza</h2>
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
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .${styles.logo} {
          border: none;
          outline: none;
          background: none;
          padding: 0;
        }
        .${styles.networkList} {
          display: grid;
          gap: 1rem;
          max-height: 80vh;
          overflow-y: auto;
          padding: 1rem;
        }
        .${styles.cardContainer} {
          display: flex;
          flex-direction: column;
          gap: 0; /* Removed gap to rely on explicit margins */
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}