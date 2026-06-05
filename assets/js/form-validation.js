/**
 * Form Validation Module
 */
const FormValidator = (() => {
  const LIMITS = {
    name: { min: 2, max: 100 },
    email: { max: 254 },
    phone: { max: 20 },
    message: { min: 10, max: 2000 },
  };

  const NAME_REGEX = /^[\p{L}\s'.-]{2,100}$/u;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const touched = new Set();

  const trim = (value) => (typeof value === "string" ? value.trim() : "");

  const validateName = (value) => {
    const name = trim(value);
    if (!name) return "Imię i nazwisko są wymagane";
    if (name.length < LIMITS.name.min)
      return `Imię i nazwisko musi mieć co najmniej ${LIMITS.name.min} znaki`;
    if (name.length > LIMITS.name.max)
      return `Imię i nazwisko może mieć maksymalnie ${LIMITS.name.max} znaków`;
    if (!NAME_REGEX.test(name))
      return "Użyj tylko liter, spacji, myślników lub apostrofów";
    return null;
  };

  const validateEmail = (value) => {
    const email = trim(value);
    if (!email) return "Email jest wymagany";
    if (email.length > LIMITS.email.max)
      return `Email może mieć maksymalnie ${LIMITS.email.max} znaków`;
    if (!EMAIL_REGEX.test(email)) return "Podaj prawidłowy adres email";
    return null;
  };

  const validatePhone = (value) => {
    const phone = trim(value);
    if (!phone) return null;

    if (phone.length > LIMITS.phone.max)
      return `Numer telefonu może mieć maksymalnie ${LIMITS.phone.max} znaków`;

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 9) return null;
    if (digits.length === 11 && digits.startsWith("48")) return null;

    return "Podaj prawidłowy numer (9 cyfr, np. 607 850 049)";
  };

  const validateMessage = (value) => {
    const message = trim(value);
    if (!message) return "Wiadomość jest wymagana";
    if (message.length < LIMITS.message.min)
      return `Wiadomość musi mieć co najmniej ${LIMITS.message.min} znaków`;
    if (message.length > LIMITS.message.max)
      return `Wiadomość może mieć maksymalnie ${LIMITS.message.max} znaków`;
    return null;
  };

  const fieldValidators = {
    name: validateName,
    email: validateEmail,
    phone: validatePhone,
    message: validateMessage,
  };

  const getFormData = (form) => ({
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
  });

  const getSanitizedFormData = (form) => {
    const raw = getFormData(form);
    return {
      name: trim(raw.name),
      email: trim(raw.email),
      phone: trim(raw.phone),
      message: trim(raw.message),
    };
  };

  const validateField = (field, value) => {
    const validator = fieldValidators[field];
    return validator ? validator(value) : null;
  };

  const validate = (formData) => {
    const errors = {};

    Object.keys(fieldValidators).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const setFieldError = (field, message) => {
    const input = document.getElementById(field);
    const errorSpan = document.querySelector(`[data-error-for="${field}"]`);

    if (input) {
      input.classList.toggle("form-error-field", Boolean(message));
      input.setAttribute("aria-invalid", message ? "true" : "false");

      if (message) {
        input.classList.remove("shake");
        void input.offsetWidth;
        input.classList.add("shake");
        setTimeout(() => input.classList.remove("shake"), 400);
      }
    }

    if (errorSpan) {
      errorSpan.textContent = message || "";
    }
  };

  const displayErrors = (errors) => {
    Object.keys(fieldValidators).forEach((field) => {
      setFieldError(field, errors[field] || null);
    });

    const firstErrorField = document.querySelector(".form-error-field");
    if (firstErrorField) firstErrorField.focus();
  };

  const clearFieldError = (field) => setFieldError(field, null);

  const clearErrors = () => {
    Object.keys(fieldValidators).forEach(clearFieldError);
  };

  const validateAndShow = (field, value) => {
    const error = validateField(field, value);
    setFieldError(field, error);
    return !error;
  };

  const initLiveValidation = (form) => {
    if (!form) return;

    Object.keys(fieldValidators).forEach((field) => {
      const input = form.elements[field];
      if (!input) return;

      input.addEventListener("blur", () => {
        touched.add(field);
        validateAndShow(field, input.value);
      });

      input.addEventListener("input", () => {
        if (!touched.has(field)) return;
        validateAndShow(field, input.value);
      });
    });

    form.addEventListener("submit", () => {
      Object.keys(fieldValidators).forEach((field) => touched.add(field));
    });
  };

  const resetTouched = () => {
    touched.clear();
  };

  return {
    getFormData,
    getSanitizedFormData,
    validate,
    validateField,
    displayErrors,
    clearErrors,
    clearFieldError,
    initLiveValidation,
    resetTouched,
  };
})();
