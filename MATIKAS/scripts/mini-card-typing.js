  (function () {
    function typeWriterEffect(element, text, speed, shouldContinue) {
      return new Promise(function (resolve) {
        let index = 0;
        element.textContent = '';

        function type() {
          if (!shouldContinue()) {
            resolve();
            return;
          }

          if (index < text.length) {
            element.textContent += text.charAt(index);
            index += 1;
            const variation = speed + (Math.random() * 40 - 20);
            setTimeout(type, Math.max(25, variation));
          } else {
            resolve();
          }
        }

        type();
      });
    }

    function backspaceEffect(element, speed, shouldContinue) {
      return new Promise(function (resolve) {
        function erase() {
          if (!shouldContinue()) {
            resolve();
            return;
          }

          if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1);
            setTimeout(erase, speed);
          } else {
            resolve();
          }
        }

        erase();
      });
    }

    function bindMiniCardTyping() {
      document.querySelectorAll('.mini-card').forEach(function (card) {
        if (card.dataset.typingBound === 'true') return;
        card.dataset.typingBound = 'true';

        const h4 = card.querySelector('h4');
        if (!h4) return;

        const originalName = h4.dataset.name || h4.textContent.trim();
        h4.dataset.name = originalName;
        card.dataset.name = originalName;
        card.dataset.memberName = originalName;

        let runId = 0;

        function stopTyping() {
          runId += 1;
          h4.textContent = originalName;
        }

        async function startTyping() {
          const currentRun = ++runId;

          while (runId === currentRun && card.matches(':hover')) {
            await typeWriterEffect(h4, originalName, 70, function () {
              return runId === currentRun && card.matches(':hover');
            });

            if (runId !== currentRun || !card.matches(':hover')) break;

            await new Promise(function (resolve) {
              setTimeout(function () {
                if (runId !== currentRun || !card.matches(':hover')) {
                  resolve();
                  return;
                }
                resolve();
              }, 1200);
            });

            if (runId !== currentRun || !card.matches(':hover')) break;

            await backspaceEffect(h4, 30, function () {
              return runId === currentRun && card.matches(':hover');
            });

            if (runId !== currentRun || !card.matches(':hover')) break;

            await new Promise(function (resolve) {
              setTimeout(function () {
                if (runId !== currentRun || !card.matches(':hover')) {
                  resolve();
                  return;
                }
                resolve();
              }, 250);
            });
          }

          if (runId === currentRun) {
            h4.textContent = originalName;
          }
        }

        card.addEventListener('mouseenter', startTyping);
        card.addEventListener('mouseleave', stopTyping);
      });
    }

    document.addEventListener('DOMContentLoaded', bindMiniCardTyping);
    window.addEventListener('familyCardsRendered', bindMiniCardTyping);
    bindMiniCardTyping();
  })();
