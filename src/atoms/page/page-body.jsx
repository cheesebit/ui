import React from 'react';
import useClassy from '@cheesebit/classy';

import { Box } from '../box';
import { BorderlessPropType, PaddinglessPropType } from 'common/prop-types';
import { evaluateBorderless, evaluatePaddingless } from 'common/props-toolset';

const PageBody = (props) => {
	const { className, children, borderless, paddingless, ...others } = props;
	const { classy } = useClassy(props);

	return (
		<Box
			data-testid="page-body"
			{...others}
			as="article"
			className={classy(
				'body',
				className,
				evaluateBorderless(borderless),
				evaluatePaddingless(paddingless)
			)}
		>
			{children}
		</Box>
	);
};

PageBody.propTypes = {
	borderless: BorderlessPropType,
	paddingless: PaddinglessPropType,
};

export default PageBody;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 */

/**
 * @typedef {Object} PageBodyProps
 * @property {string} [className] - Additional class name.
 * @property {React.ReactNode} [children] - Page body content.
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 */
