const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

for (const tab of tabs) {
  tab.addEventListener("click", changeTabPanel);
}

let focusedTab = 0;
function changeTabFocus(event) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (event.keyCode === keydownRight || event.keyCode === keydownLeft) {
    tabs[focusedTab].setAttribute("tabindex", -1);
    
      if (event.keyCode === keydownRight) {
        focusedTab++;
        if (focusedTab >= tabs.length) {
          focusedTab = 0;
        }
      } else if (event.keyCode === keydownLeft) {
        focusedTab--;
        if (focusedTab < 0) {
          focusedTab = tabs.length - 1;
        }
      }
    
      tabs[focusedTab].setAttribute("tabindex", 0);
      tabs[focusedTab].focus();
  }
}

function changeTabPanel(event) {
  const targetedTab = event.target;
  const tabPanel = targetedTab.getAttribute("aria-controls");
  const tabpicture = targetedTab.getAttribute("data-image");
  //pick a parent whatever its
  //make it possible to use the
  //code without it having main
  //as parent-as a rule-
  const tabContainer = targetedTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  changeTabSelector(tabContainer, targetedTab);

  hideContent(mainContainer, "[role='tabpanel']");
  hideContent(mainContainer, "picture");

  showContent(mainContainer, [`#${tabPanel}`]);
  showContent(mainContainer, [`#${tabpicture}`]);
}

function hideContent(parent, child) {
  parent
    .querySelectorAll(child)
    .forEach((panel) => panel.setAttribute("hidden", true));
}

function showContent(parent, child) {
  parent.querySelector([child]).removeAttribute("hidden");
}

function changeTabSelector(parent, child) {
  parent
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  child.setAttribute("aria-selected", true);
}
