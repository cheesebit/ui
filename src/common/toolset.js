const debounce = require('lodash.debounce');
const get = require('lodash.get');
const set = require('lodash.set');
const unset = require('lodash.unset');

const { customAlphabet, nanoid: defaultNanoid } = require('nanoid');
const R = require('ramda');

const { complement, curryN } = R;

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-',
  15,
);

export const {
  assoc,
  clamp,
  compose,
  concat,
  dissoc,
  equals,
  forEach: each,
  isEmpty,
  isNil,
  keys,
  map,
  mergeDeepWith,
  omit,
  path,
  pick,
  prop,
  range,
  reject,
  toPairs: entries,
  trim,
  until,
  values,
} = R;

export const merge = mergeDeepWith(concat);

export { debounce, get, set, unset };

/**
 * Checks if a string is not null, undefined or empty.
 * @param {string} text String to be checked.
 * @returns {boolean} `true` if string is null, undefined or empty, `false` otherwise.
 */
export function isBlank(text) {
  if (isNil(text)) {
    return true;
  }

  const trimmedText = trim(text);
  return isEmpty(trimmedText);
}

/**
 * Checks if the given value is an Boolean
 * @param {*} value - Value to be checked
 * @returns {boolean} `true` if `value` is a boolean value, `false` otherwise.
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * Checks if the given value is a string
 * @param {*} value - Value to be checked
 * @returns {boolean} `true` if `value` is a string value, `false` otherwise.
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * Checks if the given value is an Objectl
 * @param {*} value - Value to be checked
 * @returns {boolean} `true` if `value` is an object, `false` otherwise.
 * Source: https://medium.com/javascript-in-plain-english/javascript-check-if-a-variable-is-an-object-and-nothing-else-not-an-array-a-set-etc-a3987ea08fd7
 */
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Checks if the given value is an Objectl
 * @param {*} value - Value to be checked
 * @returns {boolean} `true` if `value` is a function, `false` otherwise.
 * Source: https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * Determines whether the given `value` is a Promise.
 * @param {*} value - Value to be evaluatd
 * @returns {boolean} `true` if `value` is a Promise, `false` otherwise.
 * Source: https://futurestud.io/tutorials/detect-if-value-is-a-promise-in-node-js-and-javascript
 */
export function isPromise(value) {
  return Boolean(value) && typeof value.then === 'function';
}

/**
 * Evaluates to `true` unless they are defined as falsy (`false`, `0`, `""`,
 * `null`, `undefined`, and `NaN`).
 * Source: https://github.com/char0n/ramda-adjunct/blob/master/src/isTruthy.js
 */
export const isTruthy = curryN(1, Boolean);

/**
 * Evaluates to `true` if the provided value is`false`, `0`, `""`,
 * `null`, `undefined`, or `NaN`.
 * Source: https://github.com/char0n/ramda-adjunct/blob/master/src/isFalsy.js
 */
export const isFalsy = complement(isTruthy);

/**
 * Produces array for non-array value.
 * @param {*} value Value to be converted/returned.
 * @returns {Array<*>} Returns `value` itself if it is an array or
 * an array containing the provided `value`.
 */
export function toArray(value) {
  if (isNil(value)) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

/**
 * Returns the given ID or generates a random ID if none is provided.
 * @param {number|string} id - (Optional) ID to be returned
 * @returns {number|string} the given ID or the generated one, if none was provided.
 */
export const getID = id => {
  if (isNil(id)) {
    return nanoid();
  }

  return id;
};

/**
 * Returns the given ID or generates a random GUID if none is provided.
 * @param {number|string} id - (Optional) ID to be returned
 * @returns {number|string} the given ID or the generated one, if none was provided.
 */
export const getIDGenerator = (alphabet, size) => {
  if ([alphabet, size].some(isFalsy)) {
    return defaultNanoid;
  }

  return customAlphabet(alphabet, size);
};

/**
 * Wraps up a promise execution and the proper error handling to avoid
 * nested try/catch block for async/await statements.
 * @param { Promise|Function } promise Promise/Function to be axecuted
 * @param { object= } errorExt Additional Information you can pass to the err object
 * @returns { Promise } Wrapped promise that returns, when settled, an array as follows:
 * `[error, data]`, where error is the object returned by the catch block (merged with `errorExt`, if any)
 * and data is the object returned by the then block.
 * `error` is `null` for resolved promises and `data` is `null` for rejected promises.
 */
export function to(promise) {
  return Promise.resolve(promise)
    .then(data => [null, data])
    .catch(err => {
      return [err, void 0];
    });
}

/**
 * Throws an error with the given message. Useful as default value for mandatory arguments.
 * @param {string} message - Custom error message
 */
export const mandatory = (message = 'required') => {
  throw new Error(message);
};

export const compact = reject(isFalsy);

/**
 * Returns the valur given as parameter
 */
export function identity(value) {
  return value;
}

/**
 * Capitalizes the given string, if not blank.
 * A capitalized string has its first letter in upper case.
 * @example capitalize('belo horizonte') returns 'Belo horizonte'
 * @param {string} text String to be capitalized.
 * @returns {string} Returns capitlized string, if not blank
 */
export function capitalize(text) {
  if (isBlank(text)) {
    return '';
  }

  const [first, ...rest] = text;
  return `${first.toUpperCase()}${rest.join('')}`;
}

/**
 * Changes the given string case to lowercase, if not blank.
 * @example lowercase('belo horizonte') returns 'belo horizonte'
 * @param {string} text String to be lowercased.
 * @returns {string} Returns lowercase string, if not blank
 */
export function lowercase(text) {
  if (isBlank(text)) {
    return '';
  }

  return String(text).toLowerCase();
}

/**
 * Changes the given string case to uppercase, if not blank.
 * @example uppercase('belo horizonte') returns 'belo horizonte'
 * @param {string} text String to be uppercased.
 * @returns {string} Returns uppercase string, if not blank
 */
export function uppercase(text) {
  if (isBlank(text)) {
    return '';
  }

  return String(text).toUpperCase();
}
