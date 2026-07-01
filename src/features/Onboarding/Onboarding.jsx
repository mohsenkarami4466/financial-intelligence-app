import { useState } from 'react';
import styles from './Onboarding.module.css';
import { useLanguage } from '../../providers/LanguageContext';
import translations from '../../i18n/translations';

export default function Onboarding({ onComplete, initialInterests = [], initialNotification = 'important', isEdit = false }) {
  const { language } = useLanguage();
  const t = translations[language].onboarding;
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState(initialInterests);
  const [notification, setNotification] = useState(initialNotification);

  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete({ interests, notification });
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const interestsList = ['USD', 'Gold', 'Crypto', 'Stocks', 'Economic News'];

  return (
    <div className={styles.onboarding}>
      <div className={styles.progress}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === step ? styles.activeDot : ''}`}
          />
        ))}
      </div>

      <div className={styles.content}>
        {step === 0 && (
          <div className={styles.step}>
            <h1 className={styles.welcomeTitle}>{isEdit ? t.editWelcome : t.welcome}</h1>
            <p className={styles.description}>{isEdit ? t.editWelcomeDesc : t.welcomeDesc}</p>
          </div>
        )}

        {step === 1 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>{t.interestsTitle}</h2>
            <p className={styles.stepDesc}>{t.interestsDesc}</p>
            <div className={styles.interestsGrid}>
              {interestsList.map((item) => (
                <button
                  key={item}
                  className={`${styles.interestBtn} ${interests.includes(item) ? styles.selected : ''}`}
                  onClick={() => toggleInterest(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>{t.notificationTitle}</h2>
            <p className={styles.stepDesc}>{t.notificationDesc}</p>
            <div className={styles.notifOptions}>
              {['important', 'daily', 'realtime'].map((type) => (
                <label key={type} className={styles.notifOption}>
                  <input
                    type="radio"
                    name="notification"
                    value={type}
                    checked={notification === type}
                    onChange={() => setNotification(type)}
                  />
                  <span>{t[type]}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>{t.summary}</h2>
            <p className={styles.stepDesc}>{t.summaryDesc}</p>
            <div className={styles.summaryBox}>
              <p><strong>{t.selectedInterests}:</strong> {interests.length ? interests.join(', ') : t.none}</p>
              <p><strong>{t.selectedNotification}:</strong> {t[notification]}</p>
            </div>
            <button className={styles.skipBtn} onClick={nextStep}>
              {isEdit ? t.saveAndExit : t.finish}
            </button>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {step > 0 && step < 3 && (
          <button className={styles.secondaryBtn} onClick={prevStep}>
            {t.back}
          </button>
        )}
        {step < 3 && (
          <button className={styles.primaryBtn} onClick={nextStep}>
            {step === totalSteps - 2 ? t.review : t.next}
          </button>
        )}
      </div>
    </div>
  );
}