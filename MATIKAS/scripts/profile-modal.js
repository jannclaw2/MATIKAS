(function () {
  const modal = document.getElementById('profileModal');
  if (!modal) return;

  const modalImage = document.getElementById('profileModalImage');
  const modalVideo = document.getElementById('profileModalVideo');
  const modalName = document.getElementById('profileModalName');
  const modalHandle = document.getElementById('profileModalHandle');
  const modalRole = document.getElementById('profileModalRole');
  const modalBio = document.getElementById('profileModalBio');

  function normalizeRoles(rawRole) {
    if (Array.isArray(rawRole)) {
      return rawRole.map(function (role) {
        return String(role || '').trim();
      }).filter(Boolean);
    }

    if (!rawRole) return [];

    if (typeof rawRole === 'string' && rawRole.trim().startsWith('[') && rawRole.trim().endsWith(']')) {
      try {
        const parsed = JSON.parse(rawRole);
        if (Array.isArray(parsed)) {
          return parsed.map(function (role) {
            return String(role || '').trim();
          }).filter(Boolean);
        }
      } catch (error) {}
    }

    return String(rawRole).split(/[|•]/).map(function (role) {
      return role.trim();
    }).filter(Boolean);
  }

  function formatRoles(rawRole) {
    const roles = normalizeRoles(rawRole);
    return roles.length ? roles : ['Matikas Family'];
  }

  function renderRoleBadges(rawRole) {
    const roles = formatRoles(rawRole);
    modalRole.innerHTML = '';

    roles.forEach(function (role) {
      const badge = document.createElement('span');
      badge.className = 'profile-role-badge';
      badge.textContent = role;
      modalRole.appendChild(badge);
    });
  }

  function buildBio(name, role) {
    if (name === 'Luv') {
      return 'The heart of the bloodline, the calm force, and the unshaken foundation behind the family name.';
    }

    if (name === 'Enzo') {
      return 'Pure energy, sharp presence, and that fearless vibe that makes the Matikas name feel alive.';
    }

    if (role === "Kish's Son") {
      return 'A powerful member of the bloodline, carrying the legacy with pride, loyalty, and undeniable presence.';
    }

    return 'A respected member of the Matikas family, known for presence, loyalty, and the strength that keeps the bloodline moving.';
  }

  function resolveVideoSource(video, fallback) {
    const candidate = typeof video === 'string' ? video.trim() : '';
    if (!candidate) return fallback;
    if (candidate.indexOf('file.garden') !== -1) return fallback;
    return candidate;
  }

  function setMedia(name, image, video) {
    const fallbackVideo = 'Video/Enzo.mp4';
    const videoSource = resolveVideoSource(video, fallbackVideo);

    modalImage.src = image || '';
    modalImage.style.display = 'block';
    modalVideo.style.display = 'block';
    modalVideo.muted = true;
    modalVideo.loop = true;
    modalVideo.playsInline = true;
    modalVideo.autoplay = true;
    modalVideo.preload = 'auto';
    modalVideo.pause();
    modalVideo.src = videoSource;
    modalVideo.load();
    modalVideo.currentTime = 0;

    function tryPlayVideo() {
      modalVideo.play().catch(function () {
        setTimeout(function () {
          modalVideo.play().catch(function () {});
        }, 80);
      });
    }

    if (modalVideo.readyState >= 2) {
      tryPlayVideo();
    } else {
      modalVideo.addEventListener('loadeddata', tryPlayVideo, { once: true });
      modalVideo.addEventListener('canplay', tryPlayVideo, { once: true });
    }

    modalImage.alt = name + ' profile';
  }

  function prefetchVideo(videoSource) {
    if (!videoSource) return;
    modalVideo.muted = true;
    modalVideo.loop = true;
    modalVideo.playsInline = true;
    modalVideo.autoplay = true;
    modalVideo.preload = 'auto';
    modalVideo.src = videoSource;
    modalVideo.load();
  }

  function openModal(card) {
    const img = card.querySelector('img');
    const nameEl = card.querySelector('h3, h4');
    const handleEl = card.querySelector('p');

    const name = card.dataset.name || (nameEl ? nameEl.textContent.trim() : 'Matikas Family');
    const handle = card.dataset.handle || (handleEl ? handleEl.textContent.trim() : '@matikas');
    const roleSource = card.dataset.roles || card.dataset.role || (card.classList.contains('mini-card') ? "Kish's Son" : 'Matikas Family');
    const role = formatRoles(roleSource);
    const bio = card.dataset.bio || buildBio(name, role[0]);
    const image = card.dataset.image || (img ? img.src : '');
    const video = resolveVideoSource(card.dataset.video, 'Video/Enzo.mp4');

    modalName.textContent = name;
    modalHandle.textContent = handle;
    renderRoleBadges(roleSource);
    modalBio.textContent = bio;
    setMedia(name, image, video);

    modal.classList.remove('closing');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;

    if (modalVideo && modalVideo.pause) {
      modalVideo.pause();
      modalVideo.removeAttribute('src');
      modalVideo.load();
    }

    modal.classList.add('closing');
    modal.classList.remove('is-open');
    setTimeout(function () {
      modal.classList.remove('closing');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }, 220);
  }

  function bindCardClicks() {
    document.querySelectorAll('.card, .mini-card').forEach(function (card) {
      if (card.dataset.modalBound === 'true') return;
      card.dataset.modalBound = 'true';

      card.addEventListener('click', function (event) {
        if (event.target.closest('button, a, input, textarea, select, label')) {
          return;
        }

        openModal(card);
      });
    });
  }

  modal.addEventListener('click', function (event) {
    if (event.target.matches('[data-close-modal]')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  const defaultVideo = 'Video/Enzo.mp4';

  document.addEventListener('DOMContentLoaded', function () {
    prefetchVideo(defaultVideo);
    bindCardClicks();
  });

  window.addEventListener('familyCardsRendered', bindCardClicks);
  if (document.readyState !== 'loading') {
    prefetchVideo(defaultVideo);
    bindCardClicks();
  }
})();
