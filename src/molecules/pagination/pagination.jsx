import React from 'react';
import PropTypes from 'prop-types';
import useClassy from '@cheesebit/classy';

import { useID } from 'hooks/id';
import Page from './pagination-page';
import usePagination from './use-pagination';

/** @type {IconProp}  */
const ICON_PREVIOUS = {
	name: 'chevron-left',
	size: 16,
};

/** @type {IconProp}  */
const ICON_NEXT = {
	name: 'chevron-right',
	size: 16,
};

import './pagination.scss';

// TODO: call onChange
function Pagination( props ) {
	const { className } = props;
	const id = useID( props );
	const pagination = usePagination( props );
	const { classy } = useClassy( props );

	return (
		<ul
			role="tablist"
			className={ classy( 'cb-pagination', className ) }
			id={ id }
		>
			<li key="previous" role="presentation" className="item">
				<span
					id={ `previous-${ id }` }
					className="cb-is-visually-hidden"
				>
					go to previous page
				</span>
				<Page
					aria-labelledby={ `previous-${ id }` }
					disabled={ ! pagination.canPreviousPage() }
					emphasis="text"
					icon={ ICON_PREVIOUS }
					onClick={ pagination.goToPreviousPage }
				/>
			</li>
			{ pagination.pages.map( ( page ) => {
				const { value, label } = page;
				const isCurrent = pagination.currentPage == value;
				const emphasis = isCurrent ? 'flat' : 'text';

				return (
					<li key={ value } role="presentation" className="item">
						<Page
							role="tab"
							aria-selected={ isCurrent }
							emphasis={ emphasis }
							onClick={ () => pagination.goToPage( value ) }
						>
							{ label }
						</Page>
					</li>
				);
			} ) }

			<li key="next" role="presentation" className="item">
				<span id={ `next-${ id }` } className="cb-is-visually-hidden">
					go to next page
				</span>
				<Page
					aria-labelledby={ `next-${ id }` }
					disabled={ ! pagination.canNextPage() }
					emphasis="text"
					icon={ ICON_NEXT }
					onClick={ pagination.goToNextPage }
				/>
			</li>
		</ul>
	);
}

// storybook use only
Pagination.propTypes = {
	currentPage: PropTypes.number,
	maxPages: PropTypes.number,
	pageSize: PropTypes.number,
	itemCount: PropTypes.number.isRequired,
	onChange: PropTypes.func,
};

export default Pagination;

/**
 * @typedef {import('common/prop-types').IconProp} IconProp
 */
