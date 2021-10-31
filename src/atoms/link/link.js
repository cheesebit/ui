import React from 'react';
import PropTypes from 'prop-types';
import { useClassy } from '@cheesebit/classy';

import { AnchorHTMLAttributes } from 'common/props-dom';
import { Box } from '../box';
import { pick } from 'common/toolset';
import { sanitizeProps } from './link.helpers';

import './link.scss';

/**
 * This component represents a link/anchor element. Internally we have implemented a few checks
 * to add/remove [recommended attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
 *
 * @param {LinkProps} props
 * @return {JSX.Element} Link component.
 */
function Link(props) {
	const {
		animated = false,
		disabled = false,
		target = '_blank',
		children,
		className,
		title,
		...others
	} = props;
	let { href, rel } = others;
	const { classy } = useClassy({ disabled, animated });
	({ rel, href } = sanitizeProps({ target, rel, href }));

	return (
		<Box
			data-testid="cb-link"
			borderless
			paddingless
			{...others}
			as="a"
			aria-label={title}
			className={classy(className, 'cb-link', {
				'is-disabled': disabled,
				'-animated': animated,
			})}
			// @ts-ignore
			href={href}
			rel={rel}
			target={target}
			title={title}
		>
			{children}
		</Box>
	);
}

// storybook use only
Link.propTypes = {
	animated: PropTypes.bool,
	download: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Link;

/**
 * @typedef {React.AnchorHTMLAttributes<HTMLAnchorElement>} DefaultAnchorProps
 */

/**
 * @typedef {Object} CustomLinkProps
 * @property {boolean} [animated] - Should the link be animated?
 * @property {boolean} [disabled] - Should the link be disabled?
 */

/**
 * @typedef {DefaultAnchorProps & CustomLinkProps} LinkProps
 */
