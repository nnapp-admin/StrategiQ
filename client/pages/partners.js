import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Partners.module.css';

export default function Partners() {
  const [activeTab, setActiveTab] = useState('human');
  const [expandedServices, setExpandedServices] = useState({});

  useEffect(() => {
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

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const toggleService = (index) => {
    setExpandedServices((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const services = [
    {
      human: [
        { name: 'Product Manager', description: 'Oversees MVP design, prioritization, and market validation.' },
        { name: 'UX Designer', description: 'Creates user flows, wireframes, and conducts usability testing.' },
        { name: 'UI Designer', description: 'Designs visually appealing interfaces and design systems.' },
        { name: 'Frontend Developer', description: 'Builds responsive web interfaces using React or similar.' },
        { name: 'Backend Developer', description: 'Develops server-side logic, databases, and REST APIs.' },
        { name: 'Mobile App Developer (iOS)', description: 'Builds native iOS apps using Swift.' },
        { name: 'Mobile App Developer (Android)', description: 'Builds native Android apps using Kotlin.' },
        { name: 'Cross-platform Developer', description: 'Develops apps using Flutter or React Native.' },
        { name: 'DevOps Engineer', description: 'Manages CI/CD pipelines and cloud infrastructure.' },
        { name: 'QA Engineer', description: 'Performs manual and automated testing to ensure quality.' },
        { name: 'Fractional CTO', description: 'Provides tech strategy, roadmapping, and stack selection.' },
        { name: 'Cybersecurity Specialist', description: 'Ensures compliance and security for fintech/health apps.' },
      ],
      tools: [
        { name: 'Wireframing Tool', description: 'Facilitates rapid creation of UI prototypes.' },
        { name: 'Prototyping Tool', description: 'Enables interactive MVP mockups for validation.' },
        { name: 'Design System Tool', description: 'Manages reusable UI components and styles.' },
        { name: 'Frontend Framework', description: 'Powers responsive web app development.' },
        { name: 'Backend Framework', description: 'Supports scalable server-side development.' },
        { name: 'API Testing Tool', description: 'Tests and validates REST and GraphQL APIs.' },
        { name: 'Automated Testing Tool', description: 'Runs unit, integration, and end-to-end tests.' },
        { name: 'CI/CD Platform', description: 'Automates code deployment and integration.' },
        { name: 'Cloud Infrastructure Tool', description: 'Manages scalable hosting and databases.' },
      ],
    },
    {
      human: [
        { name: 'Corporate Lawyer', description: 'Handles company formation in India, US, or Delaware.' },
        { name: 'Contract Lawyer', description: 'Drafts founders’ agreements, ESOPs, and contracts.' },
        { name: 'IP Lawyer', description: 'Secures trademarks, copyrights, and patents.' },
        { name: 'Compliance Consultant', description: 'Ensures adherence to GDPR, PCI-DSS, and local laws.' },
        { name: 'Investment Lawyer', description: 'Prepares SAFEs, term sheets, and investor agreements.' },
        { name: 'International Lawyer', description: 'Advises on cross-border entity setup and legalities.' },
        { name: 'Privacy Policy Specialist', description: 'Drafts compliant privacy policies and T&Cs.' },
      ],
      tools: [],
    },
    {
      human: [
        { name: 'Pitch Deck Designer', description: 'Crafts compelling, investor-ready presentations.' },
        { name: 'Financial Modeler', description: 'Builds 3–5 year financial projections and runway models.' },
        { name: 'Investor Researcher', description: 'Identifies and shortlists relevant investors.' },
        { name: 'Fundraising Strategist', description: 'Manages outreach, follow-ups, and campaigns.' },
        { name: 'Cap Table Advisor', description: 'Advises on equity dilution and term sheets.' },
        { name: 'Due Diligence Specialist', description: 'Prepares data rooms and audit checklists.' },
        { name: 'Grant Writer', description: 'Secures non-dilutive funding for tech or R&D.' },
      ],
      tools: [
        { name: 'Presentation Design Tool', description: 'Creates professional pitch decks.' },
        { name: 'Financial Modeling Software', description: 'Builds cash flow and projection models.' },
        { name: 'Investor CRM', description: 'Tracks investor outreach and relationships.' },
        { name: 'Virtual Data Room', description: 'Stores and shares due diligence documents.' },
      ],
    },
    {
      human: [
        { name: 'SEO Specialist', description: 'Optimizes websites for organic search rankings.' },
        { name: 'PPC Campaign Manager', description: 'Runs paid ads on Google and Meta platforms.' },
        { name: 'Content Strategist', description: 'Develops blog, video, and social media content.' },
        { name: 'Social Media Manager', description: 'Schedules posts and engages audiences.' },
        { name: 'Growth Hacker', description: 'Designs viral loops and referral campaigns.' },
        { name: 'Product Marketing Manager', description: 'Crafts go-to-market strategies and messaging.' },
        { name: 'Conversion Rate Optimizer', description: 'Improves funnels using A/B tests and heatmaps.' },
        { name: 'ASO Specialist', description: 'Optimizes app store listings for visibility.' },
      ],
      tools: [
        { name: 'SEO Analysis Tool', description: 'Tracks rankings and site performance.' },
        { name: 'Ad Management Platform', description: 'Manages PPC campaigns across channels.' },
        { name: 'Content Scheduling Tool', description: 'Plans and posts social media content.' },
        { name: 'Analytics Dashboard', description: 'Monitors traffic, conversions, and funnels.' },
        { name: 'A/B Testing Tool', description: 'Tests variations to optimize conversions.' },
        { name: 'Email Automation Platform', description: 'Sends drip campaigns and newsletters.' },
        { name: 'ASO Optimization Tool', description: 'Improves app store rankings and downloads.' },
      ],
    },
    {
      human: [
        { name: 'Bookkeeper', description: 'Maintains monthly financial records and expenses.' },
        { name: 'Financial Analyst', description: 'Tracks runway and builds financial forecasts.' },
        { name: 'Tax Accountant', description: 'Handles startup-specific tax filings and credits.' },
        { name: 'Virtual CFO', description: 'Provides strategic financial planning and reporting.' },
        { name: 'Payroll Administrator', description: 'Manages payroll and ensures compliance.' },
        { name: 'Auditor', description: 'Conducts expense audits for grants or capital.' },
      ],
      tools: [
        { name: 'Accounting Software', description: 'Tracks expenses and financial records.' },
        { name: 'Financial Dashboard Tool', description: 'Visualizes runway and burn rate.' },
        { name: 'Tax Preparation Software', description: 'Simplifies tax filing and compliance.' },
        { name: 'Payroll Processing Tool', description: 'Automates payroll and tax calculations.' },
      ],
    },
    {
      human: [
        { name: 'Industry Analyst', description: 'Curates updates on funding and tech trends.' },
        { name: 'Content Writer', description: 'Writes founder stories and ecosystem insights.' },
        { name: 'Market Researcher', description: 'Tracks regulatory changes and consumer shifts.' },
        { name: 'Newsletter Editor', description: 'Compiles and distributes news updates.' },
      ],
      tools: [],
    },
  ];

  const humanFormUrl = 'https://forms.gle/jYYN3XNHYXXkvP777';
  const toolFormUrl = 'https://forms.gle/bLeSE8FGLBXHr1Ht8';

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Partners - FounderCult</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Helvetica:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.pageWrapper}>
        <header>
          <nav className={styles.container}>
            <a href="/" className={styles.logo}>
              <img src="/assets/Logo.png" alt="FounderCult Logo" className={styles.logoImage} />
              FounderCult
            </a>
          </nav>
        </header>
        <main>
          <section className={styles.hero}>
            <div className={styles.container}>
              <h1>Our Partner Ecosystem</h1>
              <p>
                Join our network of specialized professionals and innovative tools to empower startups worldwide.
              </p>
            </div>
          </section>
          <section className={styles.partnersSection}>
            <div className={styles.container}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'human' ? styles.active : ''}`}
                  onClick={() => setActiveTab('human')}
                >
                  Human👶
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
                  onClick={() => setActiveTab('tools')}
                >
                  Software/AI🤖
                </button>
              </div>
              <div className={styles.tabContent}>
                {activeTab === 'human' && (
                  <div className={styles.cardGrid}>
                    {services.map((service, index) =>
                      service.human.map((item, i) => (
                        <div className={styles.card} key={`human-${index}-${i}`}>
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                          <a href={humanFormUrl} target="_blank" rel="noopener noreferrer" className={styles.applyButton}>
                            Apply
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {activeTab === 'tools' && (
                  <div className={styles.cardGrid}>
                    {services.map((service, index) =>
                      service.tools.map((item, i) => (
                        <div className={styles.card} key={`tool-${index}-${i}`}>
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                          <a href={toolFormUrl} target="_blank" rel="noopener noreferrer" className={styles.applyButton}>
                            Apply
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footerContent}>
              <div className={styles.footerSection}></div>
              <div className={styles.footerSection}></div>
              <div className={styles.footerSection}>
                <h3>Company</h3>
                <ul>
                  <li><a href="/About#about-us">About Us</a></li>
                  <li><a href="/About#privacy-policy">Privacy Policy</a></li>
                  <li><a href="/About#terms-of-service">Terms of Service</a></li>
                  <li><a href="/About#careers">Careers</a></li>
                </ul>
              </div>
              <div className={styles.footerSection}></div>
            </div>
            <div className={styles.footerBottom}>
              <p>Copyright © {new Date().getFullYear()} FounderCult.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}