/**
 * Contact Form Handler — EmailJS Integration
 */
const ContactForm = (() => {
  const getConfig = () => {
    if (typeof EmailJSConfig === 'undefined') {
      console.warn('Brak EmailJSConfig — uruchom: node scripts/build.mjs');
      return null;
    }
    return EmailJSConfig;
  };

  const init = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      FormValidator.initLiveValidation(form);
      form.addEventListener('submit', handleSubmit);
    }

    const config = getConfig();
    if (!config || typeof emailjs === 'undefined') {
      if (!config) return;
      console.warn('EmailJS not loaded');
      return;
    }

    emailjs.init(config.publicKey);
    console.log('Contact form initialized');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = getConfig();
    if (!config) {
      showFeedback(
        'error',
        'Formularz nie jest skonfigurowany. Skontaktuj się emailem: anna.basznianin@gmail.com',
      );
      return;
    }

    const form = e.target;
    const sanitized = FormValidator.getSanitizedFormData(form);
    const formData = {
      ...sanitized,
      time: new Date().toLocaleString('pl-PL', {
        dateStyle: 'long',
        timeStyle: 'short',
      }),
    };

    const { isValid, errors } = FormValidator.validate(formData);
    if (!isValid) {
      FormValidator.displayErrors(errors);
      return;
    }

    FormValidator.clearErrors();
    setLoadingState(true);

    try {
      await emailjs.send(config.serviceId, config.templateId, formData);

      showFeedback(
        'success',
        'Dziękujemy! Twoja wiadomość została wysłana. Odezwiemy się wkrótce.',
      );

      form.reset();
      FormValidator.clearErrors();
      FormValidator.resetTouched();
    } catch (error) {
      console.error('EmailJS error:', error?.text || error?.message || error);
      showFeedback(
        'error',
        'Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub skontaktuj się bezpośrednio emailem: anna.basznianin@gmail.com',
      );
    } finally {
      setLoadingState(false);
    }
  };

  const setLoadingState = (isLoading) => {
    const button = document.querySelector('.btn-submit');
    const textSpan = button?.querySelector('.button-text');
    const spinner = button?.querySelector('.button-spinner');
    const form = document.getElementById('contact-form');

    if (isLoading) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      textSpan.hidden = true;
      spinner.hidden = false;
      form.querySelectorAll('input, textarea').forEach((el) => {
        el.disabled = true;
      });
    } else {
      button.disabled = false;
      button.setAttribute('aria-busy', 'false');
      textSpan.hidden = false;
      spinner.hidden = true;
      form.querySelectorAll('input, textarea').forEach((el) => {
        el.disabled = false;
      });
    }
  };

  const showFeedback = (type, message) => {
    const feedbackDiv = document.querySelector('[data-form-feedback]');
    const messageP = feedbackDiv?.querySelector('.feedback-message');

    if (!feedbackDiv) return;

    feedbackDiv.className = `form-feedback form-feedback--${type}`;
    feedbackDiv.setAttribute('role', 'alert');
    if (messageP) {
      messageP.textContent = message;
    }

    feedbackDiv.hidden = false;

    setTimeout(() => {
      feedbackDiv.hidden = true;
      feedbackDiv.removeAttribute('role');
    }, 5000);
  };

  return { init };
})();
