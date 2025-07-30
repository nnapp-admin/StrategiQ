import Image from 'next/image';
import styles from '../styles/Dashboard.module.css';

const ContinentsDisplay = ({ onContinentClick }) => {
  const continents = [
    { name: 'Product Development', image: '/assets/Product.jpg' },
    { name: 'Legal Assistance', image: '/assets/Legal.jpg' },
    { name: 'Team Hiring', image: '/assets/Hiring.jpg' },
    { name: 'Investment', image: '/assets/Investement.jpg' },
    { name: 'Marketing', image: '/assets/Marketing.jpg' },
    { name: 'Finance & Accounting', image: '/assets/Finance.jpg' },
    { name: 'Ask my Own', image: '/assets/Ask.jpg' },
  ];

  return (
    <div className={styles.profileGrid}>
      {continents.map((continent) => (
        <div
          key={continent.name}
          className={styles.continentCard}
          onClick={continent.name !== 'Add your own' ? () => onContinentClick(continent.name) : undefined}
        >
          <div className={styles.thumbnailContainer}>
            <Image
              src={continent.image}
              alt={`${continent.name} thumbnail`}
              width={200}
              height={200}
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{continent.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContinentsDisplay;