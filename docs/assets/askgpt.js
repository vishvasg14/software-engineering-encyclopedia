// AskGPT button handler.
// Binds click handlers to every <a class="askgpt-btn"> on the page.
// On click, opens a small modal with two preset prompts. Picking one
// opens https://chatgpt.com/?q={encoded-prompt} in a new tab.
(function () {
  'use strict';

  var PRESETS = [
    {
      id: 'depth',
      label: 'Explain in depth',
      build: function (s) {
        return "Explain '" + s + "' in detail with concrete examples, the main trade-offs, and common pitfalls a practitioner should know.";
      },
    },
    {
      id: 'examples',
      label: 'Real-world examples',
      build: function (s) {
        return "Give me 2-3 real-world production examples of '" + s + "' — what went right, what went wrong, and the lessons learned. Include company / project names if relevant.";
      },
    },
  ];

  function openChatGPT(prompt) {
    var url = 'https://chatgpt.com/?q=' + encodeURIComponent(prompt);
    window.open(url, '_blank', 'noopener');
  }

  function closeModal(modal) {
    if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      var m = document.getElementById('askgpt-modal');
      if (m) closeModal(m);
    }
  }

  function showModal(sectionTitle) {
    closeModal(document.getElementById('askgpt-modal'));

    var backdrop = document.createElement('div');
    backdrop.id = 'askgpt-modal';
    backdrop.className = 'askgpt-backdrop';
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal(backdrop);
    });

    var card = document.createElement('div');
    card.className = 'askgpt-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Ask ChatGPT about ' + sectionTitle);

    var title = document.createElement('div');
    title.className = 'askgpt-title';
    title.textContent = 'Ask ChatGPT about: ' + sectionTitle;
    card.appendChild(title);

    var list = document.createElement('div');
    list.className = 'askgpt-list';
    PRESETS.forEach(function (preset) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'askgpt-preset';
      btn.textContent = preset.label;
      btn.addEventListener('click', function () {
        openChatGPT(preset.build(sectionTitle));
        closeModal(backdrop);
      });
      list.appendChild(btn);
    });
    card.appendChild(list);

    var cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'askgpt-cancel';
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', function () {
      closeModal(backdrop);
    });
    card.appendChild(cancel);

    backdrop.appendChild(card);
    document.body.appendChild(backdrop);
    document.addEventListener('keydown', onKey);
  }

  function init() {
    var buttons = document.querySelectorAll('a.askgpt-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();
        var section = this.getAttribute('data-askgpt') || 'this section';
        showModal(section);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
