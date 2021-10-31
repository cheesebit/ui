import React from 'react';

import { getID, keys } from 'common/toolset';

/**
 * This hook helps with stabilizing changes for components that rely on non-primitive props, more specifically, arrays,
 * objects, maps, sets and so on; when we need to update an internal state based on such types of prop, we might run into an infinite loop.
 * By creating a fingerprint - a string that identifies that set of items - we can garantee that the same set of items will
 * always return the same fingerprint, thus, making check for changes more predictable.
 *
 * @param {useFingerprintProps} props -
 * @return {useFingerprintReturn} functions to manage and check the fingerprint.
 */
function useFingerprint(props) {
	const { adapter, items } = props;
	/** @type {React.MutableRefObject<Record<string, any | string>>} */
	const knownRef = React.useRef({});
	const [fingerprint, setFingerprint] = React.useState(() =>
		getFingerprint('', items, true)
	);

	/**
	 * Get a fingerprint based on the sorted items identifiers.
	 *
	 * @param {string} currentFingerprint - fingerprint of the current set of items.
	 * @param {any[] | null} [items] - array of items
	 * @param {boolean} update - update `known` with the provided `items`, if it contains different set of items.
	 * @return {string} fingerprint of the provided set of items.
	 */
	function getFingerprint(currentFingerprint, items, update = false) {
		const safeItems = items || [];
		/** @type {Record<string, any | string>} */
		const known = knownRef.current;
		/** @type {Record<string, any | string>} */
		let newKnown = {};

		/**
		 * if `known` and `safeItems` have the same length, then they possibly have the same items.
		 * if they don't [have the same items], the check `known[key] != null` inside the iteration will prove otherwise.
		 */
		let hasSameItens = keys(known).length == safeItems.length;

		for (let i = 0; i < safeItems.length; i++) {
			const item = safeItems[i];
			const key = adapter(item);

			hasSameItens = hasSameItens && known[key] != null;

			newKnown = {
				...newKnown,
				// we associate a previously created or a new generated ID to represent this item in the fingerprint
				[key]: known[key] ?? getID(),
			};
		}

		if (hasSameItens) {
			// if we are dealing with the same set of items, we don't even need to bother generating a new fingerprint.
			return currentFingerprint;
		}

		if (update) {
			knownRef.current = newKnown;
		}

		const fingerprint = Object.keys(newKnown)
			.sort()
			.reduce((fingerprint, item) => {
				return `${fingerprint}${newKnown[item]}`;
			}, '');

		return fingerprint;
	}

	return {
		fingerprint,
		getFingerprint(items, update = false) {
			return getFingerprint(fingerprint, items, update);
		},
		resetFingerprint(items) {
			setFingerprint(getFingerprint(fingerprint, items, true));
		},
		hasSameFingerprint(otherItems) {
			return fingerprint === getFingerprint(fingerprint, otherItems);
		},
	};
}

export default useFingerprint;

/**
 * @typedef {((item: any) => string)} FingerprintAdapter
 */

/**
 * @typedef {Object} useFingerprintProps
 * @property {FingerprintAdapter} adapter - adapter function that gets a unique identifier for each item in the `items` prop
 * @property {any[]} items - list of items whose fingerprint should be checked.
 */

/**
 * @typedef {Object} useFingerprintReturn
 * @property {string} fingerprint - fingerprint for the current items.
 * @property {((items?: any[] | null, insert?: boolean) => string)} getFingerprint - get fingerprint for the given items.
 * @property {((items: any[]) => void)} resetFingerprint - reset fingerprint with the given items.
 * @property {((otherItems: any[]) => boolean)} hasSameFingerprint - calculate the fingerprint for the given items and compare it with the current fingerprint (basically checking if we are handling the same set of items).
 */
