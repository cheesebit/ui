import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * As CSS's focus-within is not fully supported, this hook
 * helps with identifying focus within elements.
 *
 * @param {Object} [props] - Hook props
 * @param {React.FocusEventHandler<HTMLElement>} [props.onFocus] - focus handler
 * @param {React.FocusEventHandler<HTMLElement>} [props.onBlur] - blur handler
 * @return {FocusWithinController} Returns the container ref and a boolean indicating if container is focused.
 */
function useFocusWithin(props) {
	const { onFocus, onBlur } = props || {};
	const [focused, setFocused] = useState(false);
	const containerRef = useRef(null);

	function getContainer() {
		return containerRef.current;
	}

	const handleFocus = useCallback(
		function handleFocus(e) {
			onFocus?.(e);
			setFocused(true);
		},
		[onFocus]
	);

	const handleBlur = useCallback(
		function handleBlur(e) {
			onBlur?.(e);
			setFocused(false);
		},
		[onBlur]
	);

	useEffect(
		function updateContainerRef() {
			getContainer()?.addEventListener('focusin', handleFocus);
			getContainer()?.addEventListener('focusout', handleBlur);

			return function unsubscribe() {
				getContainer()?.removeEventListener('focusin', handleFocus);
				getContainer()?.removeEventListener('focusout', handleBlur);
			};
		},
		[containerRef, handleBlur, handleFocus]
	);

	return {
		ref: containerRef,
		focused,
	};
}

export default useFocusWithin;

/**
 * @typedef {Object} FocusWithinController
 * @property {import('react').RefObject} ref - reference to the container where focus should occur.
 * @property {boolean} focused - `true` if any descendant is focused, `false` otherwise.
 */
