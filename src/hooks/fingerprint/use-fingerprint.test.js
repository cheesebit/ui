import { renderHook, act } from '@testing-library/react-hooks';

import useFingerprint from './use-fingerprint';

describe('useFingerprint', () => {
	it('starts up correctly', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		expect(result.current.fingerprint).toBeTruthy();
		expect(typeof result.current.getFingerprint).toBe('function');
		expect(typeof result.current.resetFingerprint).toBe('function');
		expect(typeof result.current.hasSameFingerprint).toBe('function');
	});

	it('gets the same fingerprint for the same set of items', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		expect(result.current.fingerprint).toBe(
			result.current.getFingerprint(['A', 'B', 'C'])
		);
	});

	it('resets fingerprint correctly', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		const oldFingerprint = result.current.fingerprint;

		act(() => {
			result.current.resetFingerprint(['D', 'E', 'F']);
		});

		expect(result.current.fingerprint).not.toBe(oldFingerprint);
	});

	it('gets a new fingerprint when a new item is added', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		const previousFingerprint = result.current.fingerprint;

		act(() => {
			result.current.resetFingerprint(['A', 'B', 'C', 'D']);
		});

		expect(result.current.fingerprint).not.toBe(previousFingerprint);
	});

	it('gets a new fingerprint when an item is removed', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		const previousFingerprint = result.current.fingerprint;

		act(() => {
			result.current.resetFingerprint(['A', 'B']);
		});

		expect(result.current.fingerprint).not.toBe(previousFingerprint);
	});

	it('gets a new fingerprint when an item is replaced', () => {
		const items = ['C', 'B', 'A'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		const previousFingerprint = result.current.fingerprint;

		act(() => {
			result.current.resetFingerprint(['A', 'B', 'D']);
		});

		expect(result.current.fingerprint).not.toBe(previousFingerprint);
	});

	it('checks the fingerprint of a set of items against the current fingerprint, regardless order', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);
		expect(result.current.hasSameFingerprint(['D', 'E', 'F'])).toBe(false);
		expect(result.current.hasSameFingerprint(['A', 'B', 'C'])).toBe(true);
		expect(result.current.hasSameFingerprint(['A', 'C', 'B'])).toBe(true);
		expect(result.current.hasSameFingerprint(['B', 'A', 'C'])).toBe(true);
		expect(result.current.hasSameFingerprint(['B', 'C', 'A'])).toBe(true);
		expect(result.current.hasSameFingerprint(['C', 'A', 'B'])).toBe(true);
		expect(result.current.hasSameFingerprint(['C', 'B', 'A'])).toBe(true);
	});

	it('returns empty fingerprint if provided items is falsy', () => {
		const items = ['A', 'B', 'C'];

		const { result } = renderHook(() =>
			useFingerprint({ adapter: (item) => item, items })
		);

		expect(result.current.getFingerprint(null)).toBe('');
		expect(result.current.getFingerprint(undefined)).toBe('');
	});
});
