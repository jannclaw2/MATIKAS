(function () {
  const bg = document.getElementById('bgmusic');
  const widgetPlayPause = document.getElementById('widget-playpause');
  const widgetVolume = document.getElementById('widget-volume');

  if (!bg || !widgetPlayPause || !widgetVolume) return;

  function updateButtonLabel() {
    widgetPlayPause.textContent = bg.paused ? '▶' : '❚❚';
  }

  widgetPlayPause.addEventListener('click', function () {
    if (bg.paused) {
      bg.play().catch(function () {});
    } else {
      bg.pause();
    }
    updateButtonLabel();
  });

  widgetVolume.addEventListener('input', function () {
    bg.volume = Number(widgetVolume.value) || 0;
  });

  bg.addEventListener('play', updateButtonLabel);
  bg.addEventListener('pause', updateButtonLabel);
  updateButtonLabel();
})();
