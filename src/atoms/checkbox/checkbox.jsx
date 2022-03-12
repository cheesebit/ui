import React from 'react';
import useClassy from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { Icon } from '../icon';
import { useID } from 'hooks/id';
import { InputHTMLAttributes } from 'common/props-dom';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';
import { pick } from 'common/toolset';

import './checkbox.scss';

const InputHTMLAttributesProps = Object.keys(InputHTMLAttributes);

/**
 *
 * @param {CheckboxProps} props
 * @return {JSX.Element} Checkbox component.
 */
function Checkbox(props) {
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
	const { classy } = useClassy(props);
	const id = useID(props);

	return (
		<Box
			data-testid="cb-checkbox"
			as="label"
			className={classy('cb-checkbox', { 'is-disabled': disabled }, className)}
			borderless={borderless}
			paddingless={paddingless}
			block={block}
			trailing={trailing}
			// @ts-ignore
			htmlFor={id}
			leading={
				<React.Fragment>
					<input
						data-testid="selector"
						{...pick(InputHTMLAttributesProps, others)}
						type="checkbox"
						className="selector"
						id={id}
						disabled={disabled}
					/>
					<Icon name="check" className="check" size={14} />
				</React.Fragment>
			}
		>
			{children}
		</Box>
	);
}

// storybook use only
Checkbox.propTypes = {
	borderless: BorderlessPropType,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
	paddingless: PaddinglessPropType,
};

export default Checkbox;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {React.InputHTMLAttributes<HTMLInputElement>} DefaultInputProps
 */

/**
 * @typedef {Object} CustomCheckboxProps
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {boolean} [block] - Should take up the entire width of the container.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the trailing area of this radio.
 */

/**
 * @typedef {DefaultInputProps & CustomCheckboxProps} CheckboxProps
 */
