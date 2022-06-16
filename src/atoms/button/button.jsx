import React from 'react';
import PropTypes from 'prop-types';
import useClassy from '@cheesebit/classy';

import { Box } from '../box';
import { Icon } from '../icon';
import { Overlay } from '../overlay';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';
import { resolveProp } from 'common/props-toolset';

import './button.scss';

/**
 * @param {ButtonProps} props
 * @return {JSX.Element} Button component.
 */
function Button( {
	borderless = false,
	busy = false,
	disabled = false,
	emphasis = 'ghost',
	paddingless = 'vertical',
	size = 'small',
	type = 'button',
	children,
	className,
	icon,
	leading,
	trailing,
	...others
} ) {
	const { when, classy } = useClassy( { emphasis, size } );

	function renderLeading() {
		if ( icon ) {
			return <Icon { ...resolveProp( icon, 'name' ) } />;
		}

		return leading;
	}

	return (
		<Box
			as="button"
			data-testid="cb-button"
			paddingless={ paddingless }
			borderless={ borderless }
			{ ...others }
			// @ts-ignore
			type={ type }
			disabled={ disabled || busy }
			leading={ renderLeading() }
			trailing={ trailing }
			className={ classy(
				'cb-button',
				{
					'-flat': when( { emphasis: 'flat' } ),
					'-ghost': when( { emphasis: 'ghost' } ),
					'-text': when( { emphasis: 'text' } ),
				},
				{
					'-small': when( { size: 'small' } ),
					'-medium': when( { size: 'medium' } ),
					'-large': when( { size: 'large' } ),
				},
				className
			) }
		>
			{ busy && (
				<Overlay as="span" theme="light">
					&middot;&middot;&middot;
				</Overlay>
			) }
			{ children }
		</Box>
	);
}

// storybook use only
Button.propTypes = {
	borderless: BorderlessPropType,
	busy: PropTypes.bool,
	disabled: PropTypes.bool,
	emphasis: PropTypes.oneOf( [ 'text', 'ghost', 'flat' ] ),
	icon: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.shape( {
			name: PropTypes.string.isRequired,
			size: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
		} ),
	] ),
	paddingless: PaddinglessPropType,
	size: PropTypes.oneOf( [ 'small', 'medium', 'large' ] ),
	type: PropTypes.oneOf( [ 'button', 'submit', 'reset' ] ),
};

export default Button;

/**
 * @typedef {('text' | 'ghost' | 'flat')} ButtonEmphasisProp
 * @typedef {('small' | 'medium' | 'large')} ButtonSizeProp
 */

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('common/prop-types').IconProp} IconProp
 */

/**
 * @typedef {React.ButtonHTMLAttributes<HTMLButtonElement>} DefaultButtonProps
 */

/**
 * @typedef {Object} CustomButtonProps
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {boolean} [busy] - Button is busy performing action.
 * @property {ButtonEmphasisProp} [emphasis] - What emphasis you want to apply to this button.
 * @property {IconProp} [icon] - Set icon to be shown in the leading area of this button.
 * @property {ButtonSizeProp} [size] - How large should the button be?
 * @property {React.ReactNode} [leading] - Element to be rendered in the leading area of this button.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the trailing area of this button.
 */

/**
 * @typedef {DefaultButtonProps & CustomButtonProps} ButtonProps
 */
