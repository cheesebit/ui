import { renderHook, act } from '@testing-library/react-hooks';

import { MAX_PAGES } from './constants';
import usePagination from './use-pagination';

describe('usePagination', () => {
	it('initializes correctly', () => {
		const props = {
			pageSize: 10,
			itemCount: 10,
		};
		const { result } = renderHook(() => usePagination(props));

		expect(result.current.currentPage).toBe(0);
		expect(result.current.startIndex).toBe(0);
		expect(result.current.endIndex).toBe(9);
		expect(result.current.maxPages).toBe(MAX_PAGES);
		expect(result.current.pageSize).toBe(10);
		expect(result.current.itemCount).toBe(props.itemCount);
		expect(result.current.pageCount).toBe(1);
		expect(result.current.pages).toEqual([
			{
				label: '1',
				value: 0,
			},
		]);
		expect(typeof result.current.canPreviousPage).toBe('function');
		expect(typeof result.current.canNextPage).toBe('function');
		expect(typeof result.current.goToPreviousPage).toBe('function');
		expect(typeof result.current.goToPage).toBe('function');
		expect(typeof result.current.goToNextPage).toBe('function');
	});

	it('updates correctly when props change', () => {
		const initialProps = {
			pageSize: 10,
			itemCount: 10,
		};
		const { result, rerender } = renderHook(
			(props) => usePagination(props),
			{
				initialProps,
			}
		);

		expect(result.current.currentPage).toBe(0);
		expect(result.current.startIndex).toBe(0);
		expect(result.current.endIndex).toBe(9);
		expect(result.current.maxPages).toBe(MAX_PAGES);
		expect(result.current.pageSize).toBe(10);
		expect(result.current.itemCount).toBe(initialProps.itemCount);
		expect(result.current.pageCount).toBe(1);
		expect(result.current.pages).toEqual([
			{
				label: '1',
				value: 0,
			},
		]);

		const newProps = {
			pageSize: 2,
			itemCount: 8,
			maxPages: 10,
		};

		rerender(newProps);

		expect(result.current.currentPage).toBe(0);
		expect(result.current.startIndex).toBe(0);
		expect(result.current.endIndex).toBe(1);
		expect(result.current.maxPages).toBe(newProps.maxPages);
		expect(result.current.pageSize).toBe(newProps.pageSize);
		expect(result.current.itemCount).toBe(newProps.itemCount);
		expect(result.current.pageCount).toBe(4);

		expect(result.current.pages).toEqual([
			{
				label: '1',
				value: 0,
			},
			{
				label: '2',
				value: 1,
			},
			{
				label: '3',
				value: 2,
			},
			{
				label: '4',
				value: 3,
			},
		]);
	});

	describe('page window less than or equal to `maxPages`', () => {
		it('renders page window less than `maxPages`', () => {
			const props = {
				pageSize: 6,
				itemCount: 12,
				maxPages: 4,
				currentPage: 0,
			};

			const { result } = renderHook(() => usePagination(props));

			expect(result.current.currentPage).toBe(0);
			expect(result.current.startIndex).toBe(0);
			expect(result.current.endIndex).toBe(5);
			expect(result.current.pageCount).toBe(2);

			expect(result.current.pages).toEqual([
				{ label: '1', value: 0 },
				{ label: '2', value: 1 },
			]);
		});

		it('renders page window equals to `maxPages`', () => {
			const props = {
				pageSize: 3,
				itemCount: 12,
				maxPages: 4,
				currentPage: 0,
			};

			const { result } = renderHook(() => usePagination(props));

			expect(result.current.currentPage).toBe(0);
			expect(result.current.startIndex).toBe(0);
			expect(result.current.endIndex).toBe(2);
			expect(result.current.pageCount).toBe(4);

			expect(result.current.pages).toEqual([
				{ label: '1', value: 0 },
				{ label: '2', value: 1 },
				{ label: '...', value: 2 },
				{ label: '4', value: 3 },
			]);
		});
	});

	describe('page window greater than `maxPages`', () => {
		const expectedPagination = [
			[
				{ label: '1', value: 0 },
				{ label: '2', value: 1 },
				{ label: '...', value: 2 },
				{ label: '6', value: 5 },
			],
			[
				{ label: '1', value: 0 },
				{ label: '2', value: 1 },
				{ label: '...', value: 2 },
				{ label: '6', value: 5 },
			],
			[
				{ label: '1', value: 0 },
				{ label: '...', value: 1 },
				{ label: '3', value: 2 },
				{ label: '4', value: 3 },
				{ label: '...', value: 4 },
				{ label: '6', value: 5 },
			],
			[
				{ label: '1', value: 0 },
				{ label: '...', value: 1 },
				{ label: '3', value: 2 },
				{ label: '4', value: 3 },
				{ label: '...', value: 4 },
				{ label: '6', value: 5 },
			],
			[
				{ label: '1', value: 0 },
				{ label: '...', value: 3 },
				{ label: '5', value: 4 },
				{ label: '6', value: 5 },
			],
			[
				{ label: '1', value: 0 },
				{ label: '...', value: 3 },
				{ label: '5', value: 4 },
				{ label: '6', value: 5 },
			],
		];

		it('renders page window greater than `maxPages`', () => {
			const props = {
				pageSize: 2,
				itemCount: 12,
				maxPages: 4,
			};

			const { result } = renderHook(() => usePagination(props));

			expect(result.current.currentPage).toBe(0);
			expect(result.current.startIndex).toBe(0);
			expect(result.current.endIndex).toBe(1);
			expect(result.current.pageCount).toBe(6);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);
		});

		it('updates pagination correctly as user goes to next page', () => {
			const props = {
				pageSize: 2,
				itemCount: 12,
				maxPages: 4,
			};

			const { result } = renderHook(() => usePagination(props));

			expect(result.current.currentPage).toBe(0);
			expect(result.current.startIndex).toBe(0);
			expect(result.current.endIndex).toBe(1);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToNextPage();
			});

			expect(result.current.currentPage).toBe(1);
			expect(result.current.startIndex).toBe(2);
			expect(result.current.endIndex).toBe(3);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToNextPage();
			});

			expect(result.current.currentPage).toBe(2);
			expect(result.current.startIndex).toBe(4);
			expect(result.current.endIndex).toBe(5);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToNextPage();
			});

			expect(result.current.currentPage).toBe(3);
			expect(result.current.startIndex).toBe(6);
			expect(result.current.endIndex).toBe(7);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToNextPage();
			});

			expect(result.current.currentPage).toBe(4);
			expect(result.current.startIndex).toBe(8);
			expect(result.current.endIndex).toBe(9);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToNextPage();
			});

			expect(result.current.currentPage).toBe(5);
			expect(result.current.startIndex).toBe(10);
			expect(result.current.endIndex).toBe(11);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);
		});

		it('updates pagination correctly as user goes to previous page', () => {
			const props = {
				pageSize: 2,
				itemCount: 12,
				maxPages: 4,
				currentPage: 5,
			};

			const { result } = renderHook(() => usePagination(props));

			expect(result.current.currentPage).toBe(5);
			expect(result.current.startIndex).toBe(10);
			expect(result.current.endIndex).toBe(11);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToPreviousPage();
			});

			expect(result.current.currentPage).toBe(4);
			expect(result.current.startIndex).toBe(8);
			expect(result.current.endIndex).toBe(9);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToPreviousPage();
			});

			expect(result.current.currentPage).toBe(3);
			expect(result.current.startIndex).toBe(6);
			expect(result.current.endIndex).toBe(7);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToPreviousPage();
			});

			expect(result.current.currentPage).toBe(2);
			expect(result.current.startIndex).toBe(4);
			expect(result.current.endIndex).toBe(5);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToPreviousPage();
			});

			expect(result.current.currentPage).toBe(1);
			expect(result.current.startIndex).toBe(2);
			expect(result.current.endIndex).toBe(3);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);

			act(() => {
				result.current.goToPreviousPage();
			});

			expect(result.current.currentPage).toBe(0);
			expect(result.current.startIndex).toBe(0);
			expect(result.current.endIndex).toBe(1);

			expect(result.current.pages).toEqual(
				expectedPagination[result.current.currentPage]
			);
		});

		it('updates pagination correctly as user goes to page', () => {
			const props = {
				pageSize: 2,
				itemCount: 12,
				maxPages: 4,
			};

			const { result } = renderHook(() => usePagination(props));

			for (let page = 1; page < 6; page++) {
				act(() => {
					result.current.goToPage(page);
				});

				expect(result.current.pages).toEqual(expectedPagination[page]);
			}
		});
	});
});
