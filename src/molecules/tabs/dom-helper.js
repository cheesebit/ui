export function setActiveTab(id) {
  const radioElement = document.getElementById(id);

  if (radioElement) {
    radioElement.checked = true;
    // focus it so we allow user to navigate using keyboard (default radio behavior)
    radioElement.focus();
  }
}

export function getActiveTab(tabsEl) {
  return tabsEl.querySelector('.tab.is-active');
}

export function getActiveIndicator(tabsEl) {
  return tabsEl.querySelector('.active-indicator');
}
