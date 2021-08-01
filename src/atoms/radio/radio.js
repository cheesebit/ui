import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { Icon } from '../icon';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';

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

Radio.propTypes = {
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

Radio.defaultProps = {
	borderless: true,
	paddingless: 'horizontal',
	block: false,
};

export default Radio;
