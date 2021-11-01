import { RefObject, useCallback, useEffect, useState } from 'react';
import { Keys } from 'common/constants';

/**
 * useClickOutside
 *
 * @param {RefObject<HTMLElement>} ref
 * @param {Function} callback
 * @param {boolean} disabled
 */
function useClickOutside(ref, callback, disabled = false) {
	const [active, setActive] = useState(false);

	const handleEvent = useCallback(
		/**
		 * Handle keyboard or mouse event, checking if it happened
		 * outside the the given referenced element.
		 *
		 * @param {MouseEvent & KeyboardEvent} e
		 */
		function handleEvent(e) {
			function activate() {
				setActive(true);
			}

			function deactivate() {
				setActive(false);
			}

			if (!ref.current || disabled) {
				return;
			}

			// @ts-ignore
			if (ref.current.contains(e.target) && !active) {
				activate();
			} else if (
				// @ts-ignore
				(!ref.current.contains(e.target) || e.key === Keys.ESCAPE) &&
				active
			) {
				deactivate();

				callback();
			}
		},
		[active, callback, ref]
	);

	useEffect(() => {
		function subscribe() {
			document.addEventListener('mousedown', handleEvent, true);
			document.addEventListener('touchend', handleEvent, true);
			document.addEventListener('keyup', handleEvent);
		}

		function unsubscribe() {
			document.removeEventListener('mousedown', handleEvent, true);
			document.removeEventListener('touchend', handleEvent, true);
			document.removeEventListener('keyup', handleEvent);
		}

		subscribe();

		return () => {
			unsubscribe();
		};
	}, [handleEvent]);
}

export default useClickOutside;
