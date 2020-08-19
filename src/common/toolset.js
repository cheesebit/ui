// export { default as throttle } from 'lodash.throttle';
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
  isEmpty,
  isNil,
  keys,
  map,
  mergeDeepWith,
  omit,
  path,
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
 * @function
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
 * @returns `true` if `value` is a boolean value, `false` otherwise.
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * Checks if the given value is an Objectl
 * @param {*} value - Value to be checked
 * @returns `true` if `value` is an object, `false` otherwise.
 * Source: https://medium.com/javascript-in-plain-english/javascript-check-if-a-variable-is-an-object-and-nothing-else-not-an-array-a-set-etc-a3987ea08fd7
 */
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Checks if the given value is an Objectl
 * @param {*} value - Value to be checked
 * @returns `true` if `value` is a function, `false` otherwise.
 * Source: https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
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
 * @function
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
 * @function
 * Wraps up a promise execution and the proper error handling to avoid
 * nested try/catch block for async/await statements.
 * @param { Promise } promise Promise to be axecuted
 * @param { object= } errorExt Additional Information you can pass to the err object
 * @returns { Promise } Wrapped promise that returns, when settled, an array as follows:
 * `[error, data]`, where error is the object returned by the catch block (merged with `errorExt`, if any)
 * and data is the object returned by the then block.
 * `error` is `null` for resolved promises and `data` is `null` for rejected promises.
 */
export function to(promise) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      return [err, void 0];
    });
}

/**
 * @function
 * Throws an error with the given message. Useful as default value for mandatory arguments.
 * @param {string} message - Custom error message
 */
export const mandatory = (message = 'required') => {
  throw new Error(message);
};

export const compact = reject(isFalsy);
