// @ts-nocheck
// TODO: figure out that the type error here
import React from 'react';
import useClassy from '@cheesebit/classy';

import ListContext from './list.context';
import ListItem from './list-item';

import './list.scss';

const List = React.forwardRef(
	/**
	 * @param {ListProps} props
	 * @param {React.Ref<HTMLElement>} ref
	 * @return {JSX.Element} List component.
	 */
	function List( props, ref ) {
		const {
			as: Tag = 'section',
			bordered = false,
			hoverable = false,
			striped = false,
			className,
			children,
			...others
		} = props;
		const { classy } = useClassy( { bordered, hoverable, striped } );

		return (
			<ListContext.Provider value={ { bordered } }>
				<Tag
					data-testid="cb-list"
					role="list"
					{ ...others }
					ref={ ref }
					className={ classy(
						'cb-list',
						{
							'-bordered': bordered,
							'-hoverable': hoverable,
							'-striped': striped,
						},
						className
					) }
				>
					{ children }
				</Tag>
			</ListContext.Provider>
		);
	}
);

// storybook use only
// List.propTypes = {
// 	bordered: PropTypes.bool,
// 	striped: PropTypes.bool,
// 	hoverable: PropTypes.bool,
// };

List.Item = ListItem;

export default List;

/**
 * @typedef {Object} ListProps
 * @property {keyof JSX.IntrinsicElements} [as] - List tag to render, defaults to 'section'.
 * @property {boolean} [bordered] - Should the list be bordered?
 * @property {boolean} [hoverable] - Should the list be hoverable?
 * @property {boolean} [striped] - Should the list be striped?
 * @property {string} [className] - Additional class name.
 * @property {React.AriaRole} [role]  - Aria role.
 * @property {React.ReactNode} [children] - List content.
 */
