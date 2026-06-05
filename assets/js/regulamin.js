/**
 * Regulamin — checkboxy zasad + ujawnienie hasła WiFi
 */
const Regulamin = (() => {
  const init = () => {
    const form = document.getElementById('regulamin-form');
    const submitBtn = document.getElementById('regulamin-submit');
    const wifiPanel = document.getElementById('wifi-panel');
    const checkboxes = form
      ? [...form.querySelectorAll('input[type="checkbox"][data-rule]')]
      : [];

    if (!form || !submitBtn || !wifiPanel || !checkboxes.length) return;

    if (typeof RegulaminConfig === 'undefined') {
      submitBtn.disabled = true;
      showFormError('Brak konfiguracji WiFi. Skontaktuj się z gospodarzem.');
      return;
    }

    const updateButtonState = () => {
      submitBtn.disabled = !checkboxes.every((cb) => cb.checked);
    };

    checkboxes.forEach((cb) => {
      cb.addEventListener('change', updateButtonState);
    });

    updateButtonState();

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!checkboxes.every((cb) => cb.checked)) {
        showFormError('Zaznacz wszystkie zasady, aby przejść dalej.');
        return;
      }

      clearFormError();
      revealWifi(wifiPanel);
      submitBtn.disabled = true;
      checkboxes.forEach((cb) => {
        cb.disabled = true;
      });
    });

    const copyBtn = document.getElementById('wifi-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(RegulaminConfig.password);
          copyBtn.textContent = 'Skopiowano!';
          setTimeout(() => {
            copyBtn.textContent = 'Kopiuj hasło';
          }, 2000);
        } catch {
          copyBtn.textContent = 'Nie udało się skopiować';
        }
      });
    }
  };

  const revealWifi = (panel) => {
    const ssidEl = document.getElementById('wifi-ssid');
    const passwordEl = document.getElementById('wifi-password');

    if (ssidEl) ssidEl.textContent = RegulaminConfig.ssid;
    if (passwordEl) passwordEl.textContent = RegulaminConfig.password;

    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const showFormError = (message) => {
    const errorEl = document.getElementById('regulamin-error');
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
  };

  const clearFormError = () => {
    const errorEl = document.getElementById('regulamin-error');
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.hidden = true;
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', Regulamin.init);
