import React, { useCallback } from 'react';
import { toArray } from 'common/toolset';

/**
 * useKey<T>
 *
 * @param {string | string[]} keys - key code or an arrry of key codes
 */
function useKey(keys) {
	const memoizedKeys = React.useMemo(() => toArray(keys), []);

	const handleKeyEventWith = useCallback(function handleEvent() {
		return function handleKeyEvent(e) {
			if (getKeys().includes(e.key)) {
				handleEvent();
			}
		};
	}, []);

	function getKeys() {
		return memoizedKeys;
	}

	return handleKeyEventWith;
}

export default useKey;
