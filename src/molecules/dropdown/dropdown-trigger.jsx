import React from 'react';
import useClassy from '@cheesebit/classy';

import { Button } from 'atoms/button';
import { Icon } from 'atoms/icon';
import { isNil } from 'common/toolset';

import DropdownContext from './dropdown.context';

/**
 *
 * @param {DropdownTriggerProps} props
 * @return {JSX.Element} Dropdown Trigger component.
 */
function DropdownTrigger(props) {
	const context = React.useContext(DropdownContext);
	const { classy } = useClassy(props);
	const { className, ...others } = props;
	const { disabled, expanded, toggle } = context;

	function renderCaret() {
		return (
			<Icon
				className={classy({ 'cb-u-rotate-180': expanded })}
				name="expand-more"
				size={16}
			/>
		);
	}

	return (
		<Button
			data-testid="trigger"
			trailing={renderCaret()}
			emphasis="ghost"
			{...others}
			aria-haspopup="true"
			aria-expanded={expanded}
			aria-disabled={disabled}
			disabled={disabled}
			onClick={toggle}
			className={classy('trigger', className)}
		/>
	);
}

export default DropdownTrigger;

/**
 * @typedef {import('atoms/button/button').ButtonProps} DropdownTriggerProps
 */
