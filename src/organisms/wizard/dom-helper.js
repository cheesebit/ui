export default {
  check: ({ id }) => {
    const radioElement = document.getElementById(id);

    if (radioElement) {
      radioElement.checked = true;
      radioElement.focus();
    }
  },
};
