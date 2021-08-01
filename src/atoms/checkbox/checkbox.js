import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { Icon } from '../icon';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';

import './checkbox.scss';

function Checkbox( props ) {
	const {
		borderless,
		children,
		className,
		disabled,
		paddingless,
		block,
		trailing,
		...others
	} = props;

	return (
		<Box
			as="label"
			borderless={ borderless }
			paddingless={ paddingless }
			block={ block }
			trailing={ trailing }
			className={ clsx( 'cb-checkbox', { 'is-disabled': disabled }, className ) }
			data-testid="cb-checkbox"
			leading={
				<React.Fragment>
					<input
						{ ...others }
						disabled={ disabled }
						type="checkbox"
						className="selector"
						data-testid="selector"
					/>
					<Icon name="check" className="check" size={ 14 } />
				</React.Fragment>
			}
		>
			{ children }
		</Box>
	);
}

Checkbox.propTypes = {
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

Checkbox.defaultProps = {
	...Box.defaultProps,
	borderless: true,
	paddingless: 'horizontal',
	block: false,
};

export default Checkbox;
