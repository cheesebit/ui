import { DEFAULT } from './constants';
import { isNil } from './toolset';

/**
 * Gets width taken by the given element.
 *
 * @param {HTMLElement} element Element to be measured
 * @param {Object} options Additional options
 * @param {boolean} options.margin Measured width should include margin; default `false`.
 * @param {Function} options.calculate Function to customize width calculation. It receives
 *  as named parameters the offsetWidth and the element itselfl
 * @return {number} Width of the given element, or `0` if anything went wrong.
 */
export function getWidth( element, options ) {
	const { width = 0 } = getMeasurements( element, options );

	return width;
}

/**
 * Gets top/left position and width for the given element.
 *
 * @param {HTMLElement} element Element
 * @param {Object} options Additional options.
 * @param {boolean} options.margin Should include margin right/left when calculating width.
 * @param {Function} options.add Function to add (or subtract, returning a negative number) from the calculated width.
 *  It's useful for when you need to add a non-measurable value to your width.
 * @return {Object} Object containing `width`, `top`, `left`, `padding`, `margin` values.
 */
export function getMeasurements( element, options ) {
	if ( isNil( element ) ) {
		return DEFAULT.OBJECT;
	}

	const left = element.offsetLeft;
	const top = element.offsetTop;
	let width = element.offsetWidth;

	const style = getComputedStyle( element );

	const { margin = false, add } = options || DEFAULT.OBJECT;

	if ( margin ) {
		width += parseInt( style.marginLeft ) + parseInt( style.marginRight );
	}

	if ( add ) {
		width += add( { width, element } );
	}

	return {
		left,
		top,
		width,
		padding: {
			top: parseInt( style.paddingTop, 10 ),
			right: parseInt( style.paddingRight, 10 ),
			bottom: parseInt( style.paddingBottom, 10 ),
			left: parseInt( style.paddingLeft, 10 ),
		},
		margin: {
			top: parseInt( style.marginTop, 10 ),
			right: parseInt( style.marginRight, 10 ),
			bottom: parseInt( style.marginBottom, 10 ),
			left: parseInt( style.marginLeft, 10 ),
		},
	};
}

/**
 * This function assigns the given `value` to `attribute` in the
 * given element.
 *
 * @param {HTMLElement} element - element whose style must be set
 * @param {string} attribute - style attribute to be set
 * @param {string}  value - value to be assigned
 *
 * @return {boolean} - `true` if style attribute was successfuly assigned; `false` otherwise.
 */
export const setElementStyle = ( element, attribute, value ) => {
	if ( ! element ) {
		return false;
	}

	element.style[ attribute ] = value;
	return true;
};
