const nav = document.querySelector('fieldset[role="tablist"]');
const labels = [...nav.querySelectorAll('label[role="tab"]')];

function syncTabs() {
  labels.forEach(l => {
    const checked = l.querySelector('input[type="radio"]').checked;
    l.setAttribute('aria-selected', checked ? 'true' : 'false');
  });
}

labels.forEach(l => l.querySelector('input').addEventListener('change', syncTabs));
syncTabs();

