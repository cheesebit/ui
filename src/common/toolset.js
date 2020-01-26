export { equals, isEmpty, isNil, keys, values, compose, reject } from "ramda";

import { compose, reject, isNil, isEmpty } from "ramda";

export const compact = reject(compose(isNil, isEmpty));

/**
 * @function
 * Checks if a string is not null, undefined or empty.
 * @param {string} text String to be checked.
 * @returns {boolean} `true` if string is null, undefined or empty, `false` otherwise.
 */
export const isBlank = text => {
  if (isNil(text) || !isString(text)) {
    return true;
  }

  return isEmpty(text);
};
