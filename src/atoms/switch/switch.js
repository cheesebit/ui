import React from 'react';
import { useClassy } from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { Icon } from '../icon';
import { InputHTMLAttributes } from 'common/props-dom';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';
import { pick } from 'common/toolset';
import { useID } from 'hooks/id';

import './switch.scss';

const InputHTMLAttributesProps = Object.keys(InputHTMLAttributes);

/**
 * Switch component.
 *
 * @param {SwitchProps} props
 * @return {JSX.Element} Switch component.
 */
function Switch(props) {
	const {
		borderless = true,
		paddingless = 'horizontal',
		block = false,
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
			data-testid="cb-switch"
			as="label"
			className={classy(
				'cb-switch',
				{ 'is-disabled': disabled },
				className
			)}
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
						role="switch"
						type="checkbox"
						className="selector"
						id={id}
						disabled={disabled}
					/>
					<Icon
						aria-hidden="true"
						name="circle"
						className="check"
						size={16}
					/>
				</React.Fragment>
			}
		>
			{children}
		</Box>
	);
}

// storybook use only
Switch.propTypes = {
	borderless: BorderlessPropType,
	disabled: PropTypes.bool,
	block: PropTypes.bool,
	paddingless: PaddinglessPropType,
};

export default Switch;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} SwitchProps
 * @property {string|number} [id] - Element ID.
 * @property {React.ChangeEventHandler<HTMLInputElement>} onChange - Event handler for change event
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {boolean} [disabled] - Should this switch be disabled.
 * @property {boolean} [block] - Should take up the entire width of the container.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {string} [className] - Additional class name.
 * @property {React.ReactNode} [children] - switch content.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the trailing area of this switch.
 */
