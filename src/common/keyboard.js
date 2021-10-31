import React from 'react';
import { toArray } from './toolset';

// dev friendly names for key codes
const SUPPORTED_KEYS = {
	ALT: 'Alt',
	ARROW_DOWN: 'ArrowDown',
	ARROW_LEFT: 'ArrowLeft',
	ARROW_RIGHT: 'ArrowRight',
	ARROW_UP: 'ArrowUp',
	CONTROL: 'Control',
	ENTER: 'Enter',
	ESCAPE: 'Escape',
	SHIFT: 'Shift',
	SPACE: ' ',
	TAB: 'Tab',
};

/**
 * Get normalize key, considering IE support.
 * Based on https://github.com/downshift-js/downshift/blob/26c93a539dad09e41adba69ddc3a7d7ecccfc8bb/src/utils.js#L285
 *
 * @param {React.KeyboardEvent} e - keyboard event
 * @return {React.KeyboardEvent['key']} Normalized key code
 */
export function getKeyboardKey(e) {
	// IE
	if (e.keyCode >= 37 && e.keyCode <= 40 && e.key.indexOf('Arrow') !== 0) {
		return `Arrow${e.key}`;
	}

	return e.key;
}

/**
 *
 * @param {React.KeyboardEvent} e
 * @return {{ is( otherKeys: SupportedKey | SupportedKey[] ): boolean }} helper functions to be used on the provided keyboard event.
 */
function KeyboardKey(e) {
	const key = getKeyboardKey(e);

	return {
		/**
		 *
		 * @param {SupportedKey | SupportedKey[]} otherKeys - key or keys that the keyboard event should be considered against.
		 * @return {boolean} `true` if the keyboard event happened in any of the provided keys.
		 */
		is(otherKeys) {
			const expectedKeys = toArray(otherKeys).map(
				(otherKey) => SUPPORTED_KEYS[otherKey]
			);

			return toArray(expectedKeys).includes(key);
		},
	};
}

export default KeyboardKey;

/**
 * @typedef {keyof typeof SUPPORTED_KEYS} SupportedKey
 */
