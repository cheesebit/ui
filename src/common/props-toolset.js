import React from 'react';
import { classy } from '@cheesebit/classy';

import { equals, isNil, isBoolean, isObject, toArray } from './toolset';
import { DEFAULT } from './constants';

/**
 * Function to compare properties of an object.
 *
 * @param {any | any[]} props - properties to be compared.
 * @return {Function} function to perform props comparison.
 */
export function compareProps(props) {
	return function (prevProps, currProps) {
		return toArray(props).every((prop) => equals(prevProps[prop], currProps[prop]));
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
 * @return {Object} Prop itself or prop mapped to given key
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
 * Gets a property name and its value and generate the proper utility classname for
 * its 4 sides (top, right, bottom, and left).
 *
 * @param {string} prop Property name
 * @param {boolean | DirectionPropType | DirectionPropType[]} value Property value. It can be either a boolean, which means
 * the property should/should not be applied to all side, or an array with the strings that represent
 * to which sides the property should be applied.
 * @return {string} Classes generated based on the given param
 */
function evaluateSidedProp(prop, value) {
	const suppressAllSides = isBoolean(value) && value;

	if (suppressAllSides) {
		return `cb-no-${prop}`;
	}

	const valueAsArray = toArray(value);

	return classy({
		[`cb-no-top-${prop}`]: valueAsArray.some((v) => ['top'].includes(v)),
		[`cb-no-right-${prop}`]: valueAsArray.some((v) => ['right'].includes(v)),
		[`cb-no-bottom-${prop}`]: valueAsArray.some((v) => ['bottom'].includes(v)),
		[`cb-no-left-${prop}`]: valueAsArray.some((v) => ['left'].includes(v)),
		[`cb-no-vertical-${prop}`]: valueAsArray.some((v) => ['vertical'].includes(v)),
		[`cb-no-horizontal-${prop}`]: valueAsArray.some((v) => ['horizontal'].includes(v)),
	});
}

/**
 * Based on the given param it returns the CSS utility classes to
 * remove paddings.
 *
 * @example
 *  // u-is-top-paddingless u-is-right-paddingless...
 *  evaluatePaddingless(true);
 *  // u-is-right-paddingless u-is-left-paddingless
 *  evaluatePaddingless(['right', 'left']);
 * @param {PaddinglessProp} paddingless - `true`/`false` or array containing
 *  which sides should have no border
 * @return {string} Classes for the given paddingless param
 */
export function evaluatePaddingless(paddingless) {
	return evaluateSidedProp('padding', paddingless);
}

/**
 * Based on the given param it returns the CSS utility classes to
 * remove borders.
 *
 * @example
 *  // u-is-top-borderless u-is-right-borderless...
 *  evaluateBorder(true);
 *  // u-is-right-borderless u-is-left-borderless
 *  evaluateBorder(['right', 'left']);
 * @param {BorderlessProp} borderless - `true`/`false` or array containing
 *  which sides should have no border
 * @return {string} Classes for the given borderless param
 */
export function evaluateBorderless(borderless) {
	return evaluateSidedProp('border', borderless);
}

/**
 * @typedef {import('./prop-types').DirectionPropType} DirectionPropType
 * @typedef {import('./prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('./prop-types').PaddinglessProp} PaddinglessProp
 */
