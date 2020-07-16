export default {
  check: ({ id }) => {
    const radioElement = document.getElementById(id);

    if (radioElement) {
      radioElement.checked = true;
    }
  },
  getActiveTab: ({ tabbed }) => {
    return document.querySelector(`#${tabbed} > .tabs > .tab.is-active`);
  },
  getActiveIndicator: ({ tabbed }) => {
    return document.querySelector(`#${tabbed} > .tabs > .active-indicator`);
  },
};
