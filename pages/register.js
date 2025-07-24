import { useState, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Register.module.css';

// Define Indian states
const indianStates = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra & Nagar Haveli & Daman & Diu', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

// Define questions for each section
const questions = [
  // Section 1: Founder Details
  { section: 1, name: 'fullName', label: 'Full Name (Founder/Co-Founder) (Required)', type: 'text', placeholder: 'Enter your full name', required: true },
  { section: 1, name: 'profilePicture', label: 'Profile Picture (Required, square headshot preferred, 200x200px)', type: 'file', accept: 'image/*', required: true },
  { section: 1, name: 'nationalId', label: 'National Identity Card (Required)', type: 'file', accept: 'image/*,application/pdf', required: true },
  { section: 1, name: 'email', label: 'Email Address (Required, not publicly visible unless chosen)', type: 'email', placeholder: 'Enter your email', required: true },
  { section: 1, name: 'linkedin', label: 'LinkedIn Profile (Optional)', type: 'url', placeholder: 'Enter your LinkedIn profile URL' },
  { section: 1, name: 'district', label: 'District (Required)', type: 'text', placeholder: 'Enter your district', required: true },
  { section: 1, name: 'state', label: 'State or UT (Required)', type: 'singlebutton', options: indianStates, required: true },
  
  // Section 2: Startup Basics
  { section: 2, name: 'startupName', label: 'Startup Name (Required)', type: 'text', placeholder: 'Enter your startup’s name', required: true },
  { section: 2, name: 'startupLogo', label: 'Startup Logo (Optional, square logo preferred)', type: 'file', accept: 'image/*' },
  { section: 2, name: 'website', label: 'Website URL (Optional)', type: 'url', placeholder: 'Enter your startup’s website' },
  { section: 2, name: 'industry', label: 'Startup Industry (Required)', type: 'multibutton', options: ['Fintech', 'HealthTech', 'SaaS', 'D2C', 'Web3', 'EdTech', 'Other'], required: true },
  { section: 2, name: 'foundedYear', label: 'Founded Year (Required)', type: 'number', placeholder: 'Enter founding year (e.g., 2023)', required: true },
  { section: 2, name: 'teamSize', label: 'Team Size (Required)', type: 'singlebutton', options: ['1–5', '6–10', '11–50', '50+'], required: true },

  // Section 3: What Does Your Startup Do?
  { section: 3, name: 'elevatorPitch', label: 'One-liner Elevator Pitch (Required)', type: 'text', placeholder: 'E.g., "AI-powered health companion for chronic disease prevention"', required: true, maxLength: 120 },
  { section: 3, name: 'problem', label: 'Problem You’re Solving (Required)', type: 'textarea', placeholder: 'Describe the problem your startup addresses', required: true, maxLength: 500 },
  { section: 3, name: 'offering', label: 'Core Offering / Product Description (Required)', type: 'textarea', placeholder: 'What does your startup provide?', required: true, maxLength: 500 },

  // Section 4: Traction & Credibility
  { section: 4, name: 'stage', label: 'Stage of Startup (Required)', type: 'singlebutton', options: ['Idea', 'MVP', 'Early Revenue', 'Scaling', 'Funded', 'Acquired'], required: true },
  { section: 4, name: 'traction', label: 'Traction Highlights (Required)', type: 'textarea', placeholder: 'E.g., "10K users", "Raised $100K Pre-Seed", "Partnered with XYZ"', required: true, maxLength: 500 },
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

// Total number of questions (29 steps)
const totalQuestions = questions.length;

export default function RegisterPage() {
  const [step, setStep] = useState(0); // Tracks current question index (0: Intro, 1 to totalQuestions: Questions, totalQuestions + 1: Submission)
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: null,
    nationalId: null,
    email: '',
    linkedin: '',
    district: '',
    state: '',
    startupName: '',
    startupLogo: null,
    website: '',
    industry: [],
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
  const [nationalIdPreview, setNationalIdPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const nationalIdInputRef = useRef(null);
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

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    const setPreview = fieldName === 'startupLogo' ? setLogoPreview : fieldName === 'nationalId' ? setNationalIdPreview : setPreviewImage;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    setErrors((prev) => ({ ...prev, [fieldName]: '' }));
  };

  const handleRemoveImage = (fieldName) => {
    const setPreview = fieldName === 'startupLogo' ? setLogoPreview : fieldName === 'nationalId' ? setNationalIdPreview : setPreviewImage;
    setPreview(null);
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
    const ref = fieldName === 'startupLogo' ? logoInputRef : fieldName === 'nationalId' ? nationalIdInputRef : fileInputRef;
    if (ref.current) {
      ref.current.value = '';
    }
  };

  const validateQuestion = (question) => {
    const newErrors = {};
    const { name, required } = question;

    if (required && (!formData[name] || (Array.isArray(formData[name]) && formData[name].length === 0))) {
      newErrors[name] = `${question.label} is required`;
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
      if (question.required && (!formData[question.name] || (Array.isArray(formData[question.name]) && formData[question.name].length === 0))) {
        newErrors[question.name] = `${question.label} is required`;
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

  const renderQuestion = (question) => {
    const { name, label, type, placeholder, accept, required, maxLength, text, options } = question;

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
            {name === 'nationalId' ? (
              <div className={styles.uploadContainer}>
                <input
                  type="file"
                  id={name}
                  name={name}
                  accept={accept}
                  className={styles.fileInput}
                  onChange={(e) => handleImageChange(e, name)}
                  ref={nationalIdInputRef}
                  required={required}
                />
                {!formData[name] && (
                  <label htmlFor={name} className={styles.customFileUpload}>
                    📤 Upload National ID
                  </label>
                )}
                {formData[name] && (
                  <div className={styles.uploadedFileContainer}>
                    <span className={styles.uploadedFileName}>{formData[name].name}</span>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveImage(name)}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.profileCard}>
                {(name === 'profilePicture' && previewImage) || (name === 'startupLogo' && logoPreview) ? (
                  <>
                    <img
                      src={name === 'startupLogo' ? logoPreview : previewImage}
                      alt={name === 'startupLogo' ? 'Startup Logo Preview' : 'Profile Picture Preview'}
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveImage(name)}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <label htmlFor={name} className={styles.customFileUpload}>
                    📤 {name === 'startupLogo' ? 'Upload Startup Logo' : 'Upload Profile Picture'}
                  </label>
                )}
                <input
                  type="file"
                  id={name}
                  name={name}
                  accept={accept}
                  className={styles.fileInput}
                  onChange={(e) => handleImageChange(e, name)}
                  ref={name === 'startupLogo' ? logoInputRef : fileInputRef}
                  required={required}
                />
              </div>
            )}
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
            <a href="/landingPage" className={styles.logo}>
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
                  <span>Hey Founder!</span>
                ) : step <= totalQuestions ? (
                  <span>Step {step} of {totalQuestions}</span>
                ) : (
                  <span>Review and Submit</span>
                )}
              </div>

              {step === 0 && (
                <div className={styles.intro}>
                  <p>
                    We verify every applicant to ensure a trusted, high-value network. Whether you’re at the idea stage or scaling fast, this space is for founders like you, ready to share, partner, and accelerate. Your startup deserves the right collaborators to succeed.
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
                      Section {questions[step - 1].section}: {questions[step - 1].section === 1 ? 'Founder' : 
                      questions[step - 1].section === 2 ? 'Startup Basics' : 
                      questions[step - 1].section === 3 ? 'Startup Advance' : 
                      questions[step - 1].section === 4 ? 'Credibility' : 
                      questions[step - 1].section === 5 ? 'Interests' : 
                      questions[step - 1].section === 6 ? 'Contact' : 
                      questions[step - 1].section === 7 ? 'Visibility Options' : 'Final Submission'}
                    </h2>
                    {renderQuestion(questions[step - 1])}
                    <div className={styles.buttonGroup}>
                      <button type="button" className={styles.backButton} onClick={handleBack}>
                        Back
                      </button>
                      <button type="button" className={styles.nextButton} onClick={handleNext}>
                        Next
                      </button>
                    </div>
                    <div className={styles.contactLink}>
                      <a
                        href="https://api.whatsapp.com/send/?phone=%2B918472958581&text=Hello%2C+I+need+help+with+registration&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Having Problem? Contact Us
                      </a>
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
                      verified email address — <a href="mailto:cassini.corporation@gmail.com">cassini.corporation@gmail.com</a>.
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
                    <div className={styles.contactLink}>
                      <a
                        href="https://api.whatsapp.com/send/?phone=%2B918472958581&text=Hello%2C+I+need+help+with+registration&type=phone_number&app_absent=0"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Having Problem? Contact Us
                      </a>
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