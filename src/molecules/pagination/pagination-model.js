import { CURRENT_PAGE, PAGE_SIZE, MAX_PAGES } from './constants';
import { clamp } from '../../common/toolset';

class PaginationModel {
	constructor( {
		currentPage = CURRENT_PAGE,
		maxPages = MAX_PAGES,
		pageSize = PAGE_SIZE,
		totalItems,
	} ) {
		this.currentPage = currentPage;
		this.maxPages = maxPages;
		this.pageSize = pageSize;
		this.totalItems = totalItems;

		this.totalPages = 0;

		this.startIndex = 0;
		this.endIndex = 0;

		this.pages = {};

		this.calculate();
	}

	calculate() {
		this.pages = {};

		this.totalPages = Math.ceil( this.totalItems / this.pageSize );
		this.currentPage = clamp(
			0,
			Math.max( 0, this.totalPages - 1 ),
			this.currentPage,
		);

		this.startIndex = this.currentPage * this.pageSize;
		this.endIndex = Math.min(
			this.startIndex + this.pageSize - 1,
			this.totalItems - 1,
		);

		// The min logic here help us to show the requested maxPages when user reaches the last page.
		const startPage = Math.max(
			0,
			Math.min(
				this.totalPages - this.maxPages,
				Math.floor( this.currentPage / this.maxPages ) * this.maxPages,
			),
		);

		// From start to window start
		if ( startPage - 1 > 0 ) {
			this.pages[ startPage - 1 ] = {
				label: '...',
				value: startPage - 1,
			};
		}

		const endPage = Math.min( startPage + this.maxPages, this.totalPages );

		// From window start to window.start + window.size
		for ( let page = startPage; page < endPage; page++ ) {
			this.pages[ page ] = {
				label: page + 1,
				value: page,
			};
		}

		// From window end to end
		if ( endPage < this.totalPages ) {
			this.pages[ endPage ] = {
				label: '...',
				value: endPage,
			};
		}

		this.pages = {
			...this.pages,
			0: {
				label: '1',
				value: 0,
			},
			[ this.totalPages - 1 ]: {
				label: this.totalPages,
				value: this.totalPages - 1,
			},
		};
	}

	setTotalItems( totalItems ) {
		this.totalItems = parseInt( totalItems, 10 );
		this.calculate();
	}

	setCurrentPage( page ) {
		this.currentPage = parseInt( page, 10 );
		this.calculate();
	}

	setPageSize( pageSize ) {
		this.currentPage = 0;
		this.pageSize = parseInt( pageSize, 10 );
		this.calculate();
	}

	get() {
		return {
			totalItems: this.totalItems,
			currentPage: this.currentPage,
			pageSize: this.pageSize,
			totalPages: this.totalPages,
			startIndex: this.startIndex,
			endIndex: this.endIndex,
			pages: this.pages,
		};
	}
}

export default PaginationModel;
