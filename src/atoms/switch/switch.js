import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { Icon } from '../icon';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';

import './switch.scss';

function Switch( {
	borderless = true,
	children,
	className,
	disabled,
	paddingless = 'horizontal',
	block = false,
	trailing,
	...others
} ) {
	return (
		<Box
			as="label"
			borderless={ borderless }
			paddingless={ paddingless }
			block={ block }
			trailing={ trailing }
			className={ clsx( 'cb-switch', { 'is-disabled': disabled }, className ) }
			data-testid="cb-switch"
			leading={
				<React.Fragment>
					<input
						{ ...others }
						disabled={ disabled }
						type="checkbox"
						className="selector"
						data-testid="selector"
					/>
					<Icon name="circle" className="check" size={ 16 } />
				</React.Fragment>
			}
		>
			{ children }
		</Box>
	);
}

Switch.propTypes = {
	/**
	 * Determine borders to be supressed.
	 */
	borderless: BorderlessPropType,
	/**
	 * Should this button be disabled.
	 */
	disabled: PropTypes.bool,
	/**
	 * Should take up the entire width of the container.
	 */
	block: PropTypes.bool,
	/**
	 * Determine paddings to be supressed.
	 */
	paddingless: PaddinglessPropType,

};

Switch.defaultProps = {
	...Box.defaultProps,
	borderless: true,
	paddingless: 'horizontal',
	block: false,
};

export default Switch;
