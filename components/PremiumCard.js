import { useRouter } from 'next/router';
import styles from '../styles/PremiumCard.module.css';

export default function PremiumCard() {
  const router = useRouter();

  const handleUpgradeClick = () => {
    console.log('Redirecting to premium subscription page...');
    router.push('/premium'); // Adjust path as needed
  };

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Subscribe to Premium</h3>
        <p className={styles.description}>
          Get news you must be aware of about your startup industry.
        </p>
        <p className={styles.description}>
          Any transaction done on the platform will be verified.
        </p>
        <p className={styles.price}>₹499 / month</p>
      </div>
      <button className={styles.upgradeButton} onClick={handleUpgradeClick}>
        Upgrade to Premium
      </button>
    </div>
  );
}