(function () {
  function bindSectionTyping() {
    document.querySelectorAll('.section-title').forEach(function (title) {
      if (title.dataset.bound === 'true') return;
      title.dataset.bound = 'true';

      const originalText = title.textContent.trim();
      title.textContent = '';

      const base = document.createElement('span');
      base.className = 'title-base';
      base.textContent = originalText;

      const typed = document.createElement('span');
      typed.className = 'title-typed';
      typed.textContent = '';

      title.appendChild(base);
      title.appendChild(typed);

      let index = 0;
      let deleting = false;

      function tick() {
        if (!deleting) {
          index += 1;
          typed.textContent = originalText.slice(0, index);

          if (index >= originalText.length) {
            deleting = true;
            setTimeout(tick, 1400);
            return;
          }

          setTimeout(tick, 90);
          return;
        }

        index -= 1;
        typed.textContent = originalText.slice(0, index);

        if (index <= 0) {
          deleting = false;
          setTimeout(tick, 400);
          return;
        }

        setTimeout(tick, 45);
      }

      tick();
    });
  }

  document.addEventListener('DOMContentLoaded', bindSectionTyping);
})();
