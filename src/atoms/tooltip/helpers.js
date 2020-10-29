import ANIMATION_PHASES from './animation-phases.json';

/**
 *  @class Point
 *  @type {Object}
 *  @property {number} x The X-coordinate.
 *  @property {number} y The Y-coordinate.
 */

/**
 * Calculates tooltip position for the given placement.
 * Important to notice here that the returned placement might be different from the initially provided if
 * we verify that it wil flow out of the screen.
 * @param {('top'|'right'|'bottom'|'left')} placement - where the tooltip should be placed.
 * @param  {...any} args
 *
 * @returns {{ top: number, left: number: placement: ('top'|'right'|'bottom'|'left') }} Position and placement
 */
export function calculatePosition(placement, ...args) {
  const map = {
    top: calculateTopPlacement,
    right: calculateRightPlacement,
    bottom: calculateBottomPlacement,
    left: calculateLeftPlacement,
  };

  return (map[placement] || calculateTopPlacement)(...args);
}

/**
 * Gets pre-defined animation phases for the provided placement.
 * If an invalid placement is provided, the phases for top placement are returned.
 * @param {('top'|'right'|'bottom'|'left')} placement - where the tooltip should be placed.
 *
 * @returns {{ in: string, out: string } object with the animation names for each phase.
 */
export function getAnimationPhases(placement) {
  return ANIMATION_PHASES[placement] || ANIMATION_PHASES.top;
}

const DISTANCE = 10;

/**
 * Calculates `top` and `left` position for a top placed tooltip, based on the given anchor.
 * @param {HTMLElement} anchor - anchor where the tooltip was applied
 * @param {HTMLElement} tooltip - tooltip element
 */
function calculateTopPlacement(anchor, tooltip) {
  const anchorRect = anchor.getBoundingClientRect();
  const top = anchorRect.top - tooltip.offsetHeight - DISTANCE || 0;

  const left = (() => {
    let temp = anchorRect.left - (tooltip.offsetWidth - anchor.offsetWidth) / 2;

    if (temp < 0) {
      temp = anchorRect.left;
    } else if (temp + tooltip.offsetWidth > window.innerWidth) {
      temp = anchorRect.left - (tooltip.offsetWidth - anchor.offsetWidth);
    }

    return temp;
  })();

  return {
    top,
    left,
    placement: 'top',
  };
}

/**
 * Calculates `top` and `left` position for a right placed tooltip, based on the given anchor.
 * If the calculated `left` values makes the tooltip flow out of the screen, we change the placement
 * by calling the `calculateLeftPlacement` function.
 * @param {HTMLElement} anchor - anchor where the tooltip was applied
 * @param {HTMLElement} tooltip - tooltip element
 */
function calculateRightPlacement(anchor, tooltip) {
  const anchorRect = anchor.getBoundingClientRect();

  const left = (() => {
    return anchorRect.left + anchor.offsetWidth + DISTANCE;
  })();

  if (left + tooltip.offsetWidth > window.innerWidth) {
    return calculateLeftPlacement(anchor, tooltip);
  }

  const top = (() => {
    return anchorRect.top - (tooltip.offsetHeight - anchor.offsetHeight) / 2;
  })();

  return {
    top,
    left,
    placement: 'right',
  };
}

/**
 * Calculates `top` and `left` position for a bottom placed tooltip, based on the given anchor.
 * @param {HTMLElement} anchor - anchor where the tooltip was applied
 * @param {HTMLElement} tooltip - tooltip element
 */
function calculateBottomPlacement(anchor, tooltip) {
  const anchorRect = anchor.getBoundingClientRect();

  const top = (() => {
    return anchorRect.top + anchor.offsetHeight + DISTANCE;
  })();

  const left = (() => {
    let temp = anchorRect.left - (tooltip.offsetWidth - anchor.offsetWidth) / 2;

    if (temp < 0) {
      temp = anchorRect.left;
    } else if (temp + tooltip.offsetWidth > window.innerWidth) {
      temp = anchorRect.left - (tooltip.offsetWidth - anchor.offsetWidth);
    }

    return temp;
  })();

  return {
    top,
    left,
    placement: 'bottom',
  };
}

/**
 * Calculates `top` and `left` position for a left placed tooltip, based on the given anchor.
 * If the calculated `left` values makes the tooltip flow out of the screen, we change the placement
 * by calling the `calculateRightPlacement` function.
 * @param {HTMLElement} anchor - anchor where the tooltip was applied
 * @param {HTMLElement} tooltip - tooltip element
 */
function calculateLeftPlacement(anchor, tooltip) {
  const anchorRect = anchor.getBoundingClientRect();

  const left = (() => {
    return anchorRect.left - tooltip.offsetWidth - DISTANCE;
  })();

  if (left < 0) {
    return calculateRightPlacement(anchor, tooltip);
  }

  const top = (() => {
    return anchorRect.top - (tooltip.offsetHeight - anchor.offsetHeight) / 2;
  })();

  return {
    top,
    left,
    placement: 'left',
  };
}
