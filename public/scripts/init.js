// ALLIANTS APP - INITIALISATION

// Page init
async function initPage() {
  initTabs();
  showLoader(false);
}

// Initialise state of tabs
function initTabs() {
  tabs = document.getElementsByClassName('tab');
  steps = document.getElementsByClassName('step');
  markStepActive(currentTab);
  showTab(currentTab);
}
