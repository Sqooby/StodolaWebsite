/**
 * Hero — video autoplay fallback for mobile browsers
 */
const Hero = (() => {
  const init = () => {
    const heroVideo = document.getElementById('hero-video');
    if (!heroVideo) return;

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    const tryPlay = () => {
      heroVideo.play().catch(() => {});
    };

    if (heroVideo.readyState >= 2) {
      tryPlay();
    } else {
      heroVideo.addEventListener('canplay', tryPlay, { once: true });
    }
  };

  return { init };
})();
