(function () {
  const DEFAULT_VIDEO = 'Video/Enzo.mp4';
  const LOCAL_VIDEO_PATH = 'Video/';

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

    return String(rawRole).split(/[|â€¢]/).map(function (role) {
      return role.trim();
    }).filter(Boolean);
  }

  function escapeAttribute(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;');
  }

  const familyMembers = {
   mother: [
      {
        name: 'Luv',
        handle: '@luvunavailable',
        image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20082944.png',
        roles: ['Mother', '👑'],
        bio: 'A little bit of heaven with a wild side.',
        video: 'Video/Enzo.mp4'
      }
    ],
sons: [
  { name: 'Jade', handle: '@skywlrk', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20093521.png', roles: ["Kish's Son", 'Leader'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Syete', handle: '@sevendeputa', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20093626.png', roles: ["Kish's Son", 'Protector'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Don', handle: '@nadough_', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20093714.png', roles: ["Kish's Son", 'Vibe'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Zeek', handle: '@diablo_13', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20093956.png', roles: ["Kish's Son", 'Energy'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Enzo', handle: '@ENZOMATIKAS', image: 'https://file.garden/aqSTqeNs4RWiv0uj/greek.avif', roles: ["Kish's Son", 'Pogi'], bio: 'Kung talagang matapang ka, kaya mong saluhin ’tong clingy side ko.', video: 'Video/Exl.mp4' },
  { name: 'Krey', handle: '@ruther_123', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20094400.png', roles: ["Kish's Son", 'Stabilizer'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Lance', handle: '@1975928', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20094506.png', roles: ["Kish's Son", 'Alpha'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Ark', handle: '@44go', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20094606.png', roles: ["Kish's Son", 'Builder'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Jayzee', handle: '@ehlow', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20094741.png', roles: ["Kish's Son", 'Momentum'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Andrei', handle: '@xyzandrei', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20094838.png', roles: ["Kish's Son", 'Support'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Junmo', handle: '@junmovisaya', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20094940.png', roles: ["Kish's Son", 'Balance'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Locs', handle: '@osidelocs', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095050.png', roles: ["Kish's Son", 'Presence'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Bbon', handle: '@bon_bon012', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095138.png', roles: ["Kish's Son", 'Charm'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Tazu', handle: '@alanchinito', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095230.png', roles: ["Kish's Son", 'Loyalty'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Zen', handle: '@wpt7', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095316.png', roles: ["Kish's Son", 'Calm'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Hezi', handle: '@xtv1e', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095406.png', roles: ["Kish's Son", 'Focus'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Cai', handle: '@caii144', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095503.png', roles: ["Kish's Son", 'Discipline'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Kirby', handle: '@alanmestizoo', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095604.png', roles: ["Kish's Son", 'Respect'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Jhay', handle: '@jhay3842', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095702.png', roles: ["Kish's Son", 'Identity'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Jazz', handle: '@jazz03528_', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20095910.png', roles: ["Kish's Son", 'Flavor'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Bam', handle: '@cursxd132', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20100059.png', roles: ["Kish's Son", 'Power'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Sinu', handle: '@0hgx', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20100205.png', roles: ["Kish's Son", 'Steady'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Bernd', handle: '@m6ek', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20100411.png', roles: ["Kish's Son", 'Stillness'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Sai', handle: '@lovewithnowhere', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20100831.png', roles: ["Kish's Son", 'Fire'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' },
  { name: 'Jairo', handle: '@y.n_grecio21', image: 'https://file.garden/aqSTqeNs4RWiv0uj/Screenshot%202026-09-12%20100655.png', roles: ["Kish's Son", 'Pride'], bio: 'DM niyo ako if may papalagay kayo dito sa bio, tsaka vid na rin.', video: 'Video/Enzo.mp4' }
]
  };

  function getRoles(member, type) {
    const roles = normalizeRoles(member.roles || member.role || 'Matikas Family');

    if (type === 'mother') {
      return roles.length ? roles : ['Matikas Family'];
    }

    if (member.name === 'Enzo') {
      return roles.length ? roles.slice(0, 2) : ['Kish\'s Son'];
    }

    return roles.length ? [roles[0]] : ['Kish\'s Son'];
  }

  function formatRoles(member, type) {
    const roles = getRoles(member, type);
    return roles.length ? roles.join(' â€¢ ') : 'Matikas Family';
  }

  function createCardMarkup(member, type) {
    const isMother = type === 'mother';
    const cardClass = isMother ? 'card' : 'mini-card';
    const nameTag = isMother ? 'h3' : 'h4';
    const roles = getRoles(member, type);
    const roleString = roles.join(' â€¢ ');

    const memberVideo = member.video && !String(member.video).includes('file.garden') ? member.video : '';
    const videoUrl = memberVideo || (member.name ? LOCAL_VIDEO_PATH + member.name + '.mp4' : DEFAULT_VIDEO);

    return [
      '<div class="' + cardClass + '"',
      ' data-name="' + escapeAttribute(member.name) + '"',
      ' data-handle="' + escapeAttribute(member.handle) + '"',
      ' data-role="' + escapeAttribute(roleString) + '"',
      ' data-roles="' + escapeAttribute(JSON.stringify(roles)) + '"',
      ' data-bio="' + escapeAttribute(member.bio) + '"',
      ' data-image="' + escapeAttribute(member.image || '') + '"',
      ' data-video="' + escapeAttribute(videoUrl) + '"',
      '>',
      '<img src="' + escapeAttribute(member.image || '') + '" alt="' + escapeAttribute(member.name) + '">',
      '<' + nameTag + '>' + escapeAttribute(member.name) + '</' + nameTag + '>',
      '<p>' + escapeAttribute(member.handle) + '</p>',
      '</div>'
    ].join('');
  }

  function renderFamilyCards() {
    const motherContainer = document.getElementById('motherList');
    const sonsContainer = document.getElementById('sonsList');

    if (motherContainer) {
      motherContainer.innerHTML = familyMembers.mother.map(function (member) {
        return createCardMarkup(member, 'mother');
      }).join('');
    }

    if (sonsContainer) {
      sonsContainer.innerHTML = familyMembers.sons.map(function (member) {
        return createCardMarkup(member, 'son');
      }).join('');
    }

    window.dispatchEvent(new CustomEvent('familyCardsRendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFamilyCards);
  } else {
    renderFamilyCards();
  }
})();



