import React from 'react';
import { useRouter } from 'next/router';
import { Crown, TrendingUp, Shield, User, Sparkles } from 'lucide-react';
import styles from '../styles/PremiumCard.module.css';

export default function PremiumCard() {
  const router = useRouter();
  
  const handleUpgradeClick = () => {
    console.log('Redirecting to premium subscription page...');
    router.push('/premium');
  };

  return (
    <div className={styles.container}>
      {/* Animated background orbs */}
      <div className={styles.orbLeft}></div>
      <div className={styles.orbRight}></div>
      
      {/* Main card */}
      <div className={styles.card}>
        
        {/* Floating crown icon */}
        <div className={styles.crownContainer}>
          <div className={styles.crownIcon}>
            <Crown size={24} className={styles.crown} />
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <Sparkles size={20} className={styles.sparkleLeft} />
            <h3 className={styles.title}>
              Cult Pass
            </h3>
            <Sparkles size={20} className={styles.sparkleRight} />
          </div>
        </div>

        {/* Features */}
        <div className={styles.featuresContainer}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <TrendingUp size={20} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Industry Insights</h4>
              <p className={styles.featureDescription}>Stay informed with handpicked news and insights relevant to your startup’s industry — only what truly matters.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Shield size={20} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Legal Verification</h4>
              <p className={styles.featureDescription}>Every transaction made on our platform is legally verified and documented, ensuring complete compliance and peace of mind.</p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <User size={20} className={styles.icon} />
            </div>
            <div className={styles.featureContent}>
              <h4 className={styles.featureTitle}>Dedicated Coach</h4>
              <p className={styles.featureDescription}>Get paired with a personal coach from the start. They’ll help you plan your journey, connect you with the right people, guide smart investments, and work alongside you to execute your vision step by step.</p>
            </div>
          </div>
        </div>

        {/* Pricing and CTA */}
        <div className={styles.footer}>
          <div className={styles.pricingContainer}>
            <div className={styles.pricingBlur}></div>
            <div className={styles.pricingCard}>
              <div className={styles.priceContainer}>
                <span className={styles.price}>₹499</span>
                <span className={styles.period}>/month</span>
              </div>
              <p className={styles.cancelText}>Cancel anytime</p>
            </div>
          </div>

          <button 
            onClick={handleUpgradeClick}
            className={styles.upgradeButton}
          >
            <div className={styles.buttonHover}></div>
            <div className={styles.buttonContent}>
              <span>Upgrade to Premium</span>
              <Crown size={20} className={styles.buttonCrown} />
            </div>
          </button>
        </div>

        {/* Subtle bottom accent */}
        <div className={styles.bottomAccent}></div>
      </div>
    </div>
  );
}