import React from 'react';
import useClassy from '@cheesebit/classy';

import {
	BOTTOM_REGEX,
	CENTER_REGEX,
	END_REGEX,
	LEFT_REGEX,
	RIGHT_REGEX,
	START_REGEX,
	TOP_REGEX,
} from './constants';
import { isBlank, isNil } from 'common/toolset';

import './tooltip.scss';

/**
 * Tooltip.
 *
 * @param {TooltipProps} props
 * @return {JSX.Element} Tooltip component.
 */
function Tooltip( props ) {
	const {
		mode = 'dark',
		placement = 'top-start',
		variant = 'neutral',
		children,
		className,
		text,
	} = props;
	const { classy, when } = useClassy( { mode, variant } );

	if (
		( typeof text == 'string' && isBlank( text ) ) ||
		! Boolean( text ) ||
		isNil( children )
	) {
		return null;
	}

	return (
		<div className="cb-tooltip-container">
			{ children }
			<span
				data-testid="cb-tooltip"
				className={ classy(
					'cb-tooltip',
					{
						'-top': TOP_REGEX.test( placement ),
						'-right': RIGHT_REGEX.test( placement ),
						'-bottom': BOTTOM_REGEX.test( placement ),
						'-left': LEFT_REGEX.test( placement ),
					},
					{
						'-start': START_REGEX.test( placement ),
						'-center': CENTER_REGEX.test( placement ),
						'-end': END_REGEX.test( placement ),
					},
					{
						'-light': when( { mode: 'light' } ),
						'-dark': when( { mode: 'dark' } ),
					},
					{
						'-danger': when( { variant: 'danger' } ),
						'-info': when( { variant: 'info' } ),
						'-success': when( { variant: 'success' } ),
						'-warn': when( { variant: 'warn' } ),
					},
					// animationClassName,
					className
				) }
				title={ null }
				aria-label={ typeof text == 'string' ? text : '' }
			>
				{ text }
			</span>
		</div>
	);
}

// storybook use only
// Tooltip.propTypes = {
// 	children: PropTypes.node,
// 	text: PropTypes.node,
// 	placement: PropTypes.oneOf( [
// 		'top-start',
// 		'top-center',
// 		'top-end',
// 		'bottom-start',
// 		'bottom-center',
// 		'bottom-end',
// 		'left-start',
// 		'left-center',
// 		'left-end',
// 		'right-start',
// 		'right-center',
// 		'right-end',
// 	] ),
// 	mode: PropTypes.oneOf( [ 'light', 'dark' ] ),
// 	variant: PropTypes.oneOf( [ 'danger', 'info', 'success', 'warn', 'neutral' ] ),
// };

export default Tooltip;

/**
 * @typedef {('top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end' | 'left-start' | 'left-center' | 'left-end' | 'right-start' | 'right-center' | 'right-end')} TooltipPlacement
 */

/**
 * @typedef {('light' | 'dark')} TooltipMode
 */

/**
 * @typedef {('danger' | 'info' | 'success' | 'warn' | 'neutral')} TooltipVariant
 */

/**
 * @typedef {Object} TooltipProps
 * @property {React.ReactElement} [children] - Tooltip content.
 * @property {React.ReactNode} [text] - Helper text for the tooltip.
 * @property {string} [className] - Additional class name.
 * @property {TooltipPlacement} [placement] - Position of the tooltip.
 * @property {TooltipMode} [mode] - Color scheme.
 * @property {TooltipVariant} [variant] - Tooltip variant.
 */
