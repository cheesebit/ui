export function updatePosition(anchor, tooltip) {
  const rect = anchor.getBoundingClientRect();
  const top = rect.top - tooltip.offsetHeight - 10 || 0;

  const left = (() => {
    let temp = rect.left - (tooltip.offsetWidth - anchor.offsetWidth) / 2;

    if (temp < 0) {
      temp = rect.left;
    } else if (temp + tooltip.offsetWidth > window.innerWidth) {
      temp = rect.left - (tooltip.offsetWidth - anchor.offsetWidth);
    }

    return temp;
  })();

  return {
    top,
    left,
  };
}
