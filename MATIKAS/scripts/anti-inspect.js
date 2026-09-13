(function () {
  function lockDown() {
    const blockedKeys = [
      'F12',
      'Shift+F12',
      'Ctrl+Shift+I',
      'Ctrl+Shift+C',
      'Ctrl+Shift+J',
      'Ctrl+U',
      'Cmd+Option+I',
      'Cmd+Option+C'
    ];

    function redirectToWarning() {
      window.location.href = 'https://www.youtube.com/watch?v=h9HJAS8KsFM';
    }

    document.addEventListener('keydown', function (event) {
      const combo = [];
      if (event.ctrlKey || event.metaKey) combo.push('Ctrl');
      if (event.shiftKey) combo.push('Shift');
      if (event.altKey) combo.push('Alt');
      combo.push(event.key.length === 1 ? event.key.toUpperCase() : event.key);

      const comboString = combo.join('+');
      if (blockedKeys.indexOf(comboString) !== -1 || event.key === 'F12') {
        event.preventDefault();
        event.stopPropagation();
        redirectToWarning();
      }
    }, true);

    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    }, true);
  }

  lockDown();
})();
