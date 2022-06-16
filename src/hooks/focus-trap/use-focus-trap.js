import { useCallback, useEffect, useRef, useState } from 'react';

import { isEmpty } from 'common/toolset';
import KeyboardKey, { getKeyboardKey } from 'common/keyboard';

/**
 *
 * @param {React.KeyboardEvent} e
 * @param {number} currentFocused
 * @param {number} focusableCounter
 * @return {number} get index of new focused element
 */
function getFocusedIndexAfterKeyPress( e, currentFocused, focusableCounter ) {
	/** @type {Record<React.KeyboardEvent['key'], ( e: React.KeyboardEvent ) => number>} */
	const keyHandler = {
		/**
		 *
		 * @param {React.KeyboardEvent} e
		 * @return {number} increment for new focused element index
		 */
		Tab( e ) {
			return e.shiftKey ? -1 : 1;
		},
		ArrowUp() {
			return -1;
		},
		ArrowDown() {
			return 1;
		},
	};

	function unknownKey() {
		return 0;
	}

	const key = getKeyboardKey( e );
	const increment = ( keyHandler[ key ] || unknownKey )( e );

	if ( currentFocused === -1 && increment === -1 ) {
		/**
		 * Prevent to skip one element when the initial increment is -1
		 * and `currentFocused` is -1, we don't .
		 * e.g.: focus has just been activated and user presses arrow up.
		 */
		return ( increment + focusableCounter ) % focusableCounter;
	}

	return ( currentFocused + increment + focusableCounter ) % focusableCounter;
}

/**
 *
 * @param {HTMLElement | null} container
 * @return {HTMLElement[]} Array of tabbable elements inside `container`.
 * For now, only `button`s are considered.
 */
function getTabbableDescendants( container ) {
	if ( container == null ) {
		return [];
	}

	// TODO: add support for other focusable elements
	return Array.from( container.querySelectorAll( 'button' ) || [] );
}

/**
 * Custom hook that limits the focusable elements within a container, when activated.
 *
 * Based on https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets.
 *
 * @param {useFocusTrapProps} props
 * @return {useFocusTrapReturn} focus trap utilities.
 */
function useFocusTrap( props ) {
	const { keys, onActivate, onDeactivate } = props;

	const [ active, setActive ] = useState( false );
	const [ currentFocused, setCurrentFocused ] = useState( -1 );
	/** @type {React.MutableRefObject<MutationObserver | undefined>} */
	const mutationObserverRef = useRef();
	/** @type {[HTMLElement[], React.Dispatch<React.SetStateAction<HTMLElement[]>>]}*/
	const [ focusableDescendants, setFocusableDescendants ] = useState( [] );

	/**
	 *
	 * @param {HTMLElement} container
	 */
	function subscribeToDOMMutationEvents( container ) {
		mutationObserverRef.current = new MutationObserver( function () {
			setFocusableDescendants( getTabbableDescendants( container ) );
		} );

		mutationObserverRef.current.observe( container, { childList: true } );
	}

	function unsubscribeToDOMMutationEvents() {
		setCurrentFocused( -1 );
		if ( mutationObserverRef.current ) {
			mutationObserverRef.current?.disconnect();
		}
	}

	const containerRef = useCallback(
		/**
		 *
		 * @param {HTMLElement | null} container
		 */
		function initialize( container ) {
			if ( container != null ) {
				setFocusableDescendants( getTabbableDescendants( container ) );
				subscribeToDOMMutationEvents( container );
			} else {
				unsubscribeToDOMMutationEvents();
			}
		},
		[]
	);

	useEffect( function onMount() {
		return function onUnmount() {
			unsubscribeToDOMMutationEvents();
		};
	}, [] );

	useEffect(
		function subscribeToKeyEvents() {
			/**
			 *
			 * @param {KeyboardEvent} evt
			 * @return {void}
			 */
			function handleKeyDownEvent( evt ) {
				/**
				 * Brace yourselves for the nasty casting from globalThis.KeyboardEvent, which is
				 * the type used in the `addEventListener` callback, to React.KeyboardEvent ¯\_(ツ)_/¯
				 */
				/** @type {React.KeyboardEvent} */
				// @ts-ignore
				const e = evt;

				const supportedKeys = [ ...( keys || [ 'TAB' ] ) ];

				if (
					! KeyboardKey( e ).is( supportedKeys ) ||
					isEmpty( focusableDescendants )
				) {
					return;
				}

				e.preventDefault();

				const newCurrentFocused = getFocusedIndexAfterKeyPress(
					e,
					currentFocused,
					focusableDescendants.length
				);
				setCurrentFocused( newCurrentFocused );
				focusableDescendants[ newCurrentFocused ].focus();
			}

			function subscribe() {
				document.addEventListener( 'keydown', handleKeyDownEvent );
			}

			function unsubscribe() {
				document.removeEventListener( 'keydown', handleKeyDownEvent );
			}

			if ( active ) {
				subscribe();
			}

			return function unsubscribeToKeyEvents() {
				unsubscribe();
			};
		},
		[ active, keys, currentFocused, focusableDescendants ]
	);

	const activate = useCallback(
		function activate() {
			setActive( true );
			onActivate?.();
		},
		[ onActivate ]
	);

	const deactivate = useCallback(
		function deactivate() {
			setCurrentFocused( -1 );
			setActive( false );
			onDeactivate?.();
		},
		[ onDeactivate ]
	);

	return {
		containerRef,
		active,
		activate,
		deactivate,
	};
}

export default useFocusTrap;

/**
 * @typedef {import('common/keyboard').SupportedKey} SupportedKey
 */

/**
 * @typedef {Object} useFocusTrapProps
 * @property {(() => void)} [onActivate] - Called when the focus trap is activated.
 * @property {(() => void)} [onDeactivate] - Called when the focus trap is deactivated.
 * @property {SupportedKey[]} [keys] - Keys that will move the focus inside
 * the container (The current implementation only track focus for button elements). We current
 * support `Tab`, `ArrowUp`, and `ArrowDown` keys. If not provided, only the `Tab` key will be used.
 */

/**
 * @typedef {Object} useFocusTrapReturn
 * @property {React.Ref<HTMLElement>} containerRef - The reference to the container that will serve as the focus trap.
 * @property {boolean} active - whether the focus trap is active.
 * @property {(() => void)} activate - activate the focus trap
 * @property {(() => void)} deactivate - deactivate the focus trap
 */
