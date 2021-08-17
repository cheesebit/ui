import React from 'react';
import clsx from 'clsx';
import { useClassy } from '@cheesebit/classy';

import { Button, Emphasis } from 'atoms/button';
import { Icon } from 'atoms/icon';
import { isNil } from 'common/toolset';

function DropdownTrigger( props ) {
	const { classy } = useClassy( props );
	const { className, expanded, trailing, onClick, children, ...others } = props;

	function renderArrow() {
		if ( ! isNil( trailing ) ) {
			return trailing;
		}

		return <Icon className={ clsx( { 'cb-u-rotate-180': expanded } ) } name="expand-more" size={ 16 } />;
	}

	return (
		<Button
			block
			trailing={ renderArrow() }
			emphasis={ Emphasis.ghost }
			data-testid="trigger"
			{ ...others }
			aria-haspopup="true"
			aria-expanded={ expanded }
			className={ classy(
				'trigger',
				className,
			) }
			onClick={ onClick }
		>
			{ children }
		</Button>
	);
}

export default DropdownTrigger;
