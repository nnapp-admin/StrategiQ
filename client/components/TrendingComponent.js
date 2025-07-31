import styles from '../styles/TrendingComponent.module.css';
import PremiumCard from './PremiumCard';

export default function TrendingComponent({ onClose }) {
  const newsItems = [
    {
      id: 1,
      title: 'AI Startups Secure Record Funding in Q2 2025',
      description: 'Artificial intelligence startups saw a 30% increase in investments, with key players like xAI leading the charge.',
      date: 'July 28, 2025',
    },
    {
      id: 2,
      title: 'Indian FinTech Sees Surge in Blockchain Adoption',
      description: 'Blockchain-based solutions are transforming payment systems, with 15% of Indian startups adopting the technology.',
      date: 'July 29, 2025',
    },
  ];

  return (
    <div className={styles.trendingContainer}>
      <div className={styles.cardGrid}>
        {newsItems.map((item) => (
          <div key={item.id} className={styles.newsCard}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            <p className={styles.cardDate}>{item.date}</p>
          </div>
        ))}
        <PremiumCard />
      </div>
    </div>
  );
}