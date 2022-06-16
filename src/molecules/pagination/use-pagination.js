import React from 'react';
import { useValue } from '@cheesebit/use-value';

import { clamp, isNil } from 'common/toolset';

import { PAGE_SIZE, MAX_PAGES } from './constants';

/**
 *
 * @param {usePaginationProps} props
 * @return {usePaginationReturn} pagination configuration
 */
function usePagination( props ) {
	const { itemCount, maxPages = MAX_PAGES, pageSize = PAGE_SIZE } = props;

	const currentPage = useValue( props.currentPage ?? 0 );
	const pageCount = useValue( 0 );
	const startIndex = useValue( 0 );
	const endIndex = useValue( 0 );
	const pages = useValue( [] );

	/**
	 *
	 * @param {Object} params
	 * @param {number} params.currentPage
	 * @param {number} params.itemCount
	 * @param {number} params.maxPages
	 * @param {number} params.pageSize
	 */
	function recalculate( params ) {
		const { currentPage, itemCount, pageSize } = params;
		// we discount the first and last pages and ensure that we can show at least 3 page indicators
		const maxPages = Math.max( params.maxPages - 2, 2 );

		const newPages = [
			{
				label: '1',
				value: 0,
			},
		];

		const newPageCount = Math.ceil( itemCount / pageSize );
		const newCurrentPage = clamp(
			0,
			Math.max( 0, newPageCount - 1 ),
			currentPage
		);

		const newStartIndex = newCurrentPage * pageSize;
		const newEndIndex = Math.min(
			newStartIndex + pageSize - 1,
			itemCount - 1
		);

		// The min logic here help us to show the requested maxPages when user reaches the last page.
		const newStartPage = Math.max(
			0,
			Math.min(
				newPageCount - maxPages,
				Math.floor( newCurrentPage / maxPages ) * maxPages
			)
		);

		const newEndPage = Math.min( newStartPage + maxPages, newPageCount ); //?

		if ( newPageCount > 1 ) {
			// We add an `...` item to cover from the start page to the current page window start
			if ( newStartPage > 1 ) {
				newPages.push( {
					label: '...',
					value: newStartPage - 1,
				} );
			}

			// From window start to window.start + window.size
			for (
				let page = Math.max( newStartPage, 1 );
				page < Math.min( newEndPage, newPageCount - 1 );
				page++
			) {
				newPages.push( {
					label: String( page + 1 ),
					value: page,
				} );
			}

			// We add an `...` item to cover from the current page window end to the last page
			if ( newEndPage < newPageCount - 1 ) {
				newPages.push( {
					label: '...',
					value: newEndPage,
				} );
			}

			newPages.push( {
				label: String( newPageCount ),
				value: newPageCount - 1,
			} );
		}

		return {
			newCurrentPage,
			newPageCount,
			newStartIndex,
			newEndIndex,
			newPages,
		};
	}

	/**
	 * Check if it is possible to navigate to the previous page.
	 *
	 * @return {boolean} `true` if it is possible, `false` otherwise.
	 */
	function canPreviousPage() {
		return currentPage() > 0;
	}

	/**
	 * Check if it is possible to navigate to the next page.
	 *
	 * @return {boolean} `true` if it is possible, `false` otherwise.
	 */
	function canNextPage() {
		return currentPage() + 1 < pageCount();
	}

	/**
	 * Navigate to the specified page index.
	 *
	 * @param {number} index - new page index
	 */
	function goToPage( index ) {
		if ( isNil( index ) ) {
			return;
		}

		const {
			newCurrentPage,
			newPageCount,
			newStartIndex,
			newEndIndex,
			newPages,
		} = recalculate( {
			currentPage: index,
			itemCount,
			maxPages,
			pageSize,
		} );

		currentPage( newCurrentPage );
		startIndex( newStartIndex );
		endIndex( newEndIndex );
		pageCount( newPageCount );
		pages( newPages );
	}

	/**
	 * Navigate to the previous page, if possible.
	 */
	function goToPreviousPage() {
		if ( canPreviousPage() ) {
			goToPage( currentPage() - 1 );
		}
	}

	/**
	 * Navigate to the next page, if possible.
	 */
	function goToNextPage() {
		if ( canNextPage() ) {
			goToPage( currentPage() + 1 );
		}
	}

	React.useEffect(
		function onUpdate() {
			goToPage( currentPage() );
		},
		[ props.currentPage, props.itemCount, props.maxPages, props.pageSize ]
	);

	return {
		maxPages,
		pageSize,
		itemCount,
		currentPage: currentPage(),
		startIndex: startIndex(),
		endIndex: endIndex(),
		pageCount: pageCount(),
		pages: pages(),
		canPreviousPage,
		canNextPage,
		goToPreviousPage,
		goToPage,
		goToNextPage,
	};
}

export default usePagination;

/**
 * @typedef {Object} usePaginationProps
 * @property {number} itemCount - total number of items
 * @property {number} [currentPage=0] - current page, defaults to 0
 * @property {number} [maxPages] - maximum number of pages to display at a time
 * @property {number} [pageSize] - number of items per page
 * @property {number} [onChange] - handler for change event.
 */

/**
 * @typedef {Object} usePaginationReturn
 * @property {number} currentPage - current page, defaults to 0
 * @property {number} maxPages - maximum number of pages to display at a time
 * @property {number} pageSize - number of items per page
 * @property {number} itemCount - total number of items
 * @property {number} pageCount - total number of pages
 * @property {{ label: string; value: number }[]} pages - array with pages information
 * @property {number} startIndex - index of the first item in the current page
 * @property {number} endIndex - index of the last item in the current page
 * @property {(() => boolean)} canPreviousPage - whether previous page should be enabled
 * @property {(() => boolean)} canNextPage - whether next page should be enabled
 * @property {GoToPageHandler} goToPage - set current page to the specified index, if possible
 * @property {(e?: any) => void} goToPreviousPage - navigate to previous page, if possible
 * @property {(e?: any) => void} goToNextPage - navigate to next page, if possible
 */

/**
 * @callback GoToPageHandler
 * @param {number} currentPage - page index to navigate
 */
