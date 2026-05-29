/**
 * Contact Form Handler — EmailJS Integration
 * Manages form submission, validation, and feedback states
 */

const ContactForm = (() => {
    // EmailJS Configuration
    // TODO: Replace these with actual EmailJS IDs during operator setup
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    /**
     * Initialize EmailJS and form submission handler
     */
    const init = () => {
        // Wait for emailjs to be available
        if (typeof emailjs === 'undefined') {
            console.warn('EmailJS not loaded');
            return;
        }

        // Initialize EmailJS with public key
        emailjs.init(EMAILJS_PUBLIC_KEY);

        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
            console.log('Contact form initialized');
        }
    };

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Validate form data
        const { isValid, errors } = FormValidator.validate(formData);
        if (!isValid) {
            FormValidator.displayErrors(errors);
            return;
        }

        // Clear previous errors
        FormValidator.clearErrors();

        // Show loading state
        setLoadingState(true);

        try {
            // Send email via EmailJS
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formData
            );

            // Show success message
            showFeedback('success', 'Dziękujemy! Twoja wiadomość została wysłana. Odezwiemy się wkrótce.');

            // Reset form
            form.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            showFeedback('error', 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub skontaktuj się bezpośrednio emailem: anna.basznianin@gmail.com');
        } finally {
            setLoadingState(false);
        }
    };

    /**
     * Toggle form loading state (disable button, show spinner)
     * @param {boolean} isLoading - Whether to show loading state
     */
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
            form.querySelectorAll('input, textarea').forEach(el => {
                el.disabled = true;
            });
        } else {
            button.disabled = false;
            button.setAttribute('aria-busy', 'false');
            textSpan.hidden = false;
            spinner.hidden = true;
            form.querySelectorAll('input, textarea').forEach(el => {
                el.disabled = false;
            });
        }
    };

    /**
     * Show feedback message (success or error)
     * @param {string} type - 'success' or 'error'
     * @param {string} message - Message text
     */
    const showFeedback = (type, message) => {
        const feedbackDiv = document.querySelector('[data-form-feedback]');
        const messageP = feedbackDiv?.querySelector('.feedback-message');

        if (!feedbackDiv) return;

        // Set feedback type and message
        feedbackDiv.className = `form-feedback form-feedback--${type}`;
        feedbackDiv.setAttribute('role', 'alert');
        if (messageP) {
            messageP.textContent = message;
        }

        // Show feedback
        feedbackDiv.hidden = false;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedbackDiv.hidden = true;
            feedbackDiv.removeAttribute('role');
        }, 5000);
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        init();
    });

    return {
        init
    };
})();
