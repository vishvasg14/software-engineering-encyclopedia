// AskGPT button handler.
// On click of any <a class="askgpt-btn">, opens a modal showing:
//   - The GitHub blob URL of the section (read-only)
//   - 4 preset question chips (Explain in depth, Real-world examples,
//     Compare with alternatives, Quiz me)
//   - A free-text input for user-defined extra context
//   - An "Open ChatGPT" button that combines everything into a single
//     prompt and opens chatgpt.com/?prompt={encoded} in a new tab.
//
// On github.com (where JS is stripped), the same button still works as
// a plain link — it opens chatgpt.com with the default-prompt href.
(function () {
  'use strict';

  var PRESETS = [
    { id: 'depth',     label: 'Explain in depth',         question: 'Explain this section in detail with concrete examples, the main trade-offs, and common pitfalls a practitioner should know.' },
    { id: 'examples',  label: 'Real-world examples',      question: 'Give me 2-3 real-world production examples for this section. For each: what went right, what went wrong, and the lessons learned. Include company / project names if relevant.' },
    { id: 'compare',   label: 'Compare with alternatives',question: 'Compare this section with the main alternatives — when to choose it, when not to, and migration considerations.' },
    { id: 'quiz',      label: 'Quiz me',                  question: 'Quiz me on this section — 5 questions ranging from basics to edge cases. Then check my answers and explain what I got wrong.' },
  ];

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function openChatGPT(prompt) {
    var url = 'https://chatgpt.com/?prompt=' + encodeURIComponent(prompt);
    window.open(url, '_blank', 'noopener');
  }

  function closeModal() {
    var m = document.getElementById('askgpt-modal');
    if (m && m.parentNode) m.parentNode.removeChild(m);
    document.removeEventListener('keydown', onKey);
  }

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
  }

  function buildPrompt(url, section, preset, userText) {
    var lines = [
      'Read this section of my software engineering encyclopedia and answer my question about it:',
      '',
      'Section: ' + section,
      'URL: ' + url,
      '',
      'Question: ' + preset.question,
    ];
    if (userText && userText.trim()) {
      lines.push('');
      lines.push('Additional context from me: ' + userText.trim());
    }
    return lines.join('\n');
  }

  function showModal(section, url) {
    closeModal();

    var backdrop = document.createElement('div');
    backdrop.id = 'askgpt-modal';
    backdrop.className = 'askgpt-backdrop';
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    var card = document.createElement('div');
    card.className = 'askgpt-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Ask ChatGPT about ' + section);

    // Title
    var title = document.createElement('div');
    title.className = 'askgpt-title';
    title.textContent = 'Ask ChatGPT about: ' + section;
    card.appendChild(title);

    // URL (read-only, monospace)
    var urlLabel = document.createElement('label');
    urlLabel.className = 'askgpt-label';
    urlLabel.textContent = 'Source URL (sent to ChatGPT)';
    var urlBox = document.createElement('input');
    urlBox.type = 'text';
    urlBox.className = 'askgpt-url';
    urlBox.value = url;
    urlBox.readOnly = true;
    urlBox.addEventListener('focus', function () { urlBox.select(); });
    card.appendChild(urlLabel);
    card.appendChild(urlBox);

    // Preset chips
    var chipsLabel = document.createElement('label');
    chipsLabel.className = 'askgpt-label';
    chipsLabel.textContent = 'Pick a preset question';
    card.appendChild(chipsLabel);

    var chipsRow = document.createElement('div');
    chipsRow.className = 'askgpt-chips';

    var selectedPreset = PRESETS[0];  // default
    PRESETS.forEach(function (p, i) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'askgpt-chip' + (i === 0 ? ' askgpt-chip-active' : '');
      chip.textContent = p.label;
      chip.dataset.presetId = p.id;
      chip.addEventListener('click', function () {
        chipsRow.querySelectorAll('.askgpt-chip').forEach(function (c) {
          c.classList.remove('askgpt-chip-active');
        });
        chip.classList.add('askgpt-chip-active');
        selectedPreset = p;
        updatePreview();
      });
      chipsRow.appendChild(chip);
    });
    card.appendChild(chipsRow);

    // Free-text
    var textLabel = document.createElement('label');
    textLabel.className = 'askgpt-label';
    textLabel.textContent = 'Add your own context (optional)';
    card.appendChild(textLabel);

    var textArea = document.createElement('textarea');
    textArea.className = 'askgpt-text';
    textArea.placeholder = 'e.g. focus on production pitfalls, or compare with Kafka 4.0...';
    textArea.rows = 3;
    card.appendChild(textArea);

    // Preview pane (collapsible / small)
    var previewLabel = document.createElement('label');
    previewLabel.className = 'askgpt-label';
    previewLabel.textContent = 'Preview (what gets sent)';
    card.appendChild(previewLabel);

    var preview = document.createElement('pre');
    preview.className = 'askgpt-preview';
    card.appendChild(preview);

    function updatePreview() {
      var p = buildPrompt(url, section, selectedPreset, textArea.value);
      preview.textContent = p;
    }

    PRESETS.forEach(function (p, i) {
      if (i === 0) {} // already set
    });
    selectedPreset = PRESETS[0];
    updatePreview();
    textArea.addEventListener('input', updatePreview);

    // Buttons row
    var btnRow = document.createElement('div');
    btnRow.className = 'askgpt-actions';

    var cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'askgpt-cancel';
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', closeModal);
    btnRow.appendChild(cancel);

    var submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'askgpt-submit';
    submit.textContent = 'Open ChatGPT →';
    submit.addEventListener('click', function () {
      var p = buildPrompt(url, section, selectedPreset, textArea.value);
      openChatGPT(p);
      closeModal();
    });
    btnRow.appendChild(submit);

    card.appendChild(btnRow);
    backdrop.appendChild(card);
    document.body.appendChild(backdrop);
    document.addEventListener('keydown', onKey);

    // Focus the textarea so user can type immediately
    setTimeout(function () { textArea.focus(); }, 0);
  }

  function init() {
    var buttons = document.querySelectorAll('a.askgpt-btn');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();
        var section = this.getAttribute('data-askgpt') || 'this section';
        var url = this.getAttribute('data-askgpt-url') || '';
        if (!url) {
          // Fall back to href if data attribute missing
          url = this.getAttribute('href') || '';
        }
        showModal(section, url);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
