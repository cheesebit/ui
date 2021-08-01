import PropTypes from 'prop-types';
import icons from 'atoms/icon/icon-mapping';

/**
 * Determine borders to be supressed.
 */
export const	BorderlessPropType = PropTypes.oneOfType( [
	PropTypes.bool,
	PropTypes.oneOf( [
		'top',
		'right',
		'bottom',
		'left',
		'horizontal',
		'vertical',
	] ),
	PropTypes.arrayOf(
		PropTypes.oneOf( [
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		] ),
	),
] );

/**
 * Set icon to be shown in the leading area of this button.
 */
export const IconPropType = PropTypes.oneOfType( [
	PropTypes.oneOf( Object.keys( icons ) ).isRequired,
	PropTypes.shape( {
		name: PropTypes.oneOf( Object.keys( icons ) ).isRequired,
		size: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	} ),
] );
	/**
	 * Determine paddings to be supressed.
	 */
export const PaddinglessPropType = PropTypes.oneOfType( [
	PropTypes.bool,
	PropTypes.oneOf( [
		'top',
		'right',
		'bottom',
		'left',
		'horizontal',
		'vertical',
	] ),
	PropTypes.arrayOf(
		PropTypes.oneOf( [
			'top',
			'right',
			'bottom',
			'left',
			'horizontal',
			'vertical',
		] ),
	),
] );

