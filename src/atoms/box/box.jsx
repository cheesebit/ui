import React from 'react';
import useClassy from '@cheesebit/classy';

import { omit, isNil } from 'common/toolset';
import { evaluateBorderless, evaluatePaddingless } from 'common/props-toolset';

import './box.scss';

const OMITTED_PROPS = [
	'as',
	'block',
	'borderless',
	'children',
	'leading',
	'paddingless',
	'trailing',
];

const Box = React.forwardRef(
	/**
	 * Box component.
	 *
	 * @param {BoxProps} props
	 * @param {React.ForwardedRef<any>} ref
	 * @return {JSX.Element} Box component.
	 */
	function Box(props, ref) {
		const {
			as: Tag = 'div',
			block = false,
			borderless = false,
			children,
			className,
			leading,
			paddingless,
			trailing,
			...others
		} = props;
		const { prop, classy } = useClassy({ block });

		function renderLeading() {
			return (
				!isNil(leading) && (
					<span aria-hidden="true" className="leading">
						{leading}
					</span>
				)
			);
		}

		function renderChildren() {
			return !isNil(children) && <span className="children">{children}</span>;
		}

		function renderTrailing() {
			return (
				!isNil(trailing) && (
					<span aria-hidden="true" className="trailing">
						{trailing}
					</span>
				)
			);
		}

		return (
			<Tag
				data-testid="cb-box"
				{...omit(OMITTED_PROPS, others)}
				ref={ref}
				className={classy(
					'cb-box',
					{ '-block': prop({ block: true }) },
					evaluateBorderless(borderless),
					evaluatePaddingless(paddingless),
					className
				)}
			>
				{renderLeading()}
				{renderChildren()}
				{renderTrailing()}
			</Tag>
		);
	}
);

export default Box;

/**
 * @typedef {import('common/prop-types').BorderlessProp} BorderlessProp
 * @typedef {import('common/prop-types').PaddinglessProp} PaddinglessProp
 * @typedef {import('common/prop-types').IconProp} IconProp
 */

/**
 * @typedef {React.HTMLAttributes<HTMLElement>} DefaultElementProps
 */

/**
 * @typedef {Object} CustomBoxProps
 * @property {React.ReactNode} [leading] - Element to be rendered in the leading area of this button.
 * @property {React.ReactNode} [trailing] - Element to be rendered in the leading area of this button.
 * @property {boolean} [disabled] - Should this button be disabled.
 * @property {React.ElementType | string} [as] - Tag to render.
 * @property {PaddinglessProp} [paddingless] - Determine paddings to be supressed.
 * @property {BorderlessProp} [borderless] - Determine borders to be supressed.
 * @property {boolean} [block] - Box should be rendered as a block.
 */

/**
 * @typedef {DefaultElementProps & CustomBoxProps} BoxProps
 */
