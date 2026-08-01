// AskGPT button handler.
// Binds click handlers to every <a class="askgpt-btn"> on the page.
// On click, opens a small modal with two preset prompts. Picking one
// opens https://chatgpt.com/?prompt={encoded} in a new tab.
//
// Each <a class="askgpt-btn"> carries two data attributes:
//   data-askgpt-prompt-depth      → URL-encoded "Explain in depth" prompt
//   data-askgpt-prompt-examples   → URL-encoded "Real-world examples" prompt
// Both include the GitHub blob URL of the section so ChatGPT has full
// context. We just decode and use them as-is.
(function () {
  'use strict';

  function openChatGPT(prompt) {
    var url = 'https://chatgpt.com/?prompt=' + prompt;  // already encoded
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

  function showModal(sectionTitle, depthPrompt, examplesPrompt) {
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

    var presets = [
      { label: 'Explain in depth', encoded: depthPrompt },
      { label: 'Real-world examples', encoded: examplesPrompt },
    ];

    var list = document.createElement('div');
    list.className = 'askgpt-list';
    presets.forEach(function (preset) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'askgpt-preset';
      btn.textContent = preset.label;
      btn.addEventListener('click', function () {
        openChatGPT(preset.encoded);
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
        var depth = this.getAttribute('data-askgpt-prompt-depth');
        var examples = this.getAttribute('data-askgpt-prompt-examples');
        showModal(section, depth, examples);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
