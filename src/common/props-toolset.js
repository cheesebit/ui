import React from 'react';
import clsx from 'clsx';

import {
  equals,
  isNil,
  isBoolean,
  isFunction,
  isObject,
  toArray,
} from './toolset';
import { DEFAULT } from './constants';

/**
 * @function
 * Function to compare properties of an object.
 * @param {Array} props - properties to be compared.
 * @returns {function} function to perform props comparison.
 */
export function compareProps(props) {
  return function (prevProps, currProps) {
    return toArray(props).every(prop =>
      equals(prevProps[prop], currProps[prop]),
    );
  };
}

/**
 * Returns an object containing either prop, if it is an object,
 * or { [key]: prop } if prop is of any other type.
 *
 * @param {*} prop - Prop to be resolved
 * @param {string} key - Name to which prop should be resolved.
 * @example
 *  // returns { author: 'John Doe ' }
 *  resolveProp('John Doe', 'author')
 *  // returns { name: 'John Doe ' }
 *  resolveProp({ name: 'John Doe ' }, 'author')
 * @returns {object} Prop itself or prop mapped to given key
 */
export function resolveProp(prop, key) {
  if (isObject(prop) && !React.isValidElement(prop)) {
    return prop;
  }

  if (isNil(key)) {
    return DEFAULT.OBJECT;
  }

  return { [key]: prop };
}

/**
 * @function
 * Gets a property name and its value and generate the proper utility classname for
 * its 4 sides (top, right, bottom, and left).
 * @param {string} prop Property name
 * @param {boolean|Array<string>} value Property value. It can be either a boolean, which means
 * the property should/should not be applied to all side, or an array with the strings that represent
 * to which sides the property should be applied.
 * @returns {string} Classes generated based on the given param
 */
function evaluateSidedProp(prop, value) {
  const suppressAllSides = isBoolean(value) && value;
  const valueAsArray = toArray(value);

  if (suppressAllSides) {
    return `cb-no-${prop}`;
  }

  return clsx({
    [`cb-no-top-${prop}`]: valueAsArray.some(v =>
      ['top', 'vertical'].includes(v),
    ),
    [`cb-no-right-${prop}`]: valueAsArray.some(v =>
      ['right', 'horizontal'].includes(v),
    ),
    [`cb-no-bottom-${prop}`]: valueAsArray.some(v =>
      ['bottom', 'vertical'].includes(v),
    ),
    [`cb-no-left-${prop}`]: valueAsArray.some(v =>
      ['left', 'horizontal'].includes(v),
    ),
  });
}

/**
 * @function
 * Based on the given param it returns the CSS utility classes to
 * remove paddings.
 * @example
 *  // u-is-top-paddingless u-is-right-paddingless...
 *  evaluatePaddingless(true);
 *  // u-is-right-paddingless u-is-left-paddingless
 *  evaluatePaddingless(['right', 'left']);
 * @param {boolean|Array<string>} paddingless - `true`/`false` or array containing
 *  which sides should have no border
 * @returns {string} Classes for the given paddingless param
 */
export function evaluatePaddingless(paddingless) {
  return evaluateSidedProp('padding', paddingless);
}

/**
 * @function
 * Based on the given param it returns the CSS utility classes to
 * remove borders.
 * @example
 *  // u-is-top-borderless u-is-right-borderless...
 *  evaluateBorder(true);
 *  // u-is-right-borderless u-is-left-borderless
 *  evaluateBorder(['right', 'left']);
 * @param {boolean|Array<string>} borderless - `true`/`false` or array containing
 *  which sides should have no border
 * @returns {string} Classes for the given borderless param
 */
export function evaluateBorderless(borderless) {
  return evaluateSidedProp('border', borderless);
}
