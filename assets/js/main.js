/**
 * Roztoczańska Stodoła — Main JavaScript Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Hero !== 'undefined') Hero.init();
  if (typeof Nav !== 'undefined') Nav.init();
  if (typeof Reveal !== 'undefined') Reveal.init();
  if (typeof Gallery !== 'undefined') Gallery.init();
  if (typeof ContactForm !== 'undefined') ContactForm.init();

  console.log('Roztoczańska Stodoła site initialized');
});
