export function check(id) {
  const radioElement = document.getElementById(id);

  if (radioElement) {
    radioElement.checked = true;
  }
}
