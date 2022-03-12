import React from 'react';
import useClassy from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { Icon } from '../icon';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';
import { pick } from 'common/toolset';

import './radio.scss';

/**
 *
 * @param {RadioProps} props
 * @return {JSX.Element} Radio component.
 */
function Radio(props) {
	const {
		block = false,
		borderless = true,
		paddingless = 'horizontal',
		children,
		className,
		disabled,
		trailing,
		...others
	} = props;
	const { classy } = useClassy({ disabled });

	return (
		<Box
			data-testid="cb-radio"
			as="label"
			borderless={borderless}
			paddingless={paddingless}
			block={block}
			trailing={trailing}
			className={classy('cb-radio', { 'is-disabled': disabled }, className)}
			leading={
				<React.Fragment>
					<input
						data-testid="selector"
						{...others}
						type="radio"
						disabled={disabled}
						className="selector"
					/>
					<Icon name="circle" className="circle" size={16} />
				</React.Fragment>
			}
		>
			{children}
		</Box>
	);
}

// storybook use only
Radio.propTypes = {
	borderless: BorderlessPropType,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
	paddingless: PaddinglessPropType,
};

export default Radio;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement>} DefaultInputProps
 */

/**
 * @typedef {Object} CustomRadioProps
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {boolean} [block] - Should take up the entire width of the container.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the trailing area of this radio.
 */

/**
 * @typedef {DefaultInputProps & CustomRadioProps} RadioProps
 */
