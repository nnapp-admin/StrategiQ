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
  { section: 1, name: 'fullName', label: 'Full Name (Founder/Co-Founder)*', type: 'text', placeholder: 'Enter your full name', required: true },
  { section: 1, name: 'profilePicture', label: 'Profile Picture* (square headshot preferred, 200x200px, max 200KB)', type: 'file', accept: 'image/*', required: true },
  { section: 1, name: 'nationalId', label: 'National Identity Card* (max 200KB)', type: 'file', accept: 'image/*', required: true },
  { section: 1, name: 'email', label: 'Email Address* (not publicly visible unless chosen)', type: 'email', placeholder: 'Enter your email', required: true },
  { section: 1, name: 'whatsappNumber', label: 'WhatsApp Number*', type: 'tel', placeholder: 'Enter your WhatsApp number', required: true },
  { section: 1, name: 'whatsappPassword', label: 'Password*', type: 'password', placeholder: 'Enter your WhatsApp password', required: true },
  { section: 1, name: 'linkedin', label: 'LinkedIn Profile (Optional)', type: 'url', placeholder: 'Enter your LinkedIn profile URL' },
  { section: 1, name: 'district', label: 'District*', type: 'text', placeholder: 'Enter your district', required: true },
  { section: 1, name: 'state', label: 'State or UT*', type: 'singlebutton', options: indianStates, required: true },
  
  // Section 2: Startup Basics
  { section: 2, name: 'startupName', label: 'Startup Name*', type: 'text', placeholder: 'Enter your startup’s name', required: true },
  { section: 2, name: 'startupLogo', label: 'Startup Logo* (square logo preferred, max 200KB)', type: 'file', accept: 'image/*', required: true },
  { section: 2, name: 'website', label: 'Website URL (Optional)', type: 'url', placeholder: 'Enter your startup’s website' },
  { section: 2, name: 'industry', label: 'Startup Industry*', type: 'multibutton', options: [
    'Fintech', 'HealthTech', 'SaaS', 'D2C', 'Web3', 'EdTech', 'AI/ML', 'AgriTech', 
    'CleanTech', 'Gaming', 'RetailTech', 'FoodTech', 'BioTech', 'AdTech', 'TravelTech', 'Other'
  ], required: true },
  { section: 2, name: 'foundedYear', label: 'Founded Year*', type: 'number', placeholder: 'Enter founding year (e.g., 2023)', required: true },
  { section: 2, name: 'teamSize', label: 'Team Size*', type: 'singlebutton', options: ['1–5', '6–10', '11–50', '50+'], required: true },

  // Section 3: What Does Your Startup Do?
  { section: 3, name: 'elevatorPitch', label: 'One-liner Elevator Pitch*', type: 'text', placeholder: 'E.g., "AI-powered health companion for chronic disease prevention"', required: true, maxLength: 120 },
  { section: 3, name: 'problem', label: 'Problem You’re Solving*', type: 'textarea', placeholder: 'Describe the problem your startup addresses', required: true, maxLength: 500 },
  { section: 3, name: 'offering', label: 'Core Offering / Product Description*', type: 'textarea', placeholder: 'What does your startup provide?', required: true, maxLength: 500 },

  // Section 4: Traction & Credibility
  { section: 4, name: 'stage', label: 'Stage of Startup*', type: 'singlebutton', options: ['Idea', 'MVP', 'Early Revenue', 'Scaling', 'Funded', 'Acquired'], required: true },
  { section: 4, name: 'traction', label: 'Traction Highlights*', type: 'textarea', placeholder: 'E.g., "10K users", "Raised $100K Pre-Seed", "Partnered with XYZ"', required: true, maxLength: 500 },
  { section: 4, name: 'funding', label: 'Funding Raised (Optional)', type: 'text', placeholder: 'E.g., $100K Pre-Seed' },
  { section: 4, name: 'fundingVisibility', label: 'Show Funding Publicly?', type: 'checkbox', text: 'Make funding details visible in public directory' },

  // Section 5: Partnership & Collaboration Interests
  { section: 5, name: 'lookingFor', label: 'Looking For* (select all that apply)', type: 'multibutton', options: ['Co-marketing partners', 'Tech integrations', 'Resellers / channel partners', 'Pilot users', 'Talent exchange', 'Service bartering', 'Investment / Strategic partnerships', 'Mentorship / Advisory', 'Other'], required: true },

  // Section 6: Visibility Options
  { section: 6, name: 'publicProfile', label: 'Profile Visibility', type: 'checkbox', text: 'Make this profile visible in public directory' },

  // Section 7: Final Submission
  { section: 7, name: 'terms', label: 'Terms Agreement*', type: 'checkbox', text: 'I agree to the platform’s Terms of Service & Privacy Policies', required: true },
];

