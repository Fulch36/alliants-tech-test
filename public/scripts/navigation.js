// ALLIANTS APP - NAVIGATION

var currentTab = 0; // Current tab is set to first tab
var tabs = []; // Tab elements on the page
var steps = []; // Step elements on the page

// Hide current tab, show the next and update step indicators
function advanceToNextTab() {
  markStepFinished(currentTab);
  hideTab(currentTab);
  currentTab++;
  if (currentTab < 1) markStepActive(currentTab);
  showTab(currentTab);
}

// Show selected tab
function showTab(index) {
  tabs[index].style.display = 'block';
}

// Hide selected tab
function hideTab(index) {
  tabs[index].style.display = 'none';
}

// Set a step to active state
function markStepActive(index) {
  steps[index].className += ' active';
}

// Set a step to finished state
function markStepFinished(index) {
  steps[index].className = steps[index].className.replace('active', 'finished');
}

// Show or hide loader
function showLoader(show) {
  if (show) {
    document.getElementById('initial-load').style.display = 'block';
    document.getElementById('main-form').style.display = 'none';
  } else {
    document.getElementById('initial-load').style.display = 'none';
    document.getElementById('main-form').style.display = 'block';
  }
}
