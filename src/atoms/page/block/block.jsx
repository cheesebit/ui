import React from 'react';
import useClassy from '@cheesebit/classy';
import PropTypes from 'prop-types';

import { Box } from '../../box';
import { evaluateBorderless, evaluatePaddingless } from 'common/props-toolset';
import { PaddinglessPropType, BorderlessPropType } from 'common/prop-types';

import './block.scss';

/**
 *
 * @param {BlockProps} props
 * @return {JSX.Element} Page block component.
 */
function Block(props) {
	const { main = false, borderless, children, className, paddingless, ...others } = props;
	const { classy } = useClassy(props);
	return (
		<Box
			{...others}
			as="section"
			className={classy(
				'cb-block',
				{
					'-main': main,
				},
				evaluateBorderless(borderless),
				evaluatePaddingless(paddingless),
				className
			)}
			data-testid="cb-block"
		>
			{children}
		</Box>
	);
}

// storybook use only
Block.propTypes = {
	main: PropTypes.bool,
	borderless: BorderlessPropType,
	paddingless: PaddinglessPropType,
};

export default Block;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp

 */

/**
 * @typedef {Object} BlockProps
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {boolean} [main] - Is this the main block?
 * @property {string} [className] - Additional class name.
 * @property {React.ReactNode} [children] - Button content.
 */
