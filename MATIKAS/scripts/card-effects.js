(function () {
  function applyTilt(elements, intensity, scaleAmount) {
    elements.forEach(function (card) {
      if (card.dataset.tiltBound === 'true') return;
      card.dataset.tiltBound = 'true';

      card.addEventListener('mousemove', function (event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(' + scaleAmount + ')';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }

  function bindCardEffects() {
    applyTilt(document.querySelectorAll('.card'), 12, 1.05);
    applyTilt(document.querySelectorAll('.mini-card'), 10, 1.08);
  }

  document.addEventListener('DOMContentLoaded', bindCardEffects);
  window.addEventListener('familyCardsRendered', bindCardEffects);
  bindCardEffects();
})();
