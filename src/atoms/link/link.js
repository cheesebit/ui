import React, { ReactNode } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Box } from '../box';
import { sanitizeProps } from './helpers';

import './link.scss';

export const Target = {
	self: '_self',
	blank: '_blank',
	parent: '_parent',
	top: '_top',
};

export const Rel = {
	noreferrer: 'noreferrer',
	noopener: 'noopener',
};

/**
 * This component represents a link/anchor element. Internally we have implemented a few checks
 * to add/remove [recommended attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
 *
 * @param {Object} props
 * @param {string} props.alt
 * @param {boolean} props.animated
 * @param {ReactNode} props.children
 * @param {string} props.className
 * @param {boolean} props.disabled
 * @param {string} props.href
 * @param {'alternate'|'author'|'bookmark'|'help'|'license'|'next'|'nofollow'|'noopener'|'noreferrer'|'opener'|'prev'|'search'|'tag'} props.rel
 * @param {'_self'|'_blank'|'_parent'|'_top'} props.target
 * @param {string} props.title
 */
const Link = ( props ) => {
	const {
		alt,
		animated,
		children,
		className,
		disabled,

		target,
		title,
		...others
	} = props;
	let {

		href,
		rel,

	} = others;
	( { rel, href } = sanitizeProps( { target, rel, href } ) );

	const classes = clsx( className, 'cb-link', {
		'is-disabled': disabled,
		'-animated': animated,
	} );

	return (
		<Box
			borderless
			paddingless
			{ ...others }
			as="a"
			alt={ alt }
			aria-label={ alt || title }
			className={ classes }
			data-testid="cb-link"
			href={ href }
			rel={ rel }
			target={ target }
			title={ title || alt }
		>
			{ children }
		</Box>
	);
};

Link.propTypes = {
	alt: PropTypes.string,
	animated: PropTypes.bool,
	download: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.oneOf( [
		Target.blank,
		Target.parent,
		Target.self,
		Target.top,
	] ),
};

Link.defaultProps = {
	alt: '',
	animated: false,
	href: '#',
	disabled: false,
	target: Target.blank,
};

export default Link;