const totalQuestions = questions.length;

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    profilePicture: null,
    nationalId: null,
    email: '',
    whatsappNumber: '',
    whatsappPassword: '',
    linkedin: '',
    district: '',
    state: '',
    startupName: '',
    startupLogo: null,
    website: '',
    industry: [],
    otherIndustry: '',
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
    publicProfile: false,
    terms: false,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [nationalIdPreview, setNationalIdPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const nationalIdInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type !== 'file' && type !== 'checkbox' && value.length > (name === 'elevatorPitch' ? 120 : name === 'whatsappNumber' ? 15 : name === 'otherIndustry' ? 100 : 500)) return;
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
    const ref = fieldName === 'startupLogo' ? logoInputRef : fieldName === 'nationalId' ? nationalIdInputRef : fileInputRef;

    if (file) {
      // Check file size (200KB = 204800 bytes)
      if (file.size > 204800) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: `File size exceeds 200KB. Please compress the image using this tool: https://www.iloveimg.com/compress-image`,
        }));
        if (ref.current) {
          ref.current.value = ''; // Clear the input
        }
        return;
      }

      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFormData((prev) => ({ ...prev, [fieldName]: null }));
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
    const { name, required, type } = question;

    if (required && (!formData[name] || (Array.isArray(formData[name]) && formData[name].length === 0))) {
      newErrors[name] = '⚠️ Answer required to continue';
    }

    if (name === 'whatsappNumber' && formData[name]) {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(formData[name])) {
        newErrors[name] = 'Please enter a valid WhatsApp number (10-15 digits)';
      }
    }

    if (name === 'whatsappPassword' && formData[name] && formData[name].length < 6) {
      newErrors[name] = 'WhatsApp password must be at least 6 characters';
    }

    if (name === 'website' && formData[name] && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(formData[name])) {
      newErrors[name] = 'Please enter a valid URL (e.g., https://example.com)';
    }

    if (name === 'foundedYear' && formData[name]) {
      const year = parseInt(formData[name], 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear) {
        newErrors[name] = `Founded year must be between 1900 and ${currentYear}`;
      }
    }

    if (name === 'industry' && formData.industry.includes('Other') && !formData.otherIndustry) {
      newErrors.otherIndustry = 'Please specify the industry';
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    questions.forEach((question) => {
      if (!validateQuestion(question)) {
        const error = errors[question.name];
        if (error) newErrors[question.name] = error;
        isValid = false;
      }
    });

    // Validate otherIndustry if 'Other' is selected
    if (formData.industry.includes('Other') && !formData.otherIndustry) {
      newErrors.otherIndustry = 'Please specify the industry';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      try {
        const dataToSend = { ...formData };
        if (dataToSend.profilePicture instanceof File) {
          dataToSend.profilePicture = await convertToBase64(dataToSend.profilePicture);
        }
        if (dataToSend.nationalId instanceof File) {
          dataToSend.nationalId = await convertToBase64(dataToSend.nationalId);
        }
        if (dataToSend.startupLogo instanceof File) {
          dataToSend.startupLogo = await convertToBase64(dataToSend.startupLogo);
        }

        const response = await fetch('http://localhost:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            fullName: '',
            profilePicture: null,
            nationalId: null,
            email: '',
            whatsappNumber: '',
            whatsappPassword: '',
            linkedin: '',
            district: '',
            state: '',
            startupName: '',
            startupLogo: null,
            website: '',
            industry: [],
            otherIndustry: '',
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
            publicProfile: false,
            terms: false,
          });
          setPreviewImage(null);
          setNationalIdPreview(null);
          setLogoPreview(null);
          setStep(0);
        } else {
          const error = await response.json();
          if (error.errors) {
            setErrors(error.errors);
            const firstErrorQuestion = questions.find((q) => error.errors[q.name]);
            if (firstErrorQuestion) {
              const errorIndex = questions.indexOf(firstErrorQuestion) + 1;
              setStep(errorIndex);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (error.errors.otherIndustry) {
              setStep(questions.findIndex((q) => q.name === 'industry') + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          } else {
            alert(`Error: ${error.message}`);
          }
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('An error occurred while submitting the form.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const firstErrorQuestion = questions.find((q) => newErrors[q.name]) || (newErrors.otherIndustry ? questions.find((q) => q.name === 'industry') : null);
      if (firstErrorQuestion) {
        const errorIndex = questions.indexOf(firstErrorQuestion) + 1;
        setStep(errorIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const renderQuestion = (question) => {
    const { name, label, type, placeholder, accept, required, maxLength, text, options } = question;

    switch (type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
      case 'tel':
      case 'password':
        return (
          <div key={name} className={styles.formGroup}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name] || ''}
              onChange={handleInputChange}
              required={required}
              maxLength={maxLength || (name === 'whatsappNumber' ? 15 : undefined)}
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
              value={formData[name] || ''}
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
            {errors[name] && (
              <p className={styles.error}>
                {errors[name].includes('https://www.iloveimg.com/compress-image') ? (
                  <>
                    {errors[name].split('https://www.iloveimg.com/compress-image')[0]}
                    <a
                      href="https://www.iloveimg.com/compress-image"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.errorLink}
                    >
                      https://www.iloveimg.com/compress-image
                    </a>
                  </>
                ) : (
                  errors[name]
                )}
              </p>
            )}
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
            {name === 'industry' && formData.industry.includes('Other') && (
              <div className={styles.formGroup}>
                <label htmlFor="otherIndustry">Other Industry*</label>
                <input
                  type="text"
                  id="otherIndustry"
                  name="otherIndustry"
                  placeholder="Specify your industry"
                  value={formData.otherIndustry || ''}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                />
                {errors.otherIndustry && <p className={styles.error}>{errors.otherIndustry}</p>}
              </div>
            )}
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
              {name === 'terms' ? (
                <>
                  I agree to the platform’s{' '}
                  <span className={styles.termsLink} onClick={openModal}>
                    Terms of Service & Privacy Policies
                  </span>
                </>
              ) : (
                text
              )}
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
        <title>Register - FounderCult</title>
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
            <a href="/" className={styles.logo}>
              <img src="/assets/Logo.png" alt="StrategiQ Logo" className={styles.logoImage} />
              FounderCult
            </a>
          </nav>
        </header>
        <main className={styles.main}>
          <section className={styles.registerSection}>
            <div className={styles.container}>
              <div className={styles.progressBar}>
                {step === 0 ? (
                  <span></span>
                ) : step <= totalQuestions ? (
                  <span>Step {step} of {totalQuestions}</span>
                ) : (
                  <span></span>
                )}
              </div>

              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <h2>Application Submitted!</h2>
                  <p>
                    Thank you for applying! We're reviewing your profile and will update you once the verification process is complete.
                  </p>
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Start New Application
                  </button>
                </div>
              ) : step === 0 ? (
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
              ) : (
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                  {step > 0 && step <= totalQuestions && (
                    <>
                      <h2 className={styles.sectionHeader}>
                        Section {questions[step - 1].section}: {questions[step - 1].section === 1 ? 'Founder Details' : 
                        questions[step - 1].section === 2 ? 'Startup Basics' : 
                        questions[step - 1].section === 3 ? 'What Does Your Startup Do?' : 
                        questions[step - 1].section === 4 ? 'Traction & Credibility' : 
                        questions[step - 1].section === 5 ? 'Partnership & Collaboration Interests' : 
                        questions[step - 1].section === 6 ? 'Visibility Options' : 'Final Submission'}
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
                        <button
                          type="submit"
                          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              Submitting
                              <span className={styles.loader}></span>
                            </>
                          ) : (
                            'Submit Application'
                          )}
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
              )}
            </div>
          </section>
        </main>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <button className={styles.modalClose} onClick={closeModal}>
                ×
              </button>
              <div className={styles.modalContent}>
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
              </div>
            </div>
          </div>
        )}
        <footer className={styles.siteFooter}>
          <div className={styles.container}>
            <div className={styles.footerBottom}>
              <p>Copyright © 2025 FounderCult. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}