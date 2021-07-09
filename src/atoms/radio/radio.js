import React from 'react';
import clsx from 'clsx';

import { Box } from '../box';
import { Icon } from '../icon';

import './radio.scss';

const Radio = ( {
	borderless,
	children,
	className,
	disabled,
	paddingless,
	block,
	trailing,
	...others
} ) => {
	return (
		<Box
			as="label"
			borderless={ borderless }
			paddingless={ paddingless }
			block={ block }
			trailing={ trailing }
			className={ clsx( 'cb-radio', { 'is-disabled': disabled }, className ) }
			data-testid="cb-radio"
			leading={
				<React.Fragment>
					<input
						{ ...others }
						type="radio"
						disabled={ disabled }
						className="selector"
						data-testid="selector"
					/>
					<Icon name="circle" className="circle" size={ 16 } />
				</React.Fragment>
			}
		>
			{ children }
		</Box>
	);
};

Radio.defaultProps = {
	borderless: true,
	paddingless: 'horizontal',
	block: false,
};

export default Radio;
