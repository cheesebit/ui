export const TOP_REGEX = new RegExp(/^top-?/, 'i');
export const BOTTOM_REGEX = new RegExp(/^bottom-?/, 'i');

export const RIGHT_REGEX = new RegExp(/-?right$/, 'i');
export const LEFT_REGEX = new RegExp(/-?left$/, 'i');

export const PHASES = {
  entering: 'cb-animation-enter-up',
  in: 'cb-opacity-1',
  exiting: 'cb-animation-exit-down',
  out: 'cb-opacity-0',
};
