import { useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Register.module.css';

// Define questions for each section
const questions = [
  // Section 1: Founder Details
  { section: 1, name: 'fullName', label: 'Full Name (Founder or Co-Founder) (Required)', type: 'text', placeholder: 'Enter your full name', required: true },
  { section: 1, name: 'profilePicture', label: 'Profile Picture (Optional, square headshot preferred, 200x200px)', type: 'file', accept: 'image/*' },
  { section: 1, name: 'email', label: 'Email Address (Required, not publicly visible unless chosen)', type: 'email', placeholder: 'Enter your email', required: true },
  { section: 1, name: 'linkedin', label: 'LinkedIn Profile (Optional)', type: 'url', placeholder: 'Enter your LinkedIn profile URL' },
  { section: 1, name: 'location', label: 'Location (City, Country) (Required)', type: 'text', placeholder: 'Enter your city and country', required: true },
  
  // Section 2: Startup Basics
  { section: 2, name: 'startupName', label: 'Startup Name (Required)', type: 'text', placeholder: 'Enter your startup’s name', required: true },
  { section: 2, name: 'startupLogo', label: 'Startup Logo (Optional, square logo preferred)', type: 'file', accept: 'image/*' },
  { section: 2, name: 'website', label: 'Website URL (Required)', type: 'url', placeholder: 'Enter your startup’s website', required: true },
  { section: 2, name: 'industry', label: 'Startup Industry (Required)', type: 'multibutton', options: ['Fintech', 'HealthTech', 'SaaS', 'D2C', 'Web3', 'EdTech', 'Other'], required: true },
  { section: 2, name: 'industryOther', label: 'Specify Other Industry (if selected)', type: 'text', placeholder: 'Describe other industry', conditional: (formData) => formData.industry?.includes('Other'), maxLength: 500 },
  { section: 2, name: 'foundedYear', label: 'Founded Year (Required)', type: 'number', placeholder: 'Enter founding year (e.g., 2023)', required: true },
  { section: 2, name: 'teamSize', label: 'Team Size (Required)', type: 'singlebutton', options: ['1–5', '6–10', '11–50', '50+'], required: true },

  // Section 3: What Does Your Startup Do?
  { section: 3, name: 'elevatorPitch', label: 'One-liner Elevator Pitch (Required, max 120 characters)', type: 'text', placeholder: 'E.g., "AI-powered health companion for chronic disease prevention"', required: true, maxLength: 120 },
  { section: 3, name: 'problem', label: 'Problem You’re Solving (Required, short paragraph)', type: 'textarea', placeholder: 'Describe the problem your startup addresses', required: true, maxLength: 500 },
  { section: 3, name: 'offering', label: 'Core Offering / Product Description (Required)', type: 'textarea', placeholder: 'What does your startup provide?', required: true, maxLength: 500 },

  // Section 4: Traction & Credibility
  { section: 4, name: 'stage', label: 'Stage of Startup (Required)', type: 'singlebutton', options: ['Idea', 'MVP', 'Early Revenue', 'Scaling', 'Funded', 'Acquired'], required: true },
  { section: 4, name: 'traction', label: 'Traction Highlights (Required, max 3 bullet points)', type: 'textarea', placeholder: 'E.g., "10K users", "Raised $100K Pre-Seed", "Partnered with XYZ"', required: true, maxLength: 500 },
  { section: 4, name: 'funding', label: 'Funding Raised (Optional)', type: 'text', placeholder: 'E.g., $100K Pre-Seed' },
  { section: 4, name: 'fundingVisibility', label: 'Show Funding Publicly?', type: 'checkbox', text: 'Make funding details visible in public directory' },

  // Section 5: Partnership & Collaboration Interests
  { section: 5, name: 'lookingFor', label: 'Looking For (Required, select all that apply)', type: 'multibutton', options: ['Co-marketing partners', 'Tech integrations', 'Resellers / channel partners', 'Pilot users', 'Talent exchange', 'Service bartering', 'Investment / Strategic partnerships', 'Mentorship / Advisory', 'Other'], required: true },
  { section: 5, name: 'offer', label: 'What You Offer to Others (Required)', type: 'textarea', placeholder: 'E.g., "API access, joint webinars, or white-label design support"', required: true, maxLength: 500 },
  { section: 5, name: 'collaborationTypes', label: 'Preferred Collaboration Types (Required)', type: 'multibutton', options: ['Revenue-sharing', 'Equity-based', 'Cross-promotion', 'Paid partnerships', 'Volunteer/cause-driven'], required: true },

  // Section 6: Contact Preferences
  { section: 6, name: 'contactMethod', label: 'Best Way to Reach You (Required)', type: 'singlebutton', options: ['Email', 'Platform Chat', 'LinkedIn', 'Other'], required: true },
  { section: 6, name: 'availability', label: 'Availability for Calls (Optional)', type: 'textarea', placeholder: 'E.g., "Mondays 10-12 AM PST, Thursdays 2-4 PM PST"', maxLength: 500 },

  // Section 7: Visibility Options
  { section: 7, name: 'publicProfile', label: 'Profile Visibility', type: 'checkbox', text: 'Make this profile visible in public directory' },
  { section: 7, name: 'verifiedOnly', label: 'Contact Restrictions', type: 'checkbox', text: 'Only allow startups with verified profiles to contact me' },
  { section: 7, name: 'matchNotifications', label: 'Notifications', type: 'checkbox', text: 'Notify me when I get matched with relevant startups' },

  // Section 8: Final Submission
  { section: 8, name: 'terms', label: 'Terms Agreement', type: 'checkbox', text: 'I agree to the platform’s terms of use and data policies', required: true },
];

// Total number of questions
const totalQuestions = questions.length;

export default function RegisterPage() {
  const [step, setStep] = useState(0); // Tracks current question index (0: Intro, 1 to totalQuestions: Questions, totalQuestions + 1: Submission)
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: null,
    email: '',
    linkedin: '',
    location: '',
    startupName: '',
    startupLogo: null,
    website: '',
    industry: [],
    industryOther: '',
    foundedYear: '',
    teamSize: '',
    elevatorPitch: '',
    problem: '',
    offering: '',
    stage: '',
    traction: '',
    funding: '',
    fundingVisibility: false,
    lookingFor: [],
    offer: '',
    collaborationTypes: [],
    contactMethod: '',
    availability: '',
    publicProfile: false,
    verifiedOnly: false,
    matchNotifications: false,
    terms: false,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type !== 'file' && type !== 'checkbox' && value.length > (name === 'elevatorPitch' ? 120 : 500)) return; // Limit to 120 for elevator pitch, 500 for others
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSingleButtonChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleMultiButtonChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e, isLogo = false) => {
    const file = e.target.files[0];
    const targetField = isLogo ? 'startupLogo' : 'profilePicture';
    const setPreview = isLogo ? setLogoPreview : setPreviewImage;
    setFormData((prev) => ({ ...prev, [targetField]: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    setErrors((prev) => ({ ...prev, [targetField]: '' }));
  };

  const handleRemoveImage = (isLogo = false) => {
    const targetField = isLogo ? 'startupLogo' : 'profilePicture';
    const setPreview = isLogo ? setLogoPreview : setPreviewImage;
    setPreview(null);
    setFormData((prev) => ({ ...prev, [targetField]: null }));
    const ref = isLogo ? logoInputRef : fileInputRef;
    if (ref.current) {
      ref.current.value = '';
    }
  };

  const validateQuestion = (question) => {
    const newErrors = {};
    const { name, required, conditional } = question;

    if (conditional && !conditional(formData)) return true;

    if (required && (!formData[name] || (Array.isArray(formData[name]) && formData[name].length === 0))) {
      newErrors[name] = `${question.label} is required`;
    } else if (name === 'industryOther' && formData.industry.includes('Other') && !formData.industryOther) {
      newErrors.industryOther = 'Please specify other industry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 || (step <= totalQuestions && validateQuestion(questions[step - 1]))) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    questions.forEach((question) => {
      if (question.conditional && !question.conditional(formData)) return;
      if (question.required && (!formData[question.name] || (Array.isArray(formData[question.name]) && formData[question.name].length === 0))) {
        newErrors[question.name] = `${question.label} is required`;
      }
      if (question.name === 'industryOther' && formData.industry.includes('Other') && !formData.industryOther) {
        newErrors.industryOther = 'Please specify other industry';
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Registration submitted:', formData);
      // Replace with backend API call
    } else {
      const firstErrorQuestion = questions.find((q) => newErrors[q.name]);
      if (firstErrorQuestion) {
        const errorIndex = questions.indexOf(firstErrorQuestion) + 1;
        setStep(errorIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const renderQuestion = (question, index) => {
    const { name, label, type, placeholder, accept, required, maxLength, text, options } = question;

    // Check if the next question is a conditional "Other" field for the current question
    const isOtherSelected = (name === 'industry' && formData.industry.includes('Other'));
    const nextQuestion = isOtherSelected && index < questions.length - 1 ? questions[index + 1] : null;
    const isNextConditional = nextQuestion && nextQuestion.conditional && nextQuestion.conditional(formData);

    if (question.conditional && !question.conditional(formData)) {
      return null; // Don't render conditional fields unless condition is met
    }

    switch (type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
        return (
          <div key={name} className={styles.formGroup}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleInputChange}
              required={required}
              maxLength={maxLength}
            />
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
            {isNextConditional && renderQuestion(nextQuestion)}
          </div>
        );
      case 'textarea':
        return (
          <div key={name} className={styles.formGroup}>
            <label htmlFor={name}>{label}</label>
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleInputChange}
              required={required}
              maxLength={maxLength}
            ></textarea>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      case 'file':
        return (
          <div key={name} className={styles.formGroup}>
            <label htmlFor={name}>{label}</label>
            <input
              type="file"
              id={name}
              name={name}
              accept={accept}
              className={styles.fileInput}
              onChange={(e) => handleImageChange(e, name === 'startupLogo')}
              ref={name === 'startupLogo' ? logoInputRef : fileInputRef}
            />
            <div className={styles.profileCard}>
              {(name === 'profilePicture' && previewImage) || (name === 'startupLogo' && logoPreview) ? (
                <>
                  <img
                    src={name === 'startupLogo' ? logoPreview : previewImage}
                    alt={name === 'startupLogo' ? 'Startup Logo Preview' : 'Profile Picture Preview'}
                    className={styles.previewImage}
                  />
                  <button type="button" className={styles.removeButton} onClick={() => handleRemoveImage(name === 'startupLogo')}>
                    ×
                  </button>
                </>
              ) : (
                <label htmlFor={name} className={styles.customFileUpload}>
                  📤 {name === 'startupLogo' ? 'Upload Startup Logo' : 'Upload Profile Picture'}
                </label>
              )}
            </div>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      case 'singlebutton':
        return (
          <div key={name} className={styles.formGroup}>
            <label>{label}</label>
            <div className={styles.roleGroup}>
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.roleButton} ${formData[name] === option ? styles.selected : ''}`}
                  onClick={() => handleSingleButtonChange(name, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
            {isNextConditional && renderQuestion(nextQuestion)}
          </div>
        );
      case 'multibutton':
        return (
          <div key={name} className={styles.formGroup}>
            <label>{label}</label>
            <div className={styles.roleGroup}>
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.roleButton} ${formData[name].includes(option) ? styles.selected : ''}`}
                  onClick={() => handleMultiButtonChange(name, option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
            {isNextConditional && renderQuestion(nextQuestion)}
          </div>
        );
      case 'checkbox':
        return (
          <div key={name} className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={handleInputChange}
                required={required}
              />
              {text}
            </label>
            {errors[name] && <p className={styles.error}>{errors[name]}</p>}
          </div>
        );
      default:
        return (
          <div key={name} className={styles.formGroup}>
            <p className={styles.error}>No input defined for this step. Please report this issue.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Register - StrategiQ Collaboration Platform</title>
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
      <div className={styles.registerContainer}>
        <header className={styles.siteHeader}>
          <nav className={styles.siteNav}>
            <a href="#" className={styles.logo}>
              <img src="/assets/Logo.png" alt="StartupSync Logo" className={styles.logoImage} />
              StrategiQ
            </a>
          </nav>
        </header>
        <main className={styles.main}>
          <section className={styles.registerSection}>
            <div className={styles.container}>
              <div className={styles.progressBar}>
                {step === 0 ? (
                  <span>Introduction</span>
                ) : step <= totalQuestions ? (
                  <span>Question {step} of {totalQuestions}</span>
                ) : (
                  <span>Review and Submit</span>
                )}
              </div>

              {step === 0 && (
                <div className={styles.intro}>
                  <p>
                    Welcome to StartupSync—a curated platform where startup founders don’t just network, they collaborate to grow. This form is your entry into a community built for builders, by builders, where real partnerships drive real results.
                  </p>
                  <p>
                    We verify every applicant to ensure a trusted, high-value network. Whether you’re at the idea stage or scaling fast, this space is for founders ready to share, partner, and accelerate. Your startup deserves the right collaborators to succeed.
                  </p>
                  <p>
                    This isn’t for hobbyists or solo dreamers—it’s for founders committed to building something big, together.
                  </p>
                  <p>
                    <strong>If that’s you—let’s get started.</strong>
                  </p>
                  <button type="button" className={styles.nextButton} onClick={handleNext}>
                    Start Application
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.registerForm}>
                {step > 0 && step <= totalQuestions && (
                  <>
                    <h2 className={styles.sectionHeader}>
                      Section {questions[step - 1].section}: {questions[step - 1].section === 1 ? 'Founder Details' : 
                      questions[step - 1].section === 2 ? 'Startup Basics' : 
                      questions[step - 1].section === 3 ? 'What Does Your Startup Do?' : 
                      questions[step - 1].section === 4 ? 'Traction & Credibility' : 
                      questions[step - 1].section === 5 ? 'Partnership & Collaboration Interests' : 
                      questions[step - 1].section === 6 ? 'Contact Preferences' : 
                      questions[step - 1].section === 7 ? 'Visibility Options' : 'Final Submission'}
                    </h2>
                    {renderQuestion(questions[step - 1], step - 1)}
                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        Back
                      </button>
                      <button type="button" className={styles.nextButton} onClick={handleNext}>
                        Next
                      </button>
                    </div>
                  </>
                )}

                {step === totalQuestions + 1 && (
                  <>
                    <h2 className={styles.sectionHeader}>Review and Submit</h2>
                    <p className={styles.note}>
                      Applications are reviewed individually to maintain the quality and trust of this network. Due to high demand, review times may occasionally exceed the standard 48–72 hour window. Thank you for your patience and commitment.
                    </p>
                    <p className={styles.warning}>
                      <strong>Please note:</strong> Official access links and communication will only be sent from our
                      verified email address — <a href="mailto:founders@startupsync.com">founders@startupsync.com</a>.
                      Do not respond to or engage with messages from any other source. We strongly advise you to avoid
                      third-party messages or unsolicited offers claiming to represent this platform.
                    </p>
                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        Back
                      </button>
                      <button type="submit" className={styles.submitButton}>
                        Submit Application
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </section>
        </main>
        <footer className={styles.siteFooter}>
          <div className={styles.container}>
            <div className={styles.footerBottom}>
              <p>Copyright © 2025 StartupSync. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}