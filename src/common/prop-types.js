import PropTypes from 'prop-types';
import icons from 'atoms/icon/icon-mapping';

/**
 * Determine borders to be supressed.
 */
export const BorderlessPropType = PropTypes.oneOfType([
	PropTypes.bool,
	PropTypes.oneOf([
		'top',
		'right',
		'bottom',
		'left',
		'horizontal',
		'vertical',
	]),
	PropTypes.arrayOf(
		PropTypes.oneOf([
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		])
	),
]);

/**
 * Set icon to be shown in the leading area of this button.
 */
export const IconPropType = PropTypes.oneOfType([
	PropTypes.oneOf(Object.keys(icons)).isRequired,
	PropTypes.shape({
		name: PropTypes.oneOf(Object.keys(icons)).isRequired,
		size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	}),
]);

/**
 * Determine paddings to be supressed.
 */
export const PaddinglessPropType = PropTypes.oneOfType([
	PropTypes.bool,
	PropTypes.oneOf([
		'top',
		'right',
		'bottom',
		'left',
		'horizontal',
		'vertical',
	]),
	PropTypes.arrayOf(
		PropTypes.oneOf([
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		])
	),
]);

/**
 * @typedef {('top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical')} DirectionPropType
 */

/**
 * @typedef {boolean | DirectionPropType | DirectionPropType[]} BorderlessProp
 */

/**
 * @typedef {boolean | DirectionPropType | DirectionPropType[]} PaddinglessProp
 */

/**
 * @typedef {import('atoms/icon/icon-mapping').IconProp} IconProp
 */

/**
 * @typedef {('danger' | 'warn' | 'info' | 'success' | 'neutral')} StatusVariant
 */
