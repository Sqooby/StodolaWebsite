/**
 * Form Validation Module
 * Validates contact form fields and displays error messages
 */

const FormValidator = (() => {
    /**
     * Validate form data
     * @param {Object} formData - Object with form field values
     * @returns {Object} { isValid: boolean, errors: Object }
     */
    const validate = (formData) => {
        const errors = {};

        // Name validation
        if (!formData.name || !formData.name.trim()) {
            errors.name = 'Imię i nazwisko są wymagane';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !formData.email.trim()) {
            errors.email = 'Email jest wymagany';
        } else if (!emailRegex.test(formData.email.trim())) {
            errors.email = 'Podaj prawidłowy adres email';
        }

        // Message validation
        if (!formData.message || !formData.message.trim()) {
            errors.message = 'Wiadomość jest wymagana';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    /**
     * Display validation errors in the form
     * @param {Object} errors - Error object from validate()
     */
    const displayErrors = (errors) => {
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input, textarea').forEach(el => {
            el.classList.remove('form-error-field');
        });

        // Display new errors with shake animation
        Object.entries(errors).forEach(([field, message]) => {
            const input = document.getElementById(field);
            const errorSpan = document.querySelector(`[data-error-for="${field}"]`);

            if (input) {
                input.classList.add('form-error-field');
                // Trigger shake animation
                input.classList.add('shake');
                setTimeout(() => {
                    input.classList.remove('shake');
                }, 400);
            }

            if (errorSpan) {
                errorSpan.textContent = message;
            }
        });

        // Focus on first field with error
        const firstErrorField = document.querySelector('.form-error-field');
        if (firstErrorField) {
            firstErrorField.focus();
        }
    };

    /**
     * Clear all validation errors
     */
    const clearErrors = () => {
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('input, textarea').forEach(el => {
            el.classList.remove('form-error-field');
        });
    };

    return {
        validate,
        displayErrors,
        clearErrors
    };
})();
